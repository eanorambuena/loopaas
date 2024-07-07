import Link from 'next/link'
import React from 'react'

interface Props {
  icon: React.FunctionComponent<{ size: number }>
  title: string
  path?: string
}

export default function Card({ icon, path, title } : Props) {
  if (!path) {
    return (
      <div className="w-full max-w-4xl rounded-md bg-[#eeeeee] dark:bg-gray-900">
        <div className="flex gap-2 p-10 flex-col items-center justify-center">
          {icon({ size: 48 })}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
    )
  }

  return (
    <Link
      className="w-full max-w-4xl rounded-md flex justify-center items-center bg-[#eeeeee] dark:bg-gray-900 hover:scale-105 transition-transform duration-300 hover:shadow-[0_20px_30px_rgba(_8,_184,_112,_0.7)]"
      href={path}
    >
      <div className="flex gap-2 p-10 flex-col items-center justify-center">
        {icon({ size: 48 })}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </Link>
  )
}
