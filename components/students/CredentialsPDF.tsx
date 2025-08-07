'use client'
import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import QRCode from 'qrcode'

// No registrar fuentes externas para evitar errores de codificación
// React-PDF usará las fuentes por defecto que son más estables

// Estilos para el PDF - Diseño simple y limpio con verde
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f8fffe',
    padding: 15, // Menos padding para más espacio
    fontFamily: 'Helvetica',
  },
  credentialContainer: {
    width: 260, // Más pequeño para 4 por hoja
    height: 160, // Más compacto
    marginBottom: 15,
    marginRight: 15,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#00ff66', // Verde más intenso como solicitaste
    border: '2px solid #146233', // Borde más delgado
  },
  decorativeStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20, // Más estrecha para el nuevo tamaño
    height: '100%',
    backgroundColor: '#146233', // Franja decorativa con el color solicitado
  },
  credentialContent: {
    position: 'relative',
    padding: 15, // Menos padding para el formato más pequeño
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    marginLeft: 20, // Espacio para la franja decorativa
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Alineado a la izquierda para más espacio
    alignItems: 'flex-start',
    marginBottom: 10, // Menos margen
    width: '100%', // Usar todo el ancho disponible
  },
  courseInfo: {
    flexDirection: 'column',
    flex: 1, // Tomar todo el espacio disponible
    maxWidth: '100%', // Asegurar que use todo el ancho
  },
  sustainableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leafIcon: {
    fontSize: 20,
    color: '#ffffff',
    marginRight: 5,
  },
  courseCode: {
    fontSize: 11, // Más pequeño para el nuevo formato
    fontWeight: 'bold',
    color: '#424141', // Color de texto solicitado
    textTransform: 'uppercase',
    letterSpacing: 0.5, // Reducido para mejor ajuste
    flexWrap: 'wrap', // Permitir salto de línea si es necesario
  },
  semester: {
    fontSize: 16,
    color: '#424141', // Color de texto solicitado
    textTransform: 'uppercase',
    marginTop: 2,
    flexWrap: 'wrap', // Permitir salto de línea si es necesario
  },
  logoSection: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    color: '#ffffff',
  },
  logoSubtext: {
    fontSize: 12,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  studentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10, // Menos espacio entre elementos
  },
  studentInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  studentName: {
    fontSize: 12, // Más pequeño como solicitaste
    fontWeight: 'bold',
    color: '#424141', // Color de texto solicitado
    letterSpacing: 0.3,
    lineHeight: 1.1,
    marginBottom: 2, // Menos margen
    flexWrap: 'wrap',
  },
  studentEmail: {
    fontSize: 10, // Más pequeño
    color: '#424141', // Color de texto solicitado
    letterSpacing: 0.3,
  },
  qrSection: {
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: '#ffffff',
    padding: 8, // Menos padding
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80, // Más pequeño
    height: 80, // Más pequeño
  },
  qrCode: {
    width: 64, // Más pequeño
    height: 64, // Más pequeño
  },
  qrLabel: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  flexRow: {
    flexDirection: 'row', // Layout horizontal para 2x2
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
    height: '100%',
    width: '100%',
  },
})

interface StudentData {
  id: string
  userInfo: {
    firstName: string
    lastName: string
    email: string
  }
}

interface CredentialsPDFProps {
  students: StudentData[]
  courseCode?: string
  semester?: string
}

// Componente principal exportado
const CredentialsPDF: React.FC<CredentialsPDFProps> = ({ students, courseCode, semester }) => {
  const [studentsWithQR, setStudentsWithQR] = React.useState<(StudentData & { qrCode: string })[]>([])
  const [isGenerating, setIsGenerating] = React.useState(false)

  // Pre-generar todos los QR codes
  React.useEffect(() => {
    const generateAllQRs = async () => {
      setIsGenerating(true)
      try {
        const studentsWithQRCodes = await Promise.all(
          students.map(async (student) => {
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
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="200" fill="white" stroke="black"/>
                  <text x="100" y="100" text-anchor="middle" font-size="10" fill="black">${student.userInfo.email}</text>
                </svg>
              `)}`
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
  }, [students])

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
    <div className="w-full">
      <PDFDownloadLink
        document={<CredentialDocumentWithQR students={studentsWithQR} courseCode={courseCode || 'SUS1000'} semester={semester || '2025-1'} />}
        fileName={`credenciales_${courseCode || 'SUS1000'}_${semester || '2025-1'}.pdf`}
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
              🌿 Descargar Credenciales Verdes ({students.length} credenciales)
            </>
          )
        }}
      </PDFDownloadLink>
    </div>
  )
}

// Nuevo componente para documentos con QR pre-generados - 4 credenciales por página
const CredentialDocumentWithQR: React.FC<{
  students: (StudentData & { qrCode: string })[]
  courseCode: string
  semester: string
}> = ({ students, courseCode, semester }) => {
  // Dividir estudiantes en grupos de 4 por página
  const studentsPerPage = 4
  const pages = []
  
  for (let i = 0; i < students.length; i += studentsPerPage) {
    pages.push(students.slice(i, i + studentsPerPage))
  }

  return (
    <Document>
      {pages.map((pageStudents, pageIndex) => (
        <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.flexRow}>
            {pageStudents.map((student) => (
              <CredentialCardWithQR 
                key={student.id} 
                student={student} 
                courseCode={courseCode}
                semester={semester}
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
  semester: string 
}> = ({ student, courseCode, semester }) => {
  return (
    <View style={styles.credentialContainer}>
      {/* Franja decorativa con color #146233 */}
      <View style={styles.decorativeStripe} />
      
      {/* Contenido de la credencial */}
      <View style={styles.credentialContent}>
        {/* Header con código de curso */}
        <View style={styles.headerSection}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseCode}>{courseCode}</Text>
            <Text style={styles.semester}>{semester}</Text>
          </View>
        </View>
        
        {/* Sección principal con estudiante y QR */}
        <View style={styles.studentSection}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>
              {student.userInfo.firstName}
            </Text>
            <Text style={styles.studentName}>
              {student.userInfo.lastName}
            </Text>
            <Text style={styles.studentEmail}>
              {student.userInfo.email}
            </Text>
          </View>
          
          <View style={styles.qrSection}>
            <View style={styles.qrContainer}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={student.qrCode} style={styles.qrCode} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CredentialsPDF
