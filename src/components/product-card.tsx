import Image from "next/image";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatWeight } from "@/lib/utils";
import type { Product } from "@/db/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-transparent bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-200 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-50">
        <Image
          src={`/images/${product.image}`}
          alt={`Пицца ${product.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isHit && <Badge variant="hit">Хит</Badge>}
          {product.isNew && <Badge variant="brand">Новинка</Badge>}
          {product.isSpicy && (
            <Badge variant="destructive" className="gap-1">
              <Flame className="h-3 w-3" />
              Остро
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold leading-tight text-neutral-900 transition-colors group-hover:text-[#F4B400]">
            {product.name}
          </h3>
          <span className="shrink-0 text-xs text-neutral-400">
            {formatWeight(product.weight)}
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500">от</span>
            <span className="text-xl font-black text-neutral-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <Button variant="brand" size="default" aria-label={`В корзину: ${product.name}`}>
            В корзину
          </Button>
        </div>
      </div>
    </article>
  );
}
