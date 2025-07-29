# 🚀 Localtunnel Setup for Custom GPT Action

## **✅ Installation Complete**

`localtunnel` has been installed globally. Now let's set up your public HTTPS URL.

---

## **📋 Step-by-Step Instructions**

### **Step 1: Start Your Backend Server**
```bash
# In Terminal 1
cd /Users/nawaf/Desktop/TrustAnchor
node backend/server.js
```

**Expected Output:**
```
🔒 TrustAnchor Content Verification Server running on http://localhost:3000
📊 Health check: http://localhost:3000/health
🔧 API Documentation:
   POST /api/keys - Store public key
   GET /api/keys/:keyId - Retrieve public key
   POST /api/verify - Verify content trust
   GET /health - Server health status
```

### **Step 2: Start Localtunnel**
```bash
# In Terminal 2 (new terminal window)
lt --port 3000
```

**Expected Output:**
```
your url is: https://abc123.loca.lt
```

**Copy this HTTPS URL!** (e.g., `https://abc123.loca.lt`)

### **Step 3: Test Your Public URL**
```bash
# In Terminal 3 (new terminal window)
curl https://abc123.loca.lt/health
```

**Expected Output:**
```json
{"status":"ok","timestamp":"2025-01-20T10:30:45.123Z"}
```

### **Step 4: Update OpenAPI Spec**
Create a new OpenAPI spec with your public URL:

```yaml
openapi: 3.1.0
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
    url: https://abc123.loca.lt/privacy-policy.html
servers:
  - url: 'https://abc123.loca.lt'
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
                  example: "https://abc123.loca.lt/demo/sample-company-verified.html"
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
                    description: Error message
```

**Replace `abc123.loca.lt` with your actual localtunnel URL!**

### **Step 5: Update Custom GPT Action**
1. **Open ChatGPT**
2. **Go to your Custom GPT**
3. **Click "Configure" (pencil icon)**
4. **Go to "Actions" tab**
5. **Click "Import from URL"**
6. **Enter**: `https://abc123.loca.lt/openapi.yaml`
7. **Add Privacy Policy**: `https://abc123.loca.lt/privacy-policy.html`
8. **Click "Save"**

### **Step 6: Test the Action**
1. **Start a new ChatGPT conversation**
2. **Type**: `Using Trust Anchor, please verify https://abc123.loca.lt/demo/sample-company-verified.html`
3. **Should see**: "Using Trust Anchor Verifier" action call
4. **Get**: ✅ Success response

---

## **🎯 Important Notes**

### **URL Management:**
- **Localtunnel URLs change each time** you restart the tunnel
- **Keep both terminals open** during your demo
- **Update the OpenAPI spec** with the new URL each time

### **Demo URLs:**
- **Backend API**: `https://abc123.loca.lt/api/verify`
- **Demo Page**: `https://abc123.loca.lt/demo/sample-company-verified.html`
- **Privacy Policy**: `https://abc123.loca.lt/privacy-policy.html`

### **Troubleshooting:**
- **If tunnel fails**: Restart with `lt --port 3000`
- **If URLs don't work**: Check both servers are running
- **If action fails**: Update OpenAPI spec with new URL

---

## **🎬 For Your Demo**

### **Before Recording:**
1. **Start backend server** (Terminal 1)
2. **Start localtunnel** (Terminal 2)
3. **Copy the HTTPS URL**
4. **Update OpenAPI spec**
5. **Update Custom GPT action**
6. **Test the action**

### **During Recording:**
1. **Show both terminals running**
2. **Highlight the public HTTPS URL**
3. **Test the Custom GPT action**
4. **Show successful verification**

---

## **✅ Success Checklist**

- [ ] Backend server running on port 3000
- [ ] Localtunnel running with HTTPS URL
- [ ] Public URL accessible (curl test works)
- [ ] OpenAPI spec updated with public URL
- [ ] Custom GPT action updated
- [ ] Action test passes
- [ ] Fresh conversation works

---

## **🚀 Ready for Hackathon Demo!**

Your Trust Anchor system is now accessible via public HTTPS URL and ready for Custom GPT integration! 🎯 