import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from './Player/AudioContext'; // 引入音频上下文

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const ads = [
    require('./assets/ad/ad1.jpg'),
    require('./assets/ad/ad2.jpg'),
    require('./assets/ad/ad3.jpg')
  ];
  
  // 创建星星动画值
  const starScale = useRef(new Animated.Value(1)).current;
  const starRotation = useRef(new Animated.Value(0)).current;
  const cardGlow = useRef(new Animated.Value(0)).current;

  // 新增：音乐按钮动画值
  const musicScale = useRef(new Animated.Value(1)).current;
  const musicRotation = useRef(new Animated.Value(0)).current;

  // 获取音频播放状态
  const { isPlaying } = useAudio();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentAdIndex + 1) % ads.length;
      setCurrentAdIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
    }, 8000);
    
    // 星星动画循环
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(starScale, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(starScale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(starRotation, {
            toValue: 1,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(starRotation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
    
    // 卡片发光动画循环
    Animated.loop(
      Animated.sequence([
        Animated.timing(cardGlow, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(cardGlow, {
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
    
    return () => {
      clearInterval(interval);
      starRotation.stopAnimation();
      starScale.stopAnimation();
      cardGlow.stopAnimation();
    };
  }, [currentAdIndex]);

  // 新增：音乐按钮动画效果
  useEffect(() => {
    if (isPlaying) {
      // 当有音频播放时，启动动画
      Animated.loop(
        Animated.parallel([
          // 缩放动画
          Animated.sequence([
            Animated.timing(musicScale, {
              toValue: 1.3,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(musicScale, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
          // 旋转动画
          Animated.timing(musicRotation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // 停止动画并重置
      musicScale.stopAnimation();
      musicRotation.stopAnimation();
      musicScale.setValue(1);
      musicRotation.setValue(0);
    }

    return () => {
      // 清理时停止动画
      musicScale.stopAnimation();
      musicRotation.stopAnimation();
    };
  }, [isPlaying]);

  // 旋转动画插值
  const rotateInterpolate = starRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  // 卡片发光插值
  const glowInterpolate = cardGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  // 音乐旋转动画插值
  const musicRotateInterpolate = musicRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // 每日塔罗话题数据
  const dailyTopics = [
    { id: 1, title: "塔罗话题 #1", desc: "探索塔罗牌的深层含义与智慧", time: "1天前" },
    { id: 2, title: "塔罗话题 #2", desc: "如何解读正位与逆位", time: "2天前" },
    { id: 3, title: "塔罗话题 #3", desc: "大阿卡那与小阿卡那的关系", time: "3天前" },
    { id: 4, title: "塔罗话题 #4", desc: "愚者之旅：从0到21的旅程", time: "4天前" },
    { id: 5, title: "塔罗话题 #5", desc: "恋人牌的多重象征意义", time: "5天前" },
    { id: 6, title: "塔罗话题 #6", desc: "命运之轮的周期性解读", time: "6天前" },
    { id: 7, title: "塔罗话题 #7", desc: "隐士的内在探索指南", time: "7天前" },
    { id: 8, title: "塔罗话题 #8", desc: "审判牌的灵性觉醒意义", time: "8天前" },
    { id: 9, title: "塔罗话题 #9", desc: "世界牌的圆满与循环", time: "9天前" },
    { id: 10, title: "塔罗话题 #10", desc: "初学者如何选择第一副塔罗牌", time: "10天前" }
  ];
  
  const topicIcons = ["heart", "star", "moon", "sunny", "sparkles"];
  const topicColors = [
    '#6a359c', // 紫色
    '#8a4dbd', // 亮紫色
    '#5e3cb3', // 蓝紫色
    '#4527a0'  // 深紫色
  ];

  const handleTopicPress = (id) => {
    console.log(`点击了话题 #${id}`);
    // 实际项目中这里会导航到具体话题页面
    // navigation.navigate('TopicDetail', { topicId: id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#401b6c' }}>
      {/* 顶部Header栏 */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          {/* 左侧月亮图标 */}
          <View style={styles.moonIconContainer}>
            <Ionicons name="moon" size={28} color="white" style={styles.moonIcon} />
          </View>
          
          {/* 标题区域 */}
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>梦多塔</Text>
            <Text style={styles.subtitle}>你的塔罗未必只是塔罗</Text>
          </View>
        </View>
        
        {/* 右侧按钮区域 */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.circleButton}   onPress={() =>navigation.getParent()?.navigate('论坛', {screen: 'Forum',  params: { openNotifications: true }})}>
            <Ionicons name="notifications-outline" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() =>navigation.getParent()?.navigate('我', {screen: 'Account',  params: { openSettings: true }})}>
            <Ionicons name="settings-outline" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('Player')}>
            {/* 音乐按钮动画 */}
            <Animated.View style={{ 
              transform: [
                { scale: musicScale },
                { rotate: musicRotateInterpolate }
              ] 
            }}>
              <Ionicons name="musical-notes" size={24} color="white" style={styles.icon} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* 页面内容 */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* 快速占卜标题 */}
        <View style={styles.sectionHeader}>
          <Ionicons name="flash" size={24} color="#FFD700" style={{ marginRight: 8 }} />
          <Text style={styles.sectionHeaderText}>快速占卜</Text>
        </View>
        
        {/* 快速占卜卡片 - 放大版 */}
        <Animated.View style={[
          styles.quickCardShadow,
          { 
            shadowOpacity: glowInterpolate,
            shadowRadius: Animated.multiply(glowInterpolate, 30),
          }
        ]}>
          <TouchableOpacity 
            style={styles.quickCard} 
            onPress={() => navigation.navigate('QuickDivination')}
            activeOpacity={0.7}
          >
            <Animated.View style={[
              styles.starContainer, 
              { 
                transform: [
                  { scale: starScale },
                  { rotate: rotateInterpolate }
                ] 
              }
            ]}>
              <Ionicons name="star" size={52} color="#FFD700" />
            </Animated.View>
            <Text style={styles.cardTitle}>快速占卜</Text>
            <Text style={styles.hintText}>点击开始神秘占卜</Text>
          </TouchableOpacity>
        </Animated.View>
        
        {/* 特别推荐标题 */}
        <View style={styles.sectionHeader}>
          <Ionicons name="star" size={24} color="#FFD700" style={{ marginRight: 8 }} />
          <Text style={styles.sectionHeaderText}>特别推荐</Text>
        </View>
        
        {/* 轮播图 - 放大版 */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {ads.map((ad, index) => (
            <Image key={index} source={ad} style={styles.adImage} />
          ))}
        </ScrollView>
        
        {/* 每日塔罗话题 */}
        <View style={styles.sectionHeader}>
          <Ionicons name="calendar" size={24} color="#FFD700" style={{ marginRight: 8 }} />
          <Text style={styles.sectionHeaderText}>每日塔罗话题</Text>
          <TouchableOpacity
            style={{ marginLeft: 'auto' }}
            onPress={() =>
              navigation.getParent()?.navigate('塔罗宮能', {
                screen: 'TarotEnergyMain',
                params: { openDailyTopics: true }
              })
            }>
            <Text style={styles.viewAllText}>查看全部</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.topicGrid}>
          {dailyTopics.map((topic, index) => (
            <TouchableOpacity 
              key={topic.id} 
              style={[
                styles.topicCard,
                { backgroundColor: topicColors[index % topicColors.length] }
              ]}
              onPress={() => handleTopicPress(topic.id)}>
              <View style={styles.topicHeader}>
                <View style={styles.topicIcon}>
                  <Ionicons 
                    name={topicIcons[index % topicIcons.length]} 
                    size={20} 
                    color="white" />
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
  );
}

const styles = StyleSheet.create({
  // 顶部Header样式
  headerContainer: {
    backgroundColor: '#4a2179',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#5d2d91',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moonIcon: {
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  headerTitle: { 
    fontSize: 26,  // 增大字号
    color: 'white', 
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: '#D9B3FF',
    fontSize: 16,  // 增大字号
    marginTop: 4,
  },
  iconRow: { 
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  icon: { 
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  
  // 内容区域
  container: { 
    flex: 1, 
    backgroundColor: '#260D40',
    paddingTop: 16,
  },
  
  // 分区标题样式
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionHeaderText: {
    fontSize: 24,  // 增大字号
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(179, 102, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  
  // 快速占卜卡片容器（发光效果）
  quickCardShadow: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    shadowColor: '#D9B3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    elevation: 20,
  },
  
  // 快速占卜卡片（放大）
  quickCard: { 
    backgroundColor: '#4a2179', 
    height: 200,  // 增大高度
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  
  cardTitle: { 
    color: 'white', 
    fontSize: 30,  // 增大字号
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginTop: 12,
  },
  
  // 星星容器
  starContainer: {
    marginBottom: 8,
  },
  
  // 提示文字
  hintText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,  // 增大字号
    marginTop: 12,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  
  // 轮播图（放大）
  carousel: { 
    marginBottom: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,  // 增大高度
  },
  adImage: { 
    width: screenWidth - 32, 
    height: 220,  // 增大高度
    resizeMode: 'cover',
    borderRadius: 16,
  },
  
  // 话题区域
  topicGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  topicCard: { 
    width: '48%', 
    height: 140,  // 增大高度
    justifyContent: 'space-between', 
    borderRadius: 16, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
  },
  
  // 查看全部按钮
  viewAllText: {
    color: '#D9B3FF',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  
  // 话题卡片内部样式
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  topicTitle: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  topicDesc: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    lineHeight: 18,
  }
});