import React from 'react'
import { cn } from '../utils/cn'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  className, 
  ...props 
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg',
        'disabled:opacity-50 disabled:pointer-events-none',
        
        // Variants
        variant === 'primary' && 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
        variant === 'secondary' && 'bg-surface text-text-primary hover:bg-surface/80 focus:ring-surface border border-border',
        variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
        
        // Sizes
        size === 'sm' && 'px-3 py-2 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      )}
      {children}
    </button>
  )
}