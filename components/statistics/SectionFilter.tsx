'use client'

interface SectionFilterProps {
  sections: string[]
  selectedSection: string
  onChange: (section: string) => void
}

export default function SectionFilter({ sections, selectedSection, onChange }: SectionFilterProps) {
  return (
    <div className='flex items-center gap-2'>
      <label htmlFor='section-select' className='font-medium'>Sección:</label>
      <select
        id='section-select'
        className='border rounded px-2 py-1 dark:bg-neutral-900 dark:text-white'
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