# Scene 2: Publisher Workflow - Complete Recording Script

## 🎬 **Scene 2: Publisher Workflow (0:15-0:45)**

### **Scene A: Dashboard (0:15-0:30)**

**Narrator**: *"Now let me show you how easy it is for content publishers to sign their content using Trust Anchor. This is our publisher dashboard designed to be simple and intuitive."*

**Action**: Navigate to `http://localhost:8080/frontend/index.html`

**Narrator**: *"Here's our Trust Anchor publisher dashboard. It's designed to be simple and intuitive for content creators who want to make their content verifiable."*

---

**Step 1: Enter Content (0:15-0:18)**

**Action**: 
- Click in the text area
- Paste: *"The official battery life for the TechCorp Z-1 is 22 hours."*

**Narrator**: *"I'll paste the official battery life specification that we want to make verifiable. This is the content that will be cryptographically signed to prevent tampering."*

---

**Step 2: Generate Keys (0:18-0:22)**

**Action**: Click the "Generate Keys" button

**Narrator**: *"First, I generate cryptographic keys. This creates a unique key pair for signing our content. The private key will be used to sign, and the public key will be used for verification."*

**Expected Result**: 
- ✅ "Keys generated successfully!" message appears
- Key ID displayed
- "Sign Content" button becomes enabled

**Narrator**: *"Perfect! The keys have been generated and stored in our backend for verification."*

---

**Step 3: Sign Content (0:22-0:26)**

**Action**: Click the "Sign Content" button

**Narrator**: *"Now I sign the content with our private key to create a digital signature that proves authenticity. This process creates a cryptographic hash of the content and signs it."*

**Expected Result**:
- ✅ "Content signed successfully!" message appears
- Hash and signature displayed
- "Copy Meta Tag" button becomes enabled

**Narrator**: *"Excellent! The content has been signed successfully. You can see the hash and signature that will be used for verification."*

---

**Step 4: Copy Meta Tag (0:26-0:30)**

**Action**: Click the "Copy Meta Tag" button

**Narrator**: *"Finally, I copy the meta tag that contains all the verification data. This is what we'll add to our webpage to make the content verifiable."*

**Expected Result**:
- ✅ "Meta tag copied to clipboard!" message appears
- Meta tag displayed in result box

**Narrator**: *"Perfect! The meta tag has been copied to my clipboard. This contains the hash, signature, and key ID that will be used for verification."*

---

### **Scene B: Code Integration (0:30-0:45)**

**Narrator**: *"Now let me show you how easy it is to integrate this into a webpage. The process is incredibly simple."*

**Action**: Navigate to `http://localhost:8080/demo/sample-company.html`

**Narrator**: *"Here's our product page for the TechCorp Z-1 laptop. As you can see, it currently doesn't have any verification indicators."*

---

**Step 1: Open Code Editor (0:30-0:32)**

**Action**: 
- Open code editor (VS Code, Sublime, etc.)
- Open file: `demo/sample-company.html`

**Narrator**: *"I'll open the HTML file for our product page in my code editor."*

---

**Step 2: Show Comment Lines (0:32-0:35)**

**Action**: 
- Scroll to the `<head>` section
- Highlight lines 8-9:
```html
<!-- Trust Anchor verification meta tag will be pasted here -->
<!-- <meta name="ai-trust-anchor" content='{"hash":"...","signature":"...","keyId":"..."}'> -->
```

**Narrator**: *"You can see there's a comment showing where the Trust Anchor meta tag should go. This is a simple placeholder that indicates where the verification data should be added."*

---

**Step 3: Paste Meta Tag (0:35-0:40)**

**Action**: 
- Delete the two comment lines (lines 8-9)
- Paste the meta tag from clipboard
- The result should look like:
```html
<meta name="ai-trust-anchor" content='{"hash":"abc123...","signature":"xyz789...","keyId":"your-key-id"}'>
```

**Narrator**: *"I simply paste the meta tag we generated into the head section of the HTML. This is all it takes to make the content verifiable."*

---

**Step 4: Save and Refresh (0:40-0:45)**

**Action**: 
- Save the file (Cmd+S)
- Switch back to browser
- Refresh the page (Cmd+R)

**Narrator**: *"Now when I refresh the page, you can see the verification banner appears, confirming that our content is authentic and hasn't been tampered with."*

**Expected Result**:
- ✅ Green verification banner appears with "✅ This content has been verified by Trust Anchor"
- ✅ Verification status shows "✅ Verified" in the Trust Anchor info section

**Narrator**: *"Perfect! The verification banner now appears, confirming that this content has been cryptographically verified. This gives users confidence that the specifications are authentic and haven't been modified."*

---

## 🎯 **Key Points to Emphasize:**

1. **Simplicity**: *"The entire process takes just a few clicks and one line of code."*
2. **Security**: *"This creates a cryptographic signature that proves the content hasn't been tampered with."*
3. **User Trust**: *"Users can now see that this content is verified and authentic."*
4. **Integration**: *"It's just one meta tag - no complex setup required."*

## 🚀 **Transition to Scene 3:**

**Narrator**: *"Now let me show you how this verification works in practice with our AI integration."*

---

## 📝 **Troubleshooting Notes:**

- If key generation fails: Check that backend is running on port 3001
- If demo page doesn't show verification: Ensure meta tag is in the `<head>` section
- If extension doesn't work: Reload the extension in Chrome extensions page

## ⏱️ **Timing Guide:**
- **Scene A**: 0:15-0:30 (15 seconds)
- **Scene B**: 0:30-0:45 (15 seconds)
- **Total**: 30 seconds

**Ready to record!** 🎥 