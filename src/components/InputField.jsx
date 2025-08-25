import React from 'react'
import { cn } from '../utils/cn'

export default function InputField({ 
  variant = 'default', 
  label, 
  error, 
  className, 
  ...props 
}) {
  const Component = variant === 'textarea' ? 'textarea' : 'input'
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <Component
        className={cn(
          'w-full px-4 py-3 bg-surface border border-border rounded-md',
          'text-text-primary placeholder:text-text-secondary',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'transition-colors',
          error && 'border-red-500 focus:ring-red-500',
          variant === 'textarea' && 'resize-none min-h-[100px]',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}