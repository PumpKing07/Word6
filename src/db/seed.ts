import { db } from "./index";
import { products, type NewProduct } from "./schema";

const seedProducts: NewProduct[] = [
  {
    name: "Маргарита",
    category: "Пицца",
    description:
      "Томатный соус, моцарелла фиор ди латте, свежий базилик, оливковое масло extra virgin.",
    price: 490,
    weight: 420,
    image: "margarita.jpg",
    isNew: false,
    isHit: true,
    isSpicy: false,
  },
  {
    name: "Пепперони",
    category: "Пицца",
    description:
      "Острая салями пепперони, моцарелла, томатный соус, орегано, маслины каламата.",
    price: 650,
    weight: 460,
    image: "pepperoni.jpg",
    isNew: false,
    isHit: true,
    isSpicy: true,
  },
  {
    name: "Четыре сыра",
    category: "Пицца",
    description:
      "Моцарелла, горгонзола, пармезан, дор блю, белая сливочная основа, грецкий орех.",
    price: 720,
    weight: 440,
    image: "four-cheese.jpg",
    isNew: true,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Диавола",
    category: "Пицца",
    description:
      "Острая салями, чили, красный перец, томатный соус, моцарелла, оливки.",
    price: 690,
    weight: 470,
    image: "diavola.jpg",
    isNew: false,
    isHit: false,
    isSpicy: true,
  },
  {
    name: "Гавайская",
    category: "Пицца",
    description:
      "Ветчина, ананас, моцарелла, томатный соус, орегано. Классика со сладкой ноткой.",
    price: 620,
    weight: 480,
    image: "hawaiian.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "BBQ Курица",
    category: "Пицца",
    description:
      "Филе курицы, лук, болгарский перец, кукуруза, соус BBQ, моцарелла.",
    price: 680,
    weight: 490,
    image: "bbq-chicken.jpg",
    isNew: true,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Овощной сад",
    category: "Пицца",
    description:
      "Болгарский перец трёх цветов, шампиньоны, маслины, свежий базилик, моцарелла.",
    price: 590,
    weight: 470,
    image: "veggie-garden.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Карбонара",
    category: "Пицца",
    description:
      "Бекон, лук, сливочная основа, моцарелла, пармезан, свежий базилик.",
    price: 640,
    weight: 450,
    image: "carbonara.jpg",
    isNew: false,
    isHit: true,
    isSpicy: false,
  },
  {
    name: "Прошутто",
    category: "Пицца",
    description:
      "Прошутто котто, черри, руккола, моцарелла, томатный соус, оливковое масло.",
    price: 750,
    weight: 460,
    image: "prosciutto.jpg",
    isNew: true,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Грибы и трюфель",
    category: "Пицца",
    description:
      "Шампиньоны, белые грибы, трюфельное масло, моцарелла, сливочная основа.",
    price: 780,
    weight: 440,
    image: "mushroom-truffle.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "С креветками",
    category: "Пицца",
    description:
      "Королевские креветки, черри, моцарелла, сливочная основа, трюфельное масло.",
    price: 890,
    weight: 470,
    image: "seafood-delight.jpg",
    isNew: true,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Песто Верде",
    category: "Пицца",
    description:
      "Соус песто, черри, шампиньоны, базилик, моцарелла, оливковое масло.",
    price: 670,
    weight: 430,
    image: "pesto-verde.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Острая колбаска",
    category: "Пицца",
    description:
      "Острая салями, болгарский перец, халапеньо, моцарелла, томатный соус.",
    price: 660,
    weight: 460,
    image: "spicy-sausage.jpg",
    isNew: false,
    isHit: false,
    isSpicy: true,
  },
  {
    name: "Мясной пир",
    category: "Пицца",
    description:
      "Пепперони, ветчина, бекон, маслины, томатный соус, моцарелла, орегано.",
    price: 790,
    weight: 510,
    image: "meat-feast.jpg",
    isNew: false,
    isHit: true,
    isSpicy: false,
  },
  {
    name: "Сырная симфония",
    category: "Пицца",
    description:
      "Моцарелла, пармезан, чеддер, рикотта, белая основа, свежий базилик.",
    price: 730,
    weight: 450,
    image: "cheese-lovers.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Каприччоза",
    category: "Пицца",
    description:
      "Ветчина, шампиньоны, артишоки, маслины, моцарелла, томатный соус.",
    price: 690,
    weight: 470,
    image: "capricciosa.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Калабрезе",
    category: "Пицца",
    description:
      "Острая 'ндуя, маслины, болгарский перец, моцарелла, томатный соус.",
    price: 710,
    weight: 460,
    image: "calabrese.jpg",
    isNew: true,
    isHit: false,
    isSpicy: true,
  },
  {
    name: "Формаджо Бьянко",
    category: "Пицца",
    description:
      "Белая основа, три сыра, шампиньоны, свежий базилик, оливковое масло.",
    price: 680,
    weight: 440,
    image: "formaggio-bianco.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Томат и Базилик",
    category: "Пицца",
    description:
      "Томаты черри, моцарелла, томатный соус, много свежего базилика.",
    price: 560,
    weight: 430,
    image: "tomato-basil.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Курица Ранч",
    category: "Пицца",
    description:
      "Филе курицы, бекон, кукуруза, соус ранч, моцарелла, свежая зелень.",
    price: 700,
    weight: 490,
    image: "chicken-ranch.jpg",
    isNew: true,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Вегетарианская делюкс",
    category: "Пицца",
    description:
      "Перец трёх цветов, шампиньоны, красный лук, моцарелла, томатный соус.",
    price: 610,
    weight: 470,
    image: "vegetariana-deluxe.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Острая Сицилиана",
    category: "Пицца",
    description:
      "Острая салями, чили, каперсы, маслины, моцарелла, томатный соус.",
    price: 720,
    weight: 470,
    image: "hot-siciliana.jpg",
    isNew: false,
    isHit: false,
    isSpicy: true,
  },
  {
    name: "Неаполь Классик",
    category: "Пицца",
    description:
      "Томаты сан-марцано, моцарелла ди буффала, базилик, оливковое масло.",
    price: 650,
    weight: 450,
    image: "napoli-classic.jpg",
    isNew: false,
    isHit: true,
    isSpicy: false,
  },
  {
    name: "Средиземноморская",
    category: "Пицца",
    description:
      "Маслины, томаты черри, красный лук, базилик, фета, моцарелла.",
    price: 690,
    weight: 460,
    image: "mediterranea.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Рома Спешиале",
    category: "Пицца",
    description:
      "Ветчина, шампиньоны, маслины, моцарелла, пармезан, томатный соус.",
    price: 710,
    weight: 470,
    image: "roma-speciale.jpg",
    isNew: true,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Милано Гурмэ",
    category: "Пицца",
    description:
      "Курица гриль, сладкий перец, моцарелла, сливочная основа, базилик.",
    price: 740,
    weight: 480,
    image: "milano-gourmet.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Фиренце Фунги",
    category: "Пицца",
    description:
      "Ассорти шампиньонов, лук, моцарелла, сливочная основа, свежий базилик.",
    price: 680,
    weight: 450,
    image: "firenze-funghi.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Верона Верде",
    category: "Пицца",
    description:
      "Песто, шампиньоны, базилик, лук, моцарелла, оливковое масло.",
    price: 700,
    weight: 440,
    image: "verona-verde.jpg",
    isNew: true,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Торино Карне",
    category: "Пицца",
    description:
      "Бекон, пепперони, красный лук, моцарелла, томатный соус, орегано.",
    price: 760,
    weight: 500,
    image: "torino-carne.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Генова Густо",
    category: "Пицца",
    description:
      "Песто из базилика, томаты черри, моцарелла, кедровые орешки.",
    price: 650,
    weight: 430,
    image: "genova-gusto.jpg",
    isNew: false,
    isHit: false,
    isSpicy: false,
  },
  {
    name: "Палермо Пикканте",
    category: "Пицца",
    description:
      "Острая салями, чили, халапеньо, красный перец, моцарелла.",
    price: 690,
    weight: 460,
    image: "palermo-piccante.jpg",
    isNew: false,
    isHit: false,
    isSpicy: true,
  },
  {
    name: "Болонья Богатая",
    category: "Пицца",
    description:
      "Бекон, шампиньоны, лук, маслины, моцарелла, томатный соус, орегано.",
    price: 730,
    weight: 490,
    image: "bologna-rich.jpg",
    isNew: false,
    isHit: true,
    isSpicy: false,
  },
];

async function main() {
  console.log("Очистка таблицы products...");
  await db.delete(products);

  console.log(`Вставка ${seedProducts.length} пицц...`);
  await db.insert(products).values(seedProducts);

  console.log("Готово. База успешно засеяна.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
