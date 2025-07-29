const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Store public keys (in memory for demo)
const storedKeys = new Map();

// Mock Trust Anchor API
app.post('/api/keys', (req, res) => {
  const { publicKey } = req.body;
  
  if (!publicKey) {
    return res.status(400).json({ success: false, error: 'Public key is required' });
  }
  
  // Generate a simple key ID
  const keyId = Math.random().toString(36).substring(2, 15);
  storedKeys.set(keyId, publicKey);
  
  console.log(`🔑 Stored public key with ID: ${keyId}`);
  
  res.json({ success: true, keyId });
});

app.get('/api/keys/:keyId', (req, res) => {
  const { keyId } = req.params;
  const publicKey = storedKeys.get(keyId);
  
  if (!publicKey) {
    return res.status(404).json({ success: false, error: 'Key not found' });
  }
  
  res.json({ success: true, publicKey });
});

app.post('/api/verify', (req, res) => {
  const { url } = req.body;
  
  console.log(`🔍 Mock verification request for: ${url}`);
  
  // Simulate different responses based on URL
  if (url.includes('sample-company-verified.html')) {
    return res.json({
      verified: true,
      status: "✅ Content Verified",
      details: "Content successfully verified against cryptographic signature",
      timestamp: new Date().toISOString(),
      reason: "Content hash and signature verification passed",
      details: {
        keyId: "demo-key-123",
        hashMatch: true,
        signatureValid: true
      }
    });
  } else if (url.includes('sample-company-tampered-verified.html')) {
    return res.json({
      verified: false,
      status: "❌ Verification Failed",
      details: "Content hash mismatch - content has been tampered with",
      timestamp: new Date().toISOString(),
      reason: "Content hash mismatch detected",
      details: {
        keyId: "demo-key-123",
        hashMatch: false,
        signatureValid: false
      }
    });
  } else if (url.includes('sample-company.html')) {
    return res.json({
      verified: true,
      status: "✅ Content Verified",
      details: "Content successfully verified against cryptographic signature",
      timestamp: new Date().toISOString(),
      reason: "Content hash and signature verification passed",
      details: {
        keyId: "demo-key-123",
        hashMatch: true,
        signatureValid: true
      }
    });
  } else {
    return res.json({
      verified: false,
      status: "❌ Verification Failed",
      details: "No ai-trust-anchor meta tag found",
      timestamp: new Date().toISOString(),
      reason: "No verification meta tag found on page",
      details: {
        keyId: "Unknown",
        hashMatch: false,
        signatureValid: false
      }
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TrustAnchor Mock API',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🔒 TrustAnchor Mock API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
}); 