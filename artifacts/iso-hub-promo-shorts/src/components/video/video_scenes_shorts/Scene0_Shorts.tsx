import { motion } from 'framer-motion';

export const Scene0_Shorts = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[6cqw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center text-center max-w-full w-full">
        {/* Decorative line top */}
        <motion.div 
          className="w-px h-[10cqh] bg-gradient-to-b from-transparent to-blue-500 mb-[4cqh]"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "10cqh", opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />

        <motion.div
          className="px-[4cqw] py-[1cqh] rounded-full glass-panel-light border border-blue-500/30 text-blue-400 font-mono text-[3.5cqw] tracking-widest uppercase mb-[6cqh]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Platform ISO #1
        </motion.div>
        
        <div className="overflow-hidden mb-[4cqh] w-full">
          <motion.h1 
            className="text-[14cqw] leading-none font-bold tracking-tight text-gradient-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            ISO Hub
          </motion.h1>
        </div>

        <motion.p 
          className="text-[5cqw] text-zinc-400 max-w-[80cqw] mt-[2cqh] font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          Sertifikasi ISO <span className="text-white block mt-[1cqh]">Lebih Cepat. Mudah. Hemat.</span>
        </motion.p>
        
        {/* Animated circle pulse behind */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60cqw] h-[60cqw] border border-blue-500/20 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};
