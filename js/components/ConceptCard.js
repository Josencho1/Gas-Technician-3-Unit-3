// Concept Card Component
// Single Responsibility: Render individual concept cards

import { TIER_COLORS, FILTER_OPTIONS } from '../config/constants.js';
import { formatFormulas } from '../utils/formatters.js';
import { conceptsData } from '../data/conceptsData.js';

export class ConceptCard {
    constructor(gridId, onCardClick) {
        this.grid = document.getElementById(gridId);
        this.onCardClick = onCardClick;
        this.currentFilter = 'all';
    }

    /**
     * Renders all concept cards based on current filter
     * @param {string} filter - The filter to apply ('all' or a tier name)
     */
    render(filter = 'all') {
        if (!this.grid) return;

        this.currentFilter = filter;
        const filteredConcepts = this.getFilteredConcepts(filter);
        
        this.grid.innerHTML = filteredConcepts.map(concept => 
            this.createCardHtml(concept)
        ).join('');

        this.attachEventListeners();
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
        
        return `
            <div class="concept-card bg-white rounded-lg shadow-sm p-4 cursor-pointer border-l-4"
                 style="border-color: ${color}"
                 data-id="${concept.id}">
                <h3 class="font-bold text-lg text-[#2A363B]">${formatFormulas(concept.name)}</h3>
                <p class="text-sm text-gray-600">${concept.type}</p>
                <div class="mt-2 flex justify-between items-center">
                    <span class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">${concept.focus}</span>
                    <span class="text-xs font-bold" style="color: ${color}">${concept.tier}</span>
                </div>
            </div>
        `;
    }

    /**
     * Attaches click event listeners to all cards
     */
    attachEventListeners() {
        const cards = this.grid.querySelectorAll('.concept-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const conceptId = card.dataset.id;
                if (this.onCardClick) {
                    this.onCardClick(conceptId);
                }
            });
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

        const filtersHtml = FILTER_OPTIONS.map((option, index) => `
            <button class="filter-btn ${index === 0 ? 'active bg-[#2A363B] text-white' : ''} px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-200"
                    data-filter="${option.id}">
                ${option.label}
            </button>
        `).join('');

        container.innerHTML = filtersHtml;

        // Attach filter button listeners
        const filterBtns = container.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-[#2A363B]', 'text-white');
                });
                btn.classList.add('active', 'bg-[#2A363B]', 'text-white');

                // Call callback
                if (onFilterChange) {
                    onFilterChange(btn.dataset.filter);
                }
            });
        });
    }
}
