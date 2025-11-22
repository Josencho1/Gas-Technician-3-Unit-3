// Concept Card Component
// Single Responsibility: Render individual concept cards

import { TIER_COLORS, FILTER_OPTIONS } from '../config/constants.js';
import { formatFormulas, escapeHtml } from '../utils/formatters.js';
import { conceptsData } from '../data/conceptsData.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class ConceptCard {
    constructor(gridId, onCardClick) {
        this.grid = document.getElementById(gridId);
        this.onCardClick = onCardClick;
        this.currentFilter = 'all';
        this.boundHandlers = new Map(); // Track handlers for cleanup
    }

    /**
     * Renders all concept cards based on current filter
     * @param {string} filter - The filter to apply ('all' or a tier name)
     */
    render(filter = 'all') {
        if (!this.grid) return;

        try {
            // Clean up old listeners before re-rendering
            this.cleanup();

            this.currentFilter = filter;
            const filteredConcepts = this.getFilteredConcepts(filter);

            this.grid.innerHTML = filteredConcepts.map(concept =>
                this.createCardHtml(concept)
            ).join('');

            this.attachEventListeners();
        } catch (error) {
            ErrorHandler.handleError(error, 'ConceptCard.render');
        }
    }

    /**
     * Gets filtered concepts based on the selected filter
     * @param {string} filter - The filter to apply
     * @returns {Array} Filtered array of concepts
     */
    getFilteredConcepts(filter) {
        if (filter === 'all') {
            return conceptsData;
        }
        return conceptsData.filter(concept => concept.tier === filter);
    }

    /**
     * Creates HTML for a single concept card
     * @param {Object} concept - The concept data
     * @returns {string} HTML string for the card
     */
    createCardHtml(concept) {
        const color = TIER_COLORS[concept.tier] || '#000';
        const safeName = formatFormulas(concept.name);
        const safeType = escapeHtml(concept.type);
        const safeFocus = escapeHtml(concept.focus);
        const safeTier = escapeHtml(concept.tier);

        return `
            <div class="concept-card bg-white rounded-lg shadow-sm p-4 cursor-pointer border-l-4"
                 style="border-color: ${color}"
                 data-id="${escapeHtml(concept.id)}"
                 role="button"
                 tabindex="0"
                 aria-label="View details for ${concept.name} - ${concept.focus}">
                <h3 class="font-bold text-lg text-[#2A363B]">${safeName}</h3>
                <p class="text-sm text-gray-600">${safeType}</p>
                <div class="mt-2 flex justify-between items-center">
                    <span class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100" aria-label="Focus area">${safeFocus}</span>
                    <span class="text-xs font-bold" style="color: ${color}" aria-label="Category">${safeTier}</span>
                </div>
            </div>
        `;
    }

    /**
     * Attaches click and keyboard event listeners to all cards
     */
    attachEventListeners() {
        const cards = this.grid.querySelectorAll('.concept-card');

        cards.forEach(card => {
            // Click handler
            const clickHandler = () => {
                const conceptId = card.dataset.id;
                if (this.onCardClick) {
                    this.onCardClick(conceptId);
                }
            };

            // Keyboard handler for accessibility
            const keyHandler = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clickHandler();
                }
            };

            // Add event listeners
            card.addEventListener('click', clickHandler);
            card.addEventListener('keydown', keyHandler);

            // Store handlers for cleanup
            this.boundHandlers.set(card, { clickHandler, keyHandler });
        });
    }

    /**
     * Renders filter buttons
     * @param {string} containerId - ID of the filter container
     * @param {Function} onFilterChange - Callback when filter changes
     */
    static renderFilters(containerId, onFilterChange) {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            const filtersHtml = FILTER_OPTIONS.map((option, index) => `
                <button class="filter-btn ${index === 0 ? 'active bg-[#2A363B] text-white' : ''} px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-200"
                        data-filter="${escapeHtml(option.id)}"
                        role="tab"
                        aria-selected="${index === 0}"
                        tabindex="${index === 0 ? 0 : -1}">
                    ${escapeHtml(option.label)}
                </button>
            `).join('');

            container.innerHTML = filtersHtml;

            // Attach filter button listeners
            const filterBtns = container.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                // Click handler
                const clickHandler = () => {
                    // Update active state
                    filterBtns.forEach(b => {
                        b.classList.remove('active', 'bg-[#2A363B]', 'text-white');
                        b.setAttribute('aria-selected', 'false');
                        b.setAttribute('tabindex', '-1');
                    });
                    btn.classList.add('active', 'bg-[#2A363B]', 'text-white');
                    btn.setAttribute('aria-selected', 'true');
                    btn.setAttribute('tabindex', '0');

                    // Call callback
                    if (onFilterChange) {
                        onFilterChange(btn.dataset.filter);
                    }
                };

                // Keyboard handler
                const keyHandler = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        clickHandler();
                    }
                };

                btn.addEventListener('click', clickHandler);
                btn.addEventListener('keydown', keyHandler);
            });
        } catch (error) {
            ErrorHandler.handleError(error, 'ConceptCard.renderFilters');
        }
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
        Logger.debug('ConceptCard destroyed');
    }
}
