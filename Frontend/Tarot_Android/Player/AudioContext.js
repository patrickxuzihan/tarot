import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';

const Ctx = createContext(null);

export const AudioProvider = ({ children }) => {
  // 播放器，状态刷新间隔 0.25s
  const player = useAudioPlayer(null, 0.25);
  const status = useAudioPlayerStatus(player);

  const [currentAudio, setCurrentAudio] = useState(null); // { Info?: string, ...source }
  const [error, setError] = useState(null);
  const [uiLoading, setUiLoading] = useState(false);      // 仅用于UI展示的“加载中”

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  }, []);

  // 约定：playNewAudio(source, Info)
  const playNewAudio = useCallback(
    async (source, Info) => {
      try {
        setError(null);
        setUiLoading(true);
        await player.replace(source ?? null);
        setCurrentAudio({
          ...(typeof source === 'object' ? source : {}),
          Info,
        });
        player.play();
      } catch (e) {
        setError(e?.message || '音频加载失败');
        setUiLoading(false);
      }
    },
    [player]
  );

  const pauseAudio = useCallback(() => player.pause(), [player]);
  const resumeAudio = useCallback(() => player.play(), [player]);

  const seekTo = useCallback(
    async (millis) => {
      const sec = Math.max(0, (millis || 0) / 1000);
      await player.seekTo(sec);
    },
    [player]
  );

  const skipForward = useCallback(
    async (ms = 15000) => {
      const cur = status?.currentTime ?? 0;
      const dur = status?.duration ?? 0;
      await player.seekTo(Math.min(cur + ms / 1000, dur || cur + ms / 1000));
    },
    [player, status?.currentTime, status?.duration]
  );

  const skipBackward = useCallback(
    async (ms = 15000) => {
      const cur = status?.currentTime ?? 0;
      await player.seekTo(Math.max(cur - ms / 1000, 0));
    },
    [player, status?.currentTime]
  );

  // 侦测进入可播放 → 结束“加载中”
  useEffect(() => {
    if (!uiLoading) return;
    const playing = !!status?.playing;
    const hasDur = (status?.duration ?? 0) > 0;
    const hasPos = (status?.currentTime ?? 0) > 0;
    const buffering = !!status?.isBuffering;
    if (playing || hasDur || hasPos || !buffering) setUiLoading(false);
  }, [uiLoading, status?.playing, status?.duration, status?.currentTime, status?.isBuffering]);

  const ctx = useMemo(
    () => ({
      isPlaying: !!status?.playing,
      isLoading: !!currentAudio && uiLoading,
      position: Math.max(0, Math.round((status?.currentTime ?? 0) * 1000)),
      duration: Math.max(0, Math.round((status?.duration ?? 0) * 1000)),
      error,
      currentAudio,
      playNewAudio,
      pauseAudio,
      resumeAudio,
      seekTo,
      skipForward,
      skipBackward,
    }),
    [status, currentAudio, uiLoading, error, playNewAudio, pauseAudio, resumeAudio, seekTo, skipForward, skipBackward]
  );

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
};

export const useAudio = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAudio must be used within AudioProvider');
  return v;
};
