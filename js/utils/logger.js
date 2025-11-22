// Logger utility for development and production
// Single Responsibility: Centralized logging with environment awareness

/**
 * Logger class that provides environment-aware logging
 * Logs to console in development, can be extended for production monitoring
 */
class Logger {
    static levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };

    static isDevelopment = window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname === '';

    static currentLevel = Logger.isDevelopment ? Logger.levels.DEBUG : Logger.levels.WARN;

    /**
     * Log debug messages (development only)
     * @param {string} message - The message to log
     * @param {*} data - Optional data to log
     */
    static debug(message, data = null) {
        if (this.currentLevel <= this.levels.DEBUG) {
            console.log(`[DEBUG] ${message}`, data || '');
        }
    }

    /**
     * Log info messages (development only)
     * @param {string} message - The message to log
     * @param {*} data - Optional data to log
     */
    static info(message, data = null) {
        if (this.currentLevel <= this.levels.INFO) {
            console.info(`[INFO] ${message}`, data || '');
        }
    }

    /**
     * Log warning messages
     * @param {string} message - The message to log
     * @param {*} data - Optional data to log
     */
    static warn(message, data = null) {
        if (this.currentLevel <= this.levels.WARN) {
            console.warn(`[WARN] ${message}`, data || '');
        }
    }

    /**
     * Log error messages
     * @param {string} message - The message to log
     * @param {Error} error - The error object
     * @param {*} data - Optional additional data
     */
    static error(message, error = null, data = null) {
        if (this.currentLevel <= this.levels.ERROR) {
            console.error(`[ERROR] ${message}`, error || '', data || '');
        }
        // In production, this could send to an error tracking service
    }
}

export { Logger };
