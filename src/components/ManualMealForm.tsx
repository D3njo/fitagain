import { useEffect, useRef, useState } from 'react'
import { useFoodLookup } from '../hooks/useFoodLookup'
import type { FoodLookupResult } from '../services/foodLookup'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

interface ManualMealFormProps {
  nutritionApiKey?: string
  onSubmit: (data: {
    name: string
    calories: number
    protein: number
    fat: number
    carbs: number
  }) => Promise<void>
  onClose: () => void
}

export function ManualMealForm({ nutritionApiKey, onSubmit, onClose }: ManualMealFormProps) {
  const [name, setName] = useState('')
  const [kcal, setKcal] = useState('')
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('0')
  const [carbs, setCarbs] = useState('0')
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const blurTimer = useRef<number | null>(null)

  const { suggestions, loading, error, hasApiKey } = useFoodLookup({
    query: name,
    nutritionApiKey,
    enabled: showSuggestions,
  })

  const applySuggestion = (item: FoodLookupResult) => {
    setName(item.name)
    setKcal(String(item.calories))
    setProtein(String(item.protein))
    setFat(String(item.fat))
    setCarbs(String(item.carbs))
    setSelectedSource(item.source)
    setShowSuggestions(false)
  }

  useEffect(() => {
    if (!showSuggestions || suggestions.length !== 1) return
    const only = suggestions[0]
    if (only.source === 'online' && !kcal && !protein) {
      applySuggestion(only)
    }
  }, [suggestions, showSuggestions, kcal, protein])

  const handleNameChange = (value: string) => {
    setName(value)
    setSelectedSource(null)
    setShowSuggestions(true)
    if (!value.trim()) {
      setKcal('')
      setProtein('')
      setFat('0')
      setCarbs('0')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const calories = parseInt(kcal, 10)
    const proteinVal = parseInt(protein, 10) || 0
    const fatVal = parseInt(fat, 10) || 0
    const carbsVal = parseInt(carbs, 10) || 0
    if (!name.trim() || isNaN(calories)) return

    await onSubmit({
      name: name.trim(),
      calories,
      protein: proteinVal,
      fat: fatVal,
      carbs: carbsVal,
    })
    setName('')
    setKcal('')
    setProtein('')
    setFat('0')
    setCarbs('0')
    setSelectedSource(null)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3">
      <div className="relative">
        <Input
          placeholder="Was hast du gegessen? z. B. Döner, Ramen, Pizza"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            blurTimer.current = window.setTimeout(() => setShowSuggestions(false), 150)
          }}
          autoComplete="off"
        />
        {showSuggestions && (suggestions.length > 0 || loading) && (
          <ul
            className="absolute z-20 left-0 right-0 mt-1 rounded-xl border border-border bg-surface-raised card-shadow overflow-hidden"
            onMouseDown={(e) => {
              e.preventDefault()
              if (blurTimer.current) window.clearTimeout(blurTimer.current)
            }}
          >
            {loading && (
              <li className="px-4 py-2.5 text-xs text-text-muted">Suche online…</li>
            )}
            {suggestions.map((item) => (
              <li key={`${item.source}-${item.name}`}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 hover:bg-accent/10 transition-colors"
                  onClick={() => applySuggestion(item)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-text-muted shrink-0">
                      {item.calories} kcal · {item.protein} g Protein
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    {item.source === 'online' ? 'Online-Schätzung' : 'Typische Portion'}
                    {item.servingNote ? ` · ${item.servingNote}` : ''}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSource && (
        <p className="text-xs text-text-muted -mt-1">
          {selectedSource === 'online'
            ? 'Werte aus Online-Suche übernommen — bei Bedarf anpassen.'
            : 'Werte aus Gerichte-Datenbank — bei Bedarf anpassen.'}
        </p>
      )}

      {!hasApiKey && name.trim().length >= 2 && (
        <p className="text-xs text-text-muted -mt-1">
          Tipp: Im Profil einen kostenlosen CalorieNinjas-API-Key eintragen für mehr Gerichte online.
        </p>
      )}

      {error && <p className="text-xs text-warning">{error}</p>}

      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="kcal"
          value={kcal}
          onChange={(e) => {
            setKcal(e.target.value)
            setSelectedSource(null)
          }}
        />
        <Input
          type="number"
          placeholder="Protein (g)"
          value={protein}
          onChange={(e) => {
            setProtein(e.target.value)
            setSelectedSource(null)
          }}
        />
      </div>
      <Button type="submit" fullWidth disabled={!name.trim() || !kcal}>
        Eintragen
      </Button>
    </form>
  )
}
