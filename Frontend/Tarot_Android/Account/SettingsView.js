// SettingsView.js — React Native 版本（含返回键 + “其他设置”分组）
// 依赖：expo-linear-gradient、@expo/vector-icons、@react-navigation/native
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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsView() {
  const navigation = useNavigation();

  const accountItems = [
    { icon: 'person-circle-outline', title: '个人资料', to: 'ProfileEditor' },
    { icon: 'lock-closed-outline',   title: '安全设置', to: 'SecuritySettings' },
    { icon: 'mail-outline',          title: '绑定邮箱', to: 'EmailBinding' },
    { icon: 'key-outline',           title: '修改密码', to: 'PasswordChange' },
  ];

  const supportItems = [
    { icon: 'help-circle-outline',         title: '帮助中心',   to: 'HelpCenter' },
    { icon: 'information-circle-outline',  title: '关于梦多塔', to: 'AboutApp' },
    { icon: 'shield-checkmark-outline',    title: '隐私政策',   to: 'PrivacyPolicy' },
    { icon: 'document-text-outline',       title: '服务条款',   to: 'TermsOfService' },
  ];

  const otherItems = [
    { icon: 'notifications-outline',   title: '通知设置', to: 'NotificationSettings' },
    { icon: 'color-palette-outline',   title: '主题设置', to: 'ThemeSettings' },
    { icon: 'globe-outline',           title: '语言设置', to: 'LanguageSettings' },
  ];

  return (
    <LinearGradient
      colors={['#1a0d33', '#241040', '#321857']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 1 }}
      style={styles.root}
    >
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
          <Text style={styles.headerTitle}>设置</Text>
        </View>

        {/* 账号设置 */}
        <Section title="账号设置">
          <SettingGroup items={accountItems} />
        </Section>

        {/* 支持与帮助 */}
        <Section title="支持与帮助">
          <SettingGroup items={supportItems} />
        </Section>

        {/* 其他设置 */}
        <Section title="其他设置">
          <SettingGroup items={otherItems} />
        </Section>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LinearGradient>
  );
}

/* 分组容器（标题 + 卡片） */
const Section = memo(function Section({ title, children }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.groupCard}>{children}</View>
    </View>
  );
});

/* 设置项列表（带分割线） */
function SettingGroup({ items }) {
  const navigation = useNavigation();
  return (
    <View style={{ overflow: 'hidden', borderRadius: 15 }}>
      {items.map((it, idx) => (
        <View key={it.title}>
          <SettingRow
            icon={it.icon}
            title={it.title}
            onPress={() => navigation.navigate(it.to)}
          />
          {idx < items.length - 1 ? <View style={styles.divider} /> : null}
        </View>
      ))}
    </View>
  );
}

/* 单行设置项 */
const SettingRow = memo(function SettingRow({ icon, title, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.row}>
      <Ionicons name={icon} size={20} color="#EBDDFF" style={{ width: 30 }} />
      <Text style={styles.rowText}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.55)" />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 16,
  },

  header: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  sectionTitle: {
    color: '#D9C8FF',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 10,
    marginBottom: 10,
  },

  groupCard: {
    backgroundColor: 'rgba(38, 26, 61, 0.8)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(130, 90, 180, 0.8)',
  },

  row: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(32, 20, 56, 0.7)',
  },
  rowText: { color: '#FFFFFF', fontSize: 16, flex: 1 },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#4d337f',
    marginLeft: 45,
  },
});
