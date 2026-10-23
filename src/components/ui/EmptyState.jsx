export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      {Icon && <Icon size={48} className="mx-auto mb-4 text-slate-400" aria-hidden />}
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="mt-2 text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
