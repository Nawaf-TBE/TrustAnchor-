const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for trust anchors
const trustAnchors = new Map();
const verificationHistory = new Map();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize with some sample data
trustAnchors.set('example.com', {
  id: 'example.com',
  domain: 'example.com',
  certificate: 'sample-cert-hash-123',
  status: 'trusted',
  lastVerified: new Date().toISOString(),
  createdAt: new Date().toISOString()
});

// API Routes

// Get all trust anchors
app.get('/api/trust-anchors', (req, res) => {
  const anchors = Array.from(trustAnchors.values());
  res.json({ success: true, data: anchors });
});

// Get specific trust anchor
app.get('/api/trust-anchors/:domain', (req, res) => {
  const { domain } = req.params;
  const anchor = trustAnchors.get(domain);
  
  if (!anchor) {
    return res.status(404).json({ success: false, message: 'Trust anchor not found' });
  }
  
  res.json({ success: true, data: anchor });
});

// Create new trust anchor
app.post('/api/trust-anchors', (req, res) => {
  const { domain, certificate } = req.body;
  
  if (!domain || !certificate) {
    return res.status(400).json({ success: false, message: 'Domain and certificate are required' });
  }
  
  const anchor = {
    id: domain,
    domain,
    certificate,
    status: 'pending',
    lastVerified: null,
    createdAt: new Date().toISOString()
  };
  
  trustAnchors.set(domain, anchor);
  res.status(201).json({ success: true, data: anchor });
});

// Verify trust anchor
app.post('/api/trust-anchors/:domain/verify', (req, res) => {
  const { domain } = req.params;
  const anchor = trustAnchors.get(domain);
  
  if (!anchor) {
    return res.status(404).json({ success: false, message: 'Trust anchor not found' });
  }
  
  // Simulate verification process
  const verified = Math.random() > 0.2; // 80% success rate for demo
  anchor.status = verified ? 'trusted' : 'untrusted';
  anchor.lastVerified = new Date().toISOString();
  
  trustAnchors.set(domain, anchor);
  
  // Add to verification history
  const historyId = `${domain}-${Date.now()}`;
  verificationHistory.set(historyId, {
    id: historyId,
    domain,
    result: anchor.status,
    timestamp: anchor.lastVerified
  });
  
  res.json({ success: true, data: anchor });
});

// Get verification history
app.get('/api/verification-history', (req, res) => {
  const history = Array.from(verificationHistory.values()).reverse(); // Most recent first
  res.json({ success: true, data: history });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Trust Anchor API is running',
    timestamp: new Date().toISOString(),
    anchors: trustAnchors.size,
    verifications: verificationHistory.size
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🔒 Trust Anchor server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard available at http://localhost:${PORT}`);
  console.log(`🔧 API endpoints available at http://localhost:${PORT}/api`);
}); 