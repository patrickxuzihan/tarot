import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const DailyTopicsView = () => {
  const navigation = useNavigation();
  
  return (
    <LinearGradient
      colors={['#0d041d', '#1d0838', '#2d1251']}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(92, 37, 141, 0.8)', 'rgba(58, 35, 94, 0.4)']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.title}>每日运势</Text>
        <Text style={styles.subtitle}>探索今日的能量指引</Text>
      </LinearGradient>
      
      <View style={styles.content}>
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>每日运势功能开发中</Text>
          <Text style={styles.placeholderDescription}>
            我们将为您提供个性化的每日塔罗解读、星座运势和能量提示
          </Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% 完成</Text>
          </View>
        </View>
        
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <Ionicons name="star" size={32} color="#FFD700" />
            <Text style={styles.featureTitle}>星座运势</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Ionicons name="moon" size={32} color="#B266FF" />
            <Text style={styles.featureTitle}>能量提示</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Ionicons name="calendar" size={32} color="#4ECDC4" />
            <Text style={styles.featureTitle}>幸运日</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Ionicons name="color-filter" size={32} color="#FF6B6B" />
            <Text style={styles.featureTitle}>幸运色</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 220,
    padding: 20,
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#D9B3FF',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  placeholderCard: {
    backgroundColor: 'rgba(58, 35, 94, 0.8)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  placeholderDescription: {
    fontSize: 16,
    color: '#D9B3FF',
    lineHeight: 24,
    marginBottom: 25,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    height: 12,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#B266FF',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: 'white',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    height: 130,
    backgroundColor: 'rgba(58, 35, 94, 0.8)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
});

export default DailyTopicsView;