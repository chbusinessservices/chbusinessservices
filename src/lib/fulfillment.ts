/* ═══════════════════════════════════════════
   FULFILLMENT DATA MODULE
   Maps every product/tier to its deliverables,
   setup + access instructions, support info,
   and an email template for automated delivery.
   ═══════════════════════════════════════════ */

/**
 * Public site URL used to build post-checkout redirect URLs.
 * This is the live published origin for port 3000.
 */
export const FULFILLMENT_SITE_URL =
  "https://36f54c004dd2d60f19fb38429ebec613.ctonew.app";

/** Business support / fulfillment inbox */
export const SUPPORT_EMAIL =
  "ch-business-services-5ded11b8@ctomail.io";

/** Calendly-style placeholder for onboarding-call scheduling (premium/pro). */
export const ONBOARDING_BOOKING_URL =
  "https://calendly.com/ch-business-services/onboarding";

/* ─── Types ─── */

export type DeliverableType =
  | "download"
  | "access"
  | "instruction"
  | "schedule";

export interface Deliverable {
  title: string;
  description: string;
  type: DeliverableType;
}

export interface FulfillmentKit {
  /** tier key (lite/starter/standard/premium/pro) or service slug */
  tier: string;
  /** human-readable kit / product name */
  kitName: string;
  /** items the customer receives */
  deliverables: Deliverable[];
  /** placeholder download path for the bundled kit */
  downloadUrl: string;
  /** ordered setup steps */
  setupInstructions: string[];
  /** how to access included tools / platforms */
  accessInstructions: string[];
  /** support inbox + next steps */
  supportContact: string;
  /** "Instant" | "Within 24 hours" etc. */
  estimatedDeliveryTime: string;
  /** whether this tier includes an onboarding call CTA */
  includesOnboardingCall: boolean;
}

/* ─── Kit definitions ─── */

const baseSetupSteps = (kitName: string): string[] => [
  `Download the ${kitName} kit (.zip) using the download button above.`,
  "Unzip the archive and review the included README.md for an overview of every file and folder.",
  "Open config.yaml and replace placeholder values (API keys, brand name, domains) with your own.",
  "Follow the setup guide for the core workflow — it walks you through wiring up the primary automation.",
  "Run the included smoke test script to confirm everything is connected and responding.",
  "Activate your agent definitions and prompt set in your preferred AI tooling.",
];

const baseAccessInstructions = (kitName: string): string[] => [
  `The full ${kitName} bundle is delivered as a single .zip download from this page.`,
  "API credentials (placeholders) live in config.yaml — you will need to provision your own keys for Stripe, your CRM, email provider, and AI model.",
  "A guided setup walkthrough is included as setup-guide.pdf inside the kit.",
  `For any access issue, email ${SUPPORT_EMAIL} with your order details and we will respond within one business day.`,
];

const liteKit: FulfillmentKit = {
  tier: "lite",
  kitName: "AI Business Kit — Lite",
  deliverables: [
    { title: "Agent Definitions", description: "Core AI agent role + behavior definitions in YAML.", type: "download" },
    { title: "Prompt Library", description: "10 production-ready prompts tuned for the kit's domain.", type: "download" },
    { title: "Config Files", description: "Pre-wired config.yaml with integration placeholders.", type: "download" },
    { title: "Basic Documentation", description: "README + quickstart guide to get running fast.", type: "instruction" },
  ],
  downloadUrl: "/downloads/lite-kit.zip",
  setupInstructions: baseSetupSteps("Lite Kit"),
  accessInstructions: baseAccessInstructions("Lite Kit"),
  supportContact: `Email ${SUPPORT_EMAIL} — 30 days of email support included.`,
  estimatedDeliveryTime: "Instant",
  includesOnboardingCall: false,
};

const starterKit: FulfillmentKit = {
  tier: "starter",
  kitName: "AI Business Kit — Starter",
  deliverables: [
    { title: "Brand & Positioning Assets", description: "Brand name, tagline, positioning one-pager.", type: "download" },
    { title: "Conversion Website Template", description: "Launch-ready site template with copy + design system.", type: "download" },
    { title: "Complete Prompt & Agent Set", description: "Full agent definitions + 25-domain prompt library.", type: "download" },
    { title: "Automation Workflows", description: "Pre-built workflow definitions (CRM, email, follow-up).", type: "download" },
    { title: "Sales Flow Assets", description: "Outreach templates, pricing pages, checkout flow.", type: "download" },
    { title: "Setup Guide", description: "Step-by-step setup walkthrough (PDF).", type: "instruction" },
  ],
  downloadUrl: "/downloads/starter-kit.zip",
  setupInstructions: baseSetupSteps("Starter Kit"),
  accessInstructions: baseAccessInstructions("Starter Kit"),
  supportContact: `Email ${SUPPORT_EMAIL} — 30 days of email support included.`,
  estimatedDeliveryTime: "Instant",
  includesOnboardingCall: false,
};

