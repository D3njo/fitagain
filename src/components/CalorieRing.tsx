interface CalorieRingProps {
  consumed: number
  target: number
  protein: number
  proteinTarget: number
}

export function CalorieRing({ consumed, target, protein, proteinTarget }: CalorieRingProps) {
  const calorieProgress = Math.min(consumed / target, 1)
  const proteinProgress = Math.min(protein / proteinTarget, 1)
  const radius = 62
  const circumference = 2 * Math.PI * radius
  const calorieOffset = circumference * (1 - calorieProgress)

  return (
    <div className="flex flex-col items-center py-2">
      <div className="relative">
        <svg width="160" height="160" className="-rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-ring-bg)"
            strokeWidth="12"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={calorieOffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tight">{consumed}</span>
          <span className="text-xs text-text-muted mt-0.5">/ {target} kcal</span>
        </div>
      </div>
      <div className="mt-4 w-full max-w-[220px]">
        <div className="flex justify-between text-xs text-text-muted mb-1.5">
          <span>Protein</span>
          <span>
            {protein}g / {proteinTarget}g
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-[var(--color-ring-bg)] overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
            style={{ width: `${proteinProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
