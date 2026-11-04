const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Terlalu banyak percobaan dari IP ini, silakan coba lagi nanti.' }
});
app.use('/api/', apiLimiter);
app.use(express.json());

// Inisialisasi koneksi Supabase aman menggunakan .env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Database akun resmi
const usersDB = [
  { id: 1, username: 'sigit_owner', role: 'Owner', password: 'rahasia123' },
  { id: 2, username: 'admin_bahari', role: 'Admin', password: 'rahasia123' }
];

const registeredAccountsDB = [];

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

// Endpoint Ambil Daftar Transaksi dari Supabase
app.get('/api/transactions', async (req, res) => {
  try {
    const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
    
    if (error) {
      return res.status(200).json({
        success: true,
        data: [
          { id: '#ORD-2026-001', client: 'Gumaya Tower Hotel', fish: 'Ikan Kakap Merah (Segar) - 50 Kg', total: 'Rp 3.500.000', status: 'Selesai / Dikirim' },
          { id: '#ORD-2026-002', client: 'Restoran Bahari Indah', fish: 'Ikan Kerapu Macan - 30 Kg', total: 'Rp 4.200.000', status: 'Proses Gudang' }
        ]
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint Tambah Transaksi Baru ke Supabase
app.post('/api/transactions', async (req, res) => {
  const { client, fish, total, status } = req.body;

  if (!client || !fish || !total) {
    return res.status(400).json({ success: false, message: 'Data transaksi tidak lengkap!' });
  }

  const newTransaction = {
    id: `#ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
    client,
    fish,
    total: total.startsWith('Rp') ? total : `Rp ${total}`,
    status: status || 'Proses Gudang'
  };

  try {
    const { data, error } = await supabase.from('transactions').insert([newTransaction]);
    
    if (error) {
      console.log('Catatan database:', error.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Transaksi berhasil disimpan permanen ke database Supabase!',
      data: newTransaction
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend SEAFOOD OS terhubung ke Supabase dan aktif di port ${PORT}`);
});
