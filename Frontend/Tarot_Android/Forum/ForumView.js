import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const tags = ['全部', '爱情', '事业', '学业', '健康','a','b','c','d','e','f','g','h','i','j','k'];

const samplePosts = [
  {
    id: 1,
    tag: '爱情',
    author: '星尘塔罗',
    title: '爱情塔罗解读',
    content: '今天抽到的是恋人牌，意味着感情关系将进入新阶段...',
    time: '2小时前'
  },
  {
    id: 2,
    tag: '学业',
    author: '神秘小猫',
    title: '塔罗新手求问',
    content: '大家觉得学习塔罗要先从哪套牌开始呢？',
    time: '5小时前'
  },
  {
    id: 3,
    tag: '学业',
    author: '神秘小猫',
    title: '塔罗新手求问',
    content: '大家觉得学习塔罗要先从哪套牌开始呢？',
    time: '5小时前'
  },
  {
    id: 4,
    tag: '学业',
    author: '神秘小猫',
    title: '塔罗新手求问',
    content: '大家觉得学习塔罗要先从哪套牌开始呢？',
    time: '5小时前'
  },
  {
    id: 5,
    tag: '学业',
    author: '神秘小猫',
    title: '塔罗新手求问',
    content: '大家觉得学习塔罗要先从哪套牌开始呢？',
    time: '5小时前'
  },
  {
    id: 6,
    tag: '学业',
    author: '神秘小猫',
    title: '塔罗新手求问',
    content: '大家觉得学习塔罗要先从哪套牌开始呢？',
    time: '5小时前'
  },
  {
    id: 7,
    tag: '学业',
    author: '神秘小猫',
    title: '塔罗新手求问',
    content: '大家觉得学习塔罗要先从哪套牌开始呢？',
    time: '5小时前'
  }
];

export default function ForumScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState('全部');
  const navigation = useNavigation();

  const filteredPosts = samplePosts.filter(
    (post) =>
      (selectedTag === '全部' || post.tag === selectedTag) &&
      (post.title.includes(searchText) || post.content.includes(searchText))
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>塔罗论坛</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.tagContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagScrollContent}
        >
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tagButton, selectedTag === tag && styles.selectedTagButton]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text style={[styles.tagText, selectedTag === tag && styles.selectedTagText]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="搜索帖子、话题..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {filteredPosts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postCard}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent} numberOfLines={2}>{post.content}</Text>
            <View style={styles.postFooter}>
              <Text style={styles.postAuthor}>{post.author}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.newPostButton}>
        <Ionicons name="add-circle" size={56} color="#F0A500" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#260D40' },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#311447',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  headerTitle: { fontSize: 24, color: 'white', fontWeight: 'bold' },
  tagContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  tagScrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  tagButton: {
    backgroundColor: '#3a235e',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10
  },
  selectedTagButton: {
    backgroundColor: '#F0A500'
  },
  tagText: { color: '#ccc', fontSize: 14 },
  selectedTagText: { color: '#260D40', fontWeight: 'bold' },
  searchBox: {
    backgroundColor: '#3a235e',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10
  },
  searchInput: { color: 'white', fontSize: 16 },
  postCard: {
    backgroundColor: '#3a235e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  postTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  postContent: { color: '#ccc', fontSize: 14 },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  postAuthor: { color: '#aaa', fontSize: 12 },
  postTime: { color: '#aaa', fontSize: 12 },
  newPostButton: {
    position: 'absolute',
    right: 20,
    bottom: 40
  }
});
