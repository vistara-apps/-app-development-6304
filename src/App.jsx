import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import IdeaDetail from './pages/IdeaDetail'
import CreateIdea from './pages/CreateIdea'

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <ToastProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/idea/:id" element={<IdeaDetail />} />
              <Route path="/create" element={<CreateIdea />} />
            </Routes>
          </AppLayout>
        </ToastProvider>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
