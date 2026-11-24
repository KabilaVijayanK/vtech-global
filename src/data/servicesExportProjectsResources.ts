import type {
  EngineeringService,
  ExportPageData,
  ProjectCaseStudy,
  ResourceArticle,
} from './types';
import { IMG_HERO, IMG_CONVEYOR, IMG_LIQUID, IMG_POWDER, IMG_WAREHOUSE } from './productsConveyors';

export const ENGINEERING_SERVICES: EngineeringService[] = [
  {
    slug: 'turnkey-plant-layout-3d-simulation',
    title: 'Turnkey Plant Layout & 3D Simulation',
    shortBenefit: 'AutoCAD/SolidWorks plant blueprints & discrete-event throughput modeling before build.',
    image: IMG_HERO,
    seoTitle: 'Turnkey Plant Layout & 3D Flow Simulation | V Tech Engineering',
    seoDescription:
      'Industrial packaging line layout design, 3D SolidWorks walk-throughs, and bottleneck throughput simulation for greenfield & brownfield plants.',
    overview:
      'Before cutting a single sheet of stainless steel, our process engineers map your entire plant footprint, utility drops, operator ergonomics, and accumulation buffers in 3D CAD and discrete-event simulation—guaranteeing rated BPM/PPH output.',
    methodology: [
      { phase: '01. Site & SKU Audit', description: 'Capture building columns, ceiling clearances, dock positions, SKU dimensions, and shift targets.' },
      { phase: '02. 2D/3D Concept Layout', description: 'Position machines, maintenance clearances, and ergonomic crossover bridges in SolidWorks & AutoCAD.' },
      { phase: '03. Dynamic Bottleneck Simulation', description: 'Stress-test line accumulation buffers against upstream/downstream micro-stops.' },
      { phase: '04. Final Construction Pack', description: 'Issue civil foundation load drawings, compressed air/power drops, and safety zoning.' },
    ],
    deliverables: [
      'Dimensioned 2D AutoCAD GA layout & 3D STEP/Navisworks clash-free assembly model',
      'Line accumulation & OEE sensitivity report (BPM / PPH throughput curve)',
      'Utility schedule (kW load, compressed air CFM, chilled water, N2 & drain points)',
      'Operator ergonomics & forklift traffic safety demarcation plan',
    ],
    toolsUsed: ['SolidWorks 3D CAD', 'AutoCAD Mechanical', 'FlexSim / Arena Simulation', 'Autodesk Navisworks'],
    sampleOutputs: [
      { title: 'Greenfield Bottling Hall 3D Layout', format: 'STEP / 3D PDF', detail: 'Complete 45m × 22m filling, labeling, and robotic palletizing layout.' },
      { title: 'Sorter Accumulation Buffer Simulation', format: 'MP4 + CSV Report', detail: 'Validates 4,200 PPH peak surge across 12 diverter lanes without upstream blockage.' },
    ],
  },
  {
    slug: 'custom-spm-and-fabrication',
    title: 'Custom SPM & Precision Fabrication',
    shortBenefit: 'Bespoke Special Purpose Machinery (SPM) & CNC stainless fabrication in Chennai.',
    image: IMG_CONVEYOR,
    seoTitle: 'Custom SPM & Precision SS316L Fabrication India | V Tech Manufacturing',
    seoDescription:
      'Contract special-purpose automation, non-standard conveyors, and precision CNC laser/TIG stainless fabrication for global OEMs and EPCs.',
    overview:
      'When off-the-shelf catalog equipment cannot fit an unconventional container, tight mezzanine column, or proprietary assembly sequence, V Tech designs and fabricates custom Special Purpose Machinery (SPM) in-house using CNC fiber laser cutting, CNC press brakes, and orbital/TIG stainless welding.',
    methodology: [
      { phase: '01. Functional Spec (URS)', description: 'Define cycle time, tolerances, material grades, and safety category requirements.' },
      { phase: '02. Prototype & Mechanism Design', description: 'Engineer custom cam/servo pick-and-place, indexing fixtures, or rotary tables.' },
      { phase: '03. In-House CNC Fabrication', description: 'Laser-cut, bend, machine, and electropolish in our Chennai facility under ISO 9001 QA.' },
      { phase: '04. Endurance Cycling & FAT', description: 'Continuous 10,000-cycle dry/wet endurance test prior to export crating.' },
    ],
    deliverables: [
      'Complete Design Qualification (DQ) & mechanical BOM with global OEM part numbers',
      'Material Test Certificates (MTC 3.1) for SS304, SS316L, and alloy shafts',
      'Surface roughness (Ra) and weld dye-penetrant inspection reports',
      'Recommended 2-year wear-parts list with CAD exploded views',
    ],
    toolsUsed: ['SolidWorks FEA', 'Trumpf/Bystronic CNC Fiber Laser', '5-Axis CNC VMC Machining', 'FARO Arm Metrology'],
    sampleOutputs: [
      { title: 'Dual-Axis Servo Jar Inversion & Air-Wash SPM', format: 'Custom Machine', detail: 'Built for irregular glass jars at 110 BPM with zero tool change.' },
      { title: 'OEM Contract Conveyor Skid Fabrication', format: 'Build-to-Print', detail: 'Turnkey UL/CE stainless chassis manufactured for European packaging OEMs.' },
    ],
  },
  {
    slug: 'automation-plc-scada-integration',
    title: 'Automation, PLC & SCADA Integration',
    shortBenefit: 'Siemens, Rockwell & Mitsubishi controls, EPLAN schematics, and MES/WMS telemetry.',
    image: IMG_WAREHOUSE,
    seoTitle: 'Industrial PLC, SCADA & WCS Automation Integration | V Tech',
    seoDescription:
      'Custom EPLAN panel engineering, Siemens S7 / Allen-Bradley PLC programming, SCADA OEE dashboards, and WMS/ERP API integration.',
    overview:
      'Our electrical and controls team eliminates multi-vendor integration headaches. We engineer IEC/UL508A panels in EPLAN, program deterministic PLC motion/safety logic, deploy browser-based SCADA OEE dashboards, and bridge machine telemetry to SAP, Oracle, or warehouse WMS platforms.',
    methodology: [
      { phase: '01. Control Architecture & FDS', description: 'Draft Functional Design Specification, I/O list, and Profinet/EtherNet/IP network topology.' },
      { phase: '02. EPLAN & Panel Assembly', description: 'Build thermally-managed IP65/NEMA 4X enclosures using Schneider, Siemens, and Pilz safety relays.' },
      { phase: '03. PLC/HMI/WCS Coding', description: 'Develop modular, documented ladder/SCL code with multi-language HMI alarms.' },
      { phase: '04. Emulation & Remote VPN', description: 'Test WMS/ERP telegrams virtually and commission secure VPN diagnostic gateways.' },
    ],
    deliverables: [
      'Complete EPLAN Electric P8 multi-sheet schematics & panel thermal calculation',
      'Unencrypted commented PLC & HMI source backup archive',
      '21 CFR Part 11 / OEE SCADA historian database setup',
      'CE LVD/EMC & UL508A compliance dossier',
    ],
    toolsUsed: ['EPLAN Electric P8', 'Siemens TIA Portal', 'Rockwell Studio 5000', 'Ignition SCADA & OPC-UA'],
    sampleOutputs: [
      { title: 'Master Bottling Line Sync PLC', format: 'TIA Portal V18', detail: 'PID conveyor speed modulation eliminating glass-to-glass impact.' },
      { title: 'Warehouse WCS Parcel Router', format: 'OPC-UA + REST', detail: 'Sub-50ms scanner-to-diverter routing for 4,500 PPH sortation.' },
    ],
  },
  {
    slug: 'installation-commissioning-and-amc',
    title: 'Installation, Commissioning & Global AMC',
    shortBenefit: 'On-site international engineer deployment, operator training & remote VPN SLA.',
    image: IMG_LIQUID,
    seoTitle: 'Global Machinery Installation, Commissioning & AMC | V Tech',
    seoDescription:
      'Worldwide on-site installation, SAT commissioning, operator maintenance training, and annual maintenance contracts from Chennai, India.',
    overview:
      'V Tech accountability continues long after container arrival at your destination port. Our multilingual field service engineers travel across North America, Europe, MENA, Africa, and APAC for mechanical erection, Site Acceptance Testing (SAT), operator certification, and multi-year remote or on-site AMC support.',
    methodology: [
      { phase: '01. Pre-Arrival Readiness Audit', description: 'Verify floor leveling, main power, air pressure, and rigging equipment via checklist.' },
      { phase: '02. Mechanical & Electrical Erection', description: 'Reassemble match-marked skids, level laser-aligned conveyors, and terminate trunks.' },
      { phase: '03. SAT & Production Ramp', description: 'Run live product validation hitting contractual speed and accuracy KPIs.' },
      { phase: '04. Operator & Maintenance Training', description: 'Hands-on classroom and floor training covering changeovers, sanitation, and PM.' },
    ],
    deliverables: [
      'Signed Site Acceptance Test (SAT) performance certificate',
      'Preventive Maintenance (PM) daily/weekly/annual schedule',
      'Recorded video SOPs customized to client’s exact SKU changeover steps',
      '24/7 WhatsApp/Phone + secure VPN PLC support SLA',
    ],
    toolsUsed: ['Laser Alignment Gauges', 'eWON / Secomea VPN', 'Digital Torque Analyzers', 'Fluke Thermal Calibration'],
    sampleOutputs: [
      { title: '10-Day Turnkey Line Commissioning', format: 'SAT Protocol', detail: 'Zero-defect ramp-up of 100 BPM liquid line in Dubai.' },
      { title: 'Tiered Global AMC Coverage', format: 'SLA Contract', detail: 'Quarterly remote PLC health audit + guaranteed 48-hr air-freight spares.' },
    ],
  },
];

