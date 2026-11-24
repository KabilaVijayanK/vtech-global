import type { ProductItem, FaqItem, SpecRow, CategorySlug } from './types';
import { IMG_LIQUID, IMG_POWDER, IMG_WAREHOUSE } from './productsConveyors';

interface MachinerySeed {
  slug: string;
  categorySlug: CategorySlug;
  name: string;
  shortBenefit: string;
  overview: string;
  image: string;
  specs: SpecRow[];
  features: string[];
  customization: string[];
  applications: string[];
  industries: string[];
  compliance: string[];
  leadTime: string;
  related: string[];
}

function buildMachineryFaqs(name: string, categorySlug: CategorySlug): FaqItem[] {
  const complianceNote =
    categorySlug === 'liquid-filling-machinery' || categorySlug === 'powder-packaging-machinery'
      ? 'SS316L wetted contact parts, FDA/USP Class VI elastomers, and GMP clean-in-place manifolds'
      : 'CE EN ISO 13849 safety guarding, UL508A/IEC control panels, and WMS/ERP OPC-UA interfaces';

  return [
    {
      question: `How does V Tech validate accuracy and speed on ${name} before export?`,
      answer: `Every ${name} completes a documented 48-hour Factory Acceptance Test (FAT) at our Chennai facility using customer-supplied or matched sample containers/materials, measuring volumetric/gravimetric tolerances across 100+ consecutive cycles under live or video witness.`,
    },
    {
      question: `What sanitary, hazardous-area, or safety standards are supported?`,
      answer: `Standard machines include ${complianceNote}. Optional ATEX Zone 1/2 explosion-proof execution, cGMP 21 CFR Part 11 audit-trail HMI logging, and third-party SGS/TUV certification are available.`,
    },
    {
      question: `How quick is format changeover across multiple container or SKU sizes?`,
      answer: `Servo recipe parameters store 50–100 SKUs in the Siemens or Allen-Bradley HMI. Mechanical guide rails and starwheels feature tool-less quick-release clamps and digital position counters for 10–20 minute changeovers.`,
    },
    {
      question: `What electrical, pneumatic, and utility requirements apply for USA/EU/MENA plants?`,
      answer: `We configure control cabinets natively for 400V/3-Ph/50Hz (EU, MENA, APAC, Africa) or 480V/3-Ph/60Hz (North America), with Festo or SMC pneumatic assemblies in metric or NPT threads.`,
    },
    {
      question: `What installation, commissioning, and spare parts support do international buyers receive?`,
      answer: `Each shipment includes a 2-year recommended wear-parts kit, complete EPLAN electrical schematics, and remote VPN/TeamViewer PLC troubleshooting. V Tech engineers travel globally for on-site commissioning and operator training.`,
    },
  ];
}

