import { useParams } from 'react-router'
import PageHeader from '../components/ui/PageHeader.jsx'

// Galeri, info, peta, dan CTA dibuat di fase 5 (PRD F3)
export default function DetailPage() {
  const { id } = useParams()
  return (
    <>
      <title>Detail Kost — KostFinder UNKLAB</title>
      <PageHeader title="Detail Kost" subtitle={`ID: ${id}`} />
    </>
  )
}
