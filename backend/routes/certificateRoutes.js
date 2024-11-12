const express = require('express');
const Certificate = require('../models/Certificate');
const router = express.Router();

// Route to verify multiple certificates
router.post('/verify', async (req, res) => {
  try {
    const { certificateIDs } = req.body; // array of certificate IDs to verify

    if (!Array.isArray(certificateIDs)) {
      return res.status(400).json({ message: 'certificateIDs should be an array' });
    }

    // Fetch all certificates by certificate IDs
    const certificates = await Certificate.find({
      certificateID: { $in: certificateIDs }
    });

    if (certificates.length === 0) {
      return res.status(404).json({ message: 'No certificates found for the provided IDs' });
    }

    // Respond with the certificate details
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while verifying certificates' });
  }
});

// Route to add many certificates
router.post('/addMany', async (req, res) => {
  try {
    const certificates = req.body.certificates; // Array of certificates to add

    // Validate if the certificates array exists and is an array
    if (!Array.isArray(certificates)) {
      return res.status(400).json({ message: 'certificates must be an array' });
    }

    // Validate that each certificate contains the required fields
    for (let certificate of certificates) {
      const { certificateID, studentName, courseName } = certificate;
      if (!certificateID || !studentName || !courseName) {
        return res.status(400).json({ message: 'Each certificate must include certificateID, studentName, and courseName' });
      }

      // Check if the certificateID already exists
      const existingCertificate = await Certificate.findOne({ certificateID });
      if (existingCertificate) {
        return res.status(400).json({ message: `Certificate with ID ${certificateID} already exists` });
      }
    }

    // Insert many certificates at once
    const insertedCertificates = await Certificate.insertMany(certificates);

    // Respond with a success message and the inserted certificates
    res.status(201).json({
      message: 'Certificates added successfully',
      certificates: insertedCertificates
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding certificates', error: err.message });
  }
});

module.exports = router;
