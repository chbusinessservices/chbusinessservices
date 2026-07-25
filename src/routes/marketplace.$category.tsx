import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatedSection } from "~/components/AnimatedSection";
import {
  allProducts,
  categoryLookup,
  categoryDescriptions,
  formatPrice,
  STRIPE_LINKS,
  getStripeTier,
  type Product,
} from "~/lib/marketplace-data";

/* ═══════════════════════════════════════════
   PRODUCT CARD
   ═══════════════════════════════════════════ */
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-premium group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Popular badge */}
      {product.popular && (
        <div className="absolute right-3 top-3 z-10">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Popular
          </span>
        </div>
      )}
      {/* Category badge */}
      <div className="px-6 pt-6">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
          {categoryLookup[product.category] || product.category}
        </span>
      </div>
      {/* Name & description */}
      <div className="px-6 pt-3">
        <h3 className="text-lg font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </div>
      {/* Price */}
      <div className="px-6 pt-4">
        <p className="font-mono text-2xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>
        <p className="mt-0.5 text-xs text-gray-400">One-time purchase</p>
      </div>
      {/* Features */}
      <div className="px-6 pt-5 flex-1">
        <ul className="space-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Actions */}
      <div className="px-6 py-5 mt-4 border-t border-gray-100">
        <div className="flex gap-3">
          <Link
            to="/marketplace/$category/$productId"
            params={{ category: product.category, productId: product.id }}
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
          >
            View Details
          </Link>
          <a
            href={product.stripeLink || STRIPE_LINKS[getStripeTier(product.price)]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROUTE
   ═══════════════════════════════════════════ */
export const Route = createFileRoute("/marketplace/$category")({
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const displayName = categoryLookup[category];
  const description = categoryDescriptions[category] || "Browse AI business kits in this category";
  const products = allProducts[category] || [];

  if (!displayName) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="text-7xl font-bold text-gray-100">404</div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">Category not found</h1>
          <p className="mt-3 text-gray-600">
            We couldn't find that category. Browse all available categories below.
          </p>
          <div className="mt-6">
            <Link to="/marketplace" className="btn-primary">
              Browse all categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute inset-0 hero-dots opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-indigo-600">Marketplace</p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                <span className="gradient-text">{displayName}</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{description}</p>
              <p className="mt-2 text-sm text-gray-400">
                {products.length} {products.length === 1 ? "product" : "products"} available
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Products Grid ─── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {products.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 60}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 py-16 sm:py-20">
        <div className="absolute inset-0 hero-dots opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Have a kit in this category?</h2>
            <p className="mt-3 text-lg text-indigo-100">List it here and reach buyers looking for exactly what you built.</p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Link to="/contact" className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
              List your kit
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
