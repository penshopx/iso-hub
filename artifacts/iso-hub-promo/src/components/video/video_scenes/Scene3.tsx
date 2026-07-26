import { motion } from 'framer-motion';

export const Scene3 = () => {
  // Risk Matrix colors
  const getMatrixColor = (row: number, col: number) => {
    const risk = row + col;
    if (risk < 3) return 'bg-green-500/20 border-green-500/30';
    if (risk < 5) return 'bg-yellow-500/20 border-yellow-500/30';
    if (risk < 7) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getMatrixGlow = (row: number, col: number) => {
    const risk = row + col;
    if (risk >= 6) return '0 0 20px rgba(239, 68, 68, 0.4)';
    return 'none';
  };

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-row items-center justify-between px-[10vw]"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left side text */}
      <div className="w-[45%] flex flex-col justify-center">
        <motion.div
          className="text-orange-400 font-mono text-sm tracking-widest uppercase mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          ISO 31000 & Audit
        </motion.div>
        
        <motion.h2 
          className="text-[4.5vw] leading-[1.1] font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Manajemen <span className="text-gradient">Risiko</span>
        </motion.h2>

        <motion.p 
          className="text-[1.5vw] text-zinc-400 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Interactive Risk Matrix, complete audit trails, and automated finding resolutions.
        </motion.p>
      </div>

      {/* Right side Risk Matrix */}
      <div className="w-[45%] h-[60vh] relative flex items-center justify-center">
        <motion.div 
          className="grid grid-cols-4 gap-2 p-6 glass-panel rounded-xl"
          initial={{ rotateX: -30, rotateY: 30, scale: 0.8, opacity: 0 }}
          animate={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          style={{ perspective: 1000 }}
        >
          {[0, 1, 2, 3].map((row) => (
            [0, 1, 2, 3].map((col) => {
              const delay = 1 + (row + col) * 0.1;
              const isHighRisk = row + col >= 6;
              return (
                <motion.div
                  key={`${row}-${col}`}
                  className={`w-[4vw] h-[4vw] rounded-lg border flex items-center justify-center ${getMatrixColor(3-row, col)}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    boxShadow: getMatrixGlow(3-row, col),
                    y: isHighRisk ? [0, -5, 0] : 0
                  }}
                  transition={{ 
                    scale: { duration: 0.5, delay },
                    opacity: { duration: 0.5, delay },
                    y: { duration: 2, delay: delay + 1, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.div 
                    className="w-1/2 h-1/2 rounded-full bg-white/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.3 }}
                  />
                </motion.div>
              );
            })
          ))}
          
          {/* Axis Labels */}
          <motion.div 
            className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono tracking-widest text-zinc-500 uppercase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          >
            Likelihood
          </motion.div>
          <motion.div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest text-zinc-500 uppercase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          >
            Impact
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
};
