import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calcErrors, canCalculate, digitsOnly } from './calculator.js'

test('digitsOnly membuang titik ribuan, Rp, dan tanda minus', () => {
  assert.equal(digitsOnly('Rp 850.000'), '850000')
  assert.equal(digitsOnly('-5'), '5')
})

test('harga 0 dan durasi 0 ditolak (PRD F5)', () => {
  const errors = calcErrors({ price: '0', months: '0', extra: '' })
  assert.ok(errors.price)
  assert.ok(errors.months)
})

test('field kosong belum menampilkan error tapi belum bisa dihitung', () => {
  const values = { price: '', months: '', extra: '' }
  assert.deepEqual(calcErrors(values), {})
  assert.equal(canCalculate(values), false)
})

test('harga dan durasi valid bisa dihitung, biaya tambahan opsional', () => {
  assert.equal(canCalculate({ price: '850000', months: '6', extra: '' }), true)
  assert.equal(canCalculate({ price: '850000', months: '6', extra: '150000' }), true)
  assert.equal(canCalculate({ price: '850000', months: '25', extra: '' }), false)
})
