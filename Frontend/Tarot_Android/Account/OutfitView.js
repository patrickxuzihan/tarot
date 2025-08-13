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

export default function OutfitView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

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
          <Text style={styles.headerTitle}>装扮</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 提示 */}
          <View style={styles.tipCard(colors)}>
            <Text style={styles.tipText(colors)}>装扮功能开发中...</Text>
          </View>

          {/* 形象预览 */}
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <View style={styles.avatar(colors)}>
              <Ionicons name="person" size={80} color={colors.textInverse} />
              <View style={styles.avatarBadges}>
                <Ionicons name="gift" size={16} color={colors.accentGold} />
                <View style={{ width: 8 }} />
                <Ionicons name="star" size={16} color={colors.accentViolet} />
              </View>
            </View>
          </View>

          {/* 装扮选项（横向） */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 4 }}
          >
            <View style={{ flexDirection: 'row' }}>
              {[0, 1, 2, 3, 4].map((i) => {
                const equipped = i === 0;
                return (
                  <View key={i} style={[styles.itemWrap, { marginRight: 12 }]}>
                    <View style={styles.itemCircle(colors, equipped)}>
                      <Ionicons
                        name={equipped ? 'person' : 'shirt'}
                        size={26}
                        color={equipped ? colors.accentGold : colors.stateInfo}
                      />
                    </View>
                    <Text style={styles.itemLabel(colors)}>
                      {equipped ? '已装备' : `装备 ${i}`}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          {/* 获取更多装扮 */}
          <TouchableOpacity activeOpacity={0.9} style={styles.primaryBtn(colors)}>
            <Text style={styles.primaryLabel(colors)}>获取更多装扮</Text>
          </TouchableOpacity>
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

    tipCard: (c) => ({
      backgroundColor: c.surfaceCard,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 12,
      alignItems: 'center',
    }),
    tipText: (c) => ({ color: c.textMuted, fontSize: 16 }),

    avatar: (c) => ({
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: c.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: c.badgeRing,
    }),
    avatarBadges: {
      position: 'absolute',
      bottom: 18,
      flexDirection: 'row',
      alignItems: 'center',
    },

    itemWrap: { alignItems: 'center' },
    itemCircle: (c, active) => ({
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.surfaceCard,
      borderWidth: 2,
      borderColor: active ? c.accentGold : c.surfaceCardBorder,
    }),
    itemLabel: (c) => ({
      marginTop: 6,
      fontSize: 12,
      color: c.text,
    }),

    primaryBtn: (c) => ({
      marginTop: 12,
      backgroundColor: c.buttonPrimaryBg,
      borderRadius: 15,
      paddingVertical: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    }),
    primaryLabel: (c) => ({
      color: c.buttonPrimaryText,
      fontSize: 16,
      fontWeight: '700',
    }),
  });
