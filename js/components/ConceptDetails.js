// Concept Details Component
// Single Responsibility: Display detailed information for a selected concept

import { TIER_COLORS } from '../config/constants.js';
import { formatFormulas, smoothScrollTo } from '../utils/formatters.js';
import { conceptsData } from '../data/conceptsData.js';

export class ConceptDetails {
    constructor(displayId, contentId) {
        this.display = document.getElementById(displayId);
        this.content = document.getElementById(contentId);
        this.isVisible = false;
    }

    /**
     * Shows details for a specific concept
     * @param {string} conceptId - The ID of the concept to display
     */
    show(conceptId) {
        const concept = this.findConcept(conceptId);
        if (!concept) {
            console.error(`Concept with id '${conceptId}' not found`);
            return;
        }

        this.render(concept);
        this.display.classList.add('show');
        this.isVisible = true;
        
        // Scroll to details
        smoothScrollTo(this.display);
    }

    /**
     * Hides the details panel
     */
    hide() {
        this.display.classList.remove('show');
        this.isVisible = false;
    }

    /**
     * Finds a concept by ID
     * @param {string} conceptId - The concept ID to find
     * @returns {Object|null} The concept object or null
     */
    findConcept(conceptId) {
        return conceptsData.find(c => c.id === conceptId);
    }

    /**
     * Renders the concept details
     * @param {Object} concept - The concept to display
     */
    render(concept) {
        if (!this.content) return;

        const color = TIER_COLORS[concept.tier] || '#000';

        this.content.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-3xl font-bold text-[#2A363B]">${formatFormulas(concept.name)}</h2>
                    <p class="text-md text-gray-500" style="color: ${color}">${concept.tier} Concept</p>
                </div>
                <button id="close-details" class="text-2xl text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="border-t my-4"></div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                <div>
                    <p class="text-sm font-semibold text-gray-500 uppercase">Category</p>
                    <p class="font-medium">${concept.type}</p>
                </div>
                <div>
                    <p class="text-sm font-semibold text-gray-500 uppercase">Primary Focus</p>
                    <p class="font-medium">${concept.focus}</p>
                </div>
                <div>
                    <p class="text-sm font-semibold text-gray-500 uppercase">Value</p>
                    <p class="font-medium">${formatFormulas(concept.benefit)}</p>
                </div>
            </div>
            <div class="mt-6">
                <p class="text-sm font-semibold text-gray-500 uppercase">Description</p>
                <p class="mt-1">${formatFormulas(concept.description)}</p>
            </div>
        `;

        this.attachCloseListener();
    }

    /**
     * Attaches click listener to close button
     */
    attachCloseListener() {
        const closeBtn = document.getElementById('close-details');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
    }

    /**
     * Checks if details panel is currently visible
     * @returns {boolean} True if visible
     */
    getVisibility() {
        return this.isVisible;
    }
}
