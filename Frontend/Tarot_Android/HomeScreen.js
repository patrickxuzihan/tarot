import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const ads = [
    require('./assets/ad1.jpg'),
    require('./assets/ad2.jpg'),
    require('./assets/ad3.jpg')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentAdIndex + 1) % ads.length;
      setCurrentAdIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
    }, 8000);
    return () => clearInterval(interval);
  }, [currentAdIndex]);

  const tarotTopics = ['今日建议', '本周运势', '感情分析', '事业走向'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>梦多塔</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={28} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('我')}>
            <Ionicons name="settings-outline" size={28} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('QuickDivination')}>
        <Text style={styles.cardTitle}>快速占卜</Text>
      </TouchableOpacity>

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

      <View style={styles.topicSection}>
        <Text style={styles.sectionTitle}>每日塔罗话题</Text>
        <View style={styles.topicGrid}>
          {tarotTopics.map((topic, index) => (
            <TouchableOpacity key={index} style={styles.topicCard}>
              <Text style={styles.topicText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#260D40' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 28, color: 'white', fontWeight: 'bold' },
  iconRow: { flexDirection: 'row' },
  icon: { marginLeft: 20 },
  quickCard: { backgroundColor: '#401b6c', height: 160, justifyContent: 'center', alignItems: 'center', margin: 20, borderRadius: 18 },
  cardTitle: { color: 'white', fontSize: 26 },
  carousel: { marginBottom: 24 },
  adImage: { width: screenWidth, height: 200, resizeMode: 'cover' },
  topicSection: { paddingHorizontal: 16 },
  sectionTitle: { fontSize: 22, color: 'white', marginBottom: 16 },
  topicGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  topicCard: { backgroundColor: '#3a235e', width: '48%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginBottom: 24 },
  topicText: { color: 'white', fontSize: 18, textAlign: 'center' }
});
