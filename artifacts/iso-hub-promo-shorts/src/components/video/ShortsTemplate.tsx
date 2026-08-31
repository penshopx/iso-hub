// ShortsTemplate - Refactored to use a single composite audio file
import { useCallback, useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { Scene0_Shorts } from './video_scenes_shorts/Scene0_Shorts';
import { Scene1_Shorts } from './video_scenes_shorts/Scene1_Shorts';
import { Scene2_Shorts } from './video_scenes_shorts/Scene2_Shorts';
import { CaptionsShorts } from './CaptionsShorts';

export const SHORTS_SCENE_DURATIONS: Record<string, number> = {
  hook: 5000,
  agents: 5000,
  outro: 5000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook: Scene0_Shorts,
  agents: Scene1_Shorts,
  outro: Scene2_Shorts,
};

// Target start times in the single 15s composite audio track
const AUDIO_START_SEC: Record<string, number> = {
  hook: 0,
  agents: 5,
  outro: 10,
};

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function ShortsTemplate({
  durations = SHORTS_SCENE_DURATIONS,
  loop = true,
  muted = false,
  hideSubtitles = false,
  onSceneChange,
  onAudioElement, // Single audio element for controls
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
  const sceneIndex = Object.keys(SHORTS_SCENE_DURATIONS).indexOf(baseSceneKey);

  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);

  const handleAudioRef = useCallback(
    (audio: HTMLAudioElement | null) => {
      audioRef.current = audio;
      onAudioElement?.(audio);
    },
    [onAudioElement]
  );

  // Sync composite audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;

    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      
      const targetTime = AUDIO_START_SEC[baseSceneKey] ?? 0;
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
      <div className="w-full h-full overflow-hidden relative bg-[#0a0a0a] @container">
        {/* PERSISTENT BACKGROUND ELEMENTS */}
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
            opacity: sceneIndex === 1 ? 0.6 : 0,
            scale: sceneIndex === 1 ? 1.05 : 1,
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <video
            src={`${import.meta.env.BASE_URL}videos/ai-nodes.webm`}
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
            opacity: sceneIndex === 2 ? 0.5 : 0,
            scale: sceneIndex === 2 ? 1.05 : 1,
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <video
            src={`${import.meta.env.BASE_URL}videos/abstract-tech-bg.webm`}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        {/* Glow Orbs */}
        <motion.div
          className="absolute w-[80cqw] h-[80cqw] rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
          animate={{
            background:
              sceneIndex === 0
                ? 'rgba(59, 130, 246, 0.15)'
                : 'rgba(167, 139, 250, 0.15)',
            x: sceneIndex === 0 ? '-20cqw' : '10cqw',
            y: sceneIndex === 0 ? '-10cqh' : '20cqh',
            scale: sceneIndex === 2 ? 1.5 : 1,
          }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />

        <AnimatePresence mode="sync">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>

        {!hideSubtitles && <CaptionsShorts currentSceneKey={currentSceneKey} />}
      </div>

      <audio
        ref={handleAudioRef}
        src={`${import.meta.env.BASE_URL}audio/composite_audio_shorts.mp3`}
        preload="auto"
        autoPlay
        aria-label="Narasi Bahasa Indonesia"
        muted={muted}
      />
    </>
  );
}