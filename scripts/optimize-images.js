// Kompres foto kost ke WebP di public/gambar.
// Pemakaian: npm run images -- <folder-sumber>   (default: legacy/gambar)
// Hasil per foto: <nama>.webp (lebar maks 1600 px) dan <nama>-sm.webp (640 px, untuk kartu & thumbnail)
import { mkdir, readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SOURCE = process.argv[2] ?? 'legacy/gambar'
const OUT = 'public/gambar'
const MAX_BYTES = 200 * 1024
const variants = [
  { suffix: '', width: 1600 },
  { suffix: '-sm', width: 640 },
]

async function encode(input, width) {
  // Turunkan kualitas bertahap sampai ukuran ≤ 200 KB
  for (let quality = 78; ; quality -= 8) {
    const buffer = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()
    if (buffer.length <= MAX_BYTES || quality <= 46) return buffer
  }
}

await mkdir(OUT, { recursive: true })
const files = (await readdir(SOURCE)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))

for (const file of files) {
  const { name } = parse(file)
  for (const { suffix, width } of variants) {
    const buffer = await encode(join(SOURCE, file), width)
    await sharp(buffer).toFile(join(OUT, `${name}${suffix}.webp`))
    console.log(`${name}${suffix}.webp  ${Math.round(buffer.length / 1024)} KB`)
  }
}
