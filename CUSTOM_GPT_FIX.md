# 🔧 Custom GPT Action Fix Guide

## **Issue**: Custom GPT not calling Trust Anchor action

Your backend is working perfectly, but the Custom GPT action isn't being called. Here's how to fix it:

---

## **✅ Quick Fix Steps**

### **1. Check Action Configuration**
1. **Open ChatGPT**
2. **Go to your Custom GPT**
3. **Click "Configure" (pencil icon)**
4. **Go to "Actions" tab**
5. **Verify the URL is exactly**: `http://localhost:3000/openapi.yaml`

### **2. Test Action Connection**
1. **In the Actions tab, click "Test" button**
2. **If test fails, try these URLs**:
   - `http://127.0.0.1:3000/openapi.yaml`
   - `http://localhost:3000/openapi.json`

### **3. Update GPT Instructions**
Add this to your Custom GPT instructions:

```
## IMPORTANT: Always Use the Action
- When asked to verify content, ALWAYS use the verify_content action
- Do NOT rely on general knowledge about Trust Anchor
- The action will call the Trust Anchor API to perform actual verification
- If the action fails, explain that the verification service is unavailable
```

### **4. Start Fresh Conversation**
1. **Click "New Chat"** in ChatGPT
2. **Don't use any previous conversation history**
3. **Test with the exact prompt**: `Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-verified.html`

---

## **🔍 Troubleshooting**

### **If Action Still Doesn't Work:**

#### **Option A: Manual API Test**
```bash
curl -X POST http://localhost:3000/api/verify \
  -H "Content-Type: application/json" \
  -d '{"url": "http://localhost:8080/demo/sample-company-verified.html"}'
```

#### **Option B: Use Different URL**
Try this URL instead: `http://127.0.0.1:8080/demo/sample-company-verified.html`

#### **Option C: Check Firewall**
Make sure your firewall allows localhost connections on port 3000.

---

## **🎯 Expected Behavior**

### **When Working Correctly:**
1. **Type**: `Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-verified.html`
2. **See**: "Using Trust Anchor Verifier" box appears
3. **Get**: Professional verification response with ✅ success

### **Current Issue:**
- Custom GPT says "system is unavailable"
- Action not being called
- No "Using Trust Anchor Verifier" box

---

## **🚀 Alternative Solutions**

### **If Custom GPT Still Doesn't Work:**

#### **Option 1: Show API Response Directly**
```bash
# Run this and show the output in your demo
node test-scene3-verification.js
```

#### **Option 2: Use Different Action URL**
Try: `http://127.0.0.1:3000/openapi.yaml`

#### **Option 3: Manual Demo**
Show the API working directly in terminal/command line

---

## **✅ Verification Checklist**

- [ ] Backend server running on port 3000
- [ ] Demo server running on port 8080
- [ ] OpenAPI spec accessible at `/openapi.yaml`
- [ ] Action URL configured correctly
- [ ] Fresh ChatGPT conversation started
- [ ] Test prompt used exactly as specified

---

## **🎬 For Your Demo**

If the Custom GPT action still doesn't work, you can:

1. **Show the working API response** from the test script
2. **Demonstrate the verification process** manually
3. **Explain that the integration works** (backend is functional)
4. **Focus on the technical achievement** rather than the UI

**The important thing is that your Trust Anchor system is working perfectly!** 🎯 