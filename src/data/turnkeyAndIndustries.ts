import type { TurnkeySolution, IndustryItem } from './types';
import { IMG_HERO, IMG_CONVEYOR, IMG_LIQUID, IMG_POWDER, IMG_WAREHOUSE } from './productsConveyors';

export const TURNKEY_SOLUTIONS: TurnkeySolution[] = [
  {
    slug: 'liquid-filling-packaging-lines',
    title: 'Turnkey Liquid Filling & Packaging Lines',
    shortBenefit: 'Single-responsibility bottle-to-pallet liquid lines up to 150 BPM.',
    image: IMG_LIQUID,
    seoTitle: 'Turnkey Liquid Filling Line Supplier India | V Tech Manufacturing',
    seoDescription:
      'Complete liquid filling, capping, induction sealing, labeling, case packing, and palletizing lines engineered and exported from Chennai, India.',
    problemStatement:
      'Sourcing unscramblers, fillers, cappers, labelers, and case packers from disconnected vendors leads to conveyor accumulation bottlenecks, mismatched PLC handshakes, and finger-pointing during plant commissioning.',
    overview:
      'V Tech engineers, builds, pre-wires, and Factory Acceptance Tests the entire bottle-to-pallet line on our Chennai assembly floor. Every slat conveyor, servo filler, capper, sealer, labeler, and case packer runs under one master Siemens/Rockwell PLC line controller with zero-gap speed synchronization.',
    throughputMetric: '30 – 150 Bottles/Min (50 ml – 5 L)',
    throughputImperial: '1,800 – 9,000 BPH (1.7 fl oz – 1.3 US Gal)',
    stages: [
      {
        step: 1,
        title: 'Container Feeding & Cleaning',
        machineName: 'Bottle Unscrambler & Air Rinser',
        machinePath: '/products/liquid-filling-machinery/bottle-unscramblers-air-rinsers/',
        detail: 'Bulk hopper orients HDPE/PET bottles and performs ionized air vacuum rinsing.',
      },
      {
        step: 2,
        title: 'Precision Volumetric / Flow Dosing',
        machineName: 'Servo Piston / Flow-Meter Filler',
        machinePath: '/products/liquid-filling-machinery/servo-piston-liquid-fillers/',
        detail: '±0.25% repeatable dosing with diving anti-foam nozzles and CIP loop.',
      },
      {
        step: 3,
        title: 'Torque Capping & Foil Sealing',
        machineName: 'Automatic Capper & Induction Sealer',
        machinePath: '/products/liquid-filling-machinery/automatic-capping-machines/',
        detail: 'Servo torque closure followed by air-cooled tamper-evident induction sealing.',
      },
      {
        step: 4,
        title: 'Labeling & Batch Coding',
        machineName: 'Wrap / Front-Back Labeler',
        machinePath: '/products/liquid-filling-machinery/induction-sealers-sticker-labelers/',
        detail: '±0.5 mm label registration with vision OCR lot/expiry verification.',
      },
      {
        step: 5,
        title: 'Case Packing & Palletizing',
        machineName: 'Case Packer & Robotic Palletizer',
        machinePath: '/products/warehouse-eol-automation/case-erectors-packers-sealers/',
        detail: 'Automated RSC carton erecting, collation, taping, and stretch-wrapped pallets.',
      },
    ],
    includedMachinePaths: [
      { label: 'Bottle Unscramblers & Air Rinsers', path: '/products/liquid-filling-machinery/bottle-unscramblers-air-rinsers/' },
      { label: 'Servo Piston Liquid Fillers', path: '/products/liquid-filling-machinery/servo-piston-liquid-fillers/' },
      { label: 'Automatic Capping Machines', path: '/products/liquid-filling-machinery/automatic-capping-machines/' },
      { label: 'Induction Sealers & Sticker Labelers', path: '/products/liquid-filling-machinery/induction-sealers-sticker-labelers/' },
      { label: 'Slat Chain Conveyors', path: '/products/conveyor-material-handling/slat-chain-conveyors/' },
      { label: 'Case Erectors, Packers & Sealers', path: '/products/warehouse-eol-automation/case-erectors-packers-sealers/' },
    ],
    caseStudySnippet: {
      clientLabel: '[PLACEHOLDER: Regional Lubricant & Edible Oil Blender]',
      country: 'United Arab Emirates (Jebel Ali)',
      challenge: 'Manual 1 L & 4 L filling suffered ±3% product giveaway and 45-minute SKU changeovers.',
      outcome: 'Delivered 80 BPM turnkey servo line cutting giveaway to ±0.2% and SKU changeover to 14 minutes.',
    },
    fatAndInstallation: [
      'Full 40-meter line connected and wet-tested at V Tech Chennai prior to containerization',
      'Live multi-camera video FAT or SGS/TUV third-party witness sign-off',
      'Color-coded match-marked cabling & modular skids for 10-day on-site commissioning',
    ],
    faqs: [
      {
        question: 'Can one turnkey liquid line run multiple bottle shapes from 250 ml to 5 L?',
        answer: 'Yes. Using tool-less adjustable slat guides, servo-stroke HMI recipes, and quick-change starwheels, a single line typically covers 250 ml–1 L or 1 L–5 L ranges with under 15-minute changeovers.',
      },
      {
        question: 'Does V Tech integrate CIP skids and holding tanks with the line?',
        answer: 'Yes. We supply jacketed SS316L buffer tanks, transfer pumps, and automated CIP return manifolds wired directly into the master line PLC.',
      },
    ],
  },
  {
    slug: 'powder-dosing-bagging-lines',
    title: 'Turnkey Powder Dosing & Bagging Lines',
    shortBenefit: 'Dust-controlled feeding, auger/VFFS dosing, checkweighing, and palletizing.',
    image: IMG_POWDER,
    seoTitle: 'Turnkey Powder Packaging & Bagging Line Exporter | V Tech Manufacturing',
    seoDescription:
      'End-to-end powder handling, screw feeding, servo auger / VFFS pouching, 25-50 kg bagging, and palletizing lines engineered in India.',
    problemStatement:
      'Airborne dust, inconsistent bulk density, and static cling cause inaccurate fill weights, contaminated pouch seals, and operator health hazards in spice, nutrition, and chemical plants.',
    overview:
      'Our Turnkey Powder Lines combine enclosed vacuum/screw conveyors, loss-in-weight buffer hoppers, servo auger dosing or collar VFFS machines, inline metal detectors, and robotic bag/case palletizers with centralized pulse-jet dust extraction.',
    throughputMetric: '40 – 110 Pouches/Min or 400 – 900 Bags/Hr (25 kg)',
    throughputImperial: '40 – 110 Pouches/Min or 400 – 900 Bags/Hr (55 lb)',
    stages: [
      {
        step: 1,
        title: 'Dust-Free Bulk Feeding',
        machineName: 'Screw Conveyors & Z-Elevators',
        machinePath: '/products/conveyor-material-handling/screw-conveyors-powder-feeders/',
        detail: 'Enclosed auger or bucket elevation transfers powder with zero ambient dust.',
      },
      {
        step: 2,
        title: 'Precision Dosing & Pouching',
        machineName: 'Servo Auger / Collar VFFS',
        machinePath: '/products/powder-packaging-machinery/collar-type-vffs-pouch-machines/',
        detail: 'Nitrogen-flushed VFFS pouches or rigid jar filling with checkweigher feedback.',
      },
      {
        step: 3,
        title: 'Quality Verification',
        machineName: 'Checkweigher & Metal Detector',
        machinePath: '/products/conveyor-material-handling/flat-incline-belt-conveyors/',
        detail: 'Automated reject pusher removes under-weight or ferrous/SS contaminated packs.',
      },
      {
        step: 4,
        title: 'Secondary Bag / Case Closing',
        machineName: 'Bag Stitcher or Case Sealer',
        machinePath: '/products/powder-packaging-machinery/bag-closing-stitching-conveyors/',
        detail: 'Crepe-tape stitching for 25–50 kg sacks or RSC master cartoning for pouches.',
      },
      {
        step: 5,
        title: 'Automated Pallet Building',
        machineName: 'Robotic / Gantry Palletizer',
        machinePath: '/products/warehouse-eol-automation/robotic-gantry-palletizers/',
        detail: 'Bag flattener + 4-axis robot stacks tightly interlocked export pallets.',
      },
    ],
    includedMachinePaths: [
      { label: 'Screw Conveyors & Powder Feeders', path: '/products/conveyor-material-handling/screw-conveyors-powder-feeders/' },
      { label: 'Servo Auger Rigid Fillers', path: '/products/powder-packaging-machinery/servo-auger-rigid-fillers/' },
      { label: 'Collar-Type VFFS Pouch Machines', path: '/products/powder-packaging-machinery/collar-type-vffs-pouch-machines/' },
      { label: 'Bulk Bag & Sack Weighing Fillers', path: '/products/powder-packaging-machinery/bulk-bag-sack-weighing-fillers/' },
      { label: 'Bag Closing & Stitching Conveyors', path: '/products/powder-packaging-machinery/bag-closing-stitching-conveyors/' },
      { label: 'Robotic & Gantry Palletizers', path: '/products/warehouse-eol-automation/robotic-gantry-palletizers/' },
    ],
    caseStudySnippet: {
      clientLabel: '[PLACEHOLDER: International Spice & Nutraceutical Processor]',
      country: 'United States (New Jersey)',
      challenge: 'Cross-contamination concerns and dusty manual 25 kg sack filling slowed export fulfillment.',
      outcome: 'Installed SS316L split-hopper screw-to-bagging line meeting FDA audit with 42% higher shift output.',
    },
    fatAndInstallation: [
      'Powder flow & auger pitch trials conducted using target bulk density specs',
      'Includes dust-collector sizing & explosion-vent grounding checklist',
      'Remote commissioning support + on-site engineer deployment worldwide',
    ],
    faqs: [
      {
        question: 'How do you handle cohesive vs. free-flowing powders on the same line?',
        answer: 'We engineer interchangeable tool-free augers (straight-pitch with cut-off lip for cohesive flours/spices vs. self-feeding pitch for granules) alongside independent agitator blade speed control.',
      },
      {
        question: 'Can we run nitrogen flushing to achieve under 2% residual oxygen?',
        answer: 'Yes. Our enclosed hopper shroud and collar-lance nitrogen injection achieve < 2% residual O2 for coffee, milk powder, and infant nutrition.',
      },
    ],
  },
  {
    slug: 'warehouse-intralogistics-automation',
    title: 'Warehouse & Intralogistics Automation',
    shortBenefit: 'End-of-line palletizing to AS/RS shuttle storage & dock loading under unified WCS.',
    image: IMG_WAREHOUSE,
    seoTitle: 'Warehouse & Intralogistics Automation Systems | V Tech Manufacturing',
    seoDescription:
      'Integrated conveyor sortation, robotic palletizing, AGV/AMR fleets, AS/RS radio shuttles, and telescopic dock loaders engineered in India.',
    problemStatement:
      'High forklift traffic, unindexed manual pallet staging, and slow container loading create dock bottlenecks, product damage, and escalating labor overhead in regional distribution centers.',
    overview:
      'V Tech connects factory end-of-line production directly to shipping bays. Our intralogistics architecture combines multi-floor vertical lifts, 24V DC zero-pressure accumulation conveyors, automated sorters, robotic palletizers, AMR transfers, and deep-lane AS/RS radio shuttles managed by one WCS layer.',
    throughputMetric: 'Up to 4,500 Cartons/Hr & 90 Pallets/Hr',
    throughputImperial: 'Up to 4,500 Cartons/Hr & 90 Pallets/Hr',
    stages: [
      {
        step: 1,
        title: 'Production-to-Warehouse Link',
        machineName: 'Vertical Lift & MDR Conveyors',
        machinePath: '/products/conveyor-material-handling/vertical-chain-lifting-conveyors/',
        detail: 'Overhead bridges and vertical lifts route cartons from packing halls to DC.',
      },
      {
        step: 2,
        title: 'High-Speed Sortation',
        machineName: 'Automated Sorter & DWS Bridge',
        machinePath: '/products/warehouse-eol-automation/automated-sorting-diverter-conveyors/',
        detail: '5-sided barcode scanning diverts SKUs to dedicated palletizing lanes.',
      },
      {
        step: 3,
        title: 'Palletizing & Load Containment',
        machineName: 'Robotic Palletizer & Pre-Stretch Wrapper',
        machinePath: '/products/warehouse-eol-automation/pallet-dispensers-wrappers-strappers/',
        detail: 'Builds stable export pallets with 250% stretch wrap & SSCC pallet labels.',
      },
      {
        step: 4,
        title: 'AS/RS & AMR Storage',
        machineName: 'AGVs & Radio Pallet Shuttles',
        machinePath: '/products/warehouse-eol-automation/asrs-radio-pallet-shuttles/',
        detail: 'Driverless transfer into -30°C or ambient deep-lane shuttle racking.',
      },
      {
        step: 5,
        title: 'Automated Container Dispatch',
        machineName: 'Telescopic Dock Loaders',
        machinePath: '/products/warehouse-eol-automation/telescopic-flexible-dock-loaders/',
        detail: 'Cantilevered booms extend into 40ft containers cutting load time by 65%.',
      },
    ],
    includedMachinePaths: [
      { label: 'Powered Roller Conveyors', path: '/products/conveyor-material-handling/powered-roller-conveyors/' },
      { label: 'Vertical Chain Lifting Conveyors', path: '/products/conveyor-material-handling/vertical-chain-lifting-conveyors/' },
      { label: 'Automated Sorting & Diverter Conveyors', path: '/products/warehouse-eol-automation/automated-sorting-diverter-conveyors/' },
      { label: 'AGV & AMR Material Transfer', path: '/products/warehouse-eol-automation/agv-amr-material-transfer/' },
      { label: 'AS/RS & Radio Pallet Shuttles', path: '/products/warehouse-eol-automation/asrs-radio-pallet-shuttles/' },
      { label: 'Telescopic & Flexible Dock Loaders', path: '/products/warehouse-eol-automation/telescopic-flexible-dock-loaders/' },
    ],
    caseStudySnippet: {
      clientLabel: '[PLACEHOLDER: Cold-Chain FMCG Distribution Hub]',
      country: 'Malaysia (Kuala Lumpur)',
      challenge: 'Outgrown 3PL warehouse lacked space for 3,200 additional frozen food pallet positions.',
      outcome: 'Deployed -25°C AS/RS shuttle racking + vertical pallet lift, increasing storage capacity by 74%.',
    },
    fatAndInstallation: [
      'FlexSim 3D throughput bottleneck simulation delivered before fabrication begins',
      'WCS sandbox emulation tested directly against client SAP/WMS test API',
      'Phased installation plan prevents downtime inside brownfield operating DCs',
    ],
    faqs: [
      {
        question: 'Can V Tech WCS integrate with SAP EWM, Manhattan, or Odoo WMS?',
        answer: 'Yes. Our PLC/WCS layer exposes standard OPC-UA, REST/JSON, and TCP socket telegrams to exchange ASN, SKU routing, and bin inventory confirmation in real time.',
      },
      {
        question: 'Are your systems suitable for -25°C frozen food cold storage?',
        answer: 'Yes. Shuttles, vertical lifts, and heavy pallet conveyors are engineered with low-temp LiFePO4 heating, cryo-rated bearings, and heated control enclosures.',
      },
    ],
  },
  {
    slug: 'bulk-chemical-drum-handling',
    title: 'Bulk Chemical & Drum Handling Lines',
    shortBenefit: 'ATEX-ready empty pallet de-stacking, weighmetric drum/IBC filling, and strapping.',
    image: IMG_CONVEYOR,
    seoTitle: 'Bulk Chemical Drum & IBC Filling Line Exporter | V Tech Manufacturing',
    seoDescription:
      'ATEX-compliant 200L drum & 1000L IBC weighmetric filling, heavy pallet chain conveyors, turntables, and crimping lines.',
    problemStatement:
      'Handling 220 kg steel/HDPE drums and 1,200 kg IBC totes manually introduces hazardous spill exposure, vapor ignition risks, and inaccurate customs export net weights.',
    overview:
      'V Tech builds rugged, explosion-proof bulk liquid lines combining automatic pallet dispensers, heavy triple-strand pallet chain conveyors, OIML weighmetric bung/IBC fillers, automatic drum cappers/crimpers, and pallet strappers.',
    throughputMetric: '35 – 120 Drums/Hr (200 L) | 15 – 30 IBCs/Hr',
    throughputImperial: '35 – 120 Drums/Hr (55 Gal) | 15 – 30 Totes/Hr',
    stages: [
      {
        step: 1,
        title: 'Empty Pallet & Drum Staging',
        machineName: 'Pallet Dispenser & Heavy Chain Line',
        machinePath: '/products/conveyor-material-handling/heavy-duty-pallet-chain-conveyors/',
        detail: 'Feeds empty pallets carrying 4 drums or 1 IBC safely to the fill booth.',
      },
      {
        step: 2,
        title: 'Automated Sub-Surface Filling',
        machineName: 'ATEX Weighmetric Drum/IBC Filler',
        machinePath: '/products/liquid-filling-machinery/bulk-drum-ibc-weighmetric-fillers/',
        detail: 'Automatic tare, fume hood extraction, grounding interlock & ±0.05% dosing.',
      },
      {
        step: 3,
        title: '90° Routing & Bung Sealing',
        machineName: 'Powerised Turntable & Torque Capper',
        machinePath: '/products/conveyor-material-handling/powerised-turntable-conveyors/',
        detail: 'Rotates pallets for corner labeling and tightens tri-sure / HDPE bungs.',
      },
      {
        step: 4,
        title: 'Unitization & Dispatch',
        machineName: 'Automated Strapper & Wrapper',
        machinePath: '/products/warehouse-eol-automation/pallet-dispensers-wrappers-strappers/',
        detail: 'Secures 4-drum pallets with twin PET straps for ocean container transit.',
      },
    ],
    includedMachinePaths: [
      { label: 'Bulk Drum & IBC Weighmetric Fillers', path: '/products/liquid-filling-machinery/bulk-drum-ibc-weighmetric-fillers/' },
      { label: 'Heavy-Duty Pallet Chain Conveyors', path: '/products/conveyor-material-handling/heavy-duty-pallet-chain-conveyors/' },
      { label: 'Powerised Turntable Conveyors', path: '/products/conveyor-material-handling/powerised-turntable-conveyors/' },
      { label: 'Pallet Dispensers, Wrappers & Strappers', path: '/products/warehouse-eol-automation/pallet-dispensers-wrappers-strappers/' },
    ],
    caseStudySnippet: {
      clientLabel: '[PLACEHOLDER: Specialty Resin & Coatings Exporter]',
      country: 'Saudi Arabia (Jubail Industrial City)',
      challenge: 'Flammable solvent drum filling had high operator VOC exposure and slow 18-drum/hr throughput.',
      outcome: 'Commissioned ATEX Zone 1 dual-lance palletized filler reaching 65 drums/hr with zero VOC alarms.',
    },
    fatAndInstallation: [
      'ATEX Ex-d / Ex-i barrier schematics certified and verified before crating',
      'Simulated load-cell calibration with certified M1 test weights during video FAT',
      'Full grounding continuity & pneumatic interlock validation protocols included',
    ],
    faqs: [
      {
        question: 'Can the line fill both 4-drum pallets and 1,000 L IBC totes without changeover?',
        answer: 'Yes. Using dual-range load cells and an X-Y servo positioning arm, the operator selects "4x200L Drum" or "1x1000L IBC" on the Ex-rated HMI.',
      },
      {
        question: 'Do you support foaming surfactants and corrosive acids?',
        answer: 'Yes. Sub-surface bottom-fill lances eliminate foam generation, while Hastelloy-C or PTFE-lined wetted valves handle hydrochloric, sulfuric, and sodium hypochlorite.',
      },
    ],
  },
  {
    slug: 'automotive-ev-assembly-lines',
    title: 'Automotive & EV Assembly Lines',
    shortBenefit: 'ESD-safe battery pack assembly conveyors, overhead power & free, and AGV kitting.',
    image: IMG_HERO,
    seoTitle: 'Automotive & EV Battery Assembly Conveyor Lines | V Tech Manufacturing',
    seoDescription:
      'Turnkey EV battery module assembly conveyors, overhead power-and-free paint/chassis tracks, and AGV material transfer systems.',
    problemStatement:
      'EV powertrain and Tier-1 automotive lines require ultra-rigid pallet positioning for automated torque/weld cells, strict ESD grounding for lithium cells, and seamless traceability.',
    overview:
      'V Tech delivers complete Tier-1 and OEM assembly transfer systems including twin-strand palletized slat/belt assembly lines with pneumatic lift-and-locate stations (±0.1 mm repeatability), overhead power & free paint conveyors, and SLAM AMR kitting.',
    throughputMetric: 'Takt Time: 25 – 120 Seconds/Unit | Load: Up to 1,500 kg',
    throughputImperial: 'Takt Time: 25 – 120 Seconds/Unit | Load: Up to 3,300 lb',
    stages: [
      {
        step: 1,
        title: 'Kitting & Line-Side Replenishment',
        machineName: 'AGV / AMR Material Transfer',
        machinePath: '/products/warehouse-eol-automation/agv-amr-material-transfer/',
        detail: 'Delivers battery cells and KLT totes autonomously from warehouse to station 1.',
      },
      {
        step: 2,
        title: 'Precision Index Assembly',
        machineName: 'ESD Belt / Heavy Pallet Conveyors',
        machinePath: '/products/conveyor-material-handling/heavy-duty-pallet-chain-conveyors/',
        detail: 'Lift-and-locate pallet stops achieve ±0.1 mm accuracy for robotic welding/torquing.',
      },
      {
        step: 3,
        title: 'Overhead Paint & Curing',
        machineName: 'Overhead Power & Free Conveyor',
        machinePath: '/products/conveyor-material-handling/overhead-power-free-conveyors/',
        detail: 'Carries enclosures and frames through pretreatment, e-coat, and 220°C curing ovens.',
      },
      {
        step: 4,
        title: 'MES Traceability & Control',
        machineName: 'PLC, SCADA & RFID Control Panels',
        machinePath: '/products/warehouse-eol-automation/plc-scada-wcs-control-panels/',
        detail: 'Logs torque, HV leak-test, and weld data per chassis serial via RFID.',
      },
    ],
    includedMachinePaths: [
      { label: 'Overhead Power & Free Conveyors', path: '/products/conveyor-material-handling/overhead-power-free-conveyors/' },
      { label: 'Heavy-Duty Pallet Chain Conveyors', path: '/products/conveyor-material-handling/heavy-duty-pallet-chain-conveyors/' },
      { label: 'Flat & Incline Belt Conveyors (ESD)', path: '/products/conveyor-material-handling/flat-incline-belt-conveyors/' },
      { label: 'AGV & AMR Material Transfer', path: '/products/warehouse-eol-automation/agv-amr-material-transfer/' },
      { label: 'PLC, SCADA & WCS Control Panels', path: '/products/warehouse-eol-automation/plc-scada-wcs-control-panels/' },
    ],
    caseStudySnippet: {
      clientLabel: '[PLACEHOLDER: EV Two-Wheeler & Battery Pack OEM]',
      country: 'India & Export Assembly Kit (Vietnam)',
      challenge: 'Needed modular ESD-protected battery pack assembly loop expandable from 200 to 600 packs/day.',
      outcome: 'Supplied 32-station RFID-indexed pallet conveyor loop with zero-downtime modular expansion.',
    },
    fatAndInstallation: [
      'ESD surface resistivity verification (< 10^6–10^9 Ohms) documented per station',
      'Full Profinet / EtherNet/IP handshake simulation with client cobots/welders',
      'Pre-wired trunking and plug-and-play Harting industrial connectors for fast site assembly',
    ],
    faqs: [
      {
        question: 'Can V Tech conveyors support robotic laser welding or nut-runner stations inline?',
        answer: 'Yes. Our heavy pallet stoppers include hardened tapered locating pins that lift the fixture pallet off the chain/belt and lock it to ±0.1 mm positional repeatability.',
      },
      {
        question: 'Do you build custom fixture pallets with integrated RFID tags?',
        answer: 'Yes. We machine custom aluminum/Delrin ESD assembly pallets with embedded Balluff/Turck high-frequency RFID tags.',
      },
    ],
  },
];

