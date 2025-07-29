const crypto = require('crypto');

// Generate a demo key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// The keyId from the demo page
const keyId = 'cb1210e1cdae4367f7d87e383c41390408ea31d4fe0d4baac7e6313e9a50694c';

// Add the key to the database
fetch('http://localhost:3000/api/keys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    keyId: keyId,
    publicKey: publicKey
  })
})
.then(response => response.json())
.then(data => {
  console.log('✅ Demo key added successfully:', data);
})
.catch(error => {
  console.error('❌ Error adding demo key:', error);
}); 