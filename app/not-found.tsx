'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center px-4 py-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Página no encontrada
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Puede que el enlace esté roto o que hayas ingresado una URL incorrecta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3">
              <Home size={20} />
              Ir al inicio
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950 px-6 py-3"
          >
            <ArrowLeft size={20} />
            Volver atrás
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            ¿Necesitas ayuda?
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Páginas principales:</h4>
              <ul className="space-y-1">
                <li><Link href="/organizaciones" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Organizaciones</Link></li>
                <li><Link href="/cursos" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Cursos</Link></li>
                <li><Link href="/demo/plugins" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Demo Plugins</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Recursos:</h4>
              <ul className="space-y-1">
                <li><Link href="/instrucciones" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Instrucciones</Link></li>
                <li><Link href="/pricing" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Planes</Link></li>
                <li><Link href="/login" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Iniciar sesión</Link></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-xs text-gray-500 dark:text-gray-500"
        >
          Si crees que esto es un error, por favor contáctanos.
        </motion.div>
      </div>
    </main>
  )
}
