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
    padding: 20,
    fontFamily: 'Helvetica',
  },
  credentialContainer: {
    width: 420, // Más ancho para evitar cortes de texto
    height: 240,
    marginBottom: 25,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#16a34a', // Verde más bonito (green-600)
    border: '3px solid #15803d', // Borde verde más oscuro (green-700)
  },
  credentialContent: {
    position: 'relative',
    padding: 25,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Alineado a la izquierda para más espacio
    alignItems: 'flex-start',
    marginBottom: 20,
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
    fontSize: 18, // Reducido para nombres completos de curso
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5, // Reducido para mejor ajuste
    flexWrap: 'wrap', // Permitir salto de línea si es necesario
  },
  semester: {
    fontSize: 16,
    color: '#ffffff',
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  studentInfo: {
    flex: 1,
    paddingRight: 25, // Más espacio entre texto y QR
    maxWidth: 240, // Límite para evitar que se estire demasiado
  },
  studentName: {
    fontSize: 16, // Reducido de 20px a 16px
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    lineHeight: 1.1,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  studentEmail: {
    fontSize: 16,
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  qrSection: {
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  qrCode: {
    width: 110,
    height: 110,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 25,
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
                  dark: '#000000',
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

// Nuevo componente para documentos con QR pre-generados
const CredentialDocumentWithQR: React.FC<{
  students: (StudentData & { qrCode: string })[]
  courseCode: string
  semester: string
}> = ({ students, courseCode, semester }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.flexRow}>
          {students.map((student) => (
            <CredentialCardWithQR 
              key={student.id} 
              student={student} 
              courseCode={courseCode}
              semester={semester}
            />
          ))}
        </View>
      </Page>
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
