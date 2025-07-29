# 🤖 Custom GPT Action Test Guide

## 🎯 **Setting Up Trust Anchor Custom GPT Action**

### **Step 1: Create Custom GPT**
1. Go to [chat.openai.com](https://chat.openai.com)
2. Click "Explore" → "Create a GPT"
3. Choose "Create" (start from scratch)

### **Step 2: Configure GPT**
- **Name**: "Trust Anchor Verifier"
- **Description**: "Verifies web content authenticity using cryptographic signatures"

### **Step 3: Add Instructions**
Copy and paste this into the Instructions field:

```
You are Trust Anchor Verifier, a specialized GPT that verifies web content authenticity using cryptographic signatures.

## Core Functionality
- Verify web content using Trust Anchor's cryptographic verification system
- Check if content has been tampered with or modified
- Provide clear verification results with detailed explanations

## Verification Process
1. Extract verification data from web page meta tags
2. Retrieve the corresponding public key from Trust Anchor's key registry
3. Verify the cryptographic signature against the content hash
4. Report verification status and any detected issues

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

## Available Actions
- verify_content: Verify web content using Trust Anchor API
```

### **Step 4: Add Custom Action**
1. Click "Actions" tab
2. Click "Create new action"
3. **Import from URL**: `https://trust-anchor.vercel.app/openapi.yaml`
4. **Save** the action

### **Step 5: Configure Action**
- **Authentication**: None (public API)
- **Base URL**: `https://trust-anchor.vercel.app`
- **Test the connection** to ensure it works

---

## 🧪 **Testing Your Custom GPT Action**

### **Test 1: Successful Verification**
**Prompt**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company.html"

**Expected Response**:
```
✅ Content Verified Successfully

Verification Details:
- Status: VERIFIED
- Content Hash: [hash]
- Signature: Valid
- Key ID: [keyId]
- Timestamp: [timestamp]

The content on this page has been cryptographically verified and is authentic.
```

### **Test 2: Failed Verification**
**Prompt**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-tampered.html"

**Expected Response**:
```
❌ Verification Failed

Verification Details:
- Status: FAILED
- Reason: Hash Mismatch
- Content Hash: [current hash]
- Expected Hash: [original hash]
- Timestamp: [timestamp]

The content has been modified from its original signed version.
```

### **Test 3: No Verification Data**
**Prompt**: "Using Trust Anchor, please verify https://example.com"

**Expected Response**:
```
⚠️ No Verification Data Found

Verification Details:
- Status: UNVERIFIED
- Reason: No Trust Anchor meta tag found
- Timestamp: [timestamp]

This page does not contain Trust Anchor verification data.
```

---

## 🎬 **For Your Demo Recording**

### **Scene 3: Custom GPT Success (0:45-1:15)**
1. **Open**: Your Trust Anchor Verifier GPT
2. **Type**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company.html"
3. **Show**: The verification process
4. **Display**: Successful verification result

### **Scene 4: Custom GPT Failure (1:15-1:35)**
1. **Type**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-tampered.html"
2. **Show**: The verification process
3. **Display**: Failure result with tamper detection

---

## 🔧 **Troubleshooting**

### **If Action Import Fails:**
1. **Check URL**: Ensure `https://trust-anchor.vercel.app/openapi.yaml` is accessible
2. **Verify OpenAPI Spec**: Check that your `openapi.yaml` is valid
3. **Try Local File**: Import the `openapi.yaml` file directly

### **If Verification Fails:**
1. **Check Backend**: Ensure your backend server is running
2. **Verify URLs**: Make sure test pages are accessible
3. **Check Meta Tags**: Ensure pages have proper Trust Anchor meta tags

### **If GPT Doesn't Respond:**
1. **Check Instructions**: Ensure instructions are clear and complete
2. **Test Action**: Verify the action is properly configured
3. **Check Permissions**: Ensure the GPT has access to the action

---

## 🚀 **Ready for Demo!**

Once your Custom GPT Action is set up and tested, you'll have:
- ✅ Working verification system
- ✅ Professional GPT interface
- ✅ Clear success/failure responses
- ✅ Ready for demo recording

**Your Custom GPT Action will be the star of Scenes 3 and 4 in your 2-minute demo!** 🎬 