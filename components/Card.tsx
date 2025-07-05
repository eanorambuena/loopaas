import Link from 'next/link'
import React from 'react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

export interface CardProps {
  icon: React.FunctionComponent<{ size: number }>
  title: string
  path?: string
  className?: string
}

export default function Card({ icon, path, title, className } : CardProps) {
  if (!path) {
    return (
      <CardContainer>
        <CardBody className={`size-16 bg-gray-50 aspect-square flex flex-col justify-center items-center relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-6 border ${className}`}>
          <CardItem className='flex flex-col justify-center items-center'>
            {icon({ size: 48 })}
            <h3 className="text-xl font-bold">{title}</h3>
          </CardItem>
        </CardBody>
      </CardContainer>
    )
  }

  return (
    <Link
      href={path}
    >
      <Card icon={icon} title={title} className={className} />
    </Link>
  )
}
