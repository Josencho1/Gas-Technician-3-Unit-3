// Data Validator utility for validating conceptsData
// Single Responsibility: Validate data structures to catch errors early

import { Logger } from './logger.js';

/**
 * Validator for concept data objects
 */
class ConceptValidator {
    static requiredFields = ['id', 'name', 'tier', 'type', 'focus', 'admin', 'benefit', 'description'];
    static validTiers = ['Fuel', 'Safety', 'Measurement', 'Law', 'Combustion'];

    /**
     * Validates a single concept object
     * @param {Object} concept - The concept to validate
     * @returns {boolean} True if valid
     * @throws {Error} If validation fails
     */
    static validateConcept(concept) {
        const errors = [];

        // Check required fields
        for (const field of this.requiredFields) {
            if (!concept || concept[field] === undefined || concept[field] === null || concept[field] === '') {
                errors.push(`Missing or empty required field: ${field}`);
            }
        }

        // Validate tier
        if (concept && concept.tier && !this.validTiers.includes(concept.tier)) {
            errors.push(`Invalid tier: ${concept.tier}. Must be one of: ${this.validTiers.join(', ')}`);
        }

        // Validate types
        if (concept) {
            if (typeof concept.id !== 'string') {
                errors.push('id must be a string');
            }
            if (typeof concept.name !== 'string') {
                errors.push('name must be a string');
            }
        }

        if (errors.length > 0) {
            throw new Error(`Concept validation failed: ${errors.join('; ')}`);
        }

        return true;
    }

    /**
     * Validates an array of concepts
     * @param {Array} concepts - Array of concepts to validate
     * @returns {boolean} True if all are valid
     */
    static validateAll(concepts) {
        if (!Array.isArray(concepts)) {
            throw new Error('Concepts data must be an array');
        }

        if (concepts.length === 0) {
            Logger.warn('Concepts array is empty');
            return true;
        }

        // Check for duplicate IDs
        const ids = new Set();
        const duplicates = [];

        concepts.forEach((concept, index) => {
            try {
                this.validateConcept(concept);

                // Check for duplicate IDs
                if (concept && concept.id) {
                    if (ids.has(concept.id)) {
                        duplicates.push(concept.id);
                    }
                    ids.add(concept.id);
                }
            } catch (error) {
                throw new Error(`Validation failed for concept at index ${index}: ${error.message}`);
            }
        });

        if (duplicates.length > 0) {
            throw new Error(`Duplicate concept IDs found: ${duplicates.join(', ')}`);
        }

        Logger.info(`Successfully validated ${concepts.length} concepts`);
        return true;
    }
}

export { ConceptValidator };
