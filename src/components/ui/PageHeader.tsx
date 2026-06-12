import type { ReactNode } from 'react'
import { Badge } from './Badge'

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, badge, action }: PageHeaderProps) {
  return (
    <header className="mb-2">
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
          <div className="flex items-center flex-wrap gap-2 mt-0.5">
            <h1 className="text-2xl font-bold tracking-tight min-w-0 break-words">{title}</h1>
            {badge && <Badge>{badge}</Badge>}
          </div>
        </div>
        {action}
      </div>
    </header>
  )
}
