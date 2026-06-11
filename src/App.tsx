import { useEffect, useState } from 'react'
import { BottomNav, type Page } from './components/BottomNav'
import { PwaHint } from './components/PwaHint'
import { Spinner } from './components/ui/Spinner'
import { db } from './db/database'
import { useTheme } from './hooks/useTheme'
import { useSettings } from './hooks/useNutrition'
import { HistoryPage } from './pages/HistoryPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { PlanPage } from './pages/PlanPage'
import { ProfilePage } from './pages/ProfilePage'
import { ShoppingPage } from './pages/ShoppingPage'
import { TodayPage } from './pages/TodayPage'

function App() {
  const settings = useSettings()
  const [page, setPage] = useState<Page>('today')
  const [dbError, setDbError] = useState<string | null>(null)
  const { chartColors } = useTheme(settings ?? null)

  useEffect(() => {
    db.open().catch((err: Error) => {
      setDbError(err.message || 'Datenbank konnte nicht geöffnet werden.')
    })
  }, [])

  if (dbError) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="font-semibold text-red-500">Fehler beim Laden</p>
          <p className="text-sm text-text-muted mt-2">{dbError}</p>
          <p className="text-xs text-text-muted mt-4">
            Prüfe, ob IndexedDB im Browser erlaubt ist (nicht im privaten Modus blockiert).
          </p>
        </div>
      </div>
    )
  }

  if (settings === undefined) {
    return <Spinner />
  }

  if (!settings?.onboardingComplete) {
    return <OnboardingPage />
  }

  return (
    <div className="min-h-dvh pb-20 bg-surface">
      <main className="max-w-lg mx-auto px-4 pt-6 pb-4">
        {page === 'today' && <TodayPage onGoShopping={() => setPage('shopping')} />}
        {page === 'plan' && <PlanPage onGoShopping={() => setPage('shopping')} />}
        {page === 'shopping' && <ShoppingPage />}
        {page === 'history' && <HistoryPage chartColors={chartColors} />}
        {page === 'profile' && <ProfilePage />}
      </main>
      <BottomNav current={page} onNavigate={setPage} />
      <PwaHint settings={settings} />
    </div>
  )
}

export default App
