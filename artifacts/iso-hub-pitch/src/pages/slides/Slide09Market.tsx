export default function Slide09Market() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080E1E' }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #10B981 0%, #3B82F6 100%)' }}
      />

      {/* Bottom right glow */}
      <div
        className="absolute"
        style={{
          bottom: '-10vh',
          right: '-5vw',
          width: '40vw',
          height: '40vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
        }}
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
              color: '#10B981',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1vh',
            }}
          >
            Peluang Pasar
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display-family)',
              fontWeight: 800,
              fontSize: '3.8vw',
              color: '#F1F5F9',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            Pasar Sertifikasi ISO Indonesia{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #10B981, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Tumbuh Pesat
            </span>
          </h2>
        </div>

        {/* Content: two-column */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '3vw',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Market drivers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            {/* Driver 1 */}
            <div
              style={{
                background: 'rgba(16,185,129,0.07)',
                border: '1px solid rgba(16,185,129,0.18)',
                borderRadius: '1vw',
                padding: '2.5vh 2.5vw',
                display: 'flex',
                gap: '1.5vw',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '3vw',
                  height: '3vw',
                  borderRadius: '0.6vw',
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg style={{ width: '1.6vw', height: '1.6vw' }} fill="none" stroke="#10B981" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.8vw', color: '#6EE7B7', marginBottom: '0.6vh' }}>
                  Regulasi Pemerintah
                </h4>
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.45vw', color: '#94A3B8', lineHeight: 1.4 }}>
                  Persyaratan sertifikasi ISO semakin wajib untuk tender pemerintah dan ekspor produk Indonesia
                </p>
              </div>
            </div>

            {/* Driver 2 */}
            <div
              style={{
                background: 'rgba(59,130,246,0.07)',
                border: '1px solid rgba(59,130,246,0.18)',
                borderRadius: '1vw',
                padding: '2.5vh 2.5vw',
                display: 'flex',
                gap: '1.5vw',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '3vw',
                  height: '3vw',
                  borderRadius: '0.6vw',
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg style={{ width: '1.6vw', height: '1.6vw' }} fill="none" stroke="#3B82F6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.8vw', color: '#93C5FD', marginBottom: '0.6vh' }}>
                  Pertumbuhan UKM
                </h4>
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.45vw', color: '#94A3B8', lineHeight: 1.4 }}>
                  Jutaan UKM Indonesia mulai menyadari pentingnya sertifikasi ISO untuk daya saing global
                </p>
              </div>
            </div>

            {/* Driver 3 */}
            <div
              style={{
                background: 'rgba(124,58,237,0.07)',
                border: '1px solid rgba(124,58,237,0.18)',
                borderRadius: '1vw',
                padding: '2.5vh 2.5vw',
                display: 'flex',
                gap: '1.5vw',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '3vw',
                  height: '3vw',
                  borderRadius: '0.6vw',
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg style={{ width: '1.6vw', height: '1.6vw' }} fill="none" stroke="#7C3AED" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.8vw', color: '#C4B5FD', marginBottom: '0.6vh' }}>
                  Adopsi AI di Industri
                </h4>
                <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.45vw', color: '#94A3B8', lineHeight: 1.4 }}>
                  Industri siap adopsi solusi AI untuk efisiensi operasional dan kepatuhan standar internasional
                </p>
              </div>
            </div>
          </div>

          {/* Right: Key advantage */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(14,24,48,0.9) 0%, rgba(8,14,30,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.2vw',
              padding: '4vh 3vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.2vw', fontWeight: 600, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2vh' }}>
                Keunggulan ISO Hub
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2vh' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
                  <svg style={{ width: '1.8vw', height: '1.8vw', flexShrink: 0 }} fill="none" stroke="#10B981" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1' }}>Harga transparan, mulai gratis</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
                  <svg style={{ width: '1.8vw', height: '1.8vw', flexShrink: 0 }} fill="none" stroke="#10B981" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1' }}>Dibuat khusus untuk Indonesia</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
                  <svg style={{ width: '1.8vw', height: '1.8vw', flexShrink: 0 }} fill="none" stroke="#10B981" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1' }}>AI + manusia, bukan salah satunya</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
                  <svg style={{ width: '1.8vw', height: '1.8vw', flexShrink: 0 }} fill="none" stroke="#10B981" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1' }}>End-to-end, bukan partial solution</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
                  <svg style={{ width: '1.8vw', height: '1.8vw', flexShrink: 0 }} fill="none" stroke="#10B981" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.7vw', color: '#CBD5E1' }}>Semua industri dan standar didukung</span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '3vh',
                padding: '2vh 2vw',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '0.8vw',
              }}
            >
              <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.5vw', color: '#94A3B8', lineHeight: 1.5 }}>
                Tidak ada solusi terintegrasi lain yang menggabungkan AI agents, marketplace fasilitator, dan tools manajemen ISO dalam satu platform untuk pasar Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
