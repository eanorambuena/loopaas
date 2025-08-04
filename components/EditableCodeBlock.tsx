'use client'

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { autocompletion, CompletionContext } from '@codemirror/autocomplete'

const CopyCodeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

const CheckCodeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

// Autocompletado personalizado para React
const reactCompletions = (context: CompletionContext) => {
  const word = context.matchBefore(/\w*/)
  if (!word) return null
  if (word.from === word.to && !context.explicit) return null

  const reactSuggestions = [
    // React Hooks
    { label: 'useState', type: 'function', info: 'React state hook', detail: 'import { useState } from "react"' },
    { label: 'useEffect', type: 'function', info: 'React effect hook', detail: 'import { useEffect } from "react"' },
    { label: 'useContext', type: 'function', info: 'React context hook', detail: 'import { useContext } from "react"' },
    { label: 'useReducer', type: 'function', info: 'React reducer hook', detail: 'import { useReducer } from "react"' },
    { label: 'useCallback', type: 'function', info: 'React callback hook', detail: 'import { useCallback } from "react"' },
    { label: 'useMemo', type: 'function', info: 'React memo hook', detail: 'import { useMemo } from "react"' },
    { label: 'useRef', type: 'function', info: 'React ref hook', detail: 'import { useRef } from "react"' },
    
    // React Components
    { label: 'React.createElement', type: 'function', info: 'Create React element' },
    { label: 'React.Fragment', type: 'class', info: 'React Fragment component' },
    { label: 'React.Component', type: 'class', info: 'React class component' },
    
    // JSX Elements
    { label: 'div', type: 'keyword', info: 'HTML div element' },
    { label: 'span', type: 'keyword', info: 'HTML span element' },
    { label: 'button', type: 'keyword', info: 'HTML button element' },
    { label: 'input', type: 'keyword', info: 'HTML input element' },
    { label: 'form', type: 'keyword', info: 'HTML form element' },
    { label: 'h1', type: 'keyword', info: 'HTML h1 heading' },
    { label: 'h2', type: 'keyword', info: 'HTML h2 heading' },
    { label: 'h3', type: 'keyword', info: 'HTML h3 heading' },
    { label: 'p', type: 'keyword', info: 'HTML paragraph element' },
    { label: 'img', type: 'keyword', info: 'HTML image element' },
    { label: 'a', type: 'keyword', info: 'HTML anchor element' },
    
    // Props comunes
    { label: 'className', type: 'property', info: 'CSS class name' },
    { label: 'onClick', type: 'property', info: 'Click event handler' },
    { label: 'onChange', type: 'property', info: 'Change event handler' },
    { label: 'onSubmit', type: 'property', info: 'Submit event handler' },
    { label: 'style', type: 'property', info: 'Inline styles object' },
    { label: 'key', type: 'property', info: 'React key prop' },
    { label: 'ref', type: 'property', info: 'React ref prop' },
    
    // Snippets de código
    { 
      label: 'useState snippet', 
      type: 'snippet', 
      info: 'useState hook with state and setter',
      apply: 'const [state, setState] = useState(initialValue)'
    },
    { 
      label: 'useEffect snippet', 
      type: 'snippet', 
      info: 'useEffect hook with cleanup',
      apply: 'useEffect(() => {\n  // effect code\n  \n  return () => {\n    // cleanup code\n  }\n}, [dependencies])'
    },
    { 
      label: 'component function', 
      type: 'snippet', 
      info: 'React functional component',
      apply: 'function ComponentName(props) {\n  return (\n    <div>\n      {/* JSX content */}\n    </div>\n  )\n}'
    }
  ]

  return {
    from: word.from,
    options: reactSuggestions
  }
}

interface EditableCodeBlockProps {
  code: string
  onChange: (code: string) => void
  placeholder?: string
  className?: string
}

export default function EditableCodeBlock({ 
  code, 
  onChange, 
  placeholder = '// Escribe tu código aquí...',
  className = ''
}: EditableCodeBlockProps) {
  const [icon, setIcon] = useState(CopyCodeIcon)

  const copy = async () => {
    await navigator?.clipboard?.writeText(code)
    setIcon(CheckCodeIcon)
    setTimeout(() => setIcon(CopyCodeIcon), 2000)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-foreground/5 rounded-md my-4 sm:my-6 lg:my-8 relative overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] max-h-[600px]">
        <button
          onClick={copy}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-md bg-foreground/5 hover:bg-foreground/10 z-30"
        >
          {icon}
        </button>
        
        <CodeMirror
          value={code}
          onChange={(value) => onChange(value)}
          placeholder={placeholder}
          theme={oneDark}
          extensions={[
            javascript({ jsx: true }),
            autocompletion({ override: [reactCompletions] })
          ]}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            highlightSelectionMatches: false,
            searchKeymap: true,
          }}
          style={{
            fontSize: '14px',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
          className="overflow-auto max-h-[600px]"
        />
      </div>
    </div>
  )
}