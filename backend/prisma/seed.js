import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.invoice.deleteMany();
  await prisma.salesOrder.deleteMany();
  await prisma.inventoryBatch.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.supplier.deleteMany();

  // Products
  const kakap = await prisma.product.create({
    data: { sku: 'IKN-KKP-001', name: 'Ikan Kakap Merah Segar', category: 'Ikan Laut', unit: 'KG', minStock: 100, standardCost: 65000, standardPrice: 85000 }
  });
  const tenggiri = await prisma.product.create({
    data: { sku: 'IKN-TNG-002', name: 'Ikan Tenggiri Utuh', category: 'Ikan Laut', unit: 'KG', minStock: 50, standardCost: 75000, standardPrice: 95000 }
  });
  const udang = await prisma.product.create({
    data: { sku: 'UDG-VNM-003', name: 'Udang Vaname Size 30', category: 'Udang', unit: 'KG', minStock: 30, standardCost: 88000, standardPrice: 110000 }
  });

  // Batches
  await prisma.inventoryBatch.createMany({
    data: [
      { batchNumber: 'BAT-202611-001', productId: kakap.id, currentQtyKg: 450 },
      { batchNumber: 'BAT-202611-004', productId: tenggiri.id, currentQtyKg: 120 },
      { batchNumber: 'BAT-202611-089', productId: udang.id, currentQtyKg: 35 }
    ]
  });

  // Customers
  await prisma.customer.createMany({
    data: [
      { code: 'CUST-001', name: 'Restoran Delima Seafood', type: 'RESTORAN', phone: '024-7654321', address: 'Jl. Pandanaran No. 45, Semarang', creditLimit: 25000000 },
      { code: 'CUST-002', name: 'Hotel Grand Candi Semarang', type: 'HOTEL', phone: '024-8414222', address: 'Jl. Sisingamangaraja No. 16, Semarang', creditLimit: 50000000 },
      { code: 'CUST-003', name: 'Depot Makan Pak Eko', type: 'RESTORAN', phone: '081234567890', address: 'Jl. Pemuda No. 102, Semarang', creditLimit: 10000000 }
    ]
  });

  // Suppliers
  await prisma.supplier.createMany({
    data: [
      { code: 'SUP-001', name: 'UD Nelayan Tangguh Juwana', contactPerson: 'H. Sutrisno', phone: '081122334455', originRegion: 'Pati / Juwana', bankAccount: 'BCA 1420987654 a/n Sutrisno' },
      { code: 'SUP-002', name: 'Koperasi TPI Tambaklorok', contactPerson: 'Sujono', phone: '085678901234', originRegion: 'Semarang Utara', bankAccount: 'BRI 008901002345301 a/n Koperasi TPI' }
    ]
  });

  console.log('✅ Seeding Master Data berhasil!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
