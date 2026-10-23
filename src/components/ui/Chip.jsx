export default function Chip({ active = false, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-[color,background-color,transform] duration-200 active:scale-95 ${active ? 'bg-primary-600 text-white' : 'bg-slate-100 text-ink hover:bg-slate-200'} ${className}`}
      {...props}
    />
  )
}