const MACHINERY_SEEDS: MachinerySeed[] = [
  // LIQUID FILLING MACHINERY (7)
  {
    slug: 'servo-piston-liquid-fillers',
    categorySlug: 'liquid-filling-machinery',
    name: 'Servo Piston Liquid Fillers',
    shortBenefit: '±0.25% volumetric precision for thin to high-viscosity liquids (50 ml to 5 L).',
    overview:
      'Engineered with independent brushless servo-driven dosing cylinders, V Tech Servo Piston Fillers eliminate pneumatic stroke drift and handle viscous creams, edible oils, lubricants, sauces, and honey with bottom-up anti-foam nozzle profiling.',
    image: IMG_LIQUID,
    specs: [
      { parameter: 'Nozzle Heads', metric: '2 / 4 / 6 / 8 / 12 Heads', imperial: '2 / 4 / 6 / 8 / 12 Heads' },
      { parameter: 'Fill Volume Range', metric: '50 – 5,000 ml', imperial: '1.7 – 169 fl oz' },
      { parameter: 'Filling Accuracy', metric: '±0.25% by volume', imperial: '±0.25% by volume' },
      { parameter: 'Output Speed', metric: '20 – 120 BPM', imperial: '20 – 120 BPM' },
      { parameter: 'Viscosity Range', metric: '1 – 50,000 cP', imperial: '1 – 50,000 cP' },
      { parameter: 'Power & Air', metric: '3.5 – 6.5 kW, 6 bar', imperial: '4.7 – 8.7 HP, 87 PSI' },
    ],
    features: [
      'Touchscreen HMI stroke & speed profiling per SKU without mechanical cam adjustment',
      'Diving pneumatic shut-off nozzles with vacuum suck-back prevent tailing and drips',
      'Jacketed heated hopper & agitator options for waxes, ghee, and pastes',
      'No-bottle / no-fill interlocking and automatic drip tray under nozzles',
    ],
    customization: [
      'CIP/SIP automatic wash loop with sanitary tri-clamp manifold',
      'ATEX Zone 1/2 explosion-proof servos for flammable thinners & aerosols',
      'Corrosive-grade PVDF/Hastelloy cylinder liners for acids & bleach',
    ],
    applications: ['Engine oils & gear lubricants', 'Sauces, honey, jams & edible oils', 'Shampoos, lotions & liquid detergents', 'Paints, resins & agro-chemicals'],
    industries: ['Food & Beverage', 'Chemicals & Lubricants', 'FMCG & Personal Care', 'Pharmaceuticals & Nutraceuticals'],
    compliance: ['ISO 9001:2015', 'CE Ready', 'FDA SS316L Wetted Parts', 'ATEX Zone 1 Option'],
    leadTime: '6–8 weeks FOB Chennai',
    related: ['automatic-capping-machines', 'induction-sealers-sticker-labelers', 'slat-chain-conveyors'],
  },
  {
    slug: 'flow-meter-liquid-fillers',
    categorySlug: 'liquid-filling-machinery',
    name: 'Flow-Meter Liquid Fillers',
    shortBenefit: 'Hygienic mass or electromagnetic flow-meter dosing with zero moving seals.',
    overview:
      'Utilizing Endress+Hauser electromagnetic or Coriolis mass flow meters, V Tech Flow-Meter Fillers deliver ultra-clean, contactless metering ideal for dairy, pharmaceuticals, agrochemicals, and foamy industrial cleaners.',
    image: IMG_LIQUID,
    specs: [
      { parameter: 'Filling Heads', metric: '4 / 6 / 8 / 12 / 16 Heads', imperial: '4 / 6 / 8 / 12 / 16 Heads' },
      { parameter: 'Fill Range', metric: '100 ml – 25 L', imperial: '3.4 fl oz – 6.6 US Gal' },
      { parameter: 'Accuracy', metric: '±0.15% – ±0.30%', imperial: '±0.15% – ±0.30%' },
      { parameter: 'Line Speed', metric: '30 – 150 BPM', imperial: '30 – 150 BPM' },
      { parameter: 'Conductivity (Magflow)', metric: '≥ 5 µS/cm (Coriolis: any)', imperial: '≥ 5 µS/cm (Coriolis: any)' },
    ],
    features: [
      'Zero piston seals or wear parts in the product path — dramatic reduction in maintenance',
      'Full 1-touch CIP/SIP thermal sanitization up to 130°C (266°F)',
      'Instant volume changeover directly from HMI recipe library',
      'Individual per-head flow calibration and over/under volume alarm',
    ],
    customization: [
      'Coriolis mass flow sensors for non-conductive oils and solvents',
      'Laminar airflow HEPA hood for sterile pharmaceutical syrups',
      'Pressurized nitrogen blanket manifold on supply buffer tank',
    ],
    applications: ['Milk, juices & liquid dairy', 'Pharmaceutical syrups & antiseptics', 'Liquid fertilizers & herbicides', 'Edible oils & specialty solvents'],
    industries: ['Pharmaceuticals & Nutraceuticals', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['cGMP / 21 CFR Part 11 Ready', 'CE Certified Design', 'EHEDG Sanitary Piping'],
    leadTime: '7–9 weeks FOB Chennai',
    related: ['servo-piston-liquid-fillers', 'bottle-unscramblers-air-rinsers', 'liquid-filling-packaging-lines'],
  },
  {
    slug: 'gravity-overflow-liquid-fillers',
    categorySlug: 'liquid-filling-machinery',
    name: 'Gravity & Overflow Liquid Fillers',
    shortBenefit: 'Uniform cosmetic fill-level across transparent bottles with foam-recirculation.',
    overview:
      'Designed specifically for clear PET and glass bottles where identical visual fill height matters on retail shelves, as well as high-speed thin foamy liquids like glass cleaners, bottled water, and light beverages.',
    image: IMG_LIQUID,
    specs: [
      { parameter: 'Nozzle Configuration', metric: '6 / 8 / 12 / 16 Heads', imperial: '6 / 8 / 12 / 16 Heads' },
      { parameter: 'Container Volume', metric: '100 – 5,000 ml', imperial: '3.4 – 169 fl oz' },
      { parameter: 'Output Capacity', metric: '40 – 140 BPM', imperial: '40 – 140 BPM' },
      { parameter: 'Fill Level Tolerance', metric: '±1.0 mm consistent height', imperial: '±0.04 in consistent height' },
      { parameter: 'Product Tank', metric: '150 L SS316L w/ float level', imperial: '40 US Gal SS316L' },
    ],
    features: [
      'Overflow return manifold continuously recirculates excess foam back to holding tank',
      'Spring-loaded bottle neck centering seals accommodate slight glass/PET variations',
      'Rapid pneumatic tool-free height adjustment for different bottle heights',
      'Economical low-maintenance valving for aqueous and low-viscosity liquids',
    ],
    customization: [
      'PVDF/PP acid-resistant piping for corrosive toilet/drain cleaners',
      'Vacuum-assist module for thicker lotions and syrups',
      'Integrated neck-orientation guides for trigger-spray bottles',
    ],
    applications: ['Bottled water, vinegar & juices', 'Surface & glass cleaners', 'Alcohol-based sanitizers & colognes', 'Windshield washer fluids'],
    industries: ['FMCG & Personal Care', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE Ready', 'FDA Food Grade'],
    leadTime: '5–7 weeks FOB Chennai',
    related: ['flow-meter-liquid-fillers', 'automatic-capping-machines', 'slat-chain-conveyors'],
  },
  {
    slug: 'bulk-drum-ibc-weighmetric-fillers',
    categorySlug: 'liquid-filling-machinery',
    name: 'Bulk Drum & IBC Weighmetric Fillers',
    shortBenefit: 'ATEX-ready gross/net load-cell filling for 20 L pails, 200 L drums & 1,000 L IBCs.',
    overview:
      'Purpose-built for chemical, petrochemical, edible oil, and paint plants filling palletized drums and IBC totes. Features two-stage coarse/fine dosing valves, automatic bung-hole alignment, and intrinsically safe load cells.',
    image: IMG_LIQUID,
    specs: [
      { parameter: 'Container Range', metric: '20 L Pail / 200 L Drum / 1,000 L IBC', imperial: '5 Gal Pail / 55 Gal Drum / 275 Gal Tote' },
      { parameter: 'Weighing Capacity', metric: 'Up to 1,500 kg (0.1 kg res.)', imperial: 'Up to 3,300 lb (0.2 lb res.)' },
      { parameter: 'Throughput (200 L)', metric: '35 – 60 drums/hr (single head)', imperial: '35 – 60 drums/hr' },
      { parameter: 'Accuracy', metric: '±0.05% – ±0.1% FS (OIML)', imperial: '±0.05% – ±0.1% FS' },
      { parameter: 'Hazardous Rating', metric: 'ATEX Zone 1 / IECEx / Ex-d', imperial: 'Class I Div 1 / ATEX Zone 1' },
    ],
    features: [
      'Automatic tare weight capture and two-speed splash-free sub-surface lance',
      'Integrated heavy-duty CDLR roller or pallet chain weighing deck',
      'Fume extraction hood around filling lance with grounding interlock clamp',
      'Automatic drip-cup swings under nozzle immediately on valve closure',
    ],
    customization: [
      'Multi-pallet 4-drum automated bung indexing without moving pallet',
      'Nitrogen purge & automated cap/bung crimping station',
      'Batch ticket thermal label printing & ERP MES logging',
    ],
    applications: ['200 L chemical & solvent drums', '1,000 L IBC intermediate bulk totes', '20 L industrial paint & resin pails', 'Bulk edible oil export drums'],
    industries: ['Chemicals & Lubricants', 'Food & Beverage', 'Logistics & E-Commerce'],
    compliance: ['ATEX Zone 1/2 Ready', 'OIML R76 Load Cells', 'CE Machinery Directive'],
    leadTime: '6–9 weeks FOB Chennai',
    related: ['heavy-duty-pallet-chain-conveyors', 'powerised-turntable-conveyors', 'bulk-chemical-drum-handling'],
  },
  {
    slug: 'bottle-unscramblers-air-rinsers',
    categorySlug: 'liquid-filling-machinery',
    name: 'Bottle Unscramblers & Air Rinsers',
    shortBenefit: 'Automated bulk-to-single-file bottle orientation and ionized air rinsing up to 180 BPM.',
    overview:
      'Eliminate manual bottle loading labor at the head of your packaging line. Our rotary centrifugal unscramblers feed irregular or round plastic bottles upright onto slat conveyors, paired with inverted ionized-air or water rinsers.',
    image: IMG_LIQUID,
    specs: [
      { parameter: 'Container Range', metric: '30 ml – 5,000 ml (HDPE/PET)', imperial: '1 fl oz – 1.3 US Gal' },
      { parameter: 'Sorting Speed', metric: '40 – 180 BPM', imperial: '40 – 180 BPM' },
      { parameter: 'Bulk Hopper Volume', metric: '600 – 1,500 Liters', imperial: '21 – 53 ft³' },
      { parameter: 'Air Rinse Filtration', metric: '0.2 µm sterile / ionized air', imperial: '0.2 µm sterile / ionized air' },
      { parameter: 'Power Supply', metric: '2.5 kW, 400V/480V', imperial: '3.4 HP, 480V/60Hz' },
    ],
    features: [
      'Gentle elevator belt + rotary sorting pockets prevent bottle scuffing',
      'In-line bottle inversion gripper with high-velocity ionized air & vacuum extraction',
      'Auto-start/stop demand sensor linked to downstream filler conveyor',
      'Quick-change pocket inserts for 5-minute round-to-square bottle transitions',
    ],
    customization: [
      'Recirculating purified water or product rinser option',
      'Rejected fallen-bottle air blow-off back into bulk hopper',
      'SS316L cleanroom pharmaceutical GMP execution',
    ],
    applications: ['Pharma tablet & syrup bottles', 'Cosmetic & shampoo HDPE containers', 'Agrochemical & lube oil bottles', 'Food condiment & sauce bottles'],
    industries: ['Pharmaceuticals & Nutraceuticals', 'FMCG & Personal Care', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE Ready', 'GMP Cleanroom Option'],
    leadTime: '6–8 weeks FOB Chennai',
    related: ['servo-piston-liquid-fillers', 'automatic-capping-machines', 'slat-chain-conveyors'],
  },
  {
    slug: 'automatic-capping-machines',
    categorySlug: 'liquid-filling-machinery',
    name: 'Automatic Capping Machines',
    shortBenefit: 'Servo-torque rotary, inline spindle, and ROPP cappers with cap-presence inspection.',
    overview:
      'Ensure leak-proof export transit integrity across screw caps, child-resistant closures, flip-tops, trigger pumps, and aluminum ROPP pilfer-proof caps using precision magnetic or servo-controlled torque heads.',
    image: IMG_LIQUID,
    specs: [
      { parameter: 'Capping Formats', metric: 'Screw / ROPP / Pump / Press-On', imperial: 'Screw / ROPP / Pump / Press-On' },
      { parameter: 'Cap Diameter Range', metric: '15 – 110 mm', imperial: '0.6 – 4.3 in' },
      { parameter: 'Speed Range', metric: '30 – 160 BPM', imperial: '30 – 160 BPM' },
      { parameter: 'Torque Control', metric: '0.5 – 15 Nm (Servo / Mag-Clutch)', imperial: '4.4 – 133 in-lb' },
      { parameter: 'Cap Feeder', metric: 'Centrifugal / Vibratory / Elevator', imperial: 'Centrifugal / Vibratory / Elevator' },
    ],
    features: [
      'Servo pick-and-place capper option for trigger sprayers and long dip-tube pumps',
      'Zero-scuff pneumatic bottle neck/body gripping belts',
      'Vision or sensor check for skewed cap, missing foil, and auto-reject',
      'Stainless steel cap chute with low-level hopper alarm',
    ],
    customization: [
      'Monoblock integrated filler-capper chassis for compact sterile rooms',
      'Nitrogen dosing injection prior to cap sealing',
      'Torque-data logging per bottle for pharma batch compliance',
    ],
    applications: ['Trigger spray & lotion pump bottles', 'CRC pharma & nutraceutical jars', 'Edible oil & beverage tamper-evident caps', 'Glass wine/spirit & syrup ROPP caps'],
    industries: ['FMCG & Personal Care', 'Pharmaceuticals & Nutraceuticals', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE Ready', 'cGMP SS304/316L'],
    leadTime: '5–7 weeks FOB Chennai',
    related: ['induction-sealers-sticker-labelers', 'servo-piston-liquid-fillers', 'flow-meter-liquid-fillers'],
  },
  {
    slug: 'induction-sealers-sticker-labelers',
    categorySlug: 'liquid-filling-machinery',
    name: 'Induction Sealers & Sticker Labelers',
    shortBenefit: 'Water-free induction foil sealing and high-speed wrap-around/front-back labeling.',
    overview:
      'Complete primary container finishing with air-cooled high-frequency induction cap sealers for tamper-evident leak protection and stepper/servo pressure-sensitive labelers featuring +/- 0.5 mm placement repeatability.',
    image: IMG_LIQUID,
    specs: [
      { parameter: 'Labeling Speed', metric: 'Up to 180 containers/min', imperial: 'Up to 180 containers/min' },
      { parameter: 'Placement Accuracy', metric: '±0.5 mm', imperial: '±0.02 in' },
      { parameter: 'Induction Foil Diameter', metric: '15 – 120 mm', imperial: '0.6 – 4.7 in' },
      { parameter: 'Sealer Output Power', metric: '2.0 – 4.0 kW Air-Cooled', imperial: '2.0 – 4.0 kW Air-Cooled' },
      { parameter: 'Label Roll OD / Core', metric: '350 mm OD / 76 mm Core', imperial: '13.8 in OD / 3 in Core' },
    ],
    features: [
      'Air-cooled IGBT induction technology requires no external water chiller',
      'Missing-foil & cocked-cap ultrasonic rejection built into sealer bridge',
      'Front, back, wrap-around, and top-tamper labeling modes on one chassis',
      'Synchronized TIJ/CIJ batch coding & OCR camera barcode verification',
    ],
    customization: [
      'Rotary indexing labeler for irregular tapered cosmetic flasks',
      'Shrink-sleeve applicator & steam tunnel integration',
      'Dual-reel non-stop splicing for continuous 24/7 beverage runs',
    ],
    applications: ['Export lubricant & chemical HDPE jugs', 'Pharmaceutical & supplement bottles', 'Cosmetic oval & flat bottles', 'Food sauce & pickle jars'],
    industries: ['FMCG & Personal Care', 'Pharmaceuticals & Nutraceuticals', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE EMC/LVD Compliant', '21 CFR Part 11 Vision Option'],
    leadTime: '4–6 weeks FOB Chennai',
    related: ['automatic-capping-machines', 'case-erectors-packers-sealers', 'slat-chain-conveyors'],
  },

  // POWDER PACKAGING MACHINERY (5)
  {
    slug: 'servo-auger-rigid-fillers',
    categorySlug: 'powder-packaging-machinery',
    name: 'Servo Auger Rigid Fillers',
    shortBenefit: 'High-accuracy powder dosing into jars, tins, and bottles (5 g to 5 kg).',
    overview:
      'Designed for rigid cans, jars, and HDPE tubs containing infant nutrition, protein powders, spices, instant coffee, and pharma dry syrups. Brushless servo motors control auger pitch revolutions down to 0.1 degree.',
    image: IMG_POWDER,
    specs: [
      { parameter: 'Dosing Weight Range', metric: '5 g – 5,000 g', imperial: '0.18 oz – 11 lb' },
      { parameter: 'Accuracy', metric: '±0.5% – ±1.0%', imperial: '±0.5% – ±1.0%' },
      { parameter: 'Output Speed', metric: '25 – 90 containers/min (Single/Dual)', imperial: '25 – 90 containers/min' },
      { parameter: 'Hopper Volume', metric: '50 / 75 / 120 Liters (Split)', imperial: '13 / 20 / 32 US Gal' },
      { parameter: 'Contact Material', metric: 'SS316L Mirror Ra ≤ 0.6 µm', imperial: 'SS316L Mirror Ra ≤ 24 µin' },
    ],
    features: [
      'Horizontally split quick-open hopper cleans thoroughly in under 10 minutes',
      'Inline checkweigher feedback loop dynamically adjusts auger revolutions',
      'Container lift-and-vibrate fill station prevents powder bridging and dust plumes',
      'Dust-extraction collar surrounding nozzle with vacuum collector interface',
    ],
    customization: [
      'Dual-head high-speed inline or rotary turret filler for tin cans',
      'Vacuum nitrogen seamers for infant formula & coffee tins',
      'Integrated desiccant/scoop dropper station',
    ],
    applications: ['Protein & whey supplement tubs', 'Spices, masala & milk powder jars', 'Pharmaceutical dry syrup bottles', 'Agrochemical wettable powders'],
    industries: ['Pharmaceuticals & Nutraceuticals', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'cGMP SS316L', 'CE Ready'],
    leadTime: '5–7 weeks FOB Chennai',
    related: ['screw-conveyors-powder-feeders', 'automatic-capping-machines', 'induction-sealers-sticker-labelers'],
  },
  {
    slug: 'collar-type-vffs-pouch-machines',
    categorySlug: 'powder-packaging-machinery',
    name: 'Collar-Type VFFS Pouch Machines',
    shortBenefit: 'Continuous & intermittent vertical form-fill-seal up to 110 pouches/min.',
    overview:
      'Built for high-output retail and export pouches (pillow, gusseted, block-bottom, and D-cut) with interchangeable auger, cup, or multi-head weigher dosing heads.',
    image: IMG_POWDER,
    specs: [
      { parameter: 'Pouch Width × Length', metric: '60–320 × 80–450 mm', imperial: '2.4–12.6 × 3.1–17.7 in' },
      { parameter: 'Max Output Speed', metric: '40 – 110 pouches/min', imperial: '40 – 110 pouches/min' },
      { parameter: 'Fill Weight Range', metric: '20 g – 5,000 g', imperial: '0.7 oz – 11 lb' },
      { parameter: 'Film Compatibility', metric: 'PET/PE, BOPP, Foil Laminates', imperial: 'PET/PE, BOPP, Foil Laminates' },
      { parameter: 'Power & Air', metric: '4.5 kW, 6 bar (350 L/min)', imperial: '6.0 HP, 87 PSI (12.4 CFM)' },
    ],
    features: [
      'Twin servo film-pull belts and servo horizontal sealing jaws for crisp seals',
      'Optical print-mark registration and automatic pneumatic web tracking',
      'PID dual-zone temperature controllers for zero laminate burn-through',
      'Modified Atmosphere Packaging (MAP) nitrogen flushing nozzle standard',
    ],
    customization: [
      '10-head / 14-head weigher gantry for snacks, pulses & frozen foods',
      'Servo auger dosing head for ultra-fine flours, spices & milk powder',
      'Static eliminator bars, Euro-slot punch, and vacuum dust hood',
    ],
    applications: ['Spices, flour, sugar & pulses', 'Extruded snacks & namkeen', 'Detergent & washing powders', 'Coffee beans & tea granules'],
    industries: ['Food & Beverage', 'FMCG & Personal Care', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE Machinery Directive', 'FDA Contact SS304/316'],
    leadTime: '5–8 weeks FOB Chennai',
    related: ['multi-lane-sachet-stickpack-lines', 'z-type-bucket-elevators', 'screw-conveyors-powder-feeders'],
  },
  {
    slug: 'multi-lane-sachet-stickpack-lines',
    categorySlug: 'powder-packaging-machinery',
    name: 'Multi-Lane Sachet & Stickpack Lines',
    shortBenefit: '2 to 10 lane synchronized stickpack & 4-side seal sachet output up to 500 ppm.',
    overview:
      'High-speed single-serve packaging lines for pharma ORS, instant coffee, probiotic blends, sugar, honey, and liquid condiments. Servo film slitting, multi-auger or micro-piston dosing, and integrated lane-counting stackers.',
    image: IMG_POWDER,
    specs: [
      { parameter: 'Lane Configurations', metric: '2 / 4 / 6 / 8 / 10 Lanes', imperial: '2 / 4 / 6 / 8 / 10 Lanes' },
      { parameter: 'Aggregate Output', metric: 'Up to 500 sticks/min', imperial: 'Up to 500 sticks/min' },
      { parameter: 'Dosing Range', metric: '1 g – 50 g / 2 – 30 ml', imperial: '0.03 – 1.76 oz / 0.07 – 1 fl oz' },
      { parameter: 'Stick Width', metric: '17 – 50 mm', imperial: '0.67 – 1.97 in' },
      { parameter: 'Film Web Width', metric: 'Up to 800 mm', imperial: 'Up to 31.5 in' },
    ],
    features: [
      'Individual servo auger drive per lane enables independent weight calibration',
      'Precision rotary slitting knives with automatic web edge tension control',
      'Laser or mechanical easy-tear notch and inline multi-lane thermal batch printer',
      'Automated pick-and-place cartoning conveyor discharge option',
    ],
    customization: [
      'Interchangeable auger/liquid-pump dosing decks on a shared frame',
      '21 CFR Part 11 Pharma audit trail & rejection of empty/split lanes',
      'Dust-tight negative-pressure sealing area for active pharma powders',
    ],
    applications: ['Pharma ORS & effervescent powders', '3-in-1 coffee & sugar sticks', 'Single-serve shampoo & sauce sachets', 'Nutraceutical electrolyte sticks'],
    industries: ['Pharmaceuticals & Nutraceuticals', 'Food & Beverage', 'FMCG & Personal Care'],
    compliance: ['cGMP Cleanroom Ready', 'CE Certified Design', 'ISO 9001:2015'],
    leadTime: '8–10 weeks FOB Chennai',
    related: ['collar-type-vffs-pouch-machines', 'servo-auger-rigid-fillers', 'case-erectors-packers-sealers'],
  },
  {
    slug: 'bulk-bag-sack-weighing-fillers',
    categorySlug: 'powder-packaging-machinery',
    name: 'Bulk Bag & Sack Weighing Fillers',
    shortBenefit: 'OIML-accurate net/gross weighing for 10–50 kg sacks and 500–2,000 kg FIBCs.',
    overview:
      'Heavy-duty bagging scales for agricultural grains, plastic resin pellets, animal feed, cementitious mortars, fertilizers, and bulk chemical powders into open-mouth PP/kraft bags or FIBC jumbo big bags.',
    image: IMG_POWDER,
    specs: [
      { parameter: 'Sack / FIBC Range', metric: '10–50 kg sacks / 500–2,000 kg FIBC', imperial: '22–110 lb sacks / 1,100–4,400 lb FIBC' },
      { parameter: 'Speed (25 kg Bags)', metric: '400 – 900 bags/hr', imperial: '400 – 900 bags/hr' },
      { parameter: 'Weighing Accuracy', metric: '±20 g (25 kg) / ±0.1% (FIBC)', imperial: '±0.04 lb (55 lb) / ±0.1% (FIBC)' },
      { parameter: 'Feed Mechanism', metric: 'Gravity / Belt / Dual-Auger', imperial: 'Gravity / Belt / Dual-Auger' },
      { parameter: 'Compressed Air', metric: '6 bar, 250 L/min', imperial: '87 PSI, 8.8 CFM' },
    ],
    features: [
      'Pneumatic inflatable neck-clamp seal captures dust during high-speed drop',
      'Dual-stage coarse and fine dribble feed delivers Legal-for-Trade accuracy',
      'FIBC frame includes bag-inflation blower and base vibration densification',
      'Automatic bag-loop release hooks for seamless forklift or pallet conveyor discharge',
    ],
    customization: [
      'Automatic empty-bag placer & robotic palletizing integration',
      'SS316L wetted parts for food starches, sugar & dairy bulk totes',
      'ATEX dust-hazard compliant load cells and junction boxes',
    ],
    applications: ['25 kg & 50 kg rice, flour & sugar sacks', '500–1,500 kg polymer & chemical FIBCs', 'Tile adhesive, dry mortar & mineral bags', 'Fertilizer & animal feed bagging'],
    industries: ['Chemicals & Lubricants', 'Food & Beverage', 'Logistics & E-Commerce'],
    compliance: ['OIML R61 / NTEP Load Cells', 'CE Machinery Directive', 'ATEX Dust Zone 21/22 Option'],
    leadTime: '6–8 weeks FOB Chennai',
    related: ['bag-closing-stitching-conveyors', 'robotic-gantry-palletizers', 'screw-conveyors-powder-feeders'],
  },
  {
    slug: 'bag-closing-stitching-conveyors',
    categorySlug: 'powder-packaging-machinery',
    name: 'Bag Closing & Stitching Conveyors',
    shortBenefit: 'Synchronized heavy-duty slat/belt lines with automated bag-top folding and sewing/sealing.',
    overview:
      'Receive filled 10–50 kg woven PP, paper, or laminated bags directly from weigh-fillers and feed them upright through automatic infeed folders, industrial Fischbein/Newlong-grade sewing heads, or continuous heat-band sealers.',
    image: IMG_POWDER,
    specs: [
      { parameter: 'Conveyor Length', metric: '3,000 – 6,000 mm', imperial: '10 – 20 ft' },
      { parameter: 'Line Speed', metric: '8 – 16 m/min (Synced)', imperial: '26 – 52 ft/min (Synced)' },
      { parameter: 'Bag Weight Capacity', metric: 'Up to 60 kg per bag', imperial: 'Up to 132 lb per bag' },
      { parameter: 'Pedestal Height Adjust', metric: '600 – 1,500 mm motorized', imperial: '23.6 – 59 in motorized' },
      { parameter: 'Closure Options', metric: 'Crepe-Tape Stitch / Pinch Heat Seal', imperial: 'Crepe-Tape Stitch / Pinch Heat Seal' },
    ],
    features: [
      'Motorized pedestal column adjusts sewing/sealing head height via pushbutton',
      'Photo-eye automatic start/stop with pneumatic thread-chain cutter',
      'Integrated bag-kicker flattener & metal detector checkweigher option',
      'Heavy-duty PVC/rubber cleated belt or steel slat conveyor with side rails',
    ],
    customization: [
      'Inline inkjet bag lot coding prior to palletizing',
      'Dust-free air-knife bag cleaner before barcode printing',
      'Automatic bag turner / flattener feeding robotic palletizer',
    ],
    applications: ['25/50 kg grain, flour & seed lines', 'Fertilizer & resin sack closing', 'Building chemical & dry-mix bagging', 'Export sugar & coffee sack lines'],
    industries: ['Food & Beverage', 'Chemicals & Lubricants', 'Logistics & E-Commerce'],
    compliance: ['ISO 9001:2015', 'CE Ready'],
    leadTime: '3–5 weeks FOB Chennai',
    related: ['bulk-bag-sack-weighing-fillers', 'robotic-gantry-palletizers', 'flat-incline-belt-conveyors'],
  },

  // WAREHOUSE & EOL AUTOMATION (8)
  {
    slug: 'case-erectors-packers-sealers',
    categorySlug: 'warehouse-eol-automation',
    name: 'Case Erectors, Packers & Sealers',
    shortBenefit: 'Automated RSC carton forming, pick-and-place packing, and BOPP/hot-melt sealing.',
    overview:
      'Replace manual carton assembly and taping bottlenecks with integrated end-of-line case handling. Handles RSC corrugated cartons with precision vacuum opening, servo case packing for bottles/pouches, and top-and-bottom taping or Nordson hot-melt glue sealing.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'Carton Size Range (L×W×H)', metric: '200×150×120 to 600×450×450 mm', imperial: '7.9×5.9×4.7 to 23.6×17.7×17.7 in' },
      { parameter: 'Case Erecting Speed', metric: '12 – 25 cases/min', imperial: '12 – 25 cases/min' },
      { parameter: 'Sealing Speed', metric: 'Up to 30 cases/min', imperial: 'Up to 30 cases/min' },
      { parameter: 'Magazine Capacity', metric: '80 – 120 knocked-down cases', imperial: '80 – 120 knocked-down cases' },
      { parameter: 'Closure Method', metric: 'BOPP Tape or Hot-Melt Glue', imperial: 'BOPP Tape or Hot-Melt Glue' },
    ],
    features: [
      'Dual side-drive belts ensure square carton geometry for clean pallet stacking',
      'Low-tape, tape-break, and low-blank magazine sensors with tower light',
      'Hand-crank digital counter adjustment changes case dimensions in 3 minutes',
      'Drop-packer or gantry servo pick-and-place collation integrated on one skid',
    ],
    customization: [
      'Print-and-apply corner-wrap carton barcode labeling',
      'Dynamic checkweigher with pneumatic pusher reject for missing unit detection',
      'SS304 washdown frame for chilled dairy & meat export plants',
    ],
    applications: ['Bottled beverage & oil master cartons', 'Pouch & sachet secondary case packing', 'Pharmaceutical shipper sealing', 'E-commerce multi-SKU carton taping'],
    industries: ['FMCG & Personal Care', 'Food & Beverage', 'Pharmaceuticals & Nutraceuticals', 'Logistics & E-Commerce'],
    compliance: ['ISO 9001:2015', 'CE EN 415 Packaging Safety'],
    leadTime: '5–8 weeks FOB Chennai',
    related: ['robotic-gantry-palletizers', 'pallet-dispensers-wrappers-strappers', 'powered-roller-conveyors'],
  },
  {
    slug: 'robotic-gantry-palletizers',
    categorySlug: 'warehouse-eol-automation',
    name: 'Robotic & Gantry Palletizers',
    shortBenefit: '4-axis articulated and linear gantry palletizing up to 25 cycles/min & 150 kg payload.',
    overview:
      'Automate heavy, repetitive end-of-line pallet building for cases, shrink-packs, 25–50 kg sacks, and pails. Built around ABB/FANUC/KUKA industrial robots or V Tech multi-axis servo gantry units with custom vacuum, fork, or magnetic grippers.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'Payload Capacity', metric: '30 – 180 kg per pick', imperial: '66 – 396 lb per pick' },
      { parameter: 'Cycle Rate', metric: '10 – 25 cycles/min (multi-pick)', imperial: '10 – 25 cycles/min' },
      { parameter: 'Max Stack Height', metric: 'Up to 2,400 mm', imperial: 'Up to 94.5 in' },
      { parameter: 'Pallet Formats', metric: 'Euro / GMA / Custom Export', imperial: '48×40 / 48×32 / Custom' },
      { parameter: 'Safety Enclosure', metric: 'Light curtains + interlocked fencing', imperial: 'Cat 3 PLd light curtains' },
    ],
    features: [
      'On-HMI graphical pattern generator lets operators create new layer maps in minutes',
      'Automatic slip-sheet / tier-sheet placement integrated directly into gripper head',
      'Dual-pallet cell operation enables continuous stacking while forklift removes full pallet',
      'Multi-line simultaneous palletizing (up to 3 SKU infeeds per cell)',
    ],
    customization: [
      'Bag flattening & indexing conveyor for woven 25–50 kg sacks',
      '200 L drum & 20 L pail dual-vacuum/clamp tooling',
      'Cold-store insulated robot dress packs (-25°C)',
    ],
    applications: ['Carton & shrink-tray palletizing', '25 kg / 50 kg bag stacking', 'Pail, jerrycan & drum palletizing', 'Multi-SKU distribution cells'],
    industries: ['Logistics & E-Commerce', 'Food & Beverage', 'Chemicals & Lubricants', 'FMCG & Personal Care'],
    compliance: ['ISO 10218-2 Robot Cell Safety', 'CE / ANSI RIA R15.06', 'ISO 9001:2015'],
    leadTime: '8–12 weeks FOB Chennai',
    related: ['pallet-dispensers-wrappers-strappers', 'case-erectors-packers-sealers', 'heavy-duty-pallet-chain-conveyors'],
  },
  {
    slug: 'pallet-dispensers-wrappers-strappers',
    categorySlug: 'warehouse-eol-automation',
    name: 'Pallet Dispensers, Wrappers & Strappers',
    shortBenefit: 'Automated empty-pallet feeding, 250% pre-stretch wrapping & PET strapping.',
    overview:
      'Stabilize export container loads at up to 45 pallets/hour. Automatically dispenses empty Euro/GMA pallets into palletizers, applies powered pre-stretch film with top-sheet dust covers, and tensions vertical/horizontal PET straps.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'Throughput Capacity', metric: '25 – 45 pallets/hr', imperial: '25 – 45 pallets/hr' },
      { parameter: 'Film Pre-Stretch', metric: 'Up to 250% powered stretch', imperial: 'Up to 250% powered stretch' },
      { parameter: 'Max Pallet Weight', metric: '2,000 kg', imperial: '4,400 lb' },
      { parameter: 'Wrapping Height', metric: 'Up to 2,400 mm', imperial: 'Up to 94.5 in' },
      { parameter: 'Strap Spec (PET/PP)', metric: '12 – 16 mm friction-weld', imperial: '0.5 – 0.63 in friction-weld' },
    ],
    features: [
      'Rotary arm and heavy turntable models; rotary arm handles unstable/light loads',
      '250% powered pre-stretch carriage reduces stretch film consumption by 35–45%',
      'Automatic film clamp, cut, and tail heat-wipe with zero operator touch',
      '15-pallet vertical magazine dispenser with side-lifting fork clamp',
    ],
    customization: [
      'Integrated top-press platen for tall unstable beverage stacks',
      'Waterproof top-sheet film dispenser for outdoor storage',
      'Pallet barcode print-and-apply on two adjacent sides',
    ],
    applications: ['Container export pallet unitization', 'Beverage & glass pallet wrapping', 'Bagged chemical & resin load containment', 'Automated AS/RS inbound staging'],
    industries: ['Logistics & E-Commerce', 'Food & Beverage', 'Chemicals & Lubricants', 'FMCG & Personal Care'],
    compliance: ['ISO 9001:2015', 'CE EN 415-6 Pallet Wrappers'],
    leadTime: '5–8 weeks FOB Chennai',
    related: ['robotic-gantry-palletizers', 'heavy-duty-pallet-chain-conveyors', 'powerised-turntable-conveyors'],
  },
  {
    slug: 'automated-sorting-diverter-conveyors',
    categorySlug: 'warehouse-eol-automation',
    name: 'Automated Sorting & Diverter Conveyors',
    shortBenefit: 'High-speed pop-up wheel, shoe, and pusher sortation up to 4,500 parcels/hr.',
    overview:
      'Route cartons, totes, and polybags dynamically by SKU, carrier route, or shipping bay. Integrates omni-directional barcode/RFID tunnels, dynamic dimensioners, and gentle pop-up roller or swivel-wheel diverters.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'Sortation Rate', metric: '1,200 – 4,500 units/hr', imperial: '1,200 – 4,500 units/hr' },
      { parameter: 'Divert Angle', metric: '30° / 45° / 90°', imperial: '30° / 45° / 90°' },
      { parameter: 'Parcel Weight Range', metric: '0.2 – 50 kg', imperial: '0.44 – 110 lb' },
      { parameter: 'Line Speed', metric: '30 – 90 m/min', imperial: '98 – 295 ft/min' },
      { parameter: 'Scanner Interface', metric: '5-sided barcode / RFID / WMS', imperial: '5-sided barcode / RFID / WMS' },
    ],
    features: [
      '24V DC swivel-wheel and narrow-belt pop-up sorters for gentle parcel handling',
      'Automatic gapper belt creates uniform spacing prior to scan tunnel',
      'Real-time WCS routing logic with chute-full recirculation loop',
      'Low-noise belt & MDR construction (< 68 dBA)',
    ],
    customization: [
      'Integrated Legal-for-Trade DWS (Dimensioning-Weighing-Scanning) bridge',
      'Bi-directional diverters feeding gravity extendables at loading bays',
      'Tote & KLT crate routing for EV assembly kitting',
    ],
    applications: ['3PL & e-commerce parcel hubs', 'Multi-SKU EOL palletizer feeding', 'Retail DC cross-docking', 'Pharmaceutical wholesale order routing'],
    industries: ['Logistics & E-Commerce', 'FMCG & Personal Care', 'Automotive & EV'],
    compliance: ['ISO 9001:2015', 'CE Ready', 'IEC 62061 Safety'],
    leadTime: '7–10 weeks FOB Chennai',
    related: ['powered-roller-conveyors', 'telescopic-flexible-dock-loaders', 'plc-scada-wcs-control-panels'],
  },
  {
    slug: 'agv-amr-material-transfer',
    categorySlug: 'warehouse-eol-automation',
    name: 'AGV & AMR Material Transfer',
    shortBenefit: 'Autonomous LiDAR/QR mobile robots for pallet, rack, and conveyor-top transfers.',
    overview:
      'Bridge production halls and warehouses without fixed floor obstructions. V Tech AGVs and SLAM LiDAR AMRs transport up to 1,500 kg pallets, tugged trolleys, or line-side EV battery racks with fleet traffic management.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'Payload Range', metric: '300 – 1,500 kg', imperial: '660 – 3,300 lb' },
      { parameter: 'Navigation Tech', metric: 'SLAM LiDAR / QR / Magnetic', imperial: 'SLAM LiDAR / QR / Magnetic' },
      { parameter: 'Travel Speed', metric: 'Up to 1.5 m/s (loaded)', imperial: 'Up to 4.9 ft/s (loaded)' },
      { parameter: 'Battery & Charging', metric: 'LiFePO4 Auto-Opportunity Charge', imperial: 'LiFePO4 Auto-Opportunity Charge' },
      { parameter: 'Safety Scanners', metric: '360° dual Safety-LiDAR + bumpers', imperial: '360° dual PLd Safety-LiDAR' },
    ],
    features: [
      'Roller-deck top module docks autonomously to stationary powered conveyors',
      'Fleet management server coordinates 2–30+ vehicles with intersection locking',
      'Opportunity charging stations deliver 8-hour shift continuity in 15-min charges',
      'Zero floor-civil rework required with natural-feature SLAM navigation',
    ],
    customization: [
      'Underride lift-rack AMRs for goods-to-person picking',
      'Heavy tugger AGVs for automotive milk-run trains',
      'Cleanroom Class 10,000 chassis for pharma & electronics',
    ],
    applications: ['EOL wrapper-to-AS/RS pallet shuttle transfer', 'EV battery & motor kitting to assembly lines', 'Packaging film & bottle replenishment', 'Goods-to-person order fulfillment'],
    industries: ['Automotive & EV', 'Logistics & E-Commerce', 'Pharmaceuticals & Nutraceuticals', 'FMCG & Personal Care'],
    compliance: ['ISO 3691-4 Driverless Industrial Trucks', 'CE Safety', 'UN38.3 LiFePO4'],
    leadTime: '8–12 weeks FOB Chennai',
    related: ['asrs-radio-pallet-shuttles', 'powered-roller-conveyors', 'plc-scada-wcs-control-panels'],
  },
  {
    slug: 'asrs-radio-pallet-shuttles',
    categorySlug: 'warehouse-eol-automation',
    name: 'AS/RS & Radio Pallet Shuttles',
    shortBenefit: 'High-density deep-lane FIFO/LIFO shuttle racking & automated stacker cranes.',
    overview:
      'Increase pallet storage density by up to 80% inside existing or greenfield warehouses. Our semi-automated Radio Pallet Shuttles and fully automated 4-way Mother-Child AS/RS cranes eliminate forklift travel inside deep storage lanes.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'Max Pallet Load', metric: '1,500 kg per shuttle', imperial: '3,300 lb per shuttle' },
      { parameter: 'Operating Temperature', metric: '-30°C to +45°C', imperial: '-22°F to +113°F' },
      { parameter: 'Travel Speed (Loaded)', metric: '0.8 – 1.2 m/s', imperial: '2.6 – 3.9 ft/s' },
      { parameter: 'Racking Height', metric: 'Up to 28 m (AS/RS) / 14 m (Shuttle)', imperial: 'Up to 92 ft (AS/RS) / 46 ft (Shuttle)' },
      { parameter: 'Battery Autonomy', metric: '10 – 14 hours per charge', imperial: '10 – 14 hours per charge' },
    ],
    features: [
      'FIFO and LIFO inventory modes with automated pallet counting & compaction',
      'Cold-chain rated LiFePO4 batteries & electronics for -30°C blast freezers',
      'Anti-collision laser sensors, lane-end stops, and manual override recovery',
      'Full WMS integration for real-time bin occupancy and batch traceability',
    ],
    customization: [
      'Turnkey seismic-rated racking steel + shuttle + vertical pallet lift',
      '4-way shuttle grid for ultra-flexible multi-SKU deep storage',
      'Conveyor infeed/outfeed buffer stations with profile/weight check',
    ],
    applications: ['Frozen & chilled food cold storage', 'High-volume beverage & dairy warehouses', 'Chemical & FMCG raw material staging', 'Export container staging buffers'],
    industries: ['Logistics & E-Commerce', 'Food & Beverage', 'Chemicals & Lubricants', 'FMCG & Personal Care'],
    compliance: ['FEM 9.831 / EN 15620 Racking', 'CE Safety', 'ISO 9001:2015'],
    leadTime: '8–14 weeks FOB Chennai',
    related: ['vertical-chain-lifting-conveyors', 'agv-amr-material-transfer', 'plc-scada-wcs-control-panels'],
  },
  {
    slug: 'telescopic-flexible-dock-loaders',
    categorySlug: 'warehouse-eol-automation',
    name: 'Telescopic & Flexible Dock Loaders',
    shortBenefit: 'Cantilevered belt booms extend directly into 20ft/40ft sea containers & trailers.',
    overview:
      'Cut container loading and unloading times by up to 65% while reducing dock labor strain. Cantilevered telescopic belt conveyors project directly inside 20ft/40ft shipping containers and 53ft trailers with zero floor support inside the container.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'Telescopic Extension', metric: '6,000 – 18,000 mm', imperial: '19.7 – 59 ft' },
      { parameter: 'Belt Width', metric: '600 / 800 mm', imperial: '23.6 / 31.5 in' },
      { parameter: 'Max Load Capacity', metric: '50 – 80 kg/m', imperial: '33.6 – 53.7 lb/ft' },
      { parameter: 'Belt Speed', metric: '15 – 40 m/min (Reversible)', imperial: '49 – 131 ft/min (Reversible)' },
      { parameter: 'Ergonomic Tilt', metric: 'Hydraulic up/down nose tilt', imperial: 'Hydraulic up/down nose tilt' },
    ],
    features: [
      'Reversible drive supports both rapid loading and unloading operations',
      'Operator joystick at nose tip controls extension, elevation, and belt run/stop',
      'Safety pressure-sensitive under-boom bumper halts descent on obstacle contact',
      'Integrated dual LED floodlights illuminate dark container interiors',
    ],
    customization: [
      'Side-traversing rail chassis serving 3–4 adjacent dock doors',
      'Integrated carton counter and barcode scan bridge at dock feed',
      'Flexible gravity/powered skate-wheel accordion extensions',
    ],
    applications: ['20ft / 40ft export sea container stuffing', 'E-commerce parcel trailer unloading', '25 kg / 50 kg bagged grain & flour loading', 'Tire and loose carton logistics'],
    industries: ['Logistics & E-Commerce', 'FMCG & Personal Care', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE EN 619', 'ANSI/ASME B20.1'],
    leadTime: '5–7 weeks FOB Chennai',
    related: ['automated-sorting-diverter-conveyors', 'gravity-roller-conveyors', 'powered-roller-conveyors'],
  },
  {
    slug: 'plc-scada-wcs-control-panels',
    categorySlug: 'warehouse-eol-automation',
    name: 'PLC, SCADA & WCS Control Panels',
    shortBenefit: 'CE/UL508A-ready Siemens & Rockwell automation cabinets with OEE & WMS telemetry.',
    overview:
      'Every V Tech machine and turnkey line is unified by custom-engineered electrical automation panels designed in EPLAN P8. We standardize on Siemens S7-1500/1200, Allen-Bradley CompactLogix/ControlLogix, and Ignition/WinCC SCADA.',
    image: IMG_WAREHOUSE,
    specs: [
      { parameter: 'PLC Platforms', metric: 'Siemens S7 / Rockwell / Mitsubishi', imperial: 'Siemens S7 / Rockwell / Mitsubishi' },
      { parameter: 'Enclosure Rating', metric: 'IP54 / IP65 / NEMA 4X SS304', imperial: 'NEMA 12 / NEMA 4X SS304' },
      { parameter: 'Supply Standards', metric: '380–415V 50Hz / 480V 60Hz', imperial: '480V / 208V 3-Ph 60Hz' },
      { parameter: 'Fieldbus Protocols', metric: 'Profinet / EtherNet/IP / OPC-UA', imperial: 'Profinet / EtherNet/IP / OPC-UA' },
      { parameter: 'Safety Rating', metric: 'SIL 2 / PLd Dual-Channel', imperial: 'SIL 2 / PLd Dual-Channel' },
    ],
    features: [
      'Color 10″–15″ HMI dashboards with real-time OEE, fault diagnostics & recipe management',
      'Secure VPN remote support gateway (eWON / Secomea) for rapid troubleshooting',
      'Wire-ferrule numbering, EPLAN schematics, and thermal imaging load test',
      'Seamless REST/OPC-UA/SQL handshake with SAP, Oracle, or custom WMS/MES',
    ],
    customization: [
      'UL508A / cUL listed panel build for North American plant inspections',
      '21 CFR Part 11 pharma audit trail, electronic signatures & batch reports',
      'ATEX purged/pressurized Ex-p panels for hazardous chemical zones',
    ],
    applications: ['Multi-machine turnkey filling line sync', 'Warehouse WCS & conveyor sortation', 'OEE plant performance dashboards', 'Legacy machine PLC retrofits'],
    industries: ['Automotive & EV', 'Logistics & E-Commerce', 'Pharmaceuticals & Nutraceuticals', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['IEC 61439', 'CE LVD & EMC', 'UL508A Option', '21 CFR Part 11 Option'],
    leadTime: '3–6 weeks FOB Chennai',
    related: ['automation-plc-scada-integration', 'automated-sorting-diverter-conveyors', 'agv-amr-material-transfer'],
  },
];

export const MACHINERY_PRODUCTS: ProductItem[] = MACHINERY_SEEDS.map((s) => ({
  slug: s.slug,
  categorySlug: s.categorySlug,
  name: s.name,
  shortBenefit: s.shortBenefit,
  overview: s.overview,
  image: s.image,
  seoTitle: `${s.name} Manufacturer & Exporter India | V Tech Manufacturing`,
  seoDescription: `${s.name} engineered & exported from Chennai, India. ${s.shortBenefit} Dual metric/imperial specs, live video FAT & global spares.`,
  keyFeatures: s.features,
  specs: s.specs,
  customizationOptions: s.customization,
  applications: s.applications,
  industries: s.industries,
  compliance: s.compliance,
  leadTime: s.leadTime,
  faqs: buildMachineryFaqs(s.name, s.categorySlug),
  relatedSlugs: s.related,
}));
