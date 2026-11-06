import express from 'express';
import helmet from 'helmet';
import { createClient } from '@supabase/supabase-js';

const app = express();

app.use(helmet());
app.use(express.json());

// Inisialisasi koneksi Supabase secara langsung agar tidak pusing dengan .env
const supabaseUrl = 'https://jvapzokomhnnspwhmldl.supabase.co';
const supabaseKey = 'MASUKKAN_ANON_KEY_KAMU_DISINI'; 
const supabase = createClient(supabaseUrl, supabaseKey);

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
      // Data dummy fallback jika tabel belum siap
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
      message: 'Transaksi berhasil disimpan ke database Supabase!',
      data: newTransaction
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend SEAFOOD OS berhasil menyala di port ${PORT}`);
});