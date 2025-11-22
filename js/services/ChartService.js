// Chart Service - Handles all chart rendering logic
// Single Responsibility: Chart creation and configuration

import { CHART_CONFIG, COLORS } from '../config/constants.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class ChartService {
    /**
     * Creates a doughnut chart for gas composition
     * @param {string} canvasId - The ID of the canvas element
     */
    static createCompositionChart(canvasId) {
        try {
            const ctx = document.getElementById(canvasId);
            if (!ctx) {
                Logger.error(`Canvas element with id '${canvasId}' not found`);
                return null;
            }

            const config = CHART_CONFIG.composition;

            return new Chart(ctx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: config.labels,
                    datasets: [{
                        data: config.data,
                        backgroundColor: config.colors,
                        borderColor: COLORS.BACKGROUND,
                        borderWidth: 4,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            ErrorHandler.handleError(error, 'ChartService.createCompositionChart');
            return null;
        }
    }

    /**
     * Destroys a chart instance safely
     * @param {Chart} chartInstance - The Chart.js instance to destroy
     */
    static destroyChart(chartInstance) {
        try {
            if (chartInstance && typeof chartInstance.destroy === 'function') {
                chartInstance.destroy();
                Logger.debug('Chart instance destroyed successfully');
            }
        } catch (error) {
            ErrorHandler.handleError(error, 'ChartService.destroyChart');
        }
    }
}
