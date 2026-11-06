import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// Endpoint untuk menambah klien baru
router.post('/add-client', async (req, res) => {
  try {
    const { client_name, address } = req.body;

    // Masukkan data ke tabel public.clients di Supabase
    const { data, error } = await supabase
      .from('clients')
      .insert([{ client_name, address }])
      .select();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Klien berhasil ditambahkan ke database!', 
      data 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;