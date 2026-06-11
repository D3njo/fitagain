import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'success' | 'warning'
}

const variants = {
  default: 'bg-surface-raised border-border/60 card-shadow',
  success: 'bg-[var(--color-success-bg)] border-[var(--color-success-border)]',
  warning: 'bg-[var(--color-warning-bg)] border-[var(--color-warning-border)]',
}

export function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left w-full transition-transform active:scale-[0.99] ${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  )
}
