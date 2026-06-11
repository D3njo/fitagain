import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'accent' | 'phase'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const styles = {
    default: 'bg-surface-overlay/60 text-text-muted',
    accent: 'bg-accent/15 text-accent',
    phase: 'bg-accent/15 text-accent font-medium',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
