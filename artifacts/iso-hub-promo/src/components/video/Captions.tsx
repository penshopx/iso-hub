import { AnimatePresence, motion } from 'framer-motion';

const SCENE_CAPTIONS: Record<string, string> = {
  hook: "Get ISO certified faster, easier, and more cost-effectively with Indonesia's #1 platform.",
  agents: "Our intelligent AI agents guide you through certification and gap analysis in parallel.",
  generator: "Generate complete compliance documentation in minutes, not months.",
  risk: "Map your enterprise risk surface in real-time with automated tracking.",
  dashboard: "Monitor your audit readiness through a unified command dashboard.",
  outro: "AI and verified consultants in one platform. Start your certification today.",
};

export function Captions({ currentSceneKey }: { currentSceneKey: string }) {
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const text = SCENE_CAPTIONS[baseSceneKey] || "";

  return (
    <div className="absolute bottom-[8vh] left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={baseSceneKey}
          initial={{ opacity: 0, y: "1vh" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-1vh" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-black/75 backdrop-blur-md px-[2vw] py-[1.5vh] rounded-xl border border-white/10 shadow-2xl max-w-[80vw] text-center"
        >
          <p 
            className="text-white/90 text-[2.5vw] leading-snug font-medium tracking-wide drop-shadow-md"
            aria-live="polite"
          >
            {text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
