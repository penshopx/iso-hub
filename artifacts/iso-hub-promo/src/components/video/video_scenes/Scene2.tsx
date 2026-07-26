import { motion } from 'framer-motion';

export const Scene2 = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[10vh]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center z-20 mb-12">
        <motion.h2 
          className="text-[4vw] font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Instant <span className="text-gradient">Document</span> Generation
        </motion.h2>
        <motion.p 
          className="text-[1.5vw] text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Quality Manuals, Procedures & Work Instructions in Minutes
        </motion.p>
      </div>

      {/* Document Generation UI Mockup */}
      <motion.div 
        className="w-[60vw] h-[50vh] glass-panel rounded-2xl flex border-t border-white/20 shadow-2xl relative overflow-hidden"
        initial={{ y: 100, opacity: 0, rotateX: 20 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1000 }}
      >
        {/* Sidebar */}
        <div className="w-1/4 border-r border-white/10 p-6 flex flex-col gap-4 bg-black/40">
          <div className="w-full h-4 rounded bg-white/10 mb-4" />
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-full h-8 rounded bg-white/5 border border-white/5 flex items-center px-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 + (i * 0.1) }}
            >
              <div className="w-3 h-3 rounded-full bg-blue-500/50 mr-3" />
              <div className="w-1/2 h-2 rounded bg-white/20" />
            </motion.div>
          ))}
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 p-8 relative">
          {/* Header */}
          <motion.div 
            className="w-3/4 h-8 rounded bg-white/10 mb-8"
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          {/* Lines of text generating */}
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={`line-${i}`}
                className="h-3 rounded bg-blue-400/20"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${80 - (i * 10)}%`, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 + (i * 0.2) }}
              />
            ))}
          </div>

          {/* AI Generating Indicator */}
          <motion.div 
            className="absolute bottom-8 right-8 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/50 flex items-center gap-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: "spring" }}
          >
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 text-xs font-mono">AI Generating...</span>
          </motion.div>

          {/* Scanning Beam */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[1px]"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: ["0%", "400%", "0%"], opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
