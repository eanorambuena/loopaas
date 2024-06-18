"use client"

import { usePathname } from 'next/navigation'
import GoBackArrowIcon from './icons/GoBackArrowIcon'

export default function GoBackLink() {
  if (usePathname() === '/') return null

  const goBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.back()
  }

  return (
    <section className="w-full flex flex-row justify-start items-center mt-8 px-8">
      <a
        className='flex items-center py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover group text-sm w-fit'
        onClick={goBack}
      >
        <GoBackArrowIcon />
        {' '}
        Volver atrás
      </a>
    </section>
  )
}
