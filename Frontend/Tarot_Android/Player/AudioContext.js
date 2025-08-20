import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // 原有：当前音频信息；现在扩展为可包含来源页面
  // 例如：{ uri, ...其他source字段, pageName: '首页' }
  const [currentAudio, setCurrentAudio] = useState(null);

  const statusCbRef = useRef(null);

  // 音频模式（去掉无效的 interruptionMode 字段）
  const configureAudioMode = useCallback(async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }, []);

  // 统一的播放状态回调（驱动进度实时刷新）
  const onPlaybackStatusUpdate = useCallback((status) => {
    if (!status.isLoaded) {
      if (status.error) setError(`播放错误: ${status.error}`);
      return;
    }
    setDuration(status.durationMillis ?? 0);
    setPosition(status.positionMillis ?? 0);
    setIsPlaying(!!status.isPlaying);
    if (status.didJustFinish) setIsPlaying(false);
  }, []);

  // 装载并播放（新增 pageName 可选参数，用于标注来源页面）
  const playNewAudio = useCallback(
    async (source, pageName) => {
      try {
        setIsLoading(true);
        setError(null);
        await configureAudioMode();

        if (sound) {
          try {
            await sound.unloadAsync();
          } catch {}
        }

        const sourceArg = source?.uri ? { uri: source.uri } : source;

        // 把回调直接传给 createAsync，并设置更新频率
        const { sound: newSound, status } = await Audio.Sound.createAsync(
          sourceArg,
          { shouldPlay: true, progressUpdateIntervalMillis: 250 },
          onPlaybackStatusUpdate
        );

        // 进一步保证（某些平台上更稳定）
        await newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await newSound.setProgressUpdateIntervalAsync(250);

        setSound(newSound);

        // 关键：记录来源页面信息（不破坏原有结构）
        // 如果调用方不传 pageName，保留 undefined 或使用占位
        setCurrentAudio({
          ...(source || {}),
          ...(source?.uri ? {} : {}),
          pageName: pageName || undefined,
        });

        const init = status?.isLoaded ? status : await newSound.getStatusAsync();
        if (init.isLoaded) {
          setDuration(init.durationMillis ?? 0);
          setPosition(init.positionMillis ?? 0);
          setIsPlaying(!!init.isPlaying);
        } else if (init.error) {
          throw new Error(init.error);
        }
      } catch (e) {
        setError(e?.message || '音频加载失败');
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    },
    [sound, configureAudioMode, onPlaybackStatusUpdate]
  );

  const pauseAudio = useCallback(async () => {
    if (!sound) return;
    try {
      await sound.pauseAsync();
      setIsPlaying(false);
    } catch (e) {
      setError(`暂停失败: ${e.message}`);
    }
  }, [sound]);

  const resumeAudio = useCallback(async () => {
    if (!sound) return;
    try {
      await sound.playAsync();
      setIsPlaying(true);
    } catch (e) {
      setError(`继续播放失败: ${e.message}`);
    }
  }, [sound]);

  const skipForward = useCallback(
    async (milliseconds = 15000) => {
      if (!sound) return;
      try {
        const target = Math.min((position ?? 0) + milliseconds, duration ?? 0);
        await sound.setPositionAsync(target);
        setPosition(target);
      } catch (e) {
        setError(`快进失败: ${e.message}`);
      }
    },
    [sound, position, duration]
  );

  const skipBackward = useCallback(
    async (milliseconds = 15000) => {
      if (!sound) return;
      try {
        const target = Math.max((position ?? 0) - milliseconds, 0);
        await sound.setPositionAsync(target);
        setPosition(target);
      } catch (e) {
        setError(`快退失败: ${e.message}`);
      }
    },
    [sound, position]
  );

  const seekTo = useCallback(
    async (millis) => {
      if (!sound) return;
      try {
        const target = Math.min(Math.max(millis || 0, 0), duration || 0);
        await sound.setPositionAsync(target);
        setPosition(target);
      } catch (e) {
        setError(`跳转失败: ${e.message}`);
      }
    },
    [sound, duration]
  );

  // 卸载清理
  useEffect(() => {
    return () => {
      if (sound) {
        try {
          sound.unloadAsync();
        } catch {}
      }
    };
  }, [sound]);

  const value = {
    currentAudio, // 包含可选的 pageName
    isPlaying,
    position,
    duration,
    isLoading,
    error,
    playNewAudio, // 现在可传 pageName：playNewAudio(source, '某页面名')
    pauseAudio,
    resumeAudio,
    skipForward,
    skipBackward,
    seekTo,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio 必须在 AudioProvider 内使用');
  return ctx;
};
