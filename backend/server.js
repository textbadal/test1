const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the Certificate model
const Certificate = mongoose.model('Certificate', new mongoose.Schema({
  certificateID: String,
  studentName: String,
  courseName: String,
  issueDate: Date
}));

// API Route: Verify certificates
app.post('/api/certificates/verify', async (req, res) => {
  try {
    const { certificateIDs } = req.body;

    // Validate input
    if (!Array.isArray(certificateIDs)) {
      return res.status(400).json({ message: 'certificateIDs must be an array' });
    }

    // Find certificates in the database
    const certificates = await Certificate.find({ certificateID: { $in: certificateIDs } });

    if (certificates.length === 0) {
      return res.status(404).json({ message: 'No certificates found' });
    }

    return res.status(200).json(certificates);
  } catch (err) {
    console.error('Error verifying certificates:', err);
    res.status(500).json({ message: 'Error verifying certificates' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
