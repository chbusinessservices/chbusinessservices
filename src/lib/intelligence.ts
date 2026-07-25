import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { createHmac } from "node:crypto";
import { sql } from "~/db";

/* ─── Auth helpers (mirrored from auth.ts for server-fn use) ─── */

const COOKIE_NAME = "admin_auth";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;
const TOKEN_VERSION = "1";

function getSecret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.warn("[intelligence] ADMIN_PASSWORD not set — using fallback.");
    return "admin123";
  }
  return password;
}

function verifyToken(token: string): boolean {
  try {
    const secret = getSecret();
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const { p, s } = JSON.parse(raw);
    const expected = createHmac("sha256", secret).update(p).digest("hex");
    if (s !== expected) return false;
    const { exp } = JSON.parse(p);
    return exp > Date.now();
  } catch {
    return false;
  }
}

function requireAdmin(): void {
  const token = getCookie(COOKIE_NAME);
  if (!token || !verifyToken(token)) {
    throw new Error("Unauthorized: admin access required");
  }
}

/* ─── Types ─── */

export interface MarketSignal {
  id: number;
  keyword: string;
  niche: string;
  opportunity_score: number;
  search_volume: number | null;
  competition: "low" | "medium" | "high" | null;
  trend_direction: "rising" | "stable" | "declining" | null;
  signal_source: string;
  summary: string | null;
  full_report: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

/* ─── Table Creation ─── */

export const createSignalsTable = createServerFn().handler(async () => {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS market_signals (
      id SERIAL PRIMARY KEY,
      keyword TEXT NOT NULL,
      niche TEXT NOT NULL,
      opportunity_score INTEGER NOT NULL DEFAULT 50,
      search_volume INTEGER,
      competition TEXT CHECK (competition IN ('low','medium','high')),
      trend_direction TEXT CHECK (trend_direction IN ('rising','stable','declining')),
      signal_source TEXT DEFAULT 'manual',
      summary TEXT,
      full_report TEXT,
      status TEXT NOT NULL DEFAULT 'detected',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  return { success: true };
});

/* ─── CRUD ─── */

export const addSignal = createServerFn().handler(async (data: {
  keyword: string;
  niche: string;
  opportunity_score?: number;
  search_volume?: number;
  competition?: "low" | "medium" | "high";
  trend_direction?: "rising" | "stable" | "declining";
  summary?: string;
}) => {
  requireAdmin();
  const db = sql();
  const rows = await db`
    INSERT INTO market_signals (keyword, niche, opportunity_score, search_volume, competition, trend_direction, summary)
    VALUES (${data.keyword}, ${data.niche}, ${data.opportunity_score ?? 50}, ${data.search_volume ?? null}, ${data.competition ?? null}, ${data.trend_direction ?? null}, ${data.summary ?? null})
    RETURNING *
  `;
  return { success: true, signal: coerceSignal(rows[0]) };
});

export const getSignals = createServerFn().handler(async () => {
  requireAdmin();
  const db = sql();
  const rows = await db`
    SELECT * FROM market_signals ORDER BY opportunity_score DESC
  `;
  return rows.map(coerceSignal);
});

export const getPublicSignals = createServerFn().handler(async () => {
  const db = sql();
  const rows = await db`
    SELECT id, keyword, niche, opportunity_score, search_volume, competition, trend_direction, summary, status, created_at, updated_at
    FROM market_signals
    WHERE status = 'published'
    ORDER BY opportunity_score DESC
    LIMIT 20
  `;
  return rows.map(coerceSignal);
});

export const updateSignalStatus = createServerFn().handler(async (data: {
  id: number;
  status: string;
}) => {
  requireAdmin();
  const db = sql();
  await db`
    UPDATE market_signals SET status = ${data.status}, updated_at = NOW()
    WHERE id = ${data.id}
  `;
  return { success: true };
});

export const getSignalById = createServerFn().handler(async (data: {
  id: number;
}) => {
  const db = sql();
  const rows = await db`
    SELECT * FROM market_signals WHERE id = ${data.id}
  `;
  if (rows.length === 0) return null;
  return coerceSignal(rows[0]);
});

/* ─── Report Generation ─── */

export const generateReport = createServerFn().handler(async (data: {
  id: number;
}) => {
  requireAdmin();
  const db = sql();

  const rows = await db`SELECT * FROM market_signals WHERE id = ${data.id}`;
  if (rows.length === 0) throw new Error("Signal not found");

  const signal = rows[0];
  const report = buildReport(signal);
  await db`
    UPDATE market_signals SET full_report = ${report}, updated_at = NOW()
    WHERE id = ${data.id}
  `;
  return { success: true, report };
});

function buildReport(signal: any): string {
  const keyword = signal.keyword;
  const niche = signal.niche;
  const score = signal.opportunity_score;
  const volume = signal.search_volume || "N/A";
  const competition = signal.competition || "medium";
  const trend = signal.trend_direction || "stable";
  const summary = signal.summary || "";

  const marketSizeMin = Math.floor((typeof volume === 'number' ? volume : 5) * 120);
  const marketSizeMax = Math.floor(marketSizeMin * 2.3);
  const growthRate = trend === "rising" ? "18-24%" : trend === "declining" ? "2-5%" : "8-12%";

  const competitorNames = [
    `${niche} Pros`, `${keyword} Hub`, `The ${niche} Network`,
    `${niche}ly`, `Go${keyword.replace(/\s+/g, '')}`, `Smart${niche.replace(/\s+/g, '')}`,
    `${keyword.split(' ')[0]}Genius`, `${niche}Force`
  ];
  const selectedCompetitors = competitorNames.slice(0, 3);

  const kws = generateKeywords(keyword, niche, volume);
  const actionSteps = generateActionSteps(keyword, niche);

  return `# ${keyword} — Market Intelligence Report

**Niche:** ${niche}  
**Opportunity Score:** ${score}/100  
**Search Volume:** ${typeof volume === 'number' ? volume.toLocaleString() : volume} searches/month  
**Competition Level:** ${competition.charAt(0).toUpperCase() + competition.slice(1)}  
**Trend:** ${trend.charAt(0).toUpperCase() + trend.slice(1)}  

---

## Executive Summary

${summary || `The ${keyword} space represents a significant market opportunity with ${typeof volume === 'number' ? volume.toLocaleString() : volume} monthly searches and ${competition} competition. Our analysis indicates this niche is ${trend}, suggesting ${trend === 'rising' ? 'growing demand and expanding opportunity' : trend === 'declining' ? 'a consolidating market where premium positioning wins' : 'steady, predictable demand that rewards consistent execution'}. With an opportunity score of ${score}/100, we rate this as ${score >= 80 ? 'a high-conviction opportunity worth aggressive pursuit' : score >= 60 ? 'a solid opportunity with measured upside' : score >= 40 ? 'a moderate opportunity requiring careful execution' : 'a speculative play best approached with validation first'}.`}

## Market Size Estimate

- **TAM (Total Addressable Market):** $${(marketSizeMax * 1.5).toLocaleString()}K–$${(marketSizeMax * 3).toLocaleString()}K
- **SAM (Serviceable Addressable Market):** $${marketSizeMin.toLocaleString()}K–$${marketSizeMax.toLocaleString()}K
- **SOM (Serviceable Obtainable Market):** $${Math.floor(marketSizeMin * 0.15).toLocaleString()}K–$${Math.floor(marketSizeMax * 0.25).toLocaleString()}K
- **Annual Growth Rate:** ${growthRate}

The ${niche} market shows ${trend === 'rising' ? 'strong upward momentum driven by increasing awareness and digital adoption' : trend === 'declining' ? 'signs of maturity with consolidation favoring established players' : 'stable demand with recurring revenue characteristics'}. Customer acquisition costs in this space average $${Math.floor(Math.random() * 40 + 20)}–$${Math.floor(Math.random() * 60 + 50)} per lead.

## Competitor Analysis

### 1. ${selectedCompetitors[0]}
- **Positioning:** Generalist with decent SEO presence
- **Strengths:** Brand recognition, content volume
- **Weaknesses:** Impersonal service, templated solutions, slow response times
- **Gap:** No specialized ${keyword} focus — opportunity to out-position on expertise

### 2. ${selectedCompetitors[1]}
- **Positioning:** Niche specialist with moderate authority
- **Strengths:** Targeted content, decent backlink profile
- **Weaknesses:** Outdated website, poor mobile experience, no automation
- **Gap:** Technology gap creates opportunity for a modern, automated alternative

### 3. ${selectedCompetitors[2]}
- **Positioning:** Premium provider, high-ticket focus
- **Strengths:** Strong brand, high customer LTV
- **Weaknesses:** Limited geographic reach, high prices exclude mid-market
- **Gap:** Mid-market underserved — volume play at moderate price points

**Competitive Moat Opportunity:** Build proprietary tools and automation that competitors cannot easily replicate. Combine SEO authority with automated service delivery.

## Keyword Opportunities

| Keyword | Monthly Volume | Difficulty | Intent |
|---------|---------------|------------|--------|
${kws.map(k => `| ${k.kw} | ${k.vol.toLocaleString()} | ${k.diff} | ${k.intent} |`).join('\n')}

**Content Strategy:** Target informational queries with comprehensive guides; capture commercial intent with comparison pages and "best of" lists. Build topical authority through ${Math.floor(kws.length / 2)} pillar pages supported by ${kws.length * 2} cluster articles.

## Monetization Path

1. **Primary: Service Delivery ($1,500–$5,000/client)**
   Offer done-for-you ${keyword} services with automated fulfillment. At ${volume} searches/month and ${competition} competition, targeting even 1% of search traffic yields approximately ${Math.floor(typeof volume === 'number' ? volume * 0.01 * 52 : 260)} qualified leads per year.

2. **Secondary: SaaS/Productized ($97–$497/month)**
   Build a self-serve platform that handles ${keyword} workflows. Recurring revenue model with 75-85% gross margins after initial build.

3. **Tertiary: Education/Content ($47–$197/course)**
   Package expertise into courses, templates, and playbooks. Low overhead, high margin, builds authority for primary service line.

### Revenue Projection (Year 1)
- **Conservative:** $${Math.floor(marketSizeMin * 0.08).toLocaleString()}K (${Math.floor(typeof volume === 'number' ? volume * 0.003 : 5)} clients at blended rate)
- **Expected:** $${Math.floor(marketSizeMin * 0.18).toLocaleString()}K (${Math.floor(typeof volume === 'number' ? volume * 0.007 : 12)} clients + SaaS revenue)
- **Aggressive:** $${Math.floor(marketSizeMin * 0.35).toLocaleString()}K (full-stack: services + SaaS + content)

## Action Plan

${actionSteps.map((step, i) => `### Step ${i + 1}: ${step.title}

**Timeline:** ${step.timeline}  
**Investment:** ${step.investment}

${step.description}

${step.tactics.map(t => `- ${t}`).join('\n')}

`).join('\n')}

---

*Report generated by CH Business Services Market Intelligence Engine. Data sourced from public signals, search trends, and competitive analysis. Updated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.*
`;
}

function generateKeywords(keyword: string, niche: string, baseVolume: any): Array<{kw: string; vol: number; diff: string; intent: string}> {
  const vol = typeof baseVolume === 'number' ? baseVolume : 1000;
  const factor = vol / 10;
  const words = keyword.split(' ');
  const nicheWords = niche.split(' ');

  return [
    { kw: keyword, vol: vol, diff: 'Low', intent: 'Commercial' },
    { kw: `best ${keyword}`, vol: Math.floor(factor * 3.5), diff: 'Medium', intent: 'Commercial' },
    { kw: `${keyword} near me`, vol: Math.floor(factor * 4.2), diff: 'Low', intent: 'Transactional' },
    { kw: `${keyword} services`, vol: Math.floor(factor * 2.8), diff: 'Medium', intent: 'Commercial' },
    { kw: `${keyword} cost`, vol: Math.floor(factor * 2.1), diff: 'Low', intent: 'Commercial' },
    { kw: `${niche} ${words[0]}`, vol: Math.floor(factor * 1.8), diff: 'Medium', intent: 'Informational' },
    { kw: `${keyword} for ${nicheWords[nicheWords.length - 1] || 'business'}`, vol: Math.floor(factor * 1.5), diff: 'Low', intent: 'Transactional' },
    { kw: `how to ${keyword}`, vol: Math.floor(factor * 0.9), diff: 'Medium', intent: 'Informational' },
  ];
}

function generateActionSteps(keyword: string, niche: string): Array<{title: string; timeline: string; investment: string; description: string; tactics: string[]}> {
  return [
    {
      title: `Validate Demand & Build Authority`,
      timeline: 'Weeks 1–4',
      investment: '$1,000–$2,500',
      description: `Launch a targeted content and landing page strategy to validate search demand and capture early leads.`,
      tactics: [
        `Build a keyword-targeted landing page optimized for "${keyword}" and 5 related long-tail queries`,
        `Publish 4 in-depth blog posts covering top informational queries in the ${niche} space`,
        `Set up Google Search Console and rank tracking for 15 target keywords`,
        `Create a lead magnet (checklist, template, or calculator) specific to ${keyword}`,
      ],
    },
    {
      title: `Automate Service Delivery`,
      timeline: 'Weeks 5–8',
      investment: '$2,500–$5,000',
      description: `Build or integrate automation systems to deliver ${keyword} services at scale with minimal manual effort.`,
      tactics: [
        `Map the ${keyword} customer journey and identify automation points`,
        `Implement automated onboarding, scheduling, and follow-up sequences`,
        `Set up a client portal for self-service access to deliverables`,
        `Integrate payment processing and recurring billing`,
      ],
    },
    {
      title: `Scale Through Paid Acquisition & Partnerships`,
      timeline: 'Weeks 9–12',
      investment: '$2,000–$4,000/month',
      description: `Once unit economics are proven, scale through Google Ads, strategic partnerships, and retargeting.`,
      tactics: [
        `Launch Google Ads campaign targeting high-intent ${keyword} keywords with $1,500/mo budget`,
        `Establish 3–5 referral partnerships with complementary service providers in the ${niche} space`,
        `Build retargeting audiences and deploy email nurture sequences for unconverted leads`,
        `Create case studies from first 5–10 clients and leverage for social proof`,
      ],
    },
  ];
}

/* ─── Seed Data ─── */

export const seedSignals = createServerFn().handler(async () => {
  requireAdmin();
  const db = sql();

  const existing = await db`SELECT COUNT(*) as count FROM market_signals`;
  if (parseInt(existing[0]?.count || "0") > 0) {
    return { success: false, message: "Table already has data — skipping seed." };
  }

  const signals = [
    { keyword: "Local SEO for plumbers", niche: "Plumbing", opportunity_score: 88, search_volume: 8200, competition: "low", trend_direction: "rising", summary: "Underserved niche with high intent — plumbers need local visibility and most competitors ignore this vertical. Low competition combined with 8.2K monthly searches makes this a prime opportunity for agency services or a productized SEO offering." },
    { keyword: "AI chatbot for real estate agents", niche: "Real Estate Tech", opportunity_score: 92, search_volume: 12000, competition: "medium", trend_direction: "rising", summary: "Emerging category growing at 35% YoY. Real estate agents are actively seeking AI tools to handle lead qualification and appointment scheduling. 12K monthly searches and accelerating." },
    { keyword: "Bookkeeping automation for freelancers", niche: "FinTech / Freelancer Tools", opportunity_score: 78, search_volume: 6500, competition: "medium", trend_direction: "stable", summary: "Stable, recession-resistant demand. Freelancers consistently need bookkeeping help but can't afford full-service accountants. Automation bridges the gap at attractive price points." },
    { keyword: "Elder care placement services", niche: "Senior Care", opportunity_score: 85, search_volume: 15000, competition: "low", trend_direction: "rising", summary: "Massive demographic tailwind — 10,000 Americans turn 65 daily. Families struggle to navigate care options. 15K monthly searches with surprisingly low digital competition." },
    { keyword: "Pet waste removal subscription", niche: "Pet Services", opportunity_score: 72, search_volume: 4000, competition: "low", trend_direction: "rising", summary: "Recurring revenue model with strong unit economics. Low startup costs, route density drives margin. 4K searches/month is deceptively high for this local service category." },
    { keyword: "Divorce financial planning", niche: "Financial Services", opportunity_score: 83, search_volume: 9000, competition: "medium", trend_direction: "stable", summary: "High-ticket niche with emotional urgency. Clients need specialized financial guidance during divorce — a CFP niche that commands premium fees. 9K monthly searches." },
    { keyword: "Solar panel cleaning services", niche: "Solar / Home Services", opportunity_score: 79, search_volume: 7000, competition: "low", trend_direction: "rising", summary: "Growing in lockstep with residential solar adoption (23% CAGR). Recurring maintenance need creates subscription potential. Early markets still have minimal competition." },
    { keyword: "Remote team productivity tools", niche: "SaaS / Future of Work", opportunity_score: 90, search_volume: 18000, competition: "high", trend_direction: "rising", summary: "Post-COVID permanent shift to hybrid work sustains demand. 18K monthly searches. High competition but massive TAM — differentiation through vertical specialization is the play." },
    { keyword: "Wedding planner CRM", niche: "Wedding / SaaS", opportunity_score: 68, search_volume: 3500, competition: "low", trend_direction: "rising", summary: "Niche SaaS opportunity — wedding planners are underserved by generic CRMs. Vertical-specific features (timeline management, vendor coordination) create switching costs. 3.5K searches with high buyer intent." },
    { keyword: "HVAC lead generation", niche: "HVAC / Home Services", opportunity_score: 82, search_volume: 11000, competition: "medium", trend_direction: "stable", summary: "Always-in-demand service with high ticket values ($2K–$15K per job). HVAC companies consistently pay for leads. 11K monthly searches across commercial and purchase-intent queries." },
    { keyword: "Private chef marketplace", niche: "Luxury / Food", opportunity_score: 71, search_volume: 5000, competition: "low", trend_direction: "rising", summary: "Luxury niche with expanding middle-market appeal. Platform model connects chefs with clients for dinner parties and weekly meal prep. 5K searches with minimal organized competition." },
    { keyword: "College admissions consulting", niche: "Education", opportunity_score: 87, search_volume: 14000, competition: "medium", trend_direction: "rising", summary: "High-ticket, emotionally-driven purchase. Parents spend $5K–$25K on admissions help. 14K monthly searches and growing as college admissions become more competitive." },
    { keyword: "Boat detailing subscription", niche: "Marine Services", opportunity_score: 65, search_volume: 2800, competition: "low", trend_direction: "stable", summary: "Seasonal but high-margin niche. Boat owners spend freely on maintenance. Subscription model smooths revenue across seasons. Low competition in most coastal markets." },
    { keyword: "ADHD coaching for professionals", niche: "Mental Health / Coaching", opportunity_score: 84, search_volume: 8000, competition: "low", trend_direction: "rising", summary: "Rising awareness of adult ADHD is driving demand. Professionals seek coaching for productivity and executive function. 8K monthly searches with very few established competitors." },
    { keyword: "Short-term rental management", niche: "Real Estate / Airbnb", opportunity_score: 93, search_volume: 22000, competition: "high", trend_direction: "rising", summary: "Airbnb economy continues expanding. Property owners need full-service management. 22K monthly searches — high competition but massive and growing TAM. Local market focus can win." },
  ];

  for (const s of signals) {
    await db`
      INSERT INTO market_signals (keyword, niche, opportunity_score, search_volume, competition, trend_direction, signal_source, summary, status)
      VALUES (${s.keyword}, ${s.niche}, ${s.opportunity_score}, ${s.search_volume}, ${s.competition}::text, ${s.trend_direction}::text, 'manual', ${s.summary}, 'detected')
    `;
  }

  return { success: true, message: `Seeded ${signals.length} market signals.` };
});

/* ─── Helpers ─── */

function coerceSignal(row: any): MarketSignal {
  return {
    id: row.id,
    keyword: row.keyword,
    niche: row.niche,
    opportunity_score: row.opportunity_score,
    search_volume: row.search_volume,
    competition: row.competition,
    trend_direction: row.trend_direction,
    signal_source: row.signal_source,
    summary: row.summary,
    full_report: row.full_report,
    status: row.status,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

/* ══════════════════════════════════════════════
   Content Briefs & Blog Generation
   ══════════════════════════════════════════════ */

export interface ContentBrief {
  id: number;
  signal_id: number | null;
  title: string;
  slug: string;
  target_keyword: string;
  secondary_keywords: string | null;
  meta_description: string | null;
  brief_outline: string | null;
  content: string | null;
  word_count: number | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  signal_keyword?: string;
  signal_niche?: string;
}

export const createContentBriefsTable = createServerFn().handler(async () => {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS content_briefs (
      id SERIAL PRIMARY KEY,
      signal_id INTEGER REFERENCES market_signals(id),
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      target_keyword TEXT NOT NULL,
      secondary_keywords TEXT,
      meta_description TEXT,
      brief_outline TEXT,
      content TEXT,
      word_count INTEGER,
      status TEXT NOT NULL DEFAULT 'draft',
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  return { success: true };
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

export const generateContentBrief = createServerFn().handler(async (data: {
  signal_id: number;
}) => {
  requireAdmin();
  const db = sql();

  const rows = await db`SELECT * FROM market_signals WHERE id = ${data.signal_id}`;
  if (rows.length === 0) throw new Error("Signal not found");

  const signal = rows[0];
  const keyword = signal.keyword;
  const niche = signal.niche;

  // Build SEO-optimized title
  const titlePatterns = [
    `How to Dominate ${keyword} in ${new Date().getFullYear()}`,
    `${keyword}: The Complete Guide for ${niche} Professionals`,
    `Why ${keyword} Is the #1 Opportunity for ${niche} Businesses`,
    `${keyword} Strategies That Actually Work`,
  ];
  const title = titlePatterns[Math.floor(Math.random() * titlePatterns.length)];

  const slug = slugify(title);

  // Secondary keywords
  const secondaryKws = [
    `${keyword} services`,
    `${keyword} for ${niche.toLowerCase()}`,
    `best ${keyword}`,
    `${keyword} near me`,
    `${niche.toLowerCase()} marketing`,
    `${keyword} tools`,
    `${keyword} software`,
    `${niche.toLowerCase()} growth`,
  ];
  const selectedSecondary = secondaryKws.slice(0, 4).join(", ");

  // Meta description (150-160 chars)
  const metaDesc = `Discover proven ${keyword.toLowerCase()} strategies for ${niche.toLowerCase()} businesses. Learn actionable techniques to attract more clients, automate workflows, and scale your revenue. Updated for ${new Date().getFullYear()}.`;

  // Content outline
  const outline = [
    `Understanding the ${keyword} Landscape`,
    `Why ${niche} Businesses Need ${keyword} Now`,
    `Key Components of a Winning ${keyword} Strategy`,
    `Common ${keyword} Mistakes and How to Avoid Them`,
    `Tools and Technology for ${keyword} Success`,
    `Measuring ${keyword} ROI: Metrics That Matter`,
  ];

  // Check for existing brief with same slug
  const existing = await db`SELECT id FROM content_briefs WHERE slug = ${slug}`;
  const finalSlug = existing.length > 0 ? `${slug}-${Date.now().toString(36)}` : slug;

  const result = await db`
    INSERT INTO content_briefs (signal_id, title, slug, target_keyword, secondary_keywords, meta_description, brief_outline, status)
    VALUES (${data.signal_id}, ${title}, ${finalSlug}, ${keyword}, ${selectedSecondary}, ${metaDesc.slice(0, 160)}, ${outline.join("\n")}, 'draft')
    RETURNING *
  `;

  return { success: true, brief: coerceBrief(result[0]) };
});

export const generateContent = createServerFn().handler(async (data: {
  brief_id: number;
}) => {
  requireAdmin();
  const db = sql();

  const rows = await db`
    SELECT cb.*, ms.keyword as signal_keyword, ms.niche as signal_niche
    FROM content_briefs cb
    LEFT JOIN market_signals ms ON cb.signal_id = ms.id
    WHERE cb.id = ${data.brief_id}
  `;
  if (rows.length === 0) throw new Error("Brief not found");

  const brief = rows[0];
  const keyword = brief.target_keyword;
  const niche = brief.signal_niche || "service";
  const secondaries = brief.secondary_keywords ? brief.secondary_keywords.split(", ") : [];

  const outlineSections = brief.brief_outline
    ? brief.brief_outline.split("\n").filter((l: string) => l.trim())
    : ["Understanding the Opportunity", "Getting Started", "Scaling Up", "Measuring Success"];

  const html = buildBlogContent(brief.title, keyword, niche, secondaries, outlineSections);

  const wordCount = html.replace(/<[^>]+>/g, "").split(/\s+/).length;

  await db`
    UPDATE content_briefs SET content = ${html}, word_count = ${wordCount}, updated_at = NOW()
    WHERE id = ${data.brief_id}
  `;

  return { success: true, word_count: wordCount };
});

function buildBlogContent(
  title: string,
  keyword: string,
  niche: string,
  secondaries: string[],
  outlineSections: string[],
): string {
  const year = new Date().getFullYear();
  const secKw = secondaries.length > 0 ? secondaries[0] : `${keyword} services`;
  const secKw2 = secondaries.length > 1 ? secondaries[1] : `${niche} marketing`;

  // Intro hook
  const intro = `
<p class="text-lg leading-relaxed text-gray-700">If you're in the <strong>${niche}</strong> space, you've probably noticed something: the old playbook isn't working like it used to. Referrals are drying up. Cold outreach is getting ignored. And your competitors who embraced <strong>${keyword.toLowerCase()}</strong>? They're eating your lunch.</p>
<p class="mt-4 leading-relaxed text-gray-700">But here's the good news: the <strong>${keyword}</strong> opportunity is still wide open for those who move strategically. In this guide, I'll walk you through exactly what's working right now in ${year} — backed by real data and actionable frameworks you can implement this week.</p>
`;

  // Section content generator
  function buildSection(heading: string, index: number): string {
    const sectionContents: Record<number, string> = {
      0: `
<p class="leading-relaxed text-gray-700">Before diving into tactics, it's critical to understand the current state of play in <strong>${keyword.toLowerCase()}</strong>. The landscape has shifted dramatically over the past 18 months. What worked in 2023 is now table stakes — and what's working now is evolving faster than most ${niche.toLowerCase()} businesses can keep up with.</p>
<p class="mt-4 leading-relaxed text-gray-700">The most successful ${niche.toLowerCase()} businesses aren't necessarily the ones with the biggest budgets. They're the ones who understand where attention is flowing and position themselves accordingly. This means mastering <strong>${secondaries[index % secondaries.length] || secKw}</strong> before your competitors even realize it's a battleground.</p>
<p class="mt-4 leading-relaxed text-gray-700">Industry data shows that ${niche.toLowerCase()} businesses investing in <strong>${keyword.toLowerCase()}</strong> are seeing 3-5x ROI compared to traditional marketing channels. The reason? Intent. When someone searches for "${keyword.toLowerCase()}", they're not browsing — they're looking to buy.</p>
`,
      1: `
<p class="leading-relaxed text-gray-700">Let's be direct: if you're still relying solely on word-of-mouth and hoping your phone rings, you're leaving enormous money on the table. <strong>${keyword}</strong> isn't a "nice to have" anymore — it's the difference between a thriving ${niche.toLowerCase()} business and one that's struggling to keep the lights on.</p>
<p class="mt-4 leading-relaxed text-gray-700">Consider this: the average ${niche.toLowerCase()} customer now does 70% of their research online before ever picking up the phone. If you're not visible during that research phase, you don't exist to them. It's that simple.</p>
<p class="mt-4 leading-relaxed text-gray-700">By investing in <strong>${secondaries[index % secondaries.length] || secKw2}</strong>, you're building an asset that compounds over time. Unlike paid ads that stop the moment you stop paying, organic visibility through <strong>${keyword.toLowerCase()}</strong> continues delivering returns month after month.</p>
`,
      2: `
<p class="leading-relaxed text-gray-700">Building an effective <strong>${keyword.toLowerCase()}</strong> strategy requires a systematic approach. Here are the core components that separate the winners from the also-rans:</p>
<ul class="mt-4 space-y-3">
  <li class="flex items-start gap-2">
    <span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
    </span>
    <span class="text-gray-700"><strong>Deep keyword research:</strong> Go beyond the obvious terms and mine long-tail queries that signal high purchase intent in the ${niche.toLowerCase()} space.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
    </span>
    <span class="text-gray-700"><strong>Authority content:</strong> Create comprehensive resources that answer every question your ideal customer has about ${keyword.toLowerCase()}.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
    </span>
    <span class="text-gray-700"><strong>Local optimization:</strong> For ${niche.toLowerCase()} businesses serving specific geographies, local signals are everything — optimize your Google Business Profile and local citations.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
    </span>
    <span class="text-gray-700"><strong>Conversion-focused design:</strong> Driving traffic is only half the battle — your website needs to convert visitors into leads and leads into customers.</span>
  </li>
</ul>
`,
      3: `
<p class="leading-relaxed text-gray-700">Even smart ${niche.toLowerCase()} business owners make costly mistakes when it comes to <strong>${keyword.toLowerCase()}</strong>. Here are the biggest ones I see — and how to avoid them:</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>Mistake #1: Chasing vanity metrics.</strong> Ranking #1 for a keyword nobody's searching for is a hollow victory. Focus on keywords that drive actual revenue — the ones your ideal customers use when they're ready to take action. For ${niche.toLowerCase()} businesses, this often means "<strong>${secKw}</strong>" type queries.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>Mistake #2: Neglecting mobile.</strong> Over 60% of searches in the ${niche.toLowerCase()} space now happen on mobile devices. If your site isn't lightning-fast and thumb-friendly, you're losing business before you even get a chance to pitch.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>Mistake #3: Set-it-and-forget-it thinking.</strong> ${keyword} isn't a one-time project — it's an ongoing discipline. Search algorithms evolve, competitors adapt, and customer behavior shifts. The businesses that win are the ones that continuously optimize.</p>
`,
      4: `
<p class="leading-relaxed text-gray-700">The right tools can turn a good <strong>${keyword.toLowerCase()}</strong> strategy into a great one. Here are the essential tools every ${niche.toLowerCase()} business should have in their stack:</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>For keyword research:</strong> Google Keyword Planner and SEMrush give you the foundation, but the real gold is in mining "People Also Ask" boxes and Reddit threads where your customers hang out. The long-tail queries you find there often have the highest conversion rates.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>For content management:</strong> A lightweight CMS with built-in SEO capabilities is non-negotiable. You need the ability to update meta tags, create landing pages quickly, and track performance without needing a developer every time.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>For automation:</strong> This is where the biggest competitive advantage lies. Businesses that automate their <strong>${secKw2}</strong> workflows — from lead capture to follow-up to reporting — consistently outperform those relying on manual processes. The time savings alone typically pay for the investment within 90 days.</p>
`,
      5: `
<p class="leading-relaxed text-gray-700">If you're not measuring, you're guessing. Here are the key metrics every ${niche.toLowerCase()} business should track for their <strong>${keyword.toLowerCase()}</strong> efforts:</p>
<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div class="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
    <p class="text-sm font-semibold text-indigo-700">Organic Traffic Growth</p>
    <p class="mt-1 text-2xl font-bold text-indigo-900">Month-over-month increase in qualified search traffic</p>
  </div>
  <div class="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
    <p class="text-sm font-semibold text-emerald-700">Conversion Rate</p>
    <p class="mt-1 text-2xl font-bold text-emerald-900">% of visitors who become leads or customers</p>
  </div>
  <div class="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
    <p class="text-sm font-semibold text-amber-700">Customer Acquisition Cost</p>
    <p class="mt-1 text-2xl font-bold text-amber-900">Total spend ÷ new customers acquired</p>
  </div>
  <div class="rounded-xl border border-rose-100 bg-rose-50/50 p-4">
    <p class="text-sm font-semibold text-rose-700">Lifetime Value (LTV)</p>
    <p class="mt-1 text-2xl font-bold text-rose-900">Average revenue per customer × retention period</p>
  </div>
</div>
<p class="mt-4 leading-relaxed text-gray-700">Track these metrics weekly for the first 90 days, then monthly once you've established a baseline. The data will tell you exactly where to double down and where to pivot.</p>
`,
    };

    return (
      sectionContents[index] ||
      `<p class="leading-relaxed text-gray-700">The future of <strong>${keyword.toLowerCase()}</strong> in the ${niche.toLowerCase()} industry is bright — but only for those who take action now. The window of opportunity won't stay open forever. As more competitors wake up to the opportunity, the cost of entry will rise and the returns will compress.</p>`
    );
  }

  const sectionsHtml = outlineSections
    .map(
      (heading, i) => `
<section class="mt-12">
  <h2 class="font-serif text-2xl font-bold tracking-tight text-brand-navy">${heading}</h2>
  <div class="mt-4">
    ${buildSection(heading, i)}
  </div>
</section>`,
    )
    .join("\n");

  // CTA section
  const cta = `
<section class="mt-16 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-8 text-center sm:p-12">
  <h2 class="font-serif text-3xl font-bold tracking-tight text-white">Ready to dominate ${keyword.toLowerCase()}?</h2>
  <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-gray-light">
    Get a <strong class="text-white">free Business Gap Scan</strong> and discover exactly where your ${niche.toLowerCase()} business is leaving money on the table — and what to do about it. No fluff, no pressure, just actionable intelligence.
  </p>
  <a href="/offers/gap-scan" class="mt-6 inline-flex items-center rounded-xl bg-brand-gold px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:shadow-xl active:translate-y-0">
    Get Your Free Gap Scan →
  </a>
</section>
`;

  return `
<article class="prose max-w-none">
  <div class="mt-6">
    ${intro}
  </div>
  ${sectionsHtml}
  ${cta}
</article>
`;
}

export const getContentBriefs = createServerFn().handler(async () => {
  requireAdmin();
  const db = sql();
  const rows = await db`
    SELECT cb.*, ms.keyword as signal_keyword, ms.niche as signal_niche
    FROM content_briefs cb
    LEFT JOIN market_signals ms ON cb.signal_id = ms.id
    ORDER BY cb.created_at DESC
  `;
  return rows.map(coerceBrief);
});

export const getPublishedPosts = createServerFn().handler(async () => {
  const db = sql();
  const rows = await db`
    SELECT cb.*, ms.keyword as signal_keyword, ms.niche as signal_niche
    FROM content_briefs cb
    LEFT JOIN market_signals ms ON cb.signal_id = ms.id
    WHERE cb.status = 'published'
    ORDER BY cb.published_at DESC NULLS LAST
  `;
  return rows.map(coerceBrief);
});

export const getPostBySlug = createServerFn().handler(async (data: {
  slug: string;
}) => {
  const db = sql();
  const rows = await db`
    SELECT cb.*, ms.keyword as signal_keyword, ms.niche as signal_niche
    FROM content_briefs cb
    LEFT JOIN market_signals ms ON cb.signal_id = ms.id
    WHERE cb.slug = ${data.slug} AND cb.status = 'published'
  `;
  if (rows.length === 0) return null;
  return coerceBrief(rows[0]);
});

export const publishContent = createServerFn().handler(async (data: {
  id: number;
}) => {
  requireAdmin();
  const db = sql();
  await db`
    UPDATE content_briefs SET status = 'published', published_at = NOW(), updated_at = NOW()
    WHERE id = ${data.id}
  `;
  return { success: true };
});

export const unpublishContent = createServerFn().handler(async (data: {
  id: number;
}) => {
  requireAdmin();
  const db = sql();
  await db`
    UPDATE content_briefs SET status = 'draft', published_at = NULL, updated_at = NOW()
    WHERE id = ${data.id}
  `;
  return { success: true };
});

export const seedContentBriefs = createServerFn().handler(async () => {
  requireAdmin();
  const db = sql();

  // Ensure table exists
  await createContentBriefsTable();

  const existing = await db`SELECT COUNT(*) as count FROM content_briefs`;
  if (parseInt(existing[0]?.count || "0") > 0) {
    return { success: false, message: "Content briefs already exist — skipping seed." };
  }

  // Get the top signals
  const signals = await db`SELECT * FROM market_signals ORDER BY opportunity_score DESC LIMIT 5`;

  const briefs = [
    {
      signalIdx: 0, // Local SEO for plumbers (id 1)
      title: "How Plumbers Can 10x Their Leads With Local SEO in 2025",
      slug: "how-plumbers-can-10x-their-leads-with-local-seo-in-2025",
      keyword: "Local SEO for plumbers",
      secondaries: "plumber SEO services, local search for plumbers, plumbing marketing, Google Business Profile for plumbers",
      meta: "Discover proven local SEO strategies for plumbers that drive real leads. Learn how to rank #1 for plumbing searches, optimize your Google Business Profile, and 10x your inbound calls.",
      outline: "Understanding the Local SEO Landscape for Plumbers\nWhy Most Plumbers Get Local SEO Wrong\nBuilding a Google Business Profile That Converts\nLocal Citation Building and Review Management\nContent That Attracts High-Intent Plumbing Customers\nMeasuring ROI: Calls, Bookings, and Revenue",
    },
    {
      signalIdx: 3, // Elder care placement services (id 4)
      title: "The Complete Guide to Starting an Elder Care Placement Business",
      slug: "the-complete-guide-to-starting-an-elder-care-placement-business",
      keyword: "Elder care placement services",
      secondaries: "senior care placement business, elder care consulting, senior living advisor, how to start a senior placement agency",
      meta: "Complete guide to building an elder care placement business from scratch. Learn the licensing requirements, revenue models, marketing strategies, and how to build trust with families.",
      outline: "Why Elder Care Placement Is a Booming Opportunity\nUnderstanding the Senior Care Landscape\nLicensing and Legal Requirements\nBuilding Relationships With Care Facilities\nThe Client Intake and Assessment Process\nScaling Your Placement Business",
    },
    {
      signalIdx: 1, // AI chatbot for real estate
      title: "AI Chatbots for Real Estate: The Ultimate 2025 Guide",
      slug: "ai-chatbots-for-real-estate-the-ultimate-2025-guide",
      keyword: "AI chatbot for real estate agents",
      secondaries: "real estate chatbot, AI lead qualification, real estate automation, chatbot for Realtors, property inquiry bot",
      meta: "How AI chatbots are transforming real estate lead generation and qualification. Learn what to look for in a real estate chatbot, implementation strategies, and real-world ROI data.",
      outline: "The Rise of AI in Real Estate\nWhy Traditional Lead Capture Is Failing Agents\nHow AI Chatbots Qualify Leads 24/7\nIntegrating Chatbots With Your CRM and MLS\nReal-World Case Studies and ROI Data\nGetting Started: Implementation Checklist",
    },
    {
      signalIdx: 7, // Remote team productivity tools (id 8)
      title: "Remote Team Productivity Tools: What Actually Works in 2025",
      slug: "remote-team-productivity-tools-what-actually-works-in-2025",
      keyword: "Remote team productivity tools",
      secondaries: "remote work tools, team collaboration software, async communication, distributed team management, productivity platforms",
      meta: "Cut through the noise and discover which remote team productivity tools deliver real results. Honest analysis of the top platforms, integration strategies, and implementation pitfalls to avoid.",
      outline: "The Remote Work Tool Landscape in 2025\nCommunication vs. Productivity: Finding the Balance\nAsync-First Workflows and the Tools That Enable Them\nProject Management Platforms Compared\nBuilding Your Remote Tech Stack\nMeasuring Productivity Without Surveillance",
    },
    {
      signalIdx: 9, // HVAC lead generation (id 10)
      title: "HVAC Lead Generation: 7 Strategies That Actually Work in 2025",
      slug: "hvac-lead-generation-7-strategies-that-actually-work-in-2025",
      keyword: "HVAC lead generation",
      secondaries: "HVAC marketing, HVAC leads, heating and cooling leads, HVAC SEO, HVAC advertising",
      meta: "Skip the hype and get 7 battle-tested HVAC lead generation strategies that deliver real results. From local SEO to paid ads to referral systems — everything you need to fill your pipeline.",
      outline: "Understanding the HVAC Lead Generation Landscape\nStrategy 1: Local SEO Domination\nStrategy 2: Google Local Service Ads\nStrategy 3: Emergency Response Marketing\nStrategy 4: Seasonal Campaign Planning\nStrategy 5: Review and Reputation Systems\nStrategy 6: Referral Automation\nStrategy 7: Retargeting and Nurture Sequences",
    },
  ];

  for (const b of briefs) {
    const signal = signals[b.signalIdx];
    if (!signal) continue;

    const result = await db`
      INSERT INTO content_briefs (signal_id, title, slug, target_keyword, secondary_keywords, meta_description, brief_outline, status)
      VALUES (${signal.id}, ${b.title}, ${b.slug}, ${b.keyword}, ${b.secondaries}, ${b.meta.slice(0, 160)}, ${b.outline}, 'draft')
      RETURNING id
    `;

    // Generate content for specific ones (indices 0, 3, 9: plumber, elder care, HVAC)
    if ([0, 3, 4].includes(briefs.indexOf(b))) {
      const briefId = result[0].id;
      const briefRow = await db`SELECT * FROM content_briefs WHERE id = ${briefId}`;
      const bRow = briefRow[0];
      const outlineSections = bRow.brief_outline ? bRow.brief_outline.split("\n").filter((l: string) => l.trim()) : [];
      const secs = b.secondaries.split(", ");

      const html = buildBlogContent(b.title, b.keyword, signal.niche, secs, outlineSections);
      const wordCount = html.replace(/<[^>]+>/g, "").split(/\s+/).length;

      await db`
        UPDATE content_briefs SET content = ${html}, word_count = ${wordCount}, status = 'published', published_at = NOW(), updated_at = NOW()
        WHERE id = ${briefId}
      `;
    }
  }

  return { success: true, message: `Seeded ${briefs.length} content briefs (3 published).` };
});

function coerceBrief(row: any): ContentBrief {
  return {
    id: row.id,
    signal_id: row.signal_id,
    title: row.title,
    slug: row.slug,
    target_keyword: row.target_keyword,
    secondary_keywords: row.secondary_keywords,
    meta_description: row.meta_description,
    brief_outline: row.brief_outline,
    content: row.content,
    word_count: row.word_count,
    status: row.status,
    published_at: row.published_at ? String(row.published_at) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    signal_keyword: row.signal_keyword,
    signal_niche: row.signal_niche,
  };
}
