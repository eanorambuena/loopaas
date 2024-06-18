import Link from "next/link"
import React from "react"

interface Props {
  icon: React.FunctionComponent<{ size: number }>
  title: string
  path?: string
}

export default function Card({ icon, path, title } : Props) {
  if (!path) {
    return (
      <div className="w-full max-w-4xl rounded-md bg-foreground/5">
        <div className="flex gap-2 p-10 flex-col items-center justify-center">
          {icon({ size: 48 })}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
    )
  }

  return (
    <Link className="w-full max-w-4xl rounded-md bg-foreground/5 hover:bg-foreground/10 flex justify-center items-center" href={path}>
      <div className="flex gap-2 p-10 flex-col items-center justify-center">
        {icon({ size: 48 })}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </Link>
  )
}
