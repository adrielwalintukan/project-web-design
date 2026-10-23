import { useId } from 'react'

// as="select" untuk dropdown (opsi lewat children)
export default function Field({ as: Control = 'input', label, error, prefix, id, className = '', ...props }) {
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
        <Control
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-lg border bg-surface px-4 text-ink placeholder:text-subtle focus:ring-4 focus:outline-none ${prefix ? 'pl-12' : ''} ${error ? 'border-danger focus:ring-danger/15' : 'border-line-strong focus:border-primary-600 focus:ring-primary-600/15'}`}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 animate-fade-in text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
