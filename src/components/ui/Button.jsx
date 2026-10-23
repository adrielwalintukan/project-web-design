const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  // Hubungi via WhatsApp memakai secondary + ikon hijau, supaya tidak ada dua hijau bersaing
  secondary: 'bg-tonal text-ink hover:bg-line',
  ghost: 'text-ink hover:bg-tonal',
}

const sizes = {
  md: 'h-12 px-6',
  sm: 'h-10 px-4 text-sm',
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
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[color,background-color,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${block ? 'w-full' : ''} ${className}`}
      {...props}
    />
  )
}
