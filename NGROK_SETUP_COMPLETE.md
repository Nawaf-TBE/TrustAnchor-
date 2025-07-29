# 🚀 Complete ngrok Setup for Trust Anchor

## **✅ ngrok Installation Complete**

ngrok is already installed on your system. Now let's set it up properly with authentication.

---

## **📋 Step-by-Step Setup Instructions**

### **Step 1: Sign Up for ngrok Account**
1. **Go to**: https://dashboard.ngrok.com/signup
2. **Create a free account** with your email
3. **Verify your email address**
4. **Log in to your ngrok dashboard**

### **Step 2: Get Your Authtoken**
1. **In your ngrok dashboard**, go to: https://dashboard.ngrok.com/get-started/your-authtoken
2. **Copy your authtoken** (it looks like: `2abc123def456ghi789jkl`)

### **Step 3: Configure ngrok with Your Authtoken**
```bash
# Replace YOUR_AUTHTOKEN with your actual token
ngrok config add-authtoken YOUR_AUTHTOKEN
```

**Example:**
```bash
ngrok config add-authtoken 2abc123def456ghi789jkl
```

### **Step 4: Test ngrok Configuration**
```bash
# Test that ngrok is working
ngrok version
```

**Expected Output:**
```
ngrok version 3.x.x
```

### **Step 5: Start Your Backend Server**
```bash
# In Terminal 1
cd /Users/nawaf/Desktop/TrustAnchor
node backend/server.js
```

**Expected Output:**
```
🔒 TrustAnchor Content Verification Server running on http://localhost:3000
📊 Health check: http://localhost:3000/health
🔧 API Documentation:
   POST /api/keys - Store public key
   GET /api/keys/:keyId - Retrieve public key
   POST /api/verify - Verify content trust
   GET /health - Server health status
```

### **Step 6: Start ngrok Tunnel**
```bash
# In Terminal 2 (new terminal window)
ngrok http 3000
```

**Expected Output:**
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       51ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
```

**Copy the HTTPS URL!** (e.g., `https://abc123.ngrok.io`)

### **Step 7: Test Your Public URL**
```bash
# In Terminal 3 (new terminal window)
curl https://abc123.ngrok.io/health
```

**Expected Output:**
```json
{"status":"ok","service":"TrustAnchor Content Verification","timestamp":"2025-01-20T10:30:45.123Z"}
```

### **Step 8: Generate OpenAPI Spec**
```bash
# In Terminal 4 (new terminal window)
node generate-openapi.js https://abc123.ngrok.io
```

**Expected Output:**
```
✅ OpenAPI spec generated successfully!
📁 File: openapi-localtunnel.yaml
🌐 Base URL: https://abc123.ngrok.io
```

### **Step 9: Update Custom GPT Action**
1. **Open ChatGPT**
2. **Go to your Custom GPT**
3. **Click "Configure" (pencil icon)**
4. **Go to "Actions" tab**
5. **Copy the content from `openapi-localtunnel.yaml`**
6. **Paste it into the Schema text area**
7. **Add Privacy Policy**: `https://abc123.ngrok.io/privacy-policy.html`
8. **Click "Save"**

### **Step 10: Test the Action**
1. **Start a new ChatGPT conversation**
2. **Type**: `Using Trust Anchor, please verify https://abc123.ngrok.io/demo/sample-company-verified.html`
3. **Should see**: "Using Trust Anchor Verifier" action call
4. **Get**: ✅ Success response

---

## **🎯 Advantages of ngrok over localtunnel**

### **ngrok Benefits:**
- ✅ **Stable URLs** - URLs don't change on restart
- ✅ **Better reliability** - More stable connection
- ✅ **Web interface** - View requests at http://localhost:4040
- ✅ **Custom domains** - Can use custom subdomains
- ✅ **Better performance** - Faster and more reliable

### **localtunnel Limitations:**
- ❌ **URLs change** on every restart
- ❌ **Less stable** connection
- ❌ **No web interface** for debugging
- ❌ **Limited features**

---

## **🔧 Troubleshooting**

### **If ngrok auth fails:**
```bash
# Check your authtoken
ngrok config check

# Re-add authtoken if needed
ngrok config add-authtoken YOUR_AUTHTOKEN
```

### **If tunnel fails:**
```bash
# Check if port 3000 is available
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Restart ngrok
ngrok http 3000
```

### **If Custom GPT action fails:**
1. **Check ngrok is running**: `curl https://YOUR_URL.ngrok.io/health`
2. **Update OpenAPI spec** with correct URL
3. **Start fresh ChatGPT conversation**

---

## **🎬 For Your Demo**

### **Before Recording:**
1. **Sign up for ngrok account**
2. **Configure authtoken**
3. **Start backend server** (Terminal 1)
4. **Start ngrok tunnel** (Terminal 2)
5. **Generate OpenAPI spec**
6. **Update Custom GPT action**
7. **Test the action**

### **During Recording:**
1. **Show both terminals running**
2. **Highlight the stable HTTPS URL**
3. **Test the Custom GPT action**
4. **Show successful verification**

---

## **✅ Success Checklist**

- [ ] ngrok account created
- [ ] Authtoken configured
- [ ] Backend server running on port 3000
- [ ] ngrok tunnel running with HTTPS URL
- [ ] Public URL accessible (curl test works)
- [ ] OpenAPI spec generated with ngrok URL
- [ ] Custom GPT action updated
- [ ] Action test passes
- [ ] Fresh conversation works

---

## **🚀 Ready for Hackathon Demo!**

With ngrok, you'll have a **stable, reliable HTTPS URL** that won't change on restart, making your Custom GPT action much more reliable for your demo! 🎯 