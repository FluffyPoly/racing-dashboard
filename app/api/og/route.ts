import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1a3a2f 0%, #0f5e4f 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,.05) 100px, rgba(255,255,255,.05) 200px)',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          {/* Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: '#ffd700',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                }}
              >
                🏇
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-1px' }}>Horse Racing Intelligence</div>
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontSize: '72px',
                fontWeight: '900',
                margin: '20px 0',
                lineHeight: '1.1',
                textTransform: 'uppercase',
                letterSpacing: '-2px',
              }}
            >
              Verified <span style={{ color: '#ffd700' }}>Performance.</span>
            </h1>

            <p
              style={{
                fontSize: '28px',
                color: 'rgba(255,255,255,0.8)',
                margin: '20px 0 0 0',
                fontStyle: 'italic',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Real-time strike rates • AI predictions • Market calibration
            </p>
          </div>

          {/* Stats preview */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '40px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '20px 32px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Win Strike Rate
              </div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: '#ffd700' }}>34%</div>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '20px 32px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Top 2 Accuracy
              </div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: '#ffd700' }}>67%</div>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '20px 32px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)',
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Est. ROI
              </div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: '#4ade80' }}>+18%</div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
              🔐 Verified • 🎯 Precise • 📊 Data-Driven
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>racing-dashboard-murex.vercel.app</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
