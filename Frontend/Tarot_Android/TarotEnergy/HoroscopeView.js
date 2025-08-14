import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function HoroscopeView() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;

  const {
    signId = 0,
    signName = '星座',
    icon = 'star',
    color = colors.accentGold,
    score = '-',
  } = route.params || {};

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <LinearGradient colors={bgGradient} style={styles.flex}>
      <SafeAreaView />
      {/* 自定义返回栏 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>星座运势</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>星座运势</Text>

        <View style={[styles.iconCircle, { backgroundColor: colors.surfaceGlass, borderColor: color }]}>
          <Ionicons name={icon} size={72} color={color} />
        </View>

        <Text style={styles.signName}>{signName}</Text>

        <Text style={styles.subtitle}>探索星座的神秘力量与运势</Text>

        <View style={styles.scorePill}>
          <Ionicons name="sparkles" size={16} color={colors.textInverse} />
          <Text style={styles.scoreText}>今日指数 {String(score)}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>功能开发中</Text>
          <Text style={styles.cardDesc}>稍后将为你呈现爱情、事业、财运、健康等详细解读。</Text>
        </View>

        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={18} color={colors.textInverse} />
          <Text style={styles.tipText}>小提示：从首页选择不同星座卡片进入，可传参展示对应信息。</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    flex: { flex: 1 },
    topBar: {
      height: 48,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginTop: 6,
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.surfaceGlass,
    },
    topTitle: { flex: 1, textAlign: 'center', color: c.text, fontSize: 18, fontWeight: '700' },
    rightPlaceholder: { width: 40 },

    container: { paddingHorizontal: 20, paddingTop: 20 },
    heading: { fontSize: 28, fontWeight: '800', color: c.text, textAlign: 'center', marginTop: 8 },
    iconCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 24,
      borderWidth: 2,
    },
    signName: { fontSize: 22, color: c.text, textAlign: 'center', fontWeight: '700' },
    subtitle: {
      fontSize: 16,
      color: c.subtext,
      textAlign: 'center',
      marginTop: 8,
      lineHeight: 22,
    },

    scorePill: {
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: 14,
      backgroundColor: c.brandPrimary,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 16,
    },
    scoreText: { color: c.textInverse, marginLeft: 6, fontSize: 13, fontWeight: '600' },

    card: {
      backgroundColor: c.surfaceCard,
      borderRadius: 16,
      padding: 16,
      marginTop: 22,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    cardTitle: { color: c.text, fontSize: 16, fontWeight: '700', marginBottom: 6 },
    cardDesc: { color: c.subtext, fontSize: 14, lineHeight: 20 },

    tipCard: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 18,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: c.surfaceGlass,
      gap: 8,
    },
    tipText: { color: c.textInverse, fontSize: 12 },
  });
