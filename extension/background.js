/**
 * Trust Anchor Verifier - Background Service Worker
 * Handles dynamic icon updates and badge management based on verification results
 */

// Constants
const VERIFICATION_STATES = {
    VERIFIED: 'verified',
    NOT_VERIFIED: 'not_verified',
    NO_META_TAG: 'no_meta_tag'
};

const BADGE_CONFIG = {
    [VERIFICATION_STATES.VERIFIED]: {
        text: '✓',
        color: '#27ae60',
        title: 'Trust Anchor: Content Verified ✓'
    },
    [VERIFICATION_STATES.NOT_VERIFIED]: {
        text: '✗',
        color: '#e74c3c',
        title: 'Trust Anchor: Content Not Verified ✗'
    },
    [VERIFICATION_STATES.NO_META_TAG]: {
        text: '',
        color: '#95a5a6',
        title: 'Trust Anchor: No verification data'
    }
};

const DEFAULT_TITLE = 'Trust Anchor Verifier';
const LOG_PREFIX = '[Trust Anchor Background]';

// Utility functions
const logger = {
    info: (message, ...args) => console.log(`${LOG_PREFIX} ${message}`, ...args),
    error: (message, ...args) => console.error(`${LOG_PREFIX} ${message}`, ...args)
};

/**
 * Determines verification state from result object
 * @param {Object} result - Verification result from content script
 * @returns {string} Verification state
 */
function getVerificationState(result) {
    if (result.verified) {
        return VERIFICATION_STATES.VERIFIED;
    }
    if (result.hasMetaTag === false) {
        return VERIFICATION_STATES.NO_META_TAG;
    }
    return VERIFICATION_STATES.NOT_VERIFIED;
}

/**
 * Updates extension badge and title based on verification state
 * @param {string} state - Verification state
 * @param {number} tabId - Target tab ID
 */
async function updateBadge(state, tabId) {
    try {
        const config = BADGE_CONFIG[state];
        
        await Promise.all([
            chrome.action.setBadgeText({ text: config.text, tabId }),
            chrome.action.setBadgeBackgroundColor({ color: config.color, tabId }),
            chrome.action.setTitle({ title: config.title, tabId })
        ]);

        logger.info(`Badge updated for tab ${tabId}, state: ${state}`);
    } catch (error) {
        logger.error(`Failed to update badge for tab ${tabId}:`, error);
    }
}

/**
 * Resets badge to default state
 * @param {number} tabId - Target tab ID
 */
async function resetBadge(tabId) {
    try {
        await Promise.all([
            chrome.action.setBadgeText({ text: '', tabId }),
            chrome.action.setTitle({ title: DEFAULT_TITLE, tabId })
        ]);
    } catch (error) {
        logger.error(`Failed to reset badge for tab ${tabId}:`, error);
    }
}

/**
 * Handles verification complete message from content script
 * @param {Object} message - Message from content script
 * @param {Object} sender - Message sender info
 * @param {Function} sendResponse - Response callback
 */
function handleVerificationComplete(message, sender, sendResponse) {
    const state = getVerificationState(message.result);
    updateBadge(state, sender.tab.id);
    sendResponse({ success: true });
}

/**
 * Handles tab update events
 * @param {number} tabId - Tab ID
 * @param {Object} changeInfo - Change information
 * @param {Object} tab - Tab object
 */
function handleTabUpdate(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading') {
        resetBadge(tabId);
    }
}

/**
 * Handles tab removal events
 * @param {number} tabId - Removed tab ID
 */
function handleTabRemoved(tabId) {
    logger.info(`Tab closed: ${tabId}`);
    // Future: Implement cleanup mechanism if needed
}

/**
 * Handles extension installation/update
 * @param {Object} details - Installation details
 */
function handleExtensionInstalled(details) {
    const action = details.reason === 'install' ? 'installed' : 'updated';
    logger.info(`Extension ${action}`);
}

// Event listeners
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    logger.info('Received message:', message.type);

    switch (message.type) {
        case 'VERIFICATION_COMPLETE':
            handleVerificationComplete(message, sender, sendResponse);
            break;
        default:
            logger.info('Unknown message type:', message.type);
    }

    return true; // Keep message channel open for async response
});

chrome.tabs.onUpdated.addListener(handleTabUpdate);
chrome.tabs.onRemoved.addListener(handleTabRemoved);
chrome.runtime.onInstalled.addListener(handleExtensionInstalled);

// Extension startup
chrome.runtime.onStartup.addListener(() => {
    logger.info('Extension started');
});

// Initialize
logger.info('Service worker loaded'); 