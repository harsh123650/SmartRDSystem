import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Rduser from './Rduser.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Rduser/>
  </StrictMode>,
)
