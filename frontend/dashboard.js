// Trust Anchor Publisher Dashboard
// Uses Web Crypto API for in-browser key generation and content signing

const API_BASE = '/api';

// Utility function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Utility function to convert hex string to ArrayBuffer
function hexToArrayBuffer(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes.buffer;
}

// Utility function to show status messages
function showStatus(elementId, message, type = 'info') {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="status ${type}">${message}</div>`;
}

// Generate RSA key pair using Web Crypto API
async function generateKeyPair() {
    const generateBtn = document.getElementById('generateBtn');
    const publicKeyDisplay = document.getElementById('publicKeyDisplay');
    const keyIdDisplay = document.getElementById('keyIdDisplay');
    const signBtn = document.getElementById('signBtn');

    try {
        generateBtn.disabled = true;
        generateBtn.textContent = '🔄 Generating...';
        showStatus('keyStatus', 'Generating RSA key pair...', 'info');

        // Generate RSA-PSS key pair
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: 'RSA-PSS',
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]), // 65537
                hash: 'SHA-256'
            },
            true, // extractable
            ['sign', 'verify']
        );

        console.log('✅ Key pair generated successfully');

        // Export public key as SPKI format
        const publicKeyBuffer = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
        const publicKeyBase64 = arrayBufferToBase64(publicKeyBuffer);

        console.log('✅ Public key exported as Base64 SPKI');

        // Send public key to backend to get keyId
        const response = await fetch(`${API_BASE}/keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                publicKey: publicKeyBase64
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || 'Failed to register public key');
        }

        const keyId = result.keyId;
        console.log('✅ Received keyId from server:', keyId);

        // Store private key and keyId in sessionStorage
        // Note: We store the private key as a CryptoKey object reference
        sessionStorage.setItem('keyId', keyId);
        sessionStorage.setItem('hasPrivateKey', 'true');
        
        // Store the private key object (this is safe - it stays in browser)
        window.trustedPrivateKey = keyPair.privateKey;

        // Update UI
        publicKeyDisplay.textContent = publicKeyBase64;
        publicKeyDisplay.className = 'key-display';
        
        keyIdDisplay.textContent = keyId;
        keyIdDisplay.className = 'key-display';

        signBtn.disabled = false;
        generateBtn.textContent = '✅ Keys Generated';
        showStatus('keyStatus', 'Keys generated and registered successfully!', 'success');

    } catch (error) {
        console.error('❌ Key generation failed:', error);
        generateBtn.textContent = '🔑 Generate Keys';
        generateBtn.disabled = false;
        showStatus('keyStatus', `Error: ${error.message}`, 'error');
        
        // Clear displays on error
        publicKeyDisplay.textContent = 'Key generation failed';
        publicKeyDisplay.className = 'key-display empty';
        keyIdDisplay.textContent = 'Key generation failed';
        keyIdDisplay.className = 'key-display empty';
    }
}

