interface LikertProps {
  id?: string
  criteria: { label: string }[]
  sectionKey: string
  required?: boolean
}

export default function Likert({ id, criteria, sectionKey, required } : LikertProps) {
  return (
    <div className='flex flex-col text-center h-fit gap-4 overflow-x-auto mt-4 rounded-md max-w-[80vw] sm:max-w-[85vw] md:max-w-[90vw]'>
      <table className='w-full text-sm text-left rtl:text-right'>
        <thead className='text-xs bg-gray-50 dark:bg-gray-700 dark:opacity-90 text-gray-700 dark:text-gray-100'>
          <tr>
            <th scope='col' className='px-6 py-3'>
            </th>
            <th scope='col' className='px-6 py-3'>
              Mucho menos de lo esperado
            </th>
            <th scope='col' className='px-6 py-3'>
              Menos de lo esperado
            </th>
            <th scope='col' className='px-6 py-3'>
              Lo esperado
            </th>
            <th scope='col' className='px-6 py-3'>
              Más de lo esperado
            </th>
            <th scope='col' className='px-6 py-3'>
              Mucho más de lo esperado
            </th>
          </tr>
        </thead>
        <tbody>
          { criteria.map((criterion) => {
            const name = `${sectionKey}-${criterion.label.toLowerCase().replace(/\s/g, '-')}`
            return (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={name}> 
                <th scope='row' className='p-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-50'>
                  {criterion.label}
                </th>
                {[1, 2, 3, 4, 5].map((i) => {
                  const id = `${name}-${i}`
                  return (
                    <td className='p-4' key={ id }>
                      <input
                        type='radio'
                        id={ id }
                        name={ name }
                       />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
