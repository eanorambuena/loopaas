import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminOrganizacionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-black">
      <div className="max-w-2xl w-full px-6 py-10 rounded-xl shadow-lg bg-white/80 dark:bg-black/80 flex flex-col gap-8 border border-emerald-100 dark:border-emerald-900">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600">Administrar organización</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
            <Input className="text-lg font-semibold w-full sm:w-auto" defaultValue="Nombre de la organización" />
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Guardar</Button>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Creada el: <span className="font-mono">2024-XX-XX</span></span>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-emerald-700 mb-2">Cursos de la organización</h3>
          <div className="border rounded-md p-6 text-center text-gray-400 dark:text-gray-500">
            (Aquí se mostrarán los cursos asociados a la organización)
          </div>
        </div>
      </div>
    </main>
  )
}
