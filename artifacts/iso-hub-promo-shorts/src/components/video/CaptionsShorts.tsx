import { AnimatePresence, motion } from 'framer-motion';

const SCENE_CAPTIONS: Record<string, string> = {
  hook: "Dapatkan sertifikasi ISO lebih cepat, mudah, dan hemat dengan platform #1 di Indonesia.",
  agents: "AI Agents cerdas kami memandu Anda melalui sertifikasi dan analisis gap secara paralel.",
  outro: "AI dan konsultan terverifikasi dalam satu platform. Mulai sertifikasi Anda hari ini.",
};

export function CaptionsShorts({ currentSceneKey }: { currentSceneKey: string }) {
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const text = SCENE_CAPTIONS[baseSceneKey] || "";

  return (
    <div className="absolute bottom-[10cqh] left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={baseSceneKey}
          initial={{ opacity: 0, y: "1cqh" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-1cqh" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-black/75 backdrop-blur-md px-[4cqw] py-[2cqh] rounded-xl border border-white/10 shadow-2xl max-w-[90cqw] text-center"
        >
          <p 
            className="text-white/90 text-[4.5cqw] leading-snug font-medium tracking-wide drop-shadow-md"
            aria-live="polite"
          >
            {text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
