const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fetch = require('node-fetch'); // Asegúrate de tener node-fetch instalado

app.use(bodyParser.json());

// Webhook de Payphone
app.post('/payphone/webhook', (req, res) => {
  console.log("📩 Webhook recibido:", req.body);
  res.sendStatus(200);
});

// Carpeta de archivos públicos (como confirmacion.html)
app.use(express.static('public'));

// Página de confirmación
app.get('/confirmacion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'confirmacion.html'));
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});


app.post('/verificar-transaccion', async (req, res) => {
  const { id, clientTransactionId } = req.body;

  try {
    const respuesta = await fetch('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer wrPUSQfjR-GCEFuaIWVGK4wvBycFljhVQTyO8q1i56c7GnoBXh6tosgP5cQxR0Xx5VA4pbb-xb12qVFnkTcR54MR3zx-u16Qf7WKf64We9j-SNXcsCGLICgwiI2bhfurKCtLL2p-XiL8Tx1lxXNou5Tool60cznwFLN57zFBTLgEz5a3nm7wvtakueGM1zqg9Ygs5HuJlmUIY51tfpVgf_gxmAyQvhwi4qfQ8o2XZkmGhlN8bdfM_rpVmjk006JdiehQphBPScuzRHZQYrrnBxfUbZyoaUFrZkicIhtryaDdntIEFuYc8rjHK0vbmZGh7ExJCyBW5EGQiv5QkDCTmhQVXis',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: parseInt(id),
        clientTransactionId
      })
    });

    const resultado = await respuesta.json();
    res.json(resultado);

  } catch (error) {
    console.error("Error consultando la transacción:", error);
    res.status(500).json({ error: "Fallo al consultar el estado del pago" });
  }
});
