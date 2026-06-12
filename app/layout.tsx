import Footer from '@/components/Footer'
import GoBackLink from '@/components/GoBackLink'
import Header from '@/components/Header'
import { SessionProvider } from '@/components/SessionProvider'
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
  description: `${APP_NAME} es una aplicación web para gestionar cursos, credenciales y evaluaciones para equipos y organizaciones`,
  keywords: ['loopaas', 'cursos', 'credenciales', 'evaluaciones', 'educación', 'gestión académica'],
  verification: {
    google: '43TwFvQymK3-1sNg02-KVCL_ryqBTvr9zpJBQX1aVms'
  },
  openGraph: {
    title: APP_NAME,
    description: 'Aplicación web para gestionar cursos, credenciales y evaluaciones',
    url: APP_BASE_URL,
    siteName: APP_NAME,
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: 'Aplicación web para gestionar cursos, credenciales y evaluaciones',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={GeistSans.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#146233" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/loopaas_logo_square.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              'name': APP_NAME,
              'url': APP_BASE_URL,
              'applicationCategory': 'EducationalApplication',
              'operatingSystem': 'Web',
              'description': 'Aplicación para la gestión de cursos, credenciales y evaluaciones',
              'author': {
                '@type': 'Person',
                'name': 'Emmanuel Norambuena',
                'url': 'https://eanorambuena.github.io'
              },
              'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD'
              }
            })
          }}
        />
      </head>
      <body className="bg-background overflow-x-hidden text-foreground">
        <SessionProvider>
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
        </SessionProvider>
      </body>
    </html>
  )
}
