export default function Slide02Problem() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080E1E' }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
        }}
      />
      {/* Top-left glow */}
      <div
        className="absolute"
        style={{
          top: '-10vh',
          left: '-5vw',
          width: '40vw',
          height: '40vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #EF4444 0%, #F97316 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: '5vh 6vw' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '4vh' }}>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#EF4444',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.2vh',
            }}
          >
            Why ISO Hub?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display-family)',
              fontWeight: 800,
              fontSize: '4vw',
              color: '#F1F5F9',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              textWrap: 'balance',
            }}
          >
            ISO Certification Is Hard —<br />
            <span style={{ color: '#94A3B8', fontWeight: 600 }}>It Shouldn't Be</span>
          </h2>
        </div>

        {/* Three problem cards */}
        <div
          className="flex-1 grid"
          style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '2vw', alignItems: 'stretch' }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.2)',
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
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2.5vh',
              }}
            >
              <svg style={{ width: '2.2vw', height: '2.2vw' }} fill="none" stroke="#EF4444" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2.2vw',
                color: '#FCA5A5',
                marginBottom: '1.5vh',
                letterSpacing: '-0.01em',
              }}
            >
              Years of Process
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
              ISO certification takes 12–36 months on average without clear, structured guidance.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: 'rgba(249,115,22,0.06)',
              border: '1px solid rgba(249,115,22,0.2)',
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
                background: 'rgba(249,115,22,0.12)',
                border: '1px solid rgba(249,115,22,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2.5vh',
              }}
            >
              <svg style={{ width: '2.2vw', height: '2.2vw' }} fill="none" stroke="#F97316" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2.2vw',
                color: '#FDBA74',
                marginBottom: '1.5vh',
                letterSpacing: '-0.01em',
              }}
            >
              Expensive &amp; Hard-to-Find Consultants
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
              Experienced ISO consultants are hard to find, lack price transparency, and remain out of reach for SMEs.
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: 'rgba(234,179,8,0.06)',
              border: '1px solid rgba(234,179,8,0.2)',
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
                background: 'rgba(234,179,8,0.12)',
                border: '1px solid rgba(234,179,8,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2.5vh',
              }}
            >
              <svg style={{ width: '2.2vw', height: '2.2vw' }} fill="none" stroke="#EAB308" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2.2vw',
                color: '#FDE68A',
                marginBottom: '1.5vh',
                letterSpacing: '-0.01em',
              }}
            >
              Manual &amp; Error-Prone Documents
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
              Thousands of document pages are created manually, prone to errors, and revised repeatedly before an audit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
