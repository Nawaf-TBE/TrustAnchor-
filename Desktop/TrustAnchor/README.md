# 🔒 Trust Anchor

A comprehensive trust anchor verification system for secure web communications. This project provides a minimal yet powerful solution for managing and verifying website trust anchors through a web dashboard, API server, and Chrome extension.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Access the dashboard**: Open `http://localhost:3000` in your browser

4. **Test the demo**: Open `demo/sample-page.html` in your browser

5. **Load the Chrome extension**: 
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `/extension` folder

## 📁 Project Structure

```
TrustAnchor/
├── backend/           # Express.js API server
│   └── server.js      # Main server file with REST endpoints
├── frontend/          # Static web dashboard
│   └── index.html     # Management dashboard
├── extension/         # Chrome extension
│   ├── manifest.json  # Extension configuration
│   ├── popup.html     # Extension popup interface
│   ├── popup.js       # Popup functionality
│   ├── background.js  # Service worker
│   └── content.js     # Content script for page monitoring
├── demo/              # Demo webpage for testing
│   └── sample-page.html
├── package.json       # Dependencies and scripts
├── .env.example       # Environment configuration template
├── .gitignore         # Git ignore patterns
└── README.md          # Project documentation
```

## 🔧 API Endpoints

The backend server provides the following REST API endpoints:

### Health & Status
- `GET /api/health` - Server health check and statistics

### Trust Anchors
- `GET /api/trust-anchors` - List all trust anchors
- `GET /api/trust-anchors/:domain` - Get specific trust anchor
- `POST /api/trust-anchors` - Create new trust anchor
- `POST /api/trust-anchors/:domain/verify` - Verify trust anchor

### Verification History
- `GET /api/verification-history` - Get verification history

### Example API Usage

```javascript
// Add a new trust anchor
const response = await fetch('/api/trust-anchors', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    domain: 'example.com',
    certificate: 'sha256:abc123...'
  })
});

// Verify a trust anchor
const verifyResponse = await fetch('/api/trust-anchors/example.com/verify', {
  method: 'POST'
});
```

## 🌐 Chrome Extension Features

The Chrome extension provides:

- **Automatic domain checking**: Monitors visited websites for trust anchor status
- **Visual indicators**: Shows trust status directly on web pages
- **Extension popup**: Manage trust anchors for the current domain
- **Badge notifications**: Updates extension icon based on trust status
- **Dashboard integration**: Quick access to the management dashboard

### Extension Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension/` folder from this project
5. The Trust Anchor extension will appear in your toolbar

### Extension Usage

1. Visit any website
2. Click the Trust Anchor extension icon
3. View the trust status of the current domain
4. Add new trust anchors or verify existing ones
5. Access the dashboard for full management

## 🎯 Features

### Core Features
- ✅ **In-memory storage**: Fast Map-based storage (no database required)
- ✅ **REST API**: Complete API for trust anchor management
- ✅ **Web dashboard**: Beautiful, responsive management interface
- ✅ **Chrome extension**: Browser integration with popup and content scripts
- ✅ **Real-time verification**: Instant trust anchor verification
- ✅ **Demo page**: Interactive test page with API examples

### Security Features
- 🔒 **Certificate fingerprint verification**
- 🔒 **Domain-based trust management**
- 🔒 **Visual security indicators**
- 🔒 **Browser extension integration**
- 🔒 **CORS protection**

### User Experience
- 📱 **Responsive design**: Works on desktop and mobile
- ⚡ **Fast performance**: Optimized for speed
- 🎨 **Modern UI**: Clean, professional interface
- 🔄 **Auto-refresh**: Real-time updates every 30 seconds
- 📊 **Statistics dashboard**: Trust anchor metrics

## 🛠️ Development

### Prerequisites
- Node.js (v14.0.0 or higher)
- Chrome browser (for extension testing)

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
PORT=3000
NODE_ENV=development
```

### Available Scripts

```bash
npm start     # Start the production server
npm run dev   # Start the development server (same as start)
npm test      # Run tests (placeholder)
```

### Extension Development

The Chrome extension uses Manifest V3 and includes:

- **Service Worker**: Background processing (`background.js`)
- **Content Script**: Page monitoring (`content.js`)
- **Popup Interface**: User interaction (`popup.html`, `popup.js`)
- **Permissions**: Active tab, storage, web requests

To modify the extension:
1. Edit files in the `/extension` folder
2. Reload the extension in `chrome://extensions/`
3. Test on various websites

## 📝 Usage Examples

### Basic Trust Anchor Management

1. **Start the server**: `npm start`
2. **Open dashboard**: Navigate to `http://localhost:3000`
3. **Add trust anchor**: Enter domain and certificate hash
4. **Verify status**: Click "Verify" to check trust status
5. **Monitor stats**: View real-time statistics

### Extension Workflow

1. **Install extension**: Load unpacked from `/extension` folder
2. **Visit website**: Navigate to any HTTPS website
3. **Check status**: Extension automatically checks trust status
4. **Manage anchors**: Click extension icon to add/verify anchors
5. **View dashboard**: Access full management interface

### API Integration

```javascript
// Check if server is running
const health = await fetch('http://localhost:3000/api/health');
console.log(await health.json());

// List all trust anchors
const anchors = await fetch('http://localhost:3000/api/trust-anchors');
console.log(await anchors.json());
```

## 🔍 Testing

### Manual Testing

1. **API Testing**: Use the demo page API buttons
2. **Extension Testing**: Install and test on various websites
3. **Dashboard Testing**: Add, verify, and manage trust anchors
4. **Integration Testing**: Test all components together

### Test Scenarios

- ✅ Add new trust anchor via dashboard
- ✅ Verify trust anchor via API
- ✅ Extension popup shows correct status
- ✅ Visual indicators appear on HTTPS sites
- ✅ Statistics update in real-time

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment
2. Configure proper CORS settings
3. Use a process manager like PM2
4. Consider using a persistent database instead of in-memory storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🛡️ Security Considerations

- **In-memory storage**: Data is lost on server restart
- **Local development**: Server runs on localhost:3000
- **Extension permissions**: Requires active tab and web request access
- **CORS**: Configured for development, adjust for production

## 📞 Support

For issues and questions:
- Check the demo page for API testing
- Review the extension console for debugging
- Ensure the server is running on localhost:3000

---

**Built with**: Node.js, Express, Chrome Extension APIs, Vanilla JavaScript