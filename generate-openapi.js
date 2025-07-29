#!/usr/bin/env node

/**
 * Generate OpenAPI spec with localtunnel URL
 * Usage: node generate-openapi.js <localtunnel-url>
 * Example: node generate-openapi.js https://abc123.loca.lt
 */

const fs = require('fs');
const path = require('path');

function generateOpenAPI(localtunnelUrl) {
    // Remove trailing slash if present
    const baseUrl = localtunnelUrl.replace(/\/$/, '');
    
    const openapiSpec = `openapi: 3.1.0
info:
  title: Trust Anchor Verification API
  description: A service to cryptographically verify the authenticity of web page content using Trust Anchor technology.
  version: "1.0.0"
  contact:
    name: Trust Anchor Support
    email: support@trustanchor.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  externalDocs:
    description: Privacy Policy
    url: ${baseUrl}/privacy-policy.html
servers:
  - url: '${baseUrl}'
paths:
  /api/verify:
    post:
      summary: Verify content authenticity
      description: Verifies the content of a given URL using Trust Anchor cryptographic signatures
      operationId: verifyContent
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - url
              properties:
                url:
                  type: string
                  format: uri
                  description: The full URL of the page to verify
                  example: "${baseUrl}/demo/sample-company-verified.html"
      responses:
        '200':
          description: Verification result
          content:
            application/json:
              schema:
                type: object
                properties:
                  verified:
                    type: boolean
                    description: Whether the content was successfully verified
                  status:
                    type: string
                    description: Human-readable status message
                  details:
                    type: string
                    description: Detailed explanation of the verification result
                  timestamp:
                    type: string
                    format: date-time
                    description: UTC timestamp of when verification was performed
                required:
                  - verified
                  - status
                  - details
                  - timestamp
              examples:
                success:
                  summary: Successful verification
                  value:
                    verified: true
                    status: "✅ Content Verified"
                    details: "The content on this page was successfully verified against the signature provided by the owner."
                    timestamp: "2025-01-20T10:30:45.123Z"
                failure:
                  summary: Failed verification
                  value:
                    verified: false
                    status: "❌ Verification Failed"
                    details: "No ai-trust-anchor meta tag found"
                    timestamp: "2025-01-20T10:30:45.123Z"
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Error message
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Error message`;

    return openapiSpec;
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('🚀 Trust Anchor OpenAPI Generator');
        console.log('');
        console.log('Usage: node generate-openapi.js <localtunnel-url>');
        console.log('Example: node generate-openapi.js https://abc123.loca.lt');
        console.log('');
        console.log('This will generate an OpenAPI spec file with your localtunnel URL.');
        return;
    }

    const localtunnelUrl = args[0];
    
    if (!localtunnelUrl.startsWith('https://')) {
        console.error('❌ Error: URL must start with https://');
        console.log('Example: https://abc123.loca.lt');
        process.exit(1);
    }

    try {
        const openapiSpec = generateOpenAPI(localtunnelUrl);
        const outputFile = 'openapi-localtunnel.yaml';
        
        fs.writeFileSync(outputFile, openapiSpec);
        
        console.log('✅ OpenAPI spec generated successfully!');
        console.log(`📁 File: ${outputFile}`);
        console.log(`🌐 Base URL: ${localtunnelUrl}`);
        console.log('');
        console.log('📋 Next Steps:');
        console.log('1. Copy the content of openapi-localtunnel.yaml');
        console.log('2. Paste it into your Custom GPT action schema');
        console.log('3. Add privacy policy URL: ' + localtunnelUrl + '/privacy-policy.html');
        console.log('');
        console.log('🎯 Test URL: ' + localtunnelUrl + '/demo/sample-company-verified.html');
        
    } catch (error) {
        console.error('❌ Error generating OpenAPI spec:', error.message);
        process.exit(1);
    }
}

main(); 