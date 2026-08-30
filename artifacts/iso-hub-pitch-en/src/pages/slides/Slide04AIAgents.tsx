export default function Slide04AIAgents() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080E1E' }}
    >
      {/* Top glow */}
      <div
        className="absolute"
        style={{
          top: '-10vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '30vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #3B82F6 0%, #06B6D4 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: '4.5vh 6vw' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3vh' }}>
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
            AI Agents
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5vw' }}>
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
              5 Specialist Agents,{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #3B82F6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Always Ready 24/7
              </span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body-family)',
              fontSize: '1.6vw',
              color: '#64748B',
              marginTop: '0.8vh',
            }}
          >
            Coordinated by the OPC CLAW orchestrator to complete ISO tasks in parallel.
          </p>
        </div>

        {/* 5 Agent Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            gap: '1.4vw',
            flex: 1,
            alignItems: 'stretch',
          }}
        >
          {/* ISO Agent */}
          <div
            style={{
              background: 'rgba(14,24,48,0.8)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '1vw',
              padding: '2.8vh 1.8vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '3.4vw',
                height: '3.4vw',
                borderRadius: '0.7vw',
                background: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
              }}
            >
              <svg style={{ width: '1.8vw', height: '1.8vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '1.5vw',
                color: '#93C5FD',
                marginBottom: '1.2vh',
                letterSpacing: '-0.01em',
              }}
            >
              ISO Agent
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.3vw',
                color: '#64748B',
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              Standards consultation, gap analysis, and clause requirements
            </p>
          </div>

          {/* Legal Agent */}
          <div
            style={{
              background: 'rgba(14,24,48,0.8)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '1vw',
              padding: '2.8vh 1.8vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '3.4vw',
                height: '3.4vw',
                borderRadius: '0.7vw',
                background: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
              }}
            >
              <svg style={{ width: '1.8vw', height: '1.8vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '1.5vw',
                color: '#6EE7B7',
                marginBottom: '1.2vh',
                letterSpacing: '-0.01em',
              }}
            >
              Legal Agent
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.3vw',
                color: '#64748B',
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              Indonesian regulations, compliance checks, and government rules
            </p>
          </div>

          {/* Technical Agent */}
          <div
            style={{
              background: 'rgba(14,24,48,0.8)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '1vw',
              padding: '2.8vh 1.8vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '3.4vw',
                height: '3.4vw',
                borderRadius: '0.7vw',
                background: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
              }}
            >
              <svg style={{ width: '1.8vw', height: '1.8vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '1.5vw',
                color: '#C4B5FD',
                marginBottom: '1.2vh',
                letterSpacing: '-0.01em',
              }}
            >
              Technical Agent
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.3vw',
                color: '#64748B',
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              Document generator, SOPs, templates, and implementation roadmaps
            </p>
          </div>

          {/* Audit Agent */}
          <div
            style={{
              background: 'rgba(14,24,48,0.8)',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: '1vw',
              padding: '2.8vh 1.8vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '3.4vw',
                height: '3.4vw',
                borderRadius: '0.7vw',
                background: '#EA580C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
              }}
            >
              <svg style={{ width: '1.8vw', height: '1.8vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '1.5vw',
                color: '#FDBA74',
                marginBottom: '1.2vh',
                letterSpacing: '-0.01em',
              }}
            >
              Audit Agent
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.3vw',
                color: '#64748B',
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              Audit preparation, checklist generation, finding tracking, and certification roadmaps
            </p>
          </div>

          {/* Training Agent */}
          <div
            style={{
              background: 'rgba(14,24,48,0.8)',
              border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: '1vw',
              padding: '2.8vh 1.8vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '3.4vw',
                height: '3.4vw',
                borderRadius: '0.7vw',
                background: '#0891B2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
              }}
            >
              <svg style={{ width: '1.8vw', height: '1.8vw' }} fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display-family)',
                fontWeight: 700,
                fontSize: '1.5vw',
                color: '#67E8F9',
                marginBottom: '1.2vh',
                letterSpacing: '-0.01em',
              }}
            >
              Training Agent
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.3vw',
                color: '#64748B',
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              Course recommendations, quizzes, learning paths, and competency assessments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
