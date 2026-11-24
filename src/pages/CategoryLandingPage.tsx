import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SeoHead, { type BreadcrumbCrumb } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MachineVisual from '../components/MachineVisual';

export interface CategoryLandingCard {
  title: string;
  benefit: string;
  path: string;
  image: string;
  meta?: string;
}

interface CategoryLandingPageProps {
  seoTitle: string;
  seoDescription: string;
  breadcrumbs: BreadcrumbCrumb[];
  eyebrow: string;
  title: string;
  intro: string;
  cards: CategoryLandingCard[];
  highlights?: string[];
  industriesServed?: string[];
  ctaHeading?: string;
}

export default function CategoryLandingPage({
  seoTitle,
  seoDescription,
  breadcrumbs,
  eyebrow,
  title,
  intro,
  cards,
  highlights = [
    'Custom-built in Chennai, India using Siemens, Rockwell, SEW-Eurodrive & Festo components',
    'Documented 48-hour Factory Acceptance Test (FAT) via live video or SGS/TUV inspection',
    'Global voltage builds (400V/50Hz & 480V/60Hz) with CE, cGMP & ATEX options',
    'ISPM-15 seaworthy crating with EXW, FOB Chennai, CIF, or DAP delivery worldwide',
  ],
  industriesServed = [
    'Food & Beverage',
    'Pharmaceuticals & Nutraceuticals',
    'FMCG & Personal Care',
    'Chemicals, Paints & Lubricants',
    'Automotive & EV Manufacturing',
    'Logistics & E-Commerce',
  ],
  ctaHeading = 'Need Help Selecting the Right Configuration for Your Plant?',
}: CategoryLandingPageProps) {
  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} breadcrumbs={breadcrumbs} />

      <section className="border-b border-slate-200 bg-[#1a2a4e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} dark />
          <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6a13]">{eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200">{intro}</p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.path}
                to={card.path}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-[#1a2a8c]"
              >
                <MachineVisual src={card.image} alt={card.title} aspectClass="aspect-[16/10]" />
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {card.meta && <p className="text-xs font-medium text-slate-500">{card.meta}</p>}
                    <h2 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-[#1a2a8c]">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.benefit}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a2a8c]">
                    View Technical Specs <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f5f7fa] py-14">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Why V Tech Engineering</h2>
            <ul className="mt-5 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1a2a8c]" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Industries Served</h2>
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {industriesServed.map((ind) => (
                <div
                  key={ind}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800"
                >
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 rounded-xl border border-slate-200 bg-[#1a2a4e] p-8 text-white sm:flex-row sm:items-center lg:px-10">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">{ctaHeading}</h2>
            <p className="mt-1.5 text-sm text-slate-300">
              Send your required BPM/PPH speed and container geometry for a tailored layout &amp; FOB/CIF quote.
            </p>
          </div>
          <Link
            to="/contact-us/"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#ff6a13] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e55a08] whitespace-nowrap"
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
