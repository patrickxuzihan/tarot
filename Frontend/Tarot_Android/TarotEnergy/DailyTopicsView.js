import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function DailyTopicsView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const headerGradient = (gradients && gradients.header) || bgGradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <LinearGradient colors={bgGradient} style={styles.container}>
      {/* 头部 */}
      <LinearGradient colors={headerGradient} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>每日运势</Text>
        <Text style={styles.subtitle}>探索今日的能量指引</Text>
      </LinearGradient>

      {/* 内容 */}
      <View style={styles.content}>
        {/* 占位卡片 */}
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

        {/* 功能栅格 */}
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <Ionicons name="star" size={28} color={colors.accentGold} />
            <Text style={styles.featureTitle}>星座运势</Text>
          </View>

          <View style={styles.featureCard}>
            <Ionicons name="moon" size={28} color={colors.accentViolet} />
            <Text style={styles.featureTitle}>能量提示</Text>
          </View>

          <View style={styles.featureCard}>
            <Ionicons name="calendar" size={28} color={colors.brandPrimary} />
            <Text style={styles.featureTitle}>幸运日</Text>
          </View>

          <View style={styles.featureCard}>
            <Ionicons name="color-palette" size={28} color={colors.accent} />
            <Text style={styles.featureTitle}>幸运色</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: {
      height: 220,
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 60 : 36,
      justifyContent: 'flex-end',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    backButton: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 20 : 12,
      left: 16,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: c.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: c.subtext,
      marginBottom: 24,
    },

    content: { flex: 1, padding: 20, paddingTop: 26 },

    placeholderCard: {
      backgroundColor: c.surfaceCard,
      borderRadius: 20,
      padding: 22,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    placeholderText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: c.text,
      marginBottom: 12,
    },
    placeholderDescription: {
      fontSize: 15,
      color: c.subtext,
      lineHeight: 22,
      marginBottom: 18,
    },
    progressContainer: { alignItems: 'center' },
    progressBar: {
      height: 10,
      width: '100%',
      backgroundColor: c.surfaceLine,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 8,
    },
    progressFill: {
      height: '100%',
      backgroundColor: c.accentViolet,
      borderRadius: 8,
    },
    progressText: { fontSize: 13, color: c.text },

    featureGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    featureCard: {
      width: '48%',
      height: 120,
      backgroundColor: c.surfaceCard,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 14,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    featureTitle: { fontSize: 15, color: c.text, marginTop: 8 },
  });
