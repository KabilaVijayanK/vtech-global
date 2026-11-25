import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileDown,
  BookOpen,
  GitBranch,
  Database,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Search,
  X,
} from 'lucide-react';
import { RESOURCES, HEADLESS_CMS_SCHEMA } from '../data/servicesExportProjectsResources';
import { SITEMAP_TREE, flattenSitemapPaths } from '../data/cmsRegistry';
import type { SitemapNode } from '../data/types';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { GatedDownloadModal } from '../components/Modals';

type Tab = 'guides' | 'sitemap' | 'cms';

/* ---------- helpers ---------- */

function filterTree(nodes: SitemapNode[], q: string): SitemapNode[] {
  if (!q) return nodes;
  return nodes.flatMap((n) => {
    const hit = `${n.title} ${n.path} ${n.template}`.toLowerCase().includes(q);
    if (hit) return [n];
    const kids = n.children ? filterTree(n.children, q) : [];
    return kids.length ? [{ ...n, children: kids }] : [];
  });
}

const countNodes = (nodes: SitemapNode[]): number =>
  nodes.reduce((sum, n) => sum + 1 + (n.children ? countNodes(n.children) : 0), 0);

/* ---------- sitemap ---------- */

function SitemapBranch({ node, depth = 0, forceOpen }: { node: SitemapNode; depth?: number; forceOpen: boolean }) {
  const [open, setOpen] = useState(depth === 0);
  const hasKids = Boolean(node.children && node.children.length > 0);
  const expanded = forceOpen || open;

  return (
    <li>
      <div className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f5f7fa]">
        {hasKids ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.title}`}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2a8c]"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        ) : (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </span>
        )}

        <Link to={node.path} className="text-sm font-semibold text-[#1a2a8c] hover:underline">
          {node.title}
        </Link>
        <span className="hidden truncate font-mono text-xs text-slate-500 sm:inline">{node.path}</span>
        <span className="ml-auto shrink-0 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
          {node.template}
        </span>
      </div>

      {hasKids && expanded && (
        <ul className="ml-3 border-l border-slate-200 pl-3">
          {node.children!.map((child) => (
            <SitemapBranch key={child.path} node={child} depth={depth + 1} forceOpen={forceOpen} />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ---------- page ---------- */

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('guides');
  const [downloadAsset, setDownloadAsset] = useState<{ id: string; title: string } | null>(null);
  const [query, setQuery] = useState('');

  const breadcrumbs: BreadcrumbCrumb[] = [{ label: 'Home', path: '/' }, { label: 'Resources' }];

  const totalRoutes = flattenSitemapPaths().length;
  const q = query.trim().toLowerCase();
  const tree = useMemo(() => filterTree(SITEMAP_TREE, q), [q]);
  const matchCount = useMemo(() => countNodes(tree), [tree]);

  const tabs: { id: Tab; label: string; short: string; icon: typeof BookOpen; count: number }[] = [
    { id: 'guides', label: 'Technical and comparison guides', short: 'Guides', icon: BookOpen, count: RESOURCES.length },
    { id: 'sitemap', label: 'Sitemap tree', short: 'Sitemap', icon: GitBranch, count: totalRoutes },
    { id: 'cms', label: 'Headless CMS schema', short: 'CMS schema', icon: Database, count: HEADLESS_CMS_SCHEMA.contentTypes.length },
  ];

  return (
    <>
      <SeoHead
        title="Technical Resources, Comparison Guides & Catalogs | V Tech Manufacturing"
        description="Engineering comparison guides (Servo Piston vs Flow-Meter), downloadable 2026 machinery catalogs, export checklists, and CMS architecture."
        breadcrumbs={breadcrumbs}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111d3a] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ff6a13]/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a13]" />
                Engineering knowledge hub
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                Technical guides, comparison tables and downloadable catalogs.
              </h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-slate-300 lg:justify-self-end">
              Practical references for plant directors, process engineers and global procurement teams.
            </p>
          </div>
        </div>
      </section>

      {/* STICKY TABS */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div role="tablist" aria-label="Resource sections" className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:bg-slate-50 ${
                    active
                      ? 'border-[#ff6a13] text-[#1a2a4e]'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden md:inline">{t.label}</span>
                  <span className="md:hidden">{t.short}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-[#ff6a13]/10 text-[#c4500a]' : 'bg-slate-100 text-slate-600'}`}>
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PANELS */}
      <section className="bg-[#f5f7fa] py-10 sm:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* ===== GUIDES ===== */}
          {activeTab === 'guides' && (
            <div id="panel-guides" role="tabpanel" aria-labelledby="tab-guides" className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
              {/* Contents list */}
              <aside className="hidden lg:block">
                <nav aria-label="Guides" className="sticky top-24">
                  <p className="mb-3 text-sm font-bold text-slate-900">In this section</p>
                  <ul className="space-y-1">
                    {RESOURCES.map((res) => (
                      <li key={res.id}>
                        <a
                          href={`#guide-${res.id}`}
                          className="block rounded-lg border-l-2 border-transparent px-3 py-2 text-sm text-slate-600 transition-colors hover:border-[#ff6a13] hover:bg-white hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2a8c]"
                        >
                          <span className="line-clamp-2 font-medium">{res.title}</span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {res.type} · {res.readTime}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              <div className="min-w-0 space-y-8">
                {RESOURCES.map((res) => (
                  <article
                    key={res.id}
                    id={`guide-${res.id}`}
                    className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <header className="flex flex-col gap-5 border-b border-slate-100 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-md bg-[#1a2a8c]/10 px-2 py-0.5 font-semibold text-[#1a2a8c]">{res.type}</span>
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {res.readTime}
                          </span>
                        </div>
                        <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-[#1a2a4e]">{res.title}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{res.summary}</p>
                      </div>

                      {res.downloadableAssetId && (
                        <button
                          type="button"
                          onClick={() => setDownloadAsset({ id: res.downloadableAssetId!, title: res.title })}
                          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#ff6a13] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a13] focus-visible:ring-offset-2"
                        >
                          <FileDown className="h-4 w-4" aria-hidden="true" />
                          Download specification PDF
                        </button>
                      )}
                    </header>

                    <div className="space-y-6 p-6 sm:p-8">
                      {res.comparisonRows && (
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                            <thead>
                              <tr className="bg-[#1a2a4e] text-white">
                                <th scope="col" className="px-4 py-3 text-xs font-semibold text-slate-300">Selection criteria</th>
                                <th scope="col" className="px-4 py-3 text-sm font-bold">{res.optionALabel}</th>
                                <th scope="col" className="px-4 py-3 text-sm font-bold">{res.optionBLabel}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {res.comparisonRows.map((row, i) => (
                                <tr key={row.criteria} className={i % 2 ? 'bg-[#f5f7fa]' : 'bg-white'}>
                                  <th scope="row" className="w-1/4 px-4 py-3 align-top text-sm font-semibold text-slate-900">
                                    {row.criteria}
                                  </th>
                                  <td className="px-4 py-3 align-top text-slate-700">{row.optionA}</td>
                                  <td className="px-4 py-3 align-top text-slate-700">{row.optionB}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="max-w-3xl space-y-3 text-[15px] leading-7 text-slate-700">
                        {res.content.map((para) => (
                          <p key={para}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ===== SITEMAP ===== */}
          {activeTab === 'sitemap' && (
            <div id="panel-sitemap" role="tabpanel" aria-labelledby="tab-sitemap" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-[#1a2a4e]">
                    Full website architecture
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {totalRoutes} indexed routes, all live and served in the sitemap file.
                  </p>
                </div>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#1a2a8c] hover:bg-[#f5f7fa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2a8c] lg:self-auto"
                >
                  Open sitemap.xml
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="border-b border-slate-100 bg-[#fafbfd] px-6 py-4 sm:px-8">
                <label className="relative block max-w-md">
                  <span className="sr-only">Search pages by title, URL or template</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, URL or template"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a2a8c]"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </label>
                {q && (
                  <p className="mt-2 text-xs text-slate-500" aria-live="polite">
                    {matchCount} {matchCount === 1 ? 'page' : 'pages'} shown
                  </p>
                )}
              </div>

              <div className="p-4 sm:p-6">
                {tree.length === 0 ? (
                  <p className="py-10 text-center text-sm text-slate-600">No pages match “{query}”.</p>
                ) : (
                  <ul className="space-y-0.5">
                    {tree.map((node) => (
                      <SitemapBranch key={node.path} node={node} forceOpen={Boolean(q)} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* ===== CMS ===== */}
          {activeTab === 'cms' && (
            <div id="panel-cms" role="tabpanel" aria-labelledby="tab-cms">
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-xl font-extrabold tracking-tight text-[#1a2a4e]">{HEADLESS_CMS_SCHEMA.cmsTarget}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Content types that let non-technical teams publish machines, turnkey lines, projects and guides without touching application code.
                  </p>
                </div>
                <a
                  href="/api/cms/schema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#1a2a8c] hover:bg-[#f5f7fa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2a8c] lg:self-auto"
                >
                  Inspect JSON API
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {HEADLESS_CMS_SCHEMA.contentTypes.map((ct) => (
                  <div key={ct.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="inline-flex w-fit rounded-md bg-[#ff6a13]/10 px-2 py-0.5 font-mono text-xs font-bold text-[#c4500a]">
                      {ct.name}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-slate-900">{ct.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{ct.fields.length} fields</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {ct.fields.map((f) => (
                        <li key={f} className="rounded-md border border-slate-200 bg-[#f5f7fa] px-2 py-1 font-mono text-[11px] text-slate-700">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <GatedDownloadModal
        isOpen={Boolean(downloadAsset)}
        onClose={() => setDownloadAsset(null)}
        assetId={downloadAsset?.id || ''}
        assetTitle={downloadAsset?.title || ''}
      />
    </>
  );
}