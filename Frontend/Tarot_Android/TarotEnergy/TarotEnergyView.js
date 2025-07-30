import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// 星座数据
const zodiacSigns = [
  { id: 1, name: '白羊', icon: 'moon', color: '#FF6B6B' },
  { id: 2, name: '金牛', icon: 'leaf', color: '#4ECDC4' },
  { id: 3, name: '双子', icon: 'cloudy', color: '#45B7D1' },
  { id: 4, name: '巨蟹', icon: 'water', color: '#FFA94D' },
  { id: 5, name: '狮子', icon: 'sunny', color: '#9C89B8' },
  { id: 6, name: '处女', icon: 'flower', color: '#F0A500' },
  { id: 7, name: '天秤', icon: 'scale', color: '#D9B3FF' },
  { id: 8, name: '天蝎', icon: 'bug', color: '#FFD166' },
  { id: 9, name: '射手', icon: 'arrow-up', color: '#06D6A0' },
  { id: 10, name: '摩羯', icon: 'mountain', color: '#118AB2' },
  { id: 11, name: '水瓶', icon: 'snow', color: '#EF476F' },
  { id: 12, name: '双鱼', icon: 'fish', color: '#073B4C' },
];

// 塔罗知识数据
const tarotKnowledge = [
  { id: 1, title: '塔罗起源', content: '塔罗牌起源于15世纪的意大利，最初作为纸牌游戏使用，后来发展为占卜工具。', icon: 'hourglass' },
  { id: 2, title: '大阿卡纳', content: '22张大阿卡纳牌代表人生的重要课题和精神旅程，每张牌都有深刻的象征意义。', icon: 'star' },
  { id: 3, title: '牌阵意义', content: '不同的牌阵揭示不同层面的信息，三牌阵适合快速占卜，凯尔特十字适合深度分析。', icon: 'grid' },
];

