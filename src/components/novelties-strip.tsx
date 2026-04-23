import Image from "next/image";
import type { Product } from "@/db/schema";
import { formatPrice } from "@/lib/utils";

interface NoveltiesStripProps {
  items: Product[];
}

export function NoveltiesStrip({ items }: NoveltiesStripProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label="Новинки"
      className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <h2 className="mb-5 text-2xl font-black tracking-tight text-neutral-900">
        Новинки
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group flex w-[260px] shrink-0 items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFD23F] hover:shadow-md"
          >
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-neutral-50">
              <Image
                src={`/images/${item.image}`}
                alt={item.name}
                fill
                sizes="72px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="truncate text-sm font-semibold text-neutral-900">
                {item.name}
              </p>
              <p className="text-xs text-neutral-500">
                от {formatPrice(item.price)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
