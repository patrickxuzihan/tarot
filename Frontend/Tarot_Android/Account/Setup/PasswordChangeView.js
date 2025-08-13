import React, { useMemo, useState, useCallback, useEffect } from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from './ThemesHelper';

const LAST_PASSWORD_KEY = 'user.lastPasswordHash';

const sha256 = (text) => {
  try {
    return Buffer.from(text, 'utf8').toString('base64');
  } catch {
    const utf8 = new TextEncoder().encode(text);
    let bin = '';
    utf8.forEach((b) => (bin += String.fromCharCode(b)));
    return global.btoa ? global.btoa(bin) : text;
  }
};

export default function PasswordChangeView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastHash, setLastHash] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await AsyncStorage.getItem(LAST_PASSWORD_KEY);
        if (s) setLastHash(s);
      } catch {}
    })();
  }, []);

  const strengthInfo = useMemo(() => {
    if (newPassword.length < 6) return { text: '太短', color: colors.stateError, score: 0 };
    let s = 0;
    if (newPassword.length > 8) s += 1;
    if (/\d/.test(newPassword)) s += 1;
    if (/[A-Z]/.test(newPassword)) s += 1;
    if (/[^\w\s]/.test(newPassword)) s += 1;
    const score = Math.max(1, Math.min(s, 4));
    let text = '弱';
    let color = colors.stateError;
    if (s >= 2 && s <= 3) {
      text = '中';
      color = colors.stateWarning;
    } else if (s >= 4) {
      text = '强';
      color = colors.stateSuccess;
    }
    return { text, color, score };
  }, [newPassword, colors]);

  const canSubmit = useMemo(() => {
    if (!oldPassword) return false;
    if (newPassword !== confirmPassword) return false;
    if (newPassword.length < 6) return false;
    if (lastHash && sha256(newPassword) === lastHash) return false;
    return true;
  }, [oldPassword, newPassword, confirmPassword, lastHash]);

  const onSubmit = useCallback(async () => {
    Keyboard.dismiss();
    // TODO: 校验 oldPassword 是否正确（此处与 Swift 一样占位）
    try {
      const oldHash = sha256(oldPassword);
      await AsyncStorage.setItem(LAST_PASSWORD_KEY, oldHash);
      Alert.alert('密码修改成功', '已更新为新密码（示例逻辑）');
    } catch {
      Alert.alert('出错了', '保存失败，请重试');
    }
  }, [oldPassword]);

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
          <Text style={styles.headerTitle}>修改密码</Text>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>修改密码</Text>

            {/* 当前密码 */}
            <View style={styles.fieldWrap}>
              <TextInput
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="当前密码"
                placeholderTextColor={colors.inputPlaceholder}
                secureTextEntry
                style={styles.input(colors)}
              />
            </View>

            {/* 新密码 */}
            <View style={styles.fieldWrap}>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="新密码（≥6位，含大小写、数字、符号）"
                placeholderTextColor={colors.inputPlaceholder}
                secureTextEntry
                style={styles.input(colors)}
              />
            </View>

            <Text style={styles.hint(colors)}>
              必须包含：大写、小写、数字、符号；长度 ≥ 6
            </Text>

            {/* 强度显示 */}
            {!!newPassword && (
              <View style={styles.strengthRow}>
                <Text style={styles.strengthLabel(colors)}>强度：</Text>
                <Text style={[styles.strengthText, { color: strengthInfo.color }]}>
                  {strengthInfo.text}
                </Text>
                <View style={styles.barsWrap}>
                  {[0, 1, 2, 3].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.bar(colors),
                        { backgroundColor: strengthInfo.score > i ? strengthInfo.color : colors.surfaceLine },
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* 确认新密码 */}
            <View style={styles.fieldWrap}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="确认新密码"
                placeholderTextColor={colors.inputPlaceholder}
                secureTextEntry
                style={styles.input(colors)}
              />
            </View>

            {!!confirmPassword && newPassword !== confirmPassword && (
              <Text style={styles.mismatch(colors)}>两次输入的密码不一致</Text>
            )}

            {/* 提交 */}
            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={onSubmit}
                activeOpacity={0.9}
                disabled={!canSubmit}
                style={[
                  styles.primaryBtn(colors),
                  { backgroundColor: canSubmit ? colors.buttonPrimaryBg : colors.buttonPrimaryDisabledBg },
                ]}
              >
                <Text style={styles.primaryLabel(colors)}>确认修改</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
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

    title: {
      fontSize: 28,
      fontWeight: '800',
      color: c.text,
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 10,
    },

    fieldWrap: { paddingHorizontal: 20, marginTop: 20 },
    input: (c) => ({
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 10,
      borderRadius: 12,
      backgroundColor: c.inputBg,
      borderWidth: 1,
      borderColor: c.inputBorder,
      color: c.text,
      fontSize: 15,
    }),

    hint: (c) => ({
      fontSize: 12,
      color: c.text,
      opacity: 0.7,
      paddingHorizontal: 20,
      marginTop: 8,
    }),

    strengthRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 8,
      gap: 6,
    },
    strengthLabel: (c) => ({ fontSize: 12, color: c.text, opacity: 0.8 }),
    strengthText: { fontSize: 12, fontWeight: '600' },
    barsWrap: { flexDirection: 'row', alignItems: 'center', marginLeft: 6, width: 80, gap: 3 },
    bar: (c) => ({
      flex: 1,
      height: 4,
      borderRadius: 2,
      backgroundColor: c.surfaceLine,
    }),

    mismatch: (c) => ({
      fontSize: 12,
      color: c.stateError,
      paddingHorizontal: 20,
      marginTop: 8,
    }),

    primaryBtn: (c) => ({
      marginTop: 24,
      borderRadius: 12,
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
