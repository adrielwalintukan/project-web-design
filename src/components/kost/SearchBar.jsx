import { Search } from 'lucide-react'
import Button from '../ui/Button.jsx'

export default function SearchBar({ value, onChange, onSubmit, className = '', ...props }) {
  return (
    <form
      role="search"
      className={`flex items-center gap-2 rounded-xl bg-surface p-1.5 pl-4 text-ink shadow-raise ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(e)
      }}
      {...props}
    >
      <Search size={20} strokeWidth={1.75} className="shrink-0 text-subtle" aria-hidden />
      <label htmlFor="search-kost" className="sr-only">
        Cari kost
      </label>
      <input
        id="search-kost"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        placeholder="Nama kost atau lokasi"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 min-w-0 flex-1 bg-transparent placeholder:text-subtle focus:outline-none"
      />
      <Button type="submit" aria-label="Cari" className="px-4 sm:px-5">
        <Search size={18} className="sm:hidden" aria-hidden />
        <span className="hidden sm:inline">Cari</span>
      </Button>
    </form>
  )
}
