import FormGroup from '@/components/FormGroup'
import Likert from '@/components/Likert'

interface Props {
	id: string
	question: {
		label: string
		type: string
		required: boolean
		criteria?: { label: string }[]
	}
	sectionKey: string
}

export default function Question({ id, question, sectionKey } : Props) {
	if (question.type === 'checkbox') {
		return (
			<div className='flex items-start' key={id}>
				<div className='flex items-center h-5'>
					<input id={id} type='checkbox' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300' />
				</div>
				<label htmlFor={id} className='ms-2 text-sm font-medium text-gray-100'>{question.label}</label>
			</div>
		)
	}
	else if (question.type === 'linear') {
		return (
			<div key={id}>
				<label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-100'>{question.label}</label>
				<Likert
					id={id}
					criteria={question.criteria as { label: string }[]}
					sectionKey={sectionKey}
					required={question.required}
				/>
			</div>
		)
	}
	return (
		<FormGroup
			key={id}
			htmlFor={id}
			label={question.label}
			type={question.type}
			required={question.required}
		/>
	)
}
