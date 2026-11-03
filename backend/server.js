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

// Endpoint Login dengan Validasi Ketat (Mencegah password sembarangan masuk)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const allUsers = [...usersDB, ...registeredAccountsDB];
  
  // Cari user berdasarkan username
  const user = allUsers.find(u => u.username === username);

  // Jika username tidak ditemukan ATAU password tidak cocok, TOLAK!
  if (!user || user.password !== password) {
    return res.status(401).json({ 
      success: false, 
      message: 'Peringatan: Username atau password salah! Silakan periksa kembali.' 
    });
  }

  // Jika lolos verifikasi
  return res.status(200).json({ 
    success: true, 
    message: 'Login berhasil!', 
    role: user.role,
    user: user.username 
  });
});

app.post('/api/register-user', (req, res) => {
  const { requesterRole, newUsername, newPassword, newRole } = req.body;

  if (requesterRole !== 'Owner' && requesterRole !== 'Admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Akses ditolak! Hanya Owner atau Admin yang berhak mendaftarkan akun baru.' 
    });
  }

  const allUsers = [...usersDB, ...registeredAccountsDB];
  if (allUsers.some(u => u.username === newUsername)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username sudah digunakan, silakan pilih nama lain.' 
    });
  }

  const newUser = {
    id: allUsers.length + 1,
    username: newUsername,
    password: newPassword,
    role: newRole 
  };

  registeredAccountsDB.push(newUser);

  return res.status(201).json({ 
    success: true, 
    message: `Akun baru untuk ${newUsername} dengan role [${newRole}] berhasil didaftarkan!` 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend SEAFOOD OS aktif dan berjalan aman di port ${PORT}`);
});
