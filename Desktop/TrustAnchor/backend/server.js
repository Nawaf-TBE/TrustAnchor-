const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for public keys
const publicKeys = new Map(); // keyId -> publicKey (Base64)

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Utility function to generate keyId from publicKey
function generateKeyId(publicKey) {
  return crypto.createHash('sha256').update(publicKey).digest('hex');
}

// Utility function to hash text content
function hashContent(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

// Utility function to verify RSA signature
function verifySignature(publicKeyBase64, signature, hash) {
  try {
    // Convert base64 public key to PEM format
    const publicKeyBuffer = Buffer.from(publicKeyBase64, 'base64');
    const publicKey = crypto.createPublicKey({
      key: publicKeyBuffer,
      format: 'der',
      type: 'spki'
    });

    // Verify signature
    const signatureBuffer = Buffer.from(signature, 'base64');
    const hashBuffer = Buffer.from(hash, 'hex');
    
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(hashBuffer);
    return verify.verify(publicKey, signatureBuffer);
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// 1. POST /api/keys - Store public key and return keyId
app.post('/api/keys', (req, res) => {
  try {
    const { publicKey } = req.body;
    
    if (!publicKey || typeof publicKey !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid publicKey (must be Base64 string)'
      });
    }

    // Validate base64 format
    try {
      Buffer.from(publicKey, 'base64');
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Base64 encoding for publicKey'
      });
    }

    // Generate unique keyId (SHA-256 hash of publicKey)
    const keyId = generateKeyId(publicKey);
    
    // Store in memory
    publicKeys.set(keyId, publicKey);
    
    console.log(`✅ Stored public key with keyId: ${keyId}`);
    
    res.json({
      success: true,
      keyId
    });

  } catch (error) {
    console.error('Error storing public key:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// 2. GET /api/keys/:keyId - Retrieve public key
app.get('/api/keys/:keyId', (req, res) => {
  try {
    const { keyId } = req.params;
    
    if (!keyId) {
      return res.status(400).json({
        success: false,
        error: 'Missing keyId parameter'
      });
    }

    const publicKey = publicKeys.get(keyId);
    
    if (!publicKey) {
      return res.status(404).json({
        success: false,
        error: 'Public key not found'
      });
    }

    res.json({
      success: true,
      publicKey
    });

  } catch (error) {
    console.error('Error retrieving public key:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// 3. POST /api/verify - Verify content trust signature
app.post('/api/verify', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        verified: false,
        reason: 'Missing or invalid URL',
        timestamp: new Date().toISOString()
      });
    }

    // Validate URL format
    let targetUrl;
    try {
      targetUrl = new URL(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        verified: false,
        reason: 'Invalid URL format',
        timestamp: new Date().toISOString()
      });
    }

    console.log(`🔍 Verifying content at: ${url}`);

    // Fetch the remote page
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'TrustAnchor-Verifier/1.0'
      },
      timeout: 10000 // 10 second timeout
    });

    if (!response.ok) {
      return res.json({
        success: false,
        verified: false,
        reason: `Failed to fetch content: ${response.status} ${response.statusText}`,
        timestamp: new Date().toISOString()
      });
    }

    const html = await response.text();
    
    // Parse HTML to extract trust anchor meta tag
    const $ = cheerio.load(html);
    const trustAnchorMeta = $('meta[name="ai-trust-anchor"]');
    
    if (trustAnchorMeta.length === 0) {
      return res.json({
        success: true,
        verified: false,
        reason: 'No ai-trust-anchor meta tag found',
        timestamp: new Date().toISOString()
      });
    }

    // Parse the trust anchor content
    let trustData;
    try {
      const content = trustAnchorMeta.attr('content');
      trustData = JSON.parse(content);
    } catch (error) {
      return res.json({
        success: true,
        verified: false,
        reason: 'Invalid JSON in ai-trust-anchor meta tag',
        timestamp: new Date().toISOString()
      });
    }

    const { hash: expectedHash, signature, keyId } = trustData;
    
    if (!expectedHash || !signature || !keyId) {
      return res.json({
        success: true,
        verified: false,
        reason: 'Missing hash, signature, or keyId in trust anchor data',
        timestamp: new Date().toISOString()
      });
    }

    // Get the public key
    const publicKey = publicKeys.get(keyId);
    if (!publicKey) {
      return res.json({
        success: true,
        verified: false,
        reason: `Public key not found for keyId: ${keyId}`,
        timestamp: new Date().toISOString()
      });
    }

    // Extract body text content and recompute hash
    const bodyText = $('body').text().trim();
    const actualHash = hashContent(bodyText);
    
    console.log(`📄 Body text length: ${bodyText.length} characters`);
    console.log(`🔢 Expected hash: ${expectedHash}`);
    console.log(`🔢 Actual hash: ${actualHash}`);

    // Verify the signature against the actual hash
    const isSignatureValid = verifySignature(publicKey, signature, actualHash);
    
    let verified = false;
    let reason = '';
    
    if (actualHash !== expectedHash) {
      reason = 'Content hash mismatch - content may have been modified';
    } else if (!isSignatureValid) {
      reason = 'Invalid signature - signature verification failed';
    } else {
      verified = true;
      reason = 'Content successfully verified';
    }

    console.log(`✅ Verification result: ${verified ? 'VERIFIED' : 'FAILED'} - ${reason}`);

    res.json({
      success: true,
      verified,
      reason,
      timestamp: new Date().toISOString(),
      details: {
        url,
        keyId,
        hashMatch: actualHash === expectedHash,
        signatureValid: isSignatureValid,
        bodyLength: bodyText.length
      }
    });

  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({
      success: false,
      verified: false,
      reason: `Verification error: ${error.message}`,
      timestamp: new Date().toISOString()
    });
  }
});

// 4. GET /health - Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TrustAnchor Content Verification',
    timestamp: new Date().toISOString(),
    stats: {
      storedKeys: publicKeys.size,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'POST /api/keys',
      'GET /api/keys/:keyId',
      'POST /api/verify',
      'GET /health'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🔒 TrustAnchor Content Verification Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 API Documentation:`);
  console.log(`   POST /api/keys - Store public key`);
  console.log(`   GET /api/keys/:keyId - Retrieve public key`);
  console.log(`   POST /api/verify - Verify content trust`);
  console.log(`   GET /health - Server health status`);
}); 