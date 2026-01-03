import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/User.jsx'
import { StudentProvider } from './context/Student.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </UserProvider>
  </StrictMode>,
)
