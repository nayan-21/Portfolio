import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* ── Easter egg ── */
console.log('%cYes, this site has gravity. No, I didn\'t break physics.', 'color: #7C3AED; font-weight: bold; font-size: 1.1em;');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
