import Link from "next/link";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { FiboLogo } from "@/components/fibo-logo";

const NAV_LINKS = [
  { label: "Пицца", href: "/?category=Пицца" },
  { label: "Паста", href: "/?category=Паста" },
  { label: "Супы", href: "/?category=Супы" },
  { label: "Салаты", href: "/?category=Салаты" },
  { label: "Напитки", href: "/?category=Напитки" },
  { label: "Десерты", href: "/?category=Десерты" },
  { label: "Бакалея", href: "/?category=Бакалея" },
  { label: "Антипасти", href: "/?category=Антипасти" },
  { label: "Акции", href: "#promotions" },
  { label: "Комбо", href: "/?category=Комбо" },
  { label: "Контакты", href: "#contacts" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="FIBO Pasta Bar — на главную"
          className="shrink-0 transition-transform hover:scale-[1.03]"
        >
          <FiboLogo className="h-12 w-auto" />
        </Link>

        <div className="ml-2 hidden min-w-0 flex-col md:flex">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <span>Доставка пасты</span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-600">Москва</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FFD23F] text-[10px] font-black text-black">
                Я
              </span>
              Яндекс еда
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-[#FFD23F] text-[#FFD23F]" />
              4.8
            </span>
            <span className="text-neutral-300">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Время доставки от 31 мин
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="tel:+74993918449"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            8 499 391-84-49
          </Link>
          <button
            type="button"
            className="hidden rounded-full bg-[#FFD23F] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-200 hover:bg-[#F4B400] hover:shadow active:scale-[0.98] sm:inline-block"
          >
            Заказать звонок
          </button>
          <Link
            href="#login"
            className="text-sm font-semibold text-neutral-900 transition-colors hover:text-[#F4B400]"
          >
            Войти
          </Link>
        </div>
      </div>

      <nav className="border-t border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-3 text-sm sm:px-6 lg:px-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative shrink-0 font-medium text-neutral-700 transition-colors hover:text-[#F4B400] after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:bg-[#FFD23F] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-auto hidden shrink-0 items-center gap-1 text-xs text-neutral-500 md:inline-flex">
            <MapPin className="h-3 w-3" />
            ул. Проспект Вернадского 86В
          </span>
        </div>
      </nav>
    </header>
  );
}
