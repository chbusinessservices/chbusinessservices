/* ═══════════════════════════════════════════
   Shared SEO helpers
   ═══════════════════════════════════════════ */
export const SITE_URL = "https://chbusinessservices.pro";
export const SITE_NAME = "CH Business Services";

export interface PageMeta {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  ogImage?: string;
}

/** Generate a standard set of head meta/link entries for a page */
export function pageHead({ title, description, path, ogType = "website", ogImage }: PageMeta) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
    ],
  };
}

/** Organization JSON-LD for the homepage */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description:
      "CH Business Services builds conversion-focused websites, automation systems, AI business kits, and intelligence reports that turn visitors into customers.",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [
      "https://www.linkedin.com/company/133396602/",
      "https://github.com/ch-business-services",
    ],
  };
}

/** FAQ structured data (Question/Answer) */
export function faqLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** BreadcrumbList for product pages */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Product structured data */
export function productLd(product: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: product.url,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "USD",
      availability: "https://schema.org/InStock",
      url: product.url,
    },
  };
}

/** BlogPosting structured data */
export function blogPostingLd(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: post.url,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Organization",
      name: post.authorName || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}
