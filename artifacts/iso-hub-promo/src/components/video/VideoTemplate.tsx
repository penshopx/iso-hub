import { useCallback, useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { Scene0 } from './video_scenes/Scene0';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Captions } from './Captions';

export const SCENE_DURATIONS: Record<string, number> = {
  hook: 5000,
  agents: 6000,
  generator: 6000,
  risk: 6000,
  dashboard: 6000,
  outro: 6000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook: Scene0,
  agents: Scene1,
  generator: Scene2,
  risk: Scene3,
  dashboard: Scene4,
  outro: Scene5,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  hideSubtitles = false,
  onSceneChange,
  onAudioElement,
  onAudioBlocked,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  hideSubtitles?: boolean;
  onSceneChange?: (sceneKey: string) => void;
  onAudioElement?: (audio: HTMLAudioElement | null) => void;
  onAudioBlocked?: () => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);

  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);
  const handleAudioRef = useCallback(
    (audio: HTMLAudioElement | null) => {
      audioRef.current = audio;
      onAudioElement?.(audio);
    },
    [onAudioElement],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
        audio.currentTime = targetTime;
      }
    }
    audio.play().catch(() => {
      if (!muted) onAudioBlocked?.();
    });
  }, [currentSceneKey, baseSceneKey, muted, onAudioBlocked]);

  return (
    <>
      <div className="w-full h-screen overflow-hidden relative bg-[#0a0a0a]">
        {/* PERSISTENT BACKGROUND ELEMENTS */}

        {/* Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-50"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/texture.png)`,
            backgroundSize: 'cover',
          }}
        />

        {/* Cinematic Videos behind content */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            opacity: sceneIndex === 1 || sceneIndex === 2 ? 0.6 : 0,
            scale: sceneIndex === 1 || sceneIndex === 2 ? 1.05 : 1,
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <video
            src={`${import.meta.env.BASE_URL}videos/ai-nodes.mp4`}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            opacity: sceneIndex === 3 || sceneIndex === 4 || sceneIndex === 5 ? 0.5 : 0,
            scale: sceneIndex === 3 || sceneIndex === 4 || sceneIndex === 5 ? 1.05 : 1,
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <video
            src={`${import.meta.env.BASE_URL}videos/abstract-tech-bg.mp4`}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        {/* Glow Orbs */}
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
          animate={{
            background:
              sceneIndex % 2 === 0
                ? 'rgba(59, 130, 246, 0.15)'
                : 'rgba(167, 139, 250, 0.15)',
            x:
              sceneIndex === 0
                ? '-10vw'
                : sceneIndex === 2
                  ? '50vw'
                  : sceneIndex === 4
                    ? '-20vw'
                    : '10vw',
            y: sceneIndex === 0 ? '-10vw' : sceneIndex === 3 ? '40vh' : '-20vh',
            scale: sceneIndex === 5 ? 1.5 : 1,
          }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[30vw] h-[30vw] rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
          animate={{
            background:
              sceneIndex % 2 === 1
                ? 'rgba(59, 130, 246, 0.15)'
                : 'rgba(167, 139, 250, 0.15)',
            x:
              sceneIndex === 0
                ? '70vw'
                : sceneIndex === 1
                  ? '10vw'
                  : sceneIndex === 3
                    ? '60vw'
                    : '40vw',
            y: sceneIndex === 0 ? '50vh' : sceneIndex === 2 ? '-10vh' : '50vh',
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />

        <AnimatePresence mode="sync">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>

        {!hideSubtitles && <Captions currentSceneKey={currentSceneKey} />}
      </div>

      <audio
        ref={handleAudioRef}
        src={`${import.meta.env.BASE_URL}audio/composite_audio.mp3`}
        preload="auto"
        autoPlay
        aria-label="Narasi Bahasa Indonesia"
        muted={muted}
      />
    </>
  );
}
