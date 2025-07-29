import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordLoginView({ navigation, phoneNumber, onSuccess }) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const isValid = password.length >= 6;

  const handleLogin = () => {
    if (password === '123456') {
      onSuccess();
      navigation.navigate('Home');
    } else {
      setErrorMessage('密码错误，请重试');
    }
  };

  return (
    <LinearGradient colors={['#260D40', '#401966']} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={16} color="#fff" />
            <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>账号密码登录</Text>
        <Text style={styles.phone}>{phoneNumber}</Text>

        <TextInput
          placeholder="请输入密码（至少6位）"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
          style={styles.input}
        />

        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        <TouchableOpacity
          onPress={handleLogin}
          disabled={!isValid}
          style={[
            styles.loginButton,
            { backgroundColor: isValid ? '#9933FF' : 'rgba(200,200,200,0.3)' }
          ]}
        >
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingHorizontal: 30, paddingVertical: 40
  },
  backRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 20
  },
  backButton: {
    flexDirection: 'row', backgroundColor: 'rgba(128,64,192,0.3)',
    padding: 8, borderRadius: 8
  },
  backText: { color: '#fff', marginLeft: 4, fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  phone: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 20 },
  input: {
    backgroundColor: 'rgba(128,64,192,0.3)', borderRadius: 15,
    padding: 12, color: '#fff', marginBottom: 10
  },
  error: { color: 'red', fontSize: 12, marginBottom: 10 },
  loginButton: { padding: 15, borderRadius: 15, alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 16 }
});
