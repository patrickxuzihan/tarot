import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Keyboard, KeyboardAvoidingView, Platform, StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function VerificationView({ navigation, phoneNumber, onSuccess }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.auth) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const timerRef = useRef(null);
  const isValidVerification = verificationCode.length === 6 && /^\d+$/.test(verificationCode);

  useEffect(() => {
    sendCode();
    startCountdown();
    return () => clearInterval(timerRef.current);
  }, []);

  const sendCode = () => {
    console.log(`发送验证码到 ${phoneNumber}`);
    setErrorMessage(null);
  };

  const startCountdown = () => {
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsCountingDown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = () => {
    Keyboard.dismiss();
    if (verificationCode === '123456') {
      onSuccess();
      navigation.navigate('Home');
    } else {
      setErrorMessage('验证码错误，请重新输入');
      setVerificationCode('');
    }
  };

  const handlePasswordLogin = () => {
    navigation.navigate('PasswordLoginView');
  };

  const handleResend = () => {
    sendCode();
    setCountdown(60);
    setIsCountingDown(true);
    startCountdown();
  };

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.85}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
            <Text style={styles.backText}>返回登录</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Ionicons name="mail" size={62} color={colors.text} />
            <Text style={styles.headerTitle}>短信验证码</Text>
            <Text style={styles.headerSub}>验证码已发送至</Text>
            <Text style={[styles.phoneBox, { borderColor: colors.border }]}>{phoneNumber}</Text>
          </View>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <TextInput
            placeholder="请输入6位验证码"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={text => setVerificationCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
            placeholderTextColor={colors.inputPlaceholder}
            style={styles.input}
          />

          <TouchableOpacity
            disabled={isCountingDown}
            onPress={handleResend}
            style={styles.resend}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.resendText,
                { color: isCountingDown ? colors.textMuted : colors.subtext, fontWeight: isCountingDown ? 'normal' : '700' },
              ]}
            >
              {isCountingDown ? `重新获取验证码 (${countdown}s)` : '重新发送验证码'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isValidVerification}
            onPress={handleVerify}
            activeOpacity={0.9}
            style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 30, opacity: isValidVerification ? 1 : 0.85 }}
          >
            {isValidVerification ? (
              <LinearGradient colors={[colors.accent, colors.border]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.verifyButton}>
                <Text style={[styles.verifyText, { color: colors.buttonPrimaryText }]}>验证并进入</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.verifyButton, { backgroundColor: colors.buttonPrimaryDisabledBg }]}>
                <Text style={[styles.verifyText, { color: colors.buttonPrimaryText }]}>验证并进入</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePasswordLogin} style={styles.passwordLink} activeOpacity={0.85}>
            <Text style={styles.passwordText}>没收到验证码？尝试账号密码登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const getStyles = (c) => StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
  },
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 50,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: c.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: c.border,
  },
  backText: {
    color: c.text,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
  },
  headerTitle: {
    color: c.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  headerSub: {
    color: c.subtext,
    fontSize: 18,
    marginTop: 10,
  },
  phoneBox: {
    color: c.text,
    fontWeight: 'bold',
    backgroundColor: c.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
    fontSize: 18,
    borderWidth: 1,
  },
  input: {
    backgroundColor: c.inputBg,
    borderRadius: 20,
    padding: 18,
    color: c.text,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: c.inputBorder,
  },
  resend: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 18,
  },
  verifyButton: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 0,
  },
  verifyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  passwordLink: {
    alignSelf: 'center',
  },
  passwordText: {
    color: c.subtext,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  error: {
    color: c.stateError,
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
