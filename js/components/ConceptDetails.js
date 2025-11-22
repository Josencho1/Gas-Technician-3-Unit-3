// Concept Details Component
// Single Responsibility: Display detailed information for a selected concept

import { TIER_COLORS } from '../config/constants.js';
import { formatFormulas, smoothScrollTo, escapeHtml } from '../utils/formatters.js';
import { conceptsData } from '../data/conceptsData.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class ConceptDetails {
    constructor(displayId, contentId) {
        this.display = document.getElementById(displayId);
        this.content = document.getElementById(contentId);
        this.isVisible = false;
        this.closeHandler = null; // Track close button handler
    }

    /**
     * Shows details for a specific concept
     * @param {string} conceptId - The ID of the concept to display
     */
    show(conceptId) {
        try {
            const concept = this.findConcept(conceptId);
            if (!concept) {
                Logger.error(`Concept with id '${conceptId}' not found`);
                return;
            }

            this.render(concept);
            this.display.classList.add('show');
            this.isVisible = true;

            // Scroll to details
            smoothScrollTo(this.display);
        } catch (error) {
            ErrorHandler.handleError(error, 'ConceptDetails.show');
        }
    }

    /**
     * Hides the details panel
     */
    hide() {
        try {
            this.display.classList.remove('show');
            this.isVisible = false;
        } catch (error) {
            ErrorHandler.handleError(error, 'ConceptDetails.hide');
        }
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

        try {
            // Clean up old listener first
            this.cleanup();

            const color = TIER_COLORS[concept.tier] || '#000';
            const safeName = formatFormulas(concept.name);
            const safeTier = escapeHtml(concept.tier);
            const safeType = escapeHtml(concept.type);
            const safeFocus = escapeHtml(concept.focus);
            const safeBenefit = formatFormulas(concept.benefit);
            const safeDescription = formatFormulas(concept.description);

            this.content.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-3xl font-bold text-[#2A363B]">${safeName}</h2>
                        <p class="text-md text-gray-500" style="color: ${escapeHtml(color)}">${safeTier} Concept</p>
                    </div>
                    <button id="close-details"
                            class="text-2xl text-gray-500 hover:text-gray-800"
                            aria-label="Close details panel"
                            tabindex="0">&times;</button>
                </div>
                <div class="border-t my-4" role="separator"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                    <div>
                        <p class="text-sm font-semibold text-gray-500 uppercase">Category</p>
                        <p class="font-medium">${safeType}</p>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-500 uppercase">Primary Focus</p>
                        <p class="font-medium">${safeFocus}</p>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-500 uppercase">Value</p>
                        <p class="font-medium">${safeBenefit}</p>
                    </div>
                </div>
                <div class="mt-6">
                    <p class="text-sm font-semibold text-gray-500 uppercase">Description</p>
                    <p class="mt-1">${safeDescription}</p>
                </div>
            `;

            this.attachCloseListener();
        } catch (error) {
            ErrorHandler.handleError(error, 'ConceptDetails.render');
        }
    }

    /**
     * Attaches click and keyboard listeners to close button
     */
    attachCloseListener() {
        const closeBtn = document.getElementById('close-details');
        if (closeBtn) {
            // Create handler
            this.closeHandler = () => this.hide();

            // Keyboard handler
            const keyHandler = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.hide();
                }
            };

            // Add listeners
            closeBtn.addEventListener('click', this.closeHandler);
            closeBtn.addEventListener('keydown', keyHandler);

            // Store both handlers for cleanup
            this.closeHandler.keyHandler = keyHandler;
        }
    }

    /**
     * Cleans up event listeners to prevent memory leaks
     */
    cleanup() {
        if (this.closeHandler) {
            const closeBtn = document.getElementById('close-details');
            if (closeBtn) {
                closeBtn.removeEventListener('click', this.closeHandler);
                if (this.closeHandler.keyHandler) {
                    closeBtn.removeEventListener('keydown', this.closeHandler.keyHandler);
                }
            }
            this.closeHandler = null;
        }
    }

    /**
     * Checks if details panel is currently visible
     * @returns {boolean} True if visible
     */
    getVisibility() {
        return this.isVisible;
    }

    /**
     * Destroys the component and cleans up resources
     */
    destroy() {
        this.cleanup();
        this.hide();
        Logger.debug('ConceptDetails destroyed');
    }
}
