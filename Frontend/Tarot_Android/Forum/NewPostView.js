import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const topics = ["塔罗解读", "牌意讨论", "占卜经验", "问题求助", "其他"];

export default function NewPostView() {
  const navigation = useNavigation();
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('选择话题');
  const [showTopicPicker, setShowTopicPicker] = useState(false);

  const handlePublish = () => {
    // 模拟创建帖子的 API 调用
    console.log('发布帖子:', { selectedTopic, postTitle, postContent });
    
    // 实际项目中应调用 API:
    // ForumService.createPost(selectedTopic, postTitle, postContent)
    //   .then(success => {
    //     if (success) navigation.goBack();
    //   });
    
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#260d40', '#3a235e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* 头部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>取消</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>发布新帖</Text>
        
        <TouchableOpacity 
          onPress={() => console.log('保存草稿')}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>草稿</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* 话题选择器 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>选择话题</Text>
            
            <TouchableOpacity 
              style={styles.topicPicker}
              onPress={() => setShowTopicPicker(true)}
            >
              <Text style={[
                styles.topicText,
                selectedTopic === '选择话题' && styles.placeholderText
              ]}>
                {selectedTopic}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#aaa" />
            </TouchableOpacity>
          </View>

          {/* 标题输入 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>标题</Text>
            <TextInput
              style={styles.input}
              placeholder="输入帖子标题"
              placeholderTextColor="#999"
              value={postTitle}
              onChangeText={setPostTitle}
              selectionColor="#D9B3FF"
            />
          </View>

          {/* 内容输入 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>内容</Text>
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="输入帖子内容..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              value={postContent}
              onChangeText={setPostContent}
              selectionColor="#D9B3FF"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 发布按钮 */}
      <TouchableOpacity
        style={[
          styles.publishButton,
          (postTitle === '' || postContent === '' || selectedTopic === '选择话题') && 
            styles.disabledButton
        ]}
        onPress={handlePublish}
        disabled={postTitle === '' || postContent === '' || selectedTopic === '选择话题'}
      >
        <LinearGradient
          colors={['#B06BF0', '#8A40D0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.publishText}>发布</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* 话题选择模态框 */}
      <Modal
        visible={showTopicPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTopicPicker(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>选择话题</Text>
            
            {topics.map((topic) => (
              <TouchableOpacity
                key={topic}
                style={styles.topicOption}
                onPress={() => {
                  setSelectedTopic(topic);
                  setShowTopicPicker(false);
                }}
              >
                <Text style={styles.topicOptionText}>{topic}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={styles.cancelOption}
              onPress={() => setShowTopicPicker(false)}
            >
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'rgba(42, 17, 68, 0.8)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#D9B3FF',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  topicPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 50, 120, 0.5)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  topicText: {
    color: 'white',
    fontSize: 16,
  },
  placeholderText: {
    color: '#aaa',
  },
  input: {
    backgroundColor: 'rgba(90, 50, 120, 0.5)',
    borderRadius: 12,
    padding: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contentInput: {
    minHeight: 200,
    textAlignVertical: 'top',
  },
  publishButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#8A40D0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
  },
  publishText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#3a235e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  topicOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  topicOptionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  cancelOption: {
    marginTop: 15,
    padding: 15,
  },
  cancelText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});