export const EXPORT_PAGES: ExportPageData[] = [
  {
    slug: 'certifications-and-standards',
    title: 'Global Certifications & Engineering Standards',
    shortBenefit: 'ISO 9001:2015 manufacturing paired with CE, ATEX-ready, GMP, and UL508A compliance.',
    image: IMG_HERO,
    seoTitle: 'ISO 9001, CE, GMP & ATEX Export Standards | V Tech Manufacturing',
    seoDescription:
      'Explore V Tech Manufacturing international quality standards: ISO 9001:2015, CE Machinery Directive, FDA/cGMP SS316L, ATEX Zone 1/2, and UL508A.',
    overview:
      'Importing capital equipment requires absolute certainty that every machine passes destination customs, OSHA/CE safety audits, and industry regulatory inspections. V Tech builds to international norms by design—never as an afterthought.',
    sections: [
      {
        heading: 'Quality Management & Machinery Directives',
        summary: 'Core certifications governing design, fabrication, safety guarding, and electrical architecture.',
        rows: [
          { label: 'Quality Management System', spec: 'ISO 9001:2015 [PLACEHOLDER: Cert #]', notes: 'Full incoming metallurgy, weld, and FAT traceability.' },
          { label: 'European Union Conformity', spec: 'CE Ready (2006/42/EC, EMC, LVD)', notes: 'Technical Construction File, Risk Assessment EN ISO 12100 & Declaration.' },
          { label: 'North American Electrical', spec: 'UL508A / NFPA 79 Panel Option', notes: '480V/60Hz NEMA 4X panels with UL-listed breakers & disconnects.' },
          { label: 'Conveyor & Robot Safety', spec: 'EN 619 / ISO 10218-2 / PLd', notes: 'Dual-channel safety relays, interlocked doors, and light curtains.' },
        ],
      },
      {
        heading: 'Hygienic & Hazardous Environment Compliance',
        summary: 'Specialized material finishes and explosion protection for food, pharma, and chemical exporters.',
        rows: [
          { label: 'Pharmaceutical & Food Contact', spec: 'SS316L / FDA 21 CFR / USP Class VI', notes: 'MTC 3.1 certificates, Ra ≤ 0.6 µm polish, food-grade belting.' },
          { label: 'Hazardous / Solvent Areas', spec: 'ATEX Zone 1/2 & Zone 21/22 Ready', notes: 'Ex-d motors, intrinsic barriers, pneumatic logic & earthing interlocks.' },
          { label: 'Pharma Electronic Records', spec: '21 CFR Part 11 HMI Option', notes: 'Audit trail, electronic signatures, and tamper-proof batch CSV exports.' },
        ],
      },
    ],
    checklist: [
      'Material Test Certificates (EN 10204 3.1) for all wetted stainless assemblies',
      'CE Declaration of Incorporation / Conformity & EN ISO 12100 Risk Dossier',
      'Factory calibrated load-cell & flow-meter certificates traceable to NABL/NIST',
      'Complete EPLAN electrical & pneumatic schematics in English (local language optional)',
    ],
  },
  {
    slug: 'fat-shipping-and-installation',
    title: 'FAT, Export Crating, Shipping & Installation',
    shortBenefit: 'Video/3rd-party FAT, ISPM-15 VCI sea-freight crating, EXW/FOB/CIF/DAP terms.',
    image: IMG_CONVEYOR,
    seoTitle: 'FAT Testing, Export Shipping & Sea-Freight Crating | V Tech India',
    seoDescription:
      'Transparent Factory Acceptance Testing (FAT), ISPM-15 export crating, Incoterms (EXW/FOB Chennai/CIF/DAP), and installation workflows.',
    overview:
      'Exporting turnkey machinery from Chennai Port (INMAA) and Ennore/Kattupalli Terminals is streamlined through our dedicated export logistics desk. We protect every shipment against marine corrosion and ensure smooth customs clearance worldwide.',
    sections: [
      {
        heading: 'Factory Acceptance Testing (FAT) Protocols',
        summary: 'Every system is fully assembled, powered at target destination voltage/frequency, and run-tested before packing.',
        rows: [
          { label: 'In-Person Chennai FAT', spec: 'Included (Client travel welcome)', notes: 'Dedicated test bay with client sample bottles, pouches, or cartons.' },
          { label: 'Live Multi-Camera Video FAT', spec: '4K Zoom/Teams Live Stream', notes: 'Close-up telemetry feed of HMI, weigh scales, and continuous 2-hr endurance run.' },
          { label: 'Third-Party Inspection', spec: 'SGS / TUV / Bureau Veritas / Intertek', notes: 'Full cooperation with buyer-nominated pre-shipment inspection agencies.' },
        ],
      },
      {
        heading: 'Sea-Freight Packing, Incoterms & Commercial Terms',
        summary: 'Predictable shipping milestones and export documentation for hassle-free import clearance.',
        rows: [
          { label: 'Marine Packaging', spec: 'VCI Anti-Rust + ISPM-15 Fumigated Crates', notes: 'Desiccant packs, shrink shroud, shock-watch indicators & container lashing.' },
          { label: 'Supported Incoterms 2020', spec: 'EXW / FOB Chennai / CIF / DAP', notes: 'Sea freight via 20ft/40ft GP, High-Cube, Open-Top, or air freight for spares.' },
          { label: 'Standard Lead Times', spec: '4–6 wks (Single) / 8–14 wks (Turnkey)', notes: 'Confirmed upon drawing sign-off and advance deposit.' },
          { label: 'Export Payment Terms', spec: 'T/T Wire or Irrevocable L/C at Sight', notes: 'Milestone linked: Advance on PO, balance post-FAT approval before dispatch.' },
        ],
      },
    ],
    checklist: [
      'Commercial Invoice, Packing List with HS Codes, and Certificate of Origin (COO)',
      'ISPM-15 Heat-Treatment & Phytosanitary Fumigation Certificate',
      'Bill of Lading (Sea) / Airway Bill + Marine Cargo Insurance (CIF/CIP)',
      'Signed FAT Report, Dimensional Drawing & Color-Coded Reassembly Manual',
    ],
  },
  {
    slug: 'global-spare-parts-and-support',
    title: 'Global Spare Parts & Remote Support SLA',
    shortBenefit: '48-hour air dispatch spares, global OEM components, and multi-timezone remote VPN.',
    image: IMG_WAREHOUSE,
    seoTitle: 'Global Spare Parts & Remote Engineering Support | V Tech',
    seoDescription:
      '48-hour international spares dispatch, globally sourced Siemens/SEW/Festo components, and multi-timezone remote PLC diagnostics.',
    overview:
      'Global buyers never worry about proprietary lock-in or stranded downtime. V Tech builds using globally stocked Tier-1 components (Siemens, Allen-Bradley, SEW-Eurodrive, Festo, SMC, Intralox, Habasit, SICK, Endress+Hauser) and maintains dedicated export spares kits in Chennai.',
    sections: [
      {
        heading: 'Multi-Timezone Remote & Field Support SLA',
        summary: 'Structured escalation across Americas, Europe, Middle East, Africa, and APAC shift schedules.',
        rows: [
          { label: 'L1 Remote WhatsApp / Video Triage', spec: '< 2 Hours Response (24×6 Shift Desk)', notes: 'Direct connection to controls & mechanical support engineers.' },
          { label: 'L2 Secure VPN PLC Diagnostics', spec: '< 4 Hours Online Intervention', notes: 'eWON / Secomea encrypted tunnel for live ladder & VFD fault reset.' },
          { label: 'L3 Critical Air-Freight Spares', spec: '24–48 Hr DHL / FedEx Express Dispatch', notes: 'Pre-stocked servo drives, heaters, seals, belts & sensors.' },
          { label: 'L4 On-Site Field Engineer Dispatch', spec: '48–72 Hrs (Visa/Flight Dependent)', notes: 'Emergency troubleshooting or scheduled annual preventive overhaul.' },
        ],
      },
      {
        heading: 'Standardized Global OEM Component Policy',
        summary: 'Over 85% of wear & electrical parts are locally procurable in your country as well as from V Tech.',
        rows: [
          { label: 'PLC, HMI & Servo Motion', spec: 'Siemens / Rockwell / Mitsubishi / Delta', notes: 'Exact OEM part numbers listed in your BOM.' },
          { label: 'Gearmotors & Bearings', spec: 'SEW-Eurodrive / Nord / Bonfiglioli / SKF', notes: 'Standard IEC/NEMA frame footprints.' },
          { label: 'Pneumatics & Sensors', spec: 'Festo / SMC / SICK / Banner / Omron', notes: 'Zero proprietary black-box valves or sensors.' },
        ],
      },
    ],
    checklist: [
      'Every machine ships with a recommended 2-year Commissioning & Wear Spares Kit',
      'Exploded 3D spare-part catalog with exact OEM + V Tech SKU codes',
      'Annual Maintenance Contract (AMC) options for multi-line plants',
      'Complimentary remote operator refresher training for new plant hires',
    ],
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-uae-lube',
    title: '80 BPM Turnkey Lubricant Filling, Capping & Case Packing Line',
    country: 'United Arab Emirates',
    region: 'Middle East',
    industry: 'Chemicals, Paints & Lubricants',
    productType: 'Turnkey Liquid Line',
    clientName: '[PLACEHOLDER: Gulf Petrochemical Blender LLC]',
    image: IMG_LIQUID,
    challenge:
      'High-viscosity 15W-40 & 20W-50 motor oil jugs (1 L and 4 L) experienced heavy foaming, ±3% overfill giveaway, and 50-minute changeovers.',
    solution:
      'Engineered an 8-head servo piston filler with diving anti-foam nozzles, rotary induction sealer, dual-side labeler, slat conveyor network, and automatic case erector/sealer.',
    results: [
      'Fill accuracy tightened to ±0.2% saving [PLACEHOLDER: $145,000/yr] in oil giveaway',
      'SKU changeover reduced from 50 minutes to 14 minutes',
      'Zero container leaks reported across 18 months of GCC export shipping',
    ],
    machinesUsed: [
      { label: 'Servo Piston Liquid Fillers', path: '/products/liquid-filling-machinery/servo-piston-liquid-fillers/' },
      { label: 'Induction Sealers & Sticker Labelers', path: '/products/liquid-filling-machinery/induction-sealers-sticker-labelers/' },
      { label: 'Case Erectors, Packers & Sealers', path: '/products/warehouse-eol-automation/case-erectors-packers-sealers/' },
    ],
  },
  {
    id: 'proj-usa-spice',
    title: 'FDA-Audit Dust-Free Spice & Seasoning Screw-to-Auger Line',
    country: 'United States',
    region: 'USA',
    industry: 'Food & Beverage',
    productType: 'Powder Packaging',
    clientName: '[PLACEHOLDER: Atlantic Culinary Ingredients Inc.]',
    image: IMG_POWDER,
    challenge:
      'Manual 25 lb & 50 lb bulk spice bagging and 16 oz PET jar filling created heavy airborne dust, allergen cross-contamination risks, and UL inspection bottlenecks.',
    solution:
      'Supplied UL508A-wired SS316L split-hopper screw feeders, dual-head servo auger jar filler, checkweigher, and enclosed dust-hood 25 kg weighmetric bagger.',
    results: [
      'Passed FDA & SQF facility audit on first inspection',
      'Airborne particulate reduced by > 92% at operator stations',
      'Line output increased 42% with 3 fewer operators per shift',
    ],
    machinesUsed: [
      { label: 'Screw Conveyors & Powder Feeders', path: '/products/conveyor-material-handling/screw-conveyors-powder-feeders/' },
      { label: 'Servo Auger Rigid Fillers', path: '/products/powder-packaging-machinery/servo-auger-rigid-fillers/' },
      { label: 'Bulk Bag & Sack Weighing Fillers', path: '/products/powder-packaging-machinery/bulk-bag-sack-weighing-fillers/' },
    ],
  },
  {
    id: 'proj-de-oem',
    title: 'CE-Certified Modular Washdown Conveyor Network for Beverage Bottler',
    country: 'Germany',
    region: 'Europe',
    industry: 'Food & Beverage',
    productType: 'Conveyors',
    clientName: '[PLACEHOLDER: RheinCraft Beverage GmbH]',
    image: IMG_CONVEYOR,
    challenge:
      'Needed 110 meters of hygienic stainless slat-chain and modular-belt accumulation conveyors matching existing Krones/KHS interfaces within an 8-week delivery window.',
    solution:
      'Fabricated modular 3-meter match-marked SS304 conveyor skids in Chennai with SEW-Eurodrive 400V/50Hz drives, Intralox chains, and complete CE Technical File.',
    results: [
      'Delivered FOB Chennai in 7 weeks, 32% below European domestic CapEx quote',
      'Zero-gap accumulation stabilized downstream shrink wrapper feed at 160 BPM',
      'Passed TUV Rheinland site safety inspection seamlessly',
    ],
    machinesUsed: [
      { label: 'Slat Chain Conveyors', path: '/products/conveyor-material-handling/slat-chain-conveyors/' },
      { label: 'Modular Belt Conveyors', path: '/products/conveyor-material-handling/modular-belt-conveyors/' },
      { label: 'Powerised Turntable Conveyors', path: '/products/conveyor-material-handling/powerised-turntable-conveyors/' },
    ],
  },
  {
    id: 'proj-aus-3pl',
    title: '4,200 PPH E-Commerce Parcel Sortation & Telescopic Dock System',
    country: 'Australia',
    region: 'Australia',
    industry: 'Logistics, E-Commerce & Warehousing',
    productType: 'Warehouse Automation',
    clientName: '[PLACEHOLDER: Southern Cross 3PL Pty Ltd]',
    image: IMG_WAREHOUSE,
    challenge:
      'Melbourne cross-dock facility struggled with 3.5-hour 40ft container unload times and 4.5% manual parcel mis-routes during peak Q4 volume.',
    solution:
      'Commissioned 4 cantilevered telescopic belt dock loaders feeding a 24V DC MDR accumulation spine, 5-sided barcode DWS bridge, and 14-lane swivel-wheel diverter sorter.',
    results: [
      'Container unload/load time dropped from 3.5 hours to 75 minutes',
      'Sortation accuracy improved to 99.8% at 4,200 parcels/hr',
      '60% reduction in conveyor electricity draw via 24V ZPA zones',
    ],
    machinesUsed: [
      { label: 'Telescopic & Flexible Dock Loaders', path: '/products/warehouse-eol-automation/telescopic-flexible-dock-loaders/' },
      { label: 'Automated Sorting & Diverter Conveyors', path: '/products/warehouse-eol-automation/automated-sorting-diverter-conveyors/' },
      { label: 'Powered Roller Conveyors', path: '/products/conveyor-material-handling/powered-roller-conveyors/' },
    ],
  },
  {
    id: 'proj-nga-agro',
    title: 'ATEX-Ready Bulk Agrochemical & Fertilizer Bagging Terminal',
    country: 'Nigeria',
    region: 'Africa',
    industry: 'Chemicals, Paints & Lubricants',
    productType: 'Powder Packaging',
    clientName: '[PLACEHOLDER: West Africa Agro Inputs Ltd]',
    image: IMG_POWDER,
    challenge:
      'Corrosive NPK fertilizer and liquid herbicide packaging suffered chronic load-cell corrosion and unstable export pallet loads.',
    solution:
      'Built SS316L net-weigh 50 kg baggers, motorized pedestal bag-stitching conveyors, robotic bag palletizer, and 250% pre-stretch pallet wrapper.',
    results: [
      'Sustained 720 bags/hr (36 MT/hr) continuous bagging output',
      '38% stretch film cost savings with automated pre-stretch wrapping',
      'On-site Chennai engineering team completed SAT in 9 days',
    ],
    machinesUsed: [
      { label: 'Bulk Bag & Sack Weighing Fillers', path: '/products/powder-packaging-machinery/bulk-bag-sack-weighing-fillers/' },
      { label: 'Bag Closing & Stitching Conveyors', path: '/products/powder-packaging-machinery/bag-closing-stitching-conveyors/' },
      { label: 'Robotic & Gantry Palletizers', path: '/products/warehouse-eol-automation/robotic-gantry-palletizers/' },
    ],
  },
  {
    id: 'proj-vnm-ev',
    title: '32-Station EV Battery Assembly Loop & AMR Replenishment System',
    country: 'Vietnam',
    region: 'Southeast Asia',
    industry: 'Automotive & EV Manufacturing',
    productType: 'Turnkey EV Line',
    clientName: '[PLACEHOLDER: Mekong E-Mobility Systems JSC]',
    image: IMG_HERO,
    challenge:
      'Rapid scale-up to 600 EV battery packs/day demanded ESD-compliant pallet transfers, ±0.1 mm robotic weld locate accuracy, and zero forklift aisles.',
    solution:
      'Engineered twin-strand heavy pallet conveyor loop with pneumatic lift-and-locate pins, RFID fixture tracking, and 6 SLAM LiDAR AMRs supplying cell kits.',
    results: [
      'Achieved 48-second takt time across 32 assembly & EOL test stations',
      '100% part traceability synced directly to plant MES database',
      'Eliminated 100% of manual line-side forklift movements',
    ],
    machinesUsed: [
      { label: 'Heavy-Duty Pallet Chain Conveyors', path: '/products/conveyor-material-handling/heavy-duty-pallet-chain-conveyors/' },
      { label: 'AGV & AMR Material Transfer', path: '/products/warehouse-eol-automation/agv-amr-material-transfer/' },
      { label: 'PLC, SCADA & WCS Control Panels', path: '/products/warehouse-eol-automation/plc-scada-wcs-control-panels/' },
    ],
  },
];

