import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default async function OG({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const { abbreviature, semester, id } = params

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a202c 60%, #2d3748 100%)',
          color: 'white',
          fontSize: 60,
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        <img
          src={'https://idsapp.vercel.app/loopaas_logo.png'}
          width={120}
          height={120}
          style={{ position: 'absolute', top: 40, left: 60 }}
          alt="Loopaas Logo"
        />
        <div style={{ fontWeight: 700, fontSize: 54, marginTop: 40, letterSpacing: '-2px' }}>
          Resultados públicos
        </div>
        <div style={{ fontSize: 38, marginTop: 30, fontWeight: 400, color: '#90cdf4' }}>
          {abbreviature} &middot; {semester}
        </div>
        <div style={{ fontSize: 32, marginTop: 18, fontWeight: 300, color: '#e2e8f0' }}>
          Evaluación: {id}
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: 60, fontSize: 28, color: '#a0aec0', fontWeight: 400 }}>
          IDSApp
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
} 