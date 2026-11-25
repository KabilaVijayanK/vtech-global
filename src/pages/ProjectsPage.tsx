import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, X } from 'lucide-react';
import { PROJECTS } from '../data/servicesExportProjectsResources';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';

type Project = (typeof PROJECTS)[number];

/* ------------------------------------------------------------------ */
/* Map data: simplified continents (lon, lat) drawn as a dot-matrix map */
/* ------------------------------------------------------------------ */
const VB_Y = 30;
const VB_H = 390;
const px = (lon: number) => ((lon + 180) / 360) * 1000;
const py = (lat: number) => ((90 - lat) / 180) * 500;

const LAND: [number, number][][] = [
  // North America
  [[-168,66],[-156,71],[-125,70],[-95,72],[-82,68],[-62,58],[-56,50],[-66,44],[-76,35],[-81,26],[-90,29],[-97,26],[-97,20],[-92,18],[-87,21],[-88,16],[-83,15],[-80,8],[-84,9],[-92,14],[-105,20],[-110,24],[-115,30],[-118,33],[-124,40],[-124,48],[-135,58],[-150,60],[-165,60]],
  // Greenland
  [[-55,60],[-45,60],[-20,70],[-20,82],[-60,82],[-70,76],[-55,68]],
  // South America
  [[-80,8],[-72,12],[-60,10],[-50,0],[-35,-6],[-39,-14],[-48,-26],[-58,-38],[-65,-42],[-68,-52],[-72,-54],[-74,-45],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-78,2]],
  // Europe
  [[-10,36],[-9,43],[-2,47],[-5,48],[2,51],[8,54],[10,58],[5,62],[15,69],[30,71],[40,66],[40,56],[30,46],[28,41],[23,38],[15,38],[12,44],[3,43],[-5,36]],
  // British Isles
  [[-6,50],[2,51],[0,58],[-6,58]],
  // Africa
  [[-17,21],[-10,30],[-5,36],[10,37],[20,32],[32,31],[34,28],[43,12],[51,12],[41,-2],[40,-15],[35,-25],[27,-34],[18,-34],[12,-18],[9,-1],[8,4],[-8,4],[-17,14]],
  // Asia + Middle East
  [[28,41],[36,36],[35,30],[43,13],[55,17],[59,22],[66,25],[73,20],[77,8],[80,15],[88,22],[92,20],[98,10],[100,2],[104,1],[108,11],[106,20],[122,30],[120,40],[130,43],[141,52],[140,60],[160,62],[180,66],[180,70],[140,73],[100,78],[70,73],[60,68],[40,66],[40,56],[30,46]],
  // Japan
  [[130,32],[135,34],[141,40],[142,45],[140,36]],
  // Borneo / Indonesia
  [[109,1],[117,7],[119,0],[115,-4],[110,-3]],
  [[95,5],[106,-6],[103,-5],[98,0]],
  // Australia
  [[114,-22],[122,-17],[130,-12],[137,-12],[142,-11],[146,-19],[153,-27],[150,-37],[141,-38],[131,-31],[115,-34]],
];

const toPoints = (poly: [number, number][]) => poly.map(([lo, la]) => `${px(lo)},${py(la)}`).join(' ');

const COORDS: Record<string, [number, number]> = {
  usa: [-98, 39], 'united states': [-98, 39], germany: [10.4, 51], uae: [54, 24], 'united arab emirates': [54, 24],
  'saudi arabia': [45, 24], nigeria: [8, 9], vietnam: [106, 16], australia: [134, -25], india: [78, 22],
  'united kingdom': [-2, 54], uk: [-2, 54], kenya: [38, 0], 'south africa': [25, -29], egypt: [30, 27],
  indonesia: [115, -2], canada: [-100, 58], brazil: [-52, -10], bangladesh: [90, 24], 'sri lanka': [81, 7.5],
  ghana: [-1, 8], tanzania: [35, -6], oman: [57, 21], qatar: [51, 25], malaysia: [102, 4], thailand: [101, 15],
  philippines: [122, 13], ethiopia: [40, 9], turkey: [35, 39], mexico: [-102, 23], iraq: [44, 33], kuwait: [47.5, 29.3],
};

const unique = (values: string[]) => Array.from(new Set(values));

