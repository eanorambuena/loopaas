interface Props {
  fill?: string
}

export default function GoBackArrowIcon({ fill = 'currentColor' } : Props) {
  return (
    <svg
      className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
      fill='none'
      height='24'
      stroke={fill}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='24'
    >
      <polyline points='15 18 9 12 15 6' />
    </svg>
  )
}
