import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from './AudioContext';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Slider from '@react-native-community/slider';

const formatTime = (millis = 0) => {
  const total = Math.max(0, Math.floor(millis / 1000));
  const m = Math.floor(total / 60).toString().padStart(2, '0');
  const s = Math.floor(total % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function PlayerView() {
  const navigation = useNavigation();

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

  const playSample = async () => {
    try {
      const asset = Asset.fromModule(require('./sample.mp3'));
      await asset.downloadAsync();
      const uri = asset.localUri || asset.uri;
      await playNewAudio({ uri });
    } catch (e) {
      console.error('加载 sample.mp3 失败:', e);
    }
  };

  const effectivePos = seeking ? seekingValue : position;
  const safeDuration = Math.max(duration || 0, 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {currentAudio?.title || '正在播放'}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        {/* 添加音符Logo */}
        <View style={styles.logoContainer}>
          <Ionicons name="musical-notes" size={120} color="#FFD700" />
        </View>

        {isLoading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>加载中…</Text>
          </View>
        )}

        {!!error && <Text style={styles.errorText}>{error}</Text>}
        
        {/* 包装播放控制部分 */}
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
            minimumTrackTintColor="#FFD700"
            maximumTrackTintColor="rgba(255,255,255,0.3)"
            thumbTintColor="#FFD700"
          />

          <View style={styles.controls}>
            <TouchableOpacity style={styles.ctrlBtn} onPress={() => skipBackward(15000)}>
              <Ionicons name="play-back" size={32} color="#fff" />
              <Text style={styles.ctrlText}>15s</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playBtn} onPress={onPlayPause}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.ctrlBtn} onPress={() => skipForward(15000)}>
              <Ionicons name="play-forward" size={32} color="#fff" />
              <Text style={styles.ctrlText}>15s</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loadBtn} onPress={playSample}>
            <Text style={styles.loadText}>播放测试文件 sample.mp3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 48,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    maxWidth: '70%',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
  },
  logoContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  playerControls: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 50,
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '40%',
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
  },
  errorText: {
    color: '#ff6b6b',
    marginVertical: 8,
  },
  timeRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 4,
  },
  timeText: {
    color: '#bbb',
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
    color: '#fff',
    marginTop: 4,
  },
  playBtn: {
    backgroundColor: '#FFD700',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadBtn: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
  },
  loadText: {
    color: '#fff',
    fontWeight: '600',
  },
});