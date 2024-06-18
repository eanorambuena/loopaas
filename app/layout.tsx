import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Header from "@/components/Header"
import GoBackLink from "@/components/GoBackLink"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: '%s | IDS App',
    default: 'IDS App'
  },
  description: "IDS App es una aplicación web para gestionar los cursos del Instituto para el Desarrollo Sustentable"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">
          <GoBackLink />
          {children}
        </main>
      </body>
    </html>
  )
}
