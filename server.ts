import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { flattenSitemapPaths, ALL_PRODUCTS } from './src/data/cmsRegistry.ts';
import { HEADLESS_CMS_SCHEMA, RESOURCES } from './src/data/servicesExportProjectsResources.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

interface RfqRecord {
  ticketId: string;
  submittedAt: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  productInterest: string;
  industry: string;
  productHandled: string;
  capacity: string;
  timeline: string;
  attachmentName?: string;
}

const recentRfqs: RfqRecord[] = [];

function sanitizeStr(val: unknown, maxLen = 500): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen).replace(/[<>]/g, '');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSafeWebhookUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host.startsWith('169.254.') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // XML Sitemap covering all 67 routes
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');
    const today = new Date().toISOString().split('T')[0];
    const urls = flattenSitemapPaths();
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
      ...urls.map((p) => {
        const priority = p === '/' ? '1.0' : p.split('/').filter(Boolean).length === 1 ? '0.9' : '0.8';
        return [
          '  <url>',
          `    <loc>${baseUrl}${p}</loc>`,
          `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${p}" />`,
          `    <lastmod>${today}</lastmod>`,
          '    <changefreq>weekly</changefreq>',
          `    <priority>${priority}</priority>`,
          '  </url>',
        ].join('\n');
      }),
      '</urlset>',
    ].join('\n');

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  });

  // Robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(
      `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    );
  });

  // Headless CMS Schema inspection endpoint
  app.get('/api/cms/schema', (_req, res) => {
    res.json(HEADLESS_CMS_SCHEMA);
  });

  // RFQ Submission Endpoint with validation, honeypot spam filter, and optional CRM webhook
  app.post('/api/rfq', async (req, res) => {
    const body = req.body || {};

    // Honeypot anti-spam check
    if (typeof body._gotcha === 'string' && body._gotcha.trim().length > 0) {
      return res.status(200).json({
        success: true,
        ticketId: 'VT-SPAM-IGNORED',
        message: 'Inquiry received.',
      });
    }

    const name = sanitizeStr(body.name, 120);
    const company = sanitizeStr(body.company, 160);
    const country = sanitizeStr(body.country, 100);
    const email = sanitizeStr(body.email, 160);
    const phone = sanitizeStr(body.phone, 60);
    const productInterest = sanitizeStr(body.productInterest, 200);
    const industry = sanitizeStr(body.industry, 120);
    const productHandled = sanitizeStr(body.productHandled, 200);
    const capacity = sanitizeStr(body.capacity, 120);
    const timeline = sanitizeStr(body.timeline, 120);
    const message = sanitizeStr(body.message, 2000);
    const attachmentName = sanitizeStr(body.attachmentName, 180);
    const consent = Boolean(body.consent);

    if (!name || !company || !country || !email || !isValidEmail(email) || !phone || !consent) {
      return res.status(400).json({
        success: false,
        error: 'Please complete all required fields (Name, Company, Country, valid Work Email, Phone, and Consent).',
      });
    }

    const ticketId = `VT-RFQ-${Date.now().toString().slice(-6)}`;
    const record: RfqRecord = {
      ticketId,
      submittedAt: new Date().toISOString(),
      name,
      company,
      country,
      email,
      phone,
      productInterest: productInterest || 'General Process / Turnkey Inquiry',
      industry: industry || 'Not specified',
      productHandled: productHandled || 'Not specified',
      capacity: capacity || 'Not specified',
      timeline: timeline || '3–6 Months',
      attachmentName: attachmentName || undefined,
    };

    recentRfqs.unshift(record);
    if (recentRfqs.length > 50) recentRfqs.pop();

    // Forward to external CRM webhook if configured safely
    const webhookUrl = process.env.CRM_WEBHOOK_URL?.trim();
    let crmForwarded = false;
    if (webhookUrl && isSafeWebhookUrl(webhookUrl)) {
      try {
        const resp = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...record, message }),
          signal: AbortSignal.timeout(5000),
        });
        crmForwarded = resp.ok;
      } catch {
        crmForwarded = false;
      }
    }

    return res.status(201).json({
      success: true,
      ticketId,
      crmForwarded,
      autoReplyPreview: {
        to: email,
        subject: `[${ticketId}] V Tech Manufacturing — Engineering Review Initiated`,
        summary: `Thank you, ${name} (${company}, ${country}). Your inquiry for ${record.productInterest} has been routed to our Chennai International Proposals Desk. Expected technical response within 1 business day.`,
      },
    });
  });

  // Gated Datasheet / Catalog Download Endpoint
  app.post('/api/gated-download', (req, res) => {
    const body = req.body || {};
    const name = sanitizeStr(body.name, 120);
    const email = sanitizeStr(body.email, 160);
    const company = sanitizeStr(body.company, 160);
    const country = sanitizeStr(body.country, 100);
    const assetId = sanitizeStr(body.assetId, 120);

    if (!name || !email || !isValidEmail(email) || !company) {
      return res.status(400).json({
        success: false,
        error: 'Name, company, and a valid work email are required to unlock technical documentation.',
      });
    }

    const matchedProduct = ALL_PRODUCTS.find((p) => p.slug === assetId);
    const matchedResource = RESOURCES.find((r) => r.downloadableAssetId === assetId || r.slug === assetId);

    const title = matchedProduct
      ? `${matchedProduct.name} — Technical Datasheet`
      : matchedResource
      ? matchedResource.title
      : 'V Tech Manufacturing — 2026 Master Machinery & Turnkey Systems Catalog';

    const specLines = matchedProduct
      ? matchedProduct.specs
          .map((s) => `${s.parameter}: ${s.metric} (${s.imperial})`)
          .join('\n')
      : ALL_PRODUCTS.slice(0, 12)
          .map((p) => `- ${p.name}: ${p.shortBenefit} [Lead Time: ${p.leadTime}]`)
          .join('\n');

    const documentContent = [
      'V TECH MANUFACTURING — CHENNAI, INDIA',
      'Tagline: Solution partner for your process',
      'Website: https://vtechmanufacturing.com | Export Desk: exports@vtechmanufacturing.com',
      '========================================================================',
      `DOCUMENT: ${title}`,
      `PREPARED FOR: ${name}, ${company} (${country || 'International'})`,
      `GENERATED: ${new Date().toISOString()}`,
      '========================================================================',
      '',
      matchedProduct ? `OVERVIEW:\n${matchedProduct.overview}\n` : '',
      matchedProduct
        ? `KEY FEATURES:\n${matchedProduct.keyFeatures.map((f) => `* ${f}`).join('\n')}\n`
        : '',
      `TECHNICAL SPECIFICATIONS (METRIC & IMPERIAL):\n${specLines}`,
      '',
      matchedProduct
        ? `COMPLIANCE & STANDARDS:\n${matchedProduct.compliance.join(' | ')}\nLEAD TIME: ${matchedProduct.leadTime}`
        : 'COMPLIANCE: ISO 9001:2015 | CE Ready | GMP SS316L | ATEX Zone 1/2 Options',
      '',
      'EXPORT LOGISTICS & FAT:',
      '* Video FAT or 3rd-Party SGS/TUV/BV Inspection prior to dispatch',
      '* Incoterms 2020: EXW, FOB Chennai, CIF, DAP worldwide',
      '* Voltage Options: 400V/50Hz (EU/MENA/APAC/Africa) or 480V/60Hz (Americas)',
    ]
      .filter(Boolean)
      .join('\n');

    return res.json({
      success: true,
      filename: `${assetId || 'vtech-technical-datasheet'}.txt`,
      title,
      content: documentContent,
    });
  });

  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (_req, res) => {
      const indexHtml = path.join(distPath, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Production build not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`V Tech Manufacturing server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
