import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-black">
      <div className="max-w-xl w-full px-6 py-12 rounded-xl shadow-lg bg-white/80 dark:bg-black/80 flex flex-col items-center gap-8 border border-emerald-100 dark:border-emerald-900">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-600 tracking-tight">loopaas</h1>
        <p className="text-lg sm:text-xl text-center text-gray-700 dark:text-gray-200">
          La plataforma colaborativa para gestionar cursos, evaluaciones y equipos en tu organización educativa. <span className="text-emerald-500 font-semibold">Simple, potente y flexible.</span>
        </p>
        <Link href="/organizacion/nueva">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4 rounded-full shadow-md">
            Crear organización
          </Button>
        </Link>
      </div>
    </main>
  )
}
