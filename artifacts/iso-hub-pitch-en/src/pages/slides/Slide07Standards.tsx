export default function Slide07Standards() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080E1E' }}
    >
      {/* Background glow */}
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '40vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #10B981 0%, #3B82F6 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: '4.5vh 6vw' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3.5vh', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#10B981',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1vh',
            }}
          >
            Standar yang Didukung
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
            9+ Standar ISO,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #10B981, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              One Platform
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.6vw',
              color: '#64748B',
              marginTop: '1vh',
            }}
          >
            All major standards for Indonesian industries, supported with AI guidance and document templates.
          </p>
        </div>

        {/* Standards grid — 3 rows x 3 cols */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '1.8vw',
            alignItems: 'stretch',
          }}
        >
          {/* ISO 9001 */}
          <div
            style={{
              background: 'rgba(59,130,246,0.07)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#93C5FD' }}>ISO 9001</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Quality Management</div>
            </div>
          </div>

          {/* ISO 14001 */}
          <div
            style={{
              background: 'rgba(16,185,129,0.07)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #10B981, #059669)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#6EE7B7' }}>ISO 14001</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Environmental Management</div>
            </div>
          </div>

          {/* ISO 45001 */}
          <div
            style={{
              background: 'rgba(249,115,22,0.07)',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #F97316, #EA580C)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#FDBA74' }}>ISO 45001</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>OH&amp;S</div>
            </div>
          </div>

          {/* ISO 27001 */}
          <div
            style={{
              background: 'rgba(139,92,246,0.07)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#C4B5FD' }}>ISO 27001</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Information Security</div>
            </div>
          </div>

          {/* ISO 37001 */}
          <div
            style={{
              background: 'rgba(239,68,68,0.07)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #EF4444, #DC2626)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#FCA5A5' }}>ISO 37001</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Anti-Bribery</div>
            </div>
          </div>

          {/* ISO 31000 */}
          <div
            style={{
              background: 'rgba(234,179,8,0.07)',
              border: '1px solid rgba(234,179,8,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #EAB308, #CA8A04)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#FDE68A' }}>ISO 31000</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Risk Management</div>
            </div>
          </div>

          {/* IATF 16949 */}
          <div
            style={{
              background: 'rgba(20,184,166,0.07)',
              border: '1px solid rgba(20,184,166,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #14B8A6, #0D9488)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#5EEAD4' }}>IATF 16949</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Automotive Manufacturing</div>
            </div>
          </div>

          {/* ISO 22000 */}
          <div
            style={{
              background: 'rgba(132,204,22,0.07)',
              border: '1px solid rgba(132,204,22,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #84CC16, #65A30D)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#BEF264' }}>ISO 22000</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Food Safety</div>
            </div>
          </div>

          {/* ISO 50001 */}
          <div
            style={{
              background: 'rgba(6,182,212,0.07)',
              border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: '1vw',
              padding: '2.5vh 2vw',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5vw',
            }}
          >
            <div style={{ width: '3vw', height: '3vw', borderRadius: '0.6vw', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.7vw', color: '#67E8F9' }}>ISO 50001</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.3vw', color: '#64748B' }}>Energy Management</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
