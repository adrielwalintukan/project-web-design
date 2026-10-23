const types = {
  pria: { className: 'bg-pria-bg text-pria-fg', label: 'Pria' },
  wanita: { className: 'bg-wanita-bg text-wanita-fg', label: 'Wanita' },
}

export default function Badge({ type, className = '' }) {
  const { className: color, label } = types[type]
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${color} ${className}`}>
      {label}
    </span>
  )
}
