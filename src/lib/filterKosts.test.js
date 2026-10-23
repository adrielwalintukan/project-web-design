import { test } from 'node:test'
import assert from 'node:assert/strict'
import kosts from '../data/kosts.js'
import { filterKosts } from './filterKosts.js'

const names = (list) => list.map((k) => k.name)

test('tanpa filter mengembalikan semua kost dengan urutan data', () => {
  assert.deepEqual(names(filterKosts(kosts)), names(kosts))
})

test('pencarian nama tidak peka huruf besar (PRD F1 AC)', () => {
  assert.deepEqual(names(filterKosts(kosts, { q: '  WULLUR ' })), ['Kost Wullur'])
})

test('pencarian juga mencocokkan alamat', () => {
  const result = filterKosts(kosts, { q: 'airmadidi bawah' })
  assert.ok(result.length > 0)
  for (const k of result) assert.match(k.address.toLowerCase(), /airmadidi bawah/)
})

test('Putri + > 700rb (PRD F1 AC)', () => {
  assert.deepEqual(names(filterKosts(kosts, { type: 'wanita', price: 'gt700' })).sort(), [
    'Azalea Hall',
    'Corner Residence',
    'Kost Gazelle',
    'Topaz Place',
  ])
})

test('batas rentang harga inklusif di atas', () => {
  assert.ok(names(filterKosts(kosts, { price: 'lt400' })).includes('Kost Sion')) // 400.000
  assert.ok(names(filterKosts(kosts, { price: '400-700' })).includes('Anugerah Wisma')) // 700.000
  assert.ok(!names(filterKosts(kosts, { price: 'gt700' })).includes('Anugerah Wisma'))
})

test('urutkan harga dan nama', () => {
  const asc = filterKosts(kosts, { sort: 'price-asc' }).map((k) => k.price)
  assert.deepEqual(asc, [...asc].sort((a, b) => a - b))
  const desc = filterKosts(kosts, { sort: 'price-desc' }).map((k) => k.price)
  assert.deepEqual(desc, [...desc].sort((a, b) => b - a))
  const byName = names(filterKosts(kosts, { sort: 'name' }))
  assert.deepEqual(byName, [...byName].sort((a, b) => a.localeCompare(b, 'id')))
})

test('nilai URL yang tidak dikenal diabaikan', () => {
  assert.equal(filterKosts(kosts, { type: 'xyz', price: 'murah', sort: 'acak' }).length, kosts.length)
})

test('tidak mengubah urutan array sumber saat mengurutkan', () => {
  const before = names(kosts)
  filterKosts(kosts, { sort: 'name' })
  assert.deepEqual(names(kosts), before)
})
