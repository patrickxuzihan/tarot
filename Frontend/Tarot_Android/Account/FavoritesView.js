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

export default function FavoritesView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const favorites = [
    { title: '收藏项目 1', sub: '塔罗牌解读/文章/视频' },
    { title: '收藏项目 2', sub: '塔罗牌解读/文章/视频' },
    { title: '收藏项目 3', sub: '塔罗牌解读/文章/视频' },
    { title: '收藏项目 4', sub: '塔罗牌解读/文章/视频' },
    { title: '收藏项目 5', sub: '塔罗牌解读/文章/视频' },
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
          <Text style={styles.headerTitle}>我的收藏</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 提示 */}
          <View style={styles.tipWrap(colors)}>
            <Text style={styles.tipText(colors)}>收藏功能开发中...</Text>
          </View>

          {/* 列表 */}
          <View style={{ marginTop: 20 }}>
            {favorites.map((item, idx) => (
              <View key={idx} style={styles.itemWrap(colors)}>
                <View style={styles.itemIcon(colors)}>
                  <Ionicons name="heart" size={24} color="#EC4899" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.itemTitle(colors)}>{item.title}</Text>
                  <Text style={styles.itemSub(colors)}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
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

    // 列表
    itemWrap: (c) => ({
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.surfaceCard,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 12,
      marginBottom: 14,
    }),
    itemIcon: (c) => ({
      width: 60,
      height: 60,
      borderRadius: 10,
      backgroundColor: c.surface,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    itemTitle: (c) => ({ color: c.text, fontSize: 16, fontWeight: '600' }),
    itemSub: (c) => ({
      color: c.accentViolet || c.subtext,
      fontSize: 12,
      marginTop: 4,
    }),
  });
