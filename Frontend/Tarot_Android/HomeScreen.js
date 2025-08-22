import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAudio } from './Player/AudioContext';
import { useAppTheme } from './Account/Setup/ThemesHelper';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // 更新后的 ads 数据
  const ads = [
    {
      image: require('./assets/ad/ad1.jpg'),
      type: 'AdView',
      target: 'AdView',
    },
    {
      image: require('./assets/ad/ad2.jpg'),
      type: 'AdView',
      target: 'AdView',
    },
    {
      image: require('./assets/ad/ad3.jpg'),
      type: 'web',
      target: 'https://rickroll.it',
    },
  ];

  // 动画
  const starScale = useRef(new Animated.Value(1)).current;
  const starRotation = useRef(new Animated.Value(0)).current;
  const cardGlow = useRef(new Animated.Value(0)).current;
  const musicScale = useRef(new Animated.Value(1)).current;
  const musicRotation = useRef(new Animated.Value(0)).current;

  const { isPlaying } = useAudio();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentAdIndex + 1) % ads.length;
      setCurrentAdIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
    }, 8000);

    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(starScale, { toValue: 1.2, duration: 800, useNativeDriver: true }),
          Animated.timing(starScale, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(starRotation, { toValue: 1, duration: 1600, useNativeDriver: true }),
          Animated.timing(starRotation, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(cardGlow, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(cardGlow, { toValue: 0.6, duration: 2000, useNativeDriver: false }),
      ])
    ).start();

    return () => {
      clearInterval(interval);
      starRotation.stopAnimation();
      starScale.stopAnimation();
      cardGlow.stopAnimation();
    };
  }, [currentAdIndex]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(musicScale, { toValue: 1.3, duration: 800, useNativeDriver: true }),
            Animated.timing(musicScale, { toValue: 1, duration: 800, useNativeDriver: true }),
          ]),
          Animated.timing(musicRotation, { toValue: 1, duration: 3000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      musicScale.stopAnimation();
      musicRotation.stopAnimation();
      musicScale.setValue(1);
      musicRotation.setValue(0);
    }
    return () => {
      musicScale.stopAnimation();
      musicRotation.stopAnimation();
    };
  }, [isPlaying]);

  const rotateInterpolate = starRotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const glowInterpolate = cardGlow.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  const dailyTopics = [
    { id: 1, title: '塔罗话题 #1', desc: '探索塔罗牌的深层含义与智慧', time: '1天前' },
    { id: 2, title: '塔罗话题 #2', desc: '如何解读正位与逆位', time: '2天前' },
    { id: 3, title: '塔罗话题 #3', desc: '大阿卡那与小阿卡那的关系', time: '3天前' },
    { id: 4, title: '塔罗话题 #4', desc: '愚者之旅：从0到21的旅程', time: '4天前' },
    { id: 5, title: '塔罗话题 #5', desc: '恋人牌的多重象征意义', time: '5天前' },
    { id: 6, title: '塔罗话题 #6', desc: '命运之轮的周期性解读', time: '6天前' },
    { id: 7, title: '塔罗话题 #7', desc: '隐士的内在探索指南', time: '7天前' },
    { id: 8, title: '塔罗话题 #8', desc: '审判牌的灵性觉醒意义', time: '8天前' },
    { id: 9, title: '塔罗话题 #9', desc: '世界牌的圆满与循环', time: '9天前' },
    { id: 10, title: '塔罗话题 #10', desc: '初学者如何选择第一副塔罗牌', time: '10天前' },
  ];
  const topicIcons = ['heart', 'star', 'moon', 'sunny', 'sparkles'];

  const handleTopicPress = (id) => {
    console.log(`点击了话题 #${id}`);
  };

  // 点击广告的处理逻辑
  const handleAdPress = (ad) => {
    if (ad.type === 'AdView') {
      navigation.navigate('AdView', { image: ad.image });
    } else if (ad.type === 'web') {
      navigation.navigate('WebView', { url: ad.target });
    }
  };

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        {/* 顶部 Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <View style={styles.moonIconContainer}>
              <Ionicons name="moon" size={28} color={colors.text} style={styles.moonIcon} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>梦多塔</Text>
              <Text style={styles.subtitle}>你的塔罗未必只是塔罗</Text>
            </View>
          </View>

          {/* 右侧按钮 */}
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() =>
                navigation.getParent()?.navigate('论坛', {
                  screen: 'Forum',
                  params: { openNotifications: true },
                })
              }
            >
              <Ionicons name="notifications-outline" size={24} color={colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() =>
                navigation.getParent()?.navigate('我', {
                  screen: 'Account',
                  params: { openSettings: true },
                })
              }
            >
              <Ionicons name="settings-outline" size={24} color={colors.text} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 页面内容 */}
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* 快速占卜标题 */}
          <View style={styles.sectionHeader}>
            <Ionicons name="flash" size={24} color={colors.accentGold} style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderText}>快速占卜</Text>
          </View>

          {/* 快速占卜卡片 */}
          <Animated.View
            style={[
              styles.quickCardShadow,
              {
                shadowOpacity: glowInterpolate,
                shadowRadius: Animated.multiply(glowInterpolate, 30),
              },
            ]}
          >
            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.7}
              onPress={() =>
                navigation.getParent()?.navigate('塔罗宮能', {
                  screen: 'TarotEnergyMain',
                  params: {
                    openQuickDivination: true,
                  },
                })
              }
            >
              <Animated.View
                style={[
                  styles.starContainer,
                  {
                    transform: [{ scale: starScale }, { rotate: rotateInterpolate }],
                  },
                ]}
              >
                <Ionicons name="star" size={52} color={colors.accentGold} />
              </Animated.View>
              <Text style={styles.cardTitle}>快速占卜</Text>
              <Text style={styles.hintText}>点击开始神秘占卜</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* 特别推荐标题 */}
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color={colors.accentGold} style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderText}>特别推荐</Text>
          </View>

          {/* 轮播图 */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {ads.map((ad, index) => (
              <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => handleAdPress(ad)}>
                <Image source={ad.image} style={styles.adImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 每日塔罗话题 */}
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={24} color={colors.accentGold} style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderText}>每日塔罗话题</Text>
            <TouchableOpacity
              style={{ marginLeft: 'auto' }}
              onPress={() =>
                navigation.getParent()?.navigate('塔罗宮能', {
                  screen: 'TarotEnergyMain',
                  params: { openDailyTopics: true },
                })
              }
            >
              <Text style={styles.viewAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.topicGrid}>
            {dailyTopics.map((topic, index) => (
              <TouchableOpacity key={topic.id} style={styles.topicCard} onPress={() => handleTopicPress(topic.id)}>
                <View style={styles.topicHeader}>
                  <View style={styles.topicIcon}>
                    <Ionicons name={topicIcons[index % topicIcons.length]} size={20} color={colors.text} />
                  </View>
                  <Text style={styles.topicTime}>{topic.time}</Text>
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc}>{topic.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: c.headerBg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.surfaceLine,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 10,
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    moonIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    moonIcon: {
      textShadowColor: 'rgba(255,255,255,0.35)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 8,
    },
    titleContainer: { justifyContent: 'center' },
    headerTitle: {
      fontSize: 26,
      color: c.text,
      fontWeight: 'bold',
      textShadowColor: 'rgba(255,255,255,0.35)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 8,
    },
    subtitle: { color: c.subtext, fontSize: 16, marginTop: 4 },
    iconRow: { flexDirection: 'row', alignItems: 'center' },
    circleButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    },
    icon: {
      textShadowColor: 'rgba(255,255,255,0.25)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 5,
    },
    container: { flex: 1, backgroundColor: 'transparent', paddingTop: 16 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
    sectionHeaderText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: c.text,
      textShadowColor: 'rgba(179,102,255,0.35)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 5,
    },
    quickCardShadow: {
      marginHorizontal: 16,
      marginVertical: 16,
      borderRadius: 20,
      shadowColor: c.accentViolet,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      elevation: 20,
    },
    quickCard: {
      backgroundColor: c.headerBg,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
    },
    cardTitle: {
      color: c.text,
      fontSize: 30,
      fontWeight: 'bold',
      textShadowColor: 'rgba(255,255,255,0.4)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      marginTop: 12,
    },
    starContainer: { marginBottom: 8 },
    hintText: { color: c.subtext, fontSize: 18, marginTop: 12 },
    carousel: { marginBottom: 24, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', height: 220 },
    adImage: { width: screenWidth - 32, height: 220, resizeMode: 'cover', borderRadius: 16 },
    topicGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    topicCard: {
      width: '48%',
      height: 140,
      justifyContent: 'space-between',
      borderRadius: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 12,
      backgroundColor: c.surfaceCard,
    },
    viewAllText: { color: c.subtext, fontSize: 16, fontWeight: '500', paddingHorizontal: 8 },
    topicHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    topicIcon: {
      backgroundColor: c.surfaceGlass,
      borderRadius: 12,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topicTime: { color: c.text, opacity: 0.7, fontSize: 12 },
    topicTitle: {
      color: c.text,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
      textShadowColor: 'rgba(255,255,255,0.2)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 3,
    },
    topicDesc: { color: c.subtext, fontSize: 13, lineHeight: 18 },
  });
