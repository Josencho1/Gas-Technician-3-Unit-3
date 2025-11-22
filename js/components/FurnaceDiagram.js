// Furnace Diagram Component
// Single Responsibility: Render furnace dilution air diagram with SVG

export class FurnaceDiagram {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Renders the complete furnace diagram section
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <h2 class="text-3xl font-bold text-center mb-2">Furnace Dilution Air Diagram</h2>
            <p class="text-center text-gray-600 mb-8">Visualizing airflow, combustion, and dilution in a gas furnace.</p>

            <div class="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#2A363B]">
                <div class="w-full max-w-3xl mx-auto mb-8">
                    ${this.createDiagramSvg()}
                </div>
                ${this.createExplanation()}
            </div>
        `;
    }

    /**
     * Creates the SVG diagram
     * @returns {string} SVG HTML string
     */
    createDiagramSvg() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="100%" height="100%">
                <title>Furnace Dilution Air Diagram</title>
                <desc>Technical schematic of a gas furnace showing airflow paths</desc>

                <defs>
                    ${this.createSvgDefs()}
                </defs>

                <text x="400" y="40" class="label-title">Cutaway of a furnace showing dilution air</text>
                
                ${this.createCasingPaths()}
                ${this.createInternalStructures()}
                ${this.createBlowerAssembly()}
                ${this.createBurnerAssembly()}
                ${this.createDraftHood()}
                ${this.createAirflowPaths()}
                ${this.createLabels()}
            </svg>
        `;
    }

    /**
     * Creates SVG definitions (patterns, markers)
     * @returns {string} SVG defs
     */
    createSvgDefs() {
        return `
            <pattern id="crossHatch" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M0,6 L6,0 M-1,1 L1,-1 M5,7 L7,5" stroke="#888" stroke-width="1" />
            </pattern>
            <marker id="arrow-black" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <path d="M2,2 L10,6 L2,10 L4,6 Z" fill="#000" />
            </marker>
            <marker id="arrow-grey" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <path d="M2,2 L10,6 L2,10 L4,6 Z" fill="#555" />
            </marker>
        `;
    }

    /**
     * Creates casing paths
     * @returns {string} SVG paths for casing
     */
    createCasingPaths() {
        return `
            <path d="M250,200 L500,200 L500,230 L580,230 L580,700 L280,700 L280,230" class="casing" />
            <path d="M280,200 L280,150 L50,150 M280,230 L50,230" class="casing" />
            <path d="M250,550 L50,550 M250,680 L50,680" class="casing" />
            <path d="M460,200 L460,60 M500,200 L500,60" class="casing" />
        `;
    }

    /**
     * Creates internal structures
     * @returns {string} SVG paths for internal walls
     */
    createInternalStructures() {
        return `
            <line x1="280" y1="550" x2="580" y2="550" class="internal-wall" />
            <line x1="460" y1="230" x2="460" y2="550" class="internal-wall" />
            <line x1="460" y1="400" x2="580" y2="400" class="thin-detail" />
            <rect x="250" y="550" width="30" height="150" class="filter-rect" />
            <path d="M300,230 L300,520 L440,520 L440,230" class="internal-wall" stroke-dasharray="2,2" opacity="0.5" />
            <path d="M310,520 L310,250 Q310,210 450,210" class="internal-wall" fill="none" />
        `;
    }

    /**
     * Creates blower assembly
     * @returns {string} SVG group for blower
     */
    createBlowerAssembly() {
        return `
            <g id="blower-assembly" transform="translate(340, 630)">
                <path d="M0,0 Q-40,0 -40,40 Q-40,80 0,80 Q40,80 40,40" class="internal-wall" fill="none" />
                <circle cx="0" cy="40" r="15" class="pulley" />
                <circle cx="160" cy="-20" r="10" class="pulley" />
                <line x1="0" y1="40" x2="160" y2="-20" class="blower-belt" />
            </g>
        `;
    }

    /**
     * Creates burner assembly
     * @returns {string} SVG group for burner
     */
    createBurnerAssembly() {
        return `
            <g id="burner-assembly" transform="translate(330, 480)">
                <rect x="0" y="0" width="90" height="20" class="burner-body" rx="2" />
                <text x="45" y="15" fill="white" font-size="12" text-anchor="middle">Burner</text>
                <path d="M10,0 L15,-15 L20,0 M30,0 L35,-15 L40,0 M50,0 L55,-15 L60,0 M70,0 L75,-15 L80,0" class="flame" />
            </g>

            <g transform="translate(480, 450)">
                <rect x="0" y="0" width="40" height="30" fill="none" stroke="#000" stroke-width="1.5" />
                <circle cx="20" cy="15" r="8" fill="#ddd" stroke="#000" />
                <polyline points="-60,40 0,40 20,40 20,30" fill="none" stroke="#000" stroke-width="2" />
            </g>
        `;
    }

    /**
     * Creates draft hood
     * @returns {string} SVG group for draft hood
     */
    createDraftHood() {
        return `
            <g transform="translate(580, 320)">
                <line x1="0" y1="0" x2="20" y2="10" class="thin-detail" />
                <line x1="0" y1="15" x2="20" y2="25" class="thin-detail" />
                <line x1="0" y1="-10" x2="0" y2="35" stroke="#fff" stroke-width="4" />
            </g>
        `;
    }

    /**
     * Creates airflow paths
     * @returns {string} SVG paths for airflow
     */
    createAirflowPaths() {
        return `
            <path d="M100,600 L240,600" class="flow-air" />
            <path d="M340,580 Q280,530 290,350 Q290,230 200,210" class="flow-air" />
            <path d="M280,180 L100,180" class="flow-air" />
            <path d="M375,460 Q380,300 440,280 Q470,260 480,150" class="flow-exhaust" />
            <path d="M620,330 Q540,340 530,300 Q520,260 490,220" class="flow-intake" />
            <path d="M620,510 L540,510" class="flow-intake" />
        `;
    }

    /**
     * Creates labels
     * @returns {string} SVG text labels
     */
    createLabels() {
        return `
            <text x="180" y="80" class="label-sub">Heated air to rooms</text>
            <line x1="180" y1="90" x2="250" y2="170" class="lead-line" stroke-dasharray="2,2" />
            <text x="150" y="270" class="label-sub">Heat</text>
            <text x="150" y="290" class="label-sub">exchanger</text>
            <text x="150" y="450" class="label-sub">Combustion</text>
            <text x="150" y="470" class="label-sub">products</text>
            <text x="160" y="650" class="label-sub">Cold air</text>
            <text x="160" y="670" class="label-sub">from rooms</text>
            <text x="265" y="780" class="label-sub" text-anchor="middle">Filter</text>
            <text x="340" y="670" class="label-sub">Blower</text>
            <text x="650" y="550" class="label-sub">Combustion air</text>
            <text x="650" y="570" class="label-sub">and excess air</text>
            <text x="620" y="350" class="label-main">DILUTION AIR</text>
            <text x="650" y="270" class="label-sub">Draft hood</text>
        `;
    }

    /**
     * Creates explanation text
     * @returns {string} HTML for explanation
     */
    createExplanation() {
        return `
            <div class="mt-6 text-gray-700">
                <h3 class="font-bold text-lg mb-2">Understanding the Airflow</h3>
                <p class="mb-4">This diagram illustrates the critical airflow paths in a standard natural draft gas furnace:</p>
                <ul class="list-disc list-inside space-y-2">
                    <li><strong>Combustion Air:</strong> Air that mixes directly with the gas at the burner to support the flame.</li>
                    <li><strong>Dilution Air:</strong> Air that enters through the draft hood to cool the hot flue gases and assist in creating a stable draft.</li>
                    <li><strong>Circulating Air:</strong> The household air (cold return) that is heated and distributed to the rooms.</li>
                </ul>
            </div>
        `;
    }
}
