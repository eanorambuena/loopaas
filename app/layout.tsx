import Footer from '@/components/Footer'
import GoBackLink from '@/components/GoBackLink'
import Header from '@/components/Header'
import { Spotlight } from '@/components/ui/spotlight-new'
import { Toaster } from '@/components/ui/toaster'
import { UserInfoSyncProvider } from '@/components/UserInfoSyncProvider'
import { APP_BASE_URL, APP_NAME } from '@/lib/constants'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata = {
  metadataBase: new URL(APP_BASE_URL),
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME
  },
  description: `${APP_NAME} es una aplicación web para gestionar los cursos del Instituto para el Desarrollo Sustentable`,
  verification: {
    google: '43TwFvQymK3-1sNg02-KVCL_ryqBTvr9zpJBQX1aVms'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={GeistSans.className}>
      <body className="bg-background overflow-x-hidden text-foreground">
        <UserInfoSyncProvider>
          <Spotlight className="overflow-hidden" />
          <main className="min-h-screen relative w-full flex flex-col items-center">
            <Header />
            <section className="flex-1 mt-20 w-full flex flex-col gap-5 items-center">
              <GoBackLink />
              <div>
                {children}
              </div>
              <Toaster />
              <Footer />
            </section>
          </main>
          <Analytics />
          <SpeedInsights />
        </UserInfoSyncProvider>
      </body>
    </html>
  )
}
