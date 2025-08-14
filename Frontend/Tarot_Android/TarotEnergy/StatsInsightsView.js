import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const METRICS = [
  { id: 'reads', title: '占卜次数', value: '-', icon: 'stats-chart' },
  { id: 'avg', title: '平均用时', value: '-', icon: 'time' },
  { id: 'fav', title: '最常用牌阵', value: '-', icon: 'grid' },
  { id: 'mood', title: '本周情绪均值', value: '-', icon: 'happy' },
];

export default function StatsInsightsView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const renderMetric = ({ item }) => (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: colors.brandPrimary }]}>
        <Ionicons name={item.icon} size={18} color={colors.textInverse} />
      </View>
      <Text style={styles.metricTitle}>{item.title}</Text>
      <Text style={styles.metricValue}>{item.value}</Text>
    </View>
  );

  return (
    <LinearGradient colors={bgGradient} style={styles.flex}>
      <SafeAreaView />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>数据洞察</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        data={METRICS}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderMetric}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>数据洞察 - 功能开发中</Text>
            <Text style={styles.headerSub}>完成几次占卜后，将为你展示统计与趋势</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.placeholderPanel}>
            <Ionicons name="analytics" size={22} color={colors.accentGold} />
            <Text style={styles.panelTitle}>即将上线</Text>
            <Text style={styles.panelDesc}>牌阵偏好、能量走势、主题词云等可视化分析</Text>
          </View>
        }
      />
    </LinearGradient>
  );
}

const CARD_W = '48%';

const getStyles = (c) =>
  StyleSheet.create({
    flex: { flex: 1 },
    topBar: {
      height: 48, flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 12, marginTop: 6,
    },
    backBtn: {
      width: 40, height: 40, borderRadius: 20,
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: c.surfaceGlass,
    },
    topTitle: { flex: 1, textAlign: 'center', color: c.text, fontSize: 18, fontWeight: '700' },
    rightPlaceholder: { width: 40 },

    container: { padding: 16, paddingTop: 20 },
    header: { marginBottom: 12, alignItems: 'center' },
    headerTitle: { fontSize: 20, color: c.text, fontWeight: '700', marginBottom: 6 },
    headerSub: { fontSize: 14, color: c.subtext, textAlign: 'center' },

    metricCard: {
      width: CARD_W, backgroundColor: c.surfaceCard, borderRadius: 16,
      padding: 14, marginVertical: 6, borderWidth: 1, borderColor: c.surfaceCardBorder,
    },
    metricIcon: {
      width: 34, height: 34, borderRadius: 17,
      alignItems: 'center', justifyContent: 'center', marginBottom: 8,
    },
    metricTitle: { color: c.subtext, fontSize: 13 },
    metricValue: { color: c.text, fontSize: 20, fontWeight: '700', marginTop: 2 },

    placeholderPanel: {
      backgroundColor: c.surfaceCard, borderRadius: 16, padding: 16, marginTop: 14,
      borderWidth: 1, borderColor: c.surfaceCardBorder, alignItems: 'center',
    },
    panelTitle: { color: c.text, fontSize: 16, fontWeight: '700', marginTop: 8 },
    panelDesc: { color: c.subtext, fontSize: 13, marginTop: 4, textAlign: 'center' },
  });
