// Background service worker for Trust Anchor extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Trust Anchor extension installed');
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup automatically when icon is clicked
  // No additional action needed as popup is configured in manifest
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHECK_TRUST_ANCHOR') {
    // Handle trust anchor checking if needed
    console.log('Checking trust anchor for:', message.domain);
    sendResponse({ success: true });
  }
  
  if (message.type === 'UPDATE_BADGE') {
    // Update extension badge based on trust status
    const color = message.status === 'trusted' ? '#48bb78' : 
                  message.status === 'untrusted' ? '#f56565' : '#ed8936';
    
    chrome.action.setBadgeBackgroundColor({ color, tabId: sender.tab.id });
    chrome.action.setBadgeText({ 
      text: message.status === 'trusted' ? '✓' : 
            message.status === 'untrusted' ? '✗' : '?',
      tabId: sender.tab.id 
    });
  }
  
  return true; // Keep message channel open for async response
});

// Clear badge when tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    chrome.action.setBadgeText({ text: '', tabId });
  }
});

// Handle web requests (optional - for future certificate monitoring)
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    // Monitor certificate information
    // This could be used to automatically check certificates
    console.log('Request to:', details.url);
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
); 