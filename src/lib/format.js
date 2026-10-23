// Nomor WhatsApp admin, dipakai untuk kost yang belum punya kontak (PRD D4)
export const ADMIN_PHONE = '628981548999'

export function formatRupiah(amount) {
  return `Rp ${Math.round(amount).toLocaleString('id-ID')}`
}

// "0813-1044-9264", "+62 813…", "813…" → "628131049264"; null jika bukan nomor HP Indonesia yang valid
export function normalizePhone(input) {
  let digits = String(input ?? '').replace(/\D/g, '')
  if (digits.startsWith('0')) digits = '62' + digits.slice(1)
  else if (digits.startsWith('8')) digits = '62' + digits
  return /^628\d{8,11}$/.test(digits) ? digits : null
}

export function waLink(phone, text) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

// "CX8Q+434, Airmadidi Atas, Kec. Airmadidi, …" → "Airmadidi Atas" (maks. 2 bagian, tanpa plus code)
export function shortAddress(address) {
  const parts = address
    .replace(/^[A-Z0-9]{4}\+[A-Z0-9]{2,3},\s*/, '')
    .split(/,\s*/)
    .filter((p) => p !== 'Unnamed Road')
  const end = parts.findIndex((p) => /^(Kec\.|Kabupaten|North )/.test(p))
  return parts.slice(0, end === -1 ? 2 : Math.min(end, 2)).join(', ')
}

// Foto punya dua ukuran (scripts/optimize-images.js): x.webp 1600 px dan x-sm.webp 640 px
export function imageSrcSet(src) {
  return `${src.replace(/\.webp$/, '-sm.webp')} 640w, ${src} 1600w`
}
