/* Content cloned from life-ready-desk.base44.app */

export type LrdService = {
  id?: string;
  category: string;
  title: string;
  desc: string;
  price: string;
  format: string;
  turnaround: string;
  flags?: string[];
};

export const LRD_CATEGORIES = [
  "Insurance & Health",
  "Taxes & ITIN",
  "Immigration",
  "Notary & Translation",
  "Housing",
  "Business",
  "Rentals",
] as const;

const APPT = "Appointment required";
const SAME = "Same-day available";
const NOT_LEGAL = "Not legal advice · attorney referral available";

/* ── 27 CH-priced services (full clone, with real ids) ── */
export const LRD_SERVICES: LrdService[] = [
  { id: "6ac6e91c52554a739c3c02c0", category: "Business", title: "Business Registration (NJ LLC)", desc: "Filing coordination. NJ state fee separate.", price: "From $199", format: "Online or in person", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02c1", category: "Business", title: "EIN (Tax ID) Support", desc: "Organize your information and complete a client-directed EIN application. The EIN is issued by the IRS.", price: "$75", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02c2", category: "Business", title: "Bookkeeping", desc: "Monthly books, categorization and reports.", price: "From $250 / mo", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02be", category: "Housing", title: "Rental Application File Setup", desc: "ID, income, references, bank statements in one folder.", price: "$95", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02bf", category: "Housing", title: "Seller Readiness File", desc: "Document and prep checklist before meeting a realtor.", price: "$125", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02bd", category: "Housing", title: "Property Search Concierge", desc: "Seven days of curated search and viewing coordination.", price: "$199", format: "Online or in person", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02b8", category: "Immigration", title: "Asylum Document Organization", desc: "Sorting, translation coordination and attorney referral. No legal advice.", price: "Request a quote", format: "Online or in person", turnaround: "Quote required", flags: [NOT_LEGAL] },
  { id: "6ac6e91c52554a739c3c02b7", category: "Immigration", title: "Citizenship Application File", desc: "Document organization and form typing support.", price: "From $150", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL] },
  { id: "6ac6e91c52554a739c3c02b6", category: "Immigration", title: "Family Petition File", desc: "Checklist, translation coordination and organized file assembly.", price: "From $175", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL] },
  { id: "6ac6e91c52554a739c3c02b5", category: "Immigration", title: "USCIS Form Typing (Clerical)", desc: "Typing from information you provide. We do not choose forms for you.", price: "From $95", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL] },
  { id: "6ac6e91c52554a739c3c02b4", category: "Immigration", title: "Immigration Document Checklist", desc: "Checklist built around your stated goal.", price: "$35", format: "Online", turnaround: APPT, flags: [NOT_LEGAL] },
  { id: "6ac6e91c52554a739c3c02ab", category: "Insurance & Health", title: "Auto Insurance Assistance", desc: "Quote intake and connection to a licensed agent.", price: "No service fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  { id: "6ac6e91c52554a739c3c02ae", category: "Insurance & Health", title: "Financial Aid Application (FAFSA)", desc: "School financial-aid form support. You provide every answer.", price: "$75", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02ad", category: "Insurance & Health", title: "Healthcare Reform (ACA) Application", desc: "Marketplace enrollment paperwork and document checklist.", price: "$55", format: "Online or in person", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02ac", category: "Insurance & Health", title: "Medicaid / NJ FamilyCare Application", desc: "Collect documents and complete your application with you.", price: "$45", format: "Online or in person", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02b9", category: "Notary & Translation", title: "Notary Services", desc: "Valid government-issued photo ID required. Sign in the presence of the notary.", price: "Request a quote", format: "In person", turnaround: "Quote required" },
  { id: "6ac6e91c52554a739c3c02ba", category: "Notary & Translation", title: "Translation per Page (ES-EN)", desc: "Standard pages up to 250 words.", price: "$25 / page", format: "Online", turnaround: SAME },
  { id: "6ac6e91c52554a739c3c02bb", category: "Notary & Translation", title: "Certified Translation", desc: "Includes certification statement.", price: "$40 / page", format: "Online", turnaround: SAME },
  { id: "6ac6e91c52554a739c3c02bc", category: "Notary & Translation", title: "Letter Preparation", desc: "One-page personal, landlord, employer or school letter.", price: "$35", format: "Online", turnaround: SAME },
  { id: "6ac6e91c52554a739c3c02c5", category: "Rentals", title: "Tenant Lead Intake System", desc: "Lead form, pre-screening, auto-reply.", price: "$149", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02c4", category: "Rentals", title: "Premium Listing Package", desc: "Plus screening workflow, local SEO page and tenant FAQ.", price: "$499", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02c3", category: "Rentals", title: "Long-Term Listing Setup", desc: "Listing copy, photo checklist, lead form, showing calendar.", price: "$249", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02b0", category: "Taxes & ITIN", title: "Self-Employed / Schedule C Return", desc: "Federal and NJ, business income and expenses.", price: "From $425", format: "Online or in person", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02b1", category: "Taxes & ITIN", title: "ITIN Application Support", desc: "W-7 checklist, appointment coordination and paperwork prep. IRS does not charge for the form.", price: "From $225", format: "Online or in person", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02b2", category: "Taxes & ITIN", title: "IRS Notice Organization", desc: "Organize the notice and documents, with a next-step checklist. No representation.", price: "$85", format: "Online or in person", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02b3", category: "Taxes & ITIN", title: "Credit Report Education & Document Organization", desc: "Review your credit report, organize documents, and receive a personalized action checklist. No score increase guaranteed.", price: "$75", format: "Online", turnaround: APPT },
  { id: "6ac6e91c52554a739c3c02af", category: "Taxes & ITIN", title: "Simple Tax Return (Individual)", desc: "Federal and NJ return, W-2 income, standard deduction.", price: "From $175", format: "Online or in person", turnaround: APPT },
];

