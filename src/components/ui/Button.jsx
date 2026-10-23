const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'border border-line bg-surface text-ink hover:bg-slate-50',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-hover',
  ghost: 'text-primary-600 hover:bg-primary-50',
}

const sizes = {
  md: 'h-11 px-5',
  sm: 'h-9 px-4 text-sm',
}

// `as` merender <a> atau <Link> dengan gaya tombol: <Button as={Link} to="/">
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[color,background-color,transform] duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${block ? 'w-full' : ''} ${className}`}
      {...props}
    />
  )
}
