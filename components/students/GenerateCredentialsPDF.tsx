'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'
import { useToast } from '@/components/ui/use-toast'
import { CourseStudentWithUserInfo } from '@/utils/queries'
import * as QRCode from 'qrcode'

interface GenerateCredentialsPDFProps {
  students: CourseStudentWithUserInfo[]
  courseTitle: string
  courseSemester: string
}

export default function GenerateCredentialsPDF({ students, courseTitle, courseSemester }: GenerateCredentialsPDFProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generatePDF = async () => {
    if (students.length === 0) {
      toast({
        title: 'Error',
        description: 'No hay estudiantes para generar credenciales',
        variant: 'destructive'
      })
      return
    }

    setIsGenerating(true)
    
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      
      // Configuración de la credencial
      const cardWidth = 85 // mm
      const cardHeight = 54 // mm (tamaño estándar de tarjeta de crédito)
      const cardsPerRow = 2
      const cardsPerColumn = 4
      const marginX = (pageWidth - (cardsPerRow * cardWidth)) / (cardsPerRow + 1)
      const marginY = 20
      const spacing = 10
      
      let currentPage = 0
      let cardIndex = 0
      
      for (const student of students) {
        // Calcular posición de la tarjeta
        const row = Math.floor(cardIndex / cardsPerRow)
        const col = cardIndex % cardsPerRow
        
        // Si necesitamos una nueva página
        if (cardIndex > 0 && cardIndex % (cardsPerRow * cardsPerColumn) === 0) {
          doc.addPage()
          currentPage++
          cardIndex = 0
        }
        
        const x = marginX + col * (cardWidth + marginX)
        const y = marginY + row * (cardHeight + spacing)
        
        // Dibujar borde de la credencial
        doc.setDrawColor(200, 200, 200)
        doc.setLineWidth(0.5)
        doc.rect(x, y, cardWidth, cardHeight)
        
        // Fondo degradado simulado con rectángulos
        doc.setFillColor(240, 248, 255) // Azul muy claro
        doc.rect(x, y, cardWidth, 15, 'F')
        
        // Header con título del curso
        doc.setFillColor(59, 130, 246) // Azul
        doc.rect(x, y, cardWidth, 12, 'F')
        
        // Título del curso
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text(String(courseTitle), x + cardWidth/2, y + 8, { align: 'center' })
        
        // Semestre
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal')
        doc.text(`Semestre: ${String(courseSemester)}`, x + cardWidth/2, y + 11, { align: 'center' })
        
        // Información del estudiante (lado izquierdo)
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        
        // Nombre completo
        const fullName = `${String(student.userInfo.firstName || '')} ${String(student.userInfo.lastName || '')}`
        const maxNameLength = 20 // Reducido para dar espacio al QR
        const displayName = fullName.length > maxNameLength 
          ? fullName.substring(0, maxNameLength) + '...' 
          : fullName
        
        doc.text('Estudiante:', x + 3, y + 20)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.text(String(displayName), x + 3, y + 25)
        
        // Email
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.text('Email:', x + 3, y + 32)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(6)
        
        const email = String(student.userInfo.email || 'No especificado')
        const maxEmailLength = 20 // Reducido para dar espacio al QR
        const displayEmail = email.length > maxEmailLength 
          ? email.substring(0, maxEmailLength) + '...' 
          : email
        
        doc.text(String(displayEmail), x + 3, y + 36)
        
        // Generar QR Code con el email (lado derecho)
        try {
          const qrDataURL = await QRCode.toDataURL(email, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            },
            width: 200 // Alta resolución para buena calidad
          })
          
          // Posición del QR: lado derecho de la tarjeta
          const qrSize = 30 // mm (tamaño grande para escanear de lejos)
          const qrX = x + cardWidth - qrSize - 3 // 3mm de margen desde el borde derecho
          const qrY = y + 15 // Debajo del header
          
          // Agregar el QR al PDF
          doc.addImage(qrDataURL, 'PNG', qrX, qrY, qrSize, qrSize)
          
          // Texto debajo del QR
          doc.setFontSize(5)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(100, 100, 100)
          doc.text('Escanear para email', qrX + qrSize/2, qrY + qrSize + 3, { align: 'center' })
          
        } catch (qrError) {
          console.error('Error generando QR code:', qrError)
          // Si falla el QR, mostrar texto alternativo
          doc.setFontSize(6)
          doc.setTextColor(200, 0, 0)
          doc.text('QR Error', x + cardWidth - 15, y + 30)
        }
        
        // Decoración lateral izquierda
        doc.setFillColor(16, 185, 129) // Verde
        doc.rect(x, y, 3, cardHeight, 'F')
        
        // Línea de corte punteada
        doc.setDrawColor(150, 150, 150)
        doc.setLineDashPattern([1, 1], 0)
        doc.setLineWidth(0.2)
        doc.line(x, y + cardHeight + 2, x + cardWidth, y + cardHeight + 2)
        doc.setLineDashPattern([], 0) // Reset dash pattern
        
        cardIndex++
      }
      
      // Guardar el PDF
      const fileName = `credenciales_${courseTitle.replace(/\s+/g, '_')}_${courseSemester}.pdf`
      doc.save(fileName)
      
      toast({
        title: 'PDF Generado',
        description: `Se han generado las credenciales para ${students.length} estudiantes`,
        variant: 'success'
      })
      
    } catch (error) {
      console.error('Error generando PDF:', error)
      toast({
        title: 'Error',
        description: 'Error al generar el PDF de credenciales',
        variant: 'destructive'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden'>
      <div className='bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600'>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2'>
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Generar Credenciales PDF
        </h3>
        <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
          Crear un PDF imprimible con las credenciales de todos los estudiantes
        </p>
      </div>
      
      <div className='p-6 space-y-4'>
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
          <h4 className='font-medium text-red-900 dark:text-red-100 mb-3 flex items-center gap-2'>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Contenido del PDF
          </h4>
          <ul className='text-sm text-red-800 dark:text-red-200 space-y-1'>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-red-500 rounded-full'></span>
              Tarjetas de credenciales en formato imprimible
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-red-500 rounded-full'></span>
              Información: nombre completo y email del estudiante
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-red-500 rounded-full'></span>
              Código QR grande con el email para escaneo rápido
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-red-500 rounded-full'></span>
              {students.length} estudiantes incluidos en el PDF
            </li>
          </ul>
        </div>
        
        <button
          onClick={generatePDF}
          disabled={isGenerating || students.length === 0}
          className='w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {isGenerating ? (
            <>
              <div className='animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full'></div>
              Generando PDF...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generar PDF de Credenciales
            </>
          )}
        </button>
        
        {students.length === 0 && (
          <p className='text-sm text-gray-500 text-center'>
            No hay estudiantes registrados para generar credenciales
          </p>
        )}
      </div>
    </div>
  )
}
