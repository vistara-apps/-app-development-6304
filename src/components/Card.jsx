import React from 'react'
import { cn } from '../utils/cn'

export default function Card({ children, variant = 'default', className, ...props }) {
  return (
    <div 
      className={cn(
        'bg-surface rounded-lg shadow-card border border-border',
        variant === 'interactive' && 'hover:bg-surface/80 transition-colors cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('p-6 pb-3', className)} {...props}>
      {children}
    </div>
  )
}

Card.Content = function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('p-6 pt-3 border-t border-border', className)} {...props}>
      {children}
    </div>
  )
}