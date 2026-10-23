import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Calculator } from 'lucide-react'
import kosts from '../data/kosts.js'
import { calcErrors, canCalculate, digitsOnly } from '../lib/calculator.js'
import { formatRupiah } from '../lib/format.js'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import Field from '../components/ui/Field.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import CostSummary from '../components/kost/CostSummary.jsx'

const groups = [
  { label: 'Kost Putra', type: 'pria' },
  { label: 'Kost Putri', type: 'wanita' },
]

// Input harga disimpan sebagai digit, ditampilkan dengan titik ribuan
const rupiahInput = (digits) => (digits === '' ? '' : Number(digits).toLocaleString('id-ID'))

export default function CalculatorPage() {
  const [params] = useSearchParams()
  const [values, setValues] = useState(() => {
    const kost = kosts.find((k) => k.id === params.get('kost'))
    return { kostId: kost?.id ?? '', price: kost ? String(kost.price) : '', months: '1', extra: '' }
  })
  const errors = calcErrors(values)
  const kost = kosts.find((k) => k.id === values.kostId)
  const set = (patch) => setValues((v) => ({ ...v, ...patch }))

  return (
    <>
      <title>Kalkulator Sewa — KostFinder UNKLAB</title>
      <PageHeader title="Kalkulator Sewa" subtitle="Hitung perkiraan total biaya sewa, termasuk listrik dan air." />

      <Container className="pt-6 pb-10 md:py-12">
        <div className="mx-auto max-w-xl space-y-5">
          <Field
            as="select"
            label="Kost (opsional)"
            id="calc-kost"
            value={values.kostId}
            onChange={(e) => {
              const k = kosts.find((x) => x.id === e.target.value)
              set({ kostId: e.target.value, price: k ? String(k.price) : values.price })
            }}
          >
            <option value="">Isi harga sendiri</option>
            {groups.map((g) => (
              <optgroup key={g.type} label={g.label}>
                {kosts
                  .filter((k) => k.type === g.type)
                  .map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name} · {formatRupiah(k.price)}
                    </option>
                  ))}
              </optgroup>
            ))}
          </Field>

          <Field
            label="Harga sewa per bulan"
            id="calc-price"
            prefix="Rp"
            inputMode="numeric"
            placeholder="500.000"
            value={rupiahInput(values.price)}
            error={errors.price}
            // Mengubah harga manual melepas pilihan kost, supaya total tidak menyesatkan
            onChange={(e) => set({ price: digitsOnly(e.target.value), kostId: '' })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Durasi (bulan)"
              id="calc-months"
              type="number"
              inputMode="numeric"
              min={1}
              max={24}
              value={values.months}
              error={errors.months}
              onChange={(e) => set({ months: digitsOnly(e.target.value) })}
            />
            <Field
              label="Listrik/air per bulan"
              id="calc-extra"
              prefix="Rp"
              inputMode="numeric"
              placeholder="0"
              value={rupiahInput(values.extra)}
              error={errors.extra}
              onChange={(e) => set({ extra: digitsOnly(e.target.value) })}
            />
          </div>

          {canCalculate(values) ? (
            <CostSummary price={Number(values.price)} months={Number(values.months)} extra={Number(values.extra)} />
          ) : (
            <p className="flex items-center gap-3 rounded-card bg-tonal p-5 text-sm text-muted">
              <Calculator size={20} className="shrink-0" aria-hidden />
              Isi harga dan durasi untuk melihat total biaya.
            </p>
          )}

          {kost && canCalculate(values) && (
            <Button as={Link} to={`/booking?kost=${kost.id}`} block>
              Booking {kost.name}
            </Button>
          )}
        </div>
      </Container>
    </>
  )
}
