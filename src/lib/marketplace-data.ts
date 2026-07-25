/* ═══════════════════════════════════════════
   STRIPE PAYMENT LINKS
   ═══════════════════════════════════════════ */
export const STRIPE_LINKS: Record<string, string> = {
  lite: "https://buy.stripe.com/eVqbJ13dD99m9Fw2gY9Zm0l",
  starter: "https://buy.stripe.com/fZu4gzaG5fxK3h82gY9Zm0o",
  standard: "https://buy.stripe.com/3cI14n15v0CQ04W7Bi9Zm0m",
  premium: "https://buy.stripe.com/9B6dR96pPbhu2d4g7O9Zm0n",
  pro: "https://buy.stripe.com/5kQ14ndShdpC2d4dZG9Zm0p",
};

export function getStripeTier(price: number): string {
  // Tier anchors from business plan: Lite=$2,500, Starter=$3,000, Standard=$5,000, Premium=$8,500, Pro=$15,000
  // Map each price to the closest tier using midpoints
  const midLiteStart = (2500 + 3000) / 2;       // 2750
  const midStartStandard = (3000 + 5000) / 2;    // 4000
  const midStandardPremium = (5000 + 8500) / 2;  // 6750
  const midPremiumPro = (8500 + 15000) / 2;      // 11750
  if (price <= midLiteStart) return "lite";
  if (price <= midStartStandard) return "starter";
  if (price <= midStandardPremium) return "standard";
  if (price <= midPremiumPro) return "premium";
  return "pro";
}

/* ═══════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════ */
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  category: string;
  popular?: boolean;
  stripeLink?: string;
}

export const categoryLookup: Record<string, string> = {
  sales: "Sales Businesses",
  support: "Support Businesses",
  content: "Content Businesses",
  marketing: "Marketing Businesses",
  automation: "Automation Businesses",
  research: "Research Businesses",
  "local-services": "Local Service Businesses",
  "lead-generation": "Lead-Generation Systems",
  seo: "SEO Businesses",
  "niche-authority": "Niche Authority Sites",
  membership: "Membership Businesses",
  "report-vaults": "Report Vaults",
  "ai-assistant": "AI Assistant Businesses",
  "vertical-saas": "Vertical SaaS Starter Kits",
};

export const categoryDescriptions: Record<string, string> = {
  sales: "AI-powered outbound and closing systems",
  support: "Customer service and ticket automation",
  content: "SEO content engines and publishing",
  marketing: "Campaign management and ad optimization",
  automation: "Workflow and integration systems",
  research: "Market intelligence and signal analysis",
  "local-services": "Lead-gen and operations for local pros",
  "lead-generation": "Cold outreach and pipeline automation",
  seo: "Audit, rank-tracking, and optimization",
  "niche-authority": "Content-first domain authority builders",
  membership: "Subscription and community platforms",
  "report-vaults": "Intelligence subscription businesses",
  "ai-assistant": "Conversational AI and agent systems",
  "vertical-saas": "Niche software-as-a-service templates",
};

export function formatPrice(price: number): string {
  return "$" + price.toLocaleString();
}

