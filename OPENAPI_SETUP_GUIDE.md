# 🔧 OpenAPI Setup Guide for Custom GPT Action

## **✅ Clean OpenAPI Spec Ready**

I've created a clean, properly formatted OpenAPI spec that will work with ChatGPT. Here's how to set it up:

---

## **📋 Step-by-Step Instructions**

### **Option 1: Import from URL** (Recommended)
1. **In ChatGPT Custom GPT Actions tab**
2. **Click "Import from URL"**
3. **Enter**: `http://localhost:3000/openapi.yaml`
4. **Click "Import"**
5. **Add Privacy Policy**: `http://localhost:3000/privacy-policy.html`

### **Option 2: Copy-Paste Clean Spec** (If Import Fails)
1. **Copy this clean OpenAPI spec** (below)
2. **Paste it into the Schema text area**
3. **Add Privacy Policy**: `http://localhost:3000/privacy-policy.html`

---

## **📄 Clean OpenAPI Spec (Copy This)**

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
    url: http://localhost:3000/privacy-policy.html
servers:
  - url: 'http://localhost:3000'
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
                  example: "http://localhost:8080/demo/sample-company-verified.html"
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

---

## **🔧 Setup Steps**

### **1. Copy the Spec Above**
- Select and copy the entire YAML content above
- Make sure to include all indentation

### **2. Paste in ChatGPT**
- Go to Custom GPT → Configure → Actions
- Paste the spec into the Schema text area
- Make sure it's properly formatted

### **3. Add Privacy Policy**
- In the "Privacy policy" field, enter:
  `http://localhost:3000/privacy-policy.html`

### **4. Save and Test**
- Click "Save" to save the action
- Start a new conversation
- Test with: `Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-verified.html`

---

## **✅ Expected Result**

After setup, you should see:
- ✅ Schema properly loaded
- ✅ Privacy policy accepted
- ✅ Action saves successfully
- ✅ "Test" button appears (if available)
- ✅ Custom GPT calls the action when prompted

---

## **🎯 Troubleshooting**

### **If Still Getting Parse Error:**
1. **Check indentation** - YAML is sensitive to spaces
2. **Try the URL import** instead of copy-paste
3. **Use a YAML validator** to check formatting

### **If Action Doesn't Work:**
1. **Start fresh conversation**
2. **Use exact prompt**: `Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-verified.html`
3. **Check backend is running**: `curl http://localhost:3000/health`

---

## **🚀 Ready to Test!**

Your clean OpenAPI spec should now work perfectly with ChatGPT's action configuration! 🎯 