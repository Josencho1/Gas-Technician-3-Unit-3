// Overview Section Component
// Single Responsibility: Render fuel summary cards and composition chart

import { FUEL_SUMMARY_CARDS } from '../config/constants.js';
import { formatFormulas } from '../utils/formatters.js';
import { ChartService } from '../services/ChartService.js';

export class OverviewSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.chartInstance = null;
    }

    /**
     * Renders the complete overview section
     */
    render() {
        if (!this.container) return;

        const cardsHtml = this.renderSummaryCards();
        const chartHtml = this.renderChartSection();

        this.container.innerHTML = `
            ${cardsHtml}
            ${chartHtml}
        `;

        // Initialize chart after DOM is ready
        setTimeout(() => {
            this.chartInstance = ChartService.createCompositionChart('compositionChart');
        }, 0);
    }

    /**
     * Renders the fuel summary cards
     * @returns {string} HTML string for summary cards
     */
    renderSummaryCards() {
        const cards = FUEL_SUMMARY_CARDS.map(card => `
            <div class="bg-white rounded-lg shadow-sm p-6 border-t-4" style="border-color: ${card.color}">
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">${card.title}</h3>
                <p class="text-3xl font-bold text-[#2A363B]">${formatFormulas(card.name)}</p>
                <p class="text-sm text-gray-600 mt-2">${formatFormulas(card.description)}</p>
            </div>
        `).join('');

        return `<div class="grid grid-cols-1 md:grid-cols-3 gap-6">${cards}</div>`;
    }

    /**
     * Renders the chart container section
     * @returns {string} HTML string for chart section
     */
    renderChartSection() {
        return `
            <div class="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-xl font-bold text-center mb-4">Typical Natural Gas Composition</h3>
                <div class="chart-container h-[250px] sm:h-[300px]">
                    <canvas id="compositionChart"></canvas>
                </div>
            </div>
        `;
    }

    /**
     * Cleanup method to destroy chart instance
     */
    destroy() {
        if (this.chartInstance) {
            ChartService.destroyChart(this.chartInstance);
        }
    }
}
