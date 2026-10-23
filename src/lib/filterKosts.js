// Rentang harga filter beranda (Rupiah / bulan), batas atas inklusif
export const priceRanges = {
  lt400: [0, 400000],
  '400-700': [400001, 700000],
  gt700: [700001, Infinity],
}

const types = ['pria', 'wanita']

const sorters = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name, 'id'),
}

// Nilai dari URL bisa apa saja; nilai yang tidak dikenal diabaikan, bukan menghasilkan daftar kosong
export function filterKosts(list, { q = '', type = '', price = '', sort = '' } = {}) {
  const needle = q.trim().toLowerCase()
  const range = priceRanges[price]
  const result = list.filter(
    (k) =>
      (!needle || k.name.toLowerCase().includes(needle) || k.address.toLowerCase().includes(needle)) &&
      (!types.includes(type) || k.type === type) &&
      (!range || (k.price >= range[0] && k.price <= range[1])),
  )
  return sorters[sort] ? result.sort(sorters[sort]) : result
}
