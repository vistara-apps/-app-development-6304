import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '../utils/cn'

export default function VotingButton({ 
  variant = 'up', 
  selected = false, 
  count = 0, 
  onClick,
  className 
}) {
  const isUp = variant === 'up'
  const Icon = isUp ? ChevronUp : ChevronDown
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center p-2 rounded-md transition-colors',
        selected 
          ? isUp 
            ? 'bg-accent/20 text-accent' 
            : 'bg-red-500/20 text-red-400'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface',
        className
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{count}</span>
    </button>
  )
}