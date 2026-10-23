import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { CircleCheck, MessageCircle } from 'lucide-react'
import kosts from '../data/kosts.js'
import { bookingMessage, todayISO, validateBooking } from '../lib/booking.js'
import { ADMIN_PHONE, formatRupiah, imageSrcSet, shortAddress, waLink } from '../lib/format.js'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import Field from '../components/ui/Field.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import CostSummary from '../components/kost/CostSummary.jsx'

const months = Array.from({ length: 24 }, (_, i) => i + 1)
const groups = [
  { label: 'Kost Putra', type: 'pria' },
  { label: 'Kost Putri', type: 'wanita' },
]

export default function BookingPage() {
  const [params] = useSearchParams()
  const [form, setForm] = useState(() => ({
    kostId: kosts.some((k) => k.id === params.get('kost')) ? params.get('kost') : '',
    name: '',
    phone: '',
    date: '',
    months: '1',
  }))
  // Error baru tampil setelah submit pertama, lalu ikut diperbarui saat mengetik
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)
  const today = todayISO()
  const errors = submitted ? validateBooking(form, today) : {}
  const kost = kosts.find((k) => k.id === form.kostId)

  const field = (key) => ({
    id: `booking-${key}`,
    name: key,
    value: form[key],
    error: errors[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      setSent(false)
    },
  })

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validateBooking(form, today)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`booking-${first}`).focus()
      return
    }
    window.open(waLink(kost.contact ?? ADMIN_PHONE, bookingMessage(kost, form)), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <>
      <title>Booking Kost — KostFinder UNKLAB</title>
      <PageHeader title="Booking Kamar" subtitle="Pilih kost, isi data, lalu kirim permintaan ke pemilik lewat WhatsApp." />

      <Container className="pt-6 pb-10 md:py-12">
        <form noValidate onSubmit={submit} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <Field as="select" label="Kost" {...field('kostId')}>
              <option value="">Pilih kost…</option>
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

            {kost && (
              <div key={kost.id} className="flex animate-fade-in gap-4 rounded-card bg-surface p-3 shadow-raise">
                <img
                  src={kost.images[0].replace(/\.webp$/, '-sm.webp')}
                  srcSet={imageSrcSet(kost.images[0])}
                  sizes="96px"
                  alt=""
                  className="size-24 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 py-0.5">
                  <Badge type={kost.type} />
                  <p className="mt-1.5 line-clamp-1 font-semibold">{kost.name}</p>
                  <p className="line-clamp-1 text-sm text-muted">{shortAddress(kost.address)}</p>
                  <Link to={`/kost/${kost.id}`} className="mt-1 inline-block text-sm font-medium text-primary-600 hover:underline">
                    Lihat detail
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5 lg:col-span-7">
            <Field label="Nama lengkap" autoComplete="name" placeholder="Sesuai KTM" {...field('name')} />
            <Field
              label="Nomor WhatsApp"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="08xxxxxxxxxx"
              {...field('phone')}
            />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tanggal masuk" type="date" min={today} {...field('date')} />
              <Field as="select" label="Durasi" {...field('months')}>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m} bulan
                  </option>
                ))}
              </Field>
            </div>

            {kost && <CostSummary price={kost.price} months={Number(form.months)} />}

            <Button type="submit" block>
              <MessageCircle size={18} aria-hidden /> Kirim lewat WhatsApp
            </Button>
            <p className="text-center text-sm text-muted">
              {kost && !kost.contact
                ? 'Kost ini belum punya kontak langsung, jadi permintaan dikirim ke admin KostFinder.'
                : 'Permintaan dikirim langsung ke WhatsApp pemilik kost.'}
            </p>
            {sent && (
              <p role="status" className="flex animate-fade-in items-start gap-2 rounded-card bg-primary-50 p-4 text-sm font-medium text-primary-700">
                <CircleCheck size={18} className="mt-0.5 shrink-0" aria-hidden />
                WhatsApp sudah dibuka dengan pesan booking. Tekan kirim di sana untuk menyelesaikan.
              </p>
            )}
          </div>
        </form>
      </Container>
    </>
  )
}
