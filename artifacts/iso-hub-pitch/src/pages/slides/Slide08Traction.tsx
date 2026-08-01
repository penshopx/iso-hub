export default function Slide08Traction() {
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
          width: '80vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #3B82F6 0%, #10B981 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: '4.5vh 6vw' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '4vh', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.2vw',
              fontWeight: 600,
              color: '#3B82F6',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1vh',
            }}
          >
            Platform
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
            ISO Hub{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #3B82F6, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              dalam Angka
            </span>
          </h2>
        </div>

        {/* Big stat grid */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '2vw',
            alignItems: 'stretch',
          }}
        >
          {/* Stat 1 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(14,24,48,0.6) 100%)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 3vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 900,
                fontSize: '8vw',
                color: '#3B82F6',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              50+
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2vw',
                color: '#F1F5F9',
                marginTop: '1vh',
              }}
            >
              Fasilitator Terverifikasi
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.4vw',
                color: '#64748B',
                marginTop: '0.5vh',
              }}
            >
              Konsultan ISO profesional siap membantu
            </div>
          </div>

          {/* Stat 2 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(14,24,48,0.6) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 3vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 900,
                fontSize: '8vw',
                color: '#7C3AED',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              9+
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2vw',
                color: '#F1F5F9',
                marginTop: '1vh',
              }}
            >
              Standar ISO Didukung
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.4vw',
                color: '#64748B',
                marginTop: '0.5vh',
              }}
            >
              Dari ISO 9001 hingga IATF 16949
            </div>
          </div>

          {/* Stat 3 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(14,24,48,0.6) 100%)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 3vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 900,
                fontSize: '8vw',
                color: '#10B981',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              100+
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2vw',
                color: '#F1F5F9',
                marginTop: '1vh',
              }}
            >
              Artikel &amp; Panduan Gratis
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.4vw',
                color: '#64748B',
                marginTop: '0.5vh',
              }}
            >
              Perpustakaan pengetahuan ISO terlengkap
            </div>
          </div>

          {/* Stat 4 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(14,24,48,0.6) 100%)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '1.2vw',
              padding: '3.5vh 3vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 900,
                fontSize: '8vw',
                color: '#F59E0B',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              20+
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '2vw',
                color: '#F1F5F9',
                marginTop: '1vh',
              }}
            >
              Modul Terintegrasi
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.4vw',
                color: '#64748B',
                marginTop: '0.5vh',
              }}
            >
              Tools lengkap untuk compliance end-to-end
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
