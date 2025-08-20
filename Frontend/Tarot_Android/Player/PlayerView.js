// /mnt/data/PlayerView.js
import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { Asset } from 'expo-asset';

import { useAudio } from './AudioContext';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const formatTime = (millis = 0) => {
  const total = Math.max(0, Math.floor(millis / 1000));
  const m = Math.floor(total / 60).toString().padStart(2, '0');
  const s = Math.floor(total % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function PlayerView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const {
    currentAudio,
    isPlaying,
    position,
    duration,
    isLoading,
    error,
    playNewAudio,
    pauseAudio,
    resumeAudio,
    skipForward,
    skipBackward,
    seekTo,
  } = useAudio();

  const [seekingValue, setSeekingValue] = useState(null);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      navigation.goBack();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [navigation]);

  const onPlayPause = async () => {
    if (isPlaying) {
      await pauseAudio();
    } else {
      await resumeAudio();
    }
  };

  // 播放测试文件
  const playSample = async () => {
    try {
      const asset = Asset.fromModule(require('./sample.mp3'));
      await asset.downloadAsync();
      const uri = asset.localUri || asset.uri;
      await playNewAudio({ uri, title: '示例音乐 · sample.mp3' }, 'PlayerView');
    } catch (e) {
      console.error('加载 sample.mp3 失败:', e);
    }
  };

  const effectivePos = seeking ? seekingValue : position;
  const safeDuration = Math.max(duration || 0, 1);

  // ===== 圆形占位容器 + 播放时旋转 =====
  const rotateVal = useRef(new Animated.Value(0)).current;
  const rotateLoop = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      // 连续旋转（8秒一圈）
      rotateLoop.current = Animated.loop(
        Animated.timing(rotateVal, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      rotateLoop.current.start();
    } else {
      // 暂停旋转
      if (rotateLoop.current?.stop) rotateLoop.current.stop();
    }
    return () => {
      if (rotateLoop.current?.stop) rotateLoop.current.stop();
    };
  }, [isPlaying, rotateVal]);

  // 将 0~1 映射为 0~360deg
  const spin = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient colors={bgGradient} style={styles.root} start={{ x: 0, y: 0 }} end={{ x: 0.2, y: 1 }}>
      {/* 顶部栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.85}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ width: 24 }} />
      </View>

      {/* 内容 */}
      <View style={styles.content}>
        <Animated.View style={[styles.circleHolder, { transform: [{ rotate: spin }] }]}>
          <View style={styles.circleInner}>
            <Ionicons name="musical-notes" size={120} color={colors.accentGold} />
          </View>
        </Animated.View>

        {/* 标题 + 来源页面（两行） */}
        <View style={styles.metaBlock}>
          <Text style={styles.mainTitle} numberOfLines={1}>
            {currentAudio?.title || '正在播放'}
          </Text>
          {!!currentAudio?.pageName && (
            <Text style={styles.subTitle} numberOfLines={1}>
              来自：{currentAudio.pageName}
            </Text>
          )}
        </View>

        {isLoading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.accentViolet} />
            <Text style={styles.loadingText}>加载中…</Text>
          </View>
        )}

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        {/* 进度条 + 控制区 */}
        <View style={styles.playerControls}>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(effectivePos)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={safeDuration}
            value={effectivePos}
            onSlidingStart={() => {
              setSeeking(true);
              setSeekingValue(position);
            }}
            onValueChange={(v) => setSeekingValue(v)}
            onSlidingComplete={(v) => {
              setSeeking(false);
              setSeekingValue(null);
              seekTo(v);
            }}
            minimumTrackTintColor={colors.accentGold}
            maximumTrackTintColor={colors.surfaceLine}
            thumbTintColor={colors.accentGold}
          />

          <View style={styles.controls}>
            <TouchableOpacity style={styles.ctrlBtn} onPress={() => skipBackward(15000)} activeOpacity={0.85}>
              <Ionicons name="play-back" size={32} color={colors.text} />
              <Text style={styles.ctrlText}>15s</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playBtn} onPress={onPlayPause} activeOpacity={0.9}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color={colors.textInverse} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.ctrlBtn} onPress={() => skipForward(15000)} activeOpacity={0.85}>
              <Ionicons name="play-forward" size={32} color={colors.text} />
              <Text style={styles.ctrlText}>15s</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loadBtn} onPress={playSample} activeOpacity={0.9}>
            <Text style={styles.loadText}>播放测试文件 sample.mp3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    root: { flex: 1 },
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 48,
      paddingBottom: 12,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
    },

    content: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      paddingTop: 8,
    },

    // 圆形占位容器（外圈）
    circleHolder: {
      width: '68%',
      aspectRatio: 1,
      borderRadius: 9999,
      backgroundColor: c.surfaceCard,
      borderWidth: 2,
      borderColor: c.surfaceCardBorder,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginTop: 8,
      shadowColor: c.accentViolet,
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      elevation: 5,
    },
    // 内圈（固定不旋转，用于包裹占位图标；若未来要整张封面旋转，可把图标直接放到 circleHolder 内）
    circleInner: {
      width: '94%',
      height: '94%',
      borderRadius: 9999,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.surface,
    },

    // 两行元信息
    metaBlock: {
      width: '86%',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 12,
    },
    mainTitle: {
      color: c.text,
      fontSize: 20,
      fontWeight: '800',
    },
    subTitle: {
      color: c.textMuted,
      fontSize: 12,
      marginTop: 6,
    },

    playerControls: {
      width: '100%',
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 40,
    },
    loadingBox: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '40%',
    },
    loadingText: {
      color: c.subtext,
      marginTop: 8,
    },
    errorText: {
      color: c.stateError,
      marginVertical: 8,
    },
    timeRow: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    timeText: {
      color: c.textMuted,
      fontVariant: ['tabular-nums'],
    },
    slider: {
      width: '90%',
      height: 40,
      marginBottom: 20,
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '70%',
      marginBottom: 20,
    },
    ctrlBtn: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    ctrlText: {
      color: c.text,
      marginTop: 4,
      fontWeight: '600',
    },
    playBtn: {
      backgroundColor: c.accentGold,
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: c.accentViolet,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 12,
      elevation: 6,
    },
    loadBtn: {
      marginTop: 24,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.surfaceLine,
    },
    loadText: {
      color: c.text,
      fontWeight: '700',
    },
  });
