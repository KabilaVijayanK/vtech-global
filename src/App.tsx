import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ExitIntentOffer from './components/ExitIntentOffer';
import HomePage from './pages/HomePage';
import CategoryLandingPage from './pages/CategoryLandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TurnkeyDetailPage from './pages/TurnkeyDetailPage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ExportDetailPage from './pages/ExportDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { PrivacyPolicyPage, TermsOfUsePage, NotFoundPage } from './pages/LegalAndNotFoundPages';
import { PRODUCT_CATEGORIES, IMG_HERO, IMG_CONVEYOR } from './data/productsConveyors';
import { TURNKEY_SOLUTIONS, INDUSTRIES } from './data/turnkeyAndIndustries';
import { ENGINEERING_SERVICES, EXPORT_PAGES } from './data/servicesExportProjectsResources';
import {
  getCategoryBySlug,
  getProductsByCategory,
  getProductBySlug,
  getProductPath,
  getTurnkeyBySlug,
  getIndustryBySlug,
  getServiceBySlug,
  getExportPageBySlug,
} from './data/cmsRegistry';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProductsHubRoute() {
  return (
    <CategoryLandingPage
      seoTitle="Industrial Machinery & Conveyor Categories | V Tech Manufacturing"
      seoDescription="Explore V Tech Manufacturing's four equipment divisions: Conveyors, Liquid Filling, Powder Packaging, and Warehouse & EOL Automation."
      breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Products' }]}
      eyebrow="Equipment Divisions"
      title="Conveyors, Filling, Packaging & Warehouse Automation Machinery"
      intro="Select a machinery division below to inspect individual machine models, metric and imperial technical specifications, compliance options, and export lead times."
      cards={PRODUCT_CATEGORIES.map((c) => ({
        title: c.title,
        benefit: c.tagline,
        path: `/products/${c.slug}/`,
        image: c.image,
        meta: `${getProductsByCategory(c.slug).length} Machine Models`,
      }))}
    />
  );
}

function CategoryRoute() {
  const { categorySlug = '' } = useParams();
  const category = getCategoryBySlug(categorySlug);
  if (!category) return <NotFoundPage />;

  const products = getProductsByCategory(category.slug);
  return (
    <CategoryLandingPage
      seoTitle={category.seoTitle}
      seoDescription={category.seoDescription}
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/products/' },
        { label: category.title },
      ]}
      eyebrow="Product Division"
      title={category.title}
      intro={category.description}
      highlights={category.highlights}
      industriesServed={category.industries}
      cards={products.map((p) => ({
        title: p.name,
        benefit: p.shortBenefit,
        path: getProductPath(p),
        image: p.image,
        meta: `Lead time: ${p.leadTime}`,
      }))}
    />
  );
}

function ProductRoute() {
  const { categorySlug = '', productSlug = '' } = useParams();
  const product = getProductBySlug(categorySlug, productSlug);
  if (!product) return <NotFoundPage />;
  return <ProductDetailPage product={product} />;
}

function TurnkeyHubRoute() {
  return (
    <CategoryLandingPage
      seoTitle="Turnkey Process, Packaging & Automation Lines | V Tech Manufacturing"
      seoDescription="Single-responsibility turnkey liquid filling, powder dosing, warehouse intralogistics, bulk drum handling, and EV assembly lines from India."
      breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Turnkey Solutions' }]}
      eyebrow="Integrated Turnkey Systems"
      title="Turnkey Process, Packaging & Intralogistics Lines"
      intro="Every turnkey line is pre-wired, PLC-synchronized, and wet/dry Factory Acceptance Tested on our Chennai floor before export containerization."
      cards={TURNKEY_SOLUTIONS.map((s) => ({
        title: s.title,
        benefit: s.shortBenefit,
        path: `/turnkey-solutions/${s.slug}/`,
        image: s.image,
        meta: s.throughputMetric,
      }))}
    />
  );
}

function TurnkeyRoute() {
  const { slug = '' } = useParams();
  const solution = getTurnkeyBySlug(slug);
  if (!solution) return <NotFoundPage />;
  return <TurnkeyDetailPage solution={solution} />;
}

function IndustriesHubRoute() {
  return (
    <CategoryLandingPage
      seoTitle="Industries Served Globally | V Tech Manufacturing"
      seoDescription="Automation and packaging solutions for Food & Beverage, Pharmaceuticals, FMCG, Chemicals & Lubricants, Automotive & EV, and 3PL Logistics."
      breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Industries' }]}
      eyebrow="Global Industry Verticals"
      title="Engineered Automation for Six Core Global Industries"
      intro="Each vertical brings unique regulatory, washdown, explosion-proof, or traceability demands. Select your sector to review standards and recommended machinery."
      cards={INDUSTRIES.map((i) => ({
        title: i.title,
        benefit: i.shortBenefit,
        path: `/industries/${i.slug}/`,
        image: i.image,
        meta: i.standards.map((s) => s.code).join(' · '),
      }))}
    />
  );
}

