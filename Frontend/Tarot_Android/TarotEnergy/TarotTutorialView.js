import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function TarotTutorialView() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;

  const {
    id = 0,
    title = '塔罗教学',
    content = '功能开发中，即将为您呈现更丰富的教学内容。',
    icon = 'book',
  } = route.params || {};

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <LinearGradient colors={bgGradient} style={styles.flex}>
      <SafeAreaView />
      {/* 顶部栏（带返回键） */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>塔罗教学</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.iconCircle}>
            <Ionicons name={icon} size={28} color={colors.textInverse} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.caption}>点击不同教学卡片进入此页时，会传入不同参数显示对应内容</Text>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>内容概览</Text>
          <Text style={styles.bodyText}>{content}</Text>
        </View>

        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={18} color={colors.textInverse} />
          <Text style={styles.tipText}>
            你可以从上一页传入
            <Text style={{ fontWeight: '700' }}> id / title / content / icon </Text>
            参数，以渲染不同的教学模块。
          </Text>
        </View>
      </ScrollView>
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

    container: { paddingHorizontal: 18, paddingBottom: 28 },

    headerCard: {
      backgroundColor: c.surfaceCard,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 16,
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 16,
    },
    iconCircle: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor: c.brandPrimary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    title: { color: c.text, fontSize: 20, fontWeight: '800' },
    caption: { color: c.subtext, fontSize: 13, marginTop: 6, textAlign: 'center' },

    contentCard: {
      backgroundColor: c.surfaceCard,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 16,
    },
    sectionTitle: { color: c.text, fontSize: 16, fontWeight: '700', marginBottom: 8 },
    bodyText: { color: c.subtext, fontSize: 14, lineHeight: 22 },

    tipCard: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: c.surfaceGlass,
      gap: 8,
    },
    tipText: { color: c.textInverse, fontSize: 12 },
  });
