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
  const s = useMemo(() => styles(colors), [colors]);

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
    if (isPlaying) await pauseAudio();
    else await resumeAudio();
  };

  // 顶部右上角：播放测试音频
  const playSample = async () => {
    await playNewAudio(require('../assets/audio/sample1.mp3'), 'PlayerView');
  };

  const effectivePos = seeking ? seekingValue : position;
  const safeDuration = Math.max(duration || 0, 1);

  // 圆形占位容器：播放时旋转
  const rotateVal = useRef(new Animated.Value(0)).current;
  const loopRef = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      loopRef.current = Animated.loop(
        Animated.timing(rotateVal, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loopRef.current.start();
    } else {
      if (loopRef.current?.stop) loopRef.current.stop();
    }
    return () => {
      if (loopRef.current?.stop) loopRef.current.stop();
    };
  }, [isPlaying, rotateVal]);

  const spin = rotateVal.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <LinearGradient colors={bgGradient} style={s.root} start={{ x: 0, y: 0 }} end={{ x: 0.2, y: 1 }}>
      {/* 顶部栏 */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn} activeOpacity={0.85}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={playSample} style={s.sampleBtn} activeOpacity={0.85}>
          <Ionicons name="musical-notes" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* 内容 */}
      <View style={s.content}>
        {/* 圆形占位容器（旋转） */}
        <Animated.View style={[s.circleHolder, { transform: [{ rotate: spin }] }]}>
          <View style={s.circleInner}>
            <Ionicons name="musical-notes" size={120} color={colors.accentGold} />
          </View>
        </Animated.View>

        {/* 标题：用 Info 显示 */}
        <View style={s.metaBlock}>
          <Text style={s.mainTitle} numberOfLines={1}>
            {currentAudio?.Info || '正在播放'}
          </Text>
        </View>

        {isLoading && (
          <View style={s.loadingBox}>
            <ActivityIndicator size="large" color={colors.accentViolet} />
            <Text style={s.loadingText}>加载中…</Text>
          </View>
        )}
        {!!error && <Text style={s.errorText}>{error}</Text>}

        {/* 进度条 + 控制区 */}
        <View style={s.playerControls}>
          <View style={s.timeRow}>
            <Text style={s.timeText}>{formatTime(effectivePos)}</Text>
            <Text style={s.timeText}>{formatTime(duration)}</Text>
          </View>

          <Slider
            style={s.slider}
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

          <View style={s.controls}>
            <TouchableOpacity style={s.ctrlBtn} onPress={() => skipBackward(15000)} activeOpacity={0.85}>
              <Ionicons name="play-back" size={32} color={colors.text} />
              <Text style={s.ctrlText}>15s</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.playBtn} onPress={onPlayPause} activeOpacity={0.9}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color={colors.textInverse} />
            </TouchableOpacity>

            <TouchableOpacity style={s.ctrlBtn} onPress={() => skipForward(15000)} activeOpacity={0.85}>
              <Ionicons name="play-forward" size={32} color={colors.text} />
              <Text style={s.ctrlText}>15s</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = (c) =>
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
    sampleBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
    },

    content: { flex: 1, width: '100%', alignItems: 'center', paddingTop: 8 },

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
      marginTop: 40,
      shadowColor: c.accentViolet,
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      elevation: 5,
    },
    circleInner: {
      width: '94%',
      height: '94%',
      borderRadius: 9999,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.surface,
    },

    metaBlock: { width: '86%', alignItems: 'center', marginTop: 28, marginBottom: 12 },
    mainTitle: { color: c.text, fontSize: 20, fontWeight: '800' },

    playerControls: { width: '100%', alignItems: 'center', marginTop: 'auto', marginBottom: 80 },
    loadingBox: { alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '40%' },
    loadingText: { color: c.subtext, marginTop: 8 },
    errorText: { color: c.stateError, marginVertical: 8 },

    timeRow: { width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    timeText: { color: c.textMuted, fontVariant: ['tabular-nums'] },

    slider: { width: '90%', height: 40, marginBottom: 20 },

    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '70%',
      marginBottom: 32,
    },
    ctrlBtn: { alignItems: 'center', justifyContent: 'center' },
    ctrlText: { color: c.text, marginTop: 4, fontWeight: '600' },
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
  });
