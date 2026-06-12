'use client'

import { getNavbarButtonStyles, NavbarButton } from '@/components/ui/resizable-navbar'
import useCurrentUser from '@/utils/hooks/useCurrentUser'
import useUserInfo from '@/utils/hooks/useUserInfo'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, User, LogOut, Settings } from 'lucide-react'

export default function AuthButton() {
  const router = useRouter()
  const { user } = useCurrentUser()
  const { userInfo } = useUserInfo()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (user && isMobile) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="text-sm text-gray-600 dark:text-gray-400 px-4">
          {userInfo?.firstName ? `Hola, ${userInfo.firstName}!` : 'Mi cuenta'}
        </div>
        <Link
          href="/perfil"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <User size={16} />
          Perfil
        </Link>
        <Link
          href="/organizaciones"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Settings size={16} />
          Organizaciones
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    )
  }

  return user ? (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={
          'flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 shadow-sm'
        }
        style={{ fontWeight: 500 }}
      >
        <span className="hidden sm:inline">
          {userInfo?.firstName ? `Hola, ${userInfo.firstName}!` : 'Mi cuenta'}
        </span>
        <span className="sm:hidden">
          <User size={16} />
        </span>
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          <Link
            href="/perfil"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User size={16} />
            Perfil
          </Link>
          <Link
            href="/organizaciones"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Settings size={16} />
            Organizaciones
          </Link>
          <hr className="my-2 border-gray-200 dark:border-gray-600" />
          <button
            onClick={() => {
              setIsDropdownOpen(false)
              handleSignOut()
            }}
            className="flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link href="/login" className={getNavbarButtonStyles('secondary')}>
      Iniciar sesión
    </Link>
  )
}
