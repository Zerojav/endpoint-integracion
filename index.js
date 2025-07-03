const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

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
