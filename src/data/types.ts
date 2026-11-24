export interface SpecRow {
  parameter: string;
  metric: string;
  imperial: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type CategorySlug =
  | 'conveyor-material-handling'
  | 'liquid-filling-machinery'
  | 'powder-packaging-machinery'
  | 'warehouse-eol-automation';

export interface ProductCategory {
  slug: CategorySlug;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  highlights: string[];
  industries: string[];
}

export interface ProductItem {
  slug: string;
  categorySlug: CategorySlug;
  name: string;
  shortBenefit: string;
  overview: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  keyFeatures: string[];
  specs: SpecRow[];
  customizationOptions: string[];
  applications: string[];
  industries: string[];
  compliance: string[];
  leadTime: string;
  faqs: FaqItem[];
  relatedSlugs: string[];
}

export interface ProcessStage {
  step: number;
  title: string;
  machineName: string;
  machinePath?: string;
  detail: string;
}

export interface TurnkeySolution {
  slug: string;
  title: string;
  shortBenefit: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  problemStatement: string;
  overview: string;
  throughputMetric: string;
  throughputImperial: string;
  stages: ProcessStage[];
  includedMachinePaths: { label: string; path: string }[];
  caseStudySnippet: {
    clientLabel: string;
    country: string;
    challenge: string;
    outcome: string;
  };
  fatAndInstallation: string[];
  faqs: FaqItem[];
}

export interface IndustryItem {
  slug: string;
  title: string;
  shortBenefit: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  overview: string;
  challenges: string[];
  standards: { code: string; detail: string }[];
  recommendedMachinePaths: { label: string; path: string; role: string }[];
  recommendedTurnkeyPaths: { label: string; path: string }[];
  caseStudy: {
    title: string;
    region: string;
    metricResult: string;
    summary: string;
  };
}

export interface EngineeringService {
  slug: string;
  title: string;
  shortBenefit: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  overview: string;
  methodology: { phase: string; description: string }[];
  deliverables: string[];
  toolsUsed: string[];
  sampleOutputs: { title: string; format: string; detail: string }[];
}

export interface ExportPageData {
  slug: string;
  title: string;
  shortBenefit: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  overview: string;
  sections: {
    heading: string;
    summary: string;
    rows: { label: string; spec: string; notes: string }[];
  }[];
  checklist: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  country: string;
  region: 'USA' | 'Europe' | 'Middle East' | 'Africa' | 'Southeast Asia' | 'Australia';
  industry: string;
  productType: string;
  clientName: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  machinesUsed: { label: string; path: string }[];
}

export interface ResourceArticle {
  id: string;
  slug: string;
  type: 'Technical Guide' | 'Comparison Guide' | 'Catalog & Datasheet' | 'Export Brief';
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  comparisonRows?: {
    criteria: string;
    optionA: string;
    optionB: string;
  }[];
  optionALabel?: string;
  optionBLabel?: string;
  downloadableAssetId?: string;
}

export interface SitemapNode {
  title: string;
  path: string;
  template: string;
  children?: SitemapNode[];
}
