import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import PlusIcon from '@/components/icons/PlusIcon'
import Link from 'next/link'

interface AddCardProps {
  title?: string
  path?: string
  className?: string
}

export function AddCard({ title, path, className }: AddCardProps) {
  const content = (
    <CardContainer containerClassName="p-0 w-fit h-fit">
      <CardBody className={`size-64 bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl border flex flex-col gap-4 justify-center items-center p-6 ${className}`}>
        <CardItem className='flex flex-col justify-center items-center' translateZ="20">
          <PlusIcon size={48} />
          {title && <h3 className="text-xl font-bold text-center">{title}</h3>}
        </CardItem>
      </CardBody>
    </CardContainer>
  )

  if (path) {
    return (
      <Link href={path}>
        {content}
      </Link>
    )
  }

  return content
}
