'use client'
import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import QRCode from 'qrcode'

// No registrar fuentes externas para evitar errores de codificación
// React-PDF usará las fuentes por defecto que son más estables

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  credentialContainer: {
    width: 340, // 90mm en pts
    height: 227, // 60mm en pts
    marginBottom: 20,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#00FF66', // Verde brillante como en Canva
  },
  darkStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 25,
    height: '100%',
    backgroundColor: '#146233', // Verde oscuro como en Canva
  },
  credentialContent: {
    padding: 16,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  leftSection: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 20, // Espacio para la franja verde
    paddingRight: 12,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 12,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseCodeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#424141', // Gris oscuro como en Canva
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  semester: {
    fontSize: 12,
    color: '#424141',
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sectionLabel: {
    fontSize: 10,
    color: '#424141',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  sectionNumber: {
    fontSize: 10,
    color: '#424141',
    fontWeight: 'normal',
    textAlign: 'right',
  },
  studentNameContainer: {
    marginTop: 20,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#424141', // Gris oscuro como en Canva
    textTransform: 'uppercase',
    lineHeight: 1.3,
  },
  lightbulbContainer: {
    width: 35,
    height: 50,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightbulbText: {
    fontSize: 30,
    color: '#424141',
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
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
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        {({ blob, url, loading, error }) => {
          if (loading) return '🔄 Generando PDF...'
          if (error) return '❌ Error al generar PDF'
          return (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar Credenciales PDF Profesionales ({students.length} credenciales)
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

// Componente de credencial que ya tiene QR
const CredentialCardWithQR: React.FC<{ 
  student: StudentData & { qrCode: string }, 
  courseCode: string, 
  semester: string 
}> = ({ student, courseCode, semester }) => {
  return (
    <View style={styles.credentialContainer}>
      {/* Franja verde oscura lateral */}
      <View style={styles.darkStripe} />
      
      {/* Contenido de la credencial */}
      <View style={styles.credentialContent}>
        {/* Sección izquierda */}
        <View style={styles.leftSection}>
          {/* Header con código de curso y semestre */}
          <View style={styles.headerRow}>
            <View style={styles.courseCodeContainer}>
              <Text style={styles.courseCode}>{courseCode}</Text>
              <Text style={styles.semester}>{semester}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionLabel}>SECCIÓN</Text>
              <Text style={styles.sectionNumber}>8</Text>
            </View>
          </View>
          
          {/* Nombre del estudiante */}
          <View style={styles.studentNameContainer}>
            <Text style={styles.studentName}>
              {student.userInfo.firstName.toUpperCase()} {student.userInfo.lastName.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Sección derecha con icono y QR */}
        <View style={styles.rightSection}>
          {/* Icono de bombilla */}
          <View style={styles.lightbulbContainer}>
            <Text style={styles.lightbulbText}>💡</Text>
          </View>
          
          {/* Código QR */}
          <View style={styles.qrContainer}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={student.qrCode} style={styles.qrCode} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default CredentialsPDF
