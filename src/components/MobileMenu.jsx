import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Plus, User } from 'lucide-react'
import { cn } from '../utils/cn'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)
  
  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm" onClick={closeMenu}>
          <div 
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-surface border-l border-border p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface/50 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="space-y-4">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md transition-colors",
                  location.pathname === '/' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                )}
                onClick={closeMenu}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/create" 
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md transition-colors",
                  location.pathname === '/create' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                )}
                onClick={closeMenu}
              >
                <Plus className="h-5 w-5" />
                <span>New Idea</span>
              </Link>
              
              <div className="flex items-center space-x-3 p-3 text-text-secondary">
                <User className="h-5 w-5" />
                <span>demo_user</span>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

