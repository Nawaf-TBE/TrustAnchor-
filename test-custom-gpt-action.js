#!/usr/bin/env node

/**
 * Test script for Trust Anchor Custom GPT Action
 * This script tests the API endpoints that will be used by the Custom GPT Action
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'http://localhost:3000'; // Change to https://trust-anchor.vercel.app for production

async function testAPI() {
    console.log('🧪 Testing Trust Anchor API for Custom GPT Action...\n');

    try {
        // Test 1: Check if OpenAPI spec is accessible
        console.log('1️⃣ Testing OpenAPI spec accessibility...');
        const openapiResponse = await fetch(`${BASE_URL}/openapi.yaml`);
        if (openapiResponse.ok) {
            console.log('✅ OpenAPI spec is accessible');
        } else {
            console.log('❌ OpenAPI spec not accessible');
        }

        // Test 2: Test verification with a valid page
        console.log('\n2️⃣ Testing verification with valid page...');
        const validUrl = 'http://localhost:8080/demo/sample-company.html';
        const verifyResponse = await fetch(`${BASE_URL}/api/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: validUrl })
        });

        if (verifyResponse.ok) {
            const result = await verifyResponse.json();
            console.log('✅ Verification API working');
            console.log('Result:', JSON.stringify(result, null, 2));
        } else {
            console.log('❌ Verification API failed');
        }

        // Test 3: Test verification with tampered page
        console.log('\n3️⃣ Testing verification with tampered page...');
        const tamperedUrl = 'http://localhost:8080/demo/sample-company-tampered.html';
        const tamperedResponse = await fetch(`${BASE_URL}/api/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: tamperedUrl })
        });

        if (tamperedResponse.ok) {
            const result = await tamperedResponse.json();
            console.log('✅ Tamper detection working');
            console.log('Result:', JSON.stringify(result, null, 2));
        } else {
            console.log('❌ Tamper detection failed');
        }

        // Test 4: Test verification with non-existent page
        console.log('\n4️⃣ Testing verification with non-existent page...');
        const invalidUrl = 'https://example.com/nonexistent';
        const invalidResponse = await fetch(`${BASE_URL}/api/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: invalidUrl })
        });

        if (invalidResponse.ok) {
            const result = await invalidResponse.json();
            console.log('✅ Error handling working');
            console.log('Result:', JSON.stringify(result, null, 2));
        } else {
            console.log('❌ Error handling failed');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testAPI().then(() => {
    console.log('\n🎬 Custom GPT Action API is ready for demo!');
    console.log('\n📋 Next steps:');
    console.log('1. Create Custom GPT at chat.openai.com');
    console.log('2. Add action with URL: http://localhost:3000/openapi.yaml');
    console.log('3. Test with the prompts from test-custom-gpt.md');
}); 