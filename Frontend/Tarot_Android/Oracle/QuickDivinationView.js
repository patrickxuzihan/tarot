import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function QuickDivinationView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bg = (gradients && gradients.deep) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const scrollViewRef = useRef();

  // 手图标动画
  const handAnim = useRef(new Animated.Value(0)).current;

  // 打字点动画状态
  const [dotAnimation] = useState([
    new Animated.Value(0.4),
    new Animated.Value(0.4),
    new Animated.Value(0.4),
  ]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(handAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(handAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  useEffect(() => {
    if (isTyping) {
      const animations = dotAnimation.map((value, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 200),
            Animated.timing(value, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(value, { toValue: 0.4, duration: 300, useNativeDriver: true }),
          ]),
        ),
      );
      animations.forEach((a) => a.start());
      return () => animations.forEach((a) => a.stop());
    }
  }, [isTyping]);

  const sendMessage = async () => {
    if (!inputText.trim() || sentCount >= 2) return;

    const userMessage = { content: inputText.trim(), isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setSentCount((prev) => prev + 1);

    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk-04fc80568ef94b909fae278a5cd24475',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-reasoner',
          messages: [
            {
              role: 'system',
              content:
                '你是一位塔罗解读师，用最口语化的方式给出不超过600字的指引。\n1. 请先"模拟抽三张塔罗牌"，然后结合正逆位说一两句。\n2. 不要出现"AI"、"模型"之类词汇。\n3. 不只是解读牌，还要给个实际例子，比如"比如你在职场…"\n4. 结尾保持一句行动建议即可。',
            },
            { role: 'user', content: userMessage.content },
          ],
        }),
      });

      const json = await res.json();
      const reply = json.choices?.[0]?.message?.content?.trim();
      setMessages((prev) => [...prev, { content: reply || '请求出错，请稍后再试。', isUser: false }]);
    } catch (err) {
      setMessages((prev) => [...prev, { content: '请求出错，请稍后再试。', isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      setMessages([{ content: '欢迎来到塔罗占卜🔮🔮🔮🔮\n请描述您的困惑或问题。', isUser: false }]);
    }, 500);
  }, []);

  const handTranslateY = handAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <LinearGradient colors={bg} style={styles.container}>
      {/* 导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.85}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Ionicons name="moon" size={24} color={colors.accentGold} />
          <Text style={styles.headerTitle}>快速占卜</Text>
        </View>
      </View>

      {/* 欢迎卡片 */}
      <View style={styles.welcomeCard}>
        <Animated.View style={{ transform: [{ translateY: handTranslateY }] }}>
          <Ionicons name="hand-right" size={40} color={colors.accentGold} />
        </Animated.View>
        <Text style={styles.welcomeTitle}>神秘塔罗指引</Text>
        <Text style={styles.welcomeSubtitle}>请输入您的问题或困惑</Text>
      </View>

      {/* 聊天区域 */}
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent} ref={scrollViewRef}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[styles.messageContainer, msg.isUser ? styles.userMessageContainer : styles.botMessageContainer]}
            >
              {!msg.isUser && <Ionicons name="star" size={32} color={colors.accentGold} style={styles.messageIcon} />}

              <View style={[styles.messageBubble, msg.isUser ? styles.userBubble : styles.botBubble]}>
                <Text style={styles.messageText}>{msg.content}</Text>
              </View>

              {msg.isUser && (
                <Ionicons name="person-circle" size={32} color={colors.accentViolet} style={styles.messageIcon} />
              )}
            </View>
          ))}

          {isTyping && (
            <View style={styles.typingContainer}>
              <Ionicons name="star" size={20} color={colors.accentGold} />
              <Text style={styles.typingText}>塔罗精灵正在加载牌面</Text>
              <View style={styles.dotsContainer}>
                {dotAnimation.map((anim, idx) => (
                  <Animated.Text key={idx} style={[styles.dotText, { opacity: anim }]}>
                    .
                  </Animated.Text>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {sentCount >= 2 && <Text style={styles.limitText}>本轮占卜次数已用完</Text>}

      {/* 输入区域 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        style={styles.inputKeyboardView}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, (!inputText.trim() || sentCount >= 2) && styles.disabledInput]}
            multiline
            value={inputText}
            onChangeText={setInputText}
            maxLength={300}
            placeholder="输入你的问题..."
            placeholderTextColor={colors.inputPlaceholder}
            editable={sentCount < 2}
          />
          <View style={styles.sendButtonContainer}>
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!inputText.trim() || sentCount >= 2}
              style={styles.sendButton}
            >
              <Ionicons
                name="arrow-up-circle"
                size={38}
                color={inputText.trim() && sentCount < 2 ? colors.accentViolet : colors.surfaceLine}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 15,
      paddingHorizontal: 15,
    },
    titleContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 15 },
    headerTitle: { color: c.text, fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
    backButton: { marginRight: 10 },

    welcomeCard: {
      backgroundColor: c.surfaceCard,
      borderRadius: 25,
      margin: 20,
      padding: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: c.accentViolet,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 5,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    welcomeTitle: {
      color: c.text,
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 15,
      textShadowColor: 'rgba(0,0,0,0.35)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 4,
    },
    welcomeSubtitle: { color: c.subtext, marginTop: 8, fontSize: 16 },

    chatContainer: { flex: 1, paddingHorizontal: 10 },
    chatContent: { paddingBottom: 20 },

    messageContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15, paddingHorizontal: 8 },
    userMessageContainer: { justifyContent: 'flex-end' },
    botMessageContainer: { justifyContent: 'flex-start' },
    messageIcon: { marginTop: 4, marginHorizontal: 6 },

    messageBubble: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      maxWidth: '75%',
    },
    botBubble: {
      backgroundColor: c.surfaceCard,
      borderTopLeftRadius: 4,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    userBubble: {
      backgroundColor: c.accentViolet,
      borderTopRightRadius: 4,
    },
    messageText: { color: c.text, fontSize: 16, lineHeight: 22 },

    typingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.surfaceCard,
      borderRadius: 15,
      paddingHorizontal: 14,
      paddingVertical: 10,
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    typingText: { color: c.subtext, fontSize: 15, marginLeft: 8, marginRight: 4 },
    dotsContainer: { flexDirection: 'row', width: 28 },
    dotText: { color: c.text, fontSize: 24, lineHeight: 20 },

    limitText: { color: c.stateError, textAlign: 'center', paddingBottom: 8, fontWeight: '500' },

    inputKeyboardView: {
      position: 'absolute',
      bottom: 56,
      left: 0,
      right: 0,
      backgroundColor: c.bg,
      paddingBottom: Platform.OS === 'ios' ? 30 : 10,
      borderTopWidth: 1,
      borderTopColor: c.border,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingBottom: 12,
      paddingTop: 6,
    },
    input: {
      flex: 1,
      minHeight: 56,
      maxHeight: 140,
      backgroundColor: c.inputBg,
      color: c.text,
      borderRadius: 24,
      paddingHorizontal: 18,
      paddingVertical: 16,
      fontSize: 17,
      borderWidth: 1,
      borderColor: c.inputBorder,
    },
    disabledInput: { opacity: 0.7 },
    sendButtonContainer: { justifyContent: 'center', height: '100%', marginLeft: 10 },
    sendButton: { padding: 6 },
  });
