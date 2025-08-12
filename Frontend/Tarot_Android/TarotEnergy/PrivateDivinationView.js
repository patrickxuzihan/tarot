import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function PrivateDivinationView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const headerGradient = (gradients && gradients.header) || bgGradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <LinearGradient colors={bgGradient} style={styles.container}>
      {/* 头部 */}
      <LinearGradient colors={headerGradient} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>私人定制</Text>
        <Text style={styles.subtitle}>专属您的塔罗体验</Text>
      </LinearGradient>

      {/* 内容 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 占位卡片 */}
        <View style={styles.placeholderCard}>
          <Ionicons name="construct" size={48} color={colors.accentViolet} style={styles.icon} />
          <Text style={styles.placeholderTitle}>功能开发中</Text>
          <Text style={styles.placeholderText}>
            我们正在为您打造个性化的塔罗体验，包括自定义牌阵、深度解读和专业建议
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
              <Text style={styles.featureText}>保存个人解读历史</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
              <Text style={styles.featureText}>定制专属牌阵</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
              <Text style={styles.featureText}>深度问题分析</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
              <Text style={styles.featureText}>专业解读建议</Text>
            </View>
          </View>
        </View>

        {/* 定制选项 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>定制选项预览</Text>

          <View style={styles.optionsGrid}>
            <View style={styles.optionCard}>
              <Ionicons name="heart" size={28} color={colors.stateError} />
              <Text style={styles.optionTitle}>情感关系</Text>
            </View>
            <View style={styles.optionCard}>
              <Ionicons name="briefcase" size={28} color={colors.accentGold} />
              <Text style={styles.optionTitle}>事业发展</Text>
            </View>
            <View style={styles.optionCard}>
              <Ionicons name="cash" size={28} color={colors.accent} />
              <Text style={styles.optionTitle}>财富运势</Text>
            </View>
            <View style={styles.optionCard}>
              <Ionicons name="school" size={28} color={colors.brandPrimary} />
              <Text style={styles.optionTitle}>个人成长</Text>
            </View>
          </View>
        </View>

        {/* 通知条 */}
        <View style={styles.notification}>
          <Ionicons name="notifications" size={22} color={colors.accentGold} />
          <Text style={styles.notificationText}>功能上线时将第一时间通知您</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: {
      height: 200,
      paddingHorizontal: 20,
      paddingBottom: 18,
      paddingTop: Platform.OS === 'ios' ? 56 : 36,
      justifyContent: 'flex-end',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    backButton: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 18 : 12,
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
    title: { fontSize: 30, fontWeight: 'bold', color: c.text, marginBottom: 6 },
    subtitle: { fontSize: 16, color: c.subtext },

    content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },

    placeholderCard: {
      backgroundColor: c.surfaceCard,
      borderRadius: 20,
      padding: 22,
      alignItems: 'center',
      marginBottom: 22,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    icon: { marginBottom: 14 },
    placeholderTitle: { fontSize: 22, fontWeight: 'bold', color: c.text, marginBottom: 10, textAlign: 'center' },
    placeholderText: { fontSize: 15, color: c.subtext, lineHeight: 22, textAlign: 'center', marginBottom: 16 },

    featureList: { width: '100%' },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.surfaceLine,
    },
    featureText: { fontSize: 15, color: c.text, marginLeft: 12 },

    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: c.subtext, marginBottom: 12 },

    optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    optionCard: {
      width: '48%',
      height: 110,
      backgroundColor: c.surfaceCard,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    optionTitle: { fontSize: 14, color: c.text, marginTop: 8 },

    notification: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.surfaceGlass,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: c.surfaceLine,
    },
    notificationText: { fontSize: 14, color: c.text, marginLeft: 12, flex: 1 },
  });
