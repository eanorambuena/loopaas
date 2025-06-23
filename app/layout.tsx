import Footer from '@/components/Footer'
import GoBackLink from '@/components/GoBackLink'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

interface LayoutProps {
  children: React.ReactNode
  searchParams?: {
    error?: string
    error_code?: string
    error_description?: string
  }
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: '%s | IDS App',
    default: 'IDS App'
  },
  description: 'IDS App es una aplicación web para gestionar los cursos del Instituto para el Desarrollo Sustentable',
  verification: {
    google: '43TwFvQymK3-1sNg02-KVCL_ryqBTvr9zpJBQX1aVms'
  }
}

export default function RootLayout({ children, searchParams }: LayoutProps) {
  if (searchParams && searchParams.error) {
    const { error, error_code, error_description } = searchParams
    console.error('Error:', error)
    console.error('Error Code:', error_code)
    console.error('Error Description:', error_description)
  }
  
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Header />
          <GoBackLink />
          <section className="flex-1 w-full flex flex-col gap-5 items-center">
            {children}
            <Toaster />
            <Footer />
          </section>
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
