import React, { useState } from 'react';
import axios from 'axios';

const CertificateVerification = () => {
  const [certificateIDs, setCertificateIDs] = useState(''); // Store certificate IDs input
  const [result, setResult] = useState(null); // Store result data or error message
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store any error message

  const handleVerify = async () => {
    setResult(null); // Reset previous results
    setError(null);  // Reset previous error
    setLoading(true); // Start loading state

    // Convert comma-separated input to an array and remove leading/trailing spaces
    const certificateArray = certificateIDs.split(',').map(id => id.trim());

    // Check if input is empty or not properly formatted
    if (certificateArray.length === 0 || certificateArray.some(id => id === '')) {
      setError('Please enter valid certificate IDs.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/certificates/verify', { certificateIDs: certificateArray });

      // Check if the response is an array and set the result state
      if (Array.isArray(response.data)) {
        setResult(response.data);
      } else {
        setResult({ message: 'No certificates found with the provided IDs.' });
      }
    } catch (error) {
      console.error('Error verifying certificates:', error); // Log the error for debugging
      setError('Error verifying certificates. Please try again.');
    } finally {
      setLoading(false); // Stop loading state after request completes
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Verify Multiple Certificates</h2>
      
      <textarea
        placeholder="Enter Certificate IDs, separated by commas"
        value={certificateIDs}
        onChange={(e) => setCertificateIDs(e.target.value)}
        rows="5"
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', marginBottom: '10px' }}
      />

      <button 
        onClick={handleVerify}
        disabled={loading}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px' }}>
          {Array.isArray(result) ? (
            result.map((certificate, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <p><strong>Certificate ID:</strong> {certificate.certificateID}</p>
                <p><strong>Student Name:</strong> {certificate.studentName}</p>
                <p><strong>Course:</strong> {certificate.courseName}</p>
                <p><strong>Issued:</strong> {new Date(certificate.issueDate).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;
