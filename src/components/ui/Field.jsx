import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

// as="select" untuk dropdown (opsi lewat children)
export default function Field({ as: Control = 'input', label, error, prefix, id, className = '', ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`
  const select = Control === 'select'

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-medium text-muted">
            {prefix}
          </span>
        )}
        <Control
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-14 w-full appearance-none rounded-2xl border bg-surface px-4 text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-subtle focus:ring-4 focus:outline-none ${prefix ? 'pl-12' : ''} ${select ? 'pr-11' : ''} ${error ? 'border-danger focus:ring-danger/15' : 'border-line-strong focus:border-primary-600 focus:ring-primary-600/15'}`}
          {...props}
        />
        {/* Panah sendiri: tampilan select bawaan OS berbeda-beda dan terlihat usang */}
        {select && (
          <ChevronDown
            size={18}
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 animate-fade-in text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
