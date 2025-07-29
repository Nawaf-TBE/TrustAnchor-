# 🎬 Scene 3 Setup Guide: Custom GPT Success

## **Quick Setup Checklist**

### **✅ Prerequisites**
- [ ] Node.js installed
- [ ] Python 3 installed
- [ ] Custom GPT configured with Trust Anchor action
- [ ] Backend server running
- [ ] Demo server running

---

## **🚀 Step-by-Step Setup**

### **1. Start Backend Server**
```bash
cd /Users/nawaf/Desktop/TrustAnchor
node backend/server.js
```
**Expected Output**: `✅ Server running on port 3000`

### **2. Start Demo Server**
```bash
# In a new terminal window
cd /Users/nawaf/Desktop/TrustAnchor
python3 -m http.server 8080
```
**Expected Output**: `Serving HTTP on :: port 8080`

### **3. Test Backend API**
```bash
# In a new terminal window
node test-scene3-verification.js
```
**Expected Output**: 
```
✅ SUCCESS: Scene 3 test passed!
✅ The backend correctly returns success for verified content
```

### **4. Test Demo Page**
Open in browser: `http://localhost:8080/demo/sample-company-verified.html`
**Expected**: Page loads with "✅ Trust Anchor Verified" badge

### **5. Verify Custom GPT Action**
- Open ChatGPT
- Go to your Custom GPT
- Check Actions tab
- Verify URL: `http://localhost:3000/openapi.yaml`
- Test connection if available

---

## **🎯 Recording Preparation**

### **Before Recording:**
1. **Clear ChatGPT History**: Start completely new conversation
2. **Test Verification**: Run the test script above
3. **Prepare Script**: Have `scene3-recording-script.md` ready
4. **Check Audio**: Test microphone and recording software

### **Recording Checklist:**
- [ ] Backend server running (port 3000)
- [ ] Demo server running (port 8080)
- [ ] Test script passes
- [ ] Custom GPT action connected
- [ ] New ChatGPT conversation started
- [ ] Recording software ready

---

## **🔧 Troubleshooting**

### **Backend Server Issues:**
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Restart server
node backend/server.js
```

### **Demo Server Issues:**
```bash
# Check if port 8080 is in use
lsof -i :8080

# Alternative server
npx serve . -p 8080
```

### **Custom GPT Action Issues:**
1. **Check URL**: Must be `http://localhost:3000/openapi.yaml`
2. **Test Connection**: Use "Test" button in action config
3. **Clear Cache**: Start new conversation
4. **Check Instructions**: Ensure GPT uses the action

### **API Test Issues:**
```bash
# Manual API test
curl -X POST http://localhost:3000/api/verify \
  -H "Content-Type: application/json" \
  -d '{"url": "http://localhost:8080/demo/sample-company-verified.html"}'
```

---

## **📋 Expected Results**

### **API Response:**
```json
{
  "verified": true,
  "status": "✅ Content Verified",
  "details": "The content on this page was successfully verified against the signature provided by the owner.",
  "timestamp": "2025-01-20T10:30:45.123Z"
}
```

### **Custom GPT Response:**
```
✅ SUCCESS: Content verification successful

Verification Details:
- Status: ✅ Content Verified
- Details: The content on this page was successfully verified against the signature provided by the owner.
- Timestamp: 2025-01-20T10:30:45.123Z

This page contains authentic, cryptographically signed content that has been verified using Trust Anchor technology.
```

---

## **🎬 Recording Tips**

### **Timing:**
- **Total Duration**: 30 seconds
- **Setup Time**: 2-3 minutes
- **Buffer Time**: 1-2 minutes for retakes

### **Key Points:**
1. **Show Action Call**: Highlight "Using Trust Anchor Verifier"
2. **Emphasize Success**: Point out ✅ verification status
3. **Explain Process**: Mention cryptographic verification
4. **Professional Tone**: Confident, clear narration

### **Common Issues:**
- **Action Not Called**: Clear chat history, check action config
- **Wrong Response**: Ensure backend returns success for verified page
- **Server Issues**: Restart servers, check ports
- **Timing**: Practice the script timing

---

## **✅ Success Criteria**

Scene 3 is ready when:
- [ ] Backend returns success for verified page
- [ ] Custom GPT calls the action
- [ ] Response shows ✅ verification
- [ ] Technical details included
- [ ] Professional presentation

**Ready to record! 🎥** 