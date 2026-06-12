interface Option<T extends string> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  layout?: 'row' | 'grid'
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layout = 'row',
}: SegmentedControlProps<T>) {
  const containerClass =
    layout === 'grid'
      ? 'grid grid-cols-2 gap-1'
      : 'flex gap-1'

  const buttonClass =
    layout === 'grid'
      ? 'min-w-0 text-center text-xs leading-tight px-2'
      : 'flex-1 min-w-0 text-sm px-3'

  return (
    <div className={`rounded-xl bg-surface-overlay/40 p-1 ${containerClass}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`${buttonClass} py-2 rounded-lg font-medium transition-all active:scale-[0.98] ${
            value === opt.value
              ? 'bg-surface-raised text-text shadow-sm'
              : 'text-text-muted hover:text-text'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
