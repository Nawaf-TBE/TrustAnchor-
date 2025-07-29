# Scene 2: Publisher Workflow Demo Script

## Setup (Before Recording)
- ✅ Backend API running on port 3001
- ✅ Frontend server running on port 8080
- ✅ Demo page ready at `/demo/sample-company.html`

## Scene A: Dashboard (0:15-0:30)

### Step 1: Show Dashboard
**URL**: `http://localhost:8080/frontend/index.html`

**Narrator**: *"Here's our Trust Anchor publisher dashboard. It's designed to be simple and intuitive for content creators."*

### Step 2: Enter Content
**Action**: 
- Click in the text area
- Paste: *"The official battery life for the TechCorp Z-1 is 22 hours."*

**Narrator**: *"I'll paste the official battery life specification that we want to make verifiable."*

### Step 3: Generate Keys
**Action**: Click "Generate Keys" button

**Narrator**: *"First, I generate cryptographic keys. This creates a unique key pair for signing our content."*

**Expected Result**: 
- ✅ Keys generated successfully message
- Key ID displayed
- "Sign Content" button becomes enabled

### Step 4: Sign Content
**Action**: Click "Sign Content" button

**Narrator**: *"Now I sign the content with our private key to create a digital signature that proves authenticity."*

**Expected Result**:
- ✅ Content signed successfully message
- Hash and signature displayed
- "Copy Meta Tag" button becomes enabled

### Step 5: Copy Meta Tag
**Action**: Click "Copy Meta Tag" button

**Narrator**: *"Finally, I copy the meta tag that contains all the verification data. This is what we'll add to our webpage."*

**Expected Result**:
- ✅ Meta tag copied to clipboard
- Meta tag displayed in result box

## Scene B: Code Integration (0:30-0:45)

### Step 1: Show Demo Page
**URL**: `http://localhost:8080/demo/sample-company.html`

**Narrator**: *"Now let me show you how easy it is to integrate this into a webpage."*

### Step 2: Open Code Editor
**Action**: Open `demo/sample-company.html` in code editor

**Narrator**: *"I'll open the HTML file for our product page."*

### Step 3: Show Comment Line
**Action**: Highlight line 8-9:
```html
<!-- Trust Anchor verification meta tag will be pasted here -->
<!-- <meta name="ai-trust-anchor" content='{"hash":"...","signature":"...","keyId":"..."}'> -->
```

**Narrator**: *"You can see there's a comment showing where the Trust Anchor meta tag should go."*

### Step 4: Paste Meta Tag
**Action**: 
- Paste the meta tag from clipboard
- Replace the comment lines with the actual meta tag

**Narrator**: *"I simply paste the meta tag we generated into the head section of the HTML."*

### Step 5: Save and Refresh
**Action**: 
- Save the file
- Refresh the browser page

**Narrator**: *"Now when I refresh the page, you can see the verification banner appears, confirming that our content is authentic and hasn't been tampered with."*

**Expected Result**:
- ✅ Green verification banner appears
- ✅ "This content has been verified by Trust Anchor" message
- ✅ Verification status shows "✅ Verified"

## Troubleshooting

If key generation fails:
1. Check that backend is running: `curl http://localhost:3001/health`
2. Check browser console for errors
3. Ensure no CORS issues

If demo page doesn't show verification:
1. Check that meta tag was pasted correctly
2. Ensure meta tag is in the `<head>` section
3. Check browser console for JavaScript errors

## Recording Tips

- **Pace**: Take your time with each step
- **Highlight**: Use cursor to highlight important elements
- **Explain**: Describe what's happening at each step
- **Show Results**: Make sure success messages are visible
- **Smooth Transitions**: Use clean cuts between dashboard and code editor 