import { NextRequest, NextResponse } from 'next/server'
import * as Babel from '@babel/standalone'

// Función para transpilar JSX usando Babel
function transpileJSX(code: string): string {
  try {
    const result = Babel.transform(code, {
      presets: [
        ['react', {
          runtime: 'classic',
          pragma: 'React.createElement',
          pragmaFrag: 'React.Fragment',
          useBuiltIns: false,
          useSpread: false
        }]
      ],
      plugins: []
    })
    
    if (!result || !result.code) {
      throw new Error('Babel no pudo transpilar el código')
    }
    
    let transpiledCode = result.code
    
    // Remover cualquier import statement que pueda haberse generado
    transpiledCode = transpiledCode.replace(/import\s+.*?from\s+.*?;?\s*/g, '')
    transpiledCode = transpiledCode.replace(/require\s*\(\s*['"].*?['"]\s*\);?\s*/g, '')
    
    return transpiledCode
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
      /require\s*\(/,
      /process\./,
      /global\./,
      /Buffer\./
    ]
    
    // Patrones de importación peligrosos (pero permitimos React y otras librerías seguras)
    const dangerousImportPatterns = [
      /import\s+.*from\s+['"]fs['"]/,
      /import\s+.*from\s+['"]path['"]/,
      /import\s+.*from\s+['"]child_process['"]/,
      /import\s+.*from\s+['"]os['"]/,
      /import\s+.*from\s+['"]crypto['"]/,
      /import\s+.*from\s+['"]http['"]/,
      /import\s+.*from\s+['"]https['"]/,
      /import\s+.*from\s+['"]net['"]/,
      /import\s+.*from\s+['"]url['"]/,
      /import\s+.*from\s+['"]querystring['"]/,
      /import\s+.*from\s+['"]util['"]/,
      /import\s+.*from\s+['"]events['"]/,
      /import\s+.*from\s+['"]stream['"]/,
      /import\s+.*from\s+['"]buffer['"]/,
      /import\s+.*from\s+['"]cluster['"]/,
      /import\s+.*from\s+['"]worker_threads['"]/,
      /import\s+.*from\s+['"]vm['"]/
    ]
    
    // Librerías permitidas (React, ReactDOM, etc.)
    const allowedLibraries = [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime'
    ]
    
    // Verificar patrones básicos peligrosos
    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json(
          { error: 'Código contiene patrones no permitidos por seguridad' },
          { status: 400 }
        )
      }
    }
    
    // Verificar importaciones peligrosas
    for (const pattern of dangerousImportPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json(
          { error: 'Importación no permitida por seguridad' },
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
