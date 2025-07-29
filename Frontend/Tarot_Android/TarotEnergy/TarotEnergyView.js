import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function TarotEnergyScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 顶部标题 */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>塔罗宫能</Text>
        <Text style={styles.subTitle}>探索塔罗的智慧</Text>
      </View>

      {/* 核心功能卡片区域 */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionTitle}>核心功能</Text>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#B266FF' }]}
          onPress={() => navigation.navigate('QuickDivination')}
        >
          <Text style={styles.cardTitle}>快速占卜</Text>
          <Text style={styles.cardSubtitle}>即时指引</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#A25DFE' }]}
          onPress={() => navigation.navigate('DailyTopicsPlaceholder')}
        >
          <Text style={styles.cardTitle}>每日运势</Text>
          <Text style={styles.cardSubtitle}>今日能量</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#804CBF' }]}
          onPress={() => navigation.navigate('PrivateDivinationPlaceholder')}
        >
          <Text style={styles.cardTitle}>私人定制</Text>
          <Text style={styles.cardSubtitle}>专属占卜</Text>
        </TouchableOpacity>
      </View>

      {/* 其他区域可以继续补充为placeholder */}
      <View style={styles.sectionPlaceholder}>
        <Text style={styles.placeholderText}>[进阶功能区域 Placeholder]</Text>
      </View>

      <View style={styles.sectionPlaceholder}>
        <Text style={styles.placeholderText}>[星座运势区域 Placeholder]</Text>
      </View>

      <View style={styles.sectionPlaceholder}>
        <Text style={styles.placeholderText}>[塔罗知识库区域 Placeholder]</Text>
      </View>

      <View style={styles.sectionPlaceholder}>
        <Text style={styles.placeholderText}>[精选塔罗教学区域 Placeholder]</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#260D40'
  },
  contentContainer: {
    paddingBottom: 30,
    paddingHorizontal: 16
  },
  titleContainer: {
    paddingVertical: 30,
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  subTitle: {
    fontSize: 16,
    color: '#DDD',
    marginTop: 8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 16
  },
  cardSection: {
    marginBottom: 30
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#EEE',
    marginTop: 4
  },
  sectionPlaceholder: {
    padding: 30,
    borderRadius: 12,
    backgroundColor: '#3a235e',
    marginBottom: 20
  },
  placeholderText: {
    color: '#aaa',
    textAlign: 'center'
  }
});
