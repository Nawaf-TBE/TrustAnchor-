#!/usr/bin/env node

/**
 * Test Script for Scene 3: Custom GPT Success Verification
 * 
 * This script tests that the backend correctly returns success
 * for the verified demo page that will be used in Scene 3.
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testScene3Verification() {
    console.log('🧪 Testing Scene 3: Custom GPT Success Verification\n');
    
    const testUrl = 'http://localhost:8080/demo/sample-company-verified.html';
    const apiUrl = 'http://localhost:3000/api/verify';
    
    console.log(`📋 Test URL: ${testUrl}`);
    console.log(`🔗 API Endpoint: ${apiUrl}\n`);
    
    try {
        console.log('🔄 Sending verification request...');
        
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
        
        console.log('📊 Response received:');
        console.log(JSON.stringify(result, null, 2));
        
        // Check if verification was successful
        if (result.verified === true) {
            console.log('\n✅ SUCCESS: Scene 3 test passed!');
            console.log('✅ The backend correctly returns success for verified content');
            console.log('✅ This will work perfectly for your Custom GPT demo');
        } else {
            console.log('\n❌ FAILED: Scene 3 test failed!');
            console.log('❌ Expected verified: true, but got:', result.verified);
            console.log('❌ Status:', result.status);
            console.log('❌ Details:', result.details);
        }
        
        // Additional checks for Scene 3 requirements
        console.log('\n🔍 Scene 3 Requirements Check:');
        
        if (result.status && result.status.includes('✅')) {
            console.log('✅ Status contains success indicator');
        } else {
            console.log('❌ Status missing success indicator');
        }
        
        if (result.details && result.details.includes('successfully verified')) {
            console.log('✅ Details contain verification success message');
        } else {
            console.log('❌ Details missing verification success message');
        }
        
        if (result.timestamp) {
            console.log('✅ Timestamp included');
        } else {
            console.log('❌ Timestamp missing');
        }
        
    } catch (error) {
        console.error('\n💥 Error during test:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure backend server is running: node backend/server.js');
        console.log('2. Make sure demo server is running: python3 -m http.server 8080');
        console.log('3. Check that sample-company-verified.html exists in demo/ folder');
    }
}

// Run the test
testScene3Verification().catch(console.error); 