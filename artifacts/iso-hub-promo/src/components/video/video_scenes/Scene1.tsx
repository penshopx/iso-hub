import { motion } from 'framer-motion';

export const Scene1 = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-row items-center justify-between px-[10vw]"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left side text */}
      <div className="w-[45%] flex flex-col justify-center">
        <motion.div
          className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          AI-Powered Platform
        </motion.div>
        
        <motion.h2 
          className="text-[4.5vw] leading-[1.1] font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Intelligent AI <span className="text-gradient">Agents</span>
        </motion.h2>

        <motion.p 
          className="text-[1.5vw] text-zinc-400 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Powered by OPC CLAW Orchestration. Guiding certification, gap analysis, and parallel task execution.
        </motion.p>
      </div>

      {/* Right side abstract graphic representing agents */}
      <div className="w-[45%] h-[60vh] relative flex items-center justify-center perspective-1000">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center transform-style-3d"
          initial={{ rotateY: 45, opacity: 0, scale: 0.8 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          {/* Center Agent Node */}
          <motion.div className="absolute w-24 h-24 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center z-20 backdrop-blur-md glow-primary">
            <div className="w-12 h-12 rounded-full bg-blue-500/50 animate-pulse" />
          </motion.div>

          {/* Surrounding Nodes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 rounded-full bg-violet-500/10 border border-violet-400/40 flex items-center justify-center backdrop-blur-md"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
              style={{
                transformOrigin: `${150 + i * 20}px center`,
                marginLeft: `-${300 + i * 40}px`
              }}
            >
              <div className="w-4 h-4 rounded-full bg-violet-400/80" />
            </motion.div>
          ))}
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={i}
                x1="50%" y1="50%"
                x2={`${50 + 20 * Math.cos(i * (Math.PI * 2) / 5)}%`} 
                y2={`${50 + 20 * Math.sin(i * (Math.PI * 2) / 5)}%`}
                stroke="rgba(167, 139, 250, 0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};
