import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from './AudioContext';
import * as FileSystem from 'expo-file-system'; // 用于处理文件路径
import { Asset } from 'expo-asset'; // 正确导入 Asset

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
    skipBackward
  } = useAudio();

  // 处理返回按钮（导航回退）
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true; // 阻止默认返回行为
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  // 修复后的测试音频播放函数
  const playTestAudio = async () => {
    try {
      // 使用 expo-asset 正确加载本地资源
      const asset = Asset.fromModule(require('./sample.mp3'));
      
      // 确保资源已下载
      if (!asset.localUri) {
        await asset.downloadAsync();
      }
      
      // 播放本地文件
      playNewAudio({ 
        uri: asset.localUri,
        title: '测试音频',
        artist: '梦多塔'
      });
    } catch (e) {
      console.error('测试音频加载失败', e);
    }
  };

  // 格式化时间为分钟:秒
  const formatTime = (milliseconds) => {
    if (isNaN(milliseconds) || milliseconds === null) return '0:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // 计算进度条百分比
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* 返回按钮 */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* 播放器内容 */}
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFD700" />
            <Text style={styles.loadingText}>加载音频中...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
            <Text style={styles.errorText}>播放失败: {error}</Text>
            
            {/* 添加错误处理按钮 */}
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={playTestAudio}
            >
              <Text style={styles.retryText}>重试</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.title}>正在播放</Text>
            <Text style={styles.subtitle}>
              {currentAudio?.title || '未知音频'}
            </Text>
            
            {/* 音频信息 */}
            {currentAudio?.artist && (
              <Text style={styles.artistText}>{currentAudio.artist}</Text>
            )}
            
            {/* 进度条 */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            
            {/* 时间显示 */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
            
            {/* 控制按钮 */}
            <View style={styles.controls}>
              <TouchableOpacity 
                onPress={() => skipBackward(15000)} 
                style={styles.controlButton}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name="play-back" 
                  size={32} 
                  color="white" 
                />
                <Text style={styles.controlText}>
                  -15s
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={isPlaying ? pauseAudio : resumeAudio} 
                style={styles.playButton}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={isPlaying ? "pause" : "play"} 
                  size={40} 
                  color="black" 
                  style={isPlaying ? {} : { marginLeft: 4 }}
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => skipForward(15000)} 
                style={styles.controlButton}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name="play-forward" 
                  size={32} 
                  color="white" 
                />
                <Text style={styles.controlText}>
                  +15s
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* 测试按钮 */}
            <TouchableOpacity 
              style={styles.testButton}
              onPress={playTestAudio}
              activeOpacity={0.7}
            >
              <Ionicons name="musical-notes" size={24} color="#FFD700" />
              <Text style={styles.testButtonText}>播放测试音频</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401b6c',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#FFD700',
    fontSize: 18,
    marginTop: 20,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#D9B3FF',
    marginBottom: 10,
  },
  artistText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  playButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  controlText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
  // 测试按钮样式
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 53, 156, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  testButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  // 重试按钮样式
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  retryText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  }
});