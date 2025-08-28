import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export default function Container({ 
  children, 
  className = '', 
  size = 'lg' 
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }
  
  return (
    <div className={`mx-auto px-6 ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}