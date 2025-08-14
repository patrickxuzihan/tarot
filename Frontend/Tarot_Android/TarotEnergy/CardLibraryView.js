import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const SPREADS = [
  { id: 'celtic', title: '凯尔特十字', desc: '深入全面的十张牌阵', icon: 'grid' },
  { id: 'three', title: '三牌阵', desc: '过去 / 现在 / 未来', icon: 'ellipsis-horizontal' },
  { id: 'love', title: '恋人牌阵', desc: '情感关系洞察', icon: 'heart' },
  { id: 'career', title: '事业牌阵', desc: '工作与发展方向', icon: 'briefcase' },
];

export default function CardLibraryView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('SpreadDetail', { spreadId: item.id, title: item.title })
      }
    >
      <View style={styles.itemLeft}>
        <View style={styles.iconWrap}>
          <Ionicons name={item.icon} size={20} color={colors.textInverse} />
        </View>
        <View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDesc}>{item.desc}</Text>
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
        <Text style={styles.topTitle}>牌阵库</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        data={SPREADS}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>功能开发中</Text>
            <Text style={styles.subtitle}>先挑一个牌阵开始体验吧</Text>
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
    container: { padding: 16 },
    header: { marginBottom: 12, alignItems: 'center' },
    title: { fontSize: 20, color: c.text, fontWeight: '700', marginBottom: 6 },
    subtitle: { fontSize: 14, color: c.subtext },
    item: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: c.surfaceCard, borderRadius: 16, padding: 14, marginVertical: 6,
      borderWidth: 1, borderColor: c.surfaceCardBorder,
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center' },
    iconWrap: {
      width: 36, height: 36, borderRadius: 18, backgroundColor: c.brandPrimary,
      alignItems: 'center', justifyContent: 'center', marginRight: 12,
    },
    itemTitle: { color: c.text, fontSize: 16, fontWeight: '600' },
    itemDesc: { color: c.subtext, fontSize: 13, marginTop: 2 },
  });
