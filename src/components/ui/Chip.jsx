export default function Chip({ active = false, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-95 ${active ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-ink hover:border-line-strong'} ${className}`}
      {...props}
    />
  )
}
