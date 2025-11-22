// Data model for all concepts
// Single Responsibility: Data storage and structure

import { ConceptValidator } from '../utils/validator.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export const conceptsData = [
    // FUEL TYPES
    {
        id: 'natgas',
        name: 'Natural Gas (CH₄)',
        tier: 'Fuel',
        type: 'Hydrocarbon Fuel',
        focus: 'Primary Fuel Source',
        admin: 'Utility',
        benefit: '~1,000 BTU/ft³',
        description: 'A hydrocarbon fuel composed mainly of Methane (CH₄). S.G. ~0.6, making it lighter than air.'
    },
    {
        id: 'propane',
        name: 'Propane (C₃H₈)',
        tier: 'Fuel',
        type: 'Hydrocarbon Fuel',
        focus: 'Secondary Fuel',
        admin: 'Supplier',
        benefit: '~2,520 BTU/ft³',
        description: 'A hydrocarbon fuel (C₃H₈) stored as liquid under pressure. S.G. ~1.52, heavier than air and will sink.'
    },
    {
        id: 'butane',
        name: 'Butane (C₄H₁₀)',
        tier: 'Fuel',
        type: 'Hydrocarbon Fuel',
        focus: 'Portable Fuel',
        admin: 'Supplier',
        benefit: '~3,260 BTU/ft³',
        description: 'A hydrocarbon fuel (C₄H₁₀) used in lighters and camping stoves. S.G. ~2.0, significantly heavier than air.'
    },
    {
        id: 'hydrocarbon',
        name: 'Hydrocarbon (CₓHₙ)',
        tier: 'Fuel',
        type: 'Chemical Class',
        focus: 'Fuel Composition',
        admin: 'Chemistry',
        benefit: 'Releases energy on combustion',
        description: 'Chemical compounds made only of hydrogen and carbon atoms. Primary components of all fossil fuels.'
    },
    // SAFETY
    {
        id: 'mercaptan',
        name: 'Mercaptan (C₂H₅SH)',
        tier: 'Safety',
        type: 'Safety Additive',
        focus: 'Leak Detection',
        admin: 'Gas Supplier',
        benefit: 'Distinct "rotten egg" smell',
        description: 'A sulfur-based compound added to odorless fuels (NG, Propane) to make them detectable by smell for safety.'
    },
    {
        id: 'co',
        name: 'Carbon Monoxide (CO)',
        tier: 'Safety',
        type: 'Byproduct of Combustion',
        focus: 'Deadly Poison',
        admin: 'CSA B149.1',
        benefit: 'Max 400 ppm (Air-Free)',
        description: 'A colorless, odorless, deadly gas produced by incomplete combustion. Any reading >100 ppm is serious.'
    },
    // MEASUREMENT
    {
        id: 'psig',
        name: 'PSIG (Gauge Pressure)',
        tier: 'Measurement',
        type: 'Unit of Pressure',
        focus: 'High Pressure Systems',
        admin: 'Engineering',
        benefit: '1 PSI ≈ 27.7" W.C.',
        description: 'Pound-force per Square Inch Gauge. Used for high pressure (e.g., street mains, propane tanks).'
    },
    {
        id: 'wc',
        name: 'Inches of Water Column ("W.C.)',
        tier: 'Measurement',
        type: 'Unit of Pressure',
        focus: 'Low Pressure Systems',
        admin: 'Engineering',
        benefit: '1 PSI ≈ 27.7" W.C.',
        description: 'A very small unit of pressure used for low-pressure gas systems, such as appliance manifolds.'
    },
    {
        id: 'btu',
        name: 'BTU (British Thermal Unit)',
        tier: 'Measurement',
        type: 'Unit of Energy',
        focus: 'Quantifying Heat',
        admin: 'Physics',
        benefit: '1 BTU = Energy to heat 1 lb H₂O by 1°F',
        description: 'The base unit of heat energy. Used to rate the input and output of appliances.'
    },
    {
        id: 'heatcontent',
        name: 'Heat Content (Calorific Value)',
        tier: 'Measurement',
        type: 'Fuel Property',
        focus: 'Energy Density',
        admin: 'Chemistry',
        benefit: 'NG: 1,000 BTU/ft³ | Propane: 2,520 BTU/ft³ | Butane: 3,260 BTU/ft³',
        description: 'The total amount of thermal energy released during complete combustion of a specific quantity of fuel.'
    },
    // GAS LAWS
    {
        id: 'spg',
        name: 'Specific Gravity (Gas)',
        tier: 'Law',
        type: 'Physical Property',
        focus: 'Gas Behavior',
        admin: 'Physics',
        benefit: 'Air = 1.0',
        description: 'The ratio of the density of a gas to the density of air. If < 1.0 it rises. If > 1.0 it sinks.'
    },
    {
        id: 'boiling',
        name: 'Boiling Point',
        tier: 'Law',
        type: 'Physical Property',
        focus: 'Liquid-to-Gas Transition',
        admin: 'Physics',
        benefit: 'NG: -260°F (-162°C) | Propane: -44°F (-42°C) | Butane: 32°F (0°C)',
        description: 'The specific temperature at which a liquid turns into a gas (vapor).'
    },
    {
        id: 'expansion',
        name: 'Vapour Expansion (Liquid-to-Gas)',
        tier: 'Law',
        type: 'Physical Property',
        focus: 'Storage & Transport',
        admin: 'Physics',
        benefit: 'Propane 1:270 | NG (LNG) 1:600',
        description: 'The ratio of gas volume to liquid volume. e.g., 1 ft³ liquid propane = 270 ft³ of propane gas.'
    },
    {
        id: 'boyles',
        name: 'Boyle\'s Law',
        tier: 'Law',
        type: 'Gas Law',
        focus: 'Pressure-Volume Relationship',
        admin: 'Physics',
        benefit: 'P₁V₁ = P₂V₂',
        description: 'At constant temperature, a gas\'s pressure and volume are inversely proportional.'
    },
    {
        id: 'charles',
        name: 'Charles\'s Law',
        tier: 'Law',
        type: 'Gas Law',
        focus: 'Volume-Temp Relationship',
        admin: 'Physics',
        benefit: 'V₁/T₁ = V₂/T₂',
        description: 'At constant pressure, a gas\'s volume and absolute temperature are directly proportional.'
    },
    {
        id: 'combined',
        name: 'Combined Gas Law',
        tier: 'Law',
        type: 'Gas Law',
        focus: 'P-V-T Relationship',
        admin: 'Physics',
        benefit: '(P₁V₁)/T₁ = (P₂V₂)/T₂',
        description: 'Describes the complete relationship between the pressure, volume, and temperature of a gas.'
    },
    // COMBUSTION
    {
        id: 'flammability',
        name: 'Limits of Flammability',
        tier: 'Combustion',
        type: 'Combustion Property',
        focus: 'Safety & Combustion',
        admin: 'CSA Code',
        benefit: 'NG: 4-15% | Propane: 2.1-9.5% | Butane: 1.9-8.5%',
        description: 'The upper (UEL) and lower (LEL) ranges of a gas-in-air mixture that can support combustion.'
    },
    {
        id: 'ignition_temp',
        name: 'Ignition Temperature',
        tier: 'Combustion',
        type: 'Combustion Property',
        focus: 'Ignition Source',
        admin: 'CSA Code',
        benefit: 'NG: 1300°F (700°C) | Propane: 920°F (490°C) | Butane: 900°F (480°C)',
        description: 'The temperature at which a gas-air mixture will self-ignite and continue to burn without an external flame source.'
    },
    {
        id: 'flame_temp',
        name: 'Maximum Flame Temperature',
        tier: 'Combustion',
        type: 'Combustion Property',
        focus: 'Burner Operation',
        admin: 'CSA Code',
        benefit: 'NG, Propane & Butane: ~3600°F (1980°C)',
        description: 'The maximum temperature of a "perfect" flame (stoichiometric combustion) with no excess air.'
    },
    {
        id: 'flame_speed',
        name: 'Flame Speed',
        tier: 'Combustion',
        type: 'Combustion Property',
        focus: 'Burner Design',
        admin: 'CSA Code',
        benefit: 'NG: 12 in/s | Propane: 11 in/s',
        description: 'The speed at which a flame front moves through a gas-air mixture. Burners are designed with gas velocity higher than flame speed to prevent flashback.'
    }
];

// Validate data on load
try {
    ConceptValidator.validateAll(conceptsData);
} catch (error) {
    ErrorHandler.handleError(error, 'conceptsData validation', true);
    Logger.error('Concepts data validation failed', error);
}
