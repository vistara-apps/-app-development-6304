import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '../utils/cn'

export default function Toast({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 300) // Wait for exit animation
    }, duration)
    
    return () => clearTimeout(timer)
  }, [duration, onClose])
  
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-400" />,
  }
  
  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  }
  
  return (
    <div 
      className={cn(
        'fixed bottom-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg border',
        'transform transition-all duration-300 ease-in-out',
        bgColors[type] || bgColors.info,
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icons[type] || icons.info}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-text-primary">{message}</p>
        </div>
        <button
          type="button"
          className="ml-4 flex-shrink-0 text-text-secondary hover:text-text-primary"
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onClose?.(), 300)
          }}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

