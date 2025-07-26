import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Keyboard, KeyboardAvoidingView, Platform, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LoginView({ navigation, setIsLoggedIn, setTempPhoneNumber }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode] = useState('+86');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const scrollViewRef = useRef(null);
  const windowHeight = Dimensions.get('window').height;
  const isValidLogin = phoneNumber.length >= 8 && agreedToTerms;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => setKeyboardHeight(e.endCoordinates.height));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  const handleLogin = () => {
    if (isValidLogin) {
      setTempPhoneNumber(`${countryCode}${phoneNumber}`);
      navigation.navigate('VerificationView');
    }
  };

  const handleThirdPartyLogin = type => {
    const success = Math.random() < 0.5;
    if (success) {
      setIsLoggedIn(true);
    } else {
      navigation.navigate('Registration');
    }
  };

  return (
    <LinearGradient colors={['#260D40', '#401966']} style={{ flex: 1, paddingHorizontal: 30 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingVertical: 40, minHeight: windowHeight }} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Ionicons name="moon" size={70} color="#fff" />
            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>梦多塔</Text>
            <Text style={{ color: '#D9B3FF' }}>你想要的塔罗未必只是塔罗</Text>
          </View>
          <Text style={{ color: '#fff', marginBottom: 10 }}>手机号登录</Text>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity disabled style={{ padding: 10, backgroundColor: '#8040B3', borderRadius: 10 }}>
              <Text style={{ color: '#fff' }}>{countryCode}</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="输入手机号码"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={{ flex: 1, marginLeft: 10, padding: 10, backgroundColor: '#8040B3', color: '#fff', borderRadius: 10 }}
              placeholderTextColor="#ccc"
            />
          </View>
          <Text style={{ color: '#aaa', marginBottom: 10 }}>其他登录方式</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => handleThirdPartyLogin('Apple')}>
              <Ionicons name="logo-apple" size={40} color="#fff" />
              <Text style={{ color: '#fff', textAlign: 'center' }}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThirdPartyLogin('微信')}>
              <Ionicons name="chatbubble-ellipses" size={40} color="#4CAF50" />
              <Text style={{ color: '#fff', textAlign: 'center' }}>微信</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Ionicons name={agreedToTerms ? 'checkbox' : 'square-outline'} size={20} color={agreedToTerms ? '#B266FF' : '#ccc'} />
            <Text style={{ color: '#fff', marginLeft: 8 }}>同意 <Text style={{ textDecorationLine: 'underline' }}>用户协议</Text> 和 <Text style={{ textDecorationLine: 'underline' }}>隐私政策</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} disabled={!isValidLogin} style={{ backgroundColor: isValidLogin ? '#9933FF' : '#aaa', padding: 15, borderRadius: 15, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>进入神秘之旅</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
