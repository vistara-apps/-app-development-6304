import React from 'react'
import { cn } from '../utils/cn'

export default function AIPreviewFrame({ 
  preview, 
  className, 
  title = "AI Generated Preview" 
}) {
  if (!preview) {
    return (
      <div className={cn(
        'border-2 border-dashed border-border rounded-lg p-8 text-center',
        className
      )}>
        <p className="text-text-secondary">No preview generated yet</p>
      </div>
    )
  }

  return (
    <div className={cn('bg-surface rounded-lg overflow-hidden border border-border', className)}>
      <div className="bg-surface/50 p-3 border-b border-border">
        <h4 className="text-sm font-medium text-text-primary">{title}</h4>
      </div>
      <div 
        className="p-6 bg-white text-gray-900 min-h-[300px]"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>
  )
}