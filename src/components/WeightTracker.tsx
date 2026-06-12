import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { WeightLineChart } from './charts/WeightLineChart'
import { addWeightEntry, getWeightEntries } from '../db/database'
import type { ChartColors } from '../hooks/useTheme'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { Input } from './ui/Input'

interface WeightTrackerProps {
  targetWeight: number
  chartColors: ChartColors
}

export function WeightTracker({ targetWeight, chartColors }: WeightTrackerProps) {
  const entries = useLiveQuery(() => getWeightEntries(), [])
  const [weight, setWeight] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const value = parseFloat(weight.replace(',', '.'))
    if (isNaN(value) || value < 30 || value > 200) return

    setSaving(true)
    await addWeightEntry(value)
    setWeight('')
    setSaving(false)
  }

  const chartData =
    entries?.map((e) => ({
      date: e.date.slice(5),
      weight: e.weight,
    })) ?? []

  const latest = entries?.[entries.length - 1]

  return (
    <Card>
      <h3 className="font-semibold mb-3">Gewicht</h3>

      {latest && (
        <p className="text-2xl font-bold mb-1">
          {latest.weight} kg
          <span className="text-sm font-normal text-text-muted ml-2">
            Ziel: {targetWeight} kg
          </span>
        </p>
      )}

      {chartData.length > 1 && (
        <WeightLineChart data={chartData} chartColors={chartColors} />
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <Input
          type="text"
          inputMode="decimal"
          placeholder="z.B. 55,5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="!py-2.5"
        />
        <Button type="submit" disabled={saving || !weight} className="shrink-0">
          Speichern
        </Button>
      </form>
    </Card>
  )
}
