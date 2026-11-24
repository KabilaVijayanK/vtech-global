import type { ProductCategory, ProductItem, FaqItem, SpecRow } from './types';

export const IMG_CONVEYOR = '/src/assets/images/cat_conveyor_systems_1795512883436.jpg';
export const IMG_LIQUID = '/src/assets/images/cat_liquid_filling_1795512884606.jpg';
export const IMG_POWDER = '/src/assets/images/cat_powder_packaging_1795512885251.jpg';
export const IMG_WAREHOUSE = '/src/assets/images/cat_warehouse_automation_1795512885282.jpg';
export const IMG_HERO = '/src/assets/images/hero_turnkey_facility_1795512884015.jpg';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'conveyor-material-handling',
    title: 'Conveyor & Material Handling Systems',
    shortTitle: 'Conveyors & Handling',
    tagline: 'Modular, hygienic, and heavy-duty transport engineered for 24/7 global plant duty.',
    description:
      'Precision-built slat chain, modular plastic belt, powered roller, vertical elevator, and heavy pallet conveyors manufactured in SS304, SS316L, and anodized aluminum at our Chennai facility.',
    image: IMG_CONVEYOR,
    seoTitle: 'Industrial Conveyor Manufacturer & Exporter India | V Tech Manufacturing',
    seoDescription:
      'Custom slat chain, modular belt, powered roller, pallet chain, and vertical conveyors built in Chennai, India for global food, pharma, FMCG, and EV plants.',
    highlights: [
      'Washdown SS304/SS316L and precision powder-coated MS frames',
      'SEW-Eurodrive, Nord, or Bonfiglioli geared motors (50Hz / 60Hz global voltages)',
      'Low-friction Rexnord / Intralox / Habasit chains and belting options',
      'Pre-wired VFD speed synchronization & tool-less quick-release guides',
    ],
    industries: ['Food & Beverage', 'Pharmaceuticals', 'FMCG', 'Automotive & EV', 'Logistics'],
  },
  {
    slug: 'liquid-filling-machinery',
    title: 'Liquid Filling & Bottling Machinery',
    shortTitle: 'Liquid Filling Lines',
    tagline: 'Servo-driven volumetric, flow-meter, and weighmetric fillers from 5 ml to 1,000 L IBCs.',
    description:
      'High-accuracy liquid filling, unscrambling, rotary capping, induction sealing, and pressure-sensitive labeling equipment engineered for sanitary food, pharma, chemical, and lubricant plants.',
    image: IMG_LIQUID,
    seoTitle: 'Liquid Filling Machine Manufacturer & Exporter India | V Tech Manufacturing',
    seoDescription:
      'Servo piston fillers, flow-meter fillers, IBC drum weighmetric fillers, cappers, and labelers exported worldwide from Chennai, India.',
    highlights: [
      'Accuracy up to ±0.25% with recipe-driven servo stroke control',
      'CIP/SIP-ready SS316L wetted contact parts with FDA/USP Class VI seals',
      'Diving anti-foam nozzles for viscous oils, paints, and surfactants',
      'ATEX / explosion-proof Zone 1 & Zone 2 options for solvents and fuels',
    ],
    industries: ['Food & Beverage', 'Pharmaceuticals', 'FMCG & Personal Care', 'Chemicals & Lubricants'],
  },
  {
    slug: 'powder-packaging-machinery',
    title: 'Powder Dosing & Packaging Machinery',
    shortTitle: 'Powder Packaging',
    tagline: 'Dust-tight auger dosing, VFFS pouching, multi-lane stickpacks, and bulk bag fillers.',
    description:
      'Precision dry-product dosing and flexible/rigid packaging lines designed for nutraceuticals, spices, dairy powders, agrochemicals, and mineral granules.',
    image: IMG_POWDER,
    seoTitle: 'Powder Packaging & Auger Filler Exporter India | V Tech Manufacturing',
    seoDescription:
      'Servo auger fillers, collar VFFS pouch machines, multi-lane stickpackers, and 25-50 kg sack weigh fillers manufactured in Chennai, India.',
    highlights: [
      'Brushless servo auger drives for free-flowing & non-free-flowing powders',
      'Nitrogen gas flushing (< 2% residual O2) for extended export shelf life',
      'Integrated checkweigher feedback loop for automatic dose trim',
      'Dust-extraction shrouds & tool-free split hopper cleaning',
    ],
    industries: ['Food & Beverage', 'Pharmaceuticals & Nutraceuticals', 'Chemicals & Agro'],
  },
  {
    slug: 'warehouse-eol-automation',
    title: 'Warehouse & End-of-Line Automation',
    shortTitle: 'Warehouse & EOL',
    tagline: 'Robotic palletizing, case packing, AS/RS shuttles, AGVs, and WCS integration.',
    description:
      'Complete end-of-line packaging and intralogistics systems uniting case erectors, gantry palletizers, high-speed sorters, radio shuttles, dock loaders, and UL/CE control panels.',
    image: IMG_WAREHOUSE,
    seoTitle: 'Warehouse Automation & End-of-Line Machinery India | V Tech Manufacturing',
    seoDescription:
      'Robotic gantry palletizers, case packers, AS/RS radio shuttles, AGVs, telescopic dock loaders, and PLC/SCADA panels exported globally.',
    highlights: [
      'Seamless ERP/WMS handshake via OPC-UA, Modbus TCP, and Profinet',
      'Multi-SKU robotic & gantry palletizing up to 25 cycles/min',
      'High-density AS/RS pallet shuttles for ambient and -25°C cold stores',
      'CE & UL508A-ready Siemens / Allen-Bradley PLC control cabinets',
    ],
    industries: ['Logistics & E-Commerce', 'Food & Beverage', 'FMCG', 'Automotive & EV'],
  },
];

function buildConveyorFaqs(name: string, material: string): FaqItem[] {
  return [
    {
      question: `What electrical voltages and frequencies are supported for export shipments of ${name}?`,
      answer: `V Tech builds every ${name} for destination grid compliance: 400V/50Hz (Europe, Middle East, Africa, India, Australia), 480V/60Hz or 230V/60Hz (USA, Canada, Latin America), and 380V/50-60Hz, using UL/CE-rated motors and VFDs.`,
    },
    {
      question: `What frame materials and surface finishes are available?`,
      answer: `Standard configurations are offered in ${material}, bead-blasted or brushed SS304/SS316L for hygienic washdown environments, and epoxy powder-coated heavy structural steel for dry warehouse and automotive lines.`,
    },
    {
      question: `How is the ${name} packed for ocean or air freight?`,
      answer: `Equipment is modularized into numbered sub-assemblies, VCI-wrapped against marine humidity, braced inside ISPM-15 heat-treated fumigated wooden crates or 20ft/40ft sea containers, and supplied with step-by-step reassembly drawings.`,
    },
    {
      question: `Can V Tech conduct a live Factory Acceptance Test (FAT) before dispatch?`,
      answer: `Yes. Every conveyor system undergoes a full-load mechanical and electrical run-off at our Chennai plant. International buyers can attend in person, witness via multi-camera live video FAT, or appoint SGS / TUV / Bureau Veritas inspectors.`,
    },
    {
      question: `What is the typical manufacturing lead time and spare parts availability?`,
      answer: `Standard modular lengths ship in 4–6 weeks EXW/FOB Chennai; multi-tier custom integrated layouts ship in 8–12 weeks. Wear strips, sprockets, sensors, and spare gearmotors are stocked for 48-hour DHL/FedEx air dispatch.`,
    },
  ];
}

interface ConveyorSeed {
  slug: string;
  name: string;
  shortBenefit: string;
  overview: string;
  specs: SpecRow[];
  features: string[];
  customization: string[];
  applications: string[];
  industries: string[];
  compliance: string[];
  leadTime: string;
  related: string[];
}

