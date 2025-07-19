#!/usr/bin/env node

/**
 * Trust Anchor Demo Automation Script
 * 
 * This script automates the entire demo pipeline:
 * 1. Starts the backend server
 * 2. Generates RSA key pair
 * 3. Registers public key with server
 * 4. Signs the TechCorp page content
 * 5. Updates the HTML file with valid signature
 * 6. Provides ready-to-use demo
 */

const { spawn } = require('child_process');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const API_BASE = 'http://localhost:3000/api';
const DEMO_FILE = path.join(__dirname, '../demo/sample-company.html');
const SERVER_SCRIPT = path.join(__dirname, '../backend/server.js');

let serverProcess = null;

// Import fetch for Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/**
 * Start the backend server and wait for it to be ready
 */
async function startServer() {
    return new Promise((resolve, reject) => {
        console.log('🔄 Starting Trust Anchor server...');
        
        serverProcess = spawn('node', [SERVER_SCRIPT], {
            stdio: ['pipe', 'pipe', 'pipe'],
            cwd: path.dirname(SERVER_SCRIPT)
        });

        let output = '';
        
        serverProcess.stdout.on('data', (data) => {
            const text = data.toString();
            output += text;
            
            // Check if server is ready
            if (text.includes('🔒 TrustAnchor Content Verification Server running')) {
                console.log('✅ Server started successfully');
                setTimeout(resolve, 1000); // Give server a moment to fully initialize
            }
        });

        serverProcess.stderr.on('data', (data) => {
            console.error('Server error:', data.toString());
        });

        serverProcess.on('error', (error) => {
            console.error('Failed to start server:', error);
            reject(error);
        });

        serverProcess.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Server exited with code ${code}`));
            }
        });

        // Timeout after 10 seconds
        setTimeout(() => {
            if (!serverProcess.killed) {
                reject(new Error('Server startup timeout'));
            }
        }, 10000);
    });
}

/**
 * Generate RSA key pair using Node.js crypto
 */
async function generateKeyPair() {
    console.log('🔑 Generating RSA key pair...');
    
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'der'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }, (err, publicKey, privateKey) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    publicKey: Buffer.from(publicKey).toString('base64'),
                    privateKey: privateKey
                });
            }
        });
    });
}

/**
 * Register public key with the server
 */
async function registerPublicKey(publicKeyBase64) {
    console.log('📤 Registering public key with server...');
    
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
        throw new Error(`Failed to register public key: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.error || 'Failed to register public key');
    }

    console.log('✅ Public key registered, keyId:', result.keyId);
    return result.keyId;
}

/**
 * Read and parse the demo HTML file
 */
async function readDemoFile() {
    console.log('📖 Reading demo HTML file...');
    
    const htmlContent = await fs.readFile(DEMO_FILE, 'utf8');
    return htmlContent;
}

/**
 * Extract body text content using cheerio (same as backend)
 */
function extractBodyContent(html) {
    const $ = cheerio.load(html);
    const bodyText = $('body').text().trim();
    console.log(`📄 Extracted body content (${bodyText.length} characters)`);
    return bodyText;
}

/**
 * Hash content with SHA-256
 */
function hashContent(content) {
    const hash = crypto.createHash('sha256').update(content, 'utf8').digest('hex');
    console.log('🔢 Content hash:', hash);
    return hash;
}

/**
 * Sign the hash using RSA with the private key (compatible with backend verification)
 */
function signHash(hash, privateKeyPem) {
    console.log('✍️ Signing content hash...');
    
    const hashBuffer = Buffer.from(hash, 'hex');
    
    // Use traditional RSA signature (compatible with backend's crypto.createVerify)
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(hashBuffer);
    const signature = sign.sign(privateKeyPem);
    
    const signatureBase64 = signature.toString('base64');
    console.log('✅ Content signed successfully');
    return signatureBase64;
}

/**
 * Create the meta tag content
 */
function createMetaTagContent(hash, signature, keyId) {
    const metaContent = {
        hash: hash,
        signature: signature,
        keyId: keyId
    };
    
    return `<meta name="ai-trust-anchor" content='${JSON.stringify(metaContent)}'>`;
}

/**
 * Reset the HTML file to placeholder format
 */
async function resetHtmlFile() {
    console.log('🔄 Resetting HTML file to placeholder format...');
    
    const htmlContent = await fs.readFile(DEMO_FILE, 'utf8');
    
    // Replace any existing meta tag with placeholder
    const resetHtml = htmlContent.replace(
        /<meta\s+name="ai-trust-anchor"[^>]*>/,
        '<meta name="ai-trust-anchor" content="{}">'
    );
    
    await fs.writeFile(DEMO_FILE, resetHtml, 'utf8');
    console.log('✅ HTML file reset to placeholder format');
}

