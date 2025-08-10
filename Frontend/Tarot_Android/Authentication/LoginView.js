// LoginView.js（仅外观升级；功能与路由保持不变）
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Keyboard, KeyboardAvoidingView, Platform, Dimensions, Animated, Easing
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

  // 新增：卡片翻转与副标题淡入
  const cardRotation = useRef(new Animated.Value(0)).current; // 0 -> 180
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => setKeyboardHeight(e.endCoordinates.height));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  useEffect(() => {
    Animated.timing(cardRotation, {
      toValue: 180,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const rotateY = cardRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

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
    <LinearGradient
      colors={['#260D40', '#401966']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{ flex: 1, paddingHorizontal: 30 }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingVertical: 100, minHeight: windowHeight + Math.min(keyboardHeight || windowHeight * 0.05, 120) }}
          keyboardShouldPersistTaps="handled"
        >
          {/* 头部卡片区域 */}
          <View style={{ alignItems: 'center', marginBottom: 36 }}>
            <Animated.View
              style={{
                width: 150, height: 230, borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
                justifyContent: 'center', alignItems: 'center',
                shadowColor: 'rgba(255,255,255,0.5)',
                shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 15,
                transform: [{ perspective: 800 }, { rotateY }],
              }}
            >
              <Ionicons
                name="moon"
                size={70}
                color="#E7DAFF"
                style={{
                  textShadowColor: 'rgba(179,102,255,0.8)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 18,
                }}
              />
            </Animated.View>

            <Text style={{ fontSize: 38, fontWeight: 'bold', color: '#FFFFFF', marginTop: 16, textShadowColor: 'rgba(255,255,255,0.35)', textShadowRadius: 10 }}>
              梦多塔
            </Text>
            <Animated.Text style={{ color: '#C9B2FF', marginTop: 8, fontSize: 16, opacity: subtitleOpacity }}>
              你想要的塔罗未必只是塔罗
            </Animated.Text>
          </View>

          {/* 手机号登录 */}
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, marginBottom: 12 }}>手机号登录</Text>
          <View style={{ flexDirection: 'row', marginBottom: 22 }}>
            <TouchableOpacity disabled activeOpacity={0.8}
              style={{
                paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
                justifyContent: 'center', alignItems: 'center'
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{countryCode}</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="输入手机号码"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={{
                flex: 1, marginLeft: 10, paddingHorizontal: 14, paddingVertical: 10,
                color: '#FFFFFF', borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
                fontSize: 16
              }}
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
          </View>

          {/* 其他登录方式 */}
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 12 }}>其他登录方式</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 26 }}>
            <TouchableOpacity onPress={() => handleThirdPartyLogin('微信')} activeOpacity={0.8}>
              <View style={{
                padding: 14, borderRadius: 15,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
                alignItems: 'center'
              }}>
                <Ionicons name="chatbubble-ellipses" size={30} color="#27C24C" />
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 6, fontSize: 12 }}>微信</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleThirdPartyLogin('邮箱')} activeOpacity={0.8}>
              <View style={{
                padding: 14, borderRadius: 15,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
                alignItems: 'center'
              }}>
                <MaterialIcons name="email" size={30} color="#FFC107" />
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 6, fontSize: 12 }}>邮箱</Text>
            </TouchableOpacity>
          </View>

          {/* 协议 */}
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, justifyContent: 'center' }}
          >
            <Ionicons
              name={agreedToTerms ? 'checkbox-outline' : 'square-outline'}
              size={18}
              color={agreedToTerms ? '#B266FF' : 'rgba(255,255,255,0.7)'}
            />
            <Text style={{ color: 'rgba(255,255,255,0.85)', marginLeft: 8, fontSize: 12 }}>
              同意 <Text style={{ textDecorationLine: 'underline', color: '#C9B2FF' }}>用户协议</Text> 和 <Text style={{ textDecorationLine: 'underline', color: '#C9B2FF' }}>隐私政策</Text>
            </Text>
          </TouchableOpacity>

          {/* 登录按钮：可用→渐变，不可用→半透明灰 */}
          <TouchableOpacity onPress={handleLogin} disabled={!isValidLogin} activeOpacity={0.9}
            style={{
              borderRadius: 15, overflow: 'hidden',
              opacity: isValidLogin ? 1 : 0.7
            }}
          >
            {isValidLogin ? (
              <LinearGradient
                colors={['#B266FF', '#7A3BC8']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={{ paddingVertical: 16, alignItems: 'center', borderRadius: 15 }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>进入神秘之旅</Text>
              </LinearGradient>
            ) : (
              <View style={{
                paddingVertical: 16, alignItems: 'center',
                backgroundColor: 'rgba(200,200,200,0.35)', borderRadius: 15
              }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>进入神秘之旅</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
