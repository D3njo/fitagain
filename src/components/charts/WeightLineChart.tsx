import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import type { ChartColors } from '../../hooks/useTheme'
import { ControlledChartTooltip } from './ChartTooltip'
import { useChartTooltip } from './useChartTooltip'

interface WeightLineChartProps {
  data: { date: string; weight: number }[]
  chartColors: ChartColors
}

export function WeightLineChart({ data, chartColors }: WeightLineChartProps) {
  const { tooltip, onMouseMove, onMouseLeave, onClick } = useChartTooltip()

  const tooltipStyle = {
    background: chartColors.tooltipBg,
    border: `1px solid ${chartColors.tooltipBorder}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: chartColors.text,
  }

  return (
    <div className="h-32 mt-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          onMouseMove={(state) => onMouseMove(state)}
          onMouseLeave={onMouseLeave}
          onClick={(state) => onClick(state)}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: chartColors.text }}
            interval="preserveStartEnd"
            angle={-35}
            textAnchor="end"
            height={50}
          />
          <YAxis
            domain={['dataMin - 1', 'dataMax + 1']}
            tick={{ fontSize: 10, fill: chartColors.text }}
            width={35}
          />
          <ControlledChartTooltip tooltip={tooltip} contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke={chartColors.accent}
            strokeWidth={2}
            dot={{ fill: chartColors.accent, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
