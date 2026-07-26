import { motion } from 'framer-motion';

export const Scene0 = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center text-center px-4 max-w-5xl">
        {/* Decorative line top */}
        <motion.div 
          className="w-px h-24 bg-gradient-to-b from-transparent to-blue-500 mb-8"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 96, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />

        <motion.div
          className="px-4 py-1.5 rounded-full glass-panel-light border border-blue-500/30 text-blue-400 font-mono text-sm tracking-widest uppercase mb-8 inline-block"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Platform ISO #1 di Indonesia
        </motion.div>
        
        <div className="overflow-hidden mb-6">
          <motion.h1 
            className="text-[8vw] leading-none font-bold tracking-tight text-gradient-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            ISO Hub
          </motion.h1>
        </div>

        <motion.p 
          className="text-[2vw] text-zinc-400 max-w-3xl mt-4 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          Sertifikasi ISO <span className="text-white">Lebih Cepat</span>,{' '}
          <span className="text-white">Lebih Mudah</span>,{' '}
          <span className="text-white">Lebih Hemat</span>.
        </motion.p>
        
        {/* Animated circle pulse behind */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] border border-blue-500/20 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};
