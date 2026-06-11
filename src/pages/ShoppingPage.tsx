import { useState } from 'react'
import { CATEGORY_LABELS_ING } from '../data/ingredients'
import { getWeekForDay, getWeekPlan, TOTAL_WEEKS } from '../data/mealPlan'
import { groupByCategory, useShoppingList } from '../hooks/useShopping'
import { getDayNumber } from '../data/nutrition'
import { useSettings } from '../hooks/useNutrition'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'

interface ShoppingPageProps {
  initialWeek?: number
}

export function ShoppingPage({ initialWeek }: ShoppingPageProps) {
  const settings = useSettings()
  const currentDay = settings ? getDayNumber(settings.startDate) : 1
  const currentWeek = initialWeek ?? getWeekForDay(currentDay)

  const [week, setWeek] = useState(Math.min(Math.max(currentWeek, 1), TOTAL_WEEKS))
  const weekPlan = getWeekPlan(week)
  const { fresh, pantry, toggle, freshChecked, freshTotal } = useShoppingList(week)

  if (!weekPlan) return null

  const freshByCategory = groupByCategory(fresh)
  const categoryKeys = Object.keys(freshByCategory) as (keyof typeof freshByCategory)[]

  const dayRange =
    weekPlan.days.length === 1
      ? `Tag ${weekPlan.days[0]}`
      : `Tag ${weekPlan.days[0]}–${weekPlan.days[weekPlan.days.length - 1]}`

  const progress = freshTotal > 0 ? (freshChecked / freshTotal) * 100 : 0

  return (
    <div className="space-y-5">
      <PageHeader
        title="Einkauf"
        subtitle={`Woche ${week} (${dayRange}) — ein Einkauf für die ganze Woche`}
      />

      <div className="sticky top-0 z-10 -mx-4 px-4 py-2 bg-surface/90 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          <Button
            variant="secondary"
            onClick={() => setWeek((w) => Math.max(1, w - 1))}
            disabled={week <= 1}
            className="!min-h-[40px] !px-3 !text-xs"
          >
            ← W{week - 1}
          </Button>
          <span className="text-sm font-semibold text-accent">Woche {week}</span>
          <Button
            variant="secondary"
            onClick={() => setWeek((w) => Math.min(TOTAL_WEEKS, w + 1))}
            disabled={week >= TOTAL_WEEKS}
            className="!min-h-[40px] !px-3 !text-xs"
          >
            W{week + 1} →
          </Button>
        </div>
      </div>

      <Card>
        <p className="text-sm font-medium">{weekPlan.shopLabel}</p>
        <p className="text-xs text-text-muted mt-1">
          Protein: {weekPlan.proteinFocus.join(', ')} · Kohlenhydrate:{' '}
          {weekPlan.carbFocus.join(', ')}
        </p>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-text-muted mb-1.5">
            <span>Fortschritt</span>
            <span>
              {freshChecked}/{freshTotal} eingekauft
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[var(--color-ring-bg)] overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
          Frisch einkaufen
        </h2>
        <div className="space-y-4">
          {categoryKeys.map((cat) => (
            <div key={cat}>
              <p className="text-xs font-medium text-text-muted mb-2 flex justify-between">
                <span>{CATEGORY_LABELS_ING[cat]}</span>
                <span>{freshByCategory[cat].length} Artikel</span>
              </p>
              <div className="space-y-1.5">
                {freshByCategory[cat].map((item) => (
                  <button
                    key={item.ingredient.id}
                    onClick={() => toggle(item.ingredient.id, !item.checked)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all active:scale-[0.99] border ${
                      item.checked
                        ? 'bg-accent/10 border-accent/40'
                        : 'bg-surface-raised border-border/50 card-shadow'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 text-xs transition-all ${
                        item.checked
                          ? 'bg-accent border-accent text-accent-foreground scale-110'
                          : 'border-border'
                      }`}
                    >
                      {item.checked && '✓'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium transition-all ${
                          item.checked ? 'line-through opacity-60' : ''
                        }`}
                      >
                        {item.ingredient.name}
                      </p>
                      <p className="text-xs text-text-muted">{item.displayAmount}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {(week === 1 || pantry.some((p) => !p.checked)) && pantry.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
            Grundausstattung {week === 1 ? '(einmalig)' : ''}
          </h2>
          <div className="space-y-1.5">
            {pantry.map((item) => (
              <button
                key={item.ingredient.id}
                onClick={() => toggle(item.ingredient.id, !item.checked)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all active:scale-[0.99] border ${
                  item.checked
                    ? 'bg-accent/10 border-accent/40'
                    : 'bg-surface-raised border-border/50 card-shadow'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 text-xs ${
                    item.checked ? 'bg-accent border-accent text-accent-foreground' : 'border-border'
                  }`}
                >
                  {item.checked && '✓'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${item.checked ? 'line-through opacity-60' : ''}`}>
                    {item.ingredient.name}
                  </p>
                  <p className="text-xs text-text-muted">{item.displayAmount}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
