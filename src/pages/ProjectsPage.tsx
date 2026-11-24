import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/servicesExportProjectsResources';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';

export default function ProjectsPage() {
  const [regionFilter, setRegionFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const regions = useMemo(() => ['All', ...Array.from(new Set(PROJECTS.map((p) => p.region)))], []);
  const industries = useMemo(() => ['All', ...Array.from(new Set(PROJECTS.map((p) => p.industry)))], []);
  const types = useMemo(() => ['All', ...Array.from(new Set(PROJECTS.map((p) => p.productType)))], []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (regionFilter !== 'All' && p.region !== regionFilter) return false;
      if (industryFilter !== 'All' && p.industry !== industryFilter) return false;
      if (typeFilter !== 'All' && p.productType !== typeFilter) return false;
      return true;
    });
  }, [regionFilter, industryFilter, typeFilter]);

  const breadcrumbs: BreadcrumbCrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Projects' },
  ];

  return (
    <>
      <SeoHead
        title="Global Export Projects & Case Studies | V Tech Manufacturing"
        description="Explore V Tech Manufacturing export installations across USA, Germany, UAE, Saudi Arabia, Nigeria, Vietnam, and Australia."
        breadcrumbs={breadcrumbs}
      />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">
            Global Installations &amp; Field Proof
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Commissioned Machinery &amp; Turnkey Line Case Studies
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200">
            Filter our export deployments by destination region, industry vertical, or equipment division.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Interactive Filters */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-[#f5f7fa] p-5 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Filter by Region / Country
              </label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r === 'All' ? 'All Global Regions' : r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Filter by Industry
              </label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
              >
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i === 'All' ? 'All Industries' : i}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Filter by Equipment Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Equipment Types' : t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 flex items-center justify-between text-xs text-slate-600">
            <span>
              Showing <strong className="text-slate-900">{filtered.length}</strong> of {PROJECTS.length} featured export installations
            </span>
            {(regionFilter !== 'All' || industryFilter !== 'All' || typeFilter !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setRegionFilter('All');
                  setIndustryFilter('All');
                  setTypeFilter('All');
                }}
                className="font-semibold text-[#1a2a8c] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-xl border border-slate-200 bg-[#f5f7fa] p-10 text-center">
              <p className="text-base font-bold text-slate-900">No projects match this exact filter combination.</p>
              <button
                type="button"
                onClick={() => {
                  setRegionFilter('All');
                  setIndustryFilter('All');
                  setTypeFilter('All');
                }}
                className="mt-4 rounded-lg bg-[#1a2a8c] px-4 py-2 text-xs font-semibold text-white"
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {filtered.map((proj) => (
                <article
                  key={proj.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <MachineVisual src={proj.image} alt={proj.title} aspectClass="aspect-[16/9]" />
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {proj.country} · {proj.industry} · {proj.productType}
                      </p>
                      <h2 className="mt-1.5 text-xl font-bold text-slate-900">{proj.title}</h2>
                      <p className="mt-1 text-xs font-medium text-slate-500">Client: {proj.clientName}</p>

                      <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700">
                        <p>
                          <strong className="text-slate-900">Challenge: </strong>
                          {proj.challenge}
                        </p>
                        <p>
                          <strong className="text-slate-900">V Tech Solution: </strong>
                          {proj.solution}
                        </p>
                      </div>

                      <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-700">
                        {proj.results.map((r) => (
                          <li key={r} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-xs font-semibold text-slate-500">Machines Deployed:</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                        {proj.machinesUsed.map((m) => (
                          <Link
                            key={m.path}
                            to={m.path}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a2a8c] hover:underline"
                          >
                            {m.label} <ArrowRight className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