const standardKit: FulfillmentKit = {
  tier: "standard",
  kitName: "AI Business Kit — Standard",
  deliverables: [
    ...starterKit.deliverables,
    { title: "Report Logic & Intelligence Engine", description: "Weekly report generation + signal scanning module.", type: "download" },
    { title: "Multi-Agent Orchestration (Core)", description: "Coordinator agent that routes work across specialist agents.", type: "download" },
    { title: "Analytics Dashboard", description: "KPI dashboard template with sample data connectors.", type: "access" },
  ],
  downloadUrl: "/downloads/standard-kit.zip",
  setupInstructions: baseSetupSteps("Standard Kit"),
  accessInstructions: baseAccessInstructions("Standard Kit"),
  supportContact: `Email ${SUPPORT_EMAIL} — 60 days of priority email support included.`,
  estimatedDeliveryTime: "Instant",
  includesOnboardingCall: false,
};

const premiumKit: FulfillmentKit = {
  tier: "premium",
  kitName: "AI Business Kit — Premium",
  deliverables: [
    ...standardKit.deliverables,
    { title: "Premium Support", description: "Priority response + dedicated Slack channel access.", type: "access" },
    { title: "Onboarding Call", description: "60-minute kickoff call to scope your launch.", type: "schedule" },
  ],
  downloadUrl: "/downloads/premium-kit.zip",
  setupInstructions: baseSetupSteps("Premium Kit"),
  accessInstructions: baseAccessInstructions("Premium Kit"),
  supportContact: `Email ${SUPPORT_EMAIL} — 90 days of premium support + onboarding call.`,
  estimatedDeliveryTime: "Instant",
  includesOnboardingCall: true,
};

const proKit: FulfillmentKit = {
  tier: "pro",
  kitName: "AI Business Kit — Pro",
  deliverables: [
    ...premiumKit.deliverables,
    { title: "Full Multi-Agent Orchestration", description: "Advanced orchestration with tool integration, memory, and handoff.", type: "download" },
    { title: "Complete Marketing Asset Pack", description: "Ads, landing pages, email sequences, social kit.", type: "download" },
    { title: "White-Label License", description: "Resell/rebrand rights for the kit within your business.", type: "access" },
    { title: "Onboarding Call", description: "90-minute strategy + implementation kickoff call.", type: "schedule" },
  ],
  downloadUrl: "/downloads/pro-kit.zip",
  setupInstructions: baseSetupSteps("Pro Kit"),
  accessInstructions: baseAccessInstructions("Pro Kit"),
  supportContact: `Email ${SUPPORT_EMAIL} — 120 days of premium support + onboarding call.`,
  estimatedDeliveryTime: "Instant",
  includesOnboardingCall: true,
};

/* ─── Service products ─── */

const automationStarter: FulfillmentKit = {
  tier: "automation-starter",
  kitName: "Automation Starter ($500/mo)",
  deliverables: [
    { title: "CRM & Pipeline Setup", description: "We configure your CRM + pipeline stages.", type: "instruction" },
    { title: "Lead Qualification Workflow", description: "Automated lead routing + qualification rules.", type: "access" },
    { title: "Follow-Up Sequences", description: "Email + SMS follow-up automation.", type: "access" },
    { title: "Onboarding Brief", description: "Discovery questionnaire to scope your setup.", type: "instruction" },
  ],
  downloadUrl: "/downloads/automation-starter.zip",
  setupInstructions: [
    "Complete the onboarding brief linked in your welcome email.",
    "We schedule a 30-minute kickoff within one business day.",
    "Grant access to your CRM + communication tools (instructions provided).",
    "We deploy your workflows and share a live status dashboard.",
  ],
  accessInstructions: [
    "Onboarding brief is delivered by email within 1 hour of purchase.",
    "Workflow access is provisioned once onboarding is complete (~3 business days).",
    `Reach ${SUPPORT_EMAIL} anytime during onboarding.`,
  ],
  supportContact: `Email ${SUPPORT_EMAIL} — support included for active subscription.`,
  estimatedDeliveryTime: "Within 24 hours",
  includesOnboardingCall: true,
};