// Sign content using the stored private key
async function signContent() {
    const contentInput = document.getElementById('contentInput');
    const metaTagOutput = document.getElementById('metaTagOutput');
    const signBtn = document.getElementById('signBtn');
    const copyBtn = document.getElementById('copyBtn');

    try {
        const content = contentInput.value.trim();
        if (!content) {
            showStatus('signStatus', 'Please enter content to sign', 'error');
            return;
        }

        // Check if we have a private key
        if (!window.trustedPrivateKey || !sessionStorage.getItem('keyId')) {
            showStatus('signStatus', 'Please generate keys first', 'error');
            return;
        }

        signBtn.disabled = true;
        signBtn.textContent = '🔄 Signing...';
        showStatus('signStatus', 'Hashing and signing content...', 'info');

        // Hash the content with SHA-256
        const encoder = new TextEncoder();
        const contentBytes = encoder.encode(content);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', contentBytes);
        
        // Convert hash to hex string
        const hashArray = new Uint8Array(hashBuffer);
        const hashHex = Array.from(hashArray)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        console.log('✅ Content hashed:', hashHex);

        // Sign the hash using RSA-PSS
        const signature = await window.crypto.subtle.sign(
            {
                name: 'RSA-PSS',
                saltLength: 32 // SHA-256 hash length
            },
            window.trustedPrivateKey,
            hashBuffer
        );

        // Convert signature to Base64
        const signatureBase64 = arrayBufferToBase64(signature);
        
        console.log('✅ Content signed successfully');

        // Get keyId from session storage
        const keyId = sessionStorage.getItem('keyId');

        // Create the meta tag content
        const metaContent = {
            hash: hashHex,
            signature: signatureBase64,
            keyId: keyId
        };

        // Generate the complete meta tag
        const metaTag = `<meta name="ai-trust-anchor" content='${JSON.stringify(metaContent)}'>`;

        // Update UI
        metaTagOutput.value = metaTag;
        copyBtn.disabled = false;
        signBtn.textContent = '✅ Content Signed';
        showStatus('signStatus', 'Content signed successfully! Copy the meta tag below.', 'success');

        console.log('✅ Meta tag generated:', metaTag);

    } catch (error) {
        console.error('❌ Content signing failed:', error);
        signBtn.textContent = '✍️ Sign Content';
        signBtn.disabled = false;
        showStatus('signStatus', `Signing error: ${error.message}`, 'error');
    }
}

// Copy meta tag to clipboard
async function copyMetaTag() {
    const metaTagOutput = document.getElementById('metaTagOutput');
    const copyBtn = document.getElementById('copyBtn');

    try {
        const metaTag = metaTagOutput.value;
        if (!metaTag) {
            showStatus('signStatus', 'No meta tag to copy', 'error');
            return;
        }

        // Use the Clipboard API
        await navigator.clipboard.writeText(metaTag);
        
        // Update button temporarily
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = '#48bb78';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '#ed8936';
        }, 2000);

        showStatus('signStatus', 'Meta tag copied to clipboard!', 'success');
        console.log('✅ Meta tag copied to clipboard');

    } catch (error) {
        console.error('❌ Copy failed:', error);
        showStatus('signStatus', 'Failed to copy to clipboard', 'error');
        
        // Fallback: select the text
        metaTagOutput.select();
        metaTagOutput.setSelectionRange(0, 99999); // For mobile devices
    }
}

// Initialize the dashboard
function initDashboard() {
    console.log('🔐 Trust Anchor Publisher Dashboard Loaded');
    
    // Check if we have stored keys from a previous session
    if (sessionStorage.getItem('hasPrivateKey') === 'true' && sessionStorage.getItem('keyId')) {
        console.log('ℹ️ Previous session detected, but private key needs to be regenerated');
        showStatus('keyStatus', 'Previous session detected. Please generate new keys for security.', 'info');
    }

    // Check Web Crypto API support
    if (!window.crypto || !window.crypto.subtle) {
        showStatus('keyStatus', 'Web Crypto API not supported in this browser', 'error');
        document.getElementById('generateBtn').disabled = true;
        return;
    }

    // Check if running on HTTPS (required for Web Crypto API in production)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        showStatus('keyStatus', 'HTTPS required for Web Crypto API', 'error');
        return;
    }

    console.log('✅ Dashboard initialized successfully');
}

// Content input change handler
document.getElementById('contentInput').addEventListener('input', function() {
    const copyBtn = document.getElementById('copyBtn');
    const metaTagOutput = document.getElementById('metaTagOutput');
    
    // Clear previous signature when content changes
    if (metaTagOutput.value) {
        metaTagOutput.value = '';
        copyBtn.disabled = true;
        document.getElementById('signBtn').textContent = '✍️ Sign Content';
        showStatus('signStatus', 'Content changed. Please sign again.', 'info');
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initDashboard); 