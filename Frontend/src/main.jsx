import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const root = createRoot(document.getElementById('root'))

  Promise.all([
    import('./App.jsx'),
    import('./context/User.jsx'),
    import('./context/Student.jsx'),
  ]).then(([{ default: App }, { UserProvider }, { StudentProvider }]) => {
    root.render(
      <StrictMode>
        <UserProvider>
          <StudentProvider>
            <App />
          </StudentProvider>
        </UserProvider>
      </StrictMode>,
    )
  })

