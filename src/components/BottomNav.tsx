import type { ReactNode } from 'react'

export type Page = 'today' | 'plan' | 'shopping' | 'history' | 'profile'

interface BottomNavProps {
  current: Page
  onNavigate: (page: Page) => void
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

const NAV_ITEMS: { id: Page; label: string; icon: ReactNode }[] = [
  {
    id: 'today',
    label: 'Heute',
    icon: (
      <Icon>
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
      </Icon>
    ),
  },
  {
    id: 'plan',
    label: 'Plan',
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </Icon>
    ),
  },
  {
    id: 'shopping',
    label: 'Einkauf',
    icon: (
      <Icon>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </Icon>
    ),
  },
  {
    id: 'history',
    label: 'Verlauf',
    icon: (
      <Icon>
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 5-7" />
      </Icon>
    ),
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </Icon>
    ),
  },
]

export function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-border/60 safe-bottom backdrop-blur-md"
      style={{ backgroundColor: 'var(--color-nav-bg)' }}
    >
      <div className="flex max-w-lg mx-auto px-1">
        {NAV_ITEMS.map((item) => {
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors min-h-[56px] justify-center ${
                active ? 'text-accent' : 'text-text-muted'
              }`}
            >
              <span
                className={`p-1.5 rounded-xl transition-colors ${
                  active ? 'bg-accent/15' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
