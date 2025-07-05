import Footer from '@/components/Footer'
import GoBackLink from '@/components/GoBackLink'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Spotlight } from '@/components/ui/spotlight-new'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background overflow-x-hidden text-foreground">
        <main className="min-h-screen overflow-x-hidden flex flex-col items-center">
          <Header />
          <GoBackLink />
          <section className="flex-1 overflow-x-hidden w-full flex flex-col gap-5 items-center">
            <Spotlight />
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
