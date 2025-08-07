'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useState, useRef } from 'react'
import { useToast } from '@/components/ui/use-toast'
import * as ExcelJS from 'exceljs'
import { useParams } from 'next/navigation'

export default function UploadStudentsForm() {
  const [csv, setCsv] = useState('')
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    group: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [excelLoading, setExcelLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const params = useParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      // Parsear el CSV para guardar las contraseñas en localStorage
      const csvLines = csv.trim().split('\n')
      csvLines.forEach(line => {
        const [lastName, firstName, password, email, group] = line.split(';')
        if (email && password) {
          localStorage.setItem(`student_password_${email}`, password)
        }
      })

      const res = await fetch('/api/save-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          csv,
          courseAbbreviation: params.abbreviature,
          courseSemester: params.semester
        })
      })

      if (!res.ok) throw new Error('Fallo la carga')

      toast({
        title: 'Éxito',
        description: 'Estudiantes cargados correctamente',
        variant: 'success'
      })
      setCsv('')
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error al guardar estudiantes',
        variant: 'destructive'
      })
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { lastName, firstName, email, group, password } = form
    
    // Guardar la contraseña en localStorage para el PDF
    if (email && password) {
      localStorage.setItem(`student_password_${email}`, password)
    }
    
    const singleCsv = `${lastName};${firstName};${password};${email};${group}`
    try {
      const res = await fetch('/api/save-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          csv: singleCsv,
          courseAbbreviation: params.abbreviature,
          courseSemester: params.semester
        })
      })
      if (!res.ok) throw new Error('Fallo al agregar estudiante')
      toast({
        title: 'Éxito',
        description: 'Estudiante agregado correctamente',
        variant: 'success'
      })
      setForm({ lastName: '', firstName: '', email: '', group: '', password: '' })
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error al agregar estudiante',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleExcelUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Verificar tipo de archivo
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv por si acaso
    ]
    
    const allowedExtensions = ['.xlsx', '.xls', '.csv']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona un archivo Excel válido (.xlsx o .xls)',
        variant: 'destructive'
      })
      return
    }

    console.log('Archivo seleccionado:', {
      name: file.name,
      type: file.type,
      size: file.size,
      extension: fileExtension
    })

    setExcelLoading(true)
    try {
      const workbook = new ExcelJS.Workbook()
      const arrayBuffer = await file.arrayBuffer()
      
      console.log('Intentando cargar archivo Excel...')
      console.log('Tamaño del archivo:', arrayBuffer.byteLength, 'bytes')
      
      // Verificar que el archivo no esté vacío
      if (arrayBuffer.byteLength === 0) {
        throw new Error('El archivo está vacío')
      }
      
      await workbook.xlsx.load(arrayBuffer)
      
      console.log('Workbook cargado exitosamente')
      console.log('Número de hojas:', workbook.worksheets.length)
      console.log('Nombres de hojas:', workbook.worksheets.map(ws => ws.name))
      
      // Intentar obtener la primera hoja disponible
      let worksheet = workbook.getWorksheet(1)
      
      // Si no funciona con índice, intentar por nombre o cualquier hoja disponible
      if (!worksheet && workbook.worksheets.length > 0) {
        worksheet = workbook.worksheets[0]
      }
      
      if (!worksheet) {
        throw new Error('No se pudo acceder a ninguna hoja de trabajo en el archivo Excel')
      }
      
      console.log(`Usando hoja: "${worksheet.name}" con ${worksheet.rowCount} filas`)
      
      // Verificar que la hoja tenga contenido
      if (worksheet.rowCount === 0) {
        throw new Error('La hoja de Excel está vacía')
      }

      const students: string[] = []
      let headerRowNumber = 0
      let dataStartRow = 0

      // Buscar la fila que contiene los headers "N°", "Rut", "Apellido Paterno", etc.
      worksheet.eachRow((row, rowNumber) => {
        const values = row.values as any[]
        if (values && values.length > 0) {
          // Convertir todos los valores a string y revisar el contenido
          const cellTexts = values.map(val => val?.toString().toLowerCase().trim() || '')
          
          // Buscar la fila que contiene los headers específicos
          if (cellTexts.some(text => text.includes('apellido paterno')) || 
              cellTexts.some(text => text.includes('apellido') && text.includes('paterno')) ||
              (cellTexts.some(text => text.includes('rut')) && 
               cellTexts.some(text => text.includes('nombres')) && 
               cellTexts.some(text => text.includes('correo')))) {
            headerRowNumber = rowNumber
            dataStartRow = rowNumber + 1
            console.log(`Headers encontrados en fila ${rowNumber}:`, cellTexts)
            return false // Salir del loop
          }
        }
      })

      // Si no encontramos headers específicos, buscar por patrón de contenido
      if (headerRowNumber === 0) {
        console.log('Buscando headers por patrón alternativo...')
        worksheet.eachRow((row, rowNumber) => {
          const values = row.values as any[]
          if (values && values.length >= 7) { // Al menos 7 columnas esperadas
            const cellTexts = values.map(val => val?.toString().trim() || '')
            // Buscar una fila que tenga al menos N°, algo parecido a RUT, apellidos, nombres, correo
            if ((cellTexts[0]?.toLowerCase().includes('n°') || cellTexts[0]?.toLowerCase().includes('no')) &&
                (cellTexts[1]?.toLowerCase().includes('rut')) &&
                (cellTexts[6]?.toLowerCase().includes('correo') || cellTexts[6]?.toLowerCase().includes('email'))) {
              headerRowNumber = rowNumber
              dataStartRow = rowNumber + 1
              console.log(`Headers alternativos encontrados en fila ${rowNumber}:`, cellTexts)
              return false
            }
          }
        })
      }

      if (headerRowNumber === 0) {
        throw new Error(`No se encontraron los headers esperados. 
        Verifica que tu archivo Excel contenga una fila con las columnas:
        N° | Rut | Apellido Paterno | Apellido Materno | Nombres | Cod. Curriculum | Correo`)
      }

      console.log(`Procesando datos desde la fila ${dataStartRow}...`)

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber < dataStartRow) return // Saltar headers y filas anteriores

        const values = row.values as any[]
        if (!values || values.length < 7) return // Necesitamos al menos 7 columnas
        
        // Mapear según tu estructura: N°, Rut, Apellido Paterno, Apellido Materno, Nombres, Cod. Curriculum, Correo
        // Los índices pueden empezar desde 1 debido a como ExcelJS maneja las columnas
        const numero = values[1]?.toString().trim() || ''
        const rut = values[2]?.toString().trim() || ''
        const apellidoPaterno = values[3]?.toString().trim() || ''
        const apellidoMaterno = values[4]?.toString().trim() || ''
        const nombres = values[5]?.toString().trim() || ''
        const codCurriculum = values[6]?.toString().trim() || ''
        const correo = values[7]?.toString().trim() || ''
        
        console.log(`Fila ${rowNumber}:`, { numero, rut, apellidoPaterno, apellidoMaterno, nombres, correo })
        
        // Validaciones básicas - requerimos al menos apellido paterno, nombres y correo
        if (!apellidoPaterno || !nombres || !correo) {
          console.warn(`Fila ${rowNumber} omitida: faltan datos obligatorios (apellidoPaterno: "${apellidoPaterno}", nombres: "${nombres}", correo: "${correo}")`)
          return
        }

        // Verificar que el correo tenga formato válido básico
        if (!correo.includes('@') || !correo.includes('.')) {
          console.warn(`Fila ${rowNumber} omitida: correo inválido "${correo}"`)
          return
        }

        // Combinar apellidos
        const apellidos = `${apellidoPaterno} ${apellidoMaterno}`.trim()
        
        // Generar contraseña simple basada en el primer nombre y año
        const primerNombre = nombres.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')
        const password = `${primerNombre}${new Date().getFullYear()}`
        
        // Usar el código de curriculum como grupo, o '1' por defecto
        const group = codCurriculum || '1'
        
        // Formato: APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO
        students.push(`${apellidos};${nombres};${password};${correo};${group}`)
        
        console.log(`✓ Estudiante procesado: ${apellidos}, ${nombres} - ${correo}`)
      })

      if (students.length === 0) {
        throw new Error(`No se encontraron estudiantes válidos en el archivo. 
        
Detalles de depuración:
• Headers encontrados en fila: ${headerRowNumber}
• Datos procesados desde fila: ${dataStartRow}
• Total de filas en el archivo: ${worksheet.rowCount}

Verifica que:
• El archivo tenga la estructura: N° | Rut | Apellido Paterno | Apellido Materno | Nombres | Cod. Curriculum | Correo
• Los campos Apellido Paterno, Nombres y Correo no estén vacíos
• El correo tenga formato válido (contiene @ y .)
• Hay datos después de la fila de headers`)
      }

      console.log(`Total de estudiantes procesados: ${students.length}`)

      const csvData = students.join('\n')
      
      // Guardar las contraseñas en localStorage para el PDF
      students.forEach(studentLine => {
        const [apellidos, nombres, password, correo, grupo] = studentLine.split(';')
        if (correo && password) {
          localStorage.setItem(`student_password_${correo}`, password)
        }
      })
      
      const res = await fetch('/api/save-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          csv: csvData,
          courseAbbreviation: params.abbreviature,
          courseSemester: params.semester
        })
      })

      if (!res.ok) throw new Error('Error al procesar el archivo')

      toast({
        title: 'Éxito',
        description: `${students.length} estudiantes cargados correctamente desde Excel`,
        variant: 'success'
      })
      
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
      setTimeout(() => window.location.reload(), 1200)
    } catch (error: any) {
      console.error('Error detallado:', error)
      let errorMessage = 'Error al procesar el archivo Excel'
      
      if (error.message?.includes('Zip')) {
        errorMessage = 'El archivo parece estar corrupto o no es un Excel válido. Intenta guardarlo nuevamente desde Excel.'
      } else if (error.message?.includes('hoja de trabajo') || error.message?.includes('worksheet')) {
        errorMessage = `No se pudo acceder a las hojas del archivo Excel. 
        
Posibles soluciones:
• El archivo puede estar protegido con contraseña - remuévela
• Abre el archivo en Excel y guárdalo como "Libro de Excel (.xlsx)" sin protección
• Verifica que el archivo no esté dañado
• Intenta con un archivo Excel más simple para probar`
      } else if (error.message?.includes('headers')) {
        errorMessage = error.message
      } else if (error.message?.includes('estudiantes válidos')) {
        errorMessage = error.message
      } else {
        errorMessage = `Error inesperado: ${error.message}`
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
    } finally {
      setExcelLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-8 max-w-4xl mx-auto'>
      {/* Formulario individual mejorado */}
      <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2'>
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Agregar Estudiante Individual
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
            Registra un estudiante nuevo con sus datos completos
          </p>
        </div>
        
        <form onSubmit={handleFormSubmit} className='p-6 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              name='lastName'
              label='Apellidos'
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              required
              className='transition-all duration-200 focus:ring-2 focus:ring-blue-500'
            />
            <Input
              name='firstName'
              label='Nombres'
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              required
              className='transition-all duration-200 focus:ring-2 focus:ring-blue-500'
            />
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              name='email'
              label='Correo Electrónico'
              type='email'
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              className='transition-all duration-200 focus:ring-2 focus:ring-blue-500'
            />
            <Input
              name='group'
              label='Grupo'
              value={form.group}
              onChange={e => setForm(f => ({ ...f, group: e.target.value }))}
              required
              className='transition-all duration-200 focus:ring-2 focus:ring-blue-500'
            />
          </div>
          
          <Input
            name='password'
            label='Contraseña'
            type='text'
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
            className='transition-all duration-200 focus:ring-2 focus:ring-blue-500'
          />
          
          <MainButton
            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200'
            type='submit'
            pendingText='Agregando estudiante...'
            disabled={loading}
          >
            {loading ? 'Agregando...' : 'Agregar Estudiante'}
          </MainButton>
        </form>
      </div>

      {/* Importar desde Excel mejorado */}
      <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden'>
        <div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2'>
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Importar desde Excel
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
            Carga múltiples estudiantes desde un archivo Excel
          </p>
        </div>
        
        <div className='p-6 space-y-6'>
          <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
            <h4 className='font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Formato Requerido
            </h4>
            <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md p-3 font-mono text-sm mb-3'>
              <div className='text-gray-700 dark:text-gray-300 font-semibold mb-1'>Headers (Primera fila):</div>
              <div className='text-blue-600 dark:text-blue-400'>Apellido Paterno | Apellido Materno | Nombres | Correo</div>
            </div>
            <ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1'>
              <li className='flex items-center gap-2'>
                <span className='w-1.5 h-1.5 bg-blue-500 rounded-full'></span>
                Los apellidos se combinarán automáticamente
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-1.5 h-1.5 bg-blue-500 rounded-full'></span>
                Contraseñas generadas automáticamente
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-1.5 h-1.5 bg-blue-500 rounded-full'></span>
                Grupo asignado automáticamente como &quot;1&quot;
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-1.5 h-1.5 bg-red-500 rounded-full'></span>
                <strong>El archivo NO debe estar protegido con contraseña</strong>
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-1.5 h-1.5 bg-red-500 rounded-full'></span>
                <strong>Guarda como .xlsx desde Excel si hay problemas</strong>
              </li>
            </ul>
          </div>
          
          <div className='space-y-4'>
            <label className='block'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block'>
                Seleccionar archivo Excel
              </span>
              <div className='relative'>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='.xlsx,.xls'
                  onChange={handleExcelUpload}
                  disabled={excelLoading}
                  className='block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-3 file:px-6
                    file:rounded-lg file:border-0
                    file:text-sm file:font-medium
                    file:bg-gradient-to-r file:from-green-600 file:to-emerald-600
                    file:text-white file:shadow-md
                    hover:file:from-green-700 hover:file:to-emerald-700
                    file:transition-all file:duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    border border-gray-300 dark:border-gray-600 rounded-lg
                    bg-gray-50 dark:bg-gray-800 p-3'
                />
              </div>
            </label>
            
            {excelLoading && (
              <div className='flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg'>
                <div className='animate-spin w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full'></div>
                <span className='text-amber-800 dark:text-amber-200 font-medium'>
                  Procesando archivo Excel...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Importar desde CSV mejorado */}
      <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden'>
        <div className='bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2'>
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Importar desde CSV
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
            Para usuarios avanzados que prefieren formato CSV manual
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          <div className='bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4'>
            <h4 className='font-medium text-purple-900 dark:text-purple-100 mb-2'>Formato CSV:</h4>
            <code className='block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md p-3 text-sm text-purple-600 dark:text-purple-400'>
              APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO
            </code>
          </div>
          
          <Input
            type='textarea'
            name='csv'
            label='Datos CSV'
            placeholder='Pérez González;Juan Carlos;juan2025;juan.perez@email.com;1&#10;García López;María Elena;maria2025;maria.garcia@email.com;2'
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            required
            className='min-h-32 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500'
          />
          
          <MainButton
            className='w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200'
            type='submit'
            pendingText='Guardando estudiantes...'
          >
            Importar desde CSV
          </MainButton>
        </form>
      </div>
    </div>
  )
}
