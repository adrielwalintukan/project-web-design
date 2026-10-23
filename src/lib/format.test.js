import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatRupiah, imageSrcSet, normalizePhone, shortAddress, waLink } from './format.js'

test('formatRupiah memakai titik ribuan', () => {
  assert.equal(formatRupiah(850000), 'Rp 850.000')
  assert.equal(formatRupiah(1000000), 'Rp 1.000.000')
  assert.equal(formatRupiah(0), 'Rp 0')
})

test('normalizePhone menerima format umum nomor HP Indonesia', () => {
  assert.equal(normalizePhone('0813-1044-9264'), '6281310449264')
  assert.equal(normalizePhone('+62 852 5638 4914'), '6285256384914')
  assert.equal(normalizePhone('81310449264'), '6281310449264')
  assert.equal(normalizePhone('6281310449264'), '6281310449264')
})

test('normalizePhone menolak nomor yang tidak valid', () => {
  assert.equal(normalizePhone(''), null)
  assert.equal(normalizePhone('-'), null)
  assert.equal(normalizePhone(null), null)
  assert.equal(normalizePhone('0812'), null)
  assert.equal(normalizePhone('0211234567'), null) // telepon rumah, bukan HP
  assert.equal(normalizePhone('0812345678901234'), null)
})

test('waLink meng-encode pesan', () => {
  assert.equal(waLink('628123', 'Halo & salam'), 'https://wa.me/628123?text=Halo%20%26%20salam')
})

test('imageSrcSet menunjuk ke versi kecil dan besar', () => {
  assert.equal(imageSrcSet('/gambar/a.webp'), '/gambar/a-sm.webp 640w, /gambar/a.webp 1600w')
})

test('shortAddress membuang plus code dan bagian kecamatan', () => {
  assert.equal(shortAddress('CX8Q+434, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara'), 'Airmadidi Atas')
  assert.equal(shortAddress('Lingkungan 11, Airmadidi Atas, Kec. Airmadidi'), 'Lingkungan 11, Airmadidi Atas')
  assert.equal(shortAddress('Lingkungan X, Airmadidi Atas, Airmadidi, North Minahasa Regency'), 'Lingkungan X, Airmadidi Atas')
  assert.equal(shortAddress('Airmadidi Bawah'), 'Airmadidi Bawah')
  assert.equal(shortAddress('Unnamed Road, Airmadidi Atas, Kec. Airmadidi'), 'Airmadidi Atas')
})
