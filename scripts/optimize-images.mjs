// Comprime/redimensiona las imágenes de src/assets en el sitio (in place).
// Uso: npm run optimize-images
// Pensado para correr cada vez que se añaden fotos nuevas de platos, antes de commitear.
import { readdir, stat } from 'node:fs/promises';
import { writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// process.cwd() en vez de import.meta.url: en Windows, decodificar la URL del
// módulo puede devolver los acentos de la ruta en forma Unicode NFD, que NTFS
// no empareja con el NFC real del disco y falla el open() al escribir.
const ASSETS_DIR = path.join(process.cwd(), 'src', 'assets');

const MAX_WIDTH = 1600; // ninguna imagen del sitio se muestra más ancha que esto
const JPEG_QUALITY = 78;
const PNG_QUALITY = 78;

const HANDLED_EXTS = ['.jpg', '.jpeg', '.png'];

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!HANDLED_EXTS.includes(ext)) return null;

  const before = (await stat(filePath)).size;
  // Leer a buffer primero: si se le pasa la ruta directamente a sharp, libvips
  // mantiene el archivo fuente abierto y el writeFileSync posterior sobre la
  // misma ruta falla en Windows con "unknown error" (sharing violation).
  const source = readFileSync(filePath);

  // El formato real del contenido (no la extensión) decide el códec de salida:
  // hay archivos .jpg en este repo que en realidad son PNG con transparencia
  // (p. ej. el logo). Si se fuerzan a JPEG se pierde el canal alfa.
  const meta = await sharp(source).metadata();
  const pipeline = sharp(source)
    .rotate() // respeta EXIF orientation antes de redimensionar
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const encoded = meta.hasAlpha
    ? pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  const buffer = await encoded.toBuffer();

  const after = buffer.length;
  if (after < before) {
    writeFileSync(filePath, buffer);
    return { before, after };
  }
  return { before, after: before, skipped: true };
}

async function main() {
  const entries = await readdir(ASSETS_DIR);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of entries) {
    const filePath = path.join(ASSETS_DIR, name);
    const result = await optimizeFile(filePath);
    if (!result) continue;

    totalBefore += result.before;
    totalAfter += result.after;
    const kb = (n) => (n / 1024).toFixed(0);
    const status = result.skipped ? 'sin cambios (ya optimizada)' : `${kb(result.before)} KB → ${kb(result.after)} KB`;
    console.log(`${name}: ${status}`);
  }

  console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
}

main();
