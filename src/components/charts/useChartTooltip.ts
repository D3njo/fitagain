import { useCallback, useEffect, useRef, useState } from 'react'
import type { CategoricalChartState } from 'recharts/types/chart/types'

export interface ChartTooltipState {
  active: boolean
  label?: string
  payload?: readonly { value?: number; name?: string; dataKey?: string; color?: string }[]
}

const emptyTooltip: ChartTooltipState = { active: false }

function fromRechartsState(state: CategoricalChartState | null): ChartTooltipState | null {
  if (!state?.isTooltipActive || !state.activePayload?.length) return null
  return {
    active: true,
    label: state.activeLabel,
    payload: state.activePayload,
  }
}

function isTouchDevice(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
}

export function useChartTooltip() {
  const [tooltip, setTooltip] = useState<ChartTooltipState>(emptyTooltip)
  const touchMode = useRef(isTouchDevice())

  const dismiss = useCallback(() => setTooltip(emptyTooltip), [])

  useEffect(() => {
    const onScroll = () => dismiss()
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [dismiss])

  const onMouseMove = useCallback(
    (state: CategoricalChartState | null) => {
      if (touchMode.current) return
      const mapped = fromRechartsState(state)
      if (mapped) setTooltip(mapped)
      else dismiss()
    },
    [dismiss],
  )

  const onMouseLeave = useCallback(() => {
    if (!touchMode.current) dismiss()
  }, [dismiss])

  const onClick = useCallback(
    (state: CategoricalChartState | null) => {
      if (!touchMode.current) return
      const mapped = fromRechartsState(state)
      if (mapped) {
        setTooltip((prev) =>
          prev.active && prev.label === mapped.label ? emptyTooltip : mapped,
        )
      } else {
        dismiss()
      }
    },
    [dismiss],
  )

  return { tooltip, onMouseMove, onMouseLeave, onClick, dismiss }
}
