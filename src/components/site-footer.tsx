import Link from "next/link";
import { Phone, Mail, AtSign, Send, MessageCircle } from "lucide-react";
import { FiboLogo } from "@/components/fibo-logo";

const LEGAL_LINKS = [
  { label: "Калорийность и состав", href: "#" },
  { label: "Правовая информация", href: "#" },
  { label: "Публичная оферта", href: "#" },
  { label: "Политика конфиденциальности", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "ВКонтакте", href: "#", Icon: AtSign },
  { label: "Max", href: "#", Icon: Send },
  { label: "Telegram", href: "#", Icon: Send },
  { label: "WhatsApp", href: "#", Icon: MessageCircle },
];

export function SiteFooter() {
  return (
    <footer id="contacts" className="mt-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1.2fr]">
          <div>
            <FiboLogo className="h-14 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-neutral-600">
              Доставка итальянской еды в Москве. Готовим с любовью из свежих
              ингредиентов.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Правовая информация
            </h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-[#F4B400]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-semibold text-neutral-900">
              Мы в соцсетях
            </h3>
            <div className="mt-3 flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFD23F] hover:bg-[#FFD23F] hover:text-neutral-900 active:scale-95"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Остались вопросы? А мы всегда на связи:
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="mailto:hello@fibo.ru"
                aria-label="Email"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-neutral-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-12 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <AtSign className="h-4 w-4" />
                Написать нам
              </Link>
              <Link
                href="#"
                aria-label="Чат"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-neutral-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-4 rounded-xl bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-neutral-500">
                Москва, ул. Проспект Вернадского 86В
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="tel:+74993918449"
                className="flex items-center gap-3 text-2xl font-black text-neutral-900 transition-colors hover:text-[#F4B400]"
              >
                <Phone className="h-5 w-5" />
                8 499 391-84-49
              </Link>
              <button
                type="button"
                className="mt-4 inline-flex items-center rounded-full bg-[#FFD23F] px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-all duration-200 hover:bg-[#F4B400] active:scale-[0.98]"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <p>Все права защищены © {new Date().getFullYear()}</p>
          <p>Сделано с любовью к итальянской кухне</p>
        </div>
      </div>
    </footer>
  );
}
