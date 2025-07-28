import React from 'react'

export const id = 'compact-notes'
export const permissions = ['readNotes']
export const metadata = {
  preferredWidth: 'small', // small, medium, large, extra-large
  name: 'Notas Rápidas',
  description: 'Plugin compacto para notas y recordatorios'
}

// Componente compacto para notas
const CompactNotesComponent = (props: any) => {
  console.log('CompactNotesComponent props:', props)
  
  const [notes, setNotes] = React.useState([
    'Revisar tareas pendientes',
    'Preparar presentación',
    'Contactar con estudiantes'
  ])
  
  const [newNote, setNewNote] = React.useState('')
  
  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()])
      setNewNote('')
    }
  }
  
  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index))
  }
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <h3 className="font-bold text-lg mb-4 text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Notas Rápidas
        </h3>
        
        {/* Formulario para agregar nota */}
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNote()}
              placeholder="Agregar nueva nota..."
              className="flex-1 px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-md text-sm 
                       bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={addNote}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm font-medium
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Lista de notas */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {notes.map((note, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-md border border-yellow-200 dark:border-yellow-700"
            >
              <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{note}</span>
              <button
                onClick={() => removeNote(index)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        {notes.length === 0 && (
          <div className="text-center py-8 text-yellow-600 dark:text-yellow-400">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">No hay notas aún</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-700">
          <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
            ✨ Plugin compacto optimizado para espacios pequeños
          </p>
        </div>
      </div>
    </div>
  )
}

// Componente envolvente
const CompactPlugin = (props: any) => {
  if (props.activePermissions && props.activePermissions.has('readNotes')) {
    return <CompactNotesComponent {...props} />
  } else {
    return (
      <div className="text-center py-8 text-orange-600 dark:text-orange-400">
        <p className="font-semibold">El permiso &apos;readNotes&apos; no está activo.</p>
        <p className="text-sm mt-2">Para activar el permiso, ve a la sección de permisos arriba.</p>
      </div>
    )
  }
}

export default CompactPlugin
