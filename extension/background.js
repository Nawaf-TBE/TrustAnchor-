// Trust Anchor Verifier - Background Service Worker
// Handles dynamic icon updates based on verification results

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[Trust Anchor Background] Received message:', message);

    if (message.type === 'VERIFICATION_COMPLETE') {
        updateExtensionIcon(message.result, sender.tab.id);
        sendResponse({ success: true });
    }

    return true; // Keep message channel open for async response
});

// Function to update extension icon based on verification result
async function updateExtensionIcon(result, tabId) {
    try {
        let badgeText = '';
        let badgeColor = '';

        if (result.verified) {
            badgeText = '✓';
            badgeColor = '#27ae60';
        } else if (result.hasMetaTag === false) {
            badgeText = '';
            badgeColor = '#95a5a6';
        } else {
            badgeText = '✗';
            badgeColor = '#e74c3c';
        }

        // Update badge text and color
        await chrome.action.setBadgeText({
            text: badgeText,
            tabId: tabId
        });

        await chrome.action.setBadgeBackgroundColor({
            color: badgeColor,
            tabId: tabId
        });

        // Update title for hover text
        const title = result.verified 
            ? 'Trust Anchor: Content Verified ✓'
            : result.hasMetaTag === false
            ? 'Trust Anchor: No verification data'
            : 'Trust Anchor: Content Not Verified ✗';

        await chrome.action.setTitle({
            title: title,
            tabId: tabId
        });

        console.log('[Trust Anchor Background] Badge updated for tab:', tabId, 'Status:', result.verified ? 'verified' : 'not verified');

    } catch (error) {
        console.error('[Trust Anchor Background] Failed to update badge:', error);
    }
}

// Reset badge when tab is updated or navigation occurs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        // Reset badge while page loads
        chrome.action.setBadgeText({
            text: '',
            tabId: tabId
        });
        chrome.action.setTitle({
            title: 'Trust Anchor Verifier',
            tabId: tabId
        });
    }
});

// Clean up storage when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    // Note: We can't directly access the URL here, but we could implement
    // a cleanup mechanism if needed
    console.log('[Trust Anchor Background] Tab closed:', tabId);
});

// Handle extension icon click (popup will open automatically)
chrome.action.onClicked.addListener((tab) => {
    // This event only fires if no popup is defined
    // Since we have a popup, this won't normally execute
    console.log('[Trust Anchor Background] Icon clicked for tab:', tab.id);
});

// Extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('[Trust Anchor Background] Extension started');
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('[Trust Anchor Background] Extension installed');
    } else if (details.reason === 'update') {
        console.log('[Trust Anchor Background] Extension updated');
    }
});

console.log('[Trust Anchor Background] Service worker loaded'); 