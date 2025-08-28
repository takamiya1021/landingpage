import React from 'react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  className = '', 
  centered = true 
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}