import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const Comment = {
  sampleComments: [
    { id: '1', author: '塔罗爱好者', content: '这个解读非常准确，我也抽到了恋人牌，真的遇到了心仪的对象！', timestamp: new Date(Date.now() - 1000 * 60 * 30), likes: 5 },
    { id: '2', author: '神秘学研究者', content: '感谢分享，对于战车牌的解读很有启发，确实需要主动出击', timestamp: new Date(Date.now() - 1000 * 60 * 120), likes: 3 },
    { id: '3', author: '新手占卜师', content: '请问对于逆位的圣杯九有什么特别的解读吗？', timestamp: new Date(Date.now() - 1000 * 60 * 180), likes: 2 },
  ],
};

export default function PostDetailView({ route }) {
  const navigation = useNavigation();
  const { post } = route.params;
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(Comment.sampleComments);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const formatTime = () => post.time;

  const handleLike = () => {
    setIsLiked((v) => !v);
    setLikeCount((n) => (isLiked ? n - 1 : n + 1));
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: String(comments.length + 1),
      author: '当前用户',
      content: commentText,
      timestamp: new Date(),
      likes: 0,
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <LinearGradient colors={bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.postContent}>
          <View style={styles.authorInfo}>
            <Ionicons name="person-circle" size={40} color={colors.subtext} style={styles.authorIcon} />
            <View style={styles.authorDetails}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.postTime}>{formatTime()}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>关注</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.postTitle}>{post.title}</Text>

          <View style={styles.tagContainer}>
            <View style={styles.postTag}>
              <Text style={styles.tagText}>#{post.tag}</Text>
            </View>
          </View>

          <Text style={styles.postText}>{post.content}</Text>

          <View style={styles.interactionButtons}>
            <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
              <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={22} color={isLiked ? colors.stateError : colors.subtext} />
              <Text style={styles.interactionText}>{likeCount}</Text>
            </TouchableOpacity>

            <View style={styles.interactionButton}>
              <Ionicons name="chatbubble-outline" size={22} color={colors.subtext} />
              <Text style={styles.interactionText}>{post.comments}</Text>
            </View>

            <View style={styles.interactionButton}>
              <Ionicons name="arrow-redo-outline" size={22} color={colors.subtext} />
              <Text style={styles.interactionText}>分享</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{likeCount}人点赞 • {comments.length}条评论</Text>
        </View>

        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>评论</Text>

          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <Ionicons name="person-circle" size={30} color={colors.subtext} style={styles.commentIcon} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  <Text style={styles.commentTime}>
                    {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <View style={styles.commentAction}>
                  <Ionicons name="heart-outline" size={16} color={colors.subtext} />
                  <Text style={styles.commentActionText}>{comment.likes}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="写下你的评论..."
          placeholderTextColor={colors.inputPlaceholder}
          value={commentText}
          onChangeText={setCommentText}
          selectionColor={colors.accentViolet}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment} disabled={!commentText.trim()}>
          <Ionicons name="paper-plane" size={22} color={commentText.trim() ? colors.accentViolet : colors.textMuted} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1, padding: 15, paddingTop: 60 },
    backButton: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 50 : 20,
      left: 20,
      zIndex: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.surfaceGlass,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.border,
    },

    postContent: {
      backgroundColor: c.surfaceCard,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    authorInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    authorIcon: { marginRight: 12 },
    authorDetails: { flex: 1 },
    authorName: { color: c.text, fontSize: 18, fontWeight: 'bold' },
    postTime: { color: c.textMuted, fontSize: 13, marginTop: 4 },
    followButton: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.surfaceLine,
      backgroundColor: c.surface,
    },
    followButtonText: { color: c.subtext, fontSize: 14, fontWeight: '600' },

    postTitle: { color: c.text, fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    tagContainer: { marginBottom: 15 },
    postTag: {
      backgroundColor: c.surfaceGlass,
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 6,
      alignSelf: 'flex-start',
    },
    tagText: { color: c.text, fontSize: 14 },

    postText: { color: c.subtext, fontSize: 16, lineHeight: 24, marginBottom: 20 },

    interactionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: c.surfaceLine,
    },
    interactionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12 },
    interactionText: { color: c.subtext, marginLeft: 6, fontSize: 15 },

    statsContainer: { padding: 10 },
    statsText: { color: c.subtext, fontSize: 14 },

    commentsContainer: { marginTop: 10 },
    commentsTitle: { color: c.text, fontSize: 20, fontWeight: 'bold', marginBottom: 12 },

    commentCard: {
      flexDirection: 'row',
      backgroundColor: c.surfaceCard,
      borderRadius: 12,
      padding: 15,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    commentIcon: { marginRight: 12 },
    commentContent: { flex: 1 },
    commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    commentAuthor: { color: c.text, fontSize: 16, fontWeight: '600' },
    commentTime: { color: c.textMuted, fontSize: 12 },
    commentText: { color: c.subtext, fontSize: 15, lineHeight: 22, marginBottom: 8 },
    commentAction: { flexDirection: 'row', alignItems: 'center' },
    commentActionText: { color: c.subtext, marginLeft: 6, fontSize: 13 },

    commentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: c.surface,
      borderTopWidth: 1,
      borderTopColor: c.surfaceLine,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 56,
    },
    commentInput: {
      flex: 1,
      backgroundColor: c.inputBg,
      borderRadius: 22,
      paddingVertical: 10,
      paddingHorizontal: 16,
      color: c.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: c.surfaceLine,
    },
    sendButton: {
      marginLeft: 10,
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: c.surfaceGlass,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.surfaceLine,
    },
  });
