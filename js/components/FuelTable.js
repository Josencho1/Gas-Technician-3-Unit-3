// Fuel Table Component
// Single Responsibility: Render fuel properties comparison table

import { formatFormulas, escapeHtml } from '../utils/formatters.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class FuelTable {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Renders the complete fuel properties table
     */
    render() {
        if (!this.container) return;

        try {
            this.container.innerHTML = `
                <h2 class="text-3xl font-bold text-center mb-2">Fuel Properties Comparison</h2>
                <p class="text-center text-gray-600 mb-8">Detailed comparison of Natural Gas, Propane, and Butane.</p>

                <div class="bg-white rounded-lg shadow-sm overflow-hidden border-t-4 border-[#D95B43]" role="region" aria-label="Fuel properties table">
                    <div class="overflow-x-auto">
                        ${this.createTableHtml()}
                    </div>
                </div>
            `;
        } catch (error) {
            ErrorHandler.handleError(error, 'FuelTable.render');
        }
    }

    /**
     * Creates the table HTML structure
     * @returns {string} HTML string for the table
     */
    createTableHtml() {
        const tableData = this.getTableData();
        
        return `
            <table class="min-w-full text-sm text-left">
                <thead class="bg-gray-100 text-[#2A363B]">
                    <tr>
                        ${this.createTableHeader()}
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    ${this.createTableRows(tableData)}
                </tbody>
            </table>
        `;
    }

    /**
     * Creates table header
     * @returns {string} HTML for table header
     */
    createTableHeader() {
        const headers = ['Property', 'Natural Gas', 'Propane', 'Butane'];

        return headers.map((header, index) => {
            const colorClass = index === 0 ? '' : 'text-[#D95B43]';
            return `<th scope="col" class="px-6 py-4 font-bold uppercase tracking-wider ${colorClass}">${escapeHtml(header)}</th>`;
        }).join('');
    }

    /**
     * Gets the table data
     * @returns {Array} Array of row data objects
     */
    getTableData() {
        return [
            {
                property: 'Chemical Formula',
                naturalGas: 'CH₄',
                propane: 'C₃H₈',
                butane: 'C₄H₁₀'
            },
            {
                property: 'Specific Gravity (Air = 1.0)',
                naturalGas: '0.6',
                propane: '1.52',
                butane: '2.0'
            },
            {
                property: 'Boiling Point',
                naturalGas: '-260°F (-162°C)',
                propane: '-44°F (-42°C)',
                butane: '32°F (0°C)'
            },
            {
                property: 'Heat Content (BTU/ft³)',
                naturalGas: '1,000',
                propane: '2,520',
                butane: '3,260'
            },
            {
                property: 'Ignition Temperature',
                naturalGas: '1300°F (700°C)',
                propane: '920°F (490°C)',
                butane: '900°F (480°C)'
            },
            {
                property: 'Limits of Flammability',
                naturalGas: '4-15%',
                propane: '2.1-9.5%',
                butane: '1.9-8.5%'
            }
        ];
    }

    /**
     * Creates table rows from data
     * @param {Array} data - Array of row data
     * @returns {string} HTML for table rows
     */
    createTableRows(data) {
        return data.map((row, index) => {
            const rowClass = index % 2 === 0 ? 'hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-50';

            return `
                <tr class="${rowClass}">
                    <th scope="row" class="px-6 py-3 font-medium">${escapeHtml(row.property)}</th>
                    <td class="px-6 py-3">${formatFormulas(row.naturalGas)}</td>
                    <td class="px-6 py-3">${formatFormulas(row.propane)}</td>
                    <td class="px-6 py-3">${formatFormulas(row.butane)}</td>
                </tr>
            `;
        }).join('');
    }

    /**
     * Destroys the component (no cleanup needed for this component)
     */
    destroy() {
        Logger.debug('FuelTable destroyed');
    }
}
