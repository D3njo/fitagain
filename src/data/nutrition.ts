export type Phase = 'sanfterStart' | 'aufbau' | 'deftig'

export const PHASE_LABELS: Record<Phase, string> = {
  sanfterStart: 'Sanfter Start',
  aufbau: 'Aufbau',
  deftig: 'Deftig',
}

export const TOTAL_DAYS = 45
export const PROTEIN_PER_KG = 1.8

const PHASE_RANGES: Record<Phase, { start: number; end: number; kcalMin: number; kcalMax: number }> = {
  sanfterStart: { start: 1, end: 10, kcalMin: 2000, kcalMax: 2200 },
  aufbau: { start: 11, end: 25, kcalMin: 2300, kcalMax: 2600 },
  deftig: { start: 26, end: 45, kcalMin: 2600, kcalMax: 3000 },
}

export function getPhase(day: number): Phase {
  if (day <= 10) return 'sanfterStart'
  if (day <= 25) return 'aufbau'
  return 'deftig'
}

export function getPhaseDay(day: number): number {
  const phase = getPhase(day)
  return day - PHASE_RANGES[phase].start + 1
}

export function getPhaseLength(phase: Phase): number {
  const range = PHASE_RANGES[phase]
  return range.end - range.start + 1
}

function lerp(min: number, max: number, t: number): number {
  return Math.round(min + (max - min) * t)
}

export interface DailyTarget {
  day: number
  phase: Phase
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function getDailyTarget(day: number, weightKg: number): DailyTarget {
  const clampedDay = Math.min(Math.max(day, 1), TOTAL_DAYS)
  const phase = getPhase(clampedDay)
  const range = PHASE_RANGES[phase]
  const phaseDay = getPhaseDay(clampedDay)
  const phaseLength = getPhaseLength(phase)
  const progress = phaseLength === 1 ? 1 : (phaseDay - 1) / (phaseLength - 1)

  const calories = lerp(range.kcalMin, range.kcalMax, progress)
  const protein = Math.round(weightKg * PROTEIN_PER_KG)
  const proteinKcal = protein * 4
  const remaining = calories - proteinKcal

  const carbRatio = phase === 'sanfterStart' ? 0.55 : 0.45
  const carbs = Math.round((remaining * carbRatio) / 4)
  const fat = Math.round((remaining * (1 - carbRatio)) / 9)

  return {
    day: clampedDay,
    phase,
    calories,
    protein,
    carbs,
    fat,
  }
}

export function getDayNumber(startDate: string, date: Date = new Date()): number {
  const start = new Date(startDate + 'T12:00:00')
  start.setHours(0, 0, 0, 0)
  const current = new Date(date)
  current.setHours(0, 0, 0, 0)
  const diff = Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return 0
  return Math.min(diff + 1, TOTAL_DAYS)
}

export function getStartDateForDay(targetDay: number, anchor: Date = new Date()): string {
  const clamped = Math.min(Math.max(targetDay, 1), TOTAL_DAYS)
  const d = new Date(anchor)
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() - (clamped - 1))
  return formatDateKey(d)
}

export interface PlanStatus {
  day: number
  daysUntilStart: number
  isBeforeStart: boolean
  isComplete: boolean
  phase: Phase | null
}

export function getPlanStatus(startDate: string, date: Date = new Date()): PlanStatus {
  const day = getDayNumber(startDate, date)
  const start = new Date(startDate + 'T12:00:00')
  start.setHours(0, 0, 0, 0)
  const current = new Date(date)
  current.setHours(0, 0, 0, 0)
  const diff = Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

  if (diff < 0) {
    return {
      day: 0,
      daysUntilStart: -diff,
      isBeforeStart: true,
      isComplete: false,
      phase: null,
    }
  }

  return {
    day,
    daysUntilStart: 0,
    isBeforeStart: false,
    isComplete: day >= TOTAL_DAYS && diff >= TOTAL_DAYS - 1,
    phase: day > 0 ? getPhase(day) : null,
  }
}

export const PLAN_CHECKPOINTS: { day: number; label: string }[] = [
  { day: 1, label: 'Tag 1 — Woche 1 (Sanfter Start)' },
  { day: 8, label: 'Tag 8 — Woche 2' },
  { day: 11, label: 'Tag 11 — Phase Aufbau' },
  { day: 15, label: 'Tag 15 — Woche 3' },
  { day: 22, label: 'Tag 22 — Woche 4' },
  { day: 26, label: 'Tag 26 — Phase Deftig' },
  { day: 29, label: 'Tag 29 — Woche 5' },
  { day: 36, label: 'Tag 36 — Woche 6' },
  { day: 43, label: 'Tag 43 — Woche 7' },
]

export function formatDateKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export function formatDateDE(dateKey: string): string {
  const [y, m, d] = dateKey.split('-')
  return `${d}.${m}.${y}`
}

export function isGoalReached(consumed: number, target: number): boolean {
  return consumed >= target * 0.8
}
