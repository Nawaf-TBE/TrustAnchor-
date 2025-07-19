const API_BASE = 'http://localhost:3000/api';

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return null;
  }
}

async function checkTrustAnchor(domain) {
  try {
    const response = await fetch(`${API_BASE}/trust-anchors/${domain}`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else if (response.status === 404) {
      return null; // Not found
    } else {
      throw new Error('API error');
    }
  } catch (error) {
    console.error('Error checking trust anchor:', error);
    throw error;
  }
}

async function addTrustAnchor(domain) {
  try {
    const certificate = `auto-generated-${Date.now()}`;
    const response = await fetch(`${API_BASE}/trust-anchors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, certificate })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error('Failed to add trust anchor');
    }
  } catch (error) {
    console.error('Error adding trust anchor:', error);
    throw error;
  }
}

async function verifyTrustAnchor(domain) {
  try {
    const response = await fetch(`${API_BASE}/trust-anchors/${domain}/verify`, {
      method: 'POST'
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error('Failed to verify trust anchor');
    }
  } catch (error) {
    console.error('Error verifying trust anchor:', error);
    throw error;
  }
}

function renderTrustAnchorInfo(anchor, domain) {
  const statusClass = anchor ? anchor.status : 'unknown';
  const statusText = anchor ? 
    (anchor.status === 'trusted' ? 'Trusted' : 
     anchor.status === 'untrusted' ? 'Untrusted' : 'Pending') : 
    'Unknown';

  return `
    <div class="status-card">
      <div class="status-indicator">
        <div class="status-dot ${statusClass}"></div>
        <div class="status-text">${statusText}</div>
      </div>
      <div style="font-size: 0.9rem; color: #718096;">
        ${anchor ? 'Trust anchor found in database' : 'No trust anchor registered'}
      </div>
    </div>

    <div class="info-section">
      <h3>Certificate Info</h3>
      <div class="info-item">
        <span class="info-label">Domain:</span>
        <span class="info-value">${domain}</span>
      </div>
      ${anchor ? `
        <div class="info-item">
          <span class="info-label">Status:</span>
          <span class="info-value">${anchor.status}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Added:</span>
          <span class="info-value">${new Date(anchor.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Last Verified:</span>
          <span class="info-value">${anchor.lastVerified ? new Date(anchor.lastVerified).toLocaleDateString() : 'Never'}</span>
        </div>
      ` : ''}
    </div>

    <div class="action-buttons">
      ${anchor ? `
        <button class="btn btn-primary" onclick="verifyAnchor('${domain}')">
          Verify Now
        </button>
        <button class="btn btn-secondary" onclick="openDashboard()">
          Dashboard
        </button>
      ` : `
        <button class="btn btn-primary" onclick="addAnchor('${domain}')">
          Add Anchor
        </button>
        <button class="btn btn-secondary" onclick="openDashboard()">
          Dashboard
        </button>
      `}
    </div>
  `;
}

function renderError(message) {
  return `
    <div class="error">
      ${message}
    </div>
    <div class="action-buttons">
      <button class="btn btn-secondary" onclick="openDashboard()">
        Open Dashboard
      </button>
    </div>
  `;
}

async function loadPopupContent() {
  const contentDiv = document.getElementById('content');
  const urlDiv = document.getElementById('currentUrl');

  try {
    const tab = await getCurrentTab();
    const domain = extractDomain(tab.url);
    
    if (!domain) {
      urlDiv.textContent = 'Invalid URL';
      contentDiv.innerHTML = renderError('Cannot extract domain from current URL');
      return;
    }

    urlDiv.textContent = domain;

    // Check if trust anchor exists
    const anchor = await checkTrustAnchor(domain);
    contentDiv.innerHTML = renderTrustAnchorInfo(anchor, domain);

  } catch (error) {
    contentDiv.innerHTML = renderError('Failed to load trust anchor information. Make sure the Trust Anchor server is running on localhost:3000.');
  }
}

// Global functions for button clicks
window.addAnchor = async function(domain) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<div class="loading">Adding trust anchor...</div>';
  
  try {
    await addTrustAnchor(domain);
    // Reload content to show the new anchor
    await loadPopupContent();
  } catch (error) {
    contentDiv.innerHTML = renderError('Failed to add trust anchor');
  }
};

window.verifyAnchor = async function(domain) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<div class="loading">Verifying trust anchor...</div>';
  
  try {
    await verifyTrustAnchor(domain);
    // Reload content to show updated status
    await loadPopupContent();
  } catch (error) {
    contentDiv.innerHTML = renderError('Failed to verify trust anchor');
  }
};

window.openDashboard = function() {
  chrome.tabs.create({ url: 'http://localhost:3000' });
};

// Initialize popup
document.addEventListener('DOMContentLoaded', loadPopupContent); 