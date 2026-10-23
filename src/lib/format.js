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

// Foto punya dua ukuran (scripts/optimize-images.js): x.webp 1600 px dan x-sm.webp 640 px
export function imageSrcSet(src) {
  return `${src.replace(/\.webp$/, '-sm.webp')} 640w, ${src} 1600w`
}
