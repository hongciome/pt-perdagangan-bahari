const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Terlalu banyak percobaan dari IP ini, silakan coba lagi nanti.' }
});
app.use('/api/', apiLimiter);
app.use(express.json());

// Database akun resmi
const usersDB = [
  { id: 1, username: 'sigit_owner', role: 'Owner', password: 'rahasia123' },
  { id: 2, username: 'admin_bahari', role: 'Admin', password: 'rahasia123' }
];

const registeredAccountsDB = [];

// Database penyimpanan transaksi B2B (Suplier / Hotel / Resto)
const transactionsDB = [
  { id: '#ORD-2026-001', client: 'Gumaya Tower Hotel', fish: 'Ikan Kakap Merah (Segar) - 50 Kg', total: 'Rp 3.500.000', status: 'Selesai / Dikirim' },
  { id: '#ORD-2026-002', client: 'Restoran Bahari Indah', fish: 'Ikan Kerapu Macan - 30 Kg', total: 'Rp 4.200.000', status: 'Proses Gudang' },
  { id: '#ORD-2026-003', client: 'Hotel Santika Semarang', fish: 'Udang Tiger & Cumi Segar - 45 Kg', total: 'Rp 5.800.000', status: 'Menunggu Konfirmasi' }
];

// Endpoint Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const allUsers = [...usersDB, ...registeredAccountsDB];
  const user = allUsers.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ 
      success: false, 
      message: 'Peringatan: Username atau password salah! Silakan periksa kembali.' 
    });
  }

  return res.status(200).json({ 
    success: true, 
    message: 'Login berhasil!', 
    role: user.role,
    user: user.username 
  });
});

// Endpoint Ambil Daftar Transaksi
app.get('/api/transactions', (req, res) => {
  return res.status(200).json({
    success: true,
    data: transactionsDB
  });
});

// Endpoint Tambah Transaksi Baru
app.post('/api/transactions', (req, res) => {
  const { client, fish, total, status } = req.body;

  if (!client || !fish || !total) {
    return res.status(400).json({ success: false, message: 'Data transaksi tidak lengkap!' });
  }

  const newTransaction = {
    id: `#ORD-2026-00${transactionsDB.length + 1}`,
    client,
    fish,
    total: total.startsWith('Rp') ? total : `Rp ${total}`,
    status: status || 'Proses Gudang'
  };

  transactionsDB.unshift(newTransaction); // Masukkan ke urutan paling atas

  return res.status(201).json({
    success: true,
    message: 'Transaksi berhasil ditambahkan dan disimpan!',
    data: newTransaction
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend SEAFOOD OS aktif dan berjalan aman di port ${PORT}`);
});
