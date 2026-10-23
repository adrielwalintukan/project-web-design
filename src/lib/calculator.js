// "850.000" / "Rp 850000" → "850000" (hanya digit, untuk state input)
export const digitsOnly = (value) => String(value).replace(/\D/g, '')

// Input kosong belum dianggap salah; nilai ≤ 0 ditolak (PRD F5)
export function calcErrors({ price, months, extra }) {
  const errors = {}
  if (price !== '' && Number(price) <= 0) errors.price = 'Harga harus lebih dari 0.'
  const m = Number(months)
  if (months !== '' && (!Number.isInteger(m) || m < 1 || m > 24)) errors.months = 'Durasi 1–24 bulan.'
  if (extra !== '' && Number(extra) < 0) errors.extra = 'Biaya tambahan tidak boleh negatif.'
  return errors
}

export const canCalculate = (values) =>
  values.price !== '' && values.months !== '' && Object.keys(calcErrors(values)).length === 0
