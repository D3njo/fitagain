import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initThemeBeforeLoad } from './hooks/useTheme'
import './index.css'
import App from './App.tsx'

initThemeBeforeLoad()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
