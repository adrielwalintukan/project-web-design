import { Link } from 'react-router'
import { SearchX } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

export default function NotFoundPage() {
  return (
    <Container>
      <title>Halaman Tidak Ditemukan — KostFinder UNKLAB</title>
      <h1 className="sr-only">Halaman tidak ditemukan</h1>
      <EmptyState
        icon={SearchX}
        title="Halaman tidak ditemukan"
        description="Alamat yang kamu buka tidak ada atau sudah dipindahkan."
        action={
          <Button as={Link} to="/">
            Kembali ke Beranda
          </Button>
        }
      />
    </Container>
  )
}
