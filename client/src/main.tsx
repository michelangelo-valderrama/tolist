import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import '@fontsource-variable/work-sans'
import '@fontsource-variable/source-code-pro'
import '@/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
