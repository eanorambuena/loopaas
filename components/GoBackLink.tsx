"use client"

import GoBackArrowIcon from './icons/GoBackArrowIcon'

export default function GoBackLink() {
  const goBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.back()
  }

  return (
    <a
      className='flex items-center py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover group text-sm'
      onClick={goBack}
    >
      <GoBackArrowIcon />
      {' '}
      Volver atrás
    </a>
  )
}
