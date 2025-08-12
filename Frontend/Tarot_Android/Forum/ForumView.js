import React, { useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  PanResponder,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewPostModal from './NewPostView'; // 导入新建帖子模态框组件

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// 标签颜色集合
const tagColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA94D', '#9C89B8', 
  '#F0A500', '#D9B3FF', '#FFD166', '#FFA94D', '#118AB2',
  '#EF476F', '#FFD166', '#06D6A0', '#073B4C', '#118AB2'
];

const tags = ['全部', '爱情', '事业', '学业', '健康', '财富', '人际关系', '灵性成长', '塔罗解读', '塔罗教学', '牌卡分享'];

// 为每个标签分配随机颜色
const coloredTags = tags.map((tag, index) => ({
  name: tag,
  color: tagColors[index % tagColors.length]
}));

const samplePosts = [
  {
    id: 1,
    tag: '爱情',
    author: '星尘塔罗',
    title: '爱情塔罗解读',
    content: '今天抽到的是恋人牌，意味着感情关系将进入新阶段，单身的朋友可能会遇到心仪的对象，有伴侣的朋友感情会更加深厚...',
    time: '2小时前',
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    tag: '学业',
    author: '神秘小猫',
    title: '塔罗新手求问',
    content: '大家觉得学习塔罗要先从哪套牌开始呢？经典韦特还是现代塔罗牌？求推荐适合新手的入门牌卡...',
    time: '5小时前',
    likes: 15,
    comments: 12
  },
  {
    id: 3,
    tag: '事业',
    author: '职场占卜师',
    title: '事业运势解读',
    content: '本周抽到的是战车牌，预示着需要主动出击把握机会。在职场上可能会有新的挑战，但正是你展现实力的好时机...',
    time: '7小时前',
    likes: 32,
    comments: 5
  },
  {
    id: 4,
    tag: '财富',
    author: '财富密码',
    title: '财务规划建议',
    content: '圣杯九逆位提示要审视当前的投资计划，避免冲动消费。建议做长远规划，寻求专业理财建议...',
    time: '9小时前',
    likes: 18,
    comments: 7
  },
  {
    id: 5,
    tag: '灵性成长',
    author: '心灵导师',
    title: '塔罗冥想方法',
    content: '分享一种结合塔罗牌的冥想技巧：选择一张牌，聚焦牌面细节，感受能量流动...',
    time: '昨天',
    likes: 42,
    comments: 15
  },
  {
    id: 6,
    tag: '塔罗解读',
    author: '解牌大师',
    title: '三张牌解读实例',
    content: '今天为一位朋友做了三张牌解读：过去-女祭司，现在-命运之轮，未来-太阳。分享解读思路...',
    time: '昨天',
    likes: 29,
    comments: 11
  },
  {
    id: 7,
    tag: '塔罗教学',
    author: '塔罗导师',
    title: '小阿卡纳解读技巧',
    content: '如何解读权杖、圣杯、宝剑、星币四组小阿卡纳牌？分享我的教学经验...',
    time: '2天前',
    likes: 37,
    comments: 9
  }
];

