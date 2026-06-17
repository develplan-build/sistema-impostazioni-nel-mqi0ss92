const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint di default vuoti
app.get('/api/clients', (req, res) => res.json([]));
app.get('/api/properties', (req, res) => res.json([]));
app.get('/api/appointments', (req, res) => res.json([]));
app.get('/api/documents', (req, res) => res.json([]));
app.get('/api/invoices', (req, res) => res.json([]));
app.get('/api/notifications', (req, res) => res.json([]));

// Endpoint demo con dati finti
app.get('/api/demo/clients', (req, res) => {
  res.json([
    { id: '1', name: 'Mario Rossi', email: 'mario@example.com', phone: '+39 333 1234567', status: 'Attivo' },
    { id: '2', name: 'Laura Bianchi', email: 'laura@example.com', phone: '+39 333 9876543', status: 'Lead' }
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server in ascolto su porta ${PORT}`);
});
