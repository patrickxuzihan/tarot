import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const HISTORY = [];

export default function ReadingHistoryView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ReadingDetail', { readingId: item.id, title: item.title })}
    >
      <View style={styles.itemLeft}>
        <View style={styles.iconWrap}>
          <Ionicons name="book" size={18} color={colors.textInverse} />
        </View>
        <View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDesc}>{item.subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={bgGradient} style={styles.flex}>
      <SafeAreaView />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>阅读历史</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        data={HISTORY}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>阅读历史 - 功能开发中</Text>
            <Text style={styles.emptySubtitle}>完成一次占卜后，这里会显示记录</Text>
          </View>
        }
      />
    </LinearGradient>
  );
}

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
    item: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: c.surfaceCard, borderRadius: 16, padding: 14, marginVertical: 6,
      borderWidth: 1, borderColor: c.surfaceCardBorder,
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center' },
    iconWrap: {
      width: 34, height: 34, borderRadius: 17, backgroundColor: c.brandPrimary,
      alignItems: 'center', justifyContent: 'center', marginRight: 12,
    },
    itemTitle: { color: c.text, fontSize: 16, fontWeight: '600' },
    itemDesc: { color: c.subtext, fontSize: 13, marginTop: 2 },

    empty: { alignItems: 'center', justifyContent: 'center', paddingTop: 120 },
    emptyTitle: { fontSize: 20, color: c.text, fontWeight: '700', marginBottom: 8 },
    emptySubtitle: { fontSize: 14, color: c.subtext },
  });
