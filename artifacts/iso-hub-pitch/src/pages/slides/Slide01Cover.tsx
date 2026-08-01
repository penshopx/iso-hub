const base = import.meta.env.BASE_URL;

export default function Slide01Cover() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Hero image */}
      <img
        src={`${base}hero.jpg`}
        crossOrigin="anonymous"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(8,14,30,0.96) 0%, rgba(8,14,30,0.82) 45%, rgba(59,130,246,0.12) 100%)',
        }}
      />
      {/* Left edge accent stripe */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #3B82F6 0%, #7C3AED 100%)' }}
      />

      {/* Layout */}
      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: '5vh 6vw' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: '0.8vw' }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: '3.2vw',
                height: '3.2vw',
                borderRadius: '0.6vw',
                background: '#3B82F6',
                boxShadow: '0 0 2vw rgba(59,130,246,0.45)',
              }}
            >
              <svg
                style={{ width: '1.8vw', height: '1.8vw' }}
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 800,
                fontSize: '1.8vw',
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
              }}
            >
              ISO Hub
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.2vw',
              color: '#64748B',
              fontWeight: 400,
            }}
          >
            Investor &amp; Client Presentation
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ maxWidth: '60vw' }}>
          <div
            className="inline-flex items-center"
            style={{
              gap: '0.6vw',
              padding: '0.5vh 1.2vw',
              borderRadius: '99px',
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.28)',
              marginBottom: '3vh',
            }}
          >
            <span
              style={{
                width: '0.55vw',
                height: '0.55vw',
                borderRadius: '50%',
                background: '#3B82F6',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.15vw',
                color: '#93C5FD',
                fontWeight: 500,
              }}
            >
              Platform ISO #1 di Indonesia
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display-family)',
              fontWeight: 900,
              fontSize: '7vw',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: '#F1F5F9',
              textWrap: 'balance',
              margin: 0,
            }}
          >
            Sertifikasi ISO{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #3B82F6, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Lebih Cepat,
            </span>
            <br />
            Lebih Mudah, Lebih Hemat
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '2vw',
              color: '#94A3B8',
              lineHeight: 1.5,
              marginTop: '2.5vh',
              textWrap: 'pretty',
            }}
          >
            AI-powered document generation, risk management &amp; audit tracking
            <br />
            — all in one platform built for Indonesia.
          </p>
        </div>

        {/* Bottom: standard badges */}
        <div className="flex items-center" style={{ gap: '1.2vw' }}>
          <span
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.15vw',
              color: '#475569',
              fontWeight: 400,
            }}
          >
            Mendukung:
          </span>
          {[
            { label: 'ISO 9001', color: '#60A5FA', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.22)' },
            { label: 'ISO 14001', color: '#34D399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.22)' },
            { label: 'ISO 45001', color: '#FCA5A5', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.22)' },
            { label: 'ISO 27001', color: '#C4B5FD', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.22)' },
            { label: 'ISO 37001', color: '#FCD34D', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.22)' },
          ].map((s) => (
            <span
              key={s.label}
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.15vw',
                fontWeight: 600,
                color: s.color,
                background: s.bg,
                border: `1px solid ${s.border}`,
                borderRadius: '0.4vw',
                padding: '0.4vh 0.9vw',
              }}
            >
              {s.label}
            </span>
          ))}
          <span
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.15vw',
              color: '#475569',
            }}
          >
            + 4 lainnya
          </span>
        </div>
      </div>
    </div>
  );
}
