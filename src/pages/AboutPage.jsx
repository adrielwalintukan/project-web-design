import { Mail, MessageCircle } from 'lucide-react'
import kosts from '../data/kosts.js'
import { ADMIN_PHONE, waLink } from '../lib/format.js'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

const prices = kosts.map((k) => k.price)
const short = (n) => (n >= 1e6 ? `${n / 1e6}jt` : `${n / 1e3}rb`)

// Angka diambil dari data, jadi selalu sesuai daftar kost (PRD B9: tanpa klaim yang tidak ada)
const facts = [
  {
    value: `${kosts.length} kost`,
    label: 'Ter-approve UNKLAB',
    text: 'Hanya kost yang sudah disetujui Universitas Klabat yang masuk daftar.',
  },
  {
    value: `Rp ${short(Math.min(...prices))} – ${short(Math.max(...prices))}`,
    label: 'Per bulan',
    text: 'Saring berdasarkan tipe Putra/Putri dan rentang harga, lalu urutkan dari yang termurah.',
  },
  {
    value: 'WhatsApp',
    label: 'Booking langsung',
    text: 'Permintaan booking dikirim ke pemilik kost, atau ke admin jika kost belum punya kontak.',
  },
]

const steps = [
  { title: 'Cari', text: 'Ketik nama atau lokasi, lalu saring tipe dan harga di Beranda.' },
  { title: 'Lihat detail', text: 'Cek foto, fasilitas, dan lokasi di peta, lalu hitung total biaya sewa.' },
  { title: 'Booking via WhatsApp', text: 'Isi nama, tanggal masuk, dan durasi. Pesan langsung siap dikirim.' },
]

export default function AboutPage() {
  return (
    <>
      <title>Tentang Kami — KostFinder UNKLAB</title>
      <PageHeader
        title="Tentang Kami"
        subtitle="Membantu mahasiswa UNKLAB menemukan hunian yang aman, nyaman, dan ter-approve."
      />

      <Container className="space-y-12 pt-6 pb-12 md:space-y-20 md:py-16">
        <section aria-labelledby="misi" className="max-w-2xl">
          <h2 id="misi" className="text-sm font-semibold text-primary-600">
            Misi kami
          </h2>
          <p className="mt-3 text-xl leading-relaxed font-medium md:text-2xl">
            Mencari kost di sekitar kampus seharusnya tidak perlu tanya ke sana-sini. KostFinder mengumpulkan kost yang
            sudah disetujui UNKLAB di satu tempat, lengkap dengan harga, fasilitas, dan lokasinya.
          </p>
        </section>

        <section aria-label="Yang kamu dapat">
          <dl className="grid gap-4 md:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="reveal rounded-card bg-surface p-6 shadow-raise">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight tabular-nums">{f.value}</dd>
                <dd className="mt-2 text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="cara-kerja">
          <h2 id="cara-kerja" className="text-2xl font-bold tracking-tight">
            Cara kerja
          </h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-100 font-bold text-primary-700 tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="kontak" className="rounded-card bg-primary-50 p-6 md:flex md:items-center md:justify-between md:p-8">
          <div>
            <h2 id="kontak" className="text-lg font-semibold">
              Ada pertanyaan atau ingin mendaftarkan kost?
            </h2>
            <p className="mt-1 text-muted">Hubungi admin KostFinder lewat WhatsApp atau email.</p>
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row md:mt-0">
            <Button
              as="a"
              href={waLink(ADMIN_PHONE, 'Halo admin KostFinder, saya ingin bertanya.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="bg-surface hover:bg-hover"
            >
              <MessageCircle size={18} className="text-whatsapp" aria-hidden /> Chat admin
            </Button>
            <Button as="a" href="mailto:help@kostfinder.com" variant="ghost">
              <Mail size={18} aria-hidden /> help@kostfinder.com
            </Button>
          </div>
        </section>
      </Container>
    </>
  )
}
