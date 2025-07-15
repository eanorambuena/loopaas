import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NuevaOrganizacionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-black">
      <div className="max-w-md w-full px-6 py-10 rounded-xl shadow-lg bg-white/80 dark:bg-black/80 flex flex-col items-center gap-6 border border-emerald-100 dark:border-emerald-900">
        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">Crear organización</h2>
        <form className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="org-name">Nombre de la organización</label>
          <Input id="org-name" placeholder="Ej: Colegio San Martín" className="w-full text-base" />
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-base mt-2">Crear</Button>
        </form>
        <Link href="/">
          <span className="text-xs text-emerald-600 hover:underline">Volver a la landing</span>
        </Link>
      </div>
    </main>
  )
}
