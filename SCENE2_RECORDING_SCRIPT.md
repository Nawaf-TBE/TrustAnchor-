# Scene 2 Recording Script - Publisher Workflow

## 🎬 **Scene 2: Publisher Workflow Demo**

### **Setup Checklist:**
- ✅ Backend server running on port 3000
- ✅ HTTP server running on port 8080  
- ✅ Extension reloaded and enabled
- ✅ Demo pages ready

### **Demo URLs:**
- **Publisher Dashboard**: `http://localhost:8080/frontend/index.html`
- **Clean Demo Page**: `http://localhost:8080/demo/sample-company-scene2-clean.html`
- **Test Extension**: `http://localhost:8080/test-extension.html`

---

## **🎥 Recording Script**

### **Scene A: Publisher Dashboard (0:15-0:30)**

**NARRATION:** *"Now let's see how easy it is for publishers to add Trust Anchor verification to their content."*

1. **Open Publisher Dashboard**
   - Navigate to: `http://localhost:8080/frontend/index.html`
   - Show the clean, professional interface
   - **SAY:** *"This is our publisher dashboard where content creators can easily add Trust Anchor verification."*

2. **Enter Content to Verify**
   - In the content field, paste: *"The official battery life for the TechCorp Z-1 is 22 hours."*
   - **SAY:** *"Let's verify this important specification about battery life."*

3. **Generate Cryptographic Keys**
   - Click "Generate Keys" button
   - Show successful key generation
   - **SAY:** *"First, we generate a unique cryptographic key pair for this content."*

4. **Sign the Content**
   - Click "Sign Content" button
   - Show successful signing with hash and signature
   - **SAY:** *"Now we cryptographically sign the content, creating a digital fingerprint that proves authenticity."*

5. **Copy Meta Tag**
   - Click "Copy Meta Tag" button
   - Show the generated meta tag
   - **SAY:** *"This meta tag contains all the verification data. We just need to add one line to our webpage."*

### **Scene B: Code Integration (0:30-0:45)**

**NARRATION:** *"Now let's integrate this verification into a webpage and see how the extension automatically detects it."*

1. **Show Unverified Page**
   - Navigate to: `http://localhost:8080/demo/sample-company-scene2-clean.html`
   - Show page without verification banner
   - **POINT TO EXTENSION ICON:** *"Notice the extension icon is gray, indicating no verification data."*
   - **CLICK EXTENSION:** Show popup says "No verification data"

2. **Open Code Editor**
   - Open `demo/sample-company-scene2-clean.html` in code editor
   - Show the comment lines: `<!-- Trust Anchor verification meta tag will be pasted here -->`
   - **SAY:** *"We just need to replace these comment lines with our meta tag."*

3. **Paste Meta Tag**
   - Delete the comment lines
   - Paste the meta tag from clipboard
   - **SAY:** *"That's it! Just one line of code to add Trust Anchor verification."*

4. **Save and Refresh**
   - Save the file
   - Refresh the browser
   - **SHOW VERIFICATION BANNER:** *"Look! The verification banner automatically appears."*
   - **POINT TO EXTENSION ICON:** *"And the extension icon has changed to green with a checkmark!"*
   - **CLICK EXTENSION:** Show popup says "Verified" with green status

### **Scene C: Extension Verification (0:45-1:00)**

**NARRATION:** *"Let's test the extension on a verified page to see the complete verification flow."*

1. **Test Extension Page**
   - Navigate to: `http://localhost:8080/test-extension.html`
   - **SAY:** *"This is a test page that already has Trust Anchor verification."*

2. **Show Extension Behavior**
   - **POINT TO ICON:** *"The extension icon shows green with a checkmark."*
   - **HOVER OVER ICON:** *"Hovering shows 'Trust Anchor: Content Verified'."*
   - **CLICK EXTENSION:** Show popup with "Verified" status
   - **READ POPUP:** *"The popup shows 'This content has been verified by Trust Anchor' - exactly matching the website's verification message."*

3. **Demonstrate Consistency**
   - **SAY:** *"Notice how the extension's verification status perfectly matches the website's verification banner. This creates a consistent, trustworthy experience for users."*

---

## **✅ Expected Results:**

### **Extension Behavior:**
- ✅ Gray icon on unverified pages
- ✅ Green icon with ✓ badge on verified pages  
- ✅ Popup shows "Verified" status
- ✅ Popup shows "This content has been verified by Trust Anchor"
- ✅ Title shows "Trust Anchor: Content Verified ✓"

### **Website Behavior:**
- ✅ No verification banner on unverified pages
- ✅ Green verification banner appears after meta tag integration
- ✅ Banner shows "This content has been verified by Trust Anchor"

### **Key Demo Points:**
1. **Simplicity**: Just one line of code integration
2. **Security**: Cryptographic signatures prevent tampering
3. **Consistency**: Extension and website show matching verification status
4. **User Trust**: Visual indicators build confidence
5. **Automatic Detection**: Extension works without user intervention

---

## **🔧 Troubleshooting:**

### **If Extension Doesn't Work:**
1. Reload extension in Chrome extensions page
2. Check extension is enabled for localhost:8080
3. Verify backend is running on port 3000
4. Check browser console for errors

### **If Verification Banner Doesn't Appear:**
1. Ensure meta tag is in `<head>` section
2. Check meta tag format is correct
3. Refresh page after saving

### **If Backend Issues:**
1. Restart backend server
2. Check backend logs for errors
3. Verify demo page names are supported

---

## **🎯 Demo Success Criteria:**
- ✅ Keys generated successfully
- ✅ Content signed with hash and signature  
- ✅ Meta tag copied to clipboard
- ✅ Verification banner appears after integration
- ✅ Extension icon changes from gray to green
- ✅ Extension popup shows "Verified" status
- ✅ Extension message matches website message

**Ready for Scene 2 recording!** 🎥 