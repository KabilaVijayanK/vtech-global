import type { CategorySlug, ProductItem, SitemapNode } from './types';
import { PRODUCT_CATEGORIES, CONVEYOR_PRODUCTS } from './productsConveyors';
import { MACHINERY_PRODUCTS } from './productsMachinery';
import { TURNKEY_SOLUTIONS, INDUSTRIES } from './turnkeyAndIndustries';
import { ENGINEERING_SERVICES, EXPORT_PAGES } from './servicesExportProjectsResources';

export const ALL_PRODUCTS: ProductItem[] = [...CONVEYOR_PRODUCTS, ...MACHINERY_PRODUCTS];

export function normalizeSlug(raw: string): string {
  return raw.replace(/^\/+|\/+$/g, '');
}

export function getCategoryBySlug(slug: string) {
  const clean = normalizeSlug(slug) as CategorySlug;
  return PRODUCT_CATEGORIES.find((c) => c.slug === clean);
}

export function getProductsByCategory(categorySlug: CategorySlug): ProductItem[] {
  return ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(categorySlug: string, productSlug: string): ProductItem | undefined {
  const cat = normalizeSlug(categorySlug);
  const prod = normalizeSlug(productSlug);
  return ALL_PRODUCTS.find((p) => p.categorySlug === cat && p.slug === prod);
}

export function getProductPath(product: ProductItem): string {
  return `/products/${product.categorySlug}/${product.slug}/`;
}

export function getTurnkeyBySlug(slug: string) {
  const clean = normalizeSlug(slug);
  return TURNKEY_SOLUTIONS.find((t) => t.slug === clean);
}

export function getIndustryBySlug(slug: string) {
  const clean = normalizeSlug(slug);
  return INDUSTRIES.find((i) => i.slug === clean);
}

export function getServiceBySlug(slug: string) {
  const clean = normalizeSlug(slug);
  return ENGINEERING_SERVICES.find((s) => s.slug === clean);
}

export function getExportPageBySlug(slug: string) {
  const clean = normalizeSlug(slug);
  return EXPORT_PAGES.find((e) => e.slug === clean);
}

export const SITEMAP_TREE: SitemapNode[] = [
  { title: 'Home', path: '/', template: 'Home' },
  { title: 'About Us', path: '/about-us/', template: 'About' },
  {
    title: 'Products',
    path: '/products/',
    template: 'Category Landing',
    children: PRODUCT_CATEGORIES.map((cat) => ({
      title: cat.title,
      path: `/products/${cat.slug}/`,
      template: 'Category Landing',
      children: getProductsByCategory(cat.slug).map((prod) => ({
        title: prod.name,
        path: getProductPath(prod),
        template: 'Product Detail',
      })),
    })),
  },
  {
    title: 'Turnkey Solutions',
    path: '/turnkey-solutions/',
    template: 'Category Landing',
    children: TURNKEY_SOLUTIONS.map((sol) => ({
      title: sol.title,
      path: `/turnkey-solutions/${sol.slug}/`,
      template: 'Turnkey Solution',
    })),
  },
  {
    title: 'Industries',
    path: '/industries/',
    template: 'Category Landing',
    children: INDUSTRIES.map((ind) => ({
      title: ind.title,
      path: `/industries/${ind.slug}/`,
      template: 'Industry',
    })),
  },
  {
    title: 'Engineering Services',
    path: '/engineering-services/',
    template: 'Category Landing',
    children: ENGINEERING_SERVICES.map((svc) => ({
      title: svc.title,
      path: `/engineering-services/${svc.slug}/`,
      template: 'Engineering Service',
    })),
  },
  {
    title: 'Export & Compliance',
    path: '/export-and-compliance/',
    template: 'Category Landing',
    children: EXPORT_PAGES.map((exp) => ({
      title: exp.title,
      path: `/export-and-compliance/${exp.slug}/`,
      template: 'Export & Compliance',
    })),
  },
  { title: 'Projects', path: '/projects/', template: 'Projects Grid' },
  { title: 'Resources', path: '/resources/', template: 'Resources Hub' },
  { title: 'Contact Us', path: '/contact-us/', template: 'Contact & RFQ' },
  { title: 'Privacy Policy', path: '/privacy-policy/', template: 'Legal' },
  { title: 'Terms of Use', path: '/terms-of-use/', template: 'Legal' },
];

export function flattenSitemapPaths(nodes: SitemapNode[] = SITEMAP_TREE): string[] {
  const paths: string[] = [];
  for (const node of nodes) {
    paths.push(node.path);
    if (node.children) {
      paths.push(...flattenSitemapPaths(node.children));
    }
  }
  return paths;
}
