// Navigation Tabs Component
// Single Responsibility: Render and manage navigation tabs

import { NAV_TABS } from '../config/constants.js';

export class NavigationTabs {
    constructor(containerId, onTabChange) {
        this.container = document.getElementById(containerId);
        this.onTabChange = onTabChange;
        this.activeTab = 'explorer';
    }

    /**
     * Renders the navigation tabs
     */
    render() {
        if (!this.container) return;

        const tabsHtml = NAV_TABS.map(tab => `
            <a data-tab="${tab.id}"
                class="nav-link ${tab.id === this.activeTab ? 'active' : ''} text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#D95B43] border-b-2 border-transparent pb-1 px-2">
                ${tab.label}
            </a>
        `).join('');

        this.container.innerHTML = tabsHtml;
        this.attachEventListeners();
    }

    /**
     * Attaches click event listeners to all tab links
     */
    attachEventListeners() {
        const navLinks = this.container.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = link.dataset.tab;
                this.switchTab(targetTab);
            });
        });
    }

    /**
     * Switches to a specific tab
     * @param {string} tabId - The ID of the tab to switch to
     */
    switchTab(tabId) {
        this.activeTab = tabId;
        
        // Update active state on nav links
        const navLinks = this.container.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.dataset.tab === tabId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
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
    }

    /**
     * Gets the current active tab
     * @returns {string} The ID of the active tab
     */
    getActiveTab() {
        return this.activeTab;
    }
}