export default function TarotEnergyScreen() {
  const navigation = useNavigation();
  
  // 创建卡片发光动画效果
  const glowAnimations = {
    quick: useRef(new Animated.Value(0.5)).current,
    daily: useRef(new Animated.Value(0.5)).current,
    private: useRef(new Animated.Value(0.5)).current,
  };
  
  // 创建声音图标动画效果
  const soundAnimations = {
    daily: useRef(new Animated.Value(1)).current,
    private: useRef(new Animated.Value(1)).current
  };
  
  // 启动动画循环
  useEffect(() => {
    // 卡片发光动画
    const startGlowAnimation = (animation) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: 0.5,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };
    
    // 声音图标呼吸动画
    const startSoundAnimation = (animation) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    
    // 启动所有卡片发光动画
    Object.values(glowAnimations).forEach(animation => {
      startGlowAnimation(animation);
    });
    
    // 启动声音图标动画
    Object.values(soundAnimations).forEach(animation => {
      startSoundAnimation(animation);
    });
    
    return () => {
      // 清理动画
      Object.values(glowAnimations).forEach(animation => {
        animation.stopAnimation();
      });
      Object.values(soundAnimations).forEach(animation => {
        animation.stopAnimation();
      });
    };
  }, []);

  // 渲染星座卡片
  const renderZodiacCard = (sign) => (
    <TouchableOpacity 
      key={sign.id}
      style={styles.zodiacCard}
      onPress={() => navigation.navigate('HoroscopeView')}
    >
      <View style={[styles.zodiacIcon, { backgroundColor: sign.color }]}>
        <Ionicons name={sign.icon} size={28} color="white" />
      </View>
      <Text style={styles.zodiacName}>{sign.name}</Text>
      <View style={styles.zodiacScore}>
        <Text style={styles.zodiacScoreText}>
          {Math.floor(Math.random() * 46) + 55}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  // 渲染塔罗知识卡片
  const renderTarotKnowledgeCard = (item) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.knowledgeCard}
      onPress={() => navigation.navigate('TarotKnowledgeView')}
    >
      <View style={styles.knowledgeIcon}>
        <Ionicons name={item.icon} size={32} color="white" />
      </View>
      <View style={styles.knowledgeContent}>
        <Text style={styles.knowledgeTitle}>{item.title}</Text>
        <Text style={styles.knowledgeDescription}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  // 渲染进阶功能卡片
  const renderAdvancedFunctionCard = (title, description, icon, color) => (
    <TouchableOpacity 
      style={styles.advancedCard}
      onPress={() => navigation.navigate('AdvancedFunctionView')}
    >
      <View style={styles.advancedCardContent}>
        <View style={[styles.advancedIcon, { backgroundColor: color }]}>
          <Ionicons name={icon} size={24} color="white" />
        </View>
        <View style={styles.advancedText}>
          <Text style={styles.advancedTitle}>{title}</Text>
          <Text style={styles.advancedDescription}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#aaa" />
      </View>
    </TouchableOpacity>
  );

  // 渲染教学卡片
  const renderLessonCard = (index) => {
    const colors = ['#B266FF', '#A25DFE', '#804CBF'];
    return (
      <View key={index} style={[styles.lessonCard, { backgroundColor: colors[index % colors.length] }]}>
        <View style={styles.lessonContent}>
          <Text style={styles.lessonTitle}>第 {index} 课：塔罗基础入门</Text>
          <Text style={styles.lessonDescription}>学习正逆位含义与象征</Text>
          <View style={styles.lessonInfo}>
            <Ionicons name="time" size={16} color="white" />
            <Text style={styles.lessonTime}>25分钟</Text>
          </View>
        </View>
        <View style={styles.playButton}>
          <Ionicons name="play-circle" size={40} color="white" />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0d041d', '#1d0838', '#2d1251']}
      locations={[0, 0.6, 1]}
      style={styles.background}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 顶部标题 */}
        <View style={styles.titleContainer}>
          <Animated.Text 
            style={[
              styles.mainTitle,
              {
                textShadowColor: 'rgba(179, 102, 255, 0.9)',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: glowAnimations.quick.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [15, 25]
                })
              }
            ]}
          >
            塔罗宫能
          </Animated.Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subTitle}>探索塔罗的智慧</Text>
            <Animated.View 
              style={[
                styles.underline,
                {
                  width: glowAnimations.quick.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [80, 100]
                  })
                }
              ]} 
            />
          </View>
        </View>

        {/* 核心功能卡片区域 */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>核心功能</Text>
            <Text style={styles.sectionSubtitle}>探索塔罗的智慧</Text>
          </View>

          {/* 快速占卜卡片 */}
          <Animated.View 
            style={[
              styles.glowContainer, 
              { 
                shadowOpacity: glowAnimations.quick,
                shadowRadius: glowAnimations.quick.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [15, 30]
                })
              }
            ]}
          >
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#8A4BFF' }]}
              onPress={() => navigation.navigate('QuickDivination')}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Animated.View 
                    style={[
                      styles.iconBackground,
                      {
                        transform: [{
                          scale: glowAnimations.quick.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: [1, 1.1]
                          })
                        }]
                      }
                    ]}
                  >
                    <Ionicons name="flash" size={32} color="white" />
                  </Animated.View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>快速占卜</Text>
                  <Text style={styles.cardSubtitle}>即时指引</Text>
                </View>
                <Ionicons name="chevron-forward" size={28} color="white" style={styles.arrowIcon} />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* 每日运势卡片 */}
          <Animated.View 
            style={[
              styles.glowContainer, 
              { 
                shadowOpacity: glowAnimations.daily,
                shadowRadius: glowAnimations.daily.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [15, 30]
                })
              }
            ]}
          >
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#7F3DFF' }]}
              onPress={() => navigation.navigate('DailyTopicsPlaceholder')}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Animated.View 
                    style={[
                      styles.iconBackground,
                      {
                        transform: [{
                          scale: glowAnimations.daily.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: [1, 1.1]
                          })
                        }]
                      }
                    ]}
                  >
                    <Ionicons name="calendar" size={32} color="white" />
                  </Animated.View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>每日运势</Text>
                  <Text style={styles.cardSubtitle}>今日能量</Text>
                </View>
                <View style={styles.rightIconsContainer}>
                  <Animated.View style={{ transform: [{ scale: soundAnimations.daily }] }}>
                    <Ionicons name="volume-high" size={28} color="white" style={styles.soundIcon} />
                  </Animated.View>
                  <Ionicons name="chevron-forward" size={28} color="white" style={styles.arrowIcon} />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* 私人定制卡片 */}
          <Animated.View 
            style={[
              styles.glowContainer, 
              { 
                shadowOpacity: glowAnimations.private,
                shadowRadius: glowAnimations.private.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [15, 30]
                })
              }
            ]}
          >
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#5A2F9F' }]}
              onPress={() => navigation.navigate('PrivateDivinationPlaceholder')}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Animated.View 
                    style={[
                      styles.iconBackground,
                      {
                        transform: [{
                          scale: glowAnimations.private.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: [1, 1.1]
                          })
                        }]
                      }
                    ]}
                  >
                    <Ionicons name="person" size={32} color="white" />
                  </Animated.View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>私人定制</Text>
                  <Text style={styles.cardSubtitle}>专属占卜</Text>
                </View>
                <View style={styles.rightIconsContainer}>
                  <Animated.View style={{ transform: [{ scale: soundAnimations.private }] }}>
                    <Ionicons name="volume-high" size={28} color="white" style={styles.soundIcon} />
                  </Animated.View>
                  <Ionicons name="chevron-forward" size={28} color="white" style={styles.arrowIcon} />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* 进阶功能区域 */}
        <View style={styles.sectionContainer}>
          <SectionHeader title="进阶功能" subtitle="深度探索" />
          
          <View style={styles.advancedGrid}>
            {renderAdvancedFunctionCard('牌阵库', '经典牌阵集合', 'diamond', '#B266FF')}
            {renderAdvancedFunctionCard('阅读历史', '回顾往期占卜', 'book', '#A25DFE')}
            {renderAdvancedFunctionCard('数据洞察', '统计与分析', 'stats-chart', '#804CBF')}
            {renderAdvancedFunctionCard('能量笔记', '记录你的体悟', 'document-text', '#5A2F9F')}
          </View>
        </View>

        {/* 星座运势区域 */}
        <View style={styles.sectionContainer}>
          <SectionHeader title="星座运势" subtitle="探索你的星空" />
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.zodiacScroll}
          >
            {zodiacSigns.map(renderZodiacCard)}
          </ScrollView>
        </View>

        {/* 塔罗知识库 */}
        <View style={styles.sectionContainer}>
          <SectionHeader title="塔罗知识库" subtitle="智慧与传承" />
          
          <View style={styles.knowledgeContainer}>
            {tarotKnowledge.map(renderTarotKnowledgeCard)}
          </View>
        </View>

        {/* 精选塔罗教学 */}
        <View style={styles.sectionContainer}>
          <SectionHeader title="塔罗教学" subtitle="精选课程" />
          
          <View style={styles.lessonsContainer}>
            <View style={styles.lessonsCarousel}>
              {[1, 2, 3].map(renderLessonCard)}
            </View>
            
            <View style={styles.smallLessons}>
              <TouchableOpacity style={styles.smallLessonCard}>
                <Ionicons name="star" size={24} color="#FFD700" />
                <Text style={styles.smallLessonTitle}>大阿卡纳</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.smallLessonCard}>
                <Ionicons name="sparkles" size={24} color="#FFD700" />
                <Text style={styles.smallLessonTitle}>小阿卡纳</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.smallLessonCard}>
                <Ionicons name="grid" size={24} color="#FFD700" />
                <Text style={styles.smallLessonTitle}>牌阵指南</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// 分区标题组件
