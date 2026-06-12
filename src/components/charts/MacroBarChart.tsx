import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartColors } from '../../hooks/useTheme'
import { ControlledChartTooltip } from './ChartTooltip'
import { useChartTooltip } from './useChartTooltip'

interface MacroBarChartProps {
  data: Record<string, string | number>[]
  dataKey: string
  fill: string
  chartColors: ChartColors
  heightClass?: string
  yAxisWidth?: number
  referenceY?: number
}

const xAxisProps = (textColor: string) => ({
  dataKey: 'date' as const,
  tick: { fontSize: 10, fill: textColor },
  interval: 'preserveStartEnd' as const,
  angle: -35,
  textAnchor: 'end' as const,
  height: 50,
})

export function MacroBarChart({
  data,
  dataKey,
  fill,
  chartColors,
  heightClass = 'h-40',
  yAxisWidth = 35,
  referenceY,
}: MacroBarChartProps) {
  const { tooltip, onMouseMove, onMouseLeave, onClick } = useChartTooltip()

  const tooltipStyle = {
    background: chartColors.tooltipBg,
    border: `1px solid ${chartColors.tooltipBorder}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: chartColors.text,
  }

  return (
    <div className={heightClass}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          onMouseMove={(state) => onMouseMove(state)}
          onMouseLeave={onMouseLeave}
          onClick={(state) => onClick(state)}
        >
          <XAxis {...xAxisProps(chartColors.text)} />
          <YAxis tick={{ fontSize: 10, fill: chartColors.text }} width={yAxisWidth} />
          <ControlledChartTooltip tooltip={tooltip} contentStyle={tooltipStyle} />
          <Bar dataKey={dataKey} fill={fill} radius={[4, 4, 0, 0]} />
          {referenceY !== undefined && (
            <ReferenceLine
              y={referenceY}
              stroke={chartColors.warning}
              strokeDasharray="4 4"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
