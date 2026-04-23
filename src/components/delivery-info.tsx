import Image from "next/image";
import { CreditCard, Clock3, Truck, MapPin } from "lucide-react";

const STEPS = [
  {
    Icon: CreditCard,
    text: "Оплата наличными, картой или онлайн — на ваш выбор.",
  },
  {
    Icon: Clock3,
    text: "Доставляем ежедневно с 10:00 до 23:00 по Москве.",
  },
  {
    Icon: Truck,
    text: "Бесплатная доставка при заказе от 1 000 ₽.",
  },
  {
    Icon: MapPin,
    text: "Работаем в пределах МКАД и ближайшего Подмосковья.",
  },
];

export function DeliveryInfo() {
  return (
    <section
      aria-label="Оплата и доставка"
      className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl bg-[#F1F5F9] px-6 py-10 sm:px-10">
        <h2 className="text-center text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
          Оплата и доставка
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ Icon, text }, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-white p-6 pt-10 text-sm text-neutral-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#FFD23F] text-neutral-900 shadow transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-center leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl">
          <Image
            src="/images/delivery-map.svg"
            alt="Карта зоны доставки FIBO Pasta Bar"
            width={1110}
            height={400}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
