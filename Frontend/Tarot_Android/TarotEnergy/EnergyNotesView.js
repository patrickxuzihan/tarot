import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const NOTES = [];

export default function EnergyNotesView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('EnergyNoteDetail', { noteId: item.id, title: item.title })}
    >
      <View style={styles.cardLeft}>
        <View style={styles.iconWrap}>
          <Ionicons name="document-text" size={18} color={colors.textInverse} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.noteTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.noteMeta} numberOfLines={1}>{item.date} · {item.tags?.join('、') ?? '无标签'}</Text>
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
        <Text style={styles.topTitle}>能量笔记</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        data={NOTES}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="leaf" size={28} color={colors.accentGold} />
            <Text style={styles.emptyTitle}>能量笔记 - 功能开发中</Text>
            <Text style={styles.emptySub}>记录你的体悟、情绪与占卜灵感</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.brandPrimary, borderColor: colors.surfaceCardBorder }]}
        onPress={() => navigation.navigate('EnergyNoteEdit', { mode: 'create' })}
        activeOpacity={0.9}
      >
        <Ionicons name="add" size={26} color={colors.textInverse} />
      </TouchableOpacity>
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

    container: { padding: 16, paddingTop: 20, paddingBottom: 100 },
    noteCard: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: c.surfaceCard, borderRadius: 16, padding: 14, marginVertical: 6,
      borderWidth: 1, borderColor: c.surfaceCardBorder,
    },
    cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 },
    iconWrap: {
      width: 34, height: 34, borderRadius: 17, backgroundColor: c.brandPrimary,
      alignItems: 'center', justifyContent: 'center', marginRight: 12,
    },
    noteTitle: { color: c.text, fontSize: 16, fontWeight: '600' },
    noteMeta: { color: c.subtext, fontSize: 12, marginTop: 3 },
    empty: { alignItems: 'center', justifyContent: 'center', paddingTop: 120 },
    emptyTitle: { fontSize: 18, color: c.text, fontWeight: '700', marginTop: 8 },
    emptySub: { fontSize: 14, color: c.subtext, marginTop: 6 },
    fab: {
      position: 'absolute', right: 18, bottom: 24,
      width: 56, height: 56, borderRadius: 28,
      alignItems: 'center', justifyContent: 'center',
      borderWidth: 1, shadowColor: '#000', shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 6 }, shadowRadius: 10, elevation: 8,
    },
  });
