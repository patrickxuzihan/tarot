import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from './Setup/ThemesHelper';

export default function CustomizationView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const colorOptions = [colors.accentViolet || colors.brandPrimary, '#3B82F6', '#10B981', '#F59E0B'];

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* 顶部栏 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.85}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>客制化</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 提示 */}
          <View style={styles.tipWrap(colors)}>
            <Text style={styles.tipText(colors)}>客制化功能开发中...</Text>
          </View>

          {/* 塔罗牌背设计 */}
          <Text style={styles.sectionTitle(colors)}>塔罗牌背设计</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
            <View style={{ flexDirection: 'row' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.cardBackWrap}>
                  <View style={styles.cardBack(colors)}>
                    <Ionicons
                      name="medal"
                      size={28}
                      color={i === 0 ? colors.brandPrimary : colors.textMuted}
                    />
                  </View>
                  <Text style={styles.smallLabel(colors)}>{`样式 ${i + 1}`}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* 主题颜色 */}
          <Text style={styles.sectionTitle(colors)}>主题颜色</Text>
          <View style={styles.colorRow}>
            {colorOptions.map((col, idx) => (
              <View key={idx} style={styles.colorDotOuter(idx === 0)}>
                <View style={[styles.colorDot, { backgroundColor: col }]} />
              </View>
            ))}
          </View>

          {/* 界面布局 */}
          <Text style={styles.sectionTitle(colors)}>界面布局</Text>
          <View style={styles.layoutRow}>
            <View style={styles.layoutItem}>
              <View style={styles.layoutMock(colors)} />
              <Text style={styles.smallLabel(colors)}>经典</Text>
            </View>
            <View style={styles.layoutItem}>
              <View style={styles.layoutMock(colors)} />
              <Text style={styles.smallLabel(colors)}>现代</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 6 : 12,
      paddingBottom: 12,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    headerTitle: { color: c.text, fontSize: 20, fontWeight: '700' },

    tipWrap: (c) => ({
      marginTop: 4,
      backgroundColor: c.surfaceCard,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 12,
      alignItems: 'center',
    }),
    tipText: (c) => ({ color: c.textMuted, fontSize: 16 }),

    sectionTitle: (c) => ({
      color: c.accentViolet || c.subtext,
      fontSize: 16,
      fontWeight: '700',
      marginTop: 18,
      marginBottom: 8,
    }),

    // 卡背样式
    cardBackWrap: { alignItems: 'center', marginRight: 14 },
    cardBack: (c) => ({
      width: 100,
      height: 150,
      borderRadius: 10,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    smallLabel: (c) => ({ color: c.text, fontSize: 12, marginTop: 6 }),

    // 颜色选择
    colorRow: { flexDirection: 'row', alignItems: 'center', gap: 15, paddingVertical: 6 },
    colorDotOuter: (active) => ({
      width: 54,
      height: 54,
      borderRadius: 27,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: active ? 2 : 0,
      borderColor: '#FFFFFF',
    }),
    colorDot: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    // 布局选项
    layoutRow: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingVertical: 6 },
    layoutItem: { alignItems: 'center' },
    layoutMock: (c) => ({
      width: 80,
      height: 120,
      borderRadius: 10,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    }),
  });
