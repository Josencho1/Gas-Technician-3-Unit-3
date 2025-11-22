// Strategy Section Component
// Single Responsibility: Render pressure regulation and combustion quality diagrams

export class StrategySection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Renders the complete strategy section
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <h2 class="text-3xl font-bold text-center mb-2">Considerations</h2>
            <p class="text-center text-gray-600 mb-8">Pressure and Combustion.</p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                ${this.renderPressureRegulation()}
                ${this.renderCombustionQuality()}
            </div>
        `;
    }

    /**
     * Renders the pressure regulation diagram
     * @returns {string} HTML for pressure regulation
     */
    renderPressureRegulation() {
        return `
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-xl font-bold mb-4 text-center">Pressure Regulation</h3>
                <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div class="text-center p-3 border-2 border-dashed border-gray-300 rounded-lg">
                        <p class="font-semibold">Street Main</p>
                        <p class="text-sm text-gray-500">~60 PSIG</p>
                    </div>
                    <div class="text-4xl font-thin text-gray-400">→</div>
                    <div class="text-center p-3 bg-gray-100 rounded-lg">
                        <p class="font-semibold">Meter Regulator</p>
                        <p class="text-xl font-bold">~7" W.C.</p>
                    </div>
                    <div class="text-4xl font-thin text-gray-400">→</div>
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
            <div class="flex-1 p-3 border-t-4 bg-gray-50 rounded-b-lg" style="border-color: ${level.color}">
                <h4 class="font-bold">${level.title}</h4>
                <p class="font-semibold text-sm" style="color: ${level.color}">${level.type}</p>
                <p class="text-xs text-gray-600 mt-1">${level.description}</p>
            </div>
        `).join('');

        return `
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-xl font-bold mb-4 text-center">Combustion Quality</h3>
                <div class="flex flex-col md:flex-row justify-around items-stretch space-y-4 md:space-y-0 md:space-x-4 text-center">
                    ${levelsHtml}
                </div>
            </div>
        `;
    }
}
