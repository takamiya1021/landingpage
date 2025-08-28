import React from 'react'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

export default function Badge({ 
  variant = 'default', 
  size = 'md', 
  className = '', 
  children 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}