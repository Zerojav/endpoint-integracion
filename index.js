const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/payphone/webhook', (req, res) => {
  console.log("📩 Webhook recibido:", req.body);
  res.sendStatus(200); // Payphone necesita que respondas 200 OK
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});