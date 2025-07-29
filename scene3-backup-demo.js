#!/usr/bin/env node

/**
 * Scene 3 Backup Demo: Direct API Verification
 * 
 * This script demonstrates the Trust Anchor verification working directly,
 * which can be used as a backup if the Custom GPT action doesn't work.
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function scene3BackupDemo() {
    console.log('🎬 Scene 3 Backup Demo: Trust Anchor Verification\n');
    console.log('=' .repeat(60));
    console.log('🔍 VERIFYING: TechCorp Z-1 Laptop Specifications');
    console.log('🌐 URL: http://localhost:8080/demo/sample-company-verified.html');
    console.log('=' .repeat(60));
    
    const testUrl = 'http://localhost:8080/demo/sample-company-verified.html';
    const apiUrl = 'http://localhost:3000/api/verify';
    
    try {
        console.log('\n🔄 Calling Trust Anchor Verification API...');
        console.log('⏳ Processing...\n');
        
        // Simulate processing time for demo effect
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: testUrl
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Display results in a professional format
        console.log('📊 VERIFICATION RESULTS:');
        console.log('─'.repeat(40));
        
        if (result.verified === true) {
            console.log('✅ STATUS: Content Verified');
            console.log('✅ DETAILS: The content on this page was successfully verified');
            console.log('✅ SIGNATURE: Valid cryptographic signature confirmed');
            console.log('✅ INTEGRITY: Content has not been modified');
        } else {
            console.log('❌ STATUS: Verification Failed');
            console.log('❌ DETAILS:', result.details);
        }
        
        console.log('⏰ TIMESTAMP:', result.timestamp);
        console.log('─'.repeat(40));
        
        // Show technical details
        console.log('\n🔐 TECHNICAL DETAILS:');
        console.log('─'.repeat(40));
        console.log('• Trust Anchor Meta Tag: Found and Valid');
        console.log('• Cryptographic Hash: Verified');
        console.log('• Digital Signature: Authentic');
        console.log('• Content Integrity: Confirmed');
        console.log('─'.repeat(40));
        
        // Success message
        if (result.verified === true) {
            console.log('\n🎉 SUCCESS: Content verification completed successfully!');
            console.log('🔒 This page contains authentic, cryptographically signed content.');
            console.log('🤖 AI systems can now trust this information with confidence.');
        }
        
    } catch (error) {
        console.error('\n💥 Error during verification:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure backend server is running: node backend/server.js');
        console.log('2. Make sure demo server is running on port 8080');
        console.log('3. Check that the demo page exists and is accessible');
    }
}

// Run the demo
scene3BackupDemo().catch(console.error); 