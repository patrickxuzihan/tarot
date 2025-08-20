// /mnt/data/MiniPlayer.js
import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from './AudioContext';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function MiniPlayer() {
  const { colors } = useAppTheme();
  const s = useMemo(() => styles(colors), [colors]);
  const navigation = useNavigation();

  const {
    currentAudio,
    isPlaying,
    position = 0,
    duration = 1,
    pauseAudio,
    resumeAudio,
  } = useAudio();

  const progress = Math.min(1, Math.max(0, position / duration));
  const title = currentAudio?.title || '暂无播放内容';
  const pageName = currentAudio?.pageName; // 可选的来源页面

  // === Animation: pulse when playing ===
  const pulse = useRef(new Animated.Value(0)).current;
  const loopRef = useRef(null);

  useEffect(() => {
    if (isPlaying && currentAudio) {
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 700, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        ])
      );
      loopRef.current.start();
    } else {
      if (loopRef.current?.stop) loopRef.current.stop();
      pulse.setValue(0);
    }
    return () => {
      if (loopRef.current?.stop) loopRef.current.stop();
    };
  }, [isPlaying, currentAudio, pulse]);

  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] });

  return (
    <View style={s.wrap} pointerEvents="box-none">
      <TouchableOpacity
        activeOpacity={0.9}
        style={s.card}
        onPress={() => navigation.navigate('Player')}
      >
        <View style={s.left}>
          <View style={s.iconWrap}>
            {/* animated halo */}
            <Animated.View
              pointerEvents="none"
              style={[
                s.halo,
                {
                  opacity: pulseOpacity,
                  transform: [{ scale: pulseScale }],
                },
              ]}
            />
            {/* icon */}
            <Ionicons name="musical-notes" size={22} color={colors.accentGold} />
          </View>

          {/* 标题 + 来源页面（可选） */}
          <View style={s.textWrap}>
            <Text numberOfLines={1} style={s.title}>{title}</Text>
            {!!pageName && (
              <Text numberOfLines={1} style={s.subtitle}>来自：{pageName}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={s.playBtn}
          activeOpacity={0.85}
          onPress={isPlaying ? pauseAudio : resumeAudio}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color={colors.textInverse} />
        </TouchableOpacity>

        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = (c) => StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70, // 70(tab) + 8
  },
  card: {
    height: 60,
    backgroundColor: c.miniPlayerBg,
    borderTopWidth: 1,
    borderTopColor: c.surfaceCardBorder,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 6,
    marginBottom: 4,
    overflow: 'hidden',
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  halo: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: c.accentGold,
  },
  textWrap: { marginLeft: 10, maxWidth: '78%' },
  title: { color: c.text, fontWeight: '700' },
  subtitle: { color: c.textMuted, fontSize: 12, marginTop: 2 },
  playBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: c.accentGold, alignItems: 'center', justifyContent: 'center',
    marginLeft: 8,
  },
  progressTrack: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0, height: 3,
    backgroundColor: c.surfaceLine.replace('0.', '1.'),
  },
  progressFill: { height: '100%', backgroundColor: c.accentGold },
});
