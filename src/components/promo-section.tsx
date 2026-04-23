import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SIDE_PROMOS = [
  {
    title: "Комбо",
    subtitle: "дня",
    src: "/images/promo-combo.jpg",
  },
  {
    title: "2-я пицца",
    subtitle: "в подарок",
    src: "/images/promo-second-free.jpg",
  },
  {
    title: "Доставка",
    subtitle: "бесплатно",
    src: "/images/promo-free-delivery.jpg",
  },
  {
    title: "Скидка",
    subtitle: "20%",
    src: "/images/promo-discount.jpg",
  },
];

export function PromoSection() {
  return (
    <section
      id="promotions"
      aria-label="Наши акции"
      className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <h2 className="mb-8 text-center text-3xl font-black tracking-tight sm:text-4xl">
        Наши <span className="text-[#F4B400]">акции</span>
      </h2>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="group relative aspect-[1110/322] overflow-hidden rounded-3xl">
          <Image
            src="/images/promo-cakes.jpg"
            alt="Торты любой сложности на заказ"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-1 p-8 text-white sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD23F]">
              Торты
            </p>
            <p className="text-3xl font-black leading-tight sm:text-4xl">
              ЛЮБОЙ СЛОЖНОСТИ
            </p>
            <p className="text-3xl font-black leading-tight text-[#FFD23F] sm:text-4xl">
              НА ЗАКАЗ
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/80">
              От авторских кондитеров. Минимальный заказ — от 750 ₽/кг.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {SIDE_PROMOS.map((promo) => (
            <button
              key={promo.title}
              type="button"
              className="group relative aspect-square overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD23F]"
            >
              <Image
                src={promo.src}
                alt={`${promo.title} ${promo.subtitle}`}
                fill
                sizes="(min-width: 1024px) 16vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col p-4 text-left text-white">
                <span className="text-lg font-black leading-tight">
                  {promo.title}
                </span>
                <span className="text-sm font-medium text-[#FFD23F]">
                  {promo.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="#" className="contents">
          <Button variant="brand" size="lg">
            Все акции
          </Button>
        </Link>
      </div>
    </section>
  );
}
