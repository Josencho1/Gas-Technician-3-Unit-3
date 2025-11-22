// Overview Section Component
// Single Responsibility: Render fuel summary cards and composition chart

import { FUEL_SUMMARY_CARDS } from '../config/constants.js';
import { formatFormulas, escapeHtml } from '../utils/formatters.js';
import { ChartService } from '../services/ChartService.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

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

        try {
            const cardsHtml = this.renderSummaryCards();
            const chartHtml = this.renderChartSection();

            this.container.innerHTML = `
                ${cardsHtml}
                ${chartHtml}
            `;

            // Initialize chart after DOM is ready using requestAnimationFrame
            // This is better than setTimeout as it waits for the next repaint
            requestAnimationFrame(() => {
                const canvas = document.getElementById('compositionChart');
                if (canvas) {
                    this.chartInstance = ChartService.createCompositionChart('compositionChart');
                } else {
                    Logger.warn('Canvas element not found for chart rendering');
                }
            });
        } catch (error) {
            ErrorHandler.handleError(error, 'OverviewSection.render');
        }
    }

    /**
     * Renders the fuel summary cards
     * @returns {string} HTML string for summary cards
     */
    renderSummaryCards() {
        const cards = FUEL_SUMMARY_CARDS.map(card => `
            <div class="bg-white rounded-lg shadow-sm p-6 border-t-4"
                 style="border-color: ${escapeHtml(card.color)}"
                 role="article"
                 aria-label="${escapeHtml(card.title)} information">
                <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">${escapeHtml(card.title)}</h3>
                <p class="text-3xl font-bold text-[#2A363B]">${formatFormulas(card.name)}</p>
                <p class="text-sm text-gray-600 mt-2">${formatFormulas(card.description)}</p>
            </div>
        `).join('');

        return `<div class="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">${cards}</div>`;
    }

    /**
     * Renders the chart container section
     * @returns {string} HTML string for chart section
     */
    renderChartSection() {
        return `
            <div class="mt-6 bg-white rounded-lg shadow-sm p-6" role="region" aria-label="Gas Composition Chart">
                <h3 class="text-xl font-bold text-center mb-4">Typical Natural Gas Composition</h3>
                <div class="chart-container h-[250px] sm:h-[300px]">
                    <canvas id="compositionChart" role="img" aria-label="Doughnut chart showing typical natural gas composition percentages"></canvas>
                </div>
            </div>
        `;
    }

    /**
     * Cleanup method to destroy chart instance
     */
    destroy() {
        try {
            if (this.chartInstance) {
                ChartService.destroyChart(this.chartInstance);
                this.chartInstance = null;
            }
            Logger.debug('OverviewSection destroyed');
        } catch (error) {
            ErrorHandler.handleError(error, 'OverviewSection.destroy');
        }
    }
}
