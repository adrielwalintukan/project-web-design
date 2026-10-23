import { useId } from 'react'

export default function Field({ label, error, prefix, id, className = '', ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-lg border bg-surface px-4 text-ink placeholder:text-slate-400 focus:ring-4 focus:outline-none ${prefix ? 'pl-12' : ''} ${error ? 'border-red-600 focus:ring-red-600/20' : 'border-line focus:border-primary-500 focus:ring-primary-500/20'}`}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
