export default function Linear({ id, criteria, sectionKey, required } : { id?: string, criteria: { label: string }[], sectionKey: string, required?: boolean }) {
  return (
    <div className='flex flex-col text-center h-fit text-gray-800 gap-4 overflow-x-auto mt-4 max-w-[75vw] sm:max-w-[85vw] md:max-w-[90vw]'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:opacity-90 dark:text-gray-400'>
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
            const name = `${sectionKey}-${criterion.label.toLowerCase().replace(' ', '-')}`
            return (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={name}> 
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {criterion.label}
                </th>
                {[1, 2, 3, 4, 5].map((i) => {
                  const id = `${name}-${i}`
                  return (
                    <td className='px-6 py-4' key={ id }>
                      <input
                        type='radio'
                        id={ id }
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