export const RESOURCES: ResourceArticle[] = [
  {
    id: 'res-piston-vs-flow',
    slug: 'servo-piston-vs-flow-meter-liquid-filler',
    type: 'Comparison Guide',
    title: 'Servo Piston vs. Flow-Meter Liquid Fillers: Engineering Selection Matrix',
    readTime: '6 min technical read',
    summary:
      'Compare dosing accuracy, viscosity limits, CIP/SIP washdown time, CapEx, and maintenance cost between servo piston and magnetic/Coriolis flow-meter fillers.',
    optionALabel: 'Servo Piston Liquid Filler',
    optionBLabel: 'Flow-Meter (Mag / Coriolis) Filler',
    comparisonRows: [
      { criteria: 'Viscosity Handling', optionA: '1 to 50,000+ cP (creams, oils, honey, pastes)', optionB: '1 to 3,500 cP (thin liquids, syrups, dairy)' },
      { criteria: 'Dosing Accuracy', optionA: '±0.25% volumetric repeatability', optionB: '±0.15% to ±0.25% (mass/flow)' },
      { criteria: 'Wetted Moving Seals', optionA: 'Piston O-rings / PTFE seals (periodic swap)', optionB: 'Zero moving parts in product stream' },
      { criteria: 'CIP / SIP Sanitation', optionA: 'Requires CIP flush + seal inspection', optionB: '1-touch automated CIP/SIP up to 130°C' },
      { criteria: 'Particulate / Pulp Liquids', optionA: 'Excellent (handles soft chunks up to 8 mm)', optionB: 'Not recommended for fibrous solids' },
      { criteria: 'SKU Volume Changeover', optionA: 'Instant HMI stroke change (within cylinder)', optionB: 'Unlimited volume range via HMI recipe' },
    ],
    content: [
      'Selecting the wrong filling principle is the #1 cause of foam overflow, seal wear, and missed line OEE targets in greenfield liquid plants.',
      'Choose Servo Piston Fillers when your product portfolio spans thick sauces, gear lubricants, creams, or liquids containing soft particulates, and where positive-displacement suction guarantees consistent fill weight across viscosity shifts.',
      'Choose Electromagnetic or Coriolis Flow-Meter Fillers when running pharmaceutical syrups, dairy, agrochemicals, or multiple bottle volumes (200 ml to 20 L) on one machine requiring ultra-fast CIP sterilization without disassembling pistons.',
    ],
    downloadableAssetId: 'guide-servo-vs-flowmeter',
  },
  {
    id: 'res-master-catalog',
    slug: 'vtech-2026-global-machinery-catalog',
    type: 'Catalog & Datasheet',
    title: 'V Tech 2026 Master Machinery & Turnkey Systems Catalog (Metric & Imperial)',
    readTime: '48-page PDF specification pack',
    summary:
      'Complete engineering overview covering all 33 conveyor, liquid filling, powder dosing, and warehouse automation models with footprint dimensions and electrical ratings.',
    content: [
      'Includes dimensional footprint tables in both metric (mm, kg, BPM) and imperial (in, lb, CFM) units for North American, European, Middle Eastern, African, and APAC engineering teams.',
      'Contains utility load schedules (400V/50Hz and 480V/60Hz), Incoterms shipping container capacity charts, and FAT inspection checklists.',
    ],
    downloadableAssetId: 'vtech-master-catalog-2026',
  },
  {
    id: 'res-conveyor-guide',
    slug: 'slat-chain-vs-modular-belt-conveyors',
    type: 'Comparison Guide',
    title: 'Slat Chain vs. Modular Plastic Belt Conveyors: Line Design Guide',
    readTime: '5 min technical read',
    summary:
      'Determine when to specify narrow acetal/SS slat chains versus sprocket-driven modular belts for bottles, cartons, curves, and thermal cooling zones.',
    optionALabel: 'Slat Chain Conveyor',
    optionBLabel: 'Modular Plastic Belt Conveyor',
    comparisonRows: [
      { criteria: 'Best Container Geometry', optionA: 'Single-file bottles, cans, vials & jars', optionB: 'Multi-lane accumulation, cartons, pouches & trays' },
      { criteria: 'Side-Flexing Curve Radius', optionA: 'Tight 500 mm centerline radius', optionB: '1.6× to 2.2× belt width radius' },
      { criteria: 'Maximum Width', optionA: '82.5 mm to 190.5 mm per chain strand', optionB: '150 mm to 2,000+ mm single continuous width' },
      { criteria: 'Open Area for Air/Drainage', optionA: 'Low (solid top plate)', optionB: 'Up to 65% open flush-grid for cooling/washing' },
      { criteria: 'Incline Capability', optionA: 'Gentle up to 6° only', optionB: 'Up to 45° with integrated flights & sidewalls' },
    ],
    content: [
      'Modern packaging lines frequently combine both technologies: slat chains for high-speed single-file filling and labeling, feeding wider modular plastic belts for pasteurizer cooling tunnels and mass accumulation.',
    ],
    downloadableAssetId: 'guide-conveyor-selection',
  },
  {
    id: 'res-export-fat',
    slug: 'international-fat-shipping-checklist',
    type: 'Export Brief',
    title: 'Buyer’s Guide to Importing Turnkey Packaging Machinery from India',
    readTime: '7 min guide',
    summary:
      'Step-by-step procurement playbook covering voltage conversion, CE/UL compliance, video FAT sign-off, ISPM-15 sea crating, and customs HS code clearance.',
    content: [
      'Importing precision machinery across oceans requires tight alignment between engineering specs and international logistics.',
      'Always lock destination power (400V/50Hz vs 480V/60Hz), pneumatic fittings (metric vs NPT), and pallet footprint (Euro 1200×800 vs US GMA 48×40 in) at RFQ stage.',
      'Require a written Factory Acceptance Test (FAT) protocol with at least 100 consecutive measured fill/pack cycles witnessed via live 4K video or third-party SGS/TUV inspection prior to balance payment.',
    ],
    downloadableAssetId: 'guide-india-export-checklist',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'V Tech delivered our 80 BPM lubricant filling and case packing line on schedule to Jebel Ali. Their live video FAT caught a label sensor offset before crating, saving us two weeks on site.',
    author: '[PLACEHOLDER: Director of Operations]',
    company: '[PLACEHOLDER: Gulf Petrochemical Blender LLC]',
    country: 'Dubai, UAE',
    outcome: '±0.2% fill accuracy · 14-min SKU changeover',
  },
  {
    quote:
      'Our SQF and FDA auditors praised the split-hopper SS316L auger design. We cut airborne spice dust by over 90% while expanding daily jar and bulk sack output by 42%.',
    author: '[PLACEHOLDER: VP Manufacturing]',
    company: '[PLACEHOLDER: Atlantic Culinary Ingredients]',
    country: 'New Jersey, USA',
    outcome: '+42% shift throughput · FDA audit pass',
  },
  {
    quote:
      'Having 110 meters of CE-compliant stainless slat conveyors match-marked and pre-wired in Chennai cut our European line installation cost by 32% without compromising SEW/Intralox build quality.',
    author: '[PLACEHOLDER: Plant Engineering Lead]',
    company: '[PLACEHOLDER: RheinCraft Beverage GmbH]',
    country: 'Germany',
    outcome: '7-week lead time · 32% CapEx savings',
  },
];

