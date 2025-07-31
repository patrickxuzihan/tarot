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
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backText}>返回登录</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Ionicons name="mail" size={62} color="#fff" />
            <Text style={styles.headerTitle}>短信验证码</Text>
            <Text style={styles.headerSub}>验证码已发送至</Text>
            <Text style={styles.phoneBox}>{phoneNumber}</Text>
          </View>
          
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

          <TextInput
            placeholder="请输入6位验证码"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={text => setVerificationCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
            placeholderTextColor="#ccc"
            style={styles.input}
          />

          <TouchableOpacity 
            disabled={isCountingDown} 
            onPress={handleResend} 
            style={styles.resend}
          >
            <Text style={[
              styles.resendText,
              isCountingDown ? styles.resendDisabled : styles.resendActive
            ]}>
              {isCountingDown ? `重新获取验证码 (${countdown}s)` : '重新发送验证码'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isValidVerification}
            onPress={handleVerify}
            style={[
              styles.verifyButton, 
              { backgroundColor: isValidVerification ? '#9933FF' : '#aaa' }
            ]}
          >
            <Text style={styles.verifyText}>验证并进入</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePasswordLogin} style={styles.passwordLink}>
            <Text style={styles.passwordText}>没收到验证码？尝试账号密码登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    paddingHorizontal: 30,
  },
  container: { 
    flexGrow: 1,
    paddingTop: 60, // 顶部增加更多空白
    paddingBottom: 50, // 底部增加更多空白
  },
  backButton: {
    flexDirection: 'row', 
    backgroundColor: 'rgba(128,64,192,0.3)',
    padding: 12,
    borderRadius: 10, 
    alignItems: 'center',
    marginBottom: 40, // 增加与头部区域的间距
    alignSelf: 'flex-start',
  },
  backText: { 
    color: '#fff', 
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 18
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 35 // 增加与输入框的间距
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 28,
    fontWeight: 'bold', 
    marginTop: 20 // 增加图标与标题的间距
  },
  headerSub: { 
    color: '#ccc', 
    fontSize: 18,
    marginTop: 10
  },
  phoneBox: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: 'rgba(128,64,192,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15, // 增加副标题与电话号码的间距
    fontSize: 20
  },
  input: {
    backgroundColor: 'rgba(128,64,192,0.3)', 
    borderRadius: 20,
    padding: 18,
    color: '#fff', 
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 25 // 增加与重新发送按钮的间距
  },
  resend: { 
    alignItems: 'center', 
    marginBottom: 30 // 增加与验证按钮的间距
  },
  resendText: {
    fontSize: 18
  },
  resendDisabled: {
    color: '#aaa'
  },
  resendActive: {
    color: '#D9B3FF', 
    fontWeight: 'bold'
  },
  verifyButton: { 
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30 // 增加与底部链接的间距
  },
  verifyText: { 
    color: '#fff', 
    fontSize: 20,
    fontWeight: 'bold'
  },
  passwordLink: {
    alignSelf: 'center',
  },
  passwordText: { 
    color: '#D9B3FF', 
    textDecorationLine: 'underline', 
    fontSize: 16
  },
  error: { 
    color: '#ff6b6b',
    fontSize: 16,
    marginBottom: 20, // 增加错误信息下方的间距
    fontWeight: 'bold',
    textAlign: 'center'
  }
});