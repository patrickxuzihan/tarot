import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function QuickDivinationView() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!inputText.trim() || sentCount >= 2) return;

    const userMessage = { content: inputText.trim(), isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setSentCount(prev => prev + 1);

    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-04fc80568ef94b909fae278a5cd24475',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-reasoner',
          messages: [
            { role: 'system', content: '你是一位塔罗解读师，用最口语化的方式给出不超过600字的指引。\n1. 请先“模拟抽三张塔罗牌”，然后结合正逆位说一两句。\n2. 不要出现“AI”、“模型”之类词汇。\n3. 不只是解读牌，还要给个实际例子，比如“比如你在职场…”\n4. 结尾保持一句行动建议即可。' },
            { role: 'user', content: userMessage.content },
          ]
        })
      });

      const json = await res.json();
      const reply = json.choices?.[0]?.message?.content?.trim();

      setMessages(prev => [...prev, { content: reply || '请求出错，请稍后再试。', isUser: false }]);
    } catch (err) {
      setMessages(prev => [...prev, { content: '请求出错，请稍后再试。', isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      setMessages([{ content: '欢迎来到塔罗占卜🔮\n请描述您的困惑或问题。', isUser: false }]);
    }, 500);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#2c1140' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingBottom: 10, paddingHorizontal: 15, backgroundColor: '#1d0d30' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>快速占卜</Text>
      </View>

      <View style={{ backgroundColor: '#3c1f60', borderRadius: 20, margin: 15, padding: 20, alignItems: 'center' }}>
        <MaterialCommunityIcons name="hand-okay" size={30} color="#f8cc44" />
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>神秘塔罗指引</Text>
        <Text style={{ color: '#e9d9ff', marginTop: 6 }}>请输入您的问题或困惑</Text>
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 15 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={scrollViewRef}
      >
        {messages.map((msg, index) => (
          <View key={index} style={{ flexDirection: msg.isUser ? 'row-reverse' : 'row', marginBottom: 10 }}>
            <View style={{ backgroundColor: msg.isUser ? '#8040cc' : '#3a2158', padding: 10, borderRadius: 16, maxWidth: '80%' }}>
              <Text style={{ color: 'white', fontSize: 15 }}>{msg.content}</Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ backgroundColor: '#3a2158', padding: 10, borderRadius: 16 }}>
              <Text style={{ color: '#e9d9ff' }}>塔罗精灵正在加载牌面...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {sentCount >= 2 && (
        <Text style={{ color: 'red', textAlign: 'center', paddingBottom: 5 }}>本轮占卜次数已用完</Text>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 10 }}>
          <TextInput
            style={{
              flex: 1,
              minHeight: 40,
              maxHeight: 150,
              backgroundColor: '#2a134a',
              color: 'white',
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 10,
              fontSize: 16,
            }}
            multiline
            value={inputText}
            onChangeText={setInputText}
            maxLength={300}
            placeholder="输入你的问题..."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!inputText.trim() || sentCount >= 2}
            style={{ marginLeft: 10 }}
          >
            <Ionicons
              name="arrow-up-circle"
              size={34}
              color={inputText.trim() && sentCount < 2 ? '#c088ff' : '#4b3f66'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
