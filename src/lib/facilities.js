import {
  Archive,
  Armchair,
  Bath,
  BedDouble,
  CircleCheck,
  CookingPot,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  Table,
  Tv,
  Wifi,
} from 'lucide-react'

export const facilities = {
  wifi: { label: 'Wi-Fi Gratis', icon: Wifi },
  'km-dalam': { label: 'Kamar Mandi Dalam', icon: Bath },
  ac: { label: 'AC', icon: Snowflake },
  dapur: { label: 'Dapur', icon: CookingPot },
  'dapur-bersama': { label: 'Dapur Bersama', icon: CookingPot },
  keamanan: { label: 'Keamanan 24 Jam', icon: ShieldCheck },
  kasur: { label: 'Kasur', icon: BedDouble },
  lemari: { label: 'Lemari', icon: Archive },
  meja: { label: 'Meja', icon: Table },
  kursi: { label: 'Kursi', icon: Armchair },
  tv: { label: 'TV', icon: Tv },
  kulkas: { label: 'Kulkas Bersama', icon: Refrigerator },
}

export function getFacility(key) {
  return facilities[key] ?? { label: key, icon: CircleCheck }
}
