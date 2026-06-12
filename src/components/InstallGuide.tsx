import { useState } from 'react'
import { Card } from './ui/Card'

export function InstallGuide() {
  const [open, setOpen] = useState(false)
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent)

  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h3 className="font-semibold text-sm">App auf dem Handy installieren</h3>
          <p className="text-xs text-text-muted mt-0.5">PWA — wie eine native App nutzen</p>
        </div>
        <span className="text-text-muted text-lg">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-4 text-sm text-text-muted border-t border-border/50 pt-4">
          <section>
            <p className="font-medium text-text mb-1">Option A: Im WLAN testen</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Am PC im Projektordner: <code className="text-xs bg-surface-overlay px-1 rounded">vite dev --host</code></li>
              <li>Die angezeigte Adresse (z.B. 192.168.x.x:5173) auf dem Handy öffnen</li>
              <li>Gleiches WLAN wie der PC</li>
            </ol>
          </section>

          <section>
            <p className="font-medium text-text mb-1">Option B: Dauerhaft online (GitHub Pages)</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Repo auf GitHub pushen — bei jedem Push auf <code className="text-xs bg-surface-overlay px-1 rounded">main</code> wird automatisch deployed</li>
              <li>Unter Settings → Pages → Source: <strong>GitHub Actions</strong> wählen</li>
              <li>Feste URL auf dem Handy öffnen: <code className="text-xs bg-surface-overlay px-1 rounded">https://d3njo.github.io/phasefuel/</code></li>
            </ol>
          </section>

          <section>
            <p className="font-medium text-text mb-1">Installation</p>
            {isIos ? (
              <p>Teilen (↑) → „Zum Home-Bildschirm"</p>
            ) : (
              <p>Browser-Menü (⋮) → „App installieren" oder „Zum Startbildschirm hinzufügen"</p>
            )}
          </section>
        </div>
      )}
    </Card>
  )
}
