import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Keyboard, KeyboardAvoidingView, Platform, StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function VerificationView({ navigation, phoneNumber, onSuccess }) {
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
    <LinearGradient colors={['#260D40', '#401966']} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={16} color="#fff" />
            <Text style={styles.backText}>返回登录</Text>
          </TouchableOpacity>
          <View style={styles.header}>
            <Ionicons name="mail" size={50} color="#fff" />
            <Text style={styles.headerTitle}>短信验证码</Text>
            <Text style={styles.headerSub}>验证码已发送至</Text>
            <Text style={styles.phoneBox}>{phoneNumber}</Text>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
          <TextInput
            placeholder="请输入6位验证码"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={text => setVerificationCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
            placeholderTextColor="#ccc"
            style={styles.input}
          />
          <TouchableOpacity disabled={isCountingDown} onPress={handleResend} style={styles.resend}>
            <Text style={{ color: isCountingDown ? '#aaa' : '#D9B3FF', fontWeight: isCountingDown ? 'normal' : 'bold' }}>
              {isCountingDown ? `重新获取验证码 (${countdown}s)` : '重新发送验证码'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!isValidVerification}
            onPress={handleVerify}
            style={[styles.verifyButton, { backgroundColor: isValidVerification ? '#9933FF' : '#aaa' }]}
          >
            <Text style={styles.verifyText}>验证并进入</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePasswordLogin}>
            <Text style={styles.passwordLink}>没收到验证码？尝试账号密码登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingHorizontal: 30, paddingVertical: 40 },
  container: { flexGrow: 1 },
  backButton: {
    flexDirection: 'row', backgroundColor: 'rgba(128,64,192,0.3)',
    padding: 8, borderRadius: 8, alignItems: 'center'
  },
  backText: { color: '#fff', marginLeft: 4, fontWeight: 'bold' },
  header: { alignItems: 'center', marginVertical: 30 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  headerSub: { color: '#ccc', fontSize: 14, marginTop: 5 },
  phoneBox: {
    color: '#fff', fontWeight: 'bold', backgroundColor: 'rgba(128,64,192,0.3)',
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 10, marginTop: 8
  },
  input: {
    backgroundColor: 'rgba(128,64,192,0.3)', borderRadius: 15,
    padding: 12, color: '#fff', fontSize: 22, fontWeight: 'bold',
    textAlign: 'center', marginBottom: 10
  },
  resend: { alignItems: 'center', marginBottom: 20 },
  verifyButton: { padding: 15, borderRadius: 15, alignItems: 'center' },
  verifyText: { color: '#fff', fontSize: 16 },
  passwordLink: { marginTop: 10, textAlign: 'center', color: '#D9B3FF', textDecorationLine: 'underline', fontSize: 12 },
  error: { color: 'red', fontSize: 12, marginTop: 10 }
});
