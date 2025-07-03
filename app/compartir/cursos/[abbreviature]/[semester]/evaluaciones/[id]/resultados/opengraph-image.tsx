import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default function OG({ params }) {
  const { abbreviature, semester, id } = params

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a202c 60%, #2d3748 100%)',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 54, marginTop: 40, letterSpacing: '-2px' }}>
          Resultados públicos
        </span>
        <span style={{ fontSize: 38, marginTop: 30, fontWeight: 400, color: '#90cdf4' }}>
          {abbreviature} &middot; {semester}
        </span>
        <span style={{ fontSize: 32, marginTop: 18, fontWeight: 300, color: '#e2e8f0' }}>
          Evaluación: {id}
        </span>
        <span style={{ marginTop: 40, fontSize: 28, color: '#a0aec0', fontWeight: 400 }}>
          IDSApp
        </span>
      </div>
    ),
    { width: 1200, height: 630 }
  )
} 