export default function ProjectsPage() {
  const [region, setRegion] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [type, setType] = useState('All');
  const [country, setCountry] = useState<string | null>(null);

  const regions = useMemo(() => unique(PROJECTS.map((p) => p.region)), []);
  const industries = useMemo(() => unique(PROJECTS.map((p) => p.industry)), []);
  const types = useMemo(() => unique(PROJECTS.map((p) => p.productType)), []);

  // Everything except the country pick: drives the map pins and the country chips
  const scoped = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (region === 'All' || p.region === region) &&
          (industry === 'All' || p.industry === industry) &&
          (type === 'All' || p.productType === type),
      ),
    [region, industry, type],
  );

  const countries = useMemo(() => {
    const map = new Map<string, number>();
    scoped.forEach((p) => map.set(p.country, (map.get(p.country) ?? 0) + 1));
    return Array.from(map, ([name, count]) => ({ name, count, coord: COORDS[name.toLowerCase()] }));
  }, [scoped]);

  const visible = country ? scoped.filter((p) => p.country === country) : scoped;
  const activeCountry = country && countries.some((c) => c.name === country) ? country : null;
  const shown = activeCountry ? scoped.filter((p) => p.country === activeCountry) : visible;

  const hasFilters = region !== 'All' || industry !== 'All' || type !== 'All' || !!country;
  const reset = () => {
    setRegion('All');
    setIndustry('All');
    setType('All');
    setCountry(null);
  };

  const jumpTo = (id: string) =>
    document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Pick a country and take the visitor straight to that country's projects
  const selectCountry = (name: string | null) => {
    setCountry(name);
    if (name) {
      requestAnimationFrame(() =>
        document.getElementById('project-index')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      );
    }
  };

  const breadcrumbs: BreadcrumbCrumb[] = [{ label: 'Home', path: '/' }, { label: 'Projects' }];
  const selected = countries.find((c) => c.name === activeCountry);

  return (
    <>
      <SeoHead
        title="Global Export Projects & Case Studies | V Tech Manufacturing"
        description="Explore V Tech Manufacturing export installations across USA, Germany, UAE, Saudi Arabia, Nigeria, Vietnam, and Australia."
        breadcrumbs={breadcrumbs}
      />

      {/* ============ MAP STAGE ============ */}
      <section className="relative overflow-hidden bg-[#0b1530] text-white">
        <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Our machines run in {unique(PROJECTS.map((p) => p.country)).length} countries.
              <span className="mt-2 block text-xl font-medium text-slate-400 sm:text-2xl">
                Pick a pin to see what we installed there.
              </span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-slate-300 lg:justify-self-end">
              Every pin is a country where we shipped, installed and commissioned equipment. Use the filters to
              narrow by region, industry or equipment division.
            </p>
          </div>

          {/* Region tabs */}
          <div
            className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter by region"
          >
            {['All', ...regions].map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={region === r}
                onClick={() => {
                  setRegion(r);
                  setCountry(null);
                }}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a13] ${
                  region === r ? 'bg-[#ff6a13] text-white' : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {r === 'All' ? 'Worldwide' : r}
              </button>
            ))}
          </div>
        </div>

        {/* The map */}
        <div className="relative mx-auto mt-4 max-w-[1400px] px-2 pb-6 sm:px-6 lg:px-8">
          <div className="relative" style={{ aspectRatio: `1000 / ${VB_H}` }}>
            <svg
              viewBox={`0 ${VB_Y} 1000 ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="World map showing countries where V Tech has commissioned projects"
            >
              <defs>
                <pattern id="vt-dots" width="7" height="7" patternUnits="userSpaceOnUse">
                  <circle cx="3.5" cy="3.5" r="1.7" fill="#2b3d73" />
                </pattern>
              </defs>
              {LAND.map((poly, i) => (
                <polygon key={i} points={toPoints(poly)} fill="url(#vt-dots)" />
              ))}
            </svg>

            {countries
              .filter((c) => c.coord)
              .map((c) => {
                const [lon, lat] = c.coord;
                const left = (px(lon) / 1000) * 100;
                const top = ((py(lat) - VB_Y) / VB_H) * 100;
                const active = activeCountry === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => selectCountry(active ? null : c.name)}
                    aria-pressed={active}
                    aria-label={`${c.name}: ${c.count} ${c.count === 1 ? 'project' : 'projects'}`}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  >
                    <span
                      className={`absolute inset-0 rounded-full bg-[#ff6a13]/50 motion-safe:animate-ping ${
                        active ? 'opacity-100' : 'opacity-60'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-transform group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-white sm:h-8 sm:w-8 sm:text-xs ${
                        active
                          ? 'border-white bg-white text-[#0b1530]'
                          : 'border-[#0b1530] bg-[#ff6a13] text-white'
                      }`}
                    >
                      {c.count}
                    </span>
                    <span
                      className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-[#0b1530] shadow transition-opacity ${
                        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                );
              })}

            {/* Selected-country panel */}
            {selected && (
              <div className="absolute bottom-2 left-2 z-10 w-[min(20rem,calc(100%-1rem))] rounded-xl border border-white/15 bg-[#0b1530]/95 p-4 shadow-2xl backdrop-blur sm:bottom-4 sm:left-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold">{selected.name}</p>
                    <p className="text-xs text-slate-400">
                      {selected.count} {selected.count === 1 ? 'project' : 'projects'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCountry(null)}
                    aria-label="Clear country"
                    className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {shown.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => jumpTo(p.id)}
                        className="flex w-full items-center justify-between gap-2 rounded-md bg-white/5 px-3 py-2 text-left text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a13]"
                      >
                        <span className="line-clamp-1">{p.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#ff6a13]" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Country list: also covers countries without a map pin */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
            <span className="mr-2 text-xs font-semibold text-slate-400">Countries</span>
            {countries.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-pressed={activeCountry === c.name}
                onClick={() => selectCountry(activeCountry === c.name ? null : c.name)}
                className={`rounded-md border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a13] ${
                  activeCountry === c.name
                    ? 'border-white bg-white text-[#0b1530]'
                    : 'border-white/20 text-slate-200 hover:border-white/50'
                }`}
              >
                {c.name} <span className="opacity-60">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROJECT INDEX ============ */}
      <section id="project-index" className="scroll-mt-4 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#1a2a4e] sm:text-3xl">
                {activeCountry ? `Projects in ${activeCountry}` : 'All case studies'}
              </h2>
              <p className="mt-1 text-sm text-slate-600" aria-live="polite">
                {shown.length} of {PROJECTS.length} projects
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <Select label="Industry" all="All industries" value={industry} onChange={(v) => { setIndustry(v); setCountry(null); }} options={industries} />
              <Select label="Equipment type" all="All equipment" value={type} onChange={(v) => { setType(v); setCountry(null); }} options={types} />
              {hasFilters && (
                <button
                  type="button"
                  onClick={reset}
                  className="col-span-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#1a2a8c] hover:underline sm:col-span-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {shown.length === 0 ? (
            <div className="mt-10 rounded-xl bg-[#f5f7fa] p-10 text-center">
              <p className="font-bold text-slate-900">No projects match these filters</p>
              <button type="button" onClick={reset} className="mt-4 rounded-lg bg-[#1a2a8c] px-4 py-2 text-sm font-semibold text-white">
                Show all projects
              </button>
            </div>
          ) : (
            <div className="mt-10 space-y-14">
              {shown.map((p, i) => (
                <CaseStudy key={p.id} proj={p} flip={i % 2 === 1} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff6a13] py-12 text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <h2 className="max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
            Want your country on this map?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0b1530] px-6 py-3 text-sm font-bold text-white hover:bg-[#1a2a4e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#ff6a13]"
          >
            Request a quotation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ parts ------------------------------ */

function Select({
  label, all, value, onChange, options,
}: { label: string; all: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="sr-only">{`Filter by ${label}`}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a2a8c] sm:min-w-[11rem]"
      >
        <option value="All">{all}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function CaseStudy({ proj, flip }: { proj: Project; flip: boolean }) {
  return (
    <article id={`project-${proj.id}`} className="scroll-mt-6 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`relative lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <div className="overflow-hidden rounded-2xl">
          <MachineVisual src={proj.image} alt={proj.title} aspectClass="aspect-[4/3]" />
        </div>
        <div className="absolute -bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-[#0b1530] px-4 py-2 text-sm font-bold text-white shadow-lg">
          <MapPin className="h-4 w-4 text-[#ff6a13]" aria-hidden="true" />
          {proj.country}
        </div>
      </div>

      <div className="lg:col-span-6">
        <p className="text-sm text-slate-500">
          {proj.industry} · {proj.productType}
        </p>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#1a2a4e] sm:text-3xl">
          {proj.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">Client: {proj.clientName}</p>

        <dl className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
          <div className="border-l-2 border-slate-300 pl-4">
            <dt className="font-bold text-slate-900">Challenge</dt>
            <dd className="mt-0.5">{proj.challenge}</dd>
          </div>
          <div className="border-l-2 border-[#ff6a13] pl-4">
            <dt className="font-bold text-slate-900">V Tech solution</dt>
            <dd className="mt-0.5">{proj.solution}</dd>
          </div>
          <div className="border-l-2 border-[#1a2a8c] pl-4">
            <dt className="font-bold text-slate-900">Result</dt>
            <dd className="mt-0.5">
              <ul className="space-y-1">
                {proj.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {proj.machinesUsed.map((m) => (
            <Link
              key={m.path}
              to={m.path}
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-[#1a2a8c] hover:border-[#1a2a8c] hover:bg-[#1a2a8c]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2a8c]"
            >
              {m.label}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}