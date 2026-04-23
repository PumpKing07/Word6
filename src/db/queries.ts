import { desc, eq, sql } from "drizzle-orm";
import { db } from "./index";
import { products, type Product } from "./schema";

export interface PaginatedProducts {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export async function getProducts(
  page: number = 1,
  pageSize: number = 6,
): Promise<PaginatedProducts> {
  const safePage = Math.max(1, Math.floor(page));
  const safeSize = Math.max(1, Math.floor(pageSize));
  const offset = (safePage - 1) * safeSize;

  const items = await db
    .select()
    .from(products)
    .orderBy(desc(products.isHit), desc(products.isNew), products.id)
    .limit(safeSize)
    .offset(offset);

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(products);
  const total = totalResult[0]?.count ?? 0;

  const totalPages = Math.max(1, Math.ceil(total / safeSize));

  return {
    items,
    total,
    totalPages,
    currentPage: safePage,
    pageSize: safeSize,
  };
}

export async function getNewProducts(limit: number = 8): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.isNew, true))
    .orderBy(desc(products.id))
    .limit(limit);
}
