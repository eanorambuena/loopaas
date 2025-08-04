import { NextRequest, NextResponse } from 'next/server'
import * as Babel from '@babel/standalone'

// Función para transpilar JSX usando Babel
function transpileJSX(code: string): string {
  try {
    const result = Babel.transform(code, {
      presets: ['react'],
      plugins: [
        ['transform-react-jsx', {
          pragma: 'React.createElement',
          pragmaFrag: 'React.Fragment'
        }]
      ]
    })
    
    if (!result || !result.code) {
      throw new Error('Babel no pudo transpilar el código')
    }
    
    return result.code
  } catch (error) {
    throw new Error(`Error transpilando JSX: ${error instanceof Error ? error.message : 'Error desconocido'}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Código JSX requerido' },
        { status: 400 }
      )
    }
    
    // Validaciones de seguridad básicas
    const dangerousPatterns = [
      /eval\s*\(/,
      /Function\s*\(/,
      /window\./,
      /document\./,
      /localStorage\./,
      /sessionStorage\./,
      /__proto__/,
      /constructor/,
      /fetch\s*\(/,
      /XMLHttpRequest/,
      /import\s+/,
      /require\s*\(/,
      /process\./,
      /global\./,
      /Buffer\./
    ]
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json(
          { error: 'Código contiene patrones no permitidos por seguridad' },
          { status: 400 }
        )
      }
    }
    
    // Transpilar el código usando Babel
    const transpiledCode = transpileJSX(code)
    
    return NextResponse.json({
      success: true,
      transpiledCode,
      originalCode: code
    })
    
  } catch (error) {
    console.error('Error en transpile-plugin:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error interno del servidor',
        success: false 
      },
      { status: 500 }
    )
  }
}
