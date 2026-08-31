import { motion } from 'framer-motion';

export const Scene2_Shorts = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[6cqw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center text-center max-w-full">
        <motion.div
          className="w-[20cqw] h-[20cqw] mb-[8cqh] relative flex items-center justify-center"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Logo Mark Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-violet-500 rounded-2xl rotate-3 opacity-50 blur-lg" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-violet-400 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
            <span className="text-white font-bold text-[6cqw] font-mono">IH</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-[14cqw] leading-none font-bold tracking-tight text-white mb-[4cqh]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          ISO Hub
        </motion.h1>

        <motion.p 
          className="text-[5cqw] text-zinc-300 max-w-[80cqw] mb-[8cqh] font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          AI + Konsultan Terverifikasi dalam Satu Platform.
        </motion.p>
        
        <motion.div
          className="px-[6cqw] py-[2cqh] rounded-full bg-white text-black font-bold text-[4cqw] tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.3)] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          <span className="relative z-10">Mulai Sertifikasi Anda.</span>
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2, delay: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
