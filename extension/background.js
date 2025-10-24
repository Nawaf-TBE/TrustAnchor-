/**
 * Trust Anchor Verifier - Background Service Worker
 * Advanced badge management and state tracking for content verification
 * 
 * @version 2.0
 * @author Trust Anchor Team
 */

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const CONFIG = {
    VERIFICATION_STATES: {
        VERIFIED: 'verified',
        NOT_VERIFIED: 'not_verified',
        NO_META_TAG: 'no_meta_tag',
        LOADING: 'loading',
        ERROR: 'error'
    },
    
    BADGE_STYLES: {
        verified: {
            text: '✓',
            color: '#27ae60',
            title: 'Trust Anchor: Content Verified ✓'
        },
        not_verified: {
            text: '✗',
            color: '#e74c3c',
            title: 'Trust Anchor: Content Not Verified ✗'
        },
        no_meta_tag: {
            text: '',
            color: '#95a5a6',
            title: 'Trust Anchor: No verification data'
        },
        loading: {
            text: '⟳',
            color: '#3498db',
            title: 'Trust Anchor: Verifying...'
        },
        error: {
            text: '⚠',
            color: '#f39c12',
            title: 'Trust Anchor: Verification Error'
        }
    },
    
    MESSAGES: {
        VERIFICATION_COMPLETE: 'VERIFICATION_COMPLETE',
        VERIFICATION_START: 'VERIFICATION_START',
        VERIFICATION_ERROR: 'VERIFICATION_ERROR'
    },
    
    DEFAULTS: {
        title: 'Trust Anchor Verifier',
        logPrefix: '[Trust Anchor Background]',
        maxRetries: 3,
        retryDelay: 1000
    }
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

class TabStateManager {
    constructor() {
        this.tabStates = new Map();
    }

    /**
     * Get current state of a tab
     * @param {number} tabId - Tab ID
     * @returns {string} Current state
     */
    getState(tabId) {
        return this.tabStates.get(tabId) || CONFIG.VERIFICATION_STATES.NO_META_TAG;
    }

    /**
     * Set state for a tab
     * @param {number} tabId - Tab ID
     * @param {string} state - New state
     */
    setState(tabId, state) {
        this.tabStates.set(tabId, state);
    }

    /**
     * Remove state for a tab
     * @param {number} tabId - Tab ID
     */
    removeState(tabId) {
        this.tabStates.delete(tabId);
    }

    /**
     * Clear all states
     */
    clear() {
        this.tabStates.clear();
    }
}

// ============================================================================
// UTILITIES
// ============================================================================

class Logger {
    constructor(prefix = CONFIG.DEFAULTS.logPrefix) {
        this.prefix = prefix;
    }

    info(message, ...args) {
        console.log(`${this.prefix} ${message}`, ...args);
    }

    error(message, ...args) {
        console.error(`${this.prefix} ${message}`, ...args);
    }

    warn(message, ...args) {
        console.warn(`${this.prefix} ${message}`, ...args);
    }

    debug(message, ...args) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`${this.prefix} ${message}`, ...args);
        }
    }
}

class BadgeManager {
    constructor(logger) {
        this.logger = logger;
        this.retryQueue = new Map();
    }

    /**
     * Update badge with retry logic
     * @param {string} state - Verification state
     * @param {number} tabId - Tab ID
     * @param {number} retryCount - Current retry count
     */
    async updateBadge(state, tabId, retryCount = 0) {
        try {
            const config = CONFIG.BADGE_STYLES[state];
            if (!config) {
                throw new Error(`Invalid state: ${state}`);
            }

            await Promise.all([
                chrome.action.setBadgeText({ text: config.text, tabId }),
                chrome.action.setBadgeBackgroundColor({ color: config.color, tabId }),
                chrome.action.setTitle({ title: config.title, tabId })
            ]);

            this.logger.info(`Badge updated for tab ${tabId}, state: ${state}`);
            
            // Clear any pending retries
            this.retryQueue.delete(tabId);

        } catch (error) {
            this.logger.error(`Failed to update badge for tab ${tabId}:`, error);
            
            if (retryCount < CONFIG.DEFAULTS.maxRetries) {
                this.scheduleRetry(state, tabId, retryCount + 1);
            }
        }
    }

    /**
     * Schedule a retry for failed badge update
     * @param {string} state - Verification state
     * @param {number} tabId - Tab ID
     * @param {number} retryCount - Retry count
     */
    scheduleRetry(state, tabId, retryCount) {
        const retryId = setTimeout(() => {
            this.updateBadge(state, tabId, retryCount);
        }, CONFIG.DEFAULTS.retryDelay * retryCount);

        this.retryQueue.set(tabId, retryId);
    }

    /**
     * Reset badge to default state
     * @param {number} tabId - Tab ID
     */
    async resetBadge(tabId) {
        try {
            await Promise.all([
                chrome.action.setBadgeText({ text: '', tabId }),
                chrome.action.setTitle({ title: CONFIG.DEFAULTS.title, tabId })
            ]);
            
            // Clear any pending retries
            const retryId = this.retryQueue.get(tabId);
            if (retryId) {
                clearTimeout(retryId);
                this.retryQueue.delete(tabId);
            }
        } catch (error) {
            this.logger.error(`Failed to reset badge for tab ${tabId}:`, error);
        }
    }
}

// ============================================================================
// CORE FUNCTIONALITY
// ============================================================================

