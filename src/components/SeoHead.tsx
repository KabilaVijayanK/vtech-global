import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface BreadcrumbCrumb {
  label: string;
  path?: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbCrumb[];
  productSchema?: {
    name: string;
    description: string;
    image: string;
    category: string;
    sku: string;
  };
  faqs?: { question: string; answer: string }[];
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackConversionEvent(eventName: string, params: Record<string, string> = {}) {
  try {
    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
  } catch {
    // Ignore analytics errors
  }
}

export default function SeoHead({
  title,
  description,
  breadcrumbs,
  productSchema,
  faqs,
}: SeoHeadProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    const origin = window.location.origin;
    const canonicalUrl = `${origin}${pathname.endsWith('/') ? pathname : `${pathname}/`}`;
    setMeta('property', 'og:url', canonicalUrl);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let hreflang = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.setAttribute('rel', 'alternate');
      hreflang.setAttribute('hreflang', 'en');
      document.head.appendChild(hreflang);
    }
    hreflang.setAttribute('href', canonicalUrl);

    // JSON-LD Structured Data
    const existingScript = document.getElementById('vtech-jsonld');
    if (existingScript) existingScript.remove();

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'V Tech Manufacturing',
        alternateName: 'V TECH',
        url: origin,
        logo: `${origin}/assets/aistudio/logo__1__0c301533.png`,
        slogan: 'Solution partner for your process',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'International Sales & Export RFQ',
          email: 'exports@vtechmanufacturing.com',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${origin}/#factory`,
        name: 'V Tech Manufacturing — Chennai Engineering Works',
        url: origin,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '[PLACEHOLDER: Plot No. & Industrial Estate, Ambattur / Sriperumbudur]',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          postalCode: '600058',
          addressCountry: 'IN',
        },
        openingHours: 'Mo-Sa 09:00-18:00',
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.label,
          ...(crumb.path ? { item: `${origin}${crumb.path}` } : {}),
        })),
      });
    }

    if (productSchema) {
      graph.push({
        '@type': 'Product',
        name: productSchema.name,
        description: productSchema.description,
        sku: productSchema.sku,
        category: productSchema.category,
        image: `${origin}${productSchema.image}`,
        brand: {
          '@type': 'Brand',
          name: 'V Tech Manufacturing',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'V Tech Manufacturing',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/MadeToOrder',
          priceCurrency: 'USD',
          url: canonicalUrl,
        },
      });
    }

    if (faqs && faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    const script = document.createElement('script');
    script.id = 'vtech-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
    document.head.appendChild(script);
  }, [title, description, pathname, breadcrumbs, productSchema, faqs]);

  return null;
}
