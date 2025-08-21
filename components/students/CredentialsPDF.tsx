'use client'
import React from 'react'
import { isProfessor } from '@/utils/isProfessor'
import { Document, Page, Text, View, PDFDownloadLink, Image } from '@react-pdf/renderer'
import QRCode from 'qrcode'
import { styles } from './CredentialsPDF.styles'

// No registrar fuentes externas para evitar errores de codificación
// React-PDF usará las fuentes por defecto que son más estables

interface StudentData {
  id: string
  userInfoId: string
  userInfo: {
    firstName: string
    lastName: string
    email: string
  }
}

interface CredentialsPDFProps {
  students: StudentData[]
  courseCode?: string
  courseId?: string
  semester?: string
}

// Componente principal exportado
const CredentialsPDF: React.FC<CredentialsPDFProps> = ({ students, courseCode, courseId, semester }) => {
  const [studentsWithQR, setStudentsWithQR] = React.useState<(StudentData & { qrCode: string })[]>([])
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [credentialsPerPage, setCredentialsPerPage] = React.useState<1 | 4>(4) // Estado para controlar cuántas por página
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait') // Estado para orientación
  const [includeTeachers, setIncludeTeachers] = React.useState(false) // Toggle para incluir profesores

  // Pre-generar todos los QR codes
  React.useEffect(() => {
    const generateAllQRs = async () => {
      setIsGenerating(true)
      try {
        let filtered = students
  console.log({courseId})
  if (!includeTeachers && courseId) {
          // Filtrar profesores usando la utilidad isProfessor
          const checks = await Promise.all(
            students.map(async s => {
              console.log({ userInfoId: s.userInfoId, courseId })
              const isProf = await isProfessor({ userInfoId: s.userInfoId, courseId })
              return !isProf
            })
          )
          filtered = students.filter((_, idx) => checks[idx])
        }
        const studentsWithQRCodes = await Promise.all(
          filtered.map(async (student) => {
            try {
              const qrCode = await QRCode.toDataURL(student.userInfo.email, {
                width: 200,
                margin: 1,
                errorCorrectionLevel: 'M',
                color: {
                  dark: '#146233', // Usando el color solicitado para el QR
                  light: '#FFFFFF'
                }
              })
              return { ...student, qrCode }
            } catch (error) {
              console.error('Error generating QR for', student.userInfo.email, error)
              // QR de fallback
              const fallbackQR = `data:image/svg+xml;base64,${btoa(`
                <svg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <rect width=\"200\" height=\"200\" fill=\"white\" stroke=\"black\"/>\n                  <text x=\"100\" y=\"100\" text-anchor=\"middle\" font-size=\"10\" fill=\"black\">${student.userInfo.email}</text>\n                </svg>\n              `)}`
              return { ...student, qrCode: fallbackQR }
            }
          })
        )
        setStudentsWithQR(studentsWithQRCodes)
      } catch (error) {
        console.error('Error generating QR codes:', error)
      } finally {
        setIsGenerating(false)
      }
    }

    if (students.length > 0) {
      generateAllQRs()
    }
  }, [students, includeTeachers, courseCode])

  if (students.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No hay estudiantes para generar credenciales
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
          <span className="text-gray-600">Generando códigos QR...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Controles de formato */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm transition-colors duration-300">
        {/* Selector de credenciales por página */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg border border-gray-200 p-2 dark:bg-neutral-900 dark:border-neutral-700 transition-colors">
          <label htmlFor="format-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Formato:
          </label>
          <select
            id="format-select"
            value={credentialsPerPage}
            onChange={(e) => setCredentialsPerPage(Number(e.target.value) as 1 | 4)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-100 dark:border-neutral-700 transition-colors"
          >
            <option value={4}>4 credenciales por página</option>
            <option value={1}>1 credencial por página</option>
          </select>
        </div>

        {/* Toggle de orientación (solo para 1 credencial por página) */}
        {credentialsPerPage === 1 && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Orientación:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOrientation('portrait')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  orientation === 'portrait'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📄 Vertical
              </button>
              <button
                onClick={() => setOrientation('landscape')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  orientation === 'landscape'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📋 Horizontal
              </button>
            </div>
          </div>
        )}

        {/* Toggle para incluir profesores */}
        <div className="flex items-center gap-3">
          <label htmlFor="toggle-teachers" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Incluir profesores:
          </label>
          <button
            id="toggle-teachers"
            type="button"
            onClick={() => setIncludeTeachers(v => !v)}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${includeTeachers ? 'bg-green-600' : 'bg-gray-300'}`}
            aria-pressed={includeTeachers}
          >
            <span
              className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${includeTeachers ? 'translate-x-4' : 'translate-x-0'}`}
            />
          </button>
        </div>
      </div>

      {/* Botón de descarga */}
      <PDFDownloadLink
        document={<CredentialDocumentWithQR students={studentsWithQR} courseCode={courseCode || 'SUS1000'} semester={semester || '2025-1'} credentialsPerPage={credentialsPerPage} orientation={orientation} />}
        fileName={`credenciales_${courseCode || 'SUS1000'}_${semester || '2025-1'}_${credentialsPerPage}pp_${credentialsPerPage === 1 ? orientation : 'landscape'}.pdf`}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        {({ blob, url, loading, error }) => {
          if (loading) return '� Generando credenciales verdes...'
          if (error) return '❌ Error al generar PDF'
          return (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              🌿 Descargar Credenciales ({students.length} credenciales - {credentialsPerPage}/página{credentialsPerPage === 1 ? ` ${orientation === 'portrait' ? 'vertical' : 'horizontal'}` : ''})
            </>
          )
        }}
      </PDFDownloadLink>
    </div>
  )
}

// Nuevo componente para documentos con QR pre-generados - credenciales configurables por página
const CredentialDocumentWithQR: React.FC<{
  students: (StudentData & { qrCode: string })[]
  courseCode: string
  semester: string
  credentialsPerPage: 1 | 4
  orientation: 'portrait' | 'landscape'
}> = ({ students, courseCode, semester, credentialsPerPage, orientation }) => {
  // Dividir estudiantes en grupos según la configuración
  const studentsPerPage = credentialsPerPage
  const pages = []
  
  for (let i = 0; i < students.length; i += studentsPerPage) {
    pages.push(students.slice(i, i + studentsPerPage))
  }

  // Determinar orientación final: 4 por página siempre landscape, 1 por página según selección
  const finalOrientation = credentialsPerPage === 4 ? 'landscape' : orientation

  return (
    <Document>
      {pages.map((pageStudents, pageIndex) => (
        <Page 
          key={pageIndex} 
          size="A4" 
          orientation={finalOrientation} 
          style={finalOrientation === 'landscape' ? styles.page : styles.pagePortrait}
        >
          <View style={credentialsPerPage === 4 ? styles.flexRow : styles.flexColumn}>
            {pageStudents.map((student) => (
              <CredentialCardWithQR 
                key={student.id} 
                student={student} 
                courseCode={courseCode}
                semester={semester}
                isLargeFormat={credentialsPerPage === 1}
                orientation={finalOrientation}
              />
            ))}
          </View>
        </Page>
      ))}
    </Document>
  )
}

// Componente de credencial simple y limpio
const CredentialCardWithQR: React.FC<{ 
  student: StudentData & { qrCode: string }, 
  courseCode: string, 
  semester: string,
  isLargeFormat?: boolean,
  orientation?: 'portrait' | 'landscape'
}> = ({ student, courseCode, semester, isLargeFormat = false, orientation = 'portrait' }) => {
  // Separar nombres si son muy largos
  const firstName = student.userInfo.firstName
  const firstNameParts = firstName.split(' ')
  const shouldSeparateFirstNames = firstName.length > 15 && firstNameParts.length > 1
  
  // Separar apellidos si son muy largos
    const lastName = student.userInfo.lastName
    const lastNameParts = lastName.split(' ')
    let lastNameLines: string[] = []
    let shouldSeparateLastNames = lastName.length > 15 && lastNameParts.length > 1
    // Caso especial: si hay 3 partes y es largo, unir las dos primeras
    if (shouldSeparateLastNames && lastNameParts.length === 3) {
      lastNameLines = [lastNameParts.slice(0, 2).join(' '), lastNameParts[2]]
    } else if (shouldSeparateLastNames) {
      lastNameLines = [lastNameParts[0], lastNameParts.slice(1).join(' ')]
    }
  
  // Determinar qué estilos usar según formato y orientación
  const getContainerStyle = () => {
    if (!isLargeFormat) return styles.credentialContainer
    return orientation === 'landscape' ? styles.credentialContainerLandscape : styles.credentialContainerLarge
  }

  const getDecorativeStripeStyle = () => {
    if (!isLargeFormat) return styles.decorativeStripe
    return orientation === 'landscape' ? styles.decorativeStripeLandscape : styles.decorativeStripeLarge
  }

  const getContentStyle = () => {
    if (!isLargeFormat) return styles.credentialContent
    return orientation === 'landscape' ? styles.credentialContentLandscape : styles.credentialContentLarge
  }

  const getStudentInfoStyle = () => {
    if (!isLargeFormat) return styles.studentInfo
    return orientation === 'landscape' ? styles.studentInfoLandscape : styles.studentInfo
  }

  const getHeaderSectionStyle = () => {
    if (!isLargeFormat) return styles.headerSection
    return orientation === 'landscape' ? styles.headerSectionLandscape : styles.headerSection
  }

  const getNameStyle = () => {
    if (!isLargeFormat) return styles.studentName
    return orientation === 'landscape' ? styles.studentNameLandscape : styles.studentNameLarge
  }

  const getLastNameStyle = () => {
    if (!isLargeFormat) return styles.studentLastName
    return orientation === 'landscape' ? styles.studentLastNameLandscape : styles.studentLastNameLarge
  }

  const getEmailStyle = () => {
    if (!isLargeFormat) return styles.studentEmail
    return orientation === 'landscape' ? styles.studentEmailLandscape : styles.studentEmailLarge
  }

  const getQRContainerStyle = () => {
    if (!isLargeFormat) return styles.qrContainer
    return orientation === 'landscape' ? styles.qrContainerLandscape : styles.qrContainerLarge
  }

  const getQRCodeStyle = () => {
    if (!isLargeFormat) return styles.qrCode
    return orientation === 'landscape' ? styles.qrCodeLandscape : styles.qrCodeLarge
  }

  const getCourseCodeStyle = () => {
    if (!isLargeFormat) return styles.courseCode
    return orientation === 'landscape' ? styles.courseCodeLandscape : styles.courseCode
  }

  const getSemesterStyle = () => {
    if (!isLargeFormat) return styles.semester
    return orientation === 'landscape' ? styles.semesterLandscape : styles.semester
  }

  const getCourseInfoStyle = () => {
    if (!isLargeFormat) return styles.courseInfo
    return orientation === 'landscape' ? styles.courseInfoLandscape : styles.courseInfo
  }

  return (
    <View style={getContainerStyle()}>
      {/* Franja decorativa con color #146233 */}
      <View style={getDecorativeStripeStyle()} />
      
      {/* Contenido de la credencial */}
      <View style={getContentStyle()}>
        {/* Header con código de curso */}
        <View style={getHeaderSectionStyle()}>
          <View style={getCourseInfoStyle()}>
            <Text style={getCourseCodeStyle()}>{courseCode}</Text>
            <Text style={getSemesterStyle()}>{semester}</Text>
          </View>
        </View>
        
        {/* Sección principal con estudiante y QR */}
        <View style={styles.studentSection}>
          <View style={getStudentInfoStyle()}>
            {shouldSeparateFirstNames ? (
              <>
                <Text style={getNameStyle()}>
                  {firstNameParts[0]}
                </Text>
                <Text style={getNameStyle()}>
                  {firstNameParts.slice(1).join(' ')}
                </Text>
              </>
            ) : (
              <Text style={getNameStyle()}>
                {firstName}
              </Text>
            )}
            {shouldSeparateLastNames ? (
              <>
                {lastNameLines.map((line, idx) => (
                  <Text style={getLastNameStyle()} key={idx}>{line}</Text>
                ))}
              </>
            ) : (
              <Text style={getLastNameStyle()}>
                {lastName}
              </Text>
            )}
            <Text style={getEmailStyle()}>
              {student.userInfo.email}
            </Text>
          </View>
          
          <View style={styles.qrSection}>
            <View style={getQRContainerStyle()}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={student.qrCode} style={getQRCodeStyle()} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CredentialsPDF
