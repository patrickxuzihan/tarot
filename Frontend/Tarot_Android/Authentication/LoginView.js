import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Keyboard, KeyboardAvoidingView, Platform, Dimensions, Animated, Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function LoginView({ navigation, setIsLoggedIn, setTempPhoneNumber }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.auth) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode] = useState('+86');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const scrollViewRef = useRef(null);
  const windowHeight = Dimensions.get('window').height;
  const isValidLogin = phoneNumber.length >= 8 && agreedToTerms;

  // 卡片翻转与副标题淡入
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
    <LinearGradient colors={bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingVertical: 100, minHeight: windowHeight + Math.min(keyboardHeight || windowHeight * 0.05, 120) }}
          keyboardShouldPersistTaps="handled"
        >
          {/* 头部卡片区域 */}
          <View style={styles.headerWrap}>
            <Animated.View
              style={[
                styles.heroCard,
                {
                  transform: [{ perspective: 800 }, { rotateY }],
                },
              ]}
            >
              <Ionicons
                name="moon"
                size={70}
                color={colors.text}
                style={{
                  textShadowColor: colors.accentViolet,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 18,
                }}
              />
            </Animated.View>

            <Text style={styles.appTitle}>梦多塔</Text>
            <Animated.Text style={[styles.subTitle, { opacity: subtitleOpacity }]}>
              你想要的塔罗未必只是塔罗
            </Animated.Text>
          </View>

          {/* 手机号登录 */}
          <Text style={styles.sectionTitle}>手机号登录</Text>
          <View style={styles.row}>
            <TouchableOpacity disabled activeOpacity={0.8} style={styles.codeBtn}>
              <Text style={styles.codeText}>{countryCode}</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="输入手机号码"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              placeholderTextColor={colors.inputPlaceholder}
            />
          </View>

          {/* 其他登录方式 */}
          <Text style={styles.altTitle}>其他登录方式</Text>
          <View style={styles.altRow}>
            <TouchableOpacity onPress={() => handleThirdPartyLogin('微信')} activeOpacity={0.8}>
              <View style={styles.altBox}>
                <Ionicons name="chatbubble-ellipses" size={30} color="#27C24C" />
              </View>
              <Text style={styles.altText}>微信</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleThirdPartyLogin('邮箱')} activeOpacity={0.8}>
              <View style={styles.altBox}>
                <MaterialIcons name="email" size={30} color="#FFC107" />
              </View>
              <Text style={styles.altText}>邮箱</Text>
            </TouchableOpacity>
          </View>

          {/* 协议 */}
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} activeOpacity={0.8} style={styles.agreeRow}>
            <Ionicons
              name={agreedToTerms ? 'checkbox-outline' : 'square-outline'}
              size={18}
              color={agreedToTerms ? colors.accentViolet : colors.subtext}
            />
            <Text style={styles.agreeText}>
              同意 <Text style={styles.link}>用户协议</Text> 和 <Text style={styles.link}>隐私政策</Text>
            </Text>
          </TouchableOpacity>

          {/* 登录按钮：可用→渐变，不可用→半透明灰 */}
          <TouchableOpacity onPress={handleLogin} disabled={!isValidLogin} activeOpacity={0.9} style={[styles.loginWrap, { opacity: isValidLogin ? 1 : 0.7 }]}>
            {isValidLogin ? (
              <LinearGradient
                colors={[colors.accent, colors.border]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.loginGradient}
              >
                <Text style={styles.loginText}>进入神秘之旅</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.loginDisabled, { backgroundColor: colors.buttonPrimaryDisabledBg }]}>
                <Text style={styles.loginText}>进入神秘之旅</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const getStyles = (c) => ({
  root: { flex: 1, paddingHorizontal: 30 },
  headerWrap: { alignItems: 'center', marginBottom: 36 },
  heroCard: {
    width: 150,
    height: 230,
    borderRadius: 20,
    backgroundColor: c.inputBg,
    borderWidth: 1,
    borderColor: c.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  appTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: c.text,
    marginTop: 16,
    textShadowColor: 'rgba(255,255,255,0.35)',
    textShadowRadius: 10,
  },
  subTitle: { color: c.subtext, marginTop: 8, fontSize: 16 },

  sectionTitle: { color: c.text, fontSize: 18, marginBottom: 12, opacity: 0.9 },
  row: { flexDirection: 'row', marginBottom: 22 },
  codeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: c.inputBg,
    borderWidth: 1,
    borderColor: c.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeText: { color: c.text, fontSize: 16 },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: c.text,
    borderRadius: 10,
    backgroundColor: c.inputBg,
    borderWidth: 1,
    borderColor: c.inputBorder,
    fontSize: 16,
  },

  altTitle: { color: c.subtext, fontSize: 14, marginBottom: 12 },
  altRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 26 },
  altBox: {
    padding: 14,
    borderRadius: 15,
    backgroundColor: c.inputBg,
    borderWidth: 1,
    borderColor: c.inputBorder,
    alignItems: 'center',
  },
  altText: { color: c.text, textAlign: 'center', marginTop: 6, fontSize: 12, opacity: 0.9 },

  agreeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, justifyContent: 'center' },
  agreeText: { color: c.text, opacity: 0.85, marginLeft: 8, fontSize: 12 },
  link: { textDecorationLine: 'underline', color: c.subtext },

  loginWrap: { borderRadius: 15, overflow: 'hidden' },
  loginGradient: { paddingVertical: 16, alignItems: 'center', borderRadius: 15 },
  loginDisabled: { paddingVertical: 16, alignItems: 'center', borderRadius: 15 },
  loginText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
