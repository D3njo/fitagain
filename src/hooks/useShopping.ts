import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback, useMemo } from 'react'
import { CATEGORY_LABELS_ING, type IngredientCategory } from '../data/ingredients'
import { getFreshItems, getPantryItems, type ShoppingItem } from '../data/shopping'
import { db, toggleShoppingCheck } from '../db/database'

export function useShoppingChecks(week: number) {
  return useLiveQuery(() => db.shoppingChecks.where('week').equals(week).toArray(), [week])
}

export function useShoppingList(week: number) {
  const checks = useShoppingChecks(week)

  const freshItems = useMemo(() => getFreshItems(week), [week])
  const pantryItems = useMemo(() => getPantryItems(week), [week])

  const withChecks = useCallback(
    (items: ShoppingItem[]) => {
      const checkMap = new Map(checks?.map((c) => [c.ingredientId, c.checked]) ?? [])
      return items.map((item) => ({
        ...item,
        checked: checkMap.get(item.ingredient.id) ?? false,
      }))
    },
    [checks],
  )

  const fresh = useMemo(() => withChecks(freshItems), [freshItems, withChecks])
  const pantry = useMemo(() => withChecks(pantryItems), [pantryItems, withChecks])

  const toggle = useCallback(async (ingredientId: string, checked: boolean) => {
    await toggleShoppingCheck(week, ingredientId, checked)
  }, [week])

  const freshChecked = fresh.filter((i) => i.checked).length
  const freshTotal = fresh.length

  return { fresh, pantry, toggle, freshChecked, freshTotal }
}

export function groupByCategory(
  items: (ShoppingItem & { checked: boolean })[],
): Record<IngredientCategory, (ShoppingItem & { checked: boolean })[]> {
  const groups = {} as Record<IngredientCategory, (ShoppingItem & { checked: boolean })[]>
  for (const item of items) {
    const cat = item.ingredient.category
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(item)
  }
  return groups
}

export { CATEGORY_LABELS_ING }
