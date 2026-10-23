import { formatRupiah, normalizePhone } from './format.js'

// Tanggal lokal "YYYY-MM-DD" (format input type=date), bukan UTC
export const todayISO = () => new Date().toLocaleDateString('en-CA')

// Mengembalikan { field: pesan } untuk setiap field yang tidak valid; objek kosong = valid
export function validateBooking({ kostId, name, phone, date, months }, today = todayISO()) {
  const errors = {}
  if (!kostId) errors.kostId = 'Pilih kost yang ingin dipesan.'
  if (name.trim().length < 3) errors.name = 'Isi nama lengkap (minimal 3 huruf).'
  if (!normalizePhone(phone)) errors.phone = 'Nomor WhatsApp tidak valid. Contoh: 0813 1234 5678.'
  if (!date) errors.date = 'Pilih tanggal masuk.'
  else if (date < today) errors.date = 'Tanggal masuk tidak boleh sebelum hari ini.'
  const m = Number(months)
  if (!Number.isInteger(m) || m < 1 || m > 24) errors.months = 'Durasi 1–24 bulan.'
  return errors
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function bookingMessage(kost, { name, phone, date, months }) {
  return [
    'Halo, saya ingin booking kamar lewat KostFinder UNKLAB.',
    '',
    `Nama: ${name.trim()}`,
    `No. WhatsApp: ${normalizePhone(phone)}`,
    `Kost: ${kost.name}`,
    `Tanggal masuk: ${formatDate(date)}`,
    `Durasi: ${months} bulan`,
    `Total: ${formatRupiah(kost.price * months)}`,
    '',
    'Apakah kamar masih tersedia?',
  ].join('\n')
}
