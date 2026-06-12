import { COMMON_DISHES } from '../data/commonDishes'

export type FoodLookupSource = 'local' | 'online'

export interface FoodLookupResult {
  name: string
  calories: number
  protein: number
  fat: number
  carbs: number
  source: FoodLookupSource
  servingNote?: string
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function searchLocalDishes(query: string, limit = 6): FoodLookupResult[] {
  const q = normalize(query)
  if (q.length < 2) return []

  const scored = COMMON_DISHES.map((dish) => {
    const terms = [dish.name, ...dish.aliases].map(normalize)
    let score = 0
    for (const term of terms) {
      if (term === q) score = Math.max(score, 100)
      else if (term.startsWith(q)) score = Math.max(score, 85)
      else if (q.startsWith(term) && term.length >= 4) score = Math.max(score, 75)
      else if (term.includes(q)) score = Math.max(score, 65)
      else if (q.includes(term) && term.length >= 4) score = Math.max(score, 55)
    }
    return { dish, score }
  }).filter((entry) => entry.score > 0)

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ dish }) => ({
      name: dish.name,
      calories: dish.calories,
      protein: dish.protein,
      fat: dish.fat ?? 0,
      carbs: dish.carbs ?? 0,
      source: 'local' as const,
      servingNote: dish.servingNote,
    }))
}

function buildOnlineQuery(query: string): string {
  const trimmed = query.trim()
  if (!trimmed) return trimmed
  if (
    !/\d/.test(trimmed) &&
    !/\b(portion|stück|scheibe|slice|bowl|plate|teller|schüssel)\b/i.test(trimmed)
  ) {
    return `1 portion ${trimmed}`
  }
  return trimmed
}

interface CalorieNinjasItem {
  name: string
  calories: number
  protein_g: number
  fat_total_g: number
  carbohydrates_total_g: number
}

export function resolveNutritionApiKey(storedKey?: string): string | undefined {
  const envKey = import.meta.env.VITE_CALORIE_NINJAS_API_KEY
  const key = storedKey?.trim() || envKey?.trim()
  return key || undefined
}

export async function lookupFoodOnline(
  query: string,
  apiKey: string,
  signal?: AbortSignal,
): Promise<FoodLookupResult | null> {
  if (!apiKey || query.trim().length < 2) return null

  const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(buildOnlineQuery(query))}`
  const res = await fetch(url, {
    headers: { 'X-Api-Key': apiKey },
    signal,
  })
  if (!res.ok) return null

  const data = (await res.json()) as { items?: CalorieNinjasItem[] }
  if (!data.items?.length) return null

  const totals = data.items.reduce(
    (acc, item) => ({
      calories: acc.calories + (item.calories || 0),
      protein: acc.protein + (item.protein_g || 0),
      fat: acc.fat + (item.fat_total_g || 0),
      carbs: acc.carbs + (item.carbohydrates_total_g || 0),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  )

  if (totals.calories <= 0) return null

  const displayName = data.items.length === 1 ? data.items[0].name : query.trim()

  return {
    name: displayName,
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    fat: Math.round(totals.fat),
    carbs: Math.round(totals.carbs),
    source: 'online',
  }
}

export function mergeLookupResults(
  local: FoodLookupResult[],
  online: FoodLookupResult | null,
): FoodLookupResult[] {
  if (!online) return local

  const onlineNorm = normalize(online.name)
  const withoutDuplicate = local.filter((item) => {
    const itemNorm = normalize(item.name)
    return itemNorm !== onlineNorm && !onlineNorm.includes(itemNorm) && !itemNorm.includes(onlineNorm)
  })

  return [online, ...withoutDuplicate].slice(0, 8)
}
