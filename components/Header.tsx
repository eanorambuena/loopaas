'use client'

import useCurrentUser from '@/utils/hooks/useCurrentUser'
import HoverableLink from '@/components/HoverableLink'
import { ResizableNavbar } from '@/components/ResizeableNavbar'

export default function Header() {
  const { user, isLoading, error } = useCurrentUser()

  const noUserOrUserInfoFallback = (
    <ResizableNavbar items={[]} />
  )

  if (isLoading || error || !user) return noUserOrUserInfoFallback

  const navItems = [
    {
      name: 'Cursos',
      link: '/cursos',
    },
    {
      name: 'Plugins',
      link: '/plugins',
    },
    {
      name: 'Pricing',
      link: '/pricing',
    },
    {
      name: 'Instrucciones',
      link: '/instrucciones',
    }
  ]

  return (
    <ResizableNavbar items={navItems} />
  )
}
