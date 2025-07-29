# Scene 2 Setup Guide - Publisher Workflow

## 🎬 **Scene 2: Publisher Workflow Demo**

### **Prerequisites:**
- ✅ Backend server running on port 3000
- ✅ HTTP server running on port 8080
- ✅ Frontend dashboard ready
- ✅ Extension updated and reloaded

### **Demo URLs:**
- **Publisher Dashboard**: `http://localhost:8080/frontend/index.html`
- **Clean Demo Page**: `http://localhost:8080/demo/sample-company-scene2.html`

### **Extension Setup:**
1. **Reload the extension** in Chrome extensions page
2. **Make sure extension is enabled** for localhost:8080
3. **Extension should connect to port 3000** (backend)

### **Demo Script:**

#### **Scene A: Dashboard (0:15-0:30)**

1. **Open Publisher Dashboard**
   - Navigate to: `http://localhost:8080/frontend/index.html`
   - Show the clean, professional interface

2. **Enter Content**
   - Paste: *"The official battery life for the TechCorp Z-1 is 22 hours."*
   - Explain this is the content to be verified

3. **Generate Keys**
   - Click "Generate Keys" button
   - Show successful key generation
   - Explain cryptographic key pair creation

4. **Sign Content**
   - Click "Sign Content" button
   - Show successful signing with hash and signature
   - Explain digital signature process

5. **Copy Meta Tag**
   - Click "Copy Meta Tag" button
   - Show the generated meta tag
   - Explain this contains all verification data

#### **Scene B: Code Integration (0:30-0:45)**

1. **Open Demo Page**
   - Navigate to: `http://localhost:8080/demo/sample-company-scene2.html`
   - Show page without verification banner
   - **Show extension icon** (should be gray/unverified)

2. **Open Code Editor**
   - Open `demo/sample-company-scene2.html` in code editor
   - Show the comment lines indicating where meta tag goes

3. **Paste Meta Tag**
   - Delete the comment lines
   - Paste the meta tag from clipboard
   - Show the integration

4. **Save and Refresh**
   - Save the file
   - Refresh the browser
   - **Show verification banner appearing**
   - **Show extension icon changing to green/verified**

### **Expected Results:**
- ✅ Keys generated successfully
- ✅ Content signed with hash and signature
- ✅ Meta tag copied to clipboard
- ✅ Verification banner appears after integration
- ✅ Extension icon changes from gray to green
- ✅ Extension popup shows "Verified" status

### **Key Points to Emphasize:**
1. **Simplicity**: Just a few clicks and one line of code
2. **Security**: Cryptographic signatures prevent tampering
3. **User Trust**: Visual verification indicators (both on page and in extension)
4. **Integration**: Single meta tag implementation
5. **Extension Sync**: Extension automatically detects and verifies content

### **Troubleshooting:**
- If key generation fails: Check backend is running on port 3000
- If demo page doesn't show verification: Ensure meta tag is in `<head>` section
- If extension doesn't work: Reload extension in Chrome extensions page
- If server issues: Restart HTTP server on port 8080

### **Extension Verification:**
- Extension should show gray icon on unverified pages
- Extension should show green icon on verified pages
- Extension popup should show "Verified" status
- Extension should display "This content has been verified by Trust Anchor"

**Ready for Scene 2 recording!** 🎥 