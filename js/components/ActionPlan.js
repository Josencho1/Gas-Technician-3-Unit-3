// Action Plan Component
// Single Responsibility: Render key safety and service takeaways

import { escapeHtml } from '../utils/formatters.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class ActionPlan {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Renders the action plan section
     */
    render() {
        if (!this.container) return;

        try {
            this.container.innerHTML = `
                <h2 class="text-3xl font-bold text-center mb-2">Key Safety & Service Takeaways</h2>
                <p class="text-center text-gray-600 mb-8">The top 5 most critical concepts for field application.</p>

                <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 space-y-4" role="region" aria-label="Safety and service takeaways">
                    ${this.renderTakeaways()}
                </div>
            `;
        } catch (error) {
            ErrorHandler.handleError(error, 'ActionPlan.render');
        }
    }

    /**
     * Gets the takeaway items data
     * @returns {Array} Array of takeaway objects
     */
    getTakeaways() {
        return [
            {
                number: 1,
                title: 'Specific Gravity is Critical',
                description: 'Natural Gas (S.G. ~0.60) rises. Propane (S.G. ~1.52) sinks and pools in low areas.',
                color: '#D95B43'
            },
            {
                number: 2,
                title: 'Know Your Pressures: PSIG vs. W.C.',
                description: 'PSIG for high pressure. W.C. for appliances. Key: 1 PSI ≈ 27.7" W.C.',
                color: '#F38630'
            },
            {
                number: 3,
                title: 'CO is the Silent Killer',
                description: 'Legal max 400 ppm (air-free), but >100 ppm is unsafe.',
                color: '#E0E4CC'
            },
            {
                number: 4,
                title: 'Trust Your Nose (Mercaptan)',
                description: 'The "rotten egg" smell indicates a leak. Never ignore it.',
                color: '#696969'
            },
            {
                number: 5,
                title: 'Gases Behave Predictably (Gas Laws)',
                description: 'Boyle\'s Law: P₁V₁ = P₂V₂. Doubling pressure halves volume.',
                color: '#2A363B'
            }
        ];
    }

    /**
     * Renders all takeaway items
     * @returns {string} HTML for all takeaways
     */
    renderTakeaways() {
        return this.getTakeaways().map(takeaway => `
            <div class="p-4 rounded-md border-l-4 bg-gray-50"
                 style="border-color: ${escapeHtml(takeaway.color)}"
                 role="article"
                 aria-label="Takeaway ${takeaway.number}">
                <h3 class="font-bold text-lg">${takeaway.number}. ${escapeHtml(takeaway.title)}</h3>
                <p class="text-gray-700">${escapeHtml(takeaway.description)}</p>
            </div>
        `).join('');
    }

    /**
     * Destroys the component (no cleanup needed for this component)
     */
    destroy() {
        Logger.debug('ActionPlan destroyed');
    }
}
