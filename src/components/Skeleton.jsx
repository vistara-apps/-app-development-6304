import React from 'react'
import { cn } from '../utils/cn'

export default function Skeleton({ 
  className, 
  variant = 'default',
  ...props 
}) {
  return (
    <div
      className={cn(
        'animate-pulse bg-surface/50 rounded-md',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 w-full',
        variant === 'title' && 'h-6 w-3/4',
        variant === 'button' && 'h-10 w-24',
        variant === 'card' && 'h-40 w-full',
        variant === 'avatar' && 'h-10 w-10 rounded-full',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

// Skeleton text with multiple lines
export function SkeletonText({ lines = 3, className, ...props }) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          className={cn(
            i === lines - 1 && lines > 1 && 'w-4/5',
            i === 0 && lines > 1 && 'w-full'
          )} 
        />
      ))}
    </div>
  )
}

// Card skeleton
export function SkeletonCard({ className, ...props }) {
  return (
    <div 
      className={cn(
        'border border-border rounded-lg p-6 space-y-4 bg-surface',
        className
      )}
      {...props}
    >
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton variant="circle" className="h-10 w-10" />
          <Skeleton variant="text" className="w-8" />
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton variant="title" />
          <SkeletonText lines={2} />
          <div className="flex space-x-2">
            <Skeleton variant="text" className="w-20" />
            <Skeleton variant="text" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

