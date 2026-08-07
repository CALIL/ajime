import React from 'react'
import { createRoot } from 'react-dom/client'
import 'fomantic-ui-css/semantic.css';
import './index.sass'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
