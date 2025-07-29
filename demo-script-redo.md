# Scene 2: Publisher Workflow - REDO SCRIPT

## 🎬 **Ready to Record Scene 2 Again!**

### **Current Status:**
- ✅ Backend API running on port 3001
- ✅ Frontend server running on port 8080  
- ✅ Extension updated to use correct port
- ✅ Demo page cleaned (no meta tag - ready for fresh demo)
- ✅ Mock API returning proper verification results

## 📋 **Recording Steps:**

### **Scene A: Dashboard (0:15-0:30)**

**URL**: `http://localhost:8080/frontend/index.html`

**Step 1: Show Dashboard**
- *"Here's our Trust Anchor publisher dashboard..."*

**Step 2: Enter Content**
- Paste: *"The official battery life for the TechCorp Z-1 is 22 hours."*
- *"I'll paste the official battery life specification..."*

**Step 3: Generate Keys**
- Click "Generate Keys" button
- *"First, I generate cryptographic keys..."*
- ✅ Should show: "Keys generated successfully!"

**Step 4: Sign Content**
- Click "Sign Content" button
- *"Now I sign the content with our private key..."*
- ✅ Should show: "Content signed successfully!"

**Step 5: Copy Meta Tag**
- Click "Copy Meta Tag" button
- *"Finally, I copy the meta tag that contains all the verification data..."*
- ✅ Should show: "Meta tag copied to clipboard!"

### **Scene B: Code Integration (0:30-0:45)**

**URL**: `http://localhost:8080/demo/sample-company.html`

**Step 1: Show Demo Page**
- *"Now let me show you how easy it is to integrate this into a webpage..."*

**Step 2: Open Code Editor**
- Open `demo/sample-company.html` in code editor
- *"I'll open the HTML file for our product page..."*

**Step 3: Show Comment Lines**
- Highlight lines 8-9:
```html
<!-- Trust Anchor verification meta tag will be pasted here -->
<!-- <meta name="ai-trust-anchor" content='{"hash":"...","signature":"...","keyId":"..."}'> -->
```
- *"You can see there's a comment showing where the Trust Anchor meta tag should go..."*

**Step 4: Paste Meta Tag**
- Delete the comment lines
- Paste the real meta tag from clipboard
- *"I simply paste the meta tag we generated into the head section..."*

**Step 5: Save and Refresh**
- Save the file
- Refresh the browser page
- *"Now when I refresh the page, you can see the verification banner appears..."*
- ✅ Should show: Green verification banner with "✅ This content has been verified by Trust Anchor"

## 🎯 **Expected Results:**

### **Dashboard:**
- ✅ Key generation works
- ✅ Content signing works  
- ✅ Meta tag copying works

### **Demo Page:**
- ✅ Before: No verification banner
- ✅ After: Green verification banner appears
- ✅ Extension shows "✅ Verified"

### **Extension:**
- ✅ Shows "✅ Verified" status
- ✅ Shows "Content hash and signature verification passed"
- ✅ Shows Key ID, Hash Match: Yes, Signature Valid: Yes

## 🚀 **Start Recording!**

Everything is set up perfectly for your demo. The workflow will work smoothly from start to finish!

**Go ahead and start recording Scene 2!** 🎥 