const CONVEYOR_SEEDS: ConveyorSeed[] = [
  {
    slug: 'slat-chain-conveyors',
    name: 'Slat Chain Conveyors',
    shortBenefit: 'Low-friction straight and curved bottle, can, and jar transport up to 80 m/min.',
    overview:
      'V Tech Slat Chain Conveyors provide continuous, jerk-free container handling across filling, capping, labeling, and accumulation zones. Engineered with CNC-formed SS304 side frames, UHMW-PE wear strips, and genuine acetal or stainless steel flat-top chains.',
    specs: [
      { parameter: 'Chain Width Range', metric: '82.5 – 190.5 mm', imperial: '3.25 – 7.5 in' },
      { parameter: 'Linear Speed', metric: '5 – 80 m/min (VFD)', imperial: '16 – 262 ft/min (VFD)' },
      { parameter: 'Frame Construction', metric: 'SS304 / SS316L (2.5–3 mm)', imperial: 'SS304 / SS316L (10–12 ga)' },
      { parameter: 'Infeed / Discharge Height', metric: '750 – 1,200 mm ±50 mm', imperial: '29.5 – 47.2 in ±2 in' },
      { parameter: 'Drive & Power', metric: '0.37 – 1.5 kW, 400V/50Hz', imperial: '0.5 – 2.0 HP, 480V/60Hz' },
      { parameter: 'Max Single Drive Length', metric: 'Up to 18,000 mm', imperial: 'Up to 59 ft' },
    ],
    features: [
      'Modular straight, 45°, 90°, and 180° curved sections with magnetic or bevel-tab corner tracks',
      'Tool-less single or double adjustable side guide rails with scale indicators',
      'Drip-pan trays under wet filling and rinsing zones with central drain ports',
      'Open-frame hygienic washdown architecture eliminating bacterial harborage points',
    ],
    customization: [
      'Multi-track parallel accumulation tables (2 to 8 lanes)',
      'Magnetic or vacuum gripper elevating sections for glass/PET bottles',
      'Explosion-proof motor & ATEX Zone 1/2 wiring for solvent lines',
    ],
    applications: ['PET & glass bottle lines', 'HDPE chemical & lubricant containers', 'Tin cans & aerosol cans', 'Pharmaceutical syrup & vial transport'],
    industries: ['Food & Beverage', 'Pharmaceuticals & Nutraceuticals', 'FMCG & Personal Care', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE Machinery Directive 2006/42/EC', 'FDA / USDA Washdown Compatible', 'GMP SS316L Contact Option'],
    leadTime: '4–6 weeks FOB Chennai',
    related: ['modular-belt-conveyors', 'powerised-turntable-conveyors', 'servo-piston-liquid-fillers'],
  },
  {
    slug: 'modular-belt-conveyors',
    name: 'Modular Belt Conveyors',
    shortBenefit: 'Positive-drive sanitary plastic belting for curves, inclines, and wet washdowns.',
    overview:
      'Designed for zero belt tracking drift and rugged cut/chemical resistance, V Tech Modular Belt Conveyors handle packaged foods, cartons, pouches, trays, and bulk produce across tight curves, elevation changes, and high-pressure CIP washdown zones.',
    specs: [
      { parameter: 'Belt Width Range', metric: '150 – 1,200 mm', imperial: '6 – 47.2 in' },
      { parameter: 'Conveying Speed', metric: '3 – 50 m/min', imperial: '10 – 164 ft/min' },
      { parameter: 'Load Capacity', metric: 'Up to 120 kg/m', imperial: 'Up to 80 lb/ft' },
      { parameter: 'Operating Temperature', metric: '-40°C to +110°C (PP/PE/Acetal)', imperial: '-40°F to +230°F' },
      { parameter: 'Drive Power', metric: '0.55 – 2.2 kW', imperial: '0.75 – 3.0 HP' },
    ],
    features: [
      'Sprocket-driven positive engagement eliminates belt slippage in wet/oily plants',
      'Flush-grid, perforated, friction-top, or raised-rib flighted belt profiles',
      'Lift-up belt clean-in-place frame brackets for rapid sanitation',
      'Spiral and 90°/180° side-flexing radius belt configurations',
    ],
    customization: [
      'Integrated metal detector & checkweigher non-metallic zone',
      'Blue FDA-detectable acetal modules for meat, bakery, and dairy',
      'Pneumatic diverter gates and pusher reject stations',
    ],
    applications: ['Bakery cooling & pouch transfer', 'Shrink-wrapped multipacks', 'Frozen food & seafood processing', 'Carton accumulation'],
    industries: ['Food & Beverage', 'FMCG & Personal Care', 'Pharmaceuticals & Nutraceuticals'],
    compliance: ['ISO 9001:2015', 'CE Ready', 'FDA & EU 10/2011 Food Contact Belting', 'HACCP Hygienic Design'],
    leadTime: '4–6 weeks FOB Chennai',
    related: ['slat-chain-conveyors', 'flat-incline-belt-conveyors', 'cooling-drying-conveyors'],
  },
  {
    slug: 'flat-incline-belt-conveyors',
    name: 'Flat & Incline Belt Conveyors',
    shortBenefit: 'Versatile PU/PVC belt transport for pouches, cartons, components, and inspection.',
    overview:
      'Built for smooth unit handling, manual assembly, visual inspection, and steep incline elevation up to 45°. Available in extruded anodized aluminum profiles for clean assembly halls or folded SS304/MS structures for packaging floors.',
    specs: [
      { parameter: 'Belt Width', metric: '100 – 1,000 mm', imperial: '4 – 39.4 in' },
      { parameter: 'Incline Angle', metric: '0° – 45° (cleated)', imperial: '0° – 45° (cleated)' },
      { parameter: 'Belt Speed', metric: '2 – 45 m/min', imperial: '6.5 – 148 ft/min' },
      { parameter: 'Max Unit Load', metric: '50 kg/m', imperial: '33.6 lb/ft' },
      { parameter: 'Power Supply', metric: '230V/400V, 50/60Hz', imperial: '115V/480V, 60Hz' },
    ],
    features: [
      'Crowned drive and idler pulleys with quick-release tensioning',
      'Knife-edge nosebar transfers down to 12 mm diameter for tiny sachets',
      'PVC, PU food-grade, anti-static ESD, or rough-top grip belt options',
      'Optional overhead LED task lighting and ergonomic packing side shelves',
    ],
    customization: [
      'Z-frame or swan-neck incline profiles with corrugated sidewalls',
      'ESD dissipative belting for EV battery cells and electronics',
      'Integrated inkjet printer & barcode scanner mounting brackets',
    ],
    applications: ['VFFS pouch takeaway', 'Manual packing & sorting tables', 'EV battery pack & sub-assembly transfer', 'E-commerce parcel induction'],
    industries: ['Food & Beverage', 'Automotive & EV', 'Logistics & E-Commerce', 'FMCG & Personal Care'],
    compliance: ['ISO 9001:2015', 'CE Machinery Directive', 'FDA PU Belt Certified'],
    leadTime: '3–5 weeks FOB Chennai',
    related: ['modular-belt-conveyors', 'collar-type-vffs-pouch-machines', 'z-type-bucket-elevators'],
  },
  {
    slug: 'cooling-drying-conveyors',
    name: 'Cooling & Drying Conveyors',
    shortBenefit: 'Controlled thermal dwell, air-knife drying, and ambient/chilled air tunnels.',
    overview:
      'Engineered to stabilize product temperatures after thermal filling, pasteurization, baking, or extrusion, and to strip surface moisture prior to sleeve or sticker labeling.',
    specs: [
      { parameter: 'Effective Belt Width', metric: '300 – 1,500 mm', imperial: '11.8 – 59 in' },
      { parameter: 'Dwell Time Range', metric: '30 sec – 25 min (VFD)', imperial: '30 sec – 25 min (VFD)' },
      { parameter: 'Air Velocity (Blower)', metric: '25 – 45 m/s', imperial: '4,920 – 8,850 ft/min' },
      { parameter: 'Temperature Zone', metric: '5°C to +180°C', imperial: '41°F to +356°F' },
      { parameter: 'Connected Load', metric: '3.0 – 18.5 kW', imperial: '4.0 – 25.0 HP' },
    ],
    features: [
      'Insulated SS304 removable hood panels with viewing inspection windows',
      'High-efficiency centrifugal blowers with HEPA/G4 inlet air filtration',
      'Multi-tier serpentine or spiral path options for compact floor footprint',
      'PID digital temperature and airflow interlock with upstream filler',
    ],
    customization: [
      'Chilled glycol heat-exchanger coil integration for hot-fill sauces & ghee',
      'IR / UV lamp drying modules for printed caps and cans',
      'Condensate collection trays and stainless air-knife manifolds',
    ],
    applications: ['Hot-fill bottle & jar cooling', 'Pre-labeling moisture blow-off', 'Extruded polymer & rubber cooling', 'Confectionery & bakery ambient cooling'],
    industries: ['Food & Beverage', 'FMCG & Personal Care', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE Ready', 'HACCP Food Safe'],
    leadTime: '6–8 weeks FOB Chennai',
    related: ['wire-mesh-conveyors', 'modular-belt-conveyors', 'induction-sealers-sticker-labelers'],
  },
  {
    slug: 'wire-mesh-conveyors',
    name: 'Wire Mesh Conveyors',
    shortBenefit: 'Open-area SS304/SS316 mesh transport for high heat, washing, and drainage.',
    overview:
      'Built for extreme thermal, cryogenic, washing, and drainage processes where maximum airflow and liquid pass-through are essential. Uses precision balanced weave, flat-flex, or chain-edge stainless steel wire mesh.',
    specs: [
      { parameter: 'Mesh Width', metric: '200 – 1,800 mm', imperial: '7.9 – 70.8 in' },
      { parameter: 'Thermal Rating', metric: '-50°C to +450°C', imperial: '-58°F to +842°F' },
      { parameter: 'Open Area', metric: '45% – 82%', imperial: '45% – 82%' },
      { parameter: 'Mesh Material', metric: 'SS304 / SS316 / SS310', imperial: 'AISI 304 / 316 / 310' },
      { parameter: 'Drive Power', metric: '0.55 – 3.7 kW', imperial: '0.75 – 5.0 HP' },
    ],
    features: [
      'Positive chain-edge sprocket drive prevents belt wander under heavy thermal expansion',
      'Heavy-duty ceramic or stainless guide rails with expansion joints',
      'Self-draining open frame with spray header mounts for parts washing',
      'High tensile load rating for castings, glass jars, and bakery trays',
    ],
    customization: [
      'High-pressure spray wash and degreasing chambers',
      'Shrink tunnel and curing oven integration',
      'Side retention guards in perforated SS304',
    ],
    applications: ['Glass bottle pasteurization & warming', 'Automotive component degreasing', 'Snack frying & oil draining', 'Heat-treatment & curing ovens'],
    industries: ['Food & Beverage', 'Automotive & EV', 'Pharmaceuticals & Nutraceuticals'],
    compliance: ['ISO 9001:2015', 'CE Compliant', 'FDA Stainless Mesh'],
    leadTime: '5–7 weeks FOB Chennai',
    related: ['cooling-drying-conveyors', 'modular-belt-conveyors', 'bottle-unscramblers-air-rinsers'],
  },
  {
    slug: 'powered-roller-conveyors',
    name: 'Powered Roller Conveyors',
    shortBenefit: 'Zero-pressure accumulation and heavy-duty carton, tote, and pallet transport.',
    overview:
      'Engineered for high-throughput distribution hubs and manufacturing lines. Available in 24V DC MDR (Motorized Drive Roller) zero-pressure accumulation (ZPA), lineshaft, and chain-driven heavy pallet roller models.',
    specs: [
      { parameter: 'Roller Width', metric: '300 – 1,400 mm', imperial: '11.8 – 55.1 in' },
      { parameter: 'Roller Diameter', metric: '50 / 60 / 76 / 89 mm', imperial: '1.97 / 2.36 / 3.0 / 3.5 in' },
      { parameter: 'Unit Load Capacity', metric: 'Up to 1,500 kg/pallet', imperial: 'Up to 3,300 lb/pallet' },
      { parameter: 'Speed Range', metric: '8 – 45 m/min', imperial: '26 – 148 ft/min' },
      { parameter: 'Control Architecture', metric: '24V DC ZPA / 400V Chain', imperial: '24V DC ZPA / 480V Chain' },
    ],
    features: [
      '24V DC MDR run-on-demand zones cut warehouse energy draw by up to 60%',
      'True zero-pressure accumulation prevents fragile carton crushing',
      'Chain-driven live roller (CDLR) modules for Euro, US GMA, and steel pallets',
      'Pop-up chain transfers and 90° curved tapered rollers',
    ],
    customization: [
      'Zinc-plated steel, stainless steel, or PVC/PU-sleeved noise-dampened rollers',
      'Integrated weigh scales, dimensioners, and print-and-apply labelers',
      'Forklift bump guards and floor-bolted heavy structural supports',
    ],
    applications: ['E-commerce fulfillment centers', 'End-of-line pallet transport', 'Automotive tote & KLT lines', 'Cold storage pallet movement'],
    industries: ['Logistics & E-Commerce', 'Automotive & EV', 'Food & Beverage', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE EN 619 Conveyor Safety', 'UL508A Panel Option'],
    leadTime: '4–7 weeks FOB Chennai',
    related: ['gravity-roller-conveyors', 'heavy-duty-pallet-chain-conveyors', 'automated-sorting-diverter-conveyors'],
  },
  {
    slug: 'gravity-roller-conveyors',
    name: 'Gravity Roller Conveyors',
    shortBenefit: 'Cost-effective, maintenance-free accumulation, staging, and dock unloading.',
    overview:
      'Precision-balanced steel, galvanized, or stainless gravity rollers and skate-wheel tracks for ergonomic carton staging, pick-pack workstations, and flexible container loading.',
    specs: [
      { parameter: 'Roller Pitch', metric: '65 / 75 / 100 / 150 mm', imperial: '2.5 / 3.0 / 4.0 / 6.0 in' },
      { parameter: 'Frame Width', metric: '300 – 1,200 mm', imperial: '11.8 – 47.2 in' },
      { parameter: 'Load Capacity', metric: '50 – 800 kg/m', imperial: '33 – 537 lb/ft' },
      { parameter: 'Slope Grade', metric: '2% – 5%', imperial: '0.25 – 0.6 in/ft' },
      { parameter: 'Roller Bearings', metric: 'Precision sealed 6202/6001', imperial: 'Precision sealed ABEC' },
    ],
    features: [
      'Spring-loaded hex shafts for effortless roller drop-in replacement',
      'Modular 2 m and 3 m bolt-together straight and 45°/90° curved sections',
      'Expandable pantograph accordion sections on lockable swivel castors',
      'Centrifugal brake rollers available for steep heavy-pallet flow lanes',
    ],
    customization: [
      'Pop-up lift gates for operator walkway access',
      'End stops, manual ball-transfer tables, and packing scales',
      'SS304 food-grade washdown execution',
    ],
    applications: ['Case sealer discharge staging', 'Manual picking & packing lines', 'Container & truck bay unloading', 'Pallet flow racks'],
    industries: ['Logistics & E-Commerce', 'FMCG & Personal Care', 'Food & Beverage', 'Automotive & EV'],
    compliance: ['ISO 9001:2015', 'CE Safety Guarding Standard'],
    leadTime: '2–4 weeks FOB Chennai',
    related: ['powered-roller-conveyors', 'telescopic-flexible-dock-loaders', 'case-erectors-packers-sealers'],
  },
  {
    slug: 'heavy-duty-pallet-chain-conveyors',
    name: 'Heavy-Duty Pallet Chain Conveyors',
    shortBenefit: 'Dual and triple-strand roller chain transport for 1,500–3,000 kg pallets & IBCs.',
    overview:
      'Built for extreme industrial duty where standard rollers cannot support damaged pallet runners, 200L drum skids, 1,000L IBC totes, or automotive press dies. Features duplex/triplex ISO 12B/16B roller chains on hardened wear rails.',
    specs: [
      { parameter: 'Max Pallet Load', metric: 'Up to 3,000 kg', imperial: 'Up to 6,600 lb' },
      { parameter: 'Chain Configuration', metric: '2-strand or 3-strand 16B', imperial: '2-strand or 3-strand ANSI 80' },
      { parameter: 'Pallet Compatibility', metric: '1,200×1,000 / 1,200×800 mm', imperial: '48×40 / 48×32 in GMA/Euro' },
      { parameter: 'Conveying Speed', metric: '6 – 18 m/min', imperial: '20 – 60 ft/min' },
      { parameter: 'Drive Power', metric: '1.5 – 4.0 kW', imperial: '2.0 – 5.4 HP' },
    ],
    features: [
      'Heavy-wall structural C-channel chassis with forklift entry guards',
      'Cross-transfer pop-up chain modules for perpendicular 90° pallet routing',
      'Automatic chain tensioning and centralized lubrication manifolds',
      'High-accuracy photo-eye & inductive centering stops for robot palletizers',
    ],
    customization: [
      'Integrated load-cell weighing for IBC & drum filling stations',
      'ATEX Zone 1/2 intrinsically safe sensors for chemical plants',
      'Galvanized or SS304 frames for corrosive brine or outdoor docks',
    ],
    applications: ['1,000L IBC & 4-drum pallet handling', 'Robotic palletizer infeed/outfeed', 'Automotive engine & chassis skids', 'Stretch wrapper feed lines'],
    industries: ['Chemicals & Lubricants', 'Automotive & EV', 'Logistics & E-Commerce', 'Food & Beverage'],
    compliance: ['ISO 9001:2015', 'CE EN 619 Heavy Load', 'ATEX Option'],
    leadTime: '5–8 weeks FOB Chennai',
    related: ['powered-roller-conveyors', 'powerised-turntable-conveyors', 'bulk-drum-ibc-weighmetric-fillers'],
  },
  {
    slug: 'vertical-chain-lifting-conveyors',
    name: 'Vertical Chain Lifting Conveyors',
    shortBenefit: 'Continuous & reciprocating vertical elevation between mezzanine floors up to 18 m.',
    overview:
      'Reclaim valuable plant floor space by moving cartons, totes, crates, or full pallets vertically between ground floor packaging, overhead conveyor bridges, and mezzanine storage levels without forklifts.',
    specs: [
      { parameter: 'Vertical Lift Height', metric: '2,000 – 18,000 mm', imperial: '6.5 – 59 ft' },
      { parameter: 'Throughput (C-/Z-Type)', metric: 'Up to 1,800 cases/hr', imperial: 'Up to 1,800 cases/hr' },
      { parameter: 'Payload (Case / Pallet)', metric: '50 kg (case) / 1,500 kg (pallet)', imperial: '110 lb (case) / 3,300 lb (pallet)' },
      { parameter: 'Footprint', metric: 'From 1,200 × 1,400 mm', imperial: 'From 47 × 55 in' },
      { parameter: 'Safety Arrestors', metric: 'Dual brake + slack-chain sensor', imperial: 'Dual brake + slack-chain sensor' },
    ],
    features: [
      'C-shape (same-side) and Z-shape (pass-through) infeed/outfeed layouts',
      'Continuous slat-carrier models for high-speed beverage & FMCG cases',
      'Reciprocating carriage lifts for heavy 1,500 kg pallet loads',
      'Full polycarbonate/wire-mesh safety enclosure with interlocked access doors',
    ],
    customization: [
      'Multi-floor selective discharge gates (3+ levels)',
      'Automatic infeed metering belt & outfeed accumulation integration',
      'Cold-room (-25°C) low-temperature lubricants & heated enclosures',
    ],
    applications: ['Mezzanine-to-dock carton transfer', 'Overhead walkway clearance lifts', 'Multi-story warehouse replenishment', 'Pallet elevator automation'],
    industries: ['Logistics & E-Commerce', 'Food & Beverage', 'FMCG & Personal Care', 'Automotive & EV'],
    compliance: ['ISO 9001:2015', 'CE EN 619 / EN 1570', 'Safety Category 3 PLd'],
    leadTime: '6–9 weeks FOB Chennai',
    related: ['powered-roller-conveyors', 'heavy-duty-pallet-chain-conveyors', 'asrs-radio-pallet-shuttles'],
  },
  {
    slug: 'powerised-turntable-conveyors',
    name: 'Powerised Turntable Conveyors',
    shortBenefit: 'Automated 90°, 180°, and 360° pallet/case reorientation in tight layouts.',
    overview:
      'Engineered on heavy-duty crossed-roller slew bearings, V Tech Powerised Turntables rotate pallets, drums, or cartons smoothly to match labeler orientation, wrapper entry, or perpendicular warehouse aisles.',
    specs: [
      { parameter: 'Platform Diameter / Size', metric: '800 – 2,200 mm', imperial: '31.5 – 86.6 in' },
      { parameter: 'Rotation Angle', metric: '90° / 180° / 270° / 360°', imperial: '90° / 180° / 270° / 360°' },
      { parameter: 'Max Load Capacity', metric: 'Up to 2,500 kg', imperial: 'Up to 5,500 lb' },
      { parameter: 'Cycle Time (90°)', metric: '3.5 – 5.5 seconds', imperial: '3.5 – 5.5 seconds' },
      { parameter: 'Top Deck Type', metric: 'CDLR Rollers or 3-Strand Chain', imperial: 'CDLR Rollers or 3-Strand Chain' },
    ],
    features: [
      'Zero-backlash slew-ring bearing with heavy industrial brake gearmotor',
      'VFD soft-start and soft-stop ramps prevent tall pallet load shifting',
      'Mechanical hard stops plus inductive home/90° inductive encoders',
      'Low-profile floor mounting or pit-flush integration',
    ],
    customization: [
      'Rotary accumulation pack-off tables (1,000–1,500 mm SS304)',
      'Integrated load cells for gross/net weighing during rotation',
      'ATEX-certified rotary slip rings and sensors',
    ],
    applications: ['Pallet stretch wrapper line routing', '90° warehouse aisle junctions', 'Bottle unscrambling & pack-off rotary tables', 'Chemical drum palletization'],
    industries: ['Logistics & E-Commerce', 'Chemicals & Lubricants', 'Food & Beverage', 'Automotive & EV'],
    compliance: ['ISO 9001:2015', 'CE Compliant'],
    leadTime: '4–6 weeks FOB Chennai',
    related: ['heavy-duty-pallet-chain-conveyors', 'pallet-dispensers-wrappers-strappers', 'powered-roller-conveyors'],
  },
  {
    slug: 'overhead-power-free-conveyors',
    name: 'Overhead Power & Free Conveyors',
    shortBenefit: 'Zero-floor-footprint overhead transport for paint shops, curing, and EV assembly.',
    overview:
      'Maximize plant floor real estate with V Tech Enclosed-Track I-Beam and Dual-Track Power & Free Overhead Conveyors. Supports continuous paint line travel as well as independent carrier accumulation, switching, and variable-speed buffering.',
    specs: [
      { parameter: 'Carrier Load Capacity', metric: '50 – 1,500 kg per trolley', imperial: '110 – 3,300 lb per trolley' },
      { parameter: 'Track Type', metric: 'Enclosed C-Track / 3″–4″ I-Beam', imperial: 'Enclosed Track / 3″–4″ I-Beam' },
      { parameter: 'Line Speed', metric: '1 – 20 m/min', imperial: '3.3 – 65 ft/min' },
      { parameter: 'Oven Temperature Rating', metric: 'Up to +230°C', imperial: 'Up to +446°F' },
      { parameter: 'Vertical Bend Angles', metric: '15° / 30° / 45°', imperial: '15° / 30° / 45°' },
    ],
    features: [
      'Forged alloy steel bi-planar chains with hardened sealed bearings',
      'Pneumatic track switches, drop sections, and zero-pressure accumulation stops',
      'Auto-tensioning caterpillar drive unit with torque-limiter overload switch',
      'Automatic mist or dry-film chain lubrication system',
    ],
    customization: [
      'RFID carrier tracking for mixed-model EV chassis & battery trays',
      '360° rotating J-hooks and custom fixture hangers',
      'High-temp paint & powder coating curing oven seals',
    ],
    applications: ['Automotive & two-wheeler paint shops', 'EV motor & chassis sub-assembly', 'Powder coating & e-coat lines', 'Garment & appliance assembly'],
    industries: ['Automotive & EV', 'Logistics & E-Commerce', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'CE Machinery Directive', 'OSHA Overhead Guarding'],
    leadTime: '8–12 weeks FOB Chennai',
    related: ['vertical-chain-lifting-conveyors', 'heavy-duty-pallet-chain-conveyors', 'plc-scada-wcs-control-panels'],
  },
  {
    slug: 'screw-conveyors-powder-feeders',
    name: 'Screw Conveyors & Powder Feeders',
    shortBenefit: 'Dust-free enclosed incline & horizontal auger feeding for powders and granules.',
    overview:
      'Designed to transfer dry powders, spices, milk powder, API granules, and resin pellets hygienically from floor dump hoppers to elevated auger fillers, VFFS machines, or blenders with zero airborne dust.',
    specs: [
      { parameter: 'Auger Tube Diameter', metric: '100 – 300 mm', imperial: '4 – 12 in' },
      { parameter: 'Conveying Capacity', metric: '300 – 8,000 kg/hr', imperial: '660 – 17,600 lb/hr' },
      { parameter: 'Discharge Height', metric: '1,800 – 6,000 mm', imperial: '5.9 – 19.7 ft' },
      { parameter: 'Contact Material', metric: 'SS304 / SS316L Mirror Polish', imperial: 'SS304 / SS316L Mirror Polish' },
      { parameter: 'Hopper Volume', metric: '100 – 500 Liters', imperial: '26 – 132 US Gal' },
    ],
    features: [
      'Split-housing quick-release tube & pull-out screw shaft for 10-minute sanitation',
      'Low-level / high-level capacitive sensors auto-sync with downstream filler',
      'Integrated hopper vibrator and bridge-breaker agitator for cohesive powders',
      'Castor-mounted mobile frame with locking jacks',
    ],
    customization: [
      'Integrated bag-dump dust collection hood with HEPA pulse filter',
      'Flexible coreless spiral auger for curved routing',
      'ATEX dust-ignition-proof motors & grounding straps',
    ],
    applications: ['VFFS & auger filler hopper replenishment', 'Ribbon blender charging', 'Nutraceutical & spice dosing', 'Plastic masterbatch feeding'],
    industries: ['Food & Beverage', 'Pharmaceuticals & Nutraceuticals', 'Chemicals & Lubricants'],
    compliance: ['ISO 9001:2015', 'cGMP SS316L', 'CE Ready', 'ATEX Dust Option'],
    leadTime: '4–5 weeks FOB Chennai',
    related: ['z-type-bucket-elevators', 'servo-auger-rigid-fillers', 'collar-type-vffs-pouch-machines'],
  },
  {
    slug: 'z-type-bucket-elevators',
    name: 'Z-Type Bucket Elevators',
    shortBenefit: 'Gentle, zero-breakage horizontal-to-vertical elevation for snacks, grains, and tablets.',
    overview:
      'Protect fragile dry products such as extruded snacks, coffee beans, coated nuts, pulses, pet food, and coated tablets. Overlapping food-grade PP buckets carry material smoothly without crushing or product segregation.',
    specs: [
      { parameter: 'Bucket Volume', metric: '1.2 – 6.5 Liters', imperial: '0.32 – 1.72 US Gal' },
      { parameter: 'Throughput Rate', metric: '1.5 – 18 m³/hr', imperial: '53 – 635 ft³/hr' },
      { parameter: 'Discharge Height', metric: '2,500 – 12,000 mm', imperial: '8.2 – 39.4 ft' },
      { parameter: 'Bucket Material', metric: 'FDA Virgin PP / SS304', imperial: 'FDA Virgin PP / SS304' },
      { parameter: 'Drive Power', metric: '0.75 – 2.2 kW', imperial: '1.0 – 3.0 HP' },
    ],
    features: [
      'Continuous overlapping buckets prevent product spillage at infeed',
      'Quick-detach clip-on buckets for effortless washdown',
      'Single or multiple pneumatic tipper discharge stations',
      'Electro-magnetic vibratory feeder integrated at base hopper',
    ],
    customization: [
      'Enclosed SS304 dust-tight cladding with acrylic inspection doors',
      'Multi-head weigher gantry interface & level control',
      'Detectable blue PP buckets for food safety audits',
    ],
    applications: ['Multi-head weigher feeding', 'Snack & dry fruit packaging lines', 'Rice, pulses & seed handling', 'Frozen IQF vegetables'],
    industries: ['Food & Beverage', 'Pharmaceuticals & Nutraceuticals', 'FMCG & Personal Care'],
    compliance: ['ISO 9001:2015', 'FDA Food Grade', 'CE Compliant'],
    leadTime: '5–7 weeks FOB Chennai',
    related: ['screw-conveyors-powder-feeders', 'collar-type-vffs-pouch-machines', 'flat-incline-belt-conveyors'],
  },
];

export const CONVEYOR_PRODUCTS: ProductItem[] = CONVEYOR_SEEDS.map((s) => ({
  slug: s.slug,
  categorySlug: 'conveyor-material-handling',
  name: s.name,
  shortBenefit: s.shortBenefit,
  overview: s.overview,
  image: IMG_CONVEYOR,
  seoTitle: `${s.name} Manufacturer & Exporter India | V Tech Manufacturing`,
  seoDescription: `${s.name} built in Chennai, India for global export. ${s.shortBenefit} CE-ready, metric & imperial specs, live video FAT.`,
  keyFeatures: s.features,
  specs: s.specs,
  customizationOptions: s.customization,
  applications: s.applications,
  industries: s.industries,
  compliance: s.compliance,
  leadTime: s.leadTime,
  faqs: buildConveyorFaqs(s.name, s.specs[2]?.metric || 'SS304 / Powder-Coated MS'),
  relatedSlugs: s.related,
}));
