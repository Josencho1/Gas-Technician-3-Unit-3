// Error Handler utility for centralized error management
// Single Responsibility: Handle and report errors consistently

import { Logger } from './logger.js';

/**
 * Centralized error handler for the application
 * Provides consistent error handling and user feedback
 */
class ErrorHandler {
    /**
     * Handles errors with context and optional user notification
     * @param {Error} error - The error object
     * @param {string} context - Where the error occurred
     * @param {boolean} showUser - Whether to show error to user (default: false)
     */
    static handleError(error, context = 'Unknown', showUser = false) {
        // Log the error
        Logger.error(`Error in ${context}`, error);

        // Optionally show user-friendly message
        if (showUser) {
            this.showErrorNotification(error.message || 'An error occurred');
        }
    }

    /**
     * Shows a user-friendly error notification
     * @param {string} message - The message to display
     */
    static showErrorNotification(message) {
        // For now, we'll use a simple approach
        // In a more advanced implementation, this could show a toast/modal
        Logger.warn('User notification:', message);

        // Could be enhanced with a notification component
        // For now, errors are handled gracefully without disrupting UX
    }

    /**
     * Wraps an async function with error handling
     * @param {Function} fn - The async function to wrap
     * @param {string} context - Context for error reporting
     * @returns {Function} - Wrapped function with error handling
     */
    static wrapAsync(fn, context) {
        return async (...args) => {
            try {
                return await fn(...args);
            } catch (error) {
                this.handleError(error, context);
                return null;
            }
        };
    }

    /**
     * Wraps a synchronous function with error handling
     * @param {Function} fn - The function to wrap
     * @param {string} context - Context for error reporting
     * @returns {Function} - Wrapped function with error handling
     */
    static wrap(fn, context) {
        return (...args) => {
            try {
                return fn(...args);
            } catch (error) {
                this.handleError(error, context);
                return null;
            }
        };
    }
}

export { ErrorHandler };
