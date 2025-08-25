/**
 * Utility function to conditionally join class names together
 * This is a simplified version of the clsx/classnames libraries
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