function IndustryRoute() {
  const { slug = '' } = useParams();
  const industry = getIndustryBySlug(slug);
  if (!industry) return <NotFoundPage />;
  return <IndustryDetailPage industry={industry} />;
}

function ServicesHubRoute() {
  return (
    <CategoryLandingPage
      seoTitle="Engineering Services, 3D Simulation & PLC Automation | V Tech"
      seoDescription="Turnkey plant layout & 3D simulation, custom SPM fabrication, Siemens/Rockwell PLC & SCADA integration, and global commissioning."
      breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Engineering Services' }]}
      eyebrow="Engineering Lifecycle Services"
      title="From 3D Line Simulation to Global Commissioning & AMC"
      intro="Beyond building equipment, V Tech supports plant directors and EPC contractors with simulation, bespoke SPM design, automation controls, and field engineering."
      cards={ENGINEERING_SERVICES.map((s) => ({
        title: s.title,
        benefit: s.shortBenefit,
        path: `/engineering-services/${s.slug}/`,
        image: s.image,
        meta: s.toolsUsed.slice(0, 2).join(' · '),
      }))}
    />
  );
}

function ServiceRoute() {
  const { slug = '' } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <NotFoundPage />;
  return <ServiceDetailPage service={service} />;
}

function ExportHubRoute() {
  return (
    <CategoryLandingPage
      seoTitle="Export Readiness, Certifications, FAT & Spares | V Tech Manufacturing"
      seoDescription="Global export standards: ISO 9001, CE, ATEX, GMP, video/SGS FAT, ISPM-15 sea crating, Incoterms (EXW/FOB/CIF/DAP), and 48-hr spares."
      breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Export & Compliance' }]}
      eyebrow="Global Export Assurance"
      title="Certifications, Witnessed FAT, Sea Freight & Spares SLA"
      intro="Built in Chennai for seamless customs clearance, electrical compliance, and reliable lifecycle uptime across North America, Europe, MENA, Africa, and APAC."
      cards={EXPORT_PAGES.map((e, idx) => ({
        title: e.title,
        benefit: e.shortBenefit,
        path: `/export-and-compliance/${e.slug}/`,
        image: idx === 0 ? IMG_HERO : idx === 1 ? IMG_CONVEYOR : e.image,
        meta: 'Global Export Standard',
      }))}
    />
  );
}

function ExportRoute() {
  const { slug = '' } = useParams();
  const page = getExportPageBySlug(slug);
  if (!page) return <NotFoundPage />;
  return <ExportDetailPage page={page} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/about-us/" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/" element={<ProjectsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/" element={<ResourcesPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/contact-us/" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/terms-of-use/" element={<TermsOfUsePage />} />

            {/* Products Hierarchy */}
            <Route path="/products" element={<ProductsHubRoute />} />
            <Route path="/products/" element={<ProductsHubRoute />} />
            <Route path="/products/:categorySlug" element={<CategoryRoute />} />
            <Route path="/products/:categorySlug/" element={<CategoryRoute />} />
            <Route path="/products/:categorySlug/:productSlug" element={<ProductRoute />} />
            <Route path="/products/:categorySlug/:productSlug/" element={<ProductRoute />} />

            {/* Turnkey Solutions */}
            <Route path="/turnkey-solutions" element={<TurnkeyHubRoute />} />
            <Route path="/turnkey-solutions/" element={<TurnkeyHubRoute />} />
            <Route path="/turnkey-solutions/:slug" element={<TurnkeyRoute />} />
            <Route path="/turnkey-solutions/:slug/" element={<TurnkeyRoute />} />

            {/* Industries */}
            <Route path="/industries" element={<IndustriesHubRoute />} />
            <Route path="/industries/" element={<IndustriesHubRoute />} />
            <Route path="/industries/:slug" element={<IndustryRoute />} />
            <Route path="/industries/:slug/" element={<IndustryRoute />} />

            {/* Engineering Services */}
            <Route path="/engineering-services" element={<ServicesHubRoute />} />
            <Route path="/engineering-services/" element={<ServicesHubRoute />} />
            <Route path="/engineering-services/:slug" element={<ServiceRoute />} />
            <Route path="/engineering-services/:slug/" element={<ServiceRoute />} />

            {/* Export & Compliance */}
            <Route path="/export-and-compliance" element={<ExportHubRoute />} />
            <Route path="/export-and-compliance/" element={<ExportHubRoute />} />
            <Route path="/export-and-compliance/:slug" element={<ExportRoute />} />
            <Route path="/export-and-compliance/:slug/" element={<ExportRoute />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ExitIntentOffer />
      </div>
    </BrowserRouter>
  );
}
