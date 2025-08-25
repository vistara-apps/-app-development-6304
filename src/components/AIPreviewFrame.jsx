import React from 'react'
import { Zap, AlertCircle } from 'lucide-react'
import { cn } from '../utils/cn'

export default function AIPreviewFrame({ 
  preview, 
  className, 
  title = "AI Generated Preview",
  isLoading = false,
  error = null
}) {
  // Loading state
  if (isLoading) {
    return (
      <div className={cn(
        'bg-surface rounded-lg overflow-hidden border border-border',
        className
      )}>
        <div className="bg-surface/50 p-3 border-b border-border">
          <h4 className="text-sm font-medium text-text-primary">{title}</h4>
        </div>
        <div className="p-6 bg-surface min-h-[300px] flex flex-col items-center justify-center">
          <div className="animate-pulse flex flex-col items-center text-center">
            <div className="p-3 bg-primary/20 rounded-full mb-4">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Generating Preview</h3>
            <p className="text-text-secondary max-w-md">
              Our AI is creating an interactive preview based on your idea and feature requests...
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className={cn(
        'bg-surface rounded-lg overflow-hidden border border-border',
        className
      )}>
        <div className="bg-surface/50 p-3 border-b border-border">
          <h4 className="text-sm font-medium text-text-primary">{title}</h4>
        </div>
        <div className="p-6 bg-surface min-h-[300px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-red-500/20 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Preview Generation Failed</h3>
            <p className="text-text-secondary max-w-md mb-4">
              {error || "There was an error generating the preview. Please try again."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Empty state
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

  // Preview state
  return (
    <div className={cn('bg-surface rounded-lg overflow-hidden border border-border animate-fade-in', className)}>
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
