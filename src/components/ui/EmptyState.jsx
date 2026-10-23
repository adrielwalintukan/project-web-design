export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="mx-auto max-w-md animate-fade-up py-16 text-center">
      {Icon && (
        <span className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-tonal text-muted">
          <Icon size={28} strokeWidth={1.75} aria-hidden />
        </span>
      )}
      <h2 className="text-lg font-bold">{title}</h2>
      {description && <p className="mt-2 text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
