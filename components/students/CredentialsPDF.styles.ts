import { StyleSheet } from '@react-pdf/renderer'

// Estilos para el PDF - Diseño simple y limpio con verde
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f8fffe',
    padding: 10, // Menos padding para más espacio
    fontFamily: 'Helvetica',
  },
  credentialContainer: {
    width: 380, // Más grande para ocupar toda la página
    height: 250, // Más alto también
    marginBottom: 10,
    marginRight: 10,
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
    width: 25, // Un poco más ancha para el nuevo tamaño
    height: '100%',
    backgroundColor: '#146233', // Franja decorativa con el color solicitado
  },
  credentialContent: {
    position: 'relative',
    padding: 20, // Más padding para el formato más grande
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    marginLeft: 25, // Espacio para la franja decorativa
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Alineado a la izquierda para más espacio
    alignItems: 'flex-start',
    marginBottom: 15, // Más margen para el formato más grande
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
    fontSize: 16, // Más grande para el nuevo formato
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
    gap: 15, // Más espacio entre elementos
  },
  studentInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  studentName: {
    fontSize: 14, // Reducido de 16 a 14
    fontWeight: 'bold',
    color: '#424141', // Color base para nombres
    letterSpacing: 0.3,
    lineHeight: 1.0, // Líneas más compactas para cuando se separen apellidos
    marginBottom: 2, // Menos margen entre líneas
    flexWrap: 'wrap',
    textTransform: 'uppercase', // Todas las letras en mayúsculas
  },
  studentLastName: {
    fontSize: 14, // Reducido de 16 a 14
    fontWeight: 'bold',
    color: '#2d5016', // Color ligeramente más oscuro/verdoso para apellidos
    letterSpacing: 0.3,
    lineHeight: 1.0,
    marginBottom: 2,
    marginTop: 4, // Espacio pequeño entre nombres y apellidos
    flexWrap: 'wrap',
    textTransform: 'uppercase', // Todas las letras en mayúsculas
  },
  studentEmail: {
    fontSize: 14, // Más grande
    color: '#424141', // Color de texto solicitado
    letterSpacing: 0.3,
    marginTop: 8, // Agregar margen superior para separar del nombre/apellido
  },
  qrSection: {
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: '#ffffff',
    padding: 15, // Más padding
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120, // Más grande
    height: 120, // Más grande
  },
  qrCode: {
    width: 90, // Más grande
    height: 90, // Más grande
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
    justifyContent: 'space-between', // Distribuir uniformemente
    gap: 5, // Menos gap para que quepan mejor
    height: '100%',
    width: '100%',
  },
  pagePortrait: {
    flexDirection: 'column',
    backgroundColor: '#f8fffe',
    padding: 40, // Más padding para formato de 1 por página
    fontFamily: 'Helvetica',
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  credentialContainerLarge: {
    width: 500, // Más grande para 1 por página
    height: 320, // Más alto para 1 por página
    marginBottom: 20,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#00ff66',
    border: '3px solid #146233',
  },
  decorativeStripeLarge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 35, // Más ancha para el formato grande
    height: '100%',
    backgroundColor: '#146233',
  },
  credentialContentLarge: {
    position: 'relative',
    padding: 30, // Más padding para el formato grande
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    marginLeft: 35, // Espacio para la franja decorativa
  },
  studentNameLarge: {
    fontSize: 20, // Más grande para formato de 1 por página
    fontWeight: 'bold',
    color: '#424141',
    letterSpacing: 0.3,
    lineHeight: 1.0,
    marginBottom: 3,
    flexWrap: 'wrap',
    textTransform: 'uppercase',
  },
  studentLastNameLarge: {
    fontSize: 20, // Más grande para formato de 1 por página
    fontWeight: 'bold',
    color: '#2d5016',
    letterSpacing: 0.3,
    lineHeight: 1.0,
    marginBottom: 3,
    marginTop: 6, // Más espacio entre nombres y apellidos
    flexWrap: 'wrap',
    textTransform: 'uppercase',
  },
  studentEmailLarge: {
    fontSize: 16, // Más grande para formato de 1 por página
    color: '#424141',
    letterSpacing: 0.3,
    marginTop: 12, // Más separación del nombre/apellido
  },
  qrContainerLarge: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140, // Más grande para formato de 1 por página
    height: 140,
  },
  qrCodeLarge: {
    width: 100, // Más grande para formato de 1 por página
    height: 100,
  },
  // Estilos para formato horizontal grande (1 credencial por página horizontal)
  // Escalando todas las dimensiones proporcionalmente para aprovechar el espacio horizontal
  credentialContainerLandscape: {
    width: 650, // Escalado desde 500 (factor 1.3x)
    height: 416, // Escalado desde 320 (factor 1.3x)
    marginBottom: 26, // Escalado desde 20 (factor 1.3x)
    marginRight: 26, // Escalado desde 20 (factor 1.3x)
    borderRadius: 16, // Escalado desde 12 (factor 1.3x)
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#00ff66',
    border: '4px solid #146233', // Escalado desde 3px (factor 1.3x)
  },
  decorativeStripeLandscape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 46, // Escalado desde 35 (factor 1.3x)
    height: '100%',
    backgroundColor: '#146233',
  },
  credentialContentLandscape: {
    position: 'relative',
    padding: 39, // Escalado desde 30 (factor 1.3x)
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    marginLeft: 46, // Escalado desde 35 (factor 1.3x)
  },
  studentInfoLandscape: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  headerSectionLandscape: {
    marginBottom: 20, // Escalado desde 15 (factor 1.3x)
    alignItems: 'flex-start',
    flexDirection: 'row', // Mantener el layout horizontal del header
    justifyContent: 'flex-start',
    width: '100%',
  },
  // Container específico para la info del curso en formato horizontal
  courseInfoLandscape: {
    flexDirection: 'column', // Columna para que el semestre vaya abajo del curso
    flex: 1,
    maxWidth: '100%',
  },
  // Estilos específicos para texto del curso en formato horizontal
  courseCodeLandscape: {
    fontSize: 21, // Escalado desde 16 (factor 1.3x)
    fontWeight: 'bold',
    color: '#424141',
    textTransform: 'uppercase',
    letterSpacing: 0.65, // Escalado desde 0.5
    flexWrap: 'wrap',
  },
  semesterLandscape: {
    fontSize: 21, // Escalado desde 16 (factor 1.3x)
    color: '#424141',
    textTransform: 'uppercase',
    marginTop: 3, // Escalado desde 2 (factor 1.5x para más separación)
    flexWrap: 'wrap',
  },
  // Estilos de texto escalados para formato horizontal
  studentNameLandscape: {
    fontSize: 26, // Escalado desde 20 (factor 1.3x)
    fontWeight: 'bold',
    color: '#424141',
    letterSpacing: 0.4, // Escalado desde 0.3
    lineHeight: 1.0,
    marginBottom: 4, // Escalado desde 3
    flexWrap: 'wrap',
    textTransform: 'uppercase',
  },
  studentLastNameLandscape: {
    fontSize: 26, // Escalado desde 20 (factor 1.3x)
    fontWeight: 'bold',
    color: '#2d5016',
    letterSpacing: 0.4, // Escalado desde 0.3
    lineHeight: 1.0,
    marginBottom: 4, // Escalado desde 3
    marginTop: 8, // Escalado desde 6
    flexWrap: 'wrap',
    textTransform: 'uppercase',
  },
  studentEmailLandscape: {
    fontSize: 21, // Escalado desde 16 (factor 1.3x)
    color: '#424141',
    letterSpacing: 0.4, // Escalado desde 0.3
    marginTop: 16, // Escalado desde 12
  },
  qrContainerLandscape: {
    backgroundColor: '#ffffff',
    padding: 26, // Escalado desde 20 (factor 1.3x)
    borderRadius: 10, // Escalado desde 8 (factor 1.3x)
    alignItems: 'center',
    justifyContent: 'center',
    width: 182, // Escalado desde 140 (factor 1.3x)
    height: 182, // Escalado desde 140 (factor 1.3x)
  },
  qrCodeLandscape: {
    width: 130, // Escalado desde 100 (factor 1.3x)
    height: 130, // Escalado desde 100 (factor 1.3x)
  },
})
