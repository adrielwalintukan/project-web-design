export default function Chip({ active = false, icon: Icon, className = '', children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-[color,background-color,transform] duration-200 active:scale-95 ${active ? 'bg-ink text-white' : 'bg-tonal text-ink hover:bg-line'} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2} aria-hidden />}
      {children}
    </button>
  )
}
