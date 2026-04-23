import { CatalogPagination } from "@/components/catalog-pagination";
import { DeliveryInfo } from "@/components/delivery-info";
import { HeroBanners } from "@/components/hero-banners";
import { NoveltiesStrip } from "@/components/novelties-strip";
import { ProductCard } from "@/components/product-card";
import { PromoSection } from "@/components/promo-section";
import { getNewProducts, getProducts } from "@/db/queries";

const PAGE_SIZE = 6;

interface CatalogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const requestedPage = Number(params.page) || 1;
  const page = requestedPage > 0 ? requestedPage : 1;

  const [paginated, novelties] = await Promise.all([
    getProducts(page, PAGE_SIZE),
    getNewProducts(8),
  ]);

  return (
    <>
      <HeroBanners />

      <NoveltiesStrip items={novelties} />

      <section
        aria-label="Каталог пицц"
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Пицца
          </h2>
          <p className="text-sm text-neutral-500">
            Всего{" "}
            <span className="font-semibold text-neutral-900">
              {paginated.total}
            </span>{" "}
            позиций · страница{" "}
            <span className="font-semibold text-neutral-900">
              {paginated.currentPage}
            </span>{" "}
            из{" "}
            <span className="font-semibold text-neutral-900">
              {paginated.totalPages}
            </span>
          </p>
        </div>

        {paginated.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
            <p className="text-lg font-semibold">Товары не найдены</p>
            <p className="text-sm text-neutral-500">
              Попробуйте вернуться на первую страницу каталога.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <CatalogPagination
          currentPage={paginated.currentPage}
          totalPages={paginated.totalPages}
        />
      </section>

      <PromoSection />

      <DeliveryInfo />
    </>
  );
}