const automationPro: FulfillmentKit = {
  tier: "automation-pro",
  kitName: "Automation Pro ($2,000/mo)",
  deliverables: [
    ...automationStarter.deliverables,
    { title: "Custom Integrations", description: "Bespoke connectors to your existing stack.", type: "access" },
    { title: "Multi-Channel Sequences", description: "Email, SMS, LinkedIn, and voice sequences.", type: "access" },
    { title: "Dedicated Support", description: "Priority support with a dedicated specialist.", type: "access" },
    { title: "Monthly Strategy Call", description: "30-minute monthly optimization review.", type: "schedule" },
  ],
  downloadUrl: "/downloads/automation-pro.zip",
  setupInstructions: automationStarter.setupInstructions,
  accessInstructions: automationStarter.accessInstructions,
  supportContact: `Email ${SUPPORT_EMAIL} — dedicated specialist for active subscription.`,
  estimatedDeliveryTime: "Within 24 hours",
  includesOnboardingCall: true,
};

const conversionSiteSprint: FulfillmentKit = {
  tier: "conversion-site-sprint",
  kitName: "Conversion Site Sprint ($1,500)",
  deliverables: [
    { title: "Positioning & Messaging", description: "Brand positioning + homepage messaging framework.", type: "instruction" },
    { title: "Homepage Copy + Design System", description: "Conversion-optimized copy + Tailwind design system.", type: "download" },
    { title: "Basic SEO Setup", description: "Meta tags, sitemap, and on-page SEO baseline.", type: "instruction" },
    { title: "Deployment", description: "We deploy your site to your domain.", type: "access" },
  ],
  downloadUrl: "/downloads/conversion-site-sprint.zip",
  setupInstructions: [
    "Complete the onboarding questionnaire (sent within 1 hour).",
    "Provide domain + hosting access (instructions provided).",
    "We deliver homepage copy + design within 5 business days.",
    "Review round + deployment to your domain.",
  ],
  accessInstructions: [
    "All assets are delivered as a download on this page and via email.",
    "Deployment requires domain access — we will guide you through granting it.",
    `Questions: ${SUPPORT_EMAIL}.`,
  ],
  supportContact: `Email ${SUPPORT_EMAIL} — 14 days post-launch support included.`,
  estimatedDeliveryTime: "Within 5 business days",
  includesOnboardingCall: false,
};

const customBrief: FulfillmentKit = {
  tier: "custom-brief",
  kitName: "Custom Brief ($500)",
  deliverables: [
    { title: "Niche Validation Brief", description: "Demand signals + market sizing for your niche.", type: "download" },
    { title: "Competitor Analysis", description: "Top competitors + positioning gaps.", type: "download" },
    { title: "Keyword & Demand Map", description: "Search demand + opportunity keywords.", type: "download" },
    { title: "Monetization Path", description: "Recommended revenue model + pricing.", type: "instruction" },
  ],
  downloadUrl: "/downloads/custom-brief.zip",
  setupInstructions: [
    "Tell us your niche / opportunity in the onboarding form (sent within 1 hour).",
    "We research and deliver the brief within 3 business days.",
    "Download the brief + schedule a 20-minute review call (optional).",
  ],
  accessInstructions: [
    "Brief is delivered as a PDF download on this page and via email.",
    `Questions: ${SUPPORT_EMAIL}.`,
  ],
  supportContact: `Email ${SUPPORT_EMAIL} — one revision round included.`,
  estimatedDeliveryTime: "Within 3 business days",
  includesOnboardingCall: false,
};

const growthOsRetainer: FulfillmentKit = {
  tier: "growth-os-retainer",
  kitName: "Growth OS Retainer ($997/mo)",
  deliverables: [
    { title: "Monthly Strategy Session", description: "60-minute strategy + prioritization call.", type: "schedule" },
    { title: "Conversion + Automation Reviews", description: "Monthly audit of your funnel + automations.", type: "instruction" },
    { title: "Priority Support", description: "Priority email + async support.", type: "access" },
    { title: "Monthly Report", description: "Performance + next-steps report.", type: "download" },
  ],
  downloadUrl: "/downloads/growth-os-retainer.zip",
  setupInstructions: [
    "Complete the onboarding questionnaire (sent within 1 hour).",
    "We schedule your kickoff strategy session within 2 business days.",
    "Grant read access to analytics + funnel tools (instructions provided).",
  ],
  accessInstructions: [
    "Onboarding questionnaire is delivered by email within 1 hour of purchase.",
    "Strategy session is scheduled via the booking link in your welcome email.",
    `Support: ${SUPPORT_EMAIL} (priority for active retainers).`,
  ],
  supportContact: `Email ${SUPPORT_EMAIL} — priority support for active retainer.`,
  estimatedDeliveryTime: "Within 24 hours",
  includesOnboardingCall: true,
};