/**
 * Update the HTML file with the signed meta tag
 */
async function updateHtmlFile(html, newMetaTag) {
    console.log('📝 Updating HTML file with signed meta tag...');
    
    // More robust regex to handle various placeholder formats
    const placeholderRegex = /<meta\s+name="ai-trust-anchor"\s+content="\{\}"[^>]*>/;
    
    // Replace the placeholder meta tag
    const updatedHtml = html.replace(placeholderRegex, newMetaTag);
    
    // Verify the replacement worked
    if (updatedHtml === html) {
        console.log('❌ Current meta tag in file:', html.match(/<meta\s+name="ai-trust-anchor"[^>]*>/)?.[0] || 'Not found');
        console.log('❌ Expected pattern:', placeholderRegex.toString());
        throw new Error('Failed to find and replace placeholder meta tag');
    }
    
    await fs.writeFile(DEMO_FILE, updatedHtml, 'utf8');
    console.log('✅ HTML file updated successfully');
}

/**
 * Verify the signature works with the backend
 */
async function verifyWithBackend() {
    console.log('🔍 Verifying signature with backend...');
    
    const response = await fetch(`${API_BASE}/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: 'http://localhost:3000/demo/sample-company.html'
        })
    });

    if (!response.ok) {
        throw new Error(`Verification failed: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.verified) {
        console.log('✅ Backend verification successful!');
        console.log('📊 Verification details:', {
            verified: result.verified,
            reason: result.reason,
            hashMatch: result.details?.hashMatch,
            signatureValid: result.details?.signatureValid
        });
    } else {
        console.log('❌ Backend verification failed:', result.reason);
        throw new Error(`Verification failed: ${result.reason}`);
    }
}

/**
 * Cleanup function to stop the server
 */
function cleanup() {
    if (serverProcess && !serverProcess.killed) {
        console.log('🧹 Stopping server...');
        serverProcess.kill('SIGTERM');
        
        // Force kill if it doesn't stop gracefully
        setTimeout(() => {
            if (!serverProcess.killed) {
                serverProcess.kill('SIGKILL');
            }
        }, 3000);
    }
}

/**
 * Main demo automation function
 */
async function runDemo() {
    try {
        console.log('🚀 Starting Trust Anchor Demo Automation\n');

        // 1. Start the backend server
        await startServer();

        // 2. Generate RSA key pair
        const { publicKey, privateKey } = await generateKeyPair();

        // 3. Register public key with server
        const keyId = await registerPublicKey(publicKey);

        // 4. Reset HTML file to placeholder format
        await resetHtmlFile();
        
        // 5. Read the demo HTML file
        const htmlContent = await readDemoFile();

        // 6. Extract body content (same as backend verification)
        const bodyContent = extractBodyContent(htmlContent);

        // 7. Hash the content
        const contentHash = hashContent(bodyContent);

        // 8. Sign the hash
        const signature = signHash(contentHash, privateKey);

        // 9. Create the meta tag
        const metaTag = createMetaTagContent(contentHash, signature, keyId);

        // 10. Update the HTML file
        await updateHtmlFile(htmlContent, metaTag);

        // 11. Verify with backend
        await verifyWithBackend();

        console.log('\n🎉 Demo automation completed successfully!');
        console.log('✅ Demo is ready at http://localhost:3000/demo/sample-company.html');
        console.log('📊 Dashboard available at http://localhost:3000');
        console.log('\n🔧 Next steps:');
        console.log('   1. Visit the demo page to see the verified content');
        console.log('   2. Load the Chrome extension to see automatic verification');
        console.log('   3. Use the publisher dashboard to sign more content');
        console.log('\n💡 Press Ctrl+C to stop the server when done testing');

        // Keep the server running
        process.on('SIGINT', () => {
            console.log('\n🛑 Received interrupt signal, cleaning up...');
            cleanup();
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            console.log('\n🛑 Received termination signal, cleaning up...');
            cleanup();
            process.exit(0);
        });

    } catch (error) {
        console.error('\n❌ Demo automation failed:', error.message);
        cleanup();
        process.exit(1);
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    cleanup();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    cleanup();
    process.exit(1);
});

// Run the demo
if (require.main === module) {
    runDemo();
}

module.exports = {
    runDemo,
    startServer,
    generateKeyPair,
    registerPublicKey,
    resetHtmlFile,
    cleanup
}; 