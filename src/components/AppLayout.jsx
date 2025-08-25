import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Lightbulb, Plus, Home, User } from 'lucide-react'

export default function AppLayout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-surface bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-accent" />
              <span className="display text-xl font-bold">IdeaForge</span>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/create" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/create' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>New Idea</span>
              </Link>
              
              <div className="flex items-center space-x-2 px-4 py-2 text-text-secondary">
                <User className="h-4 w-4" />
                <span>demo_user</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        {children}
      </main>
    </div>
  )
}