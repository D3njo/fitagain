import { useState } from 'react'
import type { MealCategory } from '../data/meals'
import { CATEGORY_LABELS, getMealById, meals } from '../data/meals'
import type { DayPlan as DayPlanType } from '../data/mealPlan'
import type { MealLog } from '../db/database'
import { MealCard } from './MealCard'

interface DayPlanProps {
  plan: DayPlanType
  logs: MealLog[]
  onEat: (mealId: string) => void
}

const SLOT_ORDER: MealCategory[] = ['fruehstueck', 'mittag', 'abend', 'snack', 'getraenk']

const CATEGORY_ICONS: Record<MealCategory, string> = {
  fruehstueck: '☀',
  mittag: '◑',
  abend: '☽',
  snack: '•',
  getraenk: '◦',
}

export function DayPlan({ plan, logs, onEat }: DayPlanProps) {
  const [showPicker, setShowPicker] = useState<MealCategory | null>(null)
  const eatenMealIds = new Set(logs.map((l) => l.mealId))

  return (
    <div className="space-y-5">
      {SLOT_ORDER.map((category) => {
        const mealIds = plan.slots[category] ?? []
        const suggestedMeals = mealIds.map((id) => getMealById(id)).filter(Boolean)

        return (
          <section key={category} className="border-t border-border/40 pt-4 first:border-0 first:pt-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs">
                  {CATEGORY_ICONS[category]}
                </span>
                {CATEGORY_LABELS[category]}
              </h2>
              <button
                onClick={() => setShowPicker(showPicker === category ? null : category)}
                className="text-xs text-accent font-medium px-2 py-1 rounded-lg hover:bg-accent/10 transition-colors"
              >
                {showPicker === category ? 'Schließen' : '+ Andere'}
              </button>
            </div>
            <div className="space-y-2">
              {suggestedMeals.map(
                (meal) =>
                  meal && (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      onEat={onEat}
                      eaten={eatenMealIds.has(meal.id)}
                    />
                  ),
              )}
            </div>
            {showPicker === category && (
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {meals
                  .filter((m) => m.category === category)
                  .map((meal) => (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      onEat={(id) => {
                        onEat(id)
                        setShowPicker(null)
                      }}
                      eaten={eatenMealIds.has(meal.id)}
                      compact
                    />
                  ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
