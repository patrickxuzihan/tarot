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

export default function SubscriptionsView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const subs = [
    { title: '高级会员套餐 1', status: '已订阅', statusColor: colors.stateSuccess },
    { title: '高级会员套餐 2', status: '试用中', statusColor: colors.stateWarning },
  ];

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
          <Text style={styles.headerTitle}>我的订阅</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 提示 */}
          <View style={styles.tipWrap(colors)}>
            <Text style={styles.tipText(colors)}>订阅管理开发中...</Text>
          </View>

          {/* 列表 */}
          <View style={{ marginTop: 20 }}>
            {subs.map((item, idx) => (
              <View key={idx} style={styles.itemWrap(colors)}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle(colors)}>{item.title}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: item.statusColor || colors.accent },
                    ]}
                  >
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.divider(colors)} />

                <View style={styles.itemFooter}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                      name="calendar"
                      size={16}
                      color={colors.accentViolet || colors.subtext}
                    />
                    <Text style={styles.dateText(colors)}>
                      有效期至: 2024-12-31
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.actionBtn(colors)}
                  >
                    <Text style={styles.actionText}>
                      {idx === 0 ? '管理' : '升级'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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

    itemWrap: (c) => ({
      backgroundColor: c.surfaceCard,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 12,
      marginBottom: 14,
    }),
    itemHeader: { flexDirection: 'row', alignItems: 'center' },
    itemTitle: (c) => ({
      color: c.text,
      fontSize: 16,
      fontWeight: '600',
      flex: 1,
    }),
    statusPill: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
    },
    statusText: { color: '#fff', fontSize: 12, fontWeight: '500' },
    divider: (c) => ({
      height: 1,
      backgroundColor: c.surfaceLine,
      marginVertical: 8,
    }),
    itemFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dateText: (c) => ({
      color: c.accentViolet || c.subtext,
      fontSize: 12,
      marginLeft: 6,
    }),
    actionBtn: (c) => ({
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: c.accentViolet || c.accent,
    }),
    actionText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  });
