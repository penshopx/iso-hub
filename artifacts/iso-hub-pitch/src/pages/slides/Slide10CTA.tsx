const base = import.meta.env.BASE_URL;

export default function Slide10CTA() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={`${base}cta-bg.jpg`}
        crossOrigin="anonymous"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(8,14,30,0.96) 0%, rgba(8,14,30,0.88) 50%, rgba(8,14,30,0.96) 100%)',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #3B82F6 0%, #7C3AED 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ padding: '5vh 10vw', textAlign: 'center' }}
      >
        {/* Logo lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw', marginBottom: '4vh' }}>
          <div
            style={{
              width: '4.5vw',
              height: '4.5vw',
              borderRadius: '1vw',
              background: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 3vw rgba(59,130,246,0.5)',
            }}
          >
            <svg style={{ width: '2.5vw', height: '2.5vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
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
              fontSize: '3vw',
              color: '#F1F5F9',
              letterSpacing: '-0.025em',
            }}
          >
            ISO Hub
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display-family)',
            fontWeight: 900,
            fontSize: '5.5vw',
            color: '#F1F5F9',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            marginBottom: '2.5vh',
            textWrap: 'balance',
          }}
        >
          Raih Sertifikasi ISO Anda{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #3B82F6, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sekarang
          </span>
        </h2>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: 'var(--font-body-family)',
            fontSize: '2vw',
            color: '#94A3B8',
            maxWidth: '52vw',
            lineHeight: 1.5,
            marginBottom: '5vh',
            textWrap: 'pretty',
          }}
        >
          Mulai gratis hari ini. Konsultan ISO siap membantu dalam 24 jam. Tidak perlu kartu kredit.
        </p>

        {/* Three feature pills */}
        <div style={{ display: 'flex', gap: '2vw', marginBottom: '5vh', flexWrap: 'nowrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8vw',
              padding: '1.2vh 2vw',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '99px',
            }}
          >
            <svg style={{ width: '1.4vw', height: '1.4vw', color: '#3B82F6' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.4vw', fontWeight: 500, color: '#93C5FD' }}>Mulai Gratis</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8vw',
              padding: '1.2vh 2vw',
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: '99px',
            }}
          >
            <svg style={{ width: '1.4vw', height: '1.4vw', color: '#7C3AED' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.4vw', fontWeight: 500, color: '#C4B5FD' }}>AI + Konsultan Manusia</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8vw',
              padding: '1.2vh 2vw',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '99px',
            }}
          >
            <svg style={{ width: '1.4vw', height: '1.4vw', color: '#10B981' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.4vw', fontWeight: 500, color: '#6EE7B7' }}>9+ Standar ISO</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '20vw', height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '3vh' }} />

        {/* Contact */}
        <p
          style={{
            fontFamily: 'var(--font-body-family)',
            fontSize: '1.5vw',
            color: '#475569',
          }}
        >
          isohub.id &nbsp;|&nbsp; Platform ISO Compliance #1 di Indonesia
        </p>
      </div>
    </div>
  );
}
