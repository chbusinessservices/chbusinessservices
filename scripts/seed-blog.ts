import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}
const db = neon(DATABASE_URL);

async function main() {
  console.log("🌱 Seeding blog content...");

  // 1. Create tables if they don't exist
  await db`
    CREATE TABLE IF NOT EXISTS market_signals (
      id SERIAL PRIMARY KEY,
      keyword TEXT NOT NULL,
      niche TEXT NOT NULL,
      opportunity_score INTEGER NOT NULL DEFAULT 50,
      search_volume INTEGER NOT NULL DEFAULT 0,
      competition TEXT NOT NULL DEFAULT 'medium',
      trend_direction TEXT NOT NULL DEFAULT 'stable',
      signal_source TEXT NOT NULL DEFAULT 'manual',
      summary TEXT,
      full_report TEXT,
      status TEXT NOT NULL DEFAULT 'detected',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

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

  // 2. Check if signals exist
  const sigCount = await db`SELECT COUNT(*) as count FROM market_signals`;
  if (parseInt(sigCount[0]?.count || "0") === 0) {
    console.log("  Seeding market signals...");
    const signals = [
      { keyword: "Local SEO for plumbers", niche: "Plumbing", opportunity_score: 88, search_volume: 8200, competition: "low", trend_direction: "rising", summary: "Underserved niche with high intent — plumbers need local visibility and most competitors ignore this vertical." },
      { keyword: "AI chatbot for real estate agents", niche: "Real Estate Tech", opportunity_score: 92, search_volume: 12000, competition: "medium", trend_direction: "rising", summary: "Emerging category growing at 35% YoY. Real estate agents are actively seeking AI tools." },
      { keyword: "Bookkeeping automation for freelancers", niche: "FinTech / Freelancer Tools", opportunity_score: 78, search_volume: 6500, competition: "medium", trend_direction: "stable", summary: "Stable, recession-resistant demand." },
      { keyword: "Elder care placement services", niche: "Senior Care", opportunity_score: 85, search_volume: 15000, competition: "low", trend_direction: "rising", summary: "Massive demographic tailwind — 10,000 Americans turn 65 daily." },
      { keyword: "Pet waste removal subscription", niche: "Pet Services", opportunity_score: 72, search_volume: 4000, competition: "low", trend_direction: "rising", summary: "Recurring revenue model with strong unit economics." },
      { keyword: "Divorce financial planning", niche: "Financial Services", opportunity_score: 83, search_volume: 9000, competition: "medium", trend_direction: "stable", summary: "High-ticket niche with emotional urgency." },
      { keyword: "Solar panel cleaning services", niche: "Solar / Home Services", opportunity_score: 79, search_volume: 7000, competition: "low", trend_direction: "rising", summary: "Growing in lockstep with residential solar adoption." },
      { keyword: "Remote team productivity tools", niche: "SaaS / Future of Work", opportunity_score: 90, search_volume: 18000, competition: "high", trend_direction: "rising", summary: "Post-COVID permanent shift to hybrid work sustains demand." },
      { keyword: "Wedding planner CRM", niche: "Wedding / SaaS", opportunity_score: 68, search_volume: 3500, competition: "low", trend_direction: "rising", summary: "Niche SaaS opportunity — wedding planners are underserved." },
      { keyword: "HVAC lead generation", niche: "HVAC / Home Services", opportunity_score: 82, search_volume: 11000, competition: "medium", trend_direction: "stable", summary: "Always-in-demand service with high ticket values." },
      { keyword: "Private chef marketplace", niche: "Luxury / Food", opportunity_score: 71, search_volume: 5000, competition: "low", trend_direction: "rising", summary: "Luxury niche with expanding middle-market appeal." },
      { keyword: "College admissions consulting", niche: "Education", opportunity_score: 87, search_volume: 14000, competition: "medium", trend_direction: "rising", summary: "High-ticket, emotionally-driven purchase." },
      { keyword: "Boat detailing subscription", niche: "Marine Services", opportunity_score: 65, search_volume: 2800, competition: "low", trend_direction: "stable", summary: "Seasonal but high-margin niche." },
      { keyword: "ADHD coaching for professionals", niche: "Mental Health / Coaching", opportunity_score: 84, search_volume: 8000, competition: "low", trend_direction: "rising", summary: "Rising awareness of adult ADHD is driving demand." },
      { keyword: "Short-term rental management", niche: "Real Estate / Airbnb", opportunity_score: 93, search_volume: 22000, competition: "high", trend_direction: "rising", summary: "Airbnb economy continues expanding." },
    ];
    for (const s of signals) {
      await db`
        INSERT INTO market_signals (keyword, niche, opportunity_score, search_volume, competition, trend_direction, signal_source, summary, status)
        VALUES (${s.keyword}, ${s.niche}, ${s.opportunity_score}, ${s.search_volume}, ${s.competition}::text, ${s.trend_direction}::text, 'manual', ${s.summary}, 'detected')
      `;
    }
    console.log(`  ✅ Seeded ${signals.length} market signals`);
  } else {
    console.log(`  ⏭️ Signals already exist (${sigCount[0].count} rows)`);
  }

  // 3. Check if content briefs exist
  const briefCount = await db`SELECT COUNT(*) as count FROM content_briefs`;
  if (parseInt(briefCount[0]?.count || "0") > 0) {
    console.log(`  ⏭️ Content briefs already exist (${briefCount[0].count} rows) — skipping`);
    console.log("✅ Done!");
    process.exit(0);
  }

  // Get top signals for linking
  const signals = await db`SELECT * FROM market_signals ORDER BY opportunity_score DESC LIMIT 5`;

  const briefs = [
    {
      signalIdx: 0,
      title: "How Plumbers Can 10x Their Leads With Local SEO in 2025",
      slug: "how-plumbers-can-10x-their-leads-with-local-seo-in-2025",
      keyword: "Local SEO for plumbers",
      secondaries: "plumber SEO services, local search for plumbers, plumbing marketing, Google Business Profile for plumbers",
      meta: "Discover proven local SEO strategies for plumbers that drive real leads. Learn how to rank #1 for plumbing searches, optimize your Google Business Profile, and 10x your inbound calls.",
      outline: "Understanding the Local SEO Landscape for Plumbers\nWhy Most Plumbers Get Local SEO Wrong\nBuilding a Google Business Profile That Converts\nLocal Citation Building and Review Management\nContent That Attracts High-Intent Plumbing Customers\nMeasuring ROI: Calls, Bookings, and Revenue",
    },
    {
      signalIdx: 1,
      title: "The Complete Guide to Starting an Elder Care Placement Business",
      slug: "the-complete-guide-to-starting-an-elder-care-placement-business",
      keyword: "Elder care placement services",
      secondaries: "senior care placement business, elder care consulting, senior living advisor, how to start a senior placement agency",
      meta: "Complete guide to building an elder care placement business from scratch. Learn the licensing requirements, revenue models, marketing strategies, and how to build trust with families.",
      outline: "Why Elder Care Placement Is a Booming Opportunity\nUnderstanding the Senior Care Landscape\nLicensing and Legal Requirements\nBuilding Relationships With Care Facilities\nThe Client Intake and Assessment Process\nScaling Your Placement Business",
    },
    {
      signalIdx: 3,
      title: "AI Chatbots for Real Estate: The Ultimate 2025 Guide",
      slug: "ai-chatbots-for-real-estate-the-ultimate-2025-guide",
      keyword: "AI chatbot for real estate agents",
      secondaries: "real estate chatbot, AI lead qualification, real estate automation, chatbot for Realtors, property inquiry bot",
      meta: "How AI chatbots are transforming real estate lead generation and qualification. Learn what to look for in a real estate chatbot, implementation strategies, and real-world ROI data.",
      outline: "The Rise of AI in Real Estate\nWhy Traditional Lead Capture Is Failing Agents\nHow AI Chatbots Qualify Leads 24/7\nIntegrating Chatbots With Your CRM and MLS\nReal-World Case Studies and ROI Data\nGetting Started: Implementation Checklist",
    },
    {
      signalIdx: 4,
      title: "Remote Team Productivity Tools: What Actually Works in 2025",
      slug: "remote-team-productivity-tools-what-actually-works-in-2025",
      keyword: "Remote team productivity tools",
      secondaries: "remote work tools, team collaboration software, async communication, distributed team management, productivity platforms",
      meta: "Cut through the noise and discover which remote team productivity tools deliver real results. Honest analysis of the top platforms, integration strategies, and implementation pitfalls to avoid.",
      outline: "The Remote Work Tool Landscape in 2025\nCommunication vs. Productivity: Finding the Balance\nAsync-First Workflows and the Tools That Enable Them\nProject Management Platforms Compared\nBuilding Your Remote Tech Stack\nMeasuring Productivity Without Surveillance",
    },
    {
      signalIdx: 2,
      title: "HVAC Lead Generation: 7 Strategies That Actually Work in 2025",
      slug: "hvac-lead-generation-7-strategies-that-actually-work-in-2025",
      keyword: "HVAC lead generation",
      secondaries: "HVAC marketing, HVAC leads, heating and cooling leads, HVAC SEO, HVAC advertising",
      meta: "Skip the hype and get 7 battle-tested HVAC lead generation strategies that deliver real results. From local SEO to paid ads to referral systems — everything you need to fill your pipeline.",
      outline: "Understanding the HVAC Lead Generation Landscape\nStrategy 1: Local SEO Domination\nStrategy 2: Google Local Service Ads\nStrategy 3: Emergency Response Marketing\nStrategy 4: Seasonal Campaign Planning\nStrategy 5: Review and Reputation Systems\nStrategy 6: Referral Automation\nStrategy 7: Retargeting and Nurture Sequences",
    },
  ];

  console.log("  Seeding content briefs...");
  for (const b of briefs) {
    const signal = signals[b.signalIdx];
    if (!signal) {
      console.log(`  ⚠️  No signal at index ${b.signalIdx}, skipping "${b.title}"`);
      continue;
    }

    const result = await db`
      INSERT INTO content_briefs (signal_id, title, slug, target_keyword, secondary_keywords, meta_description, brief_outline, status)
      VALUES (${signal.id}, ${b.title}, ${b.slug}, ${b.keyword}, ${b.secondaries}, ${b.meta.slice(0, 160)}, ${b.outline}, 'draft')
      RETURNING id
    `;

    // Generate full HTML content for the first 3 (plumber, elder care, HVAC)
    // Indices: 0 (plumber=0), 1 (elder care=1), 4 (HVAC=4)
    if ([0, 1, 4].includes(briefs.indexOf(b))) {
      const briefId = result[0].id;
      const secs = b.secondaries.split(", ");
      const outlineLines = b.outline.split("\n").filter((l: string) => l.trim());
      const html = buildBlogHtml(b.title, b.keyword, signal.niche, secs, outlineLines);
      const wordCount = html.replace(/<[^>]+>/g, "").split(/\s+/).length;

      await db`
        UPDATE content_briefs SET content = ${html}, word_count = ${wordCount}, status = 'published', published_at = NOW(), updated_at = NOW()
        WHERE id = ${briefId}
      `;
      console.log(`  ✅ "${b.title}" — published (${wordCount} words)`);
    } else {
      console.log(`  📄 "${b.title}" — draft saved`);
    }
  }

  console.log("✅ Done! Blog content seeded successfully.");
}

function buildBlogHtml(
  title: string,
  keyword: string,
  niche: string,
  secondaries: string[],
  outlineSections: string[],
): string {
  const year = new Date().getFullYear();
  const secKw = secondaries.length > 0 ? secondaries[0] : `${keyword} services`;
  const secKw2 = secondaries.length > 1 ? secondaries[1] : `${niche} marketing`;

  const intro = `
<p class="text-lg leading-relaxed text-gray-700">If you're in the <strong>${niche}</strong> space, you've probably noticed something: the old playbook isn't working like it used to. Referrals are drying up. Cold outreach is getting ignored. And your competitors who embraced <strong>${keyword.toLowerCase()}</strong>? They're eating your lunch.</p>
<p class="mt-4 leading-relaxed text-gray-700">But here's the good news: the <strong>${keyword}</strong> opportunity is still wide open for those who move strategically. In this guide, I'll walk you through exactly what's working right now in ${year} — backed by real data and actionable frameworks you can implement this week.</p>
`;

  function buildSection(heading: string, index: number): string {
    const sectionContents: Record<number, string> = {
      0: `
<p class="leading-relaxed text-gray-700">Before diving into tactics, it's critical to understand the current state of play in <strong>${keyword.toLowerCase()}</strong>. The landscape has shifted dramatically over the past 18 months. What worked in 2023 is now table stakes — and what's working now is evolving faster than most ${niche.toLowerCase()} businesses can keep up with.</p>
<p class="mt-4 leading-relaxed text-gray-700">The most successful ${niche.toLowerCase()} businesses aren't necessarily the ones with the biggest budgets. They're the ones who understand where attention is flowing and position themselves accordingly.</p>
<p class="mt-4 leading-relaxed text-gray-700">Industry data shows that ${niche.toLowerCase()} businesses investing in <strong>${keyword.toLowerCase()}</strong> are seeing 3-5x ROI compared to traditional marketing channels. The reason? Intent. When someone searches for "${keyword.toLowerCase()}", they're not browsing — they're looking to buy.</p>
`,
      1: `
<p class="leading-relaxed text-gray-700">Let's be direct: if you're still relying solely on word-of-mouth and hoping your phone rings, you're leaving enormous money on the table. <strong>${keyword}</strong> isn't a "nice to have" anymore — it's the difference between a thriving ${niche.toLowerCase()} business and one that's struggling to keep the lights on.</p>
<p class="mt-4 leading-relaxed text-gray-700">Consider this: the average ${niche.toLowerCase()} customer now does 70% of their research online before ever picking up the phone. If you're not visible during that research phase, you don't exist to them. It's that simple.</p>
<p class="mt-4 leading-relaxed text-gray-700">By investing in <strong>${secKw}</strong>, you're building an asset that compounds over time. Unlike paid ads that stop the moment you stop paying, organic visibility continues delivering returns month after month.</p>
`,
      2: `
<p class="leading-relaxed text-gray-700">Building an effective <strong>${keyword.toLowerCase()}</strong> strategy requires a systematic approach. Here are the core components that separate the winners from the also-rans:</p>
<ul class="mt-4 space-y-3">
  <li class="flex items-start gap-2"><span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span><span class="text-gray-700"><strong>Deep keyword research:</strong> Go beyond the obvious terms and mine long-tail queries that signal high purchase intent in the ${niche.toLowerCase()} space.</span></li>
  <li class="flex items-start gap-2"><span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span><span class="text-gray-700"><strong>Authority content:</strong> Create comprehensive resources that answer every question your ideal customer has about ${keyword.toLowerCase()}.</span></li>
  <li class="flex items-start gap-2"><span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span><span class="text-gray-700"><strong>Local optimization:</strong> For ${niche.toLowerCase()} businesses serving specific geographies, local signals are everything — optimize your Google Business Profile and local citations.</span></li>
  <li class="flex items-start gap-2"><span class="mt-1 flex-shrink-0 rounded-full bg-emerald-100 p-1 text-emerald-600"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span><span class="text-gray-700"><strong>Conversion-focused design:</strong> Driving traffic is only half the battle — your website needs to convert visitors into leads and customers.</span></li>
</ul>
`,
      3: `
<p class="leading-relaxed text-gray-700">Even smart ${niche.toLowerCase()} business owners make costly mistakes when it comes to <strong>${keyword.toLowerCase()}</strong>. Here are the biggest ones I see — and how to avoid them:</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>Mistake #1: Chasing vanity metrics.</strong> Ranking #1 for a keyword nobody's searching for is a hollow victory. Focus on keywords that drive actual revenue — the ones your ideal customers use when they're ready to take action.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>Mistake #2: Neglecting mobile.</strong> Over 60% of searches in the ${niche.toLowerCase()} space now happen on mobile devices. If your site isn't lightning-fast and thumb-friendly, you're losing business before you even get a chance to pitch.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>Mistake #3: Set-it-and-forget-it thinking.</strong> ${keyword} isn't a one-time project — it's an ongoing discipline. Search algorithms evolve, competitors adapt, and customer behavior shifts.</p>
`,
      4: `
<p class="leading-relaxed text-gray-700">The right tools can turn a good <strong>${keyword.toLowerCase()}</strong> strategy into a great one. Here are the essential tools every ${niche.toLowerCase()} business should have in their stack:</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>For keyword research:</strong> Google Keyword Planner and SEMrush give you the foundation, but the real gold is in mining "People Also Ask" boxes and Reddit threads where your customers hang out.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>For content management:</strong> A lightweight CMS with built-in SEO capabilities is non-negotiable. You need the ability to update meta tags, create landing pages quickly, and track performance without needing a developer every time.</p>
<p class="mt-4 leading-relaxed text-gray-700"><strong>For automation:</strong> This is where the biggest competitive advantage lies. Businesses that automate their <strong>${secKw2}</strong> workflows consistently outperform those relying on manual processes.</p>
`,
      5: `
<p class="leading-relaxed text-gray-700">If you're not measuring, you're guessing. Here are the key metrics every ${niche.toLowerCase()} business should track:</p>
<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div class="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4"><p class="text-sm font-semibold text-indigo-700">Organic Traffic Growth</p><p class="mt-1 text-lg font-bold text-indigo-900">Month-over-month qualified traffic</p></div>
  <div class="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4"><p class="text-sm font-semibold text-emerald-700">Conversion Rate</p><p class="mt-1 text-lg font-bold text-emerald-900">Visitors who become leads</p></div>
  <div class="rounded-xl border border-amber-100 bg-amber-50/50 p-4"><p class="text-sm font-semibold text-amber-700">Customer Acquisition Cost</p><p class="mt-1 text-lg font-bold text-amber-900">Total spend ÷ new customers</p></div>
  <div class="rounded-xl border border-rose-100 bg-rose-50/50 p-4"><p class="text-sm font-semibold text-rose-700">Lifetime Value (LTV)</p><p class="mt-1 text-lg font-bold text-rose-900">Avg revenue × retention period</p></div>
</div>
<p class="mt-4 leading-relaxed text-gray-700">Track these metrics weekly for the first 90 days, then monthly once you've established a baseline. The data will tell you exactly where to double down and where to pivot.</p>
`,
    };
    return sectionContents[index] || `<p class="leading-relaxed text-gray-700">The future of <strong>${keyword.toLowerCase()}</strong> in the ${niche.toLowerCase()} industry is bright — but only for those who take action now. The window of opportunity won't stay open forever.</p>`;
  }

  const sectionsHtml = outlineSections
    .map((heading, i) => `
<section class="mt-12">
  <h2 class="font-serif text-2xl font-bold tracking-tight text-brand-navy">${heading}</h2>
  <div class="mt-4">${buildSection(heading, i)}</div>
</section>`)
    .join("\n");

  const cta = `
<section class="mt-16 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-8 text-center sm:p-12">
  <h2 class="font-serif text-3xl font-bold tracking-tight text-white">Ready to dominate ${keyword.toLowerCase()}?</h2>
  <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-gray-light">
    Get a <strong class="text-white">free Business Gap Scan</strong> and discover exactly where your ${niche.toLowerCase()} business is leaving money on the table — and what to do about it. No fluff, no pressure, just actionable intelligence.
  </p>
  <a href="/offers/gap-scan" class="mt-6 inline-flex items-center rounded-xl bg-brand-gold px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:shadow-xl active:translate-y-0">
    Get Your Free Gap Scan →
  </a>
</section>`;

  return `
<article class="prose max-w-none">
  <div class="mt-6">${intro}</div>
  ${sectionsHtml}
  ${cta}
</article>`;
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
