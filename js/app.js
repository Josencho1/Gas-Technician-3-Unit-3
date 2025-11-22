// Main Application File
// Single Responsibility: Application initialization and component orchestration
// Follows Dependency Injection principle

import { OverviewSection } from './components/OverviewSection.js';
import { NavigationTabs } from './components/NavigationTabs.js';
import { ConceptCard } from './components/ConceptCard.js';
import { ConceptDetails } from './components/ConceptDetails.js';
import { FuelTable } from './components/FuelTable.js';
import { StrategySection } from './components/StrategySection.js';
import { ActionPlan } from './components/ActionPlan.js';
import { FurnaceDiagram } from './components/FurnaceDiagram.js';

/**
 * Main Application Class
 * Orchestrates all components and manages application state
 */
class GasTechnicianDashboard {
    constructor() {
        this.components = {};
        this.initialize();
    }

    /**
     * Initializes all components with dependency injection
     */
    initialize() {
        // Create component instances
        this.components.overview = new OverviewSection('overview');
        this.components.navigation = new NavigationTabs('nav-tabs', this.handleTabChange.bind(this));
        this.components.conceptDetails = new ConceptDetails('details-display', 'details-content');
        this.components.conceptCard = new ConceptCard('concept-grid', this.handleCardClick.bind(this));
        this.components.fuelTable = new FuelTable('fuel-table');
        this.components.strategy = new StrategySection('strategy');
        this.components.actionPlan = new ActionPlan('action-plan');
        this.components.furnaceDiagram = new FurnaceDiagram('furnace-diagram');

        // Render all components
        this.renderAll();
    }

    /**
     * Renders all components in the correct order
     */
    renderAll() {
        // Render overview section with chart
        this.components.overview.render();

        // Render navigation tabs
        this.components.navigation.render();

        // Render concept explorer components
        ConceptCard.renderFilters('filters', this.handleFilterChange.bind(this));
        this.components.conceptCard.render('all');

        // Render other tab content
        this.components.fuelTable.render();
        this.components.strategy.render();
        this.components.actionPlan.render();
        this.components.furnaceDiagram.render();
    }

    /**
     * Handles concept card click events
     * @param {string} conceptId - The ID of the clicked concept
     */
    handleCardClick(conceptId) {
        this.components.conceptDetails.show(conceptId);
    }

    /**
     * Handles filter change events
     * @param {string} filter - The selected filter
     */
    handleFilterChange(filter) {
        this.components.conceptCard.render(filter);
        this.components.conceptDetails.hide();
    }

    /**
     * Handles tab change events
     * @param {string} tabId - The ID of the selected tab
     */
    handleTabChange(tabId) {
        // Optional: Add any tab-specific logic here
        console.log(`Switched to tab: ${tabId}`);
    }

    /**
     * Cleanup method for proper resource management
     */
    destroy() {
        if (this.components.overview) {
            this.components.overview.destroy();
        }
        // Add other cleanup as needed
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new GasTechnicianDashboard();
    
    // Make app instance available globally for debugging (optional)
    window.gasTechApp = app;
});
