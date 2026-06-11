export function Spinner({ label = 'Laden…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="w-8 h-8 rounded-full border-2 border-surface-overlay border-t-accent animate-spin-slow" />
      <p className="text-sm text-text-muted">{label}</p>
    </div>
  )
}
