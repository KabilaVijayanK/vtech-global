import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Factory, ShieldCheck, Users } from 'lucide-react';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';
import { IMG_HERO } from '../data/productsConveyors';

export default function AboutPage() {
  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'About Us' },
  ];

  const machineryList = [
    'CNC Fiber Laser Cutting Machine (3,000 × 1,500 mm bed, up to 12 mm SS)',
    'CNC Hydraulic Press Brake (8-axis, 3,200 mm bending length)',
    'Vertical Machining Center (VMC) & CNC Precision Turning Centers',
    'Orbital & Pulsed TIG Welding Bays for Sanitary SS316L Manifolds',
    'Glass-Bead Blasting & Electropolishing Surface Finishing Room',
    'Dedicated 45-Meter Turnkey Line FAT & Electrical Load-Test Bay',
  ];

  const qcStages = [
    { stage: '01. Incoming Metallurgy', detail: 'PMI & EN 10204 3.1 verification for SS304, SS316L, and aluminum profiles.' },
    { stage: '02. Dimensional Metrology', detail: 'Laser-cut & CNC-machined tolerances checked against SolidWorks GD&T.' },
    { stage: '03. Weld & Surface Ra', detail: 'Dye-penetrant weld tests and Ra ≤ 0.6 µm profilometer checks on pharma parts.' },
    { stage: '04. Electrical & Safety', detail: 'Megger insulation, earth continuity, thermal load test & E-stop PLd check.' },
    { stage: '05. 48-Hr Witnessed FAT', detail: 'Full-speed trial using client containers prior to VCI sea crating.' },
  ];

  return (
    <>
      <SeoHead
        title="About V Tech Manufacturing | Process & Packaging OEM Chennai, India"
        description="Learn about V Tech Manufacturing in Chennai, India: CNC fabrication infrastructure, 5-stage quality control, engineering team, and global export footprint."
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <div className="mt-3 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
                Chennai Engineering Works · India
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Solution Partner for Your Global Process &amp; Packaging Lines
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-200">
                Founded in Chennai—India’s industrial and automotive engineering powerhouse—V Tech Manufacturing bridges the gap between high-cost European machinery and unreliable low-tier fabricators. We build export-grade conveyors, filling machinery, and turnkey automation designed for decades of 24/7 operation.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/15">
                <MachineVisual src={IMG_HERO} alt="V Tech Manufacturing Assembly Floor" aspectClass="aspect-[16/10]" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] space-y-16 px-4 sm:px-6 lg:px-8">
          {/* Vision & Story */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <Factory className="h-5 w-5 text-[#1a2a8c]" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold text-slate-900">In-House Manufacturing Control</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                [PLACEHOLDER: 45,000 sq.ft.] integrated fabrication, machining, panel wiring, and FAT testing facility in Chennai—minutes from Chennai &amp; Ennore deep-water export ports.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <ShieldCheck className="h-5 w-5 text-[#1a2a8c]" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold text-slate-900">Global Component Parity</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Every PLC, servo motor, gearmotor, and pneumatic valve is sourced from Siemens, Rockwell, SEW-Eurodrive, Festo, and Intralox so your local maintenance team can source spares anywhere.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#f5f7fa] p-6">
              <Users className="h-5 w-5 text-[#1a2a8c]" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold text-slate-900">Single-Point Accountability</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                From 3D SolidWorks layout simulation through video FAT, sea crating, and on-site commissioning, one dedicated project engineer owns your line throughput guarantee.
              </p>
            </div>
          </div>

          {/* Factory Infrastructure */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-bold text-slate-900">Chennai Fabrication &amp; Testing Machinery</h2>
              <p className="mt-2 text-sm text-slate-600">
                Vertical integration keeps lead times predictable and stainless weld quality consistent across export batches.
              </p>
              <ul className="mt-5 space-y-3">
                {machineryList.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-2xl font-bold text-slate-900">5-Stage Quality Control &amp; FAT Process</h2>
              <div className="mt-5 space-y-3">
                {qcStages.map((q) => (
                  <div key={q.stage} className="rounded-lg border border-slate-200 bg-[#f5f7fa] p-4">
                    <p className="text-xs font-bold text-[#1a2a8c]">{q.stage}</p>
                    <p className="mt-1 text-xs text-slate-700">{q.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leadership & Engineering Team */}
          <div className="border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900">Engineering &amp; Export Leadership</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { role: 'Managing Director & Chief Engineer', name: '[PLACEHOLDER: Founder / MD Name]', focus: '20+ yrs turnkey packaging & process automation' },
                { role: 'Head of Controls & Robotics', name: '[PLACEHOLDER: Controls Lead Name]', focus: 'Siemens/Rockwell PLC, SCADA, WCS & vision systems' },
                { role: 'Head of Fabrication & Quality', name: '[PLACEHOLDER: QA Manager Name]', focus: 'ISO 9001:2015, CE Technical Files & SS316L metallurgy' },
                { role: 'International Exports & Proposals', name: '[PLACEHOLDER: Export Head Name]', focus: 'Global RFQ estimation, Incoterms & SAT commissioning' },
              ].map((member) => (
                <div key={member.role} className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold text-[#ff6a13]">{member.role}</p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">{member.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{member.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-[#1a2a4e] p-8 text-white sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Schedule a Live Virtual Walk-Through of Our Chennai Plant</h2>
              <p className="mt-1 text-sm text-slate-300">
                Meet our controls and mechanical leads live from our assembly floor.
              </p>
            </div>
            <Link
              to="/contact-us/"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#ff6a13] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e55a08] whitespace-nowrap"
            >
              Contact Export Desk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
