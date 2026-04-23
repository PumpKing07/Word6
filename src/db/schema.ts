import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  weight: integer("weight").notNull(),
  image: text("image").notNull(),
  isNew: integer("is_new", { mode: "boolean" }).notNull().default(false),
  isHit: integer("is_hit", { mode: "boolean" }).notNull().default(false),
  isSpicy: integer("is_spicy", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
