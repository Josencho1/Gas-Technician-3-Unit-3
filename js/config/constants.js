// Configuration constants for the application
// Single Responsibility: Centralized configuration management

export const COLORS = {
    PRIMARY: '#2A363B',
    ACCENT: '#D95B43',
    SECONDARY: '#F38630',
    TERTIARY: '#E0E4CC',
    SAFETY: '#c9184a',
    COMBUSTION: '#0077b6',
    NEUTRAL: '#696969',
    BACKGROUND: '#FDFBF8'
};

export const TIER_COLORS = {
    'Fuel': COLORS.ACCENT,
    'Combustion': COLORS.COMBUSTION,
    'Law': COLORS.SECONDARY,
    'Measurement': COLORS.PRIMARY,
    'Safety': COLORS.SAFETY
};

export const FILTER_OPTIONS = [
    { id: 'all', label: 'All Concepts' },
    { id: 'Fuel', label: 'Fuel Types' },
    { id: 'Combustion', label: 'Combustion' },
    { id: 'Law', label: 'Gas Laws' },
    { id: 'Measurement', label: 'Measurements' },
    { id: 'Safety', label: 'Safety' }
];

export const NAV_TABS = [
    { id: 'explorer', label: 'Concept Explorer' },
    { id: 'fuel-table', label: 'Fuel Properties' },
    { id: 'strategy', label: 'Considerations' },
    { id: 'action-plan', label: 'Action Plan' },
    { id: 'furnace-diagram', label: 'Furnace Diagram' }
];

export const FUEL_SUMMARY_CARDS = [
    {
        title: 'Primary Fuel',
        name: 'Natural Gas',
        description: 'Methane-based (CH₄), S.G. ~0.60',
        color: COLORS.ACCENT
    },
    {
        title: 'Secondary Fuel',
        name: 'Propane (LPG)',
        description: 'C₃H₈, S.G. ~1.52 (Heavier than air)',
        color: COLORS.SECONDARY
    },
    {
        title: 'Tertiary Fuel',
        name: 'Butane',
        description: 'C₄H₁₀, S.G. ~2.00 (Portable fuel)',
        color: COLORS.PRIMARY
    }
];

export const CHART_CONFIG = {
    composition: {
        labels: ['Methane (CH₄)', 'Other Hydrocarbons (C₂H₆+)', 'Non-Combustible (N₂, CO₂)'],
        data: [90, 7, 3],
        colors: [COLORS.ACCENT, COLORS.SECONDARY, COLORS.NEUTRAL]
    }
};
