import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const NewPostModal = ({ visible, onClose, onPublish }) => {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('选择话题');
  const [showTopicPicker, setShowTopicPicker] = useState(false);

  const topics = ['塔罗解读', '牌意讨论', '占卜经验', '问题求助', '其他'];
  const disabled = postTitle === '' || postContent === '' || selectedTopic === '选择话题';

  const handlePublish = () => {
    onPublish({ selectedTopic, postTitle, postContent });
    setPostTitle('');
    setPostContent('');
    setSelectedTopic('选择话题');
    onClose();
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBackground} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContent}>
          <LinearGradient colors={bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.newPostContainer}>
            {/* 头部 */}
            <View style={styles.newPostHeader}>
              <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                <Text style={styles.headerButtonText}>取消</Text>
              </TouchableOpacity>

              <Text style={styles.newPostTitle}>发布新帖</Text>

              <TouchableOpacity onPress={() => console.log('保存草稿')} style={styles.headerButton}>
                <Text style={styles.headerButtonText}>草稿</Text>
              </TouchableOpacity>
            </View>

            {/* 内容区域 */}
            <ScrollView contentContainerStyle={styles.newPostContent} keyboardShouldPersistTaps="handled">
              {/* 话题选择 */}
              <View style={styles.topicSection}>
                <Text style={styles.sectionTitle}>选择话题</Text>
                <TouchableOpacity style={styles.topicPicker} onPress={() => setShowTopicPicker(true)}>
                  <Text
                    style={[
                      styles.topicText,
                      selectedTopic === '选择话题' && styles.placeholderText
                    ]}
                  >
                    {selectedTopic}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              {/* 标题输入 */}
              <View style={styles.titleSection}>
                <Text style={styles.sectionTitle}>标题</Text>
                <TextInput
                  style={styles.titleInput}
                  placeholder="输入帖子标题"
                  placeholderTextColor={colors.inputPlaceholder}
                  value={postTitle}
                  onChangeText={setPostTitle}
                  selectionColor={colors.accentViolet}
                />
              </View>

              {/* 内容输入 */}
              <View style={styles.contentSection}>
                <Text style={styles.sectionTitle}>内容</Text>
                <TextInput
                  style={styles.contentInput}
                  placeholder="输入帖子内容..."
                  placeholderTextColor={colors.inputPlaceholder}
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                  value={postContent}
                  onChangeText={setPostContent}
                  selectionColor={colors.accentViolet}
                />
              </View>
            </ScrollView>

            {/* 发布按钮 */}
            <TouchableOpacity
              style={[styles.publishButton, disabled && styles.disabledButton]}
              onPress={handlePublish}
              disabled={disabled}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.brandPrimary, colors.accentViolet]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.publishGradient}
              >
                <Text style={styles.publishText}>发布</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </KeyboardAvoidingView>
      </View>

      {/* 话题选择器模态框 */}
      <Modal
        visible={showTopicPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTopicPicker(false)}
      >
        <View style={styles.topicPickerBackdrop}>
          <View style={styles.topicPickerModal}>
            <Text style={styles.topicPickerTitle}>选择话题</Text>

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

            <TouchableOpacity style={styles.topicPickerCancel} onPress={() => setShowTopicPicker(false)}>
              <Text style={styles.topicPickerCancelText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const getStyles = (c) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      height: '85%',
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },
    newPostContainer: {
      flex: 1,
    },
    newPostHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: c.surface,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: c.surfaceLine,
    },
    newPostTitle: {
      color: c.text,
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerButton: {
      padding: 8,
    },
    headerButtonText: {
      color: c.subtext,
      fontSize: 16,
      fontWeight: '600',
    },
    newPostContent: {
      padding: 20,
      paddingBottom: 100,
    },
    sectionTitle: {
      color: c.text,
      fontSize: 14,
      marginBottom: 8,
      opacity: 0.9,
    },

    topicSection: { marginBottom: 25 },
    topicPicker: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: c.surfaceCard,
      borderRadius: 12,
      padding: 15,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    topicText: {
      color: c.text,
      fontSize: 16,
    },
    placeholderText: {
      color: c.inputPlaceholder,
    },

    titleSection: { marginBottom: 25 },
    titleInput: {
      backgroundColor: c.inputBg,
      borderRadius: 12,
      padding: 15,
      color: c.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: c.surfaceLine,
    },

    contentSection: { marginBottom: 25 },
    contentInput: {
      backgroundColor: c.inputBg,
      borderRadius: 12,
      padding: 15,
      color: c.text,
      fontSize: 16,
      minHeight: 200,
      textAlignVertical: 'top',
      borderWidth: 1,
      borderColor: c.surfaceLine,
    },

    publishButton: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 5,
      shadowColor: c.accentViolet,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
    },
    disabledButton: {
      opacity: 0.6,
    },
    publishGradient: {
      padding: 16,
      alignItems: 'center',
    },
    publishText: {
      color: c.textInverse,
      fontSize: 18,
      fontWeight: 'bold',
    },

    // 话题选择器样式
    topicPickerBackdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    topicPickerModal: {
      backgroundColor: c.surfaceCard,
      borderRadius: 20,
      padding: 20,
      width: '80%',
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    topicPickerTitle: {
      color: c.text,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    topicOption: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: c.surfaceLine,
    },
    topicOptionText: {
      color: c.text,
      fontSize: 18,
      textAlign: 'center',
    },
    topicPickerCancel: {
      marginTop: 15,
      padding: 15,
    },
    topicPickerCancelText: {
      color: c.stateError,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

export default NewPostModal;
