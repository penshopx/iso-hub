import { motion } from 'framer-motion';

export const Scene4 = () => {
  const standards = [
    "ISO 9001", "ISO 14001", "ISO 45001", 
    "ISO 27001", "ISO 37001", "ISO 31000",
    "IATF 16949", "ISO 22000", "ISO 50001"
  ];

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[5vh]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center z-20 mb-12">
        <motion.h2 
          className="text-[5vw] leading-tight font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          9+ ISO Standards.
        </motion.h2>
        <motion.h2 
          className="text-[4vw] leading-tight font-bold text-gradient mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          1 Dashboard.
        </motion.h2>
      </div>

      {/* Standards Orbiting / Grid */}
      <div className="relative w-full max-w-5xl h-[40vh] flex items-center justify-center">
        {/* Center Dashboard Mockup */}
        <motion.div 
          className="absolute z-10 w-[40vw] h-[25vh] glass-panel-light rounded-xl border border-white/10 shadow-2xl flex p-4 gap-4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Dashboard Charts */}
          <div className="w-1/3 h-full rounded-lg border border-white/5 flex items-end p-2 gap-2 justify-between">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={`bar-${i}`}
                className="w-full bg-blue-500/50 rounded-sm"
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 80 + 20}%` }}
                transition={{ duration: 1, delay: 1.5 + (i * 0.1) }}
              />
            ))}
          </div>
          <div className="flex-1 h-full flex flex-col gap-2">
            <div className="h-1/2 w-full rounded-lg border border-white/5 flex items-center p-3">
              <motion.div 
                className="w-12 h-12 rounded-full border-4 border-violet-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="ml-4 flex-1">
                <div className="h-2 w-1/2 bg-white/20 rounded mb-2" />
                <div className="h-2 w-3/4 bg-white/10 rounded" />
              </div>
            </div>
            <div className="h-1/2 w-full rounded-lg border border-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-blue-500/30"
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Orbiting Standards Badges */}
        {standards.map((std, i) => {
          const angle = (i * (360 / standards.length)) * (Math.PI / 180);
          const radiusX = 40; // vw
          const radiusY = 15; // vh
          
          return (
            <motion.div
              key={std}
              className="absolute z-20 px-4 py-2 rounded-full glass-panel border border-white/10 text-white/80 font-mono text-sm shadow-xl"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 1],
                scale: 1,
                x: `calc(${Math.cos(angle) * radiusX}vw)`,
                y: `calc(${Math.sin(angle) * radiusY}vh)`,
              }}
              transition={{ 
                duration: 1.5, 
                delay: 1 + (i * 0.1),
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              {std}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
