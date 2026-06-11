import type { MealCategory } from './meals'
import { getPhase, type Phase } from './nutrition'

export interface DayPlan {
  day: number
  phase: Phase
  slots: Record<MealCategory, string[]>
}

export interface WeekPlan {
  week: number
  days: number[]
  phase: Phase
  shopLabel: string
  proteinFocus: string[]
  carbFocus: string[]
  dayPlans: DayPlan[]
}

type DaySlots = {
  fruehstueck: string
  mittag: string
  abend: string
  snack: string
  getraenk: string
  altSnack?: string
}

function buildDayPlan(day: number, slots: DaySlots): DayPlan {
  const phase = getPhase(day)
  const mealSlots: Record<MealCategory, string[]> = {
    fruehstueck: [slots.fruehstueck],
    mittag: [slots.mittag],
    abend: [slots.abend],
    snack: [slots.snack],
    getraenk: [slots.getraenk],
  }
  if (slots.altSnack && phase !== 'sanfterStart') {
    mealSlots.snack.push(slots.altSnack)
  }
  return { day, phase, slots: mealSlots }
}

const week1Days: DaySlots[] = [
  { fruehstueck: 'm01', mittag: 'm11', abend: 'm28', snack: 'm37', getraenk: 'm45' },
  { fruehstueck: 'm02', mittag: 'm13', abend: 'm29', snack: 'm39', getraenk: 'm46', altSnack: 'm38' },
  { fruehstueck: 'm01', mittag: 'm14', abend: 'm26', snack: 'm38', getraenk: 'm45' },
  { fruehstueck: 'm02', mittag: 'm15', abend: 'm28', snack: 'm37', getraenk: 'm47', altSnack: 'm39' },
  { fruehstueck: 'm04', mittag: 'm11', abend: 'm29', snack: 'm39', getraenk: 'm46' },
  { fruehstueck: 'm02', mittag: 'm14', abend: 'm26', snack: 'm38', getraenk: 'm45', altSnack: 'm37' },
  { fruehstueck: 'm01', mittag: 'm13', abend: 'm28', snack: 'm40', getraenk: 'm48' },
]

const week2Days: DaySlots[] = [
  { fruehstueck: 'm02', mittag: 'm12', abend: 'm27', snack: 'm39', getraenk: 'm45' },
  { fruehstueck: 'm03', mittag: 'm12', abend: 'm28', snack: 'm37', getraenk: 'm46', altSnack: 'm38' },
  { fruehstueck: 'm02', mittag: 'm34', abend: 'm30', snack: 'm38', getraenk: 'm45' },
  { fruehstueck: 'm03', mittag: 'm12', abend: 'm27', snack: 'm40', getraenk: 'm47', altSnack: 'm39' },
  { fruehstueck: 'm02', mittag: 'm34', abend: 'm28', snack: 'm37', getraenk: 'm46' },
  { fruehstueck: 'm04', mittag: 'm12', abend: 'm30', snack: 'm39', getraenk: 'm45', altSnack: 'm38' },
  { fruehstueck: 'm02', mittag: 'm34', abend: 'm27', snack: 'm38', getraenk: 'm48' },
]

const week3Days: DaySlots[] = [
  { fruehstueck: 'm02', mittag: 'm20', abend: 'm29', snack: 'm37', getraenk: 'm45' },
  { fruehstueck: 'm06', mittag: 'm19', abend: 'm26', snack: 'm39', getraenk: 'm46', altSnack: 'm41' },
  { fruehstueck: 'm02', mittag: 'm16', abend: 'm29', snack: 'm38', getraenk: 'm45' },
  { fruehstueck: 'm09', mittag: 'm20', abend: 'm28', snack: 'm37', getraenk: 'm47', altSnack: 'm40' },
  { fruehstueck: 'm02', mittag: 'm18', abend: 'm26', snack: 'm40', getraenk: 'm46' },
  { fruehstueck: 'm06', mittag: 'm16', abend: 'm29', snack: 'm38', getraenk: 'm45', altSnack: 'm37' },
  { fruehstueck: 'm02', mittag: 'm19', abend: 'm28', snack: 'm37', getraenk: 'm48' },
]

const week4Days: DaySlots[] = [
  { fruehstueck: 'm02', mittag: 'm17', abend: 'm32', snack: 'm41', getraenk: 'm45' },
  { fruehstueck: 'm07', mittag: 'm22', abend: 'm34', snack: 'm37', getraenk: 'm46', altSnack: 'm38' },
  { fruehstueck: 'm06', mittag: 'm17', abend: 'm27', snack: 'm38', getraenk: 'm45' },
  { fruehstueck: 'm02', mittag: 'm23', abend: 'm34', snack: 'm41', getraenk: 'm47', altSnack: 'm37' },
  { fruehstueck: 'm07', mittag: 'm22', abend: 'm32', snack: 'm37', getraenk: 'm46' },
  { fruehstueck: 'm06', mittag: 'm17', abend: 'm27', snack: 'm38', getraenk: 'm45', altSnack: 'm41' },
  { fruehstueck: 'm02', mittag: 'm23', abend: 'm34', snack: 'm41', getraenk: 'm48' },
]

