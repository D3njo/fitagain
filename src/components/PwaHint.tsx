import { useState } from 'react'
import { saveSettings, type Settings } from '../db/database'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

interface PwaHintProps {
  settings: Settings
}

export function PwaHint({ settings }: PwaHintProps) {
  const [dismissed, setDismissed] = useState(settings.pwaHintDismissed)
  const [isStandalone] = useState(
    () => window.matchMedia('(display-mode: standalone)').matches,
  )

  if (dismissed || isStandalone) return null

  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent)

  const handleDismiss = async () => {
    await saveSettings({
      ...settings,
      pwaHintDismissed: true,
      themeMode: settings.themeMode ?? 'system',
    })
    setDismissed(true)
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-lg mx-auto z-50">
      <Card className="!p-4 !border-accent/30 card-shadow">
        <p className="text-sm font-semibold">App installieren</p>
        <p className="text-xs text-text-muted mt-1">
          {isIos
            ? 'Tippe auf Teilen → „Zum Home-Bildschirm" für schnellen Zugriff.'
            : 'Tippe auf das Browser-Menü → „App installieren" oder „Zum Startbildschirm".'}
        </p>
        <Button variant="ghost" onClick={handleDismiss} className="!mt-2 !px-0 !min-h-0">
          Verstanden
        </Button>
      </Card>
    </div>
  )
}