class TrustAnchorBackground {
    constructor() {
        this.logger = new Logger();
        this.badgeManager = new BadgeManager(this.logger);
        this.tabStateManager = new TabStateManager();
        this.isInitialized = false;
    }

    /**
     * Initialize the background service
     */
    async initialize() {
        if (this.isInitialized) return;

        try {
            this.setupEventListeners();
            this.isInitialized = true;
            this.logger.info('Service worker initialized successfully');
        } catch (error) {
            this.logger.error('Failed to initialize service worker:', error);
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Message handling
        chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
        
        // Tab events
        chrome.tabs.onUpdated.addListener(this.handleTabUpdate.bind(this));
        chrome.tabs.onRemoved.addListener(this.handleTabRemoved.bind(this));
        
        // Extension lifecycle
        chrome.runtime.onInstalled.addListener(this.handleExtensionInstalled.bind(this));
        chrome.runtime.onStartup.addListener(this.handleExtensionStartup.bind(this));
    }

    /**
     * Handle incoming messages
     * @param {Object} message - Message from content script
     * @param {Object} sender - Message sender
     * @param {Function} sendResponse - Response callback
     */
    handleMessage(message, sender, sendResponse) {
        this.logger.info('Received message:', message.type);

        try {
            switch (message.type) {
                case CONFIG.MESSAGES.VERIFICATION_COMPLETE:
                    this.handleVerificationComplete(message, sender, sendResponse);
                    break;
                case CONFIG.MESSAGES.VERIFICATION_START:
                    this.handleVerificationStart(message, sender, sendResponse);
                    break;
                case CONFIG.MESSAGES.VERIFICATION_ERROR:
                    this.handleVerificationError(message, sender, sendResponse);
                    break;
                default:
                    this.logger.warn('Unknown message type:', message.type);
                    sendResponse({ success: false, error: 'Unknown message type' });
            }
        } catch (error) {
            this.logger.error('Error handling message:', error);
            sendResponse({ success: false, error: error.message });
        }

        return true; // Keep message channel open
    }

    /**
     * Handle verification complete
     * @param {Object} message - Message data
     * @param {Object} sender - Message sender
     * @param {Function} sendResponse - Response callback
     */
    handleVerificationComplete(message, sender, sendResponse) {
        const state = this.determineVerificationState(message.result);
        this.tabStateManager.setState(sender.tab.id, state);
        this.badgeManager.updateBadge(state, sender.tab.id);
        sendResponse({ success: true, state });
    }

    /**
     * Handle verification start
     * @param {Object} message - Message data
     * @param {Object} sender - Message sender
     * @param {Function} sendResponse - Response callback
     */
    handleVerificationStart(message, sender, sendResponse) {
        const state = CONFIG.VERIFICATION_STATES.LOADING;
        this.tabStateManager.setState(sender.tab.id, state);
        this.badgeManager.updateBadge(state, sender.tab.id);
        sendResponse({ success: true, state });
    }

    /**
     * Handle verification error
     * @param {Object} message - Message data
     * @param {Object} sender - Message sender
     * @param {Function} sendResponse - Response callback
     */
    handleVerificationError(message, sender, sendResponse) {
        const state = CONFIG.VERIFICATION_STATES.ERROR;
        this.tabStateManager.setState(sender.tab.id, state);
        this.badgeManager.updateBadge(state, sender.tab.id);
        sendResponse({ success: true, state });
    }

    /**
     * Determine verification state from result
     * @param {Object} result - Verification result
     * @returns {string} Verification state
     */
    determineVerificationState(result) {
        if (!result) return CONFIG.VERIFICATION_STATES.ERROR;
        
        if (result.verified === true) {
            return CONFIG.VERIFICATION_STATES.VERIFIED;
        }
        
        if (result.hasMetaTag === false) {
            return CONFIG.VERIFICATION_STATES.NO_META_TAG;
        }
        
        return CONFIG.VERIFICATION_STATES.NOT_VERIFIED;
    }

    /**
     * Handle tab update events
     * @param {number} tabId - Tab ID
     * @param {Object} changeInfo - Change information
     * @param {Object} tab - Tab object
     */
    handleTabUpdate(tabId, changeInfo, tab) {
        if (changeInfo.status === 'loading') {
            this.tabStateManager.setState(tabId, CONFIG.VERIFICATION_STATES.LOADING);
            this.badgeManager.updateBadge(CONFIG.VERIFICATION_STATES.LOADING, tabId);
        }
    }

    /**
     * Handle tab removal
     * @param {number} tabId - Removed tab ID
     */
    handleTabRemoved(tabId) {
        this.logger.info(`Tab closed: ${tabId}`);
        this.tabStateManager.removeState(tabId);
    }

    /**
     * Handle extension installation/update
     * @param {Object} details - Installation details
     */
    handleExtensionInstalled(details) {
        const action = details.reason === 'install' ? 'installed' : 'updated';
        this.logger.info(`Extension ${action}`);
        
        // Clear any existing states on update
        if (details.reason === 'update') {
            this.tabStateManager.clear();
        }
    }

    /**
     * Handle extension startup
     */
    handleExtensionStartup() {
        this.logger.info('Extension started');
        this.tabStateManager.clear();
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Create and initialize the background service
const trustAnchorBackground = new TrustAnchorBackground();

// Initialize when the script loads
trustAnchorBackground.initialize();

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TrustAnchorBackground, CONFIG };
} 