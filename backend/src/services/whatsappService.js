// Layanan Integrasi WhatsApp API (Contoh menggunakan FOTIFY / Wablas / Fonnte Gateway)
const axios = require('axios');

async function sendWhatsAppNotification(targetPhone, message) {
  try {
    const apiKey = process.env.WHATSAPP_API_KEY || 'DEMO_API_KEY';
    
    // Contoh endpoint pengiriman via gateway WhatsApp API standar
    /*
    const response = await axios.post('https://api.fonnte.com/send', {
      target: targetPhone,
      message: message,
    }, {
      headers: { Authorization: apiKey }
    });
    return response.data;
    */

    console.log(`[WHATSAPP MOCK API] Mengirim pesan ke ${targetPhone}:`);
    console.log(message);
    return { status: true, message: 'Pesan WhatsApp berhasil dikirim (Mock Mode)' };
  } catch (error) {
    console.error('Gagal mengirim WhatsApp:', error);
    return { status: false, error: error.message };
  }
}

module.exports = { sendWhatsAppNotification };
