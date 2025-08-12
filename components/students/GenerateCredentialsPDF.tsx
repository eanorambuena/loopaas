'use client'
import React from 'react'
import CredentialsPDF from './CredentialsPDF'
import { CourseStudentWithUserInfo } from '@/utils/queries'

interface GenerateCredentialsPDFProps {
  students: CourseStudentWithUserInfo[]
  courseTitle: string
  courseSemester: string
}

export default function GenerateCredentialsPDF({ 
  students, 
  courseTitle,
  courseSemester
}: GenerateCredentialsPDFProps) {
  // Convertir la estructura de datos para el nuevo componente
  const mappedStudents = students.map(student => ({
    id: student.id,
    userInfo: {
      firstName: student.userInfo.firstName || '',
      lastName: student.userInfo.lastName || '',
      email: student.userInfo.email || ''
    }
  }))

  return (
  <div className='bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300'>
  <div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-neutral-900 dark:to-neutral-800 px-6 py-4 border-b border-gray-200 dark:border-neutral-700'>
  <h3 className='text-xl font-semibold text-gray-900 dark:text-neutral-100 flex items-center gap-2'>
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Credenciales PDF Profesionales
        </h3>
  <p className='text-sm text-gray-600 dark:text-neutral-300 mt-1'>
          Diseño profesional idéntico al ejemplo de Canva con react-pdf
        </p>
      </div>
      
  <div className='p-6 space-y-4'>
  <div className='bg-green-50 dark:bg-emerald-900/30 border border-green-200 dark:border-emerald-800 rounded-lg p-4 transition-colors duration-300'>
          <h4 className='font-medium text-green-900 dark:text-emerald-100 mb-3 flex items-center gap-2'>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Características del Diseño
          </h4>
          <ul className='text-sm text-green-800 dark:text-emerald-200 space-y-1'>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
              <strong>Código QR en fondo blanco</strong> - escaneado fácil del email
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
              <strong>{students.length} credenciales</strong>
            </li>
          </ul>
        </div>
        
        <CredentialsPDF 
          students={mappedStudents}
          courseCode={courseTitle}
          semester={courseSemester}
        />
      </div>
    </div>
  )
}
