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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from './ThemesHelper';

export default function EmailBindingView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const onSendCode = useCallback(() => {
    // TODO: 请求发送验证码
    setIsCodeSent(true);
  }, []);

  const onBind = useCallback(() => {
    // TODO: 提交绑定
  }, []);

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
          <Text style={styles.headerTitle}>绑定邮箱</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 邮箱输入 */}
          <View style={{ height: 30 }} />
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>邮箱地址</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="请输入邮箱"
              placeholderTextColor={colors.inputPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input(colors)}
            />
          </View>

          {/* 验证码 */}
          <View style={{ height: 20 }} />
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>验证码</Text>
            <View style={styles.row}>
              <TextInput
                value={code}
                onChangeText={setCode}
                placeholder="输入验证码"
                placeholderTextColor={colors.inputPlaceholder}
                style={[styles.input(colors), { flex: 1, height: 44 }]}
              />
              <TouchableOpacity
                onPress={onSendCode}
                activeOpacity={0.9}
                disabled={isCodeSent}
                style={styles.sendBtn(colors, isCodeSent)}
              >
                <Text style={styles.sendLabel(colors, isCodeSent)}>
                  {isCodeSent ? '已发送' : '发送验证码'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 绑定按钮 */}
          <View style={{ height: 30 }} />
          <TouchableOpacity onPress={onBind} activeOpacity={0.9} style={styles.primaryBtn(colors)}>
            <Text style={styles.primaryLabel(colors)}>绑定邮箱</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
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

    fieldBlock: {
      gap: 6,
    },
    label: {
      color: c.text,
      fontSize: 16,
      fontWeight: '600',
    },
    input: (c) => ({
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 10,
      borderRadius: 10,
      backgroundColor: c.inputBg,
      borderWidth: 1,
      borderColor: c.inputBorder,
      color: c.text,
      fontSize: 15,
    }),

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    sendBtn: (c, disabled) => ({
      paddingHorizontal: 16,
      height: 44,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: disabled ? c.buttonPrimaryDisabledBg : c.buttonPrimaryBg,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    }),
    sendLabel: (c, disabled) => ({
      color: c.buttonPrimaryText,
      fontSize: 13,
      fontWeight: '700',
      opacity: disabled ? 0.8 : 1,
    }),

    primaryBtn: (c) => ({
      backgroundColor: c.buttonPrimaryBg,
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
