import { test } from 'node:test'
import assert from 'node:assert/strict'
import kosts from '../data/kosts.js'
import { bookingMessage, validateBooking } from './booking.js'

const today = '2026-10-23'
const valid = { kostId: 'cornerResidence', name: 'Adriel W', phone: '0813-1044-9264', date: today, months: '6' }

test('data lengkap dan valid tidak punya error', () => {
  assert.deepEqual(validateBooking(valid, today), {})
})

test('tanggal kemarin ditolak dengan pesan (PRD F4 AC)', () => {
  assert.match(validateBooking({ ...valid, date: '2026-10-22' }, today).date, /sebelum hari ini/)
})

test('setiap field wajib punya pesan error sendiri', () => {
  const errors = validateBooking({ kostId: '', name: ' a ', phone: '123', date: '', months: '' }, today)
  assert.deepEqual(Object.keys(errors).sort(), ['date', 'kostId', 'months', 'name', 'phone'])
})

test('durasi harus bilangan bulat 1–24', () => {
  for (const months of ['0', '25', '1.5', '-3']) assert.ok(validateBooking({ ...valid, months }, today).months, months)
  for (const months of ['1', '24']) assert.equal(validateBooking({ ...valid, months }, today).months, undefined)
})

test('pesan WhatsApp memuat nama, nomor 62…, kost, tanggal, durasi, dan total (PRD F4 AC)', () => {
  const kost = kosts.find((k) => k.id === 'cornerResidence')
  const msg = bookingMessage(kost, valid)
  assert.match(msg, /Nama: Adriel W/)
  assert.match(msg, /No\. WhatsApp: 6281310449264/)
  assert.match(msg, /Kost: Corner Residence/)
  assert.match(msg, /Tanggal masuk: 23 Oktober 2026/)
  assert.match(msg, /Durasi: 6 bulan/)
  assert.match(msg, /Total: Rp 5\.100\.000/)
})