/* ── Full Life Admin Desk catalog (subset of the original 83 — the rest is
      behind the original app's data API; listed everything publicly shown) ── */
export const LRD_CATALOG: LrdService[] = [
  // Insurance & Health (11)
  { category: "Insurance & Health", title: "Auto Insurance Assistance", desc: "Quote intake and connection to a licensed agent.", price: "No service fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  { category: "Insurance & Health", title: "Home Insurance Assistance", desc: "Homeowner coverage intake and agent connection.", price: "No service fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  { category: "Insurance & Health", title: "Renter's Insurance Assistance", desc: "Renters coverage guidance and quote help.", price: "No service fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  { category: "Insurance & Health", title: "Business Insurance Assistance", desc: "Liability, commercial auto, workers' comp and property intake.", price: "No service fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  { category: "Insurance & Health", title: "Life Insurance Consultation", desc: "Needs check and licensed-producer referral.", price: "No fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  { category: "Insurance & Health", title: "Medicare Plan Appointment Support", desc: "Scheduling, document checklist, referral to a licensed Medicare professional.", price: "No fee", format: "Online", turnaround: APPT },
  { category: "Insurance & Health", title: "Dental & Vision Plan Assistance", desc: "Compare plans and get enrollment guidance through qualified channels.", price: "$25", format: "Online", turnaround: APPT },
  { category: "Insurance & Health", title: "Medicaid / NJ FamilyCare Application", desc: "Collect documents and complete your application with you.", price: "$45", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02ac" },
  { category: "Insurance & Health", title: "Healthcare Reform (ACA) Application", desc: "Marketplace enrollment paperwork and document checklist.", price: "$55", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02ad" },
  { category: "Insurance & Health", title: "Insurance Policy Review", desc: "Plain-language review of your declarations page and questions to ask your agent.", price: "$35", format: "Online", turnaround: APPT },
  { category: "Insurance & Health", title: "Financial Aid Application (FAFSA)", desc: "School financial-aid form support. You provide every answer.", price: "$75", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02ae" },
  // Taxes & ITIN (16)
  { category: "Taxes & ITIN", title: "Simple Tax Return (Individual)", desc: "Federal and NJ return, W-2 income, standard deduction.", price: "From $175", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02af" },
  { category: "Taxes & ITIN", title: "Simple Tax Return (Joint)", desc: "Married filing jointly, W-2 income, standard deduction.", price: "From $225", format: "Online or in person", turnaround: APPT },
  { category: "Taxes & ITIN", title: "Tax Return with Dependents", desc: "Federal and NJ with dependent-related forms.", price: "From $225", format: "Online or in person", turnaround: APPT },
  { category: "Taxes & ITIN", title: "Itemized Tax Return", desc: "Schedule A and documentation review.", price: "From $300", format: "Online or in person", turnaround: APPT },
  { category: "Taxes & ITIN", title: "Self-Employed / Schedule C Return", desc: "Federal and NJ, business income and expenses.", price: "From $425", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02b0" },
  { category: "Taxes & ITIN", title: "Rental Property Tax Return", desc: "Schedule E for one property.", price: "From $450", format: "Online or in person", turnaround: APPT },
  { category: "Taxes & ITIN", title: "NY/NJ Commuter Return", desc: "NJ resident filing with NY nonresident return.", price: "From $425", format: "Online or in person", turnaround: APPT },
  { category: "Taxes & ITIN", title: "Additional State Return", desc: "Per added state, subject to complexity.", price: "$125 each", format: "Online or in person", turnaround: APPT },
  { category: "Taxes & ITIN", title: "ITIN Application Support", desc: "W-7 checklist, appointment coordination and paperwork prep. IRS does not charge for the form.", price: "From $225", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02b1" },
  { category: "Taxes & ITIN", title: "ITIN Renewal Support", desc: "Renewal-focused W-7 support.", price: "From $175", format: "Online or in person", turnaround: APPT },
  { category: "Taxes & ITIN", title: "IRS Notice Organization", desc: "Organize the notice and documents, with a next-step checklist. No representation.", price: "$85", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02b2" },
  { category: "Taxes & ITIN", title: "Tax Payment Plan Assistance", desc: "Prepare your payment-plan request and checklist.", price: "$125", format: "Online", turnaround: APPT },
  { category: "Taxes & ITIN", title: "Payment Plans for Our Services", desc: "Split services over $300 into installments. Written terms first.", price: "$0 fee", format: "Online", turnaround: APPT },
  { category: "Taxes & ITIN", title: "Credit Report Education & Document Organization", desc: "Review your credit report, organize supporting documents, identify questions to ask creditors or qualified professionals, and receive a personalized action checklist. No score increase or removal of accurate information is guaranteed.", price: "$75", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02b3" },
  { category: "Taxes & ITIN", title: "Mortgage Readiness File", desc: "Income, bank, debt and ID checklist for a lender-ready file.", price: "$125", format: "Online", turnaround: APPT },
  { category: "Taxes & ITIN", title: "Mortgage Loan Help & Referral", desc: "File organization and licensed loan officer referral.", price: "$75", format: "Online", turnaround: APPT, flags: ["Licensed partner required"] },
  // Immigration (11)
  { category: "Immigration", title: "Immigration Document Checklist", desc: "Checklist built around your stated goal.", price: "$35", format: "Online", turnaround: APPT, flags: [NOT_LEGAL], id: "6ac6e91c52554a739c3c02b4" },
  { category: "Immigration", title: "USCIS Form Typing (Clerical)", desc: "Typing from information you provide. We do not choose forms for you.", price: "From $95", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL], id: "6ac6e91c52554a739c3c02b5" },
  { category: "Immigration", title: "Family Petition File", desc: "Checklist, translation coordination and organized file assembly.", price: "From $175", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL], id: "6ac6e91c52554a739c3c02b6" },
  { category: "Immigration", title: "Employment Authorization (EAD) File", desc: "Clerical form support and document organization.", price: "From $125", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL] },
  { category: "Immigration", title: "Citizenship Application File", desc: "Document organization and form typing support.", price: "From $150", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL], id: "6ac6e91c52554a739c3c02b7" },
  { category: "Immigration", title: "Green Card Renewal File", desc: "Clerical support and package organization.", price: "From $125", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL] },
  { category: "Immigration", title: "Travel Permit File", desc: "Paperwork support and document checklist.", price: "From $125", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL] },
  { category: "Immigration", title: "Minor Travel Consent Package", desc: "Consent letter plus notary appointment for children traveling.", price: "$65", format: "Online or in person", turnaround: "Quote required" },
  { category: "Immigration", title: "Asylum Document Organization", desc: "Sorting, translation coordination and attorney referral. No legal advice.", price: "Quote", format: "Online or in person", turnaround: APPT, flags: [NOT_LEGAL], id: "6ac6e91c52554a739c3c02b8" },
  { category: "Immigration", title: "USCIS Notice Translation", desc: "Translation coordination and filing of your notice.", price: "$45", format: "Online", turnaround: APPT, flags: [NOT_LEGAL] },
  { category: "Immigration", title: "Immigration Attorney Referral", desc: "Intake to a licensed attorney or DOJ-accredited representative.", price: "No fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  // Notary & Translation (13)
  { category: "Notary & Translation", title: "Notary Services", desc: "A valid government-issued photo ID is required. Sign only in the presence of the notary. Travel, printing, copying and after-hours convenience fees—if applicable—are disclosed separately before your appointment.", price: "Price disclosed before service", format: "In person", turnaround: SAME, id: "6ac6e91c52554a739c3c02b9" },
  { category: "Notary & Translation", title: "Mobile Notary, Local", desc: "Travel within the local zone. Disclosed before booking.", price: "$45 + notary fee", format: "In person", turnaround: SAME },
  { category: "Notary & Translation", title: "Mobile Notary, Extended", desc: "Travel outside the local zone.", price: "$75 + notary fee", format: "In person", turnaround: SAME },
  { category: "Notary & Translation", title: "Translation per Page (ES↔EN)", desc: "Standard pages up to 250 words.", price: "$25 / page", format: "Online", turnaround: SAME, id: "6ac6e91c52554a739c3c02ba" },
  { category: "Notary & Translation", title: "Certified Translation", desc: "Includes certification statement.", price: "$40 / page", format: "Online", turnaround: SAME, id: "6ac6e91c52554a739c3c02bb" },
  { category: "Notary & Translation", title: "Rush Translation", desc: "24 to 48 hour priority when available.", price: "+$20 / page", format: "Online", turnaround: SAME },
  { category: "Notary & Translation", title: "Letter Preparation", desc: "One-page personal, landlord, employer or school letter.", price: "$35", format: "Online", turnaround: SAME, id: "6ac6e91c52554a739c3c02bc" },
  { category: "Notary & Translation", title: "Formal Dispute Letter Draft", desc: "Drafted from your facts. Not legal advice.", price: "$65", format: "Online", turnaround: SAME, flags: [NOT_LEGAL] },
  { category: "Notary & Translation", title: "Résumé Refresh", desc: "One-page redesign and edit.", price: "$85", format: "Online", turnaround: SAME },
  { category: "Notary & Translation", title: "Résumé Package", desc: "Résumé, cover letter and LinkedIn summary.", price: "$145", format: "Online", turnaround: SAME },
  { category: "Notary & Translation", title: "Printing / Copies", desc: "Per letter-size page.", price: "$0.25 b&w · $0.75 color", format: "In person", turnaround: SAME },
  { category: "Notary & Translation", title: "Scan to Email / USB", desc: "Secure scanning.", price: "$5 minimum", format: "In person", turnaround: SAME },
  { category: "Notary & Translation", title: "Digital Document Setup", desc: "Organized, password-protected folder.", price: "$20", format: "Online", turnaround: SAME },
  // Housing (8)
  { category: "Housing", title: "Realtor Referral & Buyer Readiness", desc: "Introduction to a licensed NJ real estate professional.", price: "No fee", format: "Online or in person", turnaround: APPT, flags: ["Licensed partner required"] },
  { category: "Housing", title: "Property Search Concierge", desc: "Seven days of curated search and viewing coordination.", price: "$199", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02bd" },
  { category: "Housing", title: "Rental Search Launch Session", desc: "Budget, location, readiness and a search plan.", price: "$75", format: "Online", turnaround: APPT },
  { category: "Housing", title: "Rental Application File Setup", desc: "ID, income, references, bank statements in one folder.", price: "$95", format: "Online", turnaround: APPT, flags: [NOT_LEGAL], id: "6ac6e91c52554a739c3c02be" },
  { category: "Housing", title: "Renter's Contract Review Prep", desc: "Clause checklist and questions for the landlord or an attorney. Not legal advice.", price: "$65", format: "Online", turnaround: APPT, flags: [NOT_LEGAL] },
  { category: "Housing", title: "Seller Readiness File", desc: "Document and prep checklist before meeting a realtor.", price: "$125", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02bf" },
  { category: "Housing", title: "Real Estate Transaction Organization", desc: "Administrative organization. No brokerage.", price: "$150", format: "Online", turnaround: APPT },
  { category: "Housing", title: "Move-In Utility Checklist", desc: "Utilities, insurance and documents for your move.", price: "$25", format: "Online", turnaround: APPT },
  // Business (3 shown publicly of 9)
  { category: "Business", title: "Business Registration (NJ LLC)", desc: "Filing coordination. NJ state fee separate.", price: "From $199", format: "Online or in person", turnaround: APPT, id: "6ac6e91c52554a739c3c02c0" },
  { category: "Business", title: "EIN (Tax ID) Support", desc: "Organize your information and complete a client-directed EIN application. The EIN is issued by the IRS.", price: "$75", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02c1" },
  { category: "Business", title: "Bookkeeping", desc: "Monthly books, categorization and reports.", price: "From $250 / mo", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02c2" },
  // Rentals (3 shown publicly of 15)
  { category: "Rentals", title: "Long-Term Listing Setup", desc: "Listing copy, photo checklist, lead form, showing calendar.", price: "$249", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02c3" },
  { category: "Rentals", title: "Premium Listing Package", desc: "Plus screening workflow, local SEO page and tenant FAQ.", price: "$499", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02c4" },
  { category: "Rentals", title: "Tenant Lead Intake System", desc: "Lead form, pre-screening, auto-reply.", price: "$149", format: "Online", turnaround: APPT, id: "6ac6e91c52554a739c3c02c5" },
];

export const LRD_SERVICE_CARDS = [
  { title: "Insurance, Health & Aid", desc: "Auto, home, business, Medicare, Medicaid, ACA, dental, life, FAFSA", cat: "Insurance & Health" },
  { title: "Taxes, ITIN & Financial Services", desc: "Tax returns, ITIN, credit, mortgage file prep, payment plans", cat: "Taxes & ITIN" },
  { title: "Immigration Paperwork Support", desc: "Citizenship, EAD, green card renewal, family petition files, minors' travel, asylum documents", cat: "Immigration" },
  { title: "Notary, Translation & Documents", desc: "Notary, translation per page, letters, résumés, printing", cat: "Notary & Translation" },
  { title: "Realtor & Housing Help", desc: "Realtor referral, finding a property, renter's contract help", cat: "Housing" },
  { title: "Accounting & Business Registration", desc: "LLC registration, EIN, payroll, bookkeeping, business taxes", cat: "Business" },
  { title: "Short & Long-Term Rentals", desc: "Landlord launch, tenant intake, 30+ day furnished stays", cat: "Rentals" },
];

export const LRD_DISCLOSURES = {
  title: "Disclosures",
  p1: "We provide administrative, clerical, translation, document-preparation, scheduling and referral-coordination services. We are not a law firm and do not provide legal advice or representation. We do not provide tax, insurance, investment, real-estate brokerage, lending or credit-repair advice unless performed by an appropriately licensed professional. Government agencies decide eligibility and approval. Government, insurer, legal, lender and third-party fees are separate unless stated. Prices are starting prices and may change with complexity.",
  p2: "Credit report education and document organization is offered as an informational service; no score increase or removal of accurate information is guaranteed. Notary acts are performed by a New Jersey notary who cannot give legal advice; notary fees are disclosed by notarial act before service, with any travel, printing or after-hours convenience fees shown separately.",
};
