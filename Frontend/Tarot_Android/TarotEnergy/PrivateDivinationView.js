import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const PrivateDivinationView = () => {
  const navigation = useNavigation();
  
  return (
    <LinearGradient
      colors={['#0d041d', '#1d0838', '#2d1251']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.title}>私人定制</Text>
        <Text style={styles.subtitle}>专属您的塔罗体验</Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.placeholderCard}>
          <Ionicons name="construct" size={48} color="#B266FF" style={styles.icon} />
          <Text style={styles.placeholderTitle}>功能开发中</Text>
          <Text style={styles.placeholderText}>
            我们正在为您打造个性化的塔罗体验，包括自定义牌阵、深度解读和专业建议
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
              <Text style={styles.featureText}>保存个人解读历史</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
              <Text style={styles.featureText}>定制专属牌阵</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
              <Text style={styles.featureText}>深度问题分析</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
              <Text style={styles.featureText}>专业解读建议</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>定制选项预览</Text>
          
          <View style={styles.optionsGrid}>
            <View style={styles.optionCard}>
              <Ionicons name="heart" size={32} color="#FF6B6B" />
              <Text style={styles.optionTitle}>情感关系</Text>
            </View>
            <View style={styles.optionCard}>
              <Ionicons name="briefcase" size={32} color="#FFD166" />
              <Text style={styles.optionTitle}>事业发展</Text>
            </View>
            <View style={styles.optionCard}>
              <Ionicons name="cash" size={32} color="#06D6A0" />
              <Text style={styles.optionTitle}>财富运势</Text>
            </View>
            <View style={styles.optionCard}>
              <Ionicons name="school" size={32} color="#118AB2" />
              <Text style={styles.optionTitle}>个人成长</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.notification}>
          <Ionicons name="notifications" size={28} color="#FFD700" />
          <Text style={styles.notificationText}>功能上线时将第一时间通知您</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 180,
    padding: 20,
    justifyContent: 'flex-end',
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
  },
  subtitle: {
    fontSize: 18,
    color: '#D9B3FF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  placeholderCard: {
    backgroundColor: 'rgba(58, 35, 94, 0.8)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#D9B3FF',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 25,
  },
  featureList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    height: 120,
    backgroundColor: 'rgba(58, 35, 94, 0.8)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(179, 102, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  notificationText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
    flex: 1,
  },
});

export default PrivateDivinationView;