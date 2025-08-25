import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Lightbulb, Plus, Home, User, Moon, Sun } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { cn } from '../utils/cn'
import { useTheme } from '../contexts/ThemeContext'

export default function AppLayout({ children }) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

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
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
                  location.pathname === '/' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                )}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/create" 
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
                  location.pathname === '/create' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                )}
              >
                <Plus className="h-4 w-4" />
                <span>New Idea</span>
              </Link>
              
              <div className="flex items-center space-x-2 px-4 py-2 text-text-secondary">
                <User className="h-4 w-4" />
                <span>demo_user</span>
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </nav>
            
            {/* Mobile Menu */}
            <div className="flex items-center md:hidden">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 mr-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              <MobileMenu />
            </div>
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
