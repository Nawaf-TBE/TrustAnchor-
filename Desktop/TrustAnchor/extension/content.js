// Trust Anchor Verifier - Content Script
// Detects meta tags and verifies page authenticity

(function() {
    'use strict';

    const API_BASE = 'http://localhost:3000/api';

    // Function to verify page with backend
    async function verifyPage() {
        try {
            console.log('[Trust Anchor] Starting page verification...');

            // Check if meta tag exists
            const metaTag = document.querySelector('meta[name="ai-trust-anchor"]');
            
            if (!metaTag) {
                console.log('[Trust Anchor] No meta tag found');
                await storeVerificationResult({
                    verified: false,
                    reason: 'No ai-trust-anchor meta tag found on this page',
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    hasMetaTag: false
                });
                return;
            }

            console.log('[Trust Anchor] Meta tag found, verifying with backend...');

            // Call backend verification API
            const response = await fetch(`${API_BASE}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: window.location.href
                })
            });

            if (!response.ok) {
                throw new Error(`Verification API error: ${response.status}`);
            }

            const result = await response.json();
            console.log('[Trust Anchor] Verification result:', result);

            // Store the result
            await storeVerificationResult({
                verified: result.verified || false,
                reason: result.reason || 'Unknown verification result',
                timestamp: result.timestamp || new Date().toISOString(),
                url: window.location.href,
                hasMetaTag: true,
                details: result.details
            });

        } catch (error) {
            console.error('[Trust Anchor] Verification failed:', error);
            
            // Store error result
            await storeVerificationResult({
                verified: false,
                reason: `Verification error: ${error.message}`,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                hasMetaTag: true,
                error: true
            });
        }
    }

    // Function to store verification result and notify background script
    async function storeVerificationResult(result) {
        try {
            // Store in chrome.storage.local
            const storageKey = `verification_${window.location.href}`;
            await chrome.storage.local.set({ [storageKey]: result });
            
            console.log('[Trust Anchor] Stored verification result:', result);

            // Send message to background script to update icon
            chrome.runtime.sendMessage({
                type: 'VERIFICATION_COMPLETE',
                result: result,
                url: window.location.href
            });

        } catch (error) {
            console.error('[Trust Anchor] Failed to store result:', error);
        }
    }

    // Function to add visual indicator on page
    function addPageIndicator(verified, reason) {
        // Remove existing indicator
        const existing = document.getElementById('trust-anchor-indicator');
        if (existing) {
            existing.remove();
        }

        // Create indicator
        const indicator = document.createElement('div');
        indicator.id = 'trust-anchor-indicator';
        
        const iconColor = verified ? '#27ae60' : '#e74c3c';
        const bgColor = verified ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)';
        const icon = verified ? '✅' : '❌';
        const status = verified ? 'Verified' : 'Not Verified';

        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${bgColor};
            border: 2px solid ${iconColor};
            border-radius: 8px;
            padding: 12px 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: ${iconColor};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: all 0.3s ease;
            max-width: 300px;
        `;

        indicator.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">${icon}</span>
                <div>
                    <div style="font-weight: bold;">${status}</div>
                    <div style="font-size: 12px; opacity: 0.8; margin-top: 2px;">
                        ${reason.length > 50 ? reason.substring(0, 50) + '...' : reason}
                    </div>
                </div>
            </div>
        `;

        // Add hover effect
        indicator.addEventListener('mouseenter', () => {
            indicator.style.transform = 'scale(1.05)';
        });

        indicator.addEventListener('mouseleave', () => {
            indicator.style.transform = 'scale(1)';
        });

        // Add click handler to show full details
        indicator.addEventListener('click', () => {
            alert(`Trust Anchor Verification\n\nStatus: ${status}\nReason: ${reason}\nURL: ${window.location.href}`);
        });

        document.body.appendChild(indicator);

        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (indicator && indicator.parentNode) {
                indicator.style.opacity = '0.3';
            }
        }, 8000);
    }

    // Wait for DOM to be ready and then verify
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', verifyPage);
    } else {
        // DOM is already ready
        setTimeout(verifyPage, 100);
    }

    // Listen for URL changes (for SPAs)
    let currentUrl = window.location.href;
    const observer = new MutationObserver(() => {
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
            console.log('[Trust Anchor] URL changed, re-verifying...');
            setTimeout(verifyPage, 500);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'REFRESH_VERIFICATION') {
            console.log('[Trust Anchor] Refresh requested from popup');
            setTimeout(verifyPage, 100);
            sendResponse({ success: true });
        }
    });

    console.log('[Trust Anchor] Content script loaded for:', window.location.href);

})(); 