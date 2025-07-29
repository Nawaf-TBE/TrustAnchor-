# 🤖 Custom GPT Action - Quick Setup Guide

## 🚀 **5-Minute Setup for Your Demo**

### **Step 1: Start Your Services**
```bash
# Terminal 1: Backend API
npm start

# Terminal 2: Test Server  
python3 -m http.server 8080
```

### **Step 2: Test Your API**
```bash
# Run the test script
node test-custom-gpt-action.js
```

### **Step 3: Create Custom GPT**
1. **Go to**: [chat.openai.com](https://chat.openai.com)
2. **Click**: "Explore" → "Create a GPT"
3. **Choose**: "Create" (start from scratch)

### **Step 4: Configure GPT**
- **Name**: "Trust Anchor Verifier"
- **Description**: "Verifies web content authenticity using cryptographic signatures"

### **Step 5: Add Instructions**
Copy this into the Instructions field:

```
You are Trust Anchor Verifier, a specialized GPT that verifies web content authenticity using cryptographic signatures.

## Core Functionality
- Verify web content using Trust Anchor's cryptographic verification system
- Check if content has been tampered with or modified
- Provide clear verification results with detailed explanations

## Response Format
Always provide verification results in this format:
- ✅ VERIFIED: Content is authentic and unchanged
- ❌ FAILED: Content verification failed (with reason)
- ⚠️ WARNING: Content has no verification data

## Important Guidelines
- Only verify content when explicitly requested
- Provide neutral, factual verification reports
- Explain technical details in accessible language
- Always include the verification timestamp
- If verification fails, explain the specific reason
```

### **Step 6: Add Custom Action**
1. **Click**: "Actions" tab
2. **Click**: "Create new action"
3. **Import from URL**: `http://localhost:3000/openapi.yaml`
4. **Save** the action

### **Step 7: Test Your GPT**
**Test Prompts**:
- "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company.html"
- "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-tampered.html"

---

## 🎬 **For Your Demo Recording**

### **Scene 3: Success (0:45-1:15)**
1. **Open**: Your Trust Anchor Verifier GPT
2. **Type**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company.html"
3. **Show**: The verification process
4. **Display**: ✅ VERIFIED result

### **Scene 4: Failure (1:15-1:35)**
1. **Type**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-tampered.html"
2. **Show**: The verification process
3. **Display**: ❌ FAILED result

---

## 🔧 **Troubleshooting**

### **If Action Import Fails**:
- Check that your backend is running: `npm start`
- Verify OpenAPI spec: `curl http://localhost:3000/openapi.yaml`
- Try importing the `openapi.yaml` file directly

### **If Verification Fails**:
- Ensure test server is running: `python3 -m http.server 8080`
- Check that test pages exist and are accessible
- Verify meta tags are present in test pages

### **If GPT Doesn't Respond**:
- Check that the action is properly configured
- Ensure the GPT has access to the action
- Try re-saving the action configuration

---

## ✅ **Success Indicators**

Your Custom GPT Action is working when:
- ✅ Action imports successfully
- ✅ GPT responds to verification requests
- ✅ Success case shows "✅ VERIFIED"
- ✅ Failure case shows "❌ FAILED"
- ✅ Responses include technical details

---

## 🎬 **Ready for Demo!**

Once set up, your Custom GPT Action will:
- Provide professional verification responses
- Handle both success and failure cases
- Include detailed technical information
- Be ready for your 2-minute demo recording

**Your Custom GPT Action is the key feature that will impress judges in your demo!** 🚀 