const week5Days: DaySlots[] = [
  { fruehstueck: 'm06', mittag: 'm31', abend: 'm29', snack: 'm37', getraenk: 'm45' },
  { fruehstueck: 'm02', mittag: 'm25', abend: 'm26', snack: 'm39', getraenk: 'm46', altSnack: 'm41' },
  { fruehstueck: 'm09', mittag: 'm31', abend: 'm29', snack: 'm38', getraenk: 'm45' },
  { fruehstueck: 'm06', mittag: 'm20', abend: 'm26', snack: 'm41', getraenk: 'm47', altSnack: 'm37' },
  { fruehstueck: 'm02', mittag: 'm25', abend: 'm29', snack: 'm37', getraenk: 'm46' },
  { fruehstueck: 'm09', mittag: 'm31', abend: 'm26', snack: 'm38', getraenk: 'm45', altSnack: 'm39' },
  { fruehstueck: 'm06', mittag: 'm20', abend: 'm29', snack: 'm41', getraenk: 'm48' },
]

const week6Days: DaySlots[] = [
  { fruehstueck: 'm08', mittag: 'm21', abend: 'm33', snack: 'm41', getraenk: 'm45' },
  { fruehstueck: 'm10', mittag: 'm24', abend: 'm33', snack: 'm37', getraenk: 'm46', altSnack: 'm42' },
  { fruehstueck: 'm08', mittag: 'm21', abend: 'm35', snack: 'm38', getraenk: 'm45' },
  { fruehstueck: 'm10', mittag: 'm24', abend: 'm33', snack: 'm41', getraenk: 'm47', altSnack: 'm37' },
  { fruehstueck: 'm08', mittag: 'm21', abend: 'm35', snack: 'm37', getraenk: 'm46' },
  { fruehstueck: 'm10', mittag: 'm24', abend: 'm33', snack: 'm38', getraenk: 'm45', altSnack: 'm42' },
  { fruehstueck: 'm08', mittag: 'm21', abend: 'm35', snack: 'm41', getraenk: 'm48' },
]

const week7Days: DaySlots[] = [
  { fruehstueck: 'm02', mittag: 'm22', abend: 'm34', snack: 'm37', getraenk: 'm45' },
  { fruehstueck: 'm06', mittag: 'm16', abend: 'm32', snack: 'm38', getraenk: 'm46', altSnack: 'm41' },
  { fruehstueck: 'm02', mittag: 'm19', abend: 'm26', snack: 'm40', getraenk: 'm48' },
]

const weekDefinitions: Omit<WeekPlan, 'dayPlans'>[] = [
  {
    week: 1,
    days: [1, 2, 3, 4, 5, 6, 7],
    phase: 'sanfterStart',
    shopLabel: 'Hähnchen, Eier, Haferflocken & Reis',
    proteinFocus: ['Hähnchenbrust', 'Eier'],
    carbFocus: ['Haferflocken', 'Reis'],
  },
  {
    week: 2,
    days: [8, 9, 10, 11, 12, 13, 14],
    phase: 'sanfterStart',
    shopLabel: 'Hackfleisch, Eier, Nudeln & Kartoffeln',
    proteinFocus: ['Rinderhack', 'Eier'],
    carbFocus: ['Nudeln', 'Kartoffeln'],
  },
  {
    week: 3,
    days: [15, 16, 17, 18, 19, 20, 21],
    phase: 'aufbau',
    shopLabel: 'Hähnchen, Rind, Reis & Nudeln',
    proteinFocus: ['Hähnchenbrust', 'Rind (Hack/Gulasch)'],
    carbFocus: ['Reis', 'Nudeln'],
  },
  {
    week: 4,
    days: [22, 23, 24, 25, 26, 27, 28],
    phase: 'aufbau',
    shopLabel: 'Schwein, Hack, Kartoffeln & Spätzle',
    proteinFocus: ['Schweineschnitzel', 'Rinderhack'],
    carbFocus: ['Kartoffeln', 'Spätzle/Nudeln'],
  },
  {
    week: 5,
    days: [29, 30, 31, 32, 33, 34, 35],
    phase: 'deftig',
    shopLabel: 'Rind, Hähnchen, Reis & Käse',
    proteinFocus: ['Rindersteak', 'Hähnchen'],
    carbFocus: ['Reis', 'Nudeln'],
  },
  {
    week: 6,
    days: [36, 37, 38, 39, 40, 41, 42],
    phase: 'deftig',
    shopLabel: 'Burger, Pulled Pork & Pizza',
    proteinFocus: ['Burger-Patties', 'Schweinebraten'],
    carbFocus: ['Pizzateig', 'Nudeln'],
  },
  {
    week: 7,
    days: [43, 44, 45],
    phase: 'deftig',
    shopLabel: 'Resteverwertung — nur auffüllen',
    proteinFocus: ['Hack & Hähnchen'],
    carbFocus: ['Kartoffeln & Reis'],
  },
]

const weekSlotData = [week1Days, week2Days, week3Days, week4Days, week5Days, week6Days, week7Days]

export const weekPlans: WeekPlan[] = weekDefinitions.map((def, i) => {
  const slots = weekSlotData[i]
  const dayPlans = def.days.map((day, j) => buildDayPlan(day, slots[j]))
  return { ...def, dayPlans }
})

export const mealPlan: DayPlan[] = weekPlans.flatMap((w) => w.dayPlans)

export function getDayPlan(day: number): DayPlan {
  const plan = mealPlan.find((d) => d.day === day)
  if (plan) return plan
  return mealPlan[mealPlan.length - 1]
}

export function getWeekForDay(day: number): number {
  const week = weekPlans.find((w) => w.days.includes(day))
  return week?.week ?? 7
}

export function getWeekPlan(week: number): WeekPlan | undefined {
  return weekPlans.find((w) => w.week === week)
}

export const TOTAL_WEEKS = weekPlans.length
