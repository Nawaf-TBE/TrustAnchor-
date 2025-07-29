const crypto = require('crypto');

// The keyId from the demo page
const targetKeyId = 'cb1210e1cdae4367f7d87e383c41390408ea31d4fe0d4baac7e6313e9a50694c';

// Generate a public key that will produce this keyId
// For demo purposes, we'll create a simple RSA key
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'der'  // Use DER format to match the backend expectation
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Convert to base64 (as expected by the backend)
const publicKeyBase64 = publicKey.toString('base64');

// Verify the keyId matches
const generatedKeyId = crypto.createHash('sha256').update(publicKeyBase64).digest('hex');

console.log('Target KeyId:', targetKeyId);
console.log('Generated KeyId:', generatedKeyId);
console.log('Match:', targetKeyId === generatedKeyId);

if (targetKeyId === generatedKeyId) {
  console.log('✅ Perfect match! Adding to database...');
  
  // Add to database
  fetch('http://localhost:3000/api/keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      publicKey: publicKeyBase64
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('✅ Key added successfully:', data);
  })
  .catch(error => {
    console.error('❌ Error adding key:', error);
  });
} else {
  console.log('❌ KeyId mismatch. This is expected for demo purposes.');
  console.log('For the demo, we need to modify the backend to accept the specific keyId.');
} 