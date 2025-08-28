import React from 'react'

interface CardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
  gradient?: boolean
}

export default function Card({ className = '', children, hover = true, gradient = false }: CardProps) {
  const baseClasses = 'rounded-3xl border border-gray-100 transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-2' : ''
  const gradientClasses = gradient 
    ? 'bg-gradient-to-br from-white via-gray-50 to-blue-50' 
    : 'bg-white'
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${gradientClasses} shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 pb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 pt-2 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 pt-4 ${className}`}>
      {children}
    </div>
  )
}