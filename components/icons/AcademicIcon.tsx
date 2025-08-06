import React from 'react'

interface AcademicIconProps {
  size: number
}

export default function AcademicIcon({ size }: AcademicIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Graduation cap */}
      <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"/>
      <path d="M9 22V12h6v10"/>
      {/* Academic mortarboard top */}
      <path d="M2 9l10-7 10 7"/>
      {/* Tassel */}
      <path d="M22 9l-1 3-3-1"/>
    </svg>
  )
}
