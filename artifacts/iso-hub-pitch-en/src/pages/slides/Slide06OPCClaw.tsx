export default function Slide06OPCClaw() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080E1E' }}
    >
      {/* Background gradient bloom */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '50vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: '0.4vw', background: 'linear-gradient(180deg, #7C3AED 0%, #10B981 100%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col"
        style={{ padding: '4.5vh 6vw' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3vh', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1.2vw',
                fontWeight: 600,
                color: '#7C3AED',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1vh',
              }}
            >
              Featured Technology
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
              OPC CLAW:{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #7C3AED, #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Multi-Agent Orchestration
              </span>
            </h2>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '2vw',
              paddingBottom: '0.5vh',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display-family)', fontSize: '2.5vw', fontWeight: 800, color: '#7C3AED' }}>5</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.1vw', color: '#64748B' }}>Active Agents</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display-family)', fontSize: '2.5vw', fontWeight: 800, color: '#3B82F6' }}>24/7</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.1vw', color: '#64748B' }}>Availability</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display-family)', fontSize: '2.5vw', fontWeight: 800, color: '#10B981' }}>&lt;2s</div>
              <div style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.1vw', color: '#64748B' }}>Response Time</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body-family)',
            fontSize: '1.7vw',
            color: '#94A3B8',
            marginBottom: '4vh',
            maxWidth: '55vw',
            lineHeight: 1.5,
          }}
        >
          Coordinates 5 specialist agents in parallel to solve complex ISO tasks quickly and accurately.
        </p>

        {/* Flow diagram */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0',
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              flex: 1,
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                borderRadius: '50%',
                background: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
                fontFamily: 'var(--font-display-family)',
                fontWeight: 800,
                fontSize: '1.6vw',
                color: 'white',
              }}
            >
              1
            </div>
            <h4 style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.6vw', color: '#C4B5FD', marginBottom: '1vh' }}>
              Submit Task
            </h4>
            <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.35vw', color: '#64748B', lineHeight: 1.4 }}>
              User submits an ISO task to the platform
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.2vw', flexShrink: 0 }}>
            <svg style={{ width: '2vw', height: '2vw', color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* Step 2 */}
          <div
            style={{
              flex: 1,
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                borderRadius: '50%',
                background: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
                fontFamily: 'var(--font-display-family)',
                fontWeight: 800,
                fontSize: '1.6vw',
                color: 'white',
              }}
            >
              2
            </div>
            <h4 style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.6vw', color: '#93C5FD', marginBottom: '1vh' }}>
              Orchestrator Decomposes
            </h4>
            <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.35vw', color: '#64748B', lineHeight: 1.4 }}>
              OPC CLAW decomposes the task into optimal sub-tasks
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.2vw', flexShrink: 0 }}>
            <svg style={{ width: '2vw', height: '2vw', color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* Step 3 */}
          <div
            style={{
              flex: 1,
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                borderRadius: '50%',
                background: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
                fontFamily: 'var(--font-display-family)',
                fontWeight: 800,
                fontSize: '1.6vw',
                color: 'white',
              }}
            >
              3
            </div>
            <h4 style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.6vw', color: '#6EE7B7', marginBottom: '1vh' }}>
              Agents Execute
            </h4>
            <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.35vw', color: '#64748B', lineHeight: 1.4 }}>
              5 agents work in parallel
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.2vw', flexShrink: 0 }}>
            <svg style={{ width: '2vw', height: '2vw', color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* Step 4 */}
          <div
            style={{
              flex: 1,
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '3.5vw',
                height: '3.5vw',
                borderRadius: '50%',
                background: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2vh',
                fontFamily: 'var(--font-display-family)',
                fontWeight: 800,
                fontSize: '1.6vw',
                color: 'white',
              }}
            >
              4
            </div>
            <h4 style={{ fontFamily: 'var(--font-display-family)', fontWeight: 700, fontSize: '1.6vw', color: '#FCD34D', marginBottom: '1vh' }}>
              Results Aggregated
            </h4>
            <p style={{ fontFamily: 'var(--font-body-family)', fontSize: '1.35vw', color: '#64748B', lineHeight: 1.4 }}>
              Results are compiled into a complete solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
