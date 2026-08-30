export default function Slide03Solution() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080E1E' }}
    >
      {/* Center glow */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #3B82F6 0%, #7C3AED 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: '5vh 6vw' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3.5vh', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#3B82F6',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.2vh',
            }}
          >
            The Solution
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
            ISO Hub: One Platform,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #3B82F6, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Every ISO Need
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.7vw',
              color: '#64748B',
              marginTop: '1.2vh',
            }}
          >
            From gap analysis to audit-ready documents — faster, easier, and more affordable.
          </p>
        </div>

        {/* Three pillars */}
        <div
          className="flex-1 grid"
          style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw', alignItems: 'stretch' }}
        >
          {/* Pillar 1: AI */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.04) 100%)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '4vw',
                height: '4vw',
                borderRadius: '0.8vw',
                background: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2.5vh',
                boxShadow: '0 0 2vw rgba(59,130,246,0.3)',
              }}
            >
              <svg style={{ width: '2.2vw', height: '2.2vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2vw',
                color: '#93C5FD',
                marginBottom: '1.5vh',
                letterSpacing: '-0.01em',
              }}
            >
              Kecerdasan AI
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.6vw',
                color: '#94A3B8',
                lineHeight: 1.55,
                textWrap: 'pretty',
              }}
            >
              5 Specialist Agents for automated gap analysis, document creation, and audit preparation.
            </p>
          </div>

          {/* Pillar 2: Consultants */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(124,58,237,0.04) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '4vw',
                height: '4vw',
                borderRadius: '0.8vw',
                background: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2.5vh',
                boxShadow: '0 0 2vw rgba(124,58,237,0.3)',
              }}
            >
              <svg style={{ width: '2.2vw', height: '2.2vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2vw',
                color: '#C4B5FD',
                marginBottom: '1.5vh',
                letterSpacing: '-0.01em',
              }}
            >
              Verified Consultants
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.6vw',
                color: '#94A3B8',
                lineHeight: 1.55,
                textWrap: 'pretty',
              }}
            >
              50+ verified ISO facilitators with transparent pricing, bookable directly on the platform.
            </p>
          </div>

          {/* Pillar 3: Management Tools */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.04) 100%)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '4vw',
                height: '4vw',
                borderRadius: '0.8vw',
                background: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2.5vh',
                boxShadow: '0 0 2vw rgba(16,185,129,0.3)',
              }}
            >
              <svg style={{ width: '2.2vw', height: '2.2vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2vw',
                color: '#6EE7B7',
                marginBottom: '1.5vh',
                letterSpacing: '-0.01em',
              }}
            >
              Complete Management Tools
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.6vw',
                color: '#94A3B8',
                lineHeight: 1.55,
                textWrap: 'pretty',
              }}
            >
              20+ integrated modules: risk, audit, documents, KPIs, calibration, incidents, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
