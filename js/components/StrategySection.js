// Strategy Section Component
// Single Responsibility: Render pressure regulation and combustion quality diagrams

import { escapeHtml } from '../utils/formatters.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class StrategySection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Renders the complete strategy section
     */
    render() {
        if (!this.container) return;

        try {
            this.container.innerHTML = `
                <h2 class="text-3xl font-bold text-center mb-2">Considerations</h2>
                <p class="text-center text-gray-600 mb-8">Pressure and Combustion.</p>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    ${this.renderPressureRegulation()}
                    ${this.renderCombustionQuality()}
                </div>
            `;
        } catch (error) {
            ErrorHandler.handleError(error, 'StrategySection.render');
        }
    }

    /**
     * Renders the pressure regulation diagram
     * @returns {string} HTML for pressure regulation
     */
    renderPressureRegulation() {
        return `
            <div class="bg-white p-6 rounded-lg shadow-sm" role="region" aria-label="Pressure regulation diagram">
                <h3 class="text-xl font-bold mb-4 text-center">Pressure Regulation</h3>
                <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div class="text-center p-3 border-2 border-dashed border-gray-300 rounded-lg">
                        <p class="font-semibold">Street Main</p>
                        <p class="text-sm text-gray-500">~60 PSIG</p>
                    </div>
                    <div class="text-4xl font-thin text-gray-400" aria-hidden="true">→</div>
                    <div class="text-center p-3 bg-gray-100 rounded-lg">
                        <p class="font-semibold">Meter Regulator</p>
                        <p class="text-xl font-bold">~7" W.C.</p>
                    </div>
                    <div class="text-4xl font-thin text-gray-400" aria-hidden="true">→</div>
                    <div class="text-center p-3 bg-[#D95B43]/10 rounded-lg">
                        <p class="font-semibold text-[#D95B43]">Appliance</p>
                        <p class="text-xl font-bold">3.5" W.C.</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renders the combustion quality indicators
     * @returns {string} HTML for combustion quality
     */
    renderCombustionQuality() {
        const qualityLevels = [
            {
                title: 'IDEAL',
                type: 'Complete',
                description: 'Blue flame, max efficiency',
                color: '#0077b6'
            },
            {
                title: 'POOR',
                type: 'Incomplete',
                description: 'Yellow flame, produces CO',
                color: '#F38630'
            },
            {
                title: 'DANGER',
                type: 'High CO',
                description: 'Immediate shutdown',
                color: '#D95B43'
            }
        ];

        const levelsHtml = qualityLevels.map(level => `
            <div class="flex-1 p-3 border-t-4 bg-gray-50 rounded-b-lg"
                 style="border-color: ${escapeHtml(level.color)}"
                 role="article"
                 aria-label="${escapeHtml(level.title)} combustion level">
                <h4 class="font-bold">${escapeHtml(level.title)}</h4>
                <p class="font-semibold text-sm" style="color: ${escapeHtml(level.color)}">${escapeHtml(level.type)}</p>
                <p class="text-xs text-gray-600 mt-1">${escapeHtml(level.description)}</p>
            </div>
        `).join('');

        return `
            <div class="bg-white p-6 rounded-lg shadow-sm" role="region" aria-label="Combustion quality indicators">
                <h3 class="text-xl font-bold mb-4 text-center">Combustion Quality</h3>
                <div class="flex flex-col md:flex-row justify-around items-stretch space-y-4 md:space-y-0 md:space-x-4 text-center">
                    ${levelsHtml}
                </div>
            </div>
        `;
    }

    /**
     * Destroys the component (no cleanup needed for this component)
     */
    destroy() {
        Logger.debug('StrategySection destroyed');
    }
}