const SectionHeader = ({ title, subtitle }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionSubtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  titleContainer: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 8
  },
  subTitle: {
    fontSize: 18,
    color: '#DDD',
    marginBottom: 8
  },
  underline: {
    height: 4,
    backgroundColor: '#B266FF',
    borderRadius: 2
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(179, 102, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#D9B3FF',
    fontStyle: 'italic',
  },
  cardSection: {
    marginBottom: 40
  },
  glowContainer: {
    marginBottom: 30,
    borderRadius: 25,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
  },
  card: {
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
    height: 150,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  iconContainer: {
    marginRight: 20,
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardSubtitle: {
    fontSize: 18,
    color: '#EEE',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  soundIcon: {
    marginRight: 15,
  },
  arrowIcon: {
    marginLeft: 5,
  },
  
  // 进阶功能区域样式
  advancedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  advancedCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#3a235e',
    borderRadius: 20,
    padding: 15,
  },
  advancedCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advancedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  advancedText: {
    flex: 1,
  },
  advancedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  advancedDescription: {
    fontSize: 14,
    color: '#D9B3FF',
  },
  
  // 星座区域样式
  zodiacScroll: {
    paddingBottom: 10,
  },
  zodiacCard: {
    width: 100,
    height: 140,
    backgroundColor: '#3a235e',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  zodiacIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  zodiacName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  zodiacScore: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  zodiacScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  
  // 塔罗知识库样式
  knowledgeContainer: {
    backgroundColor: '#3a235e',
    borderRadius: 20,
    padding: 16,
  },
  knowledgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  knowledgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5A2F9F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  knowledgeContent: {
    flex: 1,
  },
  knowledgeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  knowledgeDescription: {
    fontSize: 14,
    color: '#D9B3FF',
  },
  
  // 塔罗教学区域样式
  lessonsContainer: {
    backgroundColor: '#3a235e',
    borderRadius: 20,
    padding: 20,
  },
  lessonsCarousel: {
    marginBottom: 20,
  },
  lessonCard: {
    height: 120,
    borderRadius: 15,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  lessonDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonTime: {
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
  },
  playButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallLessons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallLessonCard: {
    width: '30%',
    backgroundColor: '#5A2F9F',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
  },
  smallLessonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
});