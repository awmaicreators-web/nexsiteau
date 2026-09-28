export type PackageTierId = 'essential' | 'high-growth' | 'dedicated-pod';

export interface PackageTier {
  id: PackageTierId;
  name: string;
  badge?: string;
  isPopular?: boolean;
  scopeDuration: string;
  scopeIcon: string;
  priceAud: number;
  billingPeriod: 'fixed' | 'month';
  description: string;
  deliverables: string[];
}

export interface ScopeEnhancement {
  id: string;
  name: string;
  description: string;
  priceAud: number;
  isIncluded?: boolean;
  selected?: boolean;
}

export interface IntakeManifest {
  packageId: PackageTierId;
  billingType: 'fixed' | 'retainer';
  paymentSchedule: 'deposit_50' | 'full_discount';
  enhancements: string[];
  
  // Stakeholder details
  fullName: string;
  workEmail: string;
  companyName: string;
  phoneWhatsapp: string;
  slackHandle: string;
  
  // Project Specifications
  projectNarrative: string;
  assetWireframeLink: string;
  uploadedFileName?: string;
  
  // Direct Gateway Selection
  paymentGateway: 'card' | 'bank_wire' | 'crypto';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  postalCode?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  metrics: {
    stat: string;
    label: string;
    isHighlight?: boolean;
  }[];
  stack: string;
  fullCaseSummary?: string;
  liveUrl?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  provider: 'google' | 'github';
  activeSprint?: {
    package: string;
    stage: string;
    completionPct: number;
    slackChannel: string;
  };
}