export const EXPORT_COUNTRIES = [
  { name: 'United States', code: '+1', region: 'North America' },
  { name: 'United Arab Emirates', code: '+971', region: 'Middle East' },
  { name: 'Saudi Arabia', code: '+966', region: 'Middle East' },
  { name: 'United Kingdom', code: '+44', region: 'Europe' },
  { name: 'Germany', code: '+49', region: 'Europe' },
  { name: 'Australia', code: '+61', region: 'Oceania' },
  { name: 'Singapore', code: '+65', region: 'Southeast Asia' },
  { name: 'Malaysia', code: '+60', region: 'Southeast Asia' },
  { name: 'Vietnam', code: '+84', region: 'Southeast Asia' },
  { name: 'Indonesia', code: '+62', region: 'Southeast Asia' },
  { name: 'Thailand', code: '+66', region: 'Southeast Asia' },
  { name: 'Nigeria', code: '+234', region: 'Africa' },
  { name: 'Kenya', code: '+254', region: 'Africa' },
  { name: 'South Africa', code: '+27', region: 'Africa' },
  { name: 'Egypt', code: '+20', region: 'Africa' },
  { name: 'Canada', code: '+1', region: 'North America' },
  { name: 'Mexico', code: '+52', region: 'North America' },
  { name: 'France', code: '+33', region: 'Europe' },
  { name: 'Netherlands', code: '+31', region: 'Europe' },
  { name: 'Poland', code: '+48', region: 'Europe' },
  { name: 'Qatar', code: '+974', region: 'Middle East' },
  { name: 'Oman', code: '+968', region: 'Middle East' },
  { name: 'India', code: '+91', region: 'South Asia' },
  { name: 'Other International', code: '+', region: 'Global' },
];

