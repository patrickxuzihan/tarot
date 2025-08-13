import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from './ThemesHelper';

const OPTIONS = [
  { key: 'mysticPurple', label: '梦幻紫' },
  { key: 'silverNoir',   label: '银黑'   },
];

export default function ThemesSettingsView() {
  const navigation = useNavigation();
  const { key, colors, gradient, setTheme, toggle, theme } = useAppTheme();

  return (
    <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 0.2, y: 1 }} style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 顶部：返回 + 标题 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={20} color="#EBDDFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>主题样式</Text>
        </View>

        {/* Section：主题（分段选择） */}
        <Section title="主题">
          <View style={styles.segmentWrap}>
            {OPTIONS.map(opt => {
              const active = key === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => setTheme(opt.key)}
                  activeOpacity={0.9}
                  style={[
                    styles.segmentBtn,
                    {
                      borderColor: colors.border,
                      backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                    },
                  ]}
                >
                  <Text style={[styles.segmentText, { color: colors.text, opacity: active ? 1 : 0.7 }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Section>

        {/* Section：预览 */}
        <Section title="预览">
          <ThemePreview colors={colors} gradient={gradient} dark={theme.dark} />
        </Section>

        {/* Section：操作 */}
        <Section>
          <TouchableOpacity
            onPress={toggle}
            activeOpacity={0.9}
            style={[styles.actionBtn, { borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.08)' }]}
          >
            <Text style={[styles.actionText, { color: colors.text }]}>
              {key === 'silverNoir' ? '切换到「梦幻紫」' : '切换到「银黑」'}
            </Text>
          </TouchableOpacity>
        </Section>

        <View style={{ height: 24 }} />
      </ScrollView>
    </LinearGradient>
  );
}

/* 预览块 */
const ThemePreview = memo(function ThemePreview({ colors, gradient, dark }) {
  return (
    <View style={styles.previewOuter}>
      <LinearGradient colors={gradient} style={styles.previewBg}>
        {/* 渐变卡片（填充 + 细描边） */}
        <View style={[styles.card, { backgroundColor: colors.surfaceCard, borderColor: colors.border }]}>
          <Ionicons name="moon" size={36} color={colors.text} />
        </View>

        <Text style={[styles.previewTitle, { color: colors.text }]}>梦多塔</Text>
        <Text style={[styles.previewSub, { color: colors.subtext }]}>你想要的塔罗未必只是塔罗</Text>

        {/* 主按钮（用 accent 渐变 + 描边） */}
        <LinearGradient
          colors={[colors.accent, colors.border]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryBtn}
        >
          <View style={[styles.primaryBtnInner, { borderColor: colors.border }]}>
            <Text style={[styles.primaryBtnText, { color: dark ? '#FFFFFF' : '#0F1020' }]}>示例主按钮</Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
});

/* 分组容器（标题 + 卡片） */
const Section = memo(function Section({ title, children }) {
  return (
    <View style={{ marginBottom: 18 }}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 20 : 16 },

  header: { marginBottom: 14, flexDirection: 'row', alignItems: 'center' },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },

  sectionTitle: { color: '#D9C8FF', fontSize: 16, fontWeight: '700', paddingLeft: 10, marginBottom: 10 },
  sectionCard: {
    backgroundColor: 'rgba(38,26,61,0.8)',
    borderRadius: 15, borderWidth: 1, borderColor: 'rgba(130,90,180,0.8)', padding: 12,
  },

  /* segmented */
  segmentWrap: { flexDirection: 'row', gap: 10 },
  segmentBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, alignItems: 'center',
  },
  segmentText: { fontSize: 14, fontWeight: '600' },

  /* preview */
  previewOuter: { borderRadius: 16, overflow: 'hidden' },
  previewBg: { height: 300, padding: 16, justifyContent: 'center' },
  card: {
    height: 110, borderRadius: 20, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  previewTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  previewSub: { fontSize: 12, textAlign: 'center', marginTop: 4 },

  primaryBtn: { borderRadius: 14, marginTop: 14 },
  primaryBtnInner: {
    borderWidth: 1, borderRadius: 14, paddingVertical: 10, alignItems: 'center',
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700' },

  /* action */
  actionBtn: { paddingVertical: 12, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  actionText: { fontSize: 16, fontWeight: '700' },
});
