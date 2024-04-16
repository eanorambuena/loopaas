import React from "react"

export default function FormGroup({ children, htmlFor, label, register, type, required, ...rest } : { children?: React.ReactNode, htmlFor: string, label: string, register?: any, type?: string, required?: boolean }) {
  return (
    <>
      <label htmlFor={ htmlFor } className='block mb-2 text-sm font-medium text-gray-100'>{ label }</label>
      <div className='relative'>
        <input
          id={ htmlFor }
          name={ htmlFor }
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5'
          { ...(register ? register(htmlFor) : {}) }
          { ...(type ? { type } : {}) }
          { ...(required ? { required } : {}) }
          { ...rest }
        />
        { children }
      </div>
    </>
  )
}
