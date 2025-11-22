// Navigation Tabs Component
// Single Responsibility: Render and manage navigation tabs

import { NAV_TABS } from '../config/constants.js';
import { escapeHtml } from '../utils/formatters.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class NavigationTabs {
    constructor(containerId, onTabChange) {
        this.container = document.getElementById(containerId);
        this.onTabChange = onTabChange;
        this.activeTab = 'explorer';
        this.boundHandlers = new Map(); // Track handlers for cleanup
    }

    /**
     * Renders the navigation tabs
     */
    render() {
        if (!this.container) return;

        try {
            // Clean up old listeners before re-rendering
            this.cleanup();

            const tabsHtml = NAV_TABS.map(tab => `
                <a data-tab="${escapeHtml(tab.id)}"
                    class="nav-link ${tab.id === this.activeTab ? 'active' : ''} text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#D95B43] border-b-2 border-transparent pb-1 px-2"
                    role="tab"
                    aria-selected="${tab.id === this.activeTab}"
                    aria-controls="${escapeHtml(tab.id)}"
                    tabindex="${tab.id === this.activeTab ? 0 : -1}">
                    ${escapeHtml(tab.label)}
                </a>
            `).join('');

            this.container.innerHTML = tabsHtml;
            this.container.setAttribute('role', 'tablist');
            this.attachEventListeners();
        } catch (error) {
            ErrorHandler.handleError(error, 'NavigationTabs.render');
        }
    }

    /**
     * Attaches click and keyboard event listeners to all tab links
     */
    attachEventListeners() {
        const navLinks = this.container.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            // Click handler
            const clickHandler = (e) => {
                e.preventDefault();
                const targetTab = link.dataset.tab;
                this.switchTab(targetTab);
            };

            // Keyboard handler for accessibility
            const keyHandler = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clickHandler(e);
                }
                // Arrow key navigation
                else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.navigateWithArrows(e.key, link);
                }
            };

            // Add event listeners
            link.addEventListener('click', clickHandler);
            link.addEventListener('keydown', keyHandler);

            // Store handlers for cleanup
            this.boundHandlers.set(link, { clickHandler, keyHandler });
        });
    }

    /**
     * Navigate between tabs using arrow keys
     * @param {string} key - The arrow key pressed
     * @param {HTMLElement} currentLink - The currently focused tab
     */
    navigateWithArrows(key, currentLink) {
        const navLinks = Array.from(this.container.querySelectorAll('.nav-link'));
        const currentIndex = navLinks.indexOf(currentLink);
        let nextIndex;

        if (key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % navLinks.length;
        } else {
            nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        }

        const nextLink = navLinks[nextIndex];
        nextLink.focus();
        nextLink.click();
    }

    /**
     * Switches to a specific tab
     * @param {string} tabId - The ID of the tab to switch to
     */
    switchTab(tabId) {
        try {
            this.activeTab = tabId;

            // Update active state on nav links
            const navLinks = this.container.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.dataset.tab === tabId) {
                    link.classList.add('active');
                    link.setAttribute('aria-selected', 'true');
                    link.setAttribute('tabindex', '0');
                } else {
                    link.classList.remove('active');
                    link.setAttribute('aria-selected', 'false');
                    link.setAttribute('tabindex', '-1');
                }
            });

            // Show/hide tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            // Call callback if provided
            if (this.onTabChange) {
                this.onTabChange(tabId);
            }
        } catch (error) {
            ErrorHandler.handleError(error, 'NavigationTabs.switchTab');
        }
    }

    /**
     * Gets the current active tab
     * @returns {string} The ID of the active tab
     */
    getActiveTab() {
        return this.activeTab;
    }

    /**
     * Cleans up event listeners to prevent memory leaks
     */
    cleanup() {
        if (this.boundHandlers && this.boundHandlers.size > 0) {
            this.boundHandlers.forEach((handlers, element) => {
                element.removeEventListener('click', handlers.clickHandler);
                element.removeEventListener('keydown', handlers.keyHandler);
            });
            this.boundHandlers.clear();
        }
    }

    /**
     * Destroys the component and cleans up resources
     */
    destroy() {
        this.cleanup();
        Logger.debug('NavigationTabs destroyed');
    }
}
