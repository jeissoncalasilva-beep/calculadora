const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const ratesFilePath = path.join(__dirname, 'rates.json');

app.use(cors());
app.use(express.json());

// Endpoint para obtener los valores
app.get('/api/rates', (req, res) => {
  fs.readFile(ratesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading rates file.');
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint para actualizar los valores (protegido, solo para ti)
app.post('/api/rates', (req, res) => {
  const newRates = req.body;
  fs.writeFile(ratesFilePath, JSON.stringify(newRates, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing rates file.');
    }
    res.status(200).send('Rates updated successfully.');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});