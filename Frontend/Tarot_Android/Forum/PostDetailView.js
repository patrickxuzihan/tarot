import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// 评论数据结构
const Comment = {
  sampleComments: [
    {
      id: '1',
      author: '塔罗爱好者',
      authorAvatar: require('../assets/avatar1.jpg'),
      content: '这个解读非常准确，我也抽到了恋人牌，真的遇到了心仪的对象！',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likes: 5
    },
    {
      id: '2',
      author: '神秘学研究者',
      authorAvatar: require('../assets/avatar2.jpg'),
      content: '感谢分享，对于战车牌的解读很有启发，确实需要主动出击',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      likes: 3
    },
    {
      id: '3',
      author: '新手占卜师',
      authorAvatar: require('../assets/avatar3.jpg'),
      content: '请问对于逆位的圣杯九有什么特别的解读吗？',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      likes: 2
    }
  ]
};

export default function PostDetailView({ route }) {
  const navigation = useNavigation();
  const { post } = route.params;
  
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(Comment.sampleComments);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  
  // 格式化时间
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60 * 1000) return '刚刚';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分钟前`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}小时前`;
    
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // 相对时间（如 "2小时前"）
  const relativeTime = (date) => {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60 * 1000) return '刚刚';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分钟前`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}小时前`;
    
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // 处理点赞
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  
  // 添加评论
  const handleAddComment = () => {
    if (commentText.trim() === '') return;
    
    const newComment = {
      id: String(comments.length + 1),
      author: '当前用户',
      authorAvatar: require('../assets/current_user.jpg'),
      content: commentText,
      timestamp: new Date(),
      likes: 0
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };
  
  return (
    <LinearGradient
      colors={['#260d40', '#3a235e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {/* 帖子内容区域 */}
        <View style={styles.postContent}>
          {/* 作者信息 */}
          <View style={styles.authorInfo}>
            <Image 
              source={post.authorAvatar} 
              style={styles.authorAvatar}
            />
            <View style={styles.authorDetails}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.postTime}>{formatTime(post.time)}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>关注</Text>
            </TouchableOpacity>
          </View>
          
          {/* 标题 */}
          <Text style={styles.postTitle}>{post.title}</Text>
          
          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.tagsContainer}
            >
              {post.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </ScrollView>
          )}
          
          {/* 内容 */}
          <Text style={styles.postText}>{post.content}</Text>
          
          {/* 互动按钮 */}
          <View style={styles.interactionButtons}>
            <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? "#FF6B6B" : "#D9B3FF"} 
              />
              <Text style={styles.interactionText}>{likeCount}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons 
                name="chatbubble-outline" 
                size={24} 
                color="#D9B3FF" 
              />
              <Text style={styles.interactionText}>{post.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons 
                name="arrow-redo-outline" 
                size={24} 
                color="#D9B3FF" 
              />
              <Text style={styles.interactionText}>分享</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 互动统计 */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{likeCount}人点赞 • {comments.length}条评论</Text>
        </View>
        
        {/* 评论区域 */}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>评论</Text>
          
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <Image 
                source={comment.authorAvatar} 
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  <Text style={styles.commentTime}>{relativeTime(comment.timestamp)}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <TouchableOpacity style={styles.commentAction}>
                  <Ionicons name="heart-outline" size={16} color="#D9B3FF" />
                  <Text style={styles.commentActionText}>{comment.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* 评论输入区域 */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.commentInputContainer}
      >
        <TextInput
          style={styles.commentInput}
          placeholder="写下你的评论..."
          placeholderTextColor="#888"
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleAddComment}
          disabled={commentText.trim() === ''}
        >
          <Ionicons 
            name="paper-plane" 
            size={24} 
            color={commentText.trim() === '' ? "#888" : "#D9B3FF"} 
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  postContent: {
    backgroundColor: 'rgba(50, 25, 80, 0.6)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  authorDetails: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postTime: {
    color: '#D9B3FF',
    fontSize: 14,
    marginTop: 4,
  },
  followButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9B3FF',
  },
  followButtonText: {
    color: '#D9B3FF',
    fontSize: 14,
    fontWeight: '600',
  },
  postTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tagsContainer: {
    marginBottom: 15,
  },
  tag: {
    backgroundColor: 'rgba(180, 120, 220, 0.3)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  tagText: {
    color: 'white',
    fontSize: 14,
  },
  postText: {
    color: '#E0D0FF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  interactionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  interactionText: {
    color: '#D9B3FF',
    marginLeft: 8,
    fontSize: 16,
  },
  statsContainer: {
    padding: 10,
  },
  statsText: {
    color: '#D9B3FF',
    fontSize: 16,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentsTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(60, 35, 90, 0.6)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentAuthor: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  commentTime: {
    color: '#C0A0FF',
    fontSize: 13,
  },
  commentText: {
    color: '#E0D0FF',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentActionText: {
    color: '#D9B3FF',
    marginLeft: 5,
    fontSize: 14,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(40, 20, 60, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(90, 50, 120, 0.5)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(180, 120, 220, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});