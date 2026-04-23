import Image from "next/image";

interface HeroBanner {
  src: string;
  alt: string;
  variant: "slice" | "fibo";
  subtitle?: string;
}

const BANNERS: HeroBanner[] = [
  {
    src: "/images/hero-slice-left.jpg",
    alt: "Слайс пиццы за 149 рублей",
    variant: "slice",
    subtitle: "за 149 ₽",
  },
  {
    src: "/images/hero-fibo-black.jpg",
    alt: "FIBO Pasta Bar — промо",
    variant: "fibo",
    subtitle: "Доставка от 31 мин",
  },
  {
    src: "/images/hero-fibo-dark.jpg",
    alt: "FIBO Pasta Bar — промо",
    variant: "fibo",
    subtitle: "Итальянская кухня",
  },
  {
    src: "/images/hero-slice-right.jpg",
    alt: "Слайс пиццы за 149 рублей",
    variant: "slice",
    subtitle: "за 149 ₽",
  },
];

export function HeroBanners() {
  return (
    <section
      aria-label="Акции и предложения"
      className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {BANNERS.map((banner, idx) => (
          <button
            key={idx}
            type="button"
            className="group relative aspect-[478/276] overflow-hidden rounded-3xl bg-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD23F]"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div
              className={`absolute inset-0 ${
                banner.variant === "slice"
                  ? "bg-gradient-to-tr from-black/60 via-black/20 to-transparent"
                  : "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
              }`}
            />

            <div className="absolute inset-0 flex flex-col justify-end p-5 text-left text-white">
              {banner.variant === "slice" ? (
                <>
                  <p className="text-3xl font-black leading-none tracking-tight sm:text-4xl">
                    СЛАЙС
                  </p>
                  <p className="mt-1 text-2xl font-black tracking-tight text-[#FFD23F] sm:text-3xl">
                    {banner.subtitle}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-black leading-none tracking-tight text-[#FFD23F] sm:text-4xl">
                    fibo
                  </p>
                  <p className="mt-1 text-xs font-bold tracking-[0.3em] sm:text-sm">
                    PASTA BAR
                  </p>
                  <p className="mt-2 text-xs opacity-80">{banner.subtitle}</p>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
