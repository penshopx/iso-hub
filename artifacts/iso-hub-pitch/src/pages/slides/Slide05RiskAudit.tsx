export default function Slide05RiskAudit() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080E1E' }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #EF4444 0%, #7C3AED 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: '4.5vh 6vw' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3.5vh' }}>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#94A3B8',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1vh',
            }}
          >
            Fitur Platform
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display-family)',
              fontWeight: 800,
              fontSize: '4vw',
              color: '#F1F5F9',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            Risk Management &amp;{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #EF4444, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Audit Tracking
            </span>
          </h2>
        </div>

        {/* Two column split */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5vw',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Risk Management */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(14,24,48,0.6) 100%)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 3vw',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw', marginBottom: '3vh' }}>
              <div
                style={{
                  width: '3.8vw',
                  height: '3.8vw',
                  borderRadius: '0.8vw',
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg style={{ width: '2vw', height: '2vw' }} fill="none" stroke="#EF4444" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontWeight: 700,
                  fontSize: '2.2vw',
                  color: '#FCA5A5',
                  letterSpacing: '-0.01em',
                }}
              >
                Manajemen Risiko
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8vh' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#EF4444', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Risk matrix interaktif sesuai ISO 31000
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#EF4444', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Identifikasi, evaluasi, dan mitigasi risiko
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#EF4444', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Manajemen insiden dan pelaporan
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#EF4444', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Dashboard KPI dan monitoring real-time
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#EF4444', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Manajemen vendor dan supplier
                </p>
              </div>
            </div>
          </div>

          {/* Right: Audit Tracking */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(14,24,48,0.6) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 3vw',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw', marginBottom: '3vh' }}>
              <div
                style={{
                  width: '3.8vw',
                  height: '3.8vw',
                  borderRadius: '0.8vw',
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg style={{ width: '2vw', height: '2vw' }} fill="none" stroke="#A78BFA" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontWeight: 700,
                  fontSize: '2.2vw',
                  color: '#C4B5FD',
                  letterSpacing: '-0.01em',
                }}
              >
                Audit &amp; Sertifikasi
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8vh' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#7C3AED', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Jadwal audit internal dan eksternal
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#7C3AED', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Tracking temuan dan tindakan korektif
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#7C3AED', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Checklist otomatis dan gap analysis
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#7C3AED', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Roadmap sertifikasi visual step-by-step
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1vw' }}>
                <div style={{ width: '0.5vw', height: '0.5vw', borderRadius: '50%', background: '#7C3AED', marginTop: '0.8vh', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1', lineHeight: 1.4 }}>
                  Direktori badan sertifikasi terverifikasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
