import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function PasswordLoginView({ navigation, phoneNumber, onSuccess }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.auth) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isValid = password.length >= 6;

  const handleLogin = () => {
    if (password === '123456') {
      onSuccess();
      navigation.navigate('Home');
    } else {
      setErrorMessage('密码错误，请重试');
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((v) => !v);

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.85}>
          <Ionicons name="chevron-back" size={20} color={colors.text} />
          <Text style={styles.backText}>返回登录</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="lock-closed" size={62} color={colors.text} />
          <Text style={styles.title}>账号密码登录</Text>
          <Text style={[styles.phone, { borderColor: colors.border }]}>{phoneNumber}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="请输入密码（至少6位）"
            placeholderTextColor={colors.inputPlaceholder}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={22} color={colors.subtext} />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity onPress={handleLogin} disabled={!isValid} activeOpacity={0.9} style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 20, opacity: isValid ? 1 : 0.85 }}>
          {isValid ? (
            <LinearGradient colors={[colors.accent, colors.border]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loginButton}>
              <Text style={[styles.loginText, { color: colors.buttonPrimaryText }]}>登录</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.loginButton, { backgroundColor: colors.buttonPrimaryDisabledBg }]}>
              <Text style={[styles.loginText, { color: colors.buttonPrimaryText }]}>登录</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VerificationView')} style={styles.switchMethod} activeOpacity={0.85}>
          <Text style={styles.switchText}>使用短信验证码登录</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const getStyles = (c) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: c.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 40,
    left: 30,
    borderWidth: 1,
    borderColor: c.border,
  },
  backText: {
    color: c.text,
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: c.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  phone: {
    color: c.text,
    fontSize: 16,
    backgroundColor: c.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontWeight: '600',
    borderWidth: 1,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: c.inputBg,
    borderRadius: 18,
    padding: 16,
    color: c.text,
    fontSize: 16,
    paddingRight: 50,
    borderWidth: 1,
    borderColor: c.inputBorder,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
  },
  error: {
    color: c.stateError,
    fontSize: 15,
    marginBottom: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 18,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchMethod: {
    alignSelf: 'center',
    padding: 12,
  },
  switchText: {
    color: c.subtext,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