export const allProducts: Record<string, Product[]> = {
  sales: [
    {
      id: "cold-email-outreach-engine",
      name: "Cold Email Outreach Engine",
      price: 3500,
      description: "AI-powered outreach with lead scraping, email sequences, and A/B testing — launch campaigns that convert at scale.",
      features: ["AI lead scraping & enrichment", "Multi-step email sequences", "A/B testing engine", "Reply detection & routing", "Deliverability monitoring", "CRM auto-sync"],
      category: "sales",
      popular: true,
    },
    {
      id: "sales-follow-up-automation",
      name: "Sales Follow-Up Automation",
      price: 2500,
      description: "Automatic SMS/email follow-ups, meeting booking, and pipeline tracking so no lead slips through the cracks.",
      features: ["SMS + email sequences", "Smart meeting scheduler", "Pipeline stage tracking", "Deal probability scoring", "Activity timeline", "Team assignment rules"],
      category: "sales",
    },
  ],
  support: [
    {
      id: "ai-ticket-resolution-system",
      name: "AI Ticket Resolution System",
      price: 4000,
      description: "Auto-respond to 80% of support tickets with AI, escalate remaining — slash response times while keeping quality.",
      features: ["AI auto-classification", "Knowledge-base integration", "Smart escalation rules", "SLA monitoring", "Customer sentiment tracking", "Analytics dashboard"],
      category: "support",
    },
    {
      id: "client-onboarding-automation",
      name: "Client Onboarding Automation",
      price: 3000,
      description: "Welcome sequences, document collection, and milestone tracking — onboarding that delights from day one.",
      features: ["Welcome email sequences", "Document collection portal", "Milestone checklists", "Progress dashboards", "Integration with CRMs", "Client satisfaction surveys"],
      category: "support",
    },
  ],
  content: [
    {
      id: "seo-content-engine",
      name: "SEO Content Engine",
      price: 5000,
      description: "Auto-generates keyword-optimized blog posts at scale, with internal linking and content calendars built-in.",
      features: ["Keyword research automation", "AI content generation", "Internal linking optimizer", "Content calendar", "Performance tracking", "Multi-language support"],
      category: "content",
    },
    {
      id: "social-media-repurposer",
      name: "Social Media Repurposer",
      price: 2500,
      description: "Turns long-form content into posts, reels, and threads — publish everywhere from one piece of content.",
      features: ["Content-to-social converter", "Platform-specific formatting", "Hashtag optimization", "Scheduling queue", "Analytics tracking", "Brand voice customization"],
      category: "content",
    },
  ],
  marketing: [
    {
      id: "ad-optimization-agent",
      name: "Ad Optimization Agent",
      price: 4500,
      description: "AI agent that optimizes ad spend across Google & Facebook — maximize ROAS with automated adjustments.",
      features: ["Cross-platform bid management", "Creative A/B testing", "Audience segmentation", "Real-time alerts", "Budget pacing", "ROAS optimization"],
      category: "marketing",
      popular: true,
    },
    {
      id: "multi-channel-marketing-dashboard",
      name: "Multi-Channel Marketing Dashboard",
      price: 7500,
      description: "Unified dashboard for all marketing channels with AI insights — one view to rule your marketing stack.",
      features: ["Multi-channel integration", "Custom report builder", "Automated PDF exports", "KPI alerting", "Attribution modeling", "Team collaboration"],
      category: "marketing",
    },
  ],
  automation: [
    {
      id: "zapier-ai-workflow-system",
      name: "Zapier AI Workflow System",
      price: 2500,
      description: "Pre-built automated workflows with AI decision nodes — connect your stack and let AI handle the logic.",
      features: ["50+ pre-built Zaps", "AI decision nodes", "Error handling", "Monitoring dashboard", "Template library", "Custom webhook support"],
      category: "automation",
    },
    {
      id: "cross-platform-data-sync",
      name: "Cross-Platform Data Sync",
      price: 5000,
      description: "Keep your tools in sync automatically — real-time data syncing between 30+ platforms with conflict resolution.",
      features: ["30+ platform connectors", "Real-time sync", "Conflict resolution", "Field mapping UI", "Sync history", "Data validation rules"],
      category: "automation",
    },
  ],
  research: [
    {
      id: "market-intelligence-scanner",
      name: "Market Intelligence Scanner",
      price: 6000,
      description: "Scans search data, social signals, and competitor moves — weekly briefs on where to play and how to win.",
      features: ["Search trend analysis", "Social signal monitoring", "Competitor tracking", "Weekly brief reports", "Opportunity scoring", "Industry benchmarks"],
      category: "research",
    },
    {
      id: "competitor-analysis-agent",
      name: "Competitor Analysis Agent",
      price: 4000,
      description: "AI-powered competitor tracking with pricing, feature, and positioning analysis — know your market cold.",
      features: ["Competitor pricing tracking", "Feature comparison matrix", "Positioning analysis", "SWOT generator", "Alert system", "Monthly executive reports"],
      category: "research",
    },
  ],
  "local-services": [
    {
      id: "local-service-lead-gen",
      name: "Local Service Lead Gen",
      price: 5000,
      description: "Google Business Profile optimizer, review management, and local SEO — dominate your service area.",
      features: ["GBP optimization", "Review management", "Local citation building", "Rank tracking", "Lead routing", "Booking integration"],
      category: "local-services",
    },
    {
      id: "home-service-booking-system",
      name: "Home Service Booking System",
      price: 7000,
      description: "Complete booking and dispatch for plumbers, electricians, HVAC — run your field service business like clockwork.",
      features: ["Online booking", "Dispatch routing", "SMS reminders", "Payment collection", "Customer history", "Technician app"],
      category: "local-services",
    },
  ],
  "lead-generation": [
    {
      id: "linkedin-outreach-automation",
      name: "LinkedIn Outreach Automation",
      price: 3500,
      description: "Connection requests, follow-ups, and message sequences — build relationships at scale on LinkedIn.",
      features: ["Profile scraping", "Connection sequences", "Message personalization", "Response tracking", "CRM integration", "Daily limits management"],
      category: "lead-generation",
    },
    {
      id: "b2b-lead-scraping-engine",
      name: "B2B Lead Scraping Engine",
      price: 5000,
      description: "Find and enrich B2B leads from multiple sources — build targeted lists in minutes not days.",
      features: ["Multi-source scraping", "Contact enrichment", "Company firmographics", "List segmentation", "CSV exports", "CRM push"],
      category: "lead-generation",
    },
  ],
  seo: [
    {
      id: "seo-audit-automation",
      name: "SEO Audit Automation",
      price: 4000,
      description: "Technical SEO audits with fix recommendations — sell audits as a service or use for your own sites.",
      features: ["Site crawling", "Issue detection", "Priority scoring", "Fix recommendations", "White-label reports", "Scheduled scans"],
      category: "seo",
    },
    {
      id: "rank-tracking-dashboard",
      name: "Rank Tracking Dashboard",
      price: 3000,
      description: "Track keyword rankings across search engines with competitor comparison — know where you stand.",
      features: ["Keyword tracking", "Competitor comparison", "Position history", "SERP feature tracking", "White-label reports", "Automated alerts"],
      category: "seo",
    },
  ],
  "niche-authority": [
    {
      id: "niche-content-authority-builder",
      name: "Niche Content Authority Builder",
      price: 8000,
      description: "Content strategy, writing, and SEO — build topical authority and own your niche's search results.",
      features: ["Topic cluster planning", "Content brief generation", "AI writing assistance", "Internal linking optimizer", "Authority scoring", "Competitor gap analysis"],
      category: "niche-authority",
    },
    {
      id: "domain-authority-accelerator",
      name: "Domain Authority Accelerator",
      price: 5000,
      description: "Link building outreach, guest post management, and authority tracking — boost your domain authority.",
      features: ["Prospect discovery", "Outreach automation", "Guest post management", "Link tracking", "Authority metrics", "ROI reporting"],
      category: "niche-authority",
    },
  ],
  membership: [
    {
      id: "subscription-community-platform",
      name: "Subscription Community Platform",
      price: 9000,
      description: "Paid community with courses, forums, and member portal — launch your own membership business.",
      features: ["Member tiers", "Course delivery", "Community forums", "Payment processing", "Member analytics", "Email automation"],
      category: "membership",
    },
    {
      id: "newsletter-membership-engine",
      name: "Newsletter Membership Engine",
      price: 3500,
      description: "Paid newsletter with drip content and subscriber management — monetize your expertise.",
      features: ["Drip content sequences", "Subscriber tiers", "Payment integration", "Email automation", "Content calendar", "Subscriber analytics"],
      category: "membership",
    },
  ],
  "report-vaults": [
    {
      id: "niche-intelligence-vault",
      name: "Niche Intelligence Vault",
      price: 6000,
      description: "Weekly market reports, signal scanning, and subscriber portal — sell intelligence as a service.",
      features: ["Weekly report generation", "Signal scanning engine", "Subscriber portal", "Report customization", "Data visualizations", "White-label exports"],
      category: "report-vaults",
    },
    {
      id: "industry-trend-tracker",
      name: "Industry Trend Tracker",
      price: 4000,
      description: "Monthly trend reports with data visualizations and analysis — become the authority in your industry.",
      features: ["Trend detection algorithms", "Data visualization", "Monthly PDF reports", "Historical comparisons", "Alert system", "Custom industry setup"],
      category: "report-vaults",
    },
  ],
  "ai-assistant": [
    {
      id: "customer-support-ai-agent",
      name: "Customer Support AI Agent",
      price: 8000,
      description: "Full conversational AI with memory, tools, and handoff — resolve issues before a human is needed.",
      features: ["Conversational memory", "Tool integration", "Smart handoff", "Multi-language", "Sentiment analysis", "Knowledge base sync"],
      category: "ai-assistant",
    },
    {
      id: "lead-qualification-assistant",
      name: "Lead Qualification Assistant",
      price: 5000,
      description: "AI chatbot that qualifies leads before human handoff — your sales team only talks to ready buyers.",
      features: ["Qualification flows", "Scoring engine", "Calendar booking", "CRM integration", "Custom questions", "Handoff automation"],
      category: "ai-assistant",
    },
  ],
  "vertical-saas": [
    {
      id: "invoice-saas-starter",
      name: "Invoice SaaS Starter",
      price: 10000,
      description: "Complete invoicing SaaS with Stripe, client portal, and reporting — launch your own SaaS business.",
      features: ["Stripe integration", "Client portal", "Template builder", "Recurring invoices", "Reporting dashboard", "Multi-tenant architecture"],
      category: "vertical-saas",
    },
    {
      id: "appointment-booking-saas",
      name: "Appointment Booking SaaS",
      price: 8000,
      description: "Booking platform with calendar sync, reminders, and payment — own the scheduling market.",
      features: ["Calendar sync", "SMS/email reminders", "Payment collection", "Team scheduling", "Custom branding", "Analytics dashboard"],
      category: "vertical-saas",
    },
  ],
};
