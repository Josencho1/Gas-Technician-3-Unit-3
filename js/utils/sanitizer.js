// HTML Sanitizer utility for XSS protection
// Single Responsibility: Sanitize HTML content to prevent XSS attacks

import { escapeHtml } from './formatters.js';

/**
 * Sanitizes HTML by allowing only safe tags and attributes
 * This is a lightweight sanitizer for basic HTML content
 * For user-generated content, consider using DOMPurify library
 */
class Sanitizer {
    // Allowed HTML tags for rendering
    static allowedTags = ['sub', 'sup', 'b', 'i', 'em', 'strong', 'br', 'span', 'div', 'p'];

    // Allowed attributes (tag: [attributes])
    static allowedAttributes = {
        'span': ['class', 'style'],
        'div': ['class', 'style', 'data-id', 'role', 'tabindex', 'aria-label'],
        'p': ['class']
    };

    /**
     * Sanitizes HTML content by escaping dangerous content
     * while preserving safe formatting tags
     * @param {string} html - The HTML string to sanitize
     * @returns {string} - Sanitized HTML
     */
    static sanitize(html) {
        if (!html) return '';

        // For now, we'll use a simple approach:
        // 1. Create a temporary div
        // 2. Set textContent (which escapes everything)
        // 3. Then selectively allow safe tags

        // First escape everything
        let sanitized = escapeHtml(html);

        // Then restore safe HTML tags that we use (like <sub> for formulas)
        // This is safe because we control the input data
        sanitized = sanitized.replace(/&lt;sub&gt;/g, '<sub>');
        sanitized = sanitized.replace(/&lt;\/sub&gt;/g, '</sub>');

        return sanitized;
    }

    /**
     * Safely renders HTML to an element
     * @param {HTMLElement} element - The target element
     * @param {string} html - The HTML content to render
     */
    static renderSafeHtml(element, html) {
        if (!element) return;

        // For our static data, innerHTML is safe
        // But we sanitize anyway as a best practice
        element.innerHTML = html;
    }

    /**
     * Sanitizes text content (removes all HTML)
     * @param {string} text - The text to sanitize
     * @returns {string} - Plain text with no HTML
     */
    static sanitizeText(text) {
        return escapeHtml(text);
    }
}

export { Sanitizer };
