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
      <div className="flex items-start justify-between gap-3">
        <div>
          {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
          <div className="flex items-center gap-2 mt-0.5">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {badge && <Badge>{badge}</Badge>}
          </div>
        </div>
        {action}
      </div>
    </header>
  )
}
