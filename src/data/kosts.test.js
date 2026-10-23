// Menjaga data tetap valid saat tim menambah atau mengubah kost
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import kosts from './kosts.js'
import { facilities } from '../lib/facilities.js'
import { normalizePhone } from '../lib/format.js'

test('id unik dan aman dipakai di URL', () => {
  const ids = kosts.map((k) => k.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const id of ids) assert.match(id, /^[A-Za-z0-9-]+$/)
})

for (const k of kosts) {
  test(`data ${k.id} lengkap dan valid`, () => {
    assert.ok(k.name.trim(), 'nama kosong')
    assert.ok(['pria', 'wanita'].includes(k.type), `type: ${k.type}`)
    assert.ok(Number.isInteger(k.price) && k.price > 0, `price: ${k.price}`)
    assert.match(k.size, /^\d+x\d+$/)
    assert.ok(k.address.trim(), 'alamat kosong')
    assert.ok(k.images.length > 0, 'tanpa foto')
    for (const src of k.images) {
      assert.ok(existsSync(`public${src}`), `foto tidak ada: ${src}`)
      assert.ok(existsSync(`public${src.replace(/\.webp$/, '-sm.webp')}`), `versi -sm tidak ada: ${src}`)
    }
    for (const f of k.facilities) assert.ok(f in facilities, `fasilitas tidak dikenal: ${f}`)
    if (k.contact !== null) assert.equal(normalizePhone(k.contact), k.contact, `kontak: ${k.contact}`)
    if (k.mapUrl !== null) assert.match(k.mapUrl, /^https:\/\/www\.google\.com\/maps\/embed\?/)
  })
}
