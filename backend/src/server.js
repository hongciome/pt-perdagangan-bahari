import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import PDFDocument from 'pdfkit';
import { PrismaClient } from '@prisma/client';
import { supabase } from './supabaseClient.js';

const prisma = new PrismaClient();
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// --- DASHBOARD METRICS ---
app.get('/api/dashboard/metrics', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const salesStats = await prisma.salesOrder.aggregate({
      _sum: { totalAmount: true, totalCostHpp: true },
      where: { createdAt: { gte: startOfMonth } }
    });

    const stockStats = await prisma.inventoryBatch.aggregate({
      _sum: { currentQtyKg: true }
    });

    const unpaidInvoices = await prisma.invoice.aggregate({
      _sum: { totalAmount: true },
      where: { paymentStatus: 'UNPAID' }
    });

    const omzetBulanIni = Number(salesStats._sum.totalAmount || 0);
    const hppBulanIni = Number(salesStats._sum.totalCostHpp || 0);

    res.json({
      omzetHariIni: 45000000,
      omzetBulanIni,
      estimasiLabaKotor: omzetBulanIni - hppBulanIni,
      totalStokKg: Number(stockStats._sum.currentQtyKg || 0),
      piutangPelanggan: Number(unpaidInvoices._sum.totalAmount || 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- MASTER DATA API ---
app.get('/api/products', async (req, res) => res.json(await prisma.product.findMany({ orderBy: { name: 'asc' } })));
app.get('/api/customers', async (req, res) => res.json(await prisma.customer.findMany({ orderBy: { name: 'asc' } })));
app.get('/api/suppliers', async (req, res) => res.json(await prisma.supplier.findMany({ orderBy: { name: 'asc' } })));

// --- CLIENTS API (SUPABASE DIRECT INTEGRATION) ---
app.get('/api/clients', async (req, res) => {
  try {
    const { data, error } = await supabase.from('clients').select('*').order('id', { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const { client_name, address } = req.body;
    const { data, error } = await supabase
      .from('clients')
      .insert([{ client_name, address }])
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Klien berhasil ditambahkan!', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- PURCHASE ORDER & QC API ---
app.get('/api/purchase/orders', async (req, res) => {
  const orders = await prisma.purchaseOrder.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(orders);
});

app.post('/api/purchase/orders', async (req, res) => {
  const { supplierId, productId, orderedQtyKg } = req.body;
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    const count = await prisma.purchaseOrder.count();
    const dateStr = new Date().toISOString().slice(0, 7).replace('-', '');
    const poNumber = `PO-${dateStr}-${String(count + 1).padStart(4, '0')}`;

    const totalCost = parseFloat(orderedQtyKg) * Number(product.standardCost);

    const newPO = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        supplierId,
        productId,
        orderedQtyKg: parseFloat(orderedQtyKg),
        totalCost,
        qualityStatus: 'PENDING'
      }
    });

    res.status(201).json(newPO);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/purchase/orders/:id/receive-qc', async (req, res) => {
  const { id } = req.params;
  const { receivedQtyKg, tempCelsius, shrinkagePct, isPassed } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const po = await tx.purchaseOrder.findUnique({ where: { id } });
      if (!po) throw new Error('PO tidak ditemukan');

      const status = isPassed ? 'PASSED' : 'REJECTED';

      const updatedPO = await tx.purchaseOrder.update({
        where: { id },
        data: {
          receivedQtyKg: parseFloat(receivedQtyKg),
          tempCelsius: parseFloat(tempCelsius),
          shrinkagePct: parseFloat(shrinkagePct),
          qualityStatus: status
        }
      });

      if (isPassed) {
        const batchCount = await tx.inventoryBatch.count();
        const dateStr = new Date().toISOString().slice(0, 7).replace('-', '');
        const batchNumber = `BAT-${dateStr}-${String(batchCount + 1).padStart(3, '0')}`;

        await tx.inventoryBatch.create({
          data: {
            batchNumber,
            productId: po.productId,
            currentQtyKg: parseFloat(receivedQtyKg)
          }
        });
      }

      return updatedPO;
    });

    res.json({ message: 'Proses Quality Control selesai!', data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- SALES ORDER & FIFO API ---
app.get('/api/sales/orders', async (req, res) => {
  const orders = await prisma.salesOrder.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(orders);
});

app.post('/api/sales/orders', async (req, res) => {
  const { customerId, items } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const count = await tx.salesOrder.count();
      const dateStr = new Date().toISOString().slice(0, 7).replace('-', '');
      const soNumber = `SO-${dateStr}-${String(count + 1).padStart(4, '0')}`;
      const invNumber = `INV-${dateStr}-${String(count + 1).padStart(4, '0')}`;

      let grandTotalSales = 0;
      let grandTotalHpp = 0;

      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new Error(`Produk tidak ditemukan`);

        const reqQty = parseFloat(item.qtyKg);

        const batches = await tx.inventoryBatch.findMany({
          where: { productId: item.productId, currentQtyKg: { gt: 0 } },
          orderBy: { receivedAt: 'asc' }
        });

        const totalAvailable = batches.reduce((acc, b) => acc + b.currentQtyKg, 0);
        if (totalAvailable < reqQty) {
          throw new Error(`Stok ${product.name} tidak mencukupi! Stok tersedia: ${totalAvailable} kg, diminta: ${reqQty} kg.`);
        }

        let remaining = reqQty;
        let itemHppCost = 0;

        for (const batch of batches) {
          if (remaining <= 0) break;
          const qtyFromBatch = Math.min(batch.currentQtyKg, remaining);
          
          itemHppCost += qtyFromBatch * Number(product.standardCost);
          remaining -= qtyFromBatch;

          await tx.inventoryBatch.update({
            where: { id: batch.id },
            data: { currentQtyKg: batch.currentQtyKg - qtyFromBatch }
          });
        }

        const lineTotal = reqQty * Number(product.standardPrice);
        grandTotalSales += lineTotal;
        grandTotalHpp += itemHppCost;
      }

      const newSO = await tx.salesOrder.create({
        data: {
          soNumber,
          totalAmount: grandTotalSales,
          totalCostHpp: grandTotalHpp,
          status: 'CONFIRMED'
        }
      });

      await tx.invoice.create({
        data: {
          invNumber,
          totalAmount: grandTotalSales,
          paymentStatus: 'UNPAID'
        }
      });

      return newSO;
    });

    res.status(201).json({ message: 'Sales Order berhasil diproses dan stok FIFO diperbarui!', data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- INVOICE & ACCOUNTS RECEIVABLE API ---
app.get('/api/invoices', async (req, res) => {
  const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(invoices);
});

app.patch('/api/invoices/:id/pay', async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await prisma.invoice.update({
      where: { id },
      data: { paymentStatus: 'PAID' }
    });
    res.json({ message: 'Invoice berhasil dilunasi!', data: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- GENERATE PDF API ---
app.get('/api/sales/orders/:id/pdf/:type', async (req, res) => {
  const { id, type } = req.params;
  try {
    const order = await prisma.salesOrder.findUnique({ where: { id } });
    if (!order) return res.status(404).send('Transaksi tidak ditemukan');

    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const filename = `${type === 'surat-jalan' ? 'Surat_Jalan' : 'Invoice'}_${order.soNumber}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

    doc.pipe(res);

    doc.fontSize(16).font('Helvetica-Bold').text('PT BAHARI KOH AHONG (DEPOT SEAFOOD KOH A HONG)', { align: 'left' });
    doc.fontSize(9).font('Helvetica').text('Pusat Perdagangan Komoditas Ikan Segar & B2B Supply - Semarang, Jawa Tengah');
    doc.text('WhatsApp : 0895-0603-7892 | Email : pt.baharikohahong@gmail.com');
    doc.moveDown(0.5);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.moveDown(1);

    const title = type === 'surat-jalan' ? 'SURAT JALAN / DELIVERY ORDER' : 'INVOICE / FAKTUR PENJUALAN';
    doc.fontSize(14).font('Helvetica-Bold').text(title, { align: 'center' });
    doc.moveDown(1);

    const startX = 40;
    const colonX = 130;
    const valueX = 140;
    let startY = doc.y;

    doc.fontSize(10);
    doc.font('Helvetica-Bold').text('Nomor Dokumen', startX, startY);
    doc.text(':', colonX, startY);
    doc.font('Helvetica').text(order.soNumber, valueX, startY);

    startY += 16;
    doc.font('Helvetica-Bold').text('Tanggal', startX, startY);
    doc.text(':', colonX, startY);
    doc.font('Helvetica').text(new Date(order.createdAt).toLocaleDateString('id-ID'), valueX, startY);

    startY += 16;
    doc.font('Helvetica-Bold').text('Status Payment', startX, startY);
    doc.text(':', colonX, startY);
    doc.font('Helvetica-Bold').text(type === 'surat-jalan' ? 'Siap Kirim' : 'BELUM LUNAS (UNPAID)', valueX, startY);

    doc.y = startY + 30;

    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('No.', 40, doc.y, { width: 30 });
    doc.text('Deskripsi Item Ikan Segar', 80, doc.y - 12, { width: 250 });
    doc.text('Qty (KG)', 330, doc.y - 12, { width: 70, align: 'right' });

    if (type === 'invoice') {
      doc.text('Total (IDR)', 430, doc.y - 12, { width: 125, align: 'right' });
    }

    doc.moveDown(0.5);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.moveDown(0.5);

    doc.font('Helvetica');
    doc.text('1.', 40, doc.y, { width: 30 });
    doc.text('Pengiriman Komoditas Ikan Segar Batch FIFO', 80, doc.y - 12, { width: 250 });
    doc.text('1 (Lot)', 330, doc.y - 12, { width: 70, align: 'right' });

    if (type === 'invoice') {
      const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount);
      doc.text(formattedTotal, 430, doc.y - 12, { width: 125, align: 'right' });
    }

    doc.moveDown(1);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.moveDown(1);

    if (type === 'invoice') {
      const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount);
      doc.fontSize(11).font('Helvetica-Bold').text(`TOTAL TAGIHAN: ${formattedTotal}`, { align: 'right' });
      doc.moveDown(1.5);
    }

    const yPos = doc.y + 20;
    doc.fontSize(9).font('Helvetica');
    doc.text('Diterima Oleh,', 60, yPos);
    doc.text('Sopir / Pengirim,', 230, yPos);
    doc.text('Hormat Kami,', 420, yPos);

    doc.text('(...........................)', 60, yPos + 50);
    doc.text('(...........................)', 230, yPos + 50);
    doc.font('Helvetica-Bold').text('Depot Seafood Koh A Hong', 390, yPos + 50);

    doc.end();
  } catch (err) {
    res.status(500).send('Gagal membuat dokumen PDF');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ERP Backend berjalan pada port ${PORT}`));