import Link from "next/link"

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

export default function SecondaryLink({ href, children, className = '' }: Props) {
  return (
    <Link
      className={`border border-foreground/20 rounded-md px-4 py-2 text-foreground hover:scale-105 transition-transform duration-300 ${className}`}
      href={href}
    >
      {children}
    </Link>
  )
}
