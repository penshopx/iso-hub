import { motion } from 'framer-motion';

export const Scene1_Shorts = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[6cqw] pt-[5cqh]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top text */}
      <div className="w-full flex flex-col justify-center items-center text-center z-20">
        <motion.div
          className="text-violet-400 font-mono text-[3.5cqw] tracking-widest uppercase mb-[2cqh]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          AI-Powered
        </motion.div>
        
        <motion.h2 
          className="text-[10cqw] leading-[1.1] font-bold text-white mb-[2cqh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Intelligent AI <span className="text-gradient block">Agents</span>
        </motion.h2>

        <motion.p 
          className="text-[4.5cqw] text-zinc-400 max-w-[80cqw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Memandu sertifikasi dan analisis gap secara paralel.
        </motion.p>
      </div>

      {/* Abstract graphic representing agents */}
      <div className="w-full h-[45cqh] relative flex items-center justify-center perspective-1000 mt-[4cqh]">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center transform-style-3d"
          initial={{ rotateX: 45, opacity: 0, scale: 0.8 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          {/* Center Agent Node */}
          <motion.div className="absolute w-[18cqw] h-[18cqw] rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center z-20 backdrop-blur-md glow-primary">
            <div className="w-[9cqw] h-[9cqw] rounded-full bg-blue-500/50 animate-pulse" />
          </motion.div>

          {/* Surrounding Nodes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[9cqw] h-[9cqw] rounded-full bg-violet-500/10 border border-violet-400/40 flex items-center justify-center backdrop-blur-md"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
              style={{
                transformOrigin: `${18 + i * 4}cqw center`,
                marginLeft: `-${36 + i * 8}cqw`
              }}
            >
              <div className="w-[3cqw] h-[3cqw] rounded-full bg-violet-400/80" />
            </motion.div>
          ))}
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {[...Array(4)].map((_, i) => (
              <motion.line
                key={i}
                x1="50%" y1="50%"
                x2={`${50 + 25 * Math.cos(i * (Math.PI * 2) / 4)}%`} 
                y2={`${50 + 25 * Math.sin(i * (Math.PI * 2) / 4)}%`}
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
