import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const outDir = path.resolve("public/images");
fs.mkdirSync(outDir, { recursive: true });

// 32 Unsplash pizza photos by ID (public CDN, no API key needed).
// Every ID points to a real pizza/food shot on images.unsplash.com.
const PIZZA_PHOTOS = [
  { file: "margarita.jpg", id: "photo-1604068549290-dea0e4a305ca" },
  { file: "pepperoni.jpg", id: "photo-1628840042765-356cda07504e" },
  { file: "four-cheese.jpg", id: "photo-1571407970349-bc81e7e96d47" },
  { file: "diavola.jpg", id: "photo-1565299624946-b28f40a0ae38" },
  { file: "hawaiian.jpg", id: "photo-1565299585323-38d6b0865b47" },
  { file: "bbq-chicken.jpg", id: "photo-1513104890138-7c749659a591" },
  { file: "veggie-garden.jpg", id: "photo-1593560708920-61dd98c46a4e" },
  { file: "carbonara.jpg", id: "photo-1548369937-47519962c11a" },
  { file: "prosciutto.jpg", id: "photo-1574071318508-1cdbab80d002" },
  { file: "mushroom-truffle.jpg", id: "photo-1600028068383-ea11a7a101f3" },
  { file: "seafood-delight.jpg", id: "photo-1595854341625-f33ee10dbf94" },
  { file: "pesto-verde.jpg", id: "photo-1552539618-7eec9b4d1796" },
  { file: "spicy-sausage.jpg", id: "photo-1590947132387-155cc02f3212" },
  { file: "meat-feast.jpg", id: "photo-1571066811602-716837d681de" },
  { file: "cheese-lovers.jpg", id: "photo-1513442542250-854d436a73f2" },
  { file: "capricciosa.jpg", id: "photo-1601924582970-9238bcb495d9" },
  { file: "calabrese.jpg", id: "photo-1544982503-9f984c14501a" },
  { file: "formaggio-bianco.jpg", id: "photo-1566843972142-a7fcb70de55a" },
  { file: "tomato-basil.jpg", id: "photo-1559561853-08451507cbe7" },
  { file: "chicken-ranch.jpg", id: "photo-1506354666786-959d6d497f1a" },
  { file: "vegetariana-deluxe.jpg", id: "photo-1555072956-7758afb20e8f" },
  { file: "hot-siciliana.jpg", id: "photo-1565299507177-b0ac66763828" },
  { file: "napoli-classic.jpg", id: "photo-1544025162-d76694265947" },
  { file: "mediterranea.jpg", id: "photo-1594007654729-407eedc4be65" },
  { file: "roma-speciale.jpg", id: "photo-1595708684082-a173bb3a06c5" },
  { file: "milano-gourmet.jpg", id: "photo-1593504049359-74330189a345" },
  { file: "firenze-funghi.jpg", id: "photo-1585238342024-78d387f4a707" },
  { file: "verona-verde.jpg", id: "photo-1605478371310-a9f1e96b4ff4" },
  { file: "torino-carne.jpg", id: "photo-1542282088-fe8426682b8f" },
  { file: "genova-gusto.jpg", id: "photo-1506354666786-959d6d497f1a" },
  { file: "palermo-piccante.jpg", id: "photo-1588315029754-2dd089d39a1a" },
  { file: "bologna-rich.jpg", id: "photo-1574071318508-1cdbab80d002" },
];

// Hero banners and promo imagery.
const EXTRA_PHOTOS = [
  // 4 hero banner tiles (used in HeroBanners.tsx)
  { file: "hero-slice-left.jpg", id: "photo-1565299624946-b28f40a0ae38", w: 1080, h: 620 },
  { file: "hero-fibo-black.jpg", id: "photo-1513104890138-7c749659a591", w: 1080, h: 620 },
  { file: "hero-fibo-dark.jpg", id: "photo-1571407970349-bc81e7e96d47", w: 1080, h: 620 },
  { file: "hero-slice-right.jpg", id: "photo-1628840042765-356cda07504e", w: 1080, h: 620 },
  // Promo section (cakes) + small banners
  { file: "promo-cakes.jpg", id: "photo-1578985545062-69928b1d9587", w: 1400, h: 500 },
  { file: "promo-combo.jpg", id: "photo-1513104890138-7c749659a591", w: 600, h: 600 },
  { file: "promo-free-delivery.jpg", id: "photo-1526367790999-0150786686a2", w: 600, h: 600 },
  { file: "promo-second-free.jpg", id: "photo-1590947132387-155cc02f3212", w: 600, h: 600 },
  { file: "promo-discount.jpg", id: "photo-1601924582970-9238bcb495d9", w: 600, h: 600 },
  // Novelties circle thumbnails reuse pizza photos
];

function buildUrl(id, w = 600, h = 600) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
    });
    req.on("error", (err) => {
      file.close();
      try { fs.unlinkSync(dest); } catch {}
      reject(err);
    });
    req.setTimeout(30000, () => {
      req.destroy(new Error("timeout"));
    });
  });
}

async function runBatch(list, labeler) {
  const failures = [];
  const parallel = 6;
  for (let i = 0; i < list.length; i += parallel) {
    const chunk = list.slice(i, i + parallel);
    await Promise.all(
      chunk.map(async (item) => {
        const url = buildUrl(item.id, item.w, item.h);
        const dest = path.join(outDir, item.file);
        try {
          await download(url, dest);
          console.log(`  ✓ ${labeler}: ${item.file}`);
        } catch (err) {
          console.warn(`  ✗ ${labeler}: ${item.file} — ${err.message}`);
          failures.push(item);
        }
      })
    );
  }
  return failures;
}

(async () => {
  console.log(`Скачиваю ${PIZZA_PHOTOS.length} фото пицц...`);
  const failedPizzas = await runBatch(PIZZA_PHOTOS, "pizza");

  console.log(`Скачиваю ${EXTRA_PHOTOS.length} баннеров/промо...`);
  const failedExtra = await runBatch(EXTRA_PHOTOS, "extra");

  if (failedPizzas.length || failedExtra.length) {
    console.error(
      `\nОшибки: ${failedPizzas.length} пицц и ${failedExtra.length} доп. картинок не скачались.`
    );
    process.exit(1);
  }

  console.log(`\nГотово: ${fs.readdirSync(outDir).length} файлов в ${outDir}`);
})();
