// Utility functions for formatting
// Single Responsibility: Text and chemical formula formatting

/**
 * Formats chemical formulas by converting subscript notation to HTML
 * @param {string} str - The string containing chemical formulas
 * @returns {string} - HTML formatted string
 */
export const formatFormulas = (str) => {
    if (!str) return '';
    
    const replacements = {
        'CₓHₙ': 'C<sub>x</sub>H<sub>n</sub>',
        'CH₄': 'CH<sub>4</sub>',
        'C₃H₈': 'C<sub>3</sub>H<sub>8</sub>',
        'C₄H₁₀': 'C<sub>4</sub>H<sub>10</sub>',
        'C₂H₅SH': 'C<sub>2</sub>H<sub>5</sub>SH',
        'C₂H₆+': 'C<sub>2</sub>H<sub>6</sub>+',
        'H₂O': 'H<sub>2</sub>O',
        'CO₂': 'CO<sub>2</sub>',
        'O₂': 'O<sub>2</sub>',
        'N₂': 'N<sub>2</sub>',
        'P₁V₁': 'P<sub>1</sub>V<sub>1</sub>',
        'P₂V₂': 'P<sub>2</sub>V<sub>2</sub>',
        'T₁': 'T<sub>1</sub>',
        'T₂': 'T<sub>2</sub>',
        'V₁': 'V<sub>1</sub>',
        'V₂': 'V<sub>2</sub>'
    };

    let result = str;
    for (const [key, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(key, 'g'), value);
    }
    
    return result;
};

/**
 * Escapes HTML to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - Escaped HTML string
 */
export const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

/**
 * Smoothly scrolls an element into view
 * @param {HTMLElement} element - The element to scroll to
 * @param {string} block - Alignment option ('start', 'center', 'end')
 */
export const smoothScrollTo = (element, block = 'center') => {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block });
    }
};