export const INDUSTRIES: IndustryItem[] = [
  {
    slug: 'food-and-beverage',
    title: 'Food & Beverage Processing & Packaging',
    shortBenefit: 'HACCP & FDA-grade washdown conveyors, fillers, VFFS, and cold-store automation.',
    image: IMG_HERO,
    seoTitle: 'Food & Beverage Packaging Machinery & Conveyors India | V Tech',
    seoDescription:
      'Hygienic SS304/SS316L slat conveyors, modular washdown belts, liquid fillers, VFFS spice/snack lines, and cold-room pallet shuttles.',
    overview:
      'Global food and beverage plants require rapid sanitation turnaround, zero allergen cross-contamination, and dependable 24/7 throughput. V Tech builds open-frame CIP-ready conveyors and high-speed primary/secondary packaging lines for sauces, edible oils, dairy, beverages, spices, snacks, and frozen foods.',
    challenges: [
      'High-pressure caustic washdowns degrading standard carbon-steel bearings and motors',
      'Foam and drip issues when hot-filling viscous sauces, syrups, and edible oils',
      'Product giveaway on high-value spices, coffee, and infant nutrition powders',
      'Manual cold-room (-25°C) pallet handling causing forklift fatigue and energy loss',
    ],
    standards: [
      { code: 'HACCP & FDA 21 CFR', detail: 'Food-grade SS304/316L contact paths, detectable blue acetal belting, USP Class VI seals.' },
      { code: 'IP66 / IP69K Washdown', detail: 'Sloped tubular frames, drain pans, and sealed stainless geared motors.' },
      { code: 'MAP / N2 Flushing', detail: 'Residual oxygen < 2% for extended export shelf stability.' },
    ],
    recommendedMachinePaths: [
      { label: 'Modular Belt Conveyors', path: '/products/conveyor-material-handling/modular-belt-conveyors/', role: 'Wet washdown & cooling transport' },
      { label: 'Servo Piston Liquid Fillers', path: '/products/liquid-filling-machinery/servo-piston-liquid-fillers/', role: 'Viscous sauces, honey & edible oils' },
      { label: 'Collar-Type VFFS Pouch Machines', path: '/products/powder-packaging-machinery/collar-type-vffs-pouch-machines/', role: 'Snacks, spices & pulses up to 110 ppm' },
      { label: 'AS/RS & Radio Pallet Shuttles', path: '/products/warehouse-eol-automation/asrs-radio-pallet-shuttles/', role: 'High-density -25°C cold storage' },
    ],
    recommendedTurnkeyPaths: [
      { label: 'Turnkey Liquid Filling & Packaging Lines', path: '/turnkey-solutions/liquid-filling-packaging-lines/' },
      { label: 'Turnkey Powder Dosing & Bagging Lines', path: '/turnkey-solutions/powder-dosing-bagging-lines/' },
    ],
    caseStudy: {
      title: '120 BPM Edible Oil Bottling & Case Packing Line',
      region: 'East Africa (Kenya)',
      metricResult: '38% lower labor cost · ±0.2% fill accuracy',
      summary: 'Delivered turnkey 1L–5L PET edible oil unscrambling, flow-meter filling, capping, labeling, and RSC case packing line.',
    },
  },
  {
    slug: 'pharmaceuticals-and-nutraceuticals',
    title: 'Pharmaceuticals & Nutraceuticals',
    shortBenefit: 'cGMP SS316L mirror-finish fillers, stickpacks, and 21 CFR Part 11 traceability.',
    image: IMG_LIQUID,
    seoTitle: 'Pharmaceutical & Nutraceutical Packaging Machinery India | V Tech',
    seoDescription:
      'cGMP SS316L liquid syrup fillers, servo auger powder dosing, multi-lane ORS stickpacks, and cleanroom conveyors exported worldwide.',
    overview:
      'Engineered to satisfy stringent WHO-GMP, EU-GMP, and US-FDA facility audits, V Tech pharmaceutical machinery combines electropolished SS316L contact geometry, crevice-free welding, laminar flow integration, and full electronic batch audit trails.',
    challenges: [
      'Strict validation documentation (DQ / IQ / OQ / FAT protocols) required for export plants',
      'Micro-dosing accuracy for high-value APIs, probiotics, ORS sachets, and protein tubs',
      'Preventing particulate contamination during high-speed bottle unscrambling & rinsing',
    ],
    standards: [
      { code: 'cGMP / WHO-GMP', detail: 'Ra ≤ 0.4–0.6 µm electropolished SS316L wetted parts with tri-clamp disassembly.' },
      { code: '21 CFR Part 11 Ready', detail: 'Role-based HMI login, audit trail logging, and batch verification reports.' },
      { code: 'ISO Class 7 / 8', detail: 'Cleanroom-compatible stainless frames and ionized air sterile rinsing.' },
    ],
    recommendedMachinePaths: [
      { label: 'Flow-Meter Liquid Fillers', path: '/products/liquid-filling-machinery/flow-meter-liquid-fillers/', role: 'Zero-seal CIP/SIP syrup dosing' },
      { label: 'Multi-Lane Sachet & Stickpack Lines', path: '/products/powder-packaging-machinery/multi-lane-sachet-stickpack-lines/', role: 'ORS & probiotic stickpacks up to 500 ppm' },
      { label: 'Servo Auger Rigid Fillers', path: '/products/powder-packaging-machinery/servo-auger-rigid-fillers/', role: 'Nutraceutical tubs & dry syrup jars' },
      { label: 'Bottle Unscramblers & Air Rinsers', path: '/products/liquid-filling-machinery/bottle-unscramblers-air-rinsers/', role: '0.2 µm ionized air bottle cleaning' },
    ],
    recommendedTurnkeyPaths: [
      { label: 'Turnkey Liquid Filling & Packaging Lines', path: '/turnkey-solutions/liquid-filling-packaging-lines/' },
      { label: 'Turnkey Powder Dosing & Bagging Lines', path: '/turnkey-solutions/powder-dosing-bagging-lines/' },
    ],
    caseStudy: {
      title: '6-Lane cGMP ORS Stickpack & Cartoning Line',
      region: 'Southeast Asia (Vietnam)',
      metricResult: '300 sticks/min · ±0.8% dose tolerance',
      summary: 'Commissioned split-hopper screw feeder, 6-lane servo stickpack machine, and checkweigher reject line.',
    },
  },
  {
    slug: 'fmcg-and-personal-care',
    title: 'FMCG & Personal Care',
    shortBenefit: 'Flexible multi-SKU filling, pump capping, labeling, and robotic case packing.',
    image: IMG_CONVEYOR,
    seoTitle: 'FMCG & Personal Care Packaging Lines India | V Tech Manufacturing',
    seoDescription:
      'High-speed shampoo, lotion, detergent, and household chemical filling, trigger-pump capping, labeling, and EOL automation.',
    overview:
      'Contract packers and global FMCG brands juggle dozens of irregular oval, tapered, and trigger-spray bottle formats. V Tech delivers rapid-changeover lines with servo piston fillers, automated pump/trigger cappers, wrap/front-back labelers, and robotic palletizers.',
    challenges: [
      'Handling unstable oval, tapered, and embossed personal care bottles at high speeds',
      'Foaming surfactant liquids reducing fill throughput',
      'Long changeovers cutting OEE across short contract-packaging production runs',
    ],
    standards: [
      { code: 'CE EN 415', detail: 'Full polycarbonate interlocked safety guarding and Category 3 E-stops.' },
      { code: 'SMED Changeover', detail: 'Tool-less clamp guides and digital counters enable < 15-min SKU swaps.' },
      { code: 'SS316L Sanitary', detail: 'Corrosion-resistant contact paths for surfactants, acids, and alcohol gels.' },
    ],
    recommendedMachinePaths: [
      { label: 'Gravity & Overflow Liquid Fillers', path: '/products/liquid-filling-machinery/gravity-overflow-liquid-fillers/', role: 'Uniform retail shelf fill height' },
      { label: 'Automatic Capping Machines', path: '/products/liquid-filling-machinery/automatic-capping-machines/', role: 'Trigger sprayers & lotion pumps' },
      { label: 'Induction Sealers & Sticker Labelers', path: '/products/liquid-filling-machinery/induction-sealers-sticker-labelers/', role: 'Front/back & tamper-seal labeling' },
      { label: 'Case Erectors, Packers & Sealers', path: '/products/warehouse-eol-automation/case-erectors-packers-sealers/', role: 'Pick-and-place master cartoning' },
    ],
    recommendedTurnkeyPaths: [
      { label: 'Turnkey Liquid Filling & Packaging Lines', path: '/turnkey-solutions/liquid-filling-packaging-lines/' },
      { label: 'Warehouse & Intralogistics Automation', path: '/turnkey-solutions/warehouse-intralogistics-automation/' },
    ],
    caseStudy: {
      title: 'Multi-Format Home Care & Detergent Line',
      region: 'Europe (United Kingdom)',
      metricResult: '15-min SKU swap · 95 BPM sustained',
      summary: 'Exported CE-certified 8-head servo piston filler, trigger capper, and double-side labeler for 500 ml–2 L bottles.',
    },
  },
  {
    slug: 'chemicals-paints-and-lubricants',
    title: 'Chemicals, Paints & Lubricants',
    shortBenefit: 'ATEX Zone 1/2 weighmetric drum/IBC fillers, corrosive-grade dosing & heavy conveyors.',
    image: IMG_LIQUID,
    seoTitle: 'Chemical, Paint & Lubricant Filling Machinery India | V Tech',
    seoDescription:
      'ATEX-ready 20L pail, 200L drum, and 1000L IBC weighmetric fillers, heavy pallet chain conveyors, and servo lube oil lines.',
    overview:
      'From 500 ml motor oil bottles to 1,000 L solvent IBC totes and 25 kg polymer sacks, V Tech engineers hazardous-area compliant machinery designed for abrasive pigments, viscous resins, flammable solvents, and corrosive agrochemicals.',
    challenges: [
      'Explosive vapor atmospheres requiring certified ATEX / IECEx Zone 1/2 electrical protection',
      'Stringent customs & OIML weight tolerances on high-value bulk chemical exports',
      'Heavy 1,500–3,000 kg palletized drum/IBC loads damaging light-duty rollers',
    ],
    standards: [
      { code: 'ATEX / IECEx', detail: 'Ex-d flameproof motors, intrinsically safe load-cell barriers, static grounding clamps.' },
      { code: 'OIML R76 / R61', detail: 'Certified gravimetric accuracy up to ±0.05% for drums, pails, and sacks.' },
      { code: 'PVDF / Hastelloy', detail: 'Chemical-resistant non-metallic and alloy wetted manifolds.' },
    ],
    recommendedMachinePaths: [
      { label: 'Bulk Drum & IBC Weighmetric Fillers', path: '/products/liquid-filling-machinery/bulk-drum-ibc-weighmetric-fillers/', role: '20 L pails, 200 L drums & 1,000 L IBCs' },
      { label: 'Heavy-Duty Pallet Chain Conveyors', path: '/products/conveyor-material-handling/heavy-duty-pallet-chain-conveyors/', role: '3,000 kg drum & IBC pallet routing' },
      { label: 'Bulk Bag & Sack Weighing Fillers', path: '/products/powder-packaging-machinery/bulk-bag-sack-weighing-fillers/', role: '25–50 kg sacks & 1,500 kg FIBCs' },
      { label: 'Pallet Dispensers, Wrappers & Strappers', path: '/products/warehouse-eol-automation/pallet-dispensers-wrappers-strappers/', role: 'Export container pallet strapping' },
    ],
    recommendedTurnkeyPaths: [
      { label: 'Bulk Chemical & Drum Handling Lines', path: '/turnkey-solutions/bulk-chemical-drum-handling/' },
      { label: 'Turnkey Powder Dosing & Bagging Lines', path: '/turnkey-solutions/powder-dosing-bagging-lines/' },
    ],
    caseStudy: {
      title: 'ATEX Zone 1 Solvent Drum & IBC Filling Terminal',
      region: 'Middle East (Saudi Arabia)',
      metricResult: '65 drums/hr · Zero VOC spill incidents',
      summary: 'Engineered enclosed fume-extraction weighmetric terminal with automated pallet chain indexing and PET strapping.',
    },
  },
  {
    slug: 'automotive-and-ev-manufacturing',
    title: 'Automotive & EV Manufacturing',
    shortBenefit: 'Precision palletized assembly lines, ESD battery handling, and overhead P&F tracks.',
    image: IMG_HERO,
    seoTitle: 'Automotive & EV Assembly Conveyors & Automation | V Tech India',
    seoDescription:
      'Turnkey EV battery assembly lines, overhead power & free paint conveyors, heavy pallet conveyors, and AGV kitting from Chennai.',
    overview:
      'Headquartered in Chennai—India’s premier automotive and EV manufacturing corridor—V Tech supplies Tier-1 OEMs and global assembly plants with rugged overhead power & free tracks, precision lift-and-locate pallet assembly loops, and autonomous AGV/AMR material trains.',
    challenges: [
      'Integrating heavy 500–1,500 kg EV battery packs with ±0.1 mm robotic cell positioning',
      'Maintaining strict ESD dissipation across lithium module assembly stations',
      'Eliminating forklift aisle congestion via automated kitting & overhead transport',
    ],
    standards: [
      { code: 'IEC 61340 ESD', detail: 'Dissipative belting, grounded pallets, and ionized workstation control.' },
      { code: 'ISO 10218 & PLd', detail: 'Dual-channel safety light curtains and robot cell interlocks.' },
      { code: 'MES RFID Traceability', detail: 'Part-by-part serialization over Profinet / EtherNet/IP.' },
    ],
    recommendedMachinePaths: [
      { label: 'Overhead Power & Free Conveyors', path: '/products/conveyor-material-handling/overhead-power-free-conveyors/', role: 'Paint shops, e-coat & 220°C curing ovens' },
      { label: 'AGV & AMR Material Transfer', path: '/products/warehouse-eol-automation/agv-amr-material-transfer/', role: 'Autonomous line-side kitting & pack transfer' },
      { label: 'Wire Mesh Conveyors', path: '/products/conveyor-material-handling/wire-mesh-conveyors/', role: 'Component washing & thermal degreasing' },
      { label: 'PLC, SCADA & WCS Control Panels', path: '/products/warehouse-eol-automation/plc-scada-wcs-control-panels/', role: 'Line MES & RFID torque logging' },
    ],
    recommendedTurnkeyPaths: [
      { label: 'Automotive & EV Assembly Lines', path: '/turnkey-solutions/automotive-ev-assembly-lines/' },
      { label: 'Warehouse & Intralogistics Automation', path: '/turnkey-solutions/warehouse-intralogistics-automation/' },
    ],
    caseStudy: {
      title: '32-Station EV Battery Pack Assembly Conveyor Loop',
      region: 'Southeast Asia (Vietnam)',
      metricResult: '±0.1 mm fixture locate · 600 packs/day',
      summary: 'Supplied modular ESD palletized assembly conveyor with pneumatic lift-and-locate units and RFID MES tracking.',
    },
  },
  {
    slug: 'logistics-ecommerce-and-warehousing',
    title: 'Logistics, E-Commerce & Warehousing',
    shortBenefit: 'High-speed parcel sortation, MDR accumulation, AS/RS shuttles & dock loaders.',
    image: IMG_WAREHOUSE,
    seoTitle: 'Warehouse Automation & Parcel Sortation Systems | V Tech India',
    seoDescription:
      'High-speed diverter sorters, 24V ZPA powered roller conveyors, AS/RS radio shuttles, and telescopic dock loaders for 3PL hubs.',
    overview:
      '3PL operators and omnichannel fulfillment centers depend on deterministic throughput, low energy per parcel, and zero dock bottlenecks. V Tech designs complete warehouse automation networks uniting MDR conveyors, sortation, vertical lifts, AS/RS shuttles, and container-loading telescopic booms.',
    challenges: [
      'Peak-season parcel surges exceeding manual sortation capacity and accuracy',
      'Slow 20ft/40ft sea container loading consuming 3–4 hours of dock door utilization',
      'High land costs requiring vertical mezzanine lifts and deep-lane shuttle density',
    ],
    standards: [
      { code: 'CE EN 619 / ANSI B20.1', detail: 'Pinch-point guarding, e-stop pull cords, and low-noise < 68 dBA operation.' },
      { code: '24V DC Eco-ZPA', detail: 'Run-on-demand roller zones cutting power consumption up to 60%.' },
      { code: 'WCS / WMS Sync', detail: 'Direct barcode/DWS integration with SAP, Oracle, and custom 3PL WMS.' },
    ],
    recommendedMachinePaths: [
      { label: 'Powered Roller Conveyors', path: '/products/conveyor-material-handling/powered-roller-conveyors/', role: '24V DC zero-pressure accumulation' },
      { label: 'Automated Sorting & Diverter Conveyors', path: '/products/warehouse-eol-automation/automated-sorting-diverter-conveyors/', role: 'Up to 4,500 parcels/hr sortation' },
      { label: 'Telescopic & Flexible Dock Loaders', path: '/products/warehouse-eol-automation/telescopic-flexible-dock-loaders/', role: '65% faster 40ft container loading' },
      { label: 'Vertical Chain Lifting Conveyors', path: '/products/conveyor-material-handling/vertical-chain-lifting-conveyors/', role: 'Mezzanine-to-dock elevation' },
    ],
    recommendedTurnkeyPaths: [
      { label: 'Warehouse & Intralogistics Automation', path: '/turnkey-solutions/warehouse-intralogistics-automation/' },
    ],
    caseStudy: {
      title: '4,000 PPH E-Commerce Cross-Dock & Telescopic Dispatch Hub',
      region: 'Australia (Melbourne)',
      metricResult: '62% faster container turn · 99.8% sort accuracy',
      summary: 'Integrated 5-sided barcode scan tunnel, swivel-wheel diverters, and 6 telescopic container loaders.',
    },
  },
];