export const HEADLESS_CMS_SCHEMA = {
  cmsTarget: 'Sanity v3 / Strapi v4 Compatible Content Types',
  contentTypes: [
    {
      name: 'product',
      title: 'Product (Machinery / Conveyor)',
      fields: [
        'name (string, required)',
        'slug (slug, required)',
        'category (reference -> productCategory)',
        'shortBenefit (string, max 120 chars)',
        'overview (richText)',
        'heroImage (image + alt)',
        'keyFeatures (array<string>)',
        'specs (array<{ parameter, metric, imperial }>)',
        'customizationOptions (array<string>)',
        'applications (array<string>)',
        'industries (array<reference -> industry>)',
        'compliance (array<string>)',
        'leadTime (string)',
        'faqs (array<{ question, answer }>)',
        'relatedProducts (array<reference -> product>)',
        'datasheetPdf (file)',
        'seo ({ title, description, canonical, schemaType })',
      ],
    },
    {
      name: 'turnkeySolution',
      title: 'Turnkey Solution',
      fields: [
        'title (string)',
        'slug (slug)',
        'problemStatement (text)',
        'throughputMetric (string)',
        'throughputImperial (string)',
        'stages (array<{ step, title, machineRef, detail }>)',
        'includedMachines (array<reference -> product>)',
        'caseStudySnippet (object)',
        'fatAndInstallation (array<string>)',
        'seo (object)',
      ],
    },
    {
      name: 'industry',
      title: 'Industry Vertical',
      fields: [
        'title (string)',
        'slug (slug)',
        'overview (text)',
        'challenges (array<string>)',
        'standards (array<{ code, detail }>)',
        'recommendedMachines (array<reference -> product>)',
        'recommendedTurnkey (array<reference -> turnkeySolution>)',
        'caseStudy (object)',
        'seo (object)',
      ],
    },
    {
      name: 'projectCaseStudy',
      title: 'Export Project / Case Study',
      fields: [
        'title (string)',
        'country (string)',
        'region (enum: USA|Europe|Middle East|Africa|Southeast Asia|Australia)',
        'industry (reference -> industry)',
        'productType (string)',
        'challenge (text)',
        'solution (text)',
        'results (array<string>)',
        'machinesUsed (array<reference -> product>)',
        'gallery (array<image>)',
      ],
    },
    {
      name: 'engineeringService',
      title: 'Engineering Service',
      fields: [
        'title (string)',
        'slug (slug)',
        'methodology (array<{ phase, description }>)',
        'deliverables (array<string>)',
        'toolsUsed (array<string>)',
        'sampleOutputs (array<{ title, format, detail }>)',
      ],
    },
    {
      name: 'resourceArticle',
      title: 'Resource / Technical Guide / Comparison',
      fields: [
        'title (string)',
        'slug (slug)',
        'type (enum)',
        'summary (text)',
        'body (richText)',
        'comparisonRows (array<{ criteria, optionA, optionB }>)',
        'gatedAssetId (string)',
      ],
    },
  ],
};
