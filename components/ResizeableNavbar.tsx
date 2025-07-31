'use client'

import AuthButton from '@/components/AuthButton'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar'
import { useState } from 'react'

interface ResizableNavbarProps {
  items: { name: string; link: string }[]
}

export function ResizableNavbar({ items }: ResizableNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <Navbar className="fixed top-4 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={items} />
        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {items.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <AuthButton />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
