import { Search } from 'lucide-react'

// Search pill melayang (pola aplikasi): bayangan float, tombol bulat di kanan
export default function SearchBar({ value, onChange, onSubmit, className = '', ...props }) {
  return (
    <form
      role="search"
      className={`flex h-16 items-center gap-3 rounded-full bg-surface pr-2 pl-5 text-ink shadow-float ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(e)
      }}
      {...props}
    >
      <label htmlFor="search-kost" className="sr-only">
        Cari kost
      </label>
      <input
        id="search-kost"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        placeholder="Cari nama kost atau lokasi"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full min-w-0 flex-1 bg-transparent font-medium placeholder:font-normal placeholder:text-subtle focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-600 text-white transition-[background-color,transform] duration-200 hover:bg-primary-700 active:scale-95"
      >
        <Search size={20} strokeWidth={2.25} aria-hidden />
      </button>
    </form>
  )
}
