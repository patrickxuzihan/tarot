import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from './ThemesHelper';

const HOROSCOPES = [
  { key: 'aries', label: '白羊座' },
  { key: 'taurus', label: '金牛座' },
  { key: 'gemini', label: '双子座' },
  { key: 'cancer', label: '巨蟹座' },
  { key: 'leo', label: '狮子座' },
  { key: 'virgo', label: '处女座' },
  { key: 'libra', label: '天秤座' },
  { key: 'scorpio', label: '天蝎座' },
  { key: 'sagittarius', label: '射手座' },
  { key: 'capricorn', label: '摩羯座' },
  { key: 'aquarius', label: '水瓶座' },
  { key: 'pisces', label: '双鱼座' },
];

export default function ProfileEditorView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [name, setName] = useState('神秘塔罗师');
  const [email, setEmail] = useState('tarotmaster@example.com');
  const [horoscope, setHoroscope] = useState('libra');
  const [pickerVisible, setPickerVisible] = useState(false);

  const onSave = useCallback(() => {
    Alert.alert('保存成功', '您的个人资料已更新');
  }, []);

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.85}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>个人资料</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, paddingTop: 8 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>头像</Text>
            <View style={styles.avatarRow}>
              <View style={styles.avatar(colors)}>
                <Ionicons name="person" size={36} color={colors.textInverse} />
              </View>
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={styles.ghostBtn(colors)} activeOpacity={0.9}>
                <Ionicons name="image-outline" size={16} color={colors.text} />
                <Text style={styles.ghostLabel(colors)}>更换头像</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>昵称</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="输入昵称"
              placeholderTextColor={colors.inputPlaceholder}
              style={styles.input(colors)}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>邮箱</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="输入邮箱"
              placeholderTextColor={colors.inputPlaceholder}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input(colors)}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>星座</Text>
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              activeOpacity={0.9}
              style={styles.selector(colors)}
            >
              <Text style={styles.selectorText(colors)}>
                {HOROSCOPES.find((h) => h.key === horoscope)?.label || '选择星座'}
              </Text>
              <Ionicons name="chevron-down" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onSave} activeOpacity={0.9} style={styles.primaryBtn(colors)}>
            <Text style={styles.primaryLabel(colors)}>保存更改</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal transparent visible={pickerVisible} animationType="fade" onRequestClose={() => setPickerVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalSheet(colors)}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle(colors)}>选择星座</Text>
                <TouchableOpacity onPress={() => setPickerVisible(false)} style={styles.closeBtn(colors)}>
                  <Ionicons name="close" size={18} color={colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
                {HOROSCOPES.map((h) => {
                  const active = h.key === horoscope;
                  return (
                    <TouchableOpacity
                      key={h.key}
                      style={styles.optionRow(colors, active)}
                      onPress={() => {
                        setHoroscope(h.key);
                        setPickerVisible(false);
                      }}
                      activeOpacity={0.9}
                    >
                      <Text style={styles.optionText(colors, active)}>{h.label}</Text>
                      {active && <Ionicons name="checkmark" size={16} color={colors.brandPrimary} />}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
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

    card: {
      backgroundColor: c.surfaceCard,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      marginBottom: 12,
    },
    sectionTitle: { color: c.subtext, fontSize: 14, marginBottom: 8, fontWeight: '600' },

    avatarRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: (c) => ({
      width: 84,
      height: 84,
      borderRadius: 42,
      backgroundColor: c.brandPrimary,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: c.badgeRing,
    }),

    ghostBtn: (c) => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
    }),
    ghostLabel: (c) => ({ marginLeft: 6, fontSize: 13, color: c.text }),

    input: (c) => ({
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 10,
      borderRadius: 10,
      backgroundColor: c.inputBg,
      borderWidth: 1,
      borderColor: c.inputBorder,
      color: c.text,
      fontSize: 15,
    }),

    // ← 这里改为不透明的 surfaceCard
    selector: (c) => ({
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: c.surfaceCard, // 不透明
      borderWidth: 1,
      borderColor: c.inputBorder,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }),
    selectorText: (c) => ({ fontSize: 15, color: c.text }),

    primaryBtn: (c) => ({
      marginTop: 8,
      backgroundColor: c.buttonPrimaryBg,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    }),
    primaryLabel: (c) => ({ color: c.buttonPrimaryText, fontSize: 16, fontWeight: '700' }),

    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
    modalSheet: (c) => ({
      backgroundColor: c.surface,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      paddingBottom: 12,
      maxHeight: '65%',
    }),
    modalHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 },
    modalTitle: (c) => ({ fontSize: 16, color: c.text, fontWeight: '700' }),
    closeBtn: (c) => ({
      marginLeft: 'auto',
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    optionRow: (c, active) => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: active ? c.surfaceLine : 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: c.surfaceCardBorder,
    }),
    optionText: (c, active) => ({
      fontSize: 15,
      color: active ? c.text : c.subtext,
      fontWeight: active ? '700' : '500',
    }),
  });
