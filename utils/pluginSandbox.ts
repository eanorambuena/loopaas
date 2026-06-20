// utils/pluginSandbox.ts
// Safe plugin rendering using iframe sandbox instead of eval()

let sandboxCounter = 0

/**
 * Creates a sandboxed iframe to render user plugin code safely.
 * The iframe runs with restricted permissions and communicates via postMessage.
 */
export function createPluginSandbox(
  code: string,
  container: HTMLElement,
  props: Record<string, any> = {}
): { cleanup: () => void } {
  const id = `plugin-sandbox-${++sandboxCounter}`

  const iframe = document.createElement('iframe')
  iframe.id = id
  iframe.sandbox.add('allow-scripts')
  iframe.style.cssText = 'width:100%;height:100%;border:none;overflow:hidden;'
  iframe.title = 'Plugin Preview'

  const html = buildSandboxHTML(code, props)
  iframe.srcdoc = html

  container.appendChild(iframe)

  return {
    cleanup: () => {
      iframe.remove()
    }
  }
}

/**
 * Renders plugin code into a DOM element using a sandboxed iframe.
 * Returns a cleanup function.
 */
export function renderPluginToElement(
  code: string,
  element: HTMLElement,
  props: Record<string, any> = {}
): { cleanup: () => void } {
  return createPluginSandbox(code, element, props)
}

function buildSandboxHTML(code: string, props: Record<string, any>): string {
  const propsJSON = JSON.stringify(props).replace(/</g, '\\u003c')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
    #root { width: 100%; min-height: 100vh; }
  </style>
  <script src="https://unpkg.com/react@19/umd/react.production.min.js"><\/script>
  <script src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
</head>
<body>
  <div id="root"></div>
  <script>
    try {
      const props = ${propsJSON};

      const code = ${JSON.stringify(code)};

      const transformed = Babel.transform(code, {
        presets: ['react'],
        filename: 'plugin.jsx'
      }).code;

      const module = { exports: {} };
      const exports = {};
      const fn = new Function('React', 'useState', 'useEffect', 'useCallback', 'useMemo', 'useRef', 'props', 'module', 'exports', transformed);
      fn(
        React,
        React.useState,
        React.useEffect,
        React.useCallback,
        React.useMemo,
        React.useRef,
        props,
        module,
        exports
      );

      const Component = module.exports.Component || exports.Component;
      if (typeof Component !== 'function') {
        throw new Error('El codigo debe definir una funcion llamada "Component"');
      }

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(Component, props));
    } catch (error) {
      document.getElementById('root').innerHTML =
        '<div style="padding:16px;color:#dc2626;font-family:monospace">' +
        '<strong>Error:</strong> ' + (error.message || 'Unknown error') +
        '</div>';
    }
  <\/script>
</body>
</html>`
}

/**
 * Validates plugin code for obvious dangerous patterns before rendering.
 * Returns null if safe, or an error message if dangerous.
 */
export function validatePluginCode(code: string): string | null {
  const dangerous = [
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bimport\s*\(/,
    /\beval\s*\(/,
    /\bnew\s+Function\s*\(/,
    /\bdocument\.cookie\b/,
    /\blocalStorage\b/,
    /\bsessionStorage\b/,
    /\bnavigator\./,
    /\bwindow\.location\b/,
    /\bdocument\.write\b/,
    /\bonclick\s*=/i,
    /\bonerror\s*=/i,
    /\bjavascript\s*:/i,
  ]

  for (const pattern of dangerous) {
    if (pattern.test(code)) {
      return `Codigo contiene patron no permitido: ${pattern.source}`
    }
  }

  return null
}
