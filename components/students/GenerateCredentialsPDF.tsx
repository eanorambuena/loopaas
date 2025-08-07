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
      
      // Configuración de la credencial - tamaño más grande para mejor diseño
      const cardWidth = 90 // mm
      const cardHeight = 60 // mm 
      const cardsPerRow = 2
      const cardsPerColumn = 3
      const marginX = (pageWidth - (cardsPerRow * cardWidth)) / (cardsPerRow + 1)
      const marginY = 15
      const spacing = 15
      
      let cardIndex = 0
      
      for (const student of students) {
        // Calcular posición de la tarjeta
        const row = Math.floor(cardIndex / cardsPerRow)
        const col = cardIndex % cardsPerRow
        
        // Si necesitamos una nueva página
        if (cardIndex > 0 && cardIndex % (cardsPerRow * cardsPerColumn) === 0) {
          doc.addPage()
          cardIndex = 0
        }
        
        const x = marginX + col * (cardWidth + marginX)
        const y = marginY + row * (cardHeight + spacing)
        
        // Fondo principal - Degradado verde (simulado con múltiples rectángulos)
        const greenDark = [34, 139, 34]   // Verde oscuro
        const greenLight = [50, 205, 50]  // Verde claro
        const greenBright = [0, 255, 127] // Verde brillante
        
        // Crear efecto degradado con múltiples rectángulos
        for (let i = 0; i < cardWidth; i += 2) {
          const ratio = i / cardWidth
          const r = Math.round(greenDark[0] + (greenBright[0] - greenDark[0]) * ratio)
          const g = Math.round(greenDark[1] + (greenBright[1] - greenDark[1]) * ratio)
          const b = Math.round(greenDark[2] + (greenBright[2] - greenDark[2]) * ratio)
          
          doc.setFillColor(r, g, b)
          doc.rect(x + i, y, 2, cardHeight, 'F')
        }
        
        // Borde sutil
        doc.setDrawColor(0, 100, 0)
        doc.setLineWidth(0.3)
        doc.rect(x, y, cardWidth, cardHeight)
        
        // Franja superior izquierda verde oscuro
        doc.setFillColor(25, 100, 25)
        doc.rect(x, y, 25, cardHeight, 'F')
        
        // Ícono de bombilla con planta (simulado con texto)
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.text('💡', x + 12.5, y + 20, { align: 'center' })
        
        // Pequeña planta debajo de la bombilla
        doc.setFontSize(12)
        doc.text('🌱', x + 12.5, y + 30, { align: 'center' })
        
        // Información del curso - parte superior derecha
        doc.setTextColor(255, 255, 255)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        
        const courseCode = String(courseTitle).substring(0, 8).toUpperCase()
        doc.text(courseCode, x + 30, y + 8)
        
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text('SECCIÓN', x + 30, y + 14)
        
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text(String(courseSemester), x + 30, y + 20)
        
        // Nombre del estudiante - grande y prominente
        const fullName = `${String(student.userInfo.firstName || '')} ${String(student.userInfo.lastName || '')}`
        
        doc.setTextColor(40, 40, 40)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(14)
        
        // Dividir el nombre si es muy largo
        const maxNameWidth = 45
        const nameLines = doc.splitTextToSize(fullName.toUpperCase(), maxNameWidth)
        
        let nameY = y + 35
        nameLines.forEach((line: string, index: number) => {
          doc.text(line, x + 30, nameY + (index * 6))
        })
        
        // Email con estilo más sutil
        const email = String(student.userInfo.email || 'No especificado')
        doc.setTextColor(80, 80, 80)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        
        // Truncar email si es muy largo
        const maxEmailLength = 25
        const displayEmail = email.length > maxEmailLength 
          ? email.substring(0, maxEmailLength) + '...' 
          : email
        
        doc.text(displayEmail, x + 30, y + nameY + (nameLines.length * 6) + 3)
        
        // Generar QR Code con el email - lado derecho
        try {
          const qrDataURL = await QRCode.toDataURL(email, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            },
            width: 300 // Alta resolución
          })
          
          // QR más grande y mejor posicionado
          const qrSize = 20 // mm
          const qrX = x + cardWidth - qrSize - 5
          const qrY = y + cardHeight - qrSize - 5
          
          // Fondo blanco para el QR
          doc.setFillColor(255, 255, 255)
          doc.rect(qrX - 1, qrY - 1, qrSize + 2, qrSize + 2, 'F')
          
          // Agregar el QR al PDF
          doc.addImage(qrDataURL, 'PNG', qrX, qrY, qrSize, qrSize)
          
        } catch (qrError) {
          console.error('Error generando QR code:', qrError)
          // Si falla el QR, mostrar rectángulo con texto
          doc.setFillColor(255, 255, 255)
          doc.rect(x + cardWidth - 25, y + cardHeight - 25, 20, 20, 'F')
          doc.setTextColor(200, 0, 0)
          doc.setFontSize(6)
          doc.text('QR Error', x + cardWidth - 15, y + cardHeight - 15, { align: 'center' })
        }
        
        // Línea de corte punteada
        doc.setDrawColor(150, 150, 150)
        doc.setLineDashPattern([1, 1], 0)
        doc.setLineWidth(0.2)
        doc.line(x, y + cardHeight + 2, x + cardWidth, y + cardHeight + 2)
        doc.setLineDashPattern([], 0)
        
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
      <div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600'>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2'>
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Generar Credenciales PDF
        </h3>
        <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
          Crear credenciales profesionales con diseño moderno y código QR
        </p>
      </div>
      
      <div className='p-6 space-y-4'>
        <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4'>
          <h4 className='font-medium text-green-900 dark:text-green-100 mb-3 flex items-center gap-2'>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Diseño Profesional
          </h4>
          <ul className='text-sm text-green-800 dark:text-green-200 space-y-1'>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
              Diseño moderno con fondo verde degradado profesional
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
              Tipografía jerarquizada con nombre del estudiante prominente
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
              Código QR de alta resolución para escaneado fácil
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
              {students.length} credenciales profesionales incluidas
            </li>
          </ul>
        </div>
        
        <button
          onClick={generatePDF}
          disabled={isGenerating || students.length === 0}
          className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2'
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
