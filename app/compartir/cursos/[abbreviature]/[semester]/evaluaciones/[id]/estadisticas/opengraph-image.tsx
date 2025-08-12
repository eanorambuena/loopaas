import { APP_NAME, APP_BASE_URL } from '@/lib/constants'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

interface OGParams {
  params: { abbreviature: string; semester: string; id: string }
}

export default function OG({ params }: OGParams) {
  const { abbreviature, semester, id } = params

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          position: 'relative',
          background: 'linear-gradient(135deg, #1a202c 60%, #2d3748 100%)',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <img
          src={`${APP_BASE_URL}/loopaas_logo.png`}
          width={120}
          height={120}
          style={{ position: 'absolute', top: 40, left: 60, display: 'block' }}
          alt="Loopaas Logo"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 54, marginTop: 40, letterSpacing: '-2px' }}>
            Estadísticas públicas
          </span>
          <span style={{ fontSize: 38, marginTop: 30, fontWeight: 400, color: '#90cdf4' }}>
            {abbreviature} &middot; {semester}
          </span>
          <span style={{ fontSize: 32, marginTop: 18, fontWeight: 300, color: '#e2e8f0' }}>
            Evaluación: {id}
          </span>
          <span style={{ marginTop: 40, fontSize: 28, color: '#a0aec0', fontWeight: 400 }}>
            {APP_NAME}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
