import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function RegistrationView({ navigation, route, onSuccess }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.auth) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [phoneNumber, setPhoneNumber] = useState(route?.params?.phoneNumber || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const sendVerificationCode = () => {
    Keyboard.dismiss();
    setIsVerificationCodeSent(true);
    setCountdown(60);
    Alert.alert('验证码已发送至您的手机');
  };

  useEffect(() => {
    let timer;
    if (isVerificationCodeSent && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isVerificationCodeSent, countdown]);

  const handleRegister = () => {
    Keyboard.dismiss();

    if (verificationCode !== '123456') {
      Alert.alert('验证码错误，请输入123456');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('两次输入的密码不一致');
      return;
    }

    Alert.alert('注册成功', '', [{ text: '确定', onPress: () => onSuccess() }]);
  };

  const isValidRegistration =
    verificationCode.length === 6 &&
    password.length >= 6 &&
    nickname.length >= 2 &&
    password === confirmPassword;

  const passwordStrength = () => {
    let score = 0;
    if (password.length > 8) score++;
    if (/\d/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (password.length < 6) return { text: '太短', color: colors.stateError, score: 0 };
    if (score <= 1) return { text: '弱', color: colors.stateError, score };
    if (score <= 3) return { text: '中', color: colors.stateWarning, score };
    return { text: '强', color: colors.stateSuccess, score };
  };

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>创建账号</Text>
        <Text style={styles.subtitle}>欢迎加入梦多塔</Text>

        <View style={styles.section}>
          <Text style={styles.label}>手机验证</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.phoneText}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholder="请输入手机号"
              placeholderTextColor={colors.inputPlaceholder}
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.changeBtn} activeOpacity={0.85}>
              <Text style={styles.changeText}>更换</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              placeholder="请输入6位验证码"
              placeholderTextColor={colors.inputPlaceholder}
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <TouchableOpacity
              disabled={isVerificationCodeSent && countdown > 0}
              onPress={sendVerificationCode}
              activeOpacity={0.9}
              style={[
                styles.codeBtn,
                {
                  backgroundColor:
                    isVerificationCodeSent && countdown > 0
                      ? colors.buttonPrimaryDisabledBg
                      : colors.accent,
                },
              ]}
            >
              <Text style={[styles.codeText, { color: colors.buttonPrimaryText }]}>
                {isVerificationCodeSent && countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>用户昵称</Text>
          <TextInput
            style={styles.input}
            placeholder="输入您的个性昵称"
            placeholderTextColor={colors.inputPlaceholder}
            value={nickname}
            onChangeText={setNickname}
          />
          {nickname.length > 0 && nickname.length < 2 && (
            <Text style={styles.warning}>昵称至少需要2个字符</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>设置密码</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="密码（至少6位，含大小写、数字、符号）"
            placeholderTextColor={colors.inputPlaceholder}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.tip}>必须包含：大写、小写、数字、符号；长度≥6</Text>
          {password.length > 0 && (
            <Text style={{ color: passwordStrength().color }}>
              强度：{passwordStrength().text}
            </Text>
          )}

          <Text style={styles.label}>确认密码</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="再次输入密码以确认"
            placeholderTextColor={colors.inputPlaceholder}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {password && confirmPassword && password !== confirmPassword && (
            <Text style={styles.warning}>两次输入的密码不一致</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.registerBtn,
            { backgroundColor: isValidRegistration ? undefined : colors.buttonPrimaryDisabledBg },
          ]}
          disabled={!isValidRegistration}
          onPress={handleRegister}
          activeOpacity={0.9}
        >
          {isValidRegistration ? (
            <LinearGradient
              colors={[colors.accent, colors.border]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.registerGrad}
            >
              <Text style={[styles.registerText, { color: colors.buttonPrimaryText }]}>
                完成注册
              </Text>
            </LinearGradient>
          ) : (
            <Text style={[styles.registerText, { color: colors.buttonPrimaryText }]}>
              完成注册
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={styles.backText}>返回登录页面</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: {
      padding: 24,
      paddingTop: 72,
      flexGrow: 1,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: c.text,
      textShadowColor: c.accentViolet,
      textShadowRadius: 6,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 16,
      color: c.subtext,
      marginBottom: 28,
    },
    section: {
      marginBottom: 20,
    },
    label: {
      color: c.text,
      opacity: 0.9,
      marginBottom: 6,
    },
    input: {
      backgroundColor: c.inputBg,
      borderRadius: 12,
      padding: 12,
      color: c.text,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: c.inputBorder,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    phoneText: {
      flex: 1,
      padding: 12,
      backgroundColor: c.inputBg,
      borderRadius: 12,
      color: c.text,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: c.inputBorder,
    },
    changeBtn: {
      marginLeft: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: c.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: c.border,
    },
    changeText: {
      color: c.text,
    },
    codeBtn: {
      marginLeft: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
    },
    codeText: {
      fontWeight: '700',
    },
    warning: {
      color: c.stateError,
      fontSize: 12,
    },
    tip: {
      fontSize: 12,
      color: c.inputPlaceholder,
      marginBottom: 6,
    },
    registerBtn: {
      padding: 0,
      borderRadius: 16,
      marginTop: 20,
      overflow: 'hidden',
    },
    registerGrad: {
      padding: 14,
      borderRadius: 16,
      alignItems: 'center',
    },
    registerText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    backText: {
      marginTop: 16,
      color: c.subtext,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });
