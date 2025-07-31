import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Keyboard, KeyboardAvoidingView, Platform, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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
      navigation.navigate('Home');
    } else {
      navigation.navigate('Registration');
    }
  };

  return (
    <LinearGradient colors={['#260D40', '#401966']} style={{ flex: 1, paddingHorizontal: 30 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingVertical: 120, minHeight: windowHeight + 300 }} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center', marginBottom: 50 }}>
            {/* 修改点1：为月亮图标添加发光效果 */}
            <Ionicons 
              name="moon" 
              size={100} 
              color="#fff" 
              style={{
                textShadowColor: 'rgba(179, 102, 255, 0.8)',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 20,
              }}
            />
            <Text style={{ fontSize: 42, fontWeight: 'bold', color: '#fff', marginTop: 10 }}>梦多塔</Text>
            <Text style={{ color: '#D9B3FF', marginTop: 12, fontSize: 18 }}>你想要的塔罗未必只是塔罗</Text>
          </View>

          <Text style={{ color: '#fff', fontSize: 22, marginBottom: 16 }}>手机号登录</Text>
          <View style={{ flexDirection: 'row', marginBottom: 32 }}>
            <TouchableOpacity disabled style={{ padding: 14, backgroundColor: '#8040B3', borderRadius: 10 }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>{countryCode}</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="输入手机号码"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={{ flex: 1, marginLeft: 12, padding: 14, backgroundColor: '#8040B3', color: '#fff', borderRadius: 10, fontSize: 18 }}
              placeholderTextColor="#ccc"
            />
          </View>

          <Text style={{ color: '#aaa', fontSize: 18, marginBottom: 20 }}>其他登录方式</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 48 }}>
            <TouchableOpacity onPress={() => handleThirdPartyLogin('微信')}>
              <Ionicons name="chatbubble-ellipses" size={58} color="#4CAF50" style={{ alignSelf: 'center' }} />
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 8, fontSize: 18 }}>微信</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleThirdPartyLogin('邮箱')}>
              <MaterialIcons name="email" size={58} color="#FFC107" style={{ alignSelf: 'center' }} />
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 8, fontSize: 18 }}>邮箱</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 28 }}>
            <Ionicons name={agreedToTerms ? 'checkbox' : 'square-outline'} size={26} color={agreedToTerms ? '#B266FF' : '#ccc'} />
            <Text style={{ color: '#fff', marginLeft: 12, fontSize: 16 }}>同意 <Text style={{ textDecorationLine: 'underline' }}>用户协议</Text> 和 <Text style={{ textDecorationLine: 'underline' }}>隐私政策</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} disabled={!isValidLogin} style={{ backgroundColor: isValidLogin ? '#9933FF' : '#aaa', padding: 22, borderRadius: 15, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20 }}>进入神秘之旅</Text>
          </TouchableOpacity>

          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}