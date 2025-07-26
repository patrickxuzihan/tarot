import React, { useState, useEffect } from 'react';
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

export default function RegistrationView({ navigation, route, onSuccess }) {
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
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
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

    Alert.alert('注册成功', '', [
      { text: '确定', onPress: () => onSuccess() }
    ]);
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

    if (password.length < 6) return { text: '太短', color: 'red', score: 0 };
    if (score <= 1) return { text: '弱', color: 'red', score };
    if (score <= 3) return { text: '中', color: 'orange', score };
    return { text: '强', color: 'green', score };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.changeBtn}>
            <Text style={styles.changeText}>更换</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
            placeholder="请输入6位验证码"
            placeholderTextColor="#ccc"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity
            disabled={isVerificationCodeSent && countdown > 0}
            onPress={sendVerificationCode}
            style={[
              styles.codeBtn,
              { backgroundColor: isVerificationCodeSent && countdown > 0 ? '#888' : '#9646cc' }
            ]}
          >
            <Text style={styles.codeText}>
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
          placeholderTextColor="#ccc"
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
          placeholderTextColor="#ccc"
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
          placeholderTextColor="#ccc"
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
          { backgroundColor: isValidRegistration ? '#9646cc' : '#aaa' }
        ]}
        disabled={!isValidRegistration}
        onPress={handleRegister}
      >
        <Text style={styles.registerText}>完成注册</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>返回登录页面</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 72,
    backgroundColor: '#1e0b32',
    flexGrow: 1
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#9646cc',
    textShadowRadius: 6,
    marginBottom: 6
  },
  subtitle: {
    fontSize: 16,
    color: '#d4c1ff',
    marginBottom: 28
  },
  section: {
    marginBottom: 20
  },
  label: {
    color: '#eee',
    marginBottom: 6
  },
  input: {
    backgroundColor: '#3d2d5c',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  phoneText: {
    flex: 1,
    padding: 12,
    backgroundColor: '#3d2d5c',
    borderRadius: 12,
    color: '#fff',
    marginBottom: 10
  },
  changeBtn: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#9646cc',
    borderRadius: 10
  },
  changeText: {
    color: '#fff'
  },
  codeBtn: {
    marginLeft: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12
  },
  codeText: {
    color: '#fff'
  },
  warning: {
    color: 'red',
    fontSize: 12
  },
  tip: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 6
  },
  registerBtn: {
    padding: 14,
    borderRadius: 16,
    marginTop: 20
  },
  registerText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  backText: {
    marginTop: 16,
    color: '#d4c1ff',
    textAlign: 'center'
  }
});
