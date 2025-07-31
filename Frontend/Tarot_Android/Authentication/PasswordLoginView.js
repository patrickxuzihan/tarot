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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <LinearGradient colors={['#260D40', '#401966']} style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.container}
      >
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>返回登录</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="lock-closed" size={62} color="#fff" />
          <Text style={styles.title}>账号密码登录</Text>
          <Text style={styles.phone}>{phoneNumber}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="请输入密码（至少6位）"
            placeholderTextColor="#ccc"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity 
            onPress={togglePasswordVisibility} 
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={isPasswordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="#ccc" 
            />
          </TouchableOpacity>
        </View>

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

        <TouchableOpacity 
          onPress={() => navigation.navigate('VerificationView')} 
          style={styles.switchMethod}
        >
          <Text style={styles.switchText}>使用短信验证码登录</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 30,
    paddingTop: 40,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row', 
    backgroundColor: 'rgba(128,64,192,0.3)',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 40,
    left: 30,
  },
  backText: { 
    color: '#fff', 
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 18
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  title: { 
    color: '#fff', 
    fontSize: 28,
    fontWeight: 'bold', 
    marginTop: 20,
    marginBottom: 8
  },
  phone: { 
    color: '#fff', 
    fontSize: 18,
    backgroundColor: 'rgba(128,64,192,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontWeight: '600'
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20
  },
  input: {
    backgroundColor: 'rgba(128,64,192,0.3)', 
    borderRadius: 18,
    padding: 18,
    color: '#fff', 
    fontSize: 18,
    paddingRight: 50 // 为眼睛图标留出空间
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 16,
    padding: 8
  },
  error: { 
    color: '#ff6b6b',
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginButton: { 
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20
  },
  loginText: { 
    color: '#fff', 
    fontSize: 20,
    fontWeight: 'bold'
  },
  switchMethod: {
    alignSelf: 'center',
    padding: 12
  },
  switchText: {
    color: '#D9B3FF',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});