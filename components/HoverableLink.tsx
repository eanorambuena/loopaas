import Link from "next/link"

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

export default function HoverableLink({ href, children, className = '' }: Props) {
  return (
    <Link
      className={`py-2 px-3 w-fit flex rounded-md no-underline hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors duration-300 dark:text-gray-50 ${className}`}
      href={href}
    >
      {children}
    </Link>
  )
}
