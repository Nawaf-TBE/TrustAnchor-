# 🎬 Trust Anchor Demo Setup Guide

## 📋 **Complete Demo Video Setup (2 Minutes)**

### **🎯 Demo Overview**
This guide will help you set up and record a professional 2-minute demo showcasing Trust Anchor's complete verification system, from problem identification to solution demonstration.

---

## 🛠️ **Pre-Recording Setup (15 minutes)**

### **1. Start All Services**
```bash
# Terminal 1: Backend API
npm start

# Terminal 2: Test Server  
python3 -m http.server 8080
```

### **2. Verify Services Are Running**
- ✅ Backend API: `http://localhost:3000/health` → Should return `{"status":"ok"}`
- ✅ Test Server: `http://localhost:8080` → Should serve files
- ✅ Production API: `https://trust-anchor.vercel.app` → Should be accessible

### **3. Prepare Test Pages**
- ✅ Publisher Dashboard: `http://localhost:8080/frontend/index.html`
- ✅ Sample Company Page: `http://localhost:8080/demo/sample-company.html`
- ✅ Tampered Page: `http://localhost:8080/demo/sample-company-tampered.html`

### **4. Custom GPT Action Setup**
- ✅ Verify Custom GPT Action is configured
- ✅ Test with production API URL
- ✅ Ensure verification endpoints work

### **5. Chrome Extension Setup**
- ✅ Load extension in Chrome
- ✅ Test with sample pages
- ✅ Verify icon state changes

---

## 🎬 **Scene-by-Scene Recording Guide**

### **Scene 1: Problem Screenshot (0:00-0:15)**
**Duration**: 15 seconds
**Content**: AI Chatbot Hallucination

#### **Setup Steps**:
1. Open ChatGPT in browser
2. Ask: "What is the battery life of the TechCorp Z-1 laptop?"
3. Use dev tools to modify response to show "48 hours"
4. Take screenshot of modified conversation
5. Save as `screenshots/problem-screenshot.png`

#### **Narration**:
*"AI chatbots often provide incorrect information with confidence. Here, ChatGPT claims the TechCorp Z-1 has a 48-hour battery life, when the actual specification is 22 hours."*

---

### **Scene 2: Publisher Workflow (0:15-0:45)**
**Duration**: 30 seconds
**Content**: Content signing process

#### **Scene A - Dashboard (0:15-0:30)**:
1. **Open**: `http://localhost:8080/frontend/index.html`
2. **Show**: Clean publisher dashboard
3. **Enter**: "The official battery life for the TechCorp Z-1 is 22 hours."
4. **Click**: "Generate Keys" → Show success message
5. **Click**: "Sign Content" → Show signature generation
6. **Click**: "Copy Meta Tag" → Show meta tag copied

#### **Scene B - Code Integration (0:30-0:45)**:
1. **Switch to**: Code editor (VS Code, etc.)
2. **Open**: `demo/sample-company.html`
3. **Show**: `<head>` section
4. **Paste**: Meta tag into HTML
5. **Highlight**: Meta tag integration

#### **Narration**:
*"Now let's see how easy it is for content publishers to sign their content. We enter the official specification, generate cryptographic keys, sign the content, and copy the verification meta tag to paste into their HTML."*

---

### **Scene 3: Custom GPT Success (0:45-1:15)**
**Duration**: 30 seconds
**Content**: Successful verification

#### **Setup Steps**:
1. **Open**: ChatGPT with Custom GPT Action
2. **Type**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company.html"
3. **Show**: "Using Trust Anchor Verifier" box appearing
4. **Display**: Successful response: "✅ Content Verified..."

#### **Narration**:
*"Now let's verify the content using our Custom GPT Action. We ask it to verify the TechCorp page, and it successfully confirms the content is authentic and hasn't been tampered with."*

---

### **Scene 4: Custom GPT Failure (1:15-1:35)**
**Duration**: 20 seconds
**Content**: Tamper detection

#### **Setup Steps**:
1. **Type**: "Using Trust Anchor, please verify http://localhost:8080/demo/sample-company-tampered.html"
2. **Show**: "Using Trust Anchor Verifier" box appearing
3. **Display**: Failure response: "❌ Verification Failed. Reason: Hash Mismatch"

#### **Narration**:
*"Let's test our tamper detection. When we verify the tampered page, the system immediately detects that the content has been modified and fails verification."*

---

### **Scene 5: Chrome Extension (1:35-2:00)**
**Duration**: 25 seconds
**Content**: Browser extension verification

#### **Setup Steps**:
1. **Load**: `http://localhost:8080/demo/sample-company.html`
2. **Show**: Extension icon in toolbar
3. **Demonstrate**: Icon changing to green checkmark
4. **Click**: Extension icon to show "Verified" popup

#### **Narration**:
*"Finally, let's see the Chrome extension in action. It automatically detects the verified page and shows a green checkmark, providing instant visual confirmation of content authenticity."*

---

## 📁 **File Structure for Demo**

```
TrustAnchor/
├── frontend/
│   └── index.html                    # Publisher dashboard
├── demo/
│   ├── sample-company.html           # Valid company page
│   └── sample-company-tampered.html  # Tampered version
├── screenshots/
│   ├── README.md                     # Screenshot setup guide
│   └── problem-screenshot.png        # AI hallucination screenshot
├── extension/                        # Chrome extension
├── backend/                          # API server
├── DEMO_VISUAL_PLAN.md              # Complete demo plan
├── DEMO_SETUP_GUIDE.md              # This file
└── VIDEO_SCRIPT.md                  # Detailed script
```

---

## 🎯 **Success Criteria**

### **Technical Requirements**:
- ✅ All services running smoothly
- ✅ Meta tag generation working
- ✅ API verification functional
- ✅ Custom GPT Action configured
- ✅ Chrome extension loaded

### **Demo Flow Requirements**:
- ✅ Clear problem identification
- ✅ Easy content signing process
- ✅ Successful AI verification
- ✅ Robust tamper detection
- ✅ Browser extension integration

### **Visual Quality**:
- ✅ Professional appearance
- ✅ Clear transitions
- ✅ Good audio quality
- ✅ Proper timing (2 minutes)
- ✅ Compelling narrative

---

## 🚀 **Recording Commands**

### **Start Recording**:
1. **Prepare all services** (15 minutes)
2. **Test each scene** (5 minutes)
3. **Begin recording** with problem screenshot
4. **Follow script** in `VIDEO_SCRIPT.md`
5. **Record all 5 scenes** in sequence

### **Post-Recording**:
1. **Review footage** for quality
2. **Check timing** (should be ~2 minutes)
3. **Verify all features** are clearly shown
4. **Add captions** if needed
5. **Export final video**

---

## 🎬 **Ready to Record!**

This setup guide provides everything needed for a professional 2-minute Trust Anchor demo that showcases the complete verification system from problem to solution.

**Key Files Created**:
- `frontend/index.html` - Publisher dashboard
- `demo/sample-company.html` - Sample company page
- `demo/sample-company-tampered.html` - Tampered version
- `screenshots/README.md` - Screenshot setup
- `DEMO_VISUAL_PLAN.md` - Complete plan
- `DEMO_SETUP_GUIDE.md` - This guide

**Next Steps**:
1. Follow the setup guide
2. Create the problem screenshot
3. Test all scenes
4. Record the demo
5. Review and finalize

Good luck with your Trust Anchor demo! 🎬 