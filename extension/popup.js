// Trust Anchor Verifier - Popup Script
// Displays verification status from chrome.storage.local

async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function renderVerificationStatus(result, url) {
    if (!result) {
        return `
            <div class="status-card">
                <div class="status-indicator">
                    <div class="status-icon">⏳</div>
                    <div class="status-text">Status Not Checked</div>
                </div>
                <div class="status-details unknown">
                    <h3>Information</h3>
                    <p>This page has not been checked for Trust Anchor verification yet. Visit the page to trigger verification.</p>
                </div>
            </div>
        `;
    }

    const isVerified = result.verified === true;
    const hasMetaTag = result.hasMetaTag !== false;
    
    let statusClass, statusIcon, statusText, detailsClass;
    
    if (isVerified) {
        statusClass = 'verified';
        statusIcon = '✅';
        statusText = 'Verified';
        detailsClass = 'verified';
    } else if (!hasMetaTag) {
        statusClass = 'unknown';
        statusIcon = '❓';
        statusText = 'No Verification Data';
        detailsClass = 'unknown';
    } else {
        statusClass = 'not-verified';
        statusIcon = '❌';
        statusText = 'Not Verified';
        detailsClass = 'not-verified';
    }

    const reason = result.reason || result.details || 'No reason provided';
    const timestamp = formatTimestamp(result.timestamp);

    return `
        <div class="status-card">
            <div class="status-indicator">
                <div class="status-icon">${statusIcon}</div>
                <div class="status-text">${statusText}</div>
            </div>
            
            <div class="status-details ${detailsClass}">
                <h3>Details</h3>
                <p>${reason}</p>
            </div>

            ${result.details ? `
                <div class="status-details">
                    <h3>Verification Info</h3>
                    <p>Key ID: ${result.details.keyId || 'Unknown'}</p>
                    <p>Hash Match: ${result.details.hashMatch ? 'Yes' : 'No'}</p>
                    <p>Signature Valid: ${result.details.signatureValid ? 'Yes' : 'No'}</p>
                </div>
            ` : ''}

            <div class="timestamp">
                Last checked: ${timestamp}
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" id="refreshBtn">
                    🔄 Refresh
                </button>
                <button class="btn btn-secondary" id="dashboardBtn">
                    🔧 Dashboard
                </button>
            </div>
        </div>
    `;
}

async function loadVerificationStatus() {
    const contentDiv = document.getElementById('content');
    const urlDiv = document.getElementById('currentUrl');

    try {
        const tab = await getCurrentTab();
        const url = tab.url;
        
        // Display current URL (truncated for display)
        const displayUrl = url.length > 40 ? url.substring(0, 40) + '...' : url;
        urlDiv.textContent = displayUrl;

        // Check if this is a localhost page (3000 or 8080)
        if (!url.startsWith('http://localhost:3000/') && !url.startsWith('http://localhost:8080/')) {
            contentDiv.innerHTML = `
                <div class="status-card">
                    <div class="status-indicator">
                        <div class="status-icon">ℹ️</div>
                        <div class="status-text">Not Applicable</div>
                    </div>
                    <div class="status-details unknown">
                        <h3>Information</h3>
                        <p>Trust Anchor verification only works on localhost pages (port 3000 or 8080). Navigate to a Trust Anchor enabled page to see verification status.</p>
                    </div>
                </div>
            `;
            return;
        }

        // Get verification result from storage
        const storageKey = `verification_${url}`;
        const storage = await chrome.storage.local.get([storageKey]);
        const result = storage[storageKey];

        // Render the status
        contentDiv.innerHTML = renderVerificationStatus(result, url);

    } catch (error) {
        console.error('Error loading verification status:', error);
        contentDiv.innerHTML = `
            <div class="status-card">
                <div class="status-indicator">
                    <div class="status-icon">❌</div>
                    <div class="status-text">Error</div>
                </div>
                <div class="status-details not-verified">
                    <h3>Error</h3>
                    <p>Failed to load verification status: ${error.message}</p>
                </div>
            </div>
        `;
    }
}

// Event listeners for button clicks
async function refreshVerification() {
    try {
        const tab = await getCurrentTab();
        
        // Send message to content script to re-verify
        await chrome.tabs.sendMessage(tab.id, {
            type: 'REFRESH_VERIFICATION'
        });
        
        // Reload popup content after a short delay
        setTimeout(loadVerificationStatus, 1000);
        
        // Show loading state temporarily
        document.getElementById('content').innerHTML = `
            <div class="loading">
                Re-checking verification status...
            </div>
        `;
        
    } catch (error) {
        console.error('Error refreshing verification:', error);
        alert('Error refreshing verification. Make sure you are on a Trust Anchor enabled page.');
    }
}

function openDashboard() {
            chrome.tabs.create({ url: 'http://localhost:8080/frontend/index.html' });
    window.close();
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadVerificationStatus();
    
    // Add event listeners for buttons
    document.addEventListener('click', (e) => {
        if (e.target.id === 'refreshBtn') {
            refreshVerification();
        } else if (e.target.id === 'dashboardBtn') {
            openDashboard();
        }
    });
});

console.log('[Trust Anchor Popup] Popup script loaded'); 