import { Tooltip, type TooltipProps } from 'recharts'
import type { ChartTooltipState } from './useChartTooltip'

interface ControlledChartTooltipProps extends Omit<TooltipProps<number, string>, 'contentStyle'> {
  tooltip: ChartTooltipState
  contentStyle: React.CSSProperties
}

export function ControlledChartTooltip({
  tooltip,
  contentStyle,
}: ControlledChartTooltipProps) {
  return (
    <Tooltip
      active={tooltip.active}
      payload={tooltip.active ? [...(tooltip.payload ?? [])] : []}
      label={tooltip.label}
      contentStyle={contentStyle}
      cursor={{ fill: 'transparent' }}
      isAnimationActive={false}
    />
  )
}