const reportVault: FulfillmentKit = {
  tier: "report-vault",
  kitName: "Report Vault Subscription ($99/mo)",
  deliverables: [
    { title: "Full Report Archive Access", description: "Search + download every published intelligence report.", type: "access" },
    { title: "New Report Drops", description: "New reports delivered as they're published.", type: "access" },
    { title: "Signal Alerts", description: "Email alerts when high-signal opportunities emerge.", type: "access" },
    { title: "Subscriber Portal", description: "Members-only portal with saved searches + bookmarks.", type: "access" },
  ],
  downloadUrl: "/downloads/report-vault.zip",
  setupInstructions: [
    "Check your inbox for a welcome email with your subscriber portal login.",
    "Sign in at /vault using the email you used at checkout.",
    "Bookmark the vault and set your alert preferences.",
  ],
  accessInstructions: [
    "Portal access is provisioned to your checkout email within minutes.",
    "If you don't receive a welcome email, check spam, then contact support.",
    `Help: ${SUPPORT_EMAIL}.`,
  ],
  supportContact: `Email ${SUPPORT_EMAIL} — support included for active subscription.`,
  estimatedDeliveryTime: "Instant",
  includesOnboardingCall: false,
};

/* ─── Lookup ─── */

export const FULFILLMENT_KITS: Record<string, FulfillmentKit> = {
  lite: liteKit,
  starter: starterKit,
  standard: standardKit,
  premium: premiumKit,
  pro: proKit,
  "automation-starter": automationStarter,
  "automation-pro": automationPro,
  "conversion-site-sprint": conversionSiteSprint,
  "custom-brief": customBrief,
  "growth-os-retainer": growthOsRetainer,
  "report-vault": reportVault,
};

/** All tier keys (used for type-checking buy buttons). */
export const ALL_TIER_KEYS = Object.keys(FULFILLMENT_KITS);

/**
 * Resolve a fulfillment kit by tier key. Falls back to a generic kit
 * when the tier is unknown so the success page never crashes.
 */
export function getFulfillmentKit(tier: string | null | undefined): FulfillmentKit {
  if (tier && FULFILLMENT_KITS[tier]) return FULFILLMENT_KITS[tier];
  return {
    tier: tier ?? "unknown",
    kitName: "Your Purchase",
    deliverables: [
      { title: "Order Confirmation", description: "Your order has been received and is being processed.", type: "instruction" },
    ],
    downloadUrl: "",
    setupInstructions: [
      "Check your inbox for a welcome email with next steps.",
      "If you don't see it within a few minutes, contact support.",
    ],
    accessInstructions: [
      "Detailed access instructions are sent by email once your order is confirmed.",
    ],
    supportContact: `Email ${SUPPORT_EMAIL} — we'll get you sorted within one business day.`,
    estimatedDeliveryTime: "Within 24 hours",
    includesOnboardingCall: false,
  };
}

/* ─── Success-URL builder ─── */

/**
 * Build a Stripe Payment Link href that appends a success_url query param
 * pointing back to the post-checkout /success page for the given tier.
 */
export function withSuccessUrl(stripeUrl: string, tier: string): string {
  const successUrl = `${FULFILLMENT_SITE_URL}/success?product=${encodeURIComponent(tier)}`;
  const separator = stripeUrl.includes("?") ? "&" : "?";
  return `${stripeUrl}${separator}success_url=${encodeURIComponent(successUrl)}`;
}

/* ─── Email template ─── */

/**
 * Generate the fulfillment email body for a purchased product.
 * Used by the team agent to send delivery emails when a sale
 * notification arrives.
 */
export function emailTemplate(args: {
  tier: string;
  productName?: string;
  customerName?: string;
}): string {
  const kit = getFulfillmentKit(args.tier);
  const productName = args.productName || kit.kitName;
  const greeting = args.customerName
    ? `Hi ${args.customerName},`
    : "Hi there,";
  const successPageUrl = `${FULFILLMENT_SITE_URL}/success?product=${encodeURIComponent(kit.tier)}`;

  const stepsText = kit.setupInstructions
    .map((s, i) => `  ${i + 1}. ${s}`)
    .join("\n");

  return `${greeting}

Thank you for your purchase of ${productName} from CH Business Services! Your order is confirmed and your kit is ready.

WHAT YOU PURCHASED
${productName}

ACCESS YOUR KIT
View your deliverables, download links, and setup instructions here:
${successPageUrl}
${
  kit.downloadUrl
    ? `\nDirect download: ${FULFILLMENT_SITE_URL}${kit.downloadUrl}`
    : ""
}

SETUP INSTRUCTIONS
${stepsText}

DELIVERY TIME
${kit.estimatedDeliveryTime}

NEED HELP?
${kit.supportContact}
${
  kit.includesOnboardingCall
    ? `\nSCHEDULE YOUR ONBOARDING CALL\nBook a time here: ${ONBOARDING_BOOKING_URL}`
    : ""
}

Welcome aboard — we're excited to help you launch.

— CH Business Services
${SUPPORT_EMAIL}`;
}
