# 🎬 Trust Anchor Demo Visual Asset Checklist

## 📋 **Complete Demo Video Plan (2 Minutes)**

### **Scene 1: The "Problem" Screenshot (0:00-0:15)**
**Visual**: AI Chatbot Hallucination
- **Content**: ChatGPT confidently stating incorrect information
- **Example**: "The TechCorp Z-1 laptop has a 48-hour battery life."
- **Purpose**: Establish the AI hallucination problem
- **Duration**: 15 seconds

### **Scene 2: Publisher Workflow (0:15-0:45)**
**Visual**: Screen recording of content signing process
- **Scene A - Dashboard**:
  - Show `frontend/index.html` page
  - Paste official text: "The official battery life for the TechCorp Z-1 is 22 hours."
  - Click "Generate Keys" → "Sign Content"
  - Show generated meta tag in output box
  - Copy meta tag to clipboard
- **Scene B - Code Integration**:
  - Switch to code editor showing `demo/sample-company.html`
  - Paste meta tag into `<head>` section
- **Purpose**: Demonstrate easy content signing
- **Duration**: 30 seconds

### **Scene 3: Custom GPT Success (0:45-1:15)**
**Visual**: ChatGPT UI with successful verification
- **Content**:
  - Type: "Using Trust Anchor, please verify https://instapage.com/blog/demo-landing-pages/"
  - Show "Using Trust Anchor Verifier" box
  - Display successful response: "✅ Content Verified..."
- **Purpose**: Prove AI integration works
- **Duration**: 30 seconds

### **Scene 4: Custom GPT Failure (1:15-1:35)**
**Visual**: ChatGPT UI with tamper detection
- **Content**:
  - Verify tampered URL (content altered without re-signing)
  - Show failure response: "❌ Verification Failed. Reason: Hash Mismatch"
- **Purpose**: Demonstrate security and robustness
- **Duration**: 20 seconds

### **Scene 5: Chrome Extension (1:35-2:00)**
**Visual**: Browser with extension verification
- **Content**:
  - Load valid `demo/sample-company.html` page
  - Show extension icon changing to green checkmark
  - Click icon to show "Verified" popup
- **Purpose**: Show ecosystem flexibility
- **Duration**: 25 seconds

---

## 🛠️ **Required Files & Setup**

### **1. Problem Screenshot Setup**
- Create fake ChatGPT conversation
- Use browser dev tools to modify response
- Screenshot the hallucination

### **2. Publisher Workflow Files**
- `frontend/index.html` - Content signing interface
- `demo/sample-company.html` - Sample company page
- Ensure meta tag generation works

### **3. Custom GPT Integration**
- Verify Custom GPT Action is configured
- Test with production API: `https://trust-anchor.vercel.app`
- Prepare test URLs

### **4. Chrome Extension**
- Ensure extension is loaded
- Test with sample pages
- Verify icon state changes

---

## 🎯 **Recording Sequence**

### **Pre-Recording Setup (10 minutes)**
1. **Start all services**:
   ```bash
   npm start                    # Backend API
   python3 -m http.server 8080 # Test server
   ```

2. **Prepare test pages**:
   - `http://localhost:8080/frontend/index.html`
   - `http://localhost:8080/demo/sample-company.html`

3. **Verify Custom GPT Action**:
   - Test with production API
   - Ensure verification works

4. **Load Chrome Extension**:
   - Install extension
   - Test with sample pages

### **Recording Order**
1. **Scene 1**: Screenshot ChatGPT hallucination
2. **Scene 2**: Record publisher workflow (30s)
3. **Scene 3**: Record Custom GPT success (30s)
4. **Scene 4**: Record Custom GPT failure (20s)
5. **Scene 5**: Record Chrome extension (25s)

---

## 📁 **File Structure for Demo**

```
TrustAnchor/
├── frontend/
│   └── index.html          # Publisher dashboard
├── demo/
│   └── sample-company.html # Sample company page
├── extension/              # Chrome extension
├── backend/                # API server
└── screenshots/            # Problem screenshots
```

---

## 🎬 **Success Criteria**

### **Each Scene Must Show**:
- ✅ Clear problem identification
- ✅ Easy content signing process
- ✅ Successful AI verification
- ✅ Robust tamper detection
- ✅ Browser extension integration

### **Technical Requirements**:
- ✅ All services running
- ✅ Custom GPT Action configured
- ✅ Chrome extension loaded
- ✅ Meta tag generation working
- ✅ API verification functional

---

## 🚀 **Ready to Record!**

This plan provides a complete narrative arc from problem to solution, showcasing all Trust Anchor features in a compelling 2-minute demo. 