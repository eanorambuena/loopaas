import Card, { CardProps } from '@/components/Card'
import PlusIcon from '@/components/icons/PlusIcon'

interface AddCardProps extends Omit<CardProps, 'icon'> {}

export function AddCard(props: AddCardProps) {
  return (
    <Card
      icon={PlusIcon}
      {...props}
    />
  )
}