export default function ForumScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState('全部');
  const [showNewPost, setShowNewPost] = useState(false);

  // 从主页Header中的通知按钮进入Forum页面的NotificationsView
  useEffect(() => {
    if (route?.params?.openNotifications) {
      navigation.navigate('Notifications');
      navigation.setParams({ openNotifications: undefined });
    }
  }, [route?.params?.openNotifications]);
  
  // 可拖动按钮的位置状态
  const buttonPosition = useRef(
    new Animated.ValueXY({
      x: screenWidth - 80,
      y: screenHeight - 180
    })
  ).current;

  // 创建拖动手势处理器 - 添加自动贴边功能
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: (e, gestureState) => {
        buttonPosition.setOffset({
          x: buttonPosition.x._value,
          y: buttonPosition.y._value
        });
        buttonPosition.setValue({ x: 0, y: 0 });
      },
      
      onPanResponderMove: Animated.event(
        [null, { dx: buttonPosition.x, dy: buttonPosition.y }],
        { useNativeDriver: false }
      ),
      
      onPanResponderRelease: (e, gestureState) => {
        buttonPosition.flattenOffset();
        
        const buttonSize = 60;
        const margin = 20;
        const maxX = screenWidth - buttonSize - margin;
        const maxY = screenHeight - buttonSize - margin;
        
        const currentX = buttonPosition.x._value;
        const currentY = buttonPosition.y._value;
        
        const finalY = Math.max(margin, Math.min(currentY, maxY));
        
        const screenCenterX = screenWidth / 2;
        let finalX;
        
        if (currentX + buttonSize / 2 < screenCenterX) {
          finalX = margin;
        } else {
          finalX = maxX;
        }
        
        Animated.spring(buttonPosition, {
          toValue: { x: finalX, y: finalY },
          friction: 7,
          useNativeDriver: false
        }).start();
      }
    })
  ).current;

  const filteredPosts = samplePosts.filter(
    (post) =>
      (selectedTag === '全部' || post.tag === selectedTag) &&
      (post.title.includes(searchText) || post.content.includes(searchText))
  );

  const handlePublish = (postData) => {
    console.log('发布帖子:', postData);
    // 这里可以添加将新帖子添加到列表的逻辑
    // 例如: setSamplePosts([...samplePosts, newPost])
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 论坛头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>塔罗论坛</Text>
        <View style={styles.notificationContainer}>
          <TouchableOpacity 
            style={styles.notificationButton} 
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 搜索区域 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索帖子、话题..."
            placeholderTextColor="#ccc"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => console.log('打开筛选菜单')}
        >
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 热门话题 */}
      <Text style={styles.sectionTitle}>热门话题</Text>
      
      {/* 标签区域 */}
      <View style={styles.tagContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagScrollContent}
        >
          {coloredTags.map((tag) => (
            <TouchableOpacity
              key={tag.name}
              style={[
                styles.tagButton, 
                selectedTag === tag.name && styles.selectedTagButton,
                { borderColor: tag.color }
              ]}
              onPress={() => setSelectedTag(tag.name)}
            >
              <Text style={[
                styles.tagText, 
                { color: tag.color },
                selectedTag === tag.name && styles.selectedTagText
              ]}>
                #{tag.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 帖子列表 */}
      <ScrollView 
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredPosts.map((post) => (
          <TouchableOpacity 
            key={post.id} 
            style={styles.postCard}
            onPress={() => navigation.navigate('PostDetail', { post })}
          >
            <View style={styles.postTagContainer}>
              <Text style={styles.postTag}>#{post.tag}</Text>
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent} numberOfLines={2}>{post.content}</Text>
            <View style={styles.postFooter}>
              <View style={styles.authorContainer}>
                <View style={styles.authorIcon}>
                  <Ionicons name="person-circle" size={16} color="#D9B3FF" />
                </View>
                <Text style={styles.postAuthor}>{post.author}</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="heart-outline" size={16} color="#F0A500" />
                <Text style={styles.statText}>{post.likes}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color="#F0A500" />
                <Text style={styles.statText}>{post.comments}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 悬浮按钮 */}
      <Animated.View
        style={[
          styles.newPostButton, 
          {
            transform: [
              { translateX: buttonPosition.x },
              { translateY: buttonPosition.y }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity 
          style={styles.newPostButtonInner}
          onPress={() => setShowNewPost(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={36} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* 导入新建帖子模态框组件 */}
      <NewPostModal
        visible={showNewPost}
        onClose={() => setShowNewPost(false)}
        onPublish={handlePublish}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#260D40' 
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    backgroundColor: '#311447',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: { 
    fontSize: 28, 
    color: 'white', 
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  notificationContainer: {
    backgroundColor: '#4a2179',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#3a235e',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  filterButton: {
    backgroundColor: '#4a2179',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: { 
    color: 'white', 
    fontSize: 16, 
    flex: 1 
  },
  sectionTitle: {
    fontSize: 24,
    color: 'white', 
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  tagContainer: {
    marginBottom: 15
  },
  tagScrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  tagButton: {
    backgroundColor: '#3a235e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  selectedTagButton: {
    backgroundColor: '#F0A500',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tagText: { 
    fontSize: 16,
    fontWeight: '500'
  },
  selectedTagText: { 
    color: '#260D40', 
    fontWeight: 'bold' 
  },
  postsContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: '#3a235e',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  postTagContainer: {
    backgroundColor: '#4a2179',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  postTag: {
    color: '#D9B3FF',
    fontSize: 14,
    fontWeight: '500'
  },
  postTitle: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  postContent: { 
    color: '#ccc', 
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  authorIcon: {
    marginRight: 8
  },
  postAuthor: { 
    color: '#D9B3FF', 
    fontSize: 14,
    fontWeight: '500'
  },
  postTime: { 
    color: '#aaa', 
    fontSize: 14,
    fontStyle: 'italic'
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  statText: {
    color: '#F0A500',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500'
  },
  newPostButton: {
    position: 'absolute',
    backgroundColor: '#F0A500',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F0A500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  newPostButtonInner: {
    backgroundColor: '#311447',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});