'use client'

interface SectionFilterProps {
  sections: string[]
  selectedSection: string
  onChange: (section: string) => void
}

export default function SectionFilter({ sections, selectedSection, onChange }: SectionFilterProps) {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
      <label htmlFor='section-select' className='font-medium text-sm sm:text-base'>Sección:</label>
      <select
        id='section-select'
        className='border rounded px-3 py-2 dark:bg-neutral-900 dark:text-white w-full sm:w-auto min-w-[120px]'
        value={selectedSection}
        onChange={e => onChange(e.target.value)}
      >
        <option value='Todas'>Todas</option>
        {sections.map(section => (
          <option key={section} value={section}>{section}</option>
        ))}
      </select>
    </div>
  )
} 