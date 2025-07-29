# 🎬 Scene 3 Recording Script: Custom GPT Success

## **Scene Overview**
**Duration**: 30 seconds (0:45-1:15)  
**Purpose**: Demonstrate Custom GPT successfully verifying content using Trust Anchor  
**Visual**: ChatGPT UI with successful verification response

---

## **Pre-Recording Setup**

### **1. Start Backend Server**
```bash
cd /Users/nawaf/Desktop/TrustAnchor
node backend/server.js
```
**Expected Output**: `✅ Server running on port 3000`

### **2. Start Demo Server**
```bash
# In a new terminal
cd /Users/nawaf/Desktop/TrustAnchor
python3 -m http.server 8080
```
**Expected Output**: `Serving HTTP on :: port 8080`

### **3. Prepare Custom GPT**
- Open ChatGPT in browser
- Navigate to your Custom GPT
- Start a **new conversation** (important!)
- Ensure the action is connected to `http://localhost:3000/openapi.yaml`

---

## **Recording Steps**

### **Step 1: Open ChatGPT (0:45-0:47)**
- **Action**: Open ChatGPT in browser
- **Visual**: Show ChatGPT interface
- **Audio**: "Now let's see how Trust Anchor works with AI chatbots"

### **Step 2: Navigate to Custom GPT (0:47-0:50)**
- **Action**: Click on your Custom GPT
- **Visual**: Show Custom GPT selection
- **Audio**: "I'll use my Trust Anchor Custom GPT that's connected to the verification API"

### **Step 3: Start New Conversation (0:50-0:52)**
- **Action**: Click "New Chat" or start fresh conversation
- **Visual**: Show empty chat interface
- **Audio**: "Starting a fresh conversation to ensure we get the latest verification results"

### **Step 4: Type Verification Request (0:52-0:58)**
- **Action**: Type exactly: `Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-verified.html`
- **Visual**: Show typing the request
- **Audio**: "I'll ask the AI to verify our demo page that contains properly signed content"

### **Step 5: Show "Using Trust Anchor Verifier" (0:58-1:02)**
- **Action**: Wait for ChatGPT to show "Using Trust Anchor Verifier" box
- **Visual**: Highlight the action being called
- **Audio**: "The AI is now calling the Trust Anchor verification API"

### **Step 6: Display Successful Response (1:02-1:15)**
- **Action**: Show the successful verification response
- **Visual**: Highlight the ✅ success message
- **Audio**: "Perfect! The AI successfully verified the content and confirmed it's authentic"

---

## **Expected ChatGPT Response**

The Custom GPT should return something like:

```
✅ SUCCESS: Content verification successful

Verification Details:
- Status: ✅ Content Verified
- Details: The content on this page was successfully verified against the signature provided by the owner.
- Timestamp: 2025-01-20T10:30:45.123Z

This page contains authentic, cryptographically signed content that has been verified using Trust Anchor technology. The content has not been modified since it was originally signed by the publisher.
```

---

## **Troubleshooting**

### **If Custom GPT doesn't call the action:**
1. **Check Action Configuration**: Verify the action URL is `http://localhost:3000/openapi.yaml`
2. **Clear Chat History**: Start a completely new conversation
3. **Test Connection**: Try the "Test" button in the action configuration
4. **Check Instructions**: Ensure the GPT instructions include "Always use the verify_content action"

### **If Backend isn't responding:**
1. **Check Server**: Ensure `node backend/server.js` is running
2. **Check Port**: Verify server is on port 3000
3. **Test API**: Try `curl -X POST http://localhost:3000/api/verify -H "Content-Type: application/json" -d '{"url": "http://localhost:8080/demo/sample-company-verified.html"}'`

### **If Demo server isn't working:**
1. **Check Port**: Ensure port 8080 is available
2. **Test URL**: Try `http://localhost:8080/demo/sample-company-verified.html` in browser
3. **Alternative**: Use `npx serve .` instead of Python server

---

## **Post-Recording Notes**

### **Success Indicators:**
- ✅ Custom GPT shows "Using Trust Anchor Verifier"
- ✅ Response shows "✅ SUCCESS: Content verification successful"
- ✅ Includes technical details (status, timestamp)
- ✅ Professional, detailed explanation

### **Key Points to Highlight:**
1. **AI Integration**: Shows how AI can now verify content authenticity
2. **Technical Details**: Demonstrates cryptographic verification
3. **User-Friendly**: Complex verification made simple through AI
4. **Real-Time**: Shows live verification process

### **For Next Scene (Scene 4):**
- Keep the same setup
- Use `sample-company-tampered-verified.html` for tamper detection
- Show how AI detects and reports content modification

---

## **Recording Tips**

### **Camera Setup:**
- **Resolution**: 1920x1080 or higher
- **Frame Rate**: 30fps minimum
- **Audio**: Clear microphone, no background noise

### **Screen Recording:**
- **Software**: OBS Studio, QuickTime, or similar
- **Quality**: High quality, clear text
- **Focus**: Keep ChatGPT interface centered

### **Timing:**
- **Total Duration**: Exactly 30 seconds
- **Pacing**: Smooth, professional tempo
- **Transitions**: Natural flow between steps

### **Audio Script:**
- **Tone**: Professional, confident
- **Pace**: Clear, not rushed
- **Key Message**: "AI can now verify content authenticity in real-time" 