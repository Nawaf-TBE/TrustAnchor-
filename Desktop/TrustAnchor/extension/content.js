// Content script for Trust Anchor extension
// Runs on all pages to monitor trust anchor status

(function() {
  'use strict';

  const API_BASE = 'http://localhost:3000/api';
  
  function extractDomain(url = window.location.href) {
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
        return null;
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      console.log('Trust Anchor check failed:', error.message);
      return null;
    }
  }

  function updateExtensionBadge(status) {
    chrome.runtime.sendMessage({
      type: 'UPDATE_BADGE',
      status: status
    });
  }

  function addTrustIndicator(status) {
    // Remove existing indicator
    const existing = document.getElementById('trust-anchor-indicator');
    if (existing) {
      existing.remove();
    }

    // Create trust indicator
    const indicator = document.createElement('div');
    indicator.id = 'trust-anchor-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid ${status === 'trusted' ? '#48bb78' : 
                          status === 'untrusted' ? '#f56565' : '#ed8936'};
      border-radius: 8px;
      padding: 8px 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: ${status === 'trusted' ? '#22543d' : 
               status === 'untrusted' ? '#742a2a' : '#744210'};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.9;
    `;

    const statusText = status === 'trusted' ? '🔒 Trusted' : 
                      status === 'untrusted' ? '⚠️ Untrusted' : 
                      '❓ Unknown';
    
    indicator.innerHTML = `
      <div style="display: flex; align-items: center; gap: 6px;">
        <span>${statusText}</span>
      </div>
    `;

    // Add click handler to open extension popup
    indicator.addEventListener('click', () => {
      // This will trigger the extension popup to open
      // Note: In a real extension, you might want to show more details
      console.log('Trust anchor indicator clicked');
    });

    // Add hover effects
    indicator.addEventListener('mouseenter', () => {
      indicator.style.opacity = '1';
      indicator.style.transform = 'scale(1.05)';
    });

    indicator.addEventListener('mouseleave', () => {
      indicator.style.opacity = '0.9';
      indicator.style.transform = 'scale(1)';
    });

    document.body.appendChild(indicator);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (indicator && indicator.parentNode) {
        indicator.style.opacity = '0.5';
      }
    }, 5000);
  }

  async function initTrustAnchorCheck() {
    const domain = extractDomain();
    if (!domain) return;

    try {
      const anchor = await checkTrustAnchor(domain);
      const status = anchor ? anchor.status : 'unknown';
      
      // Update extension badge
      updateExtensionBadge(status);
      
      // Add visual indicator on page (only for HTTPS sites)
      if (window.location.protocol === 'https:') {
        addTrustIndicator(status);
      }
      
      // Log to console for debugging
      console.log(`Trust Anchor status for ${domain}:`, status);
      
    } catch (error) {
      console.log('Trust Anchor check failed:', error);
    }
  }

  // Check trust anchor when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrustAnchorCheck);
  } else {
    initTrustAnchorCheck();
  }

  // Re-check when URL changes (for SPAs)
  let currentUrl = window.location.href;
  const observer = new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      setTimeout(initTrustAnchorCheck, 1000); // Delay to let page settle
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'REFRESH_TRUST_STATUS') {
      initTrustAnchorCheck();
      sendResponse({ success: true });
    }
  });

})(); 