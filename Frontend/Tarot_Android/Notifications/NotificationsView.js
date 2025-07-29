import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const notifications = [
  {
    id: '1',
    title: '系统更新',
    message: '塔罗App 已升级到 2.1.0，新增每日签到功能。',
    timestamp: '5 分钟前',
    isRead: false,
  },
  {
    id: '2',
    title: '新回复',
    message: '星辰占卜师 在 “月亮牌在感情问题中的含义” 中回复了你。',
    timestamp: '1 小时前',
    isRead: false,
  },
  {
    id: '3',
    title: '活动提醒',
    message: '明天 19:00 “塔罗教学” 直播即将开始，别错过！',
    timestamp: '2 小时前',
    isRead: true,
  },
  {
    id: '4',
    title: '系统',
    message: '您的密码已成功修改。',
    timestamp: '1 天前',
    isRead: true,
  },
];

export default function NotificationsView() {
  const navigation = useNavigation();
  const [data, setData] = useState(notifications);

  const handlePress = (item, index) => {
    const updated = [...data];
    updated[index].isRead = true;
    setData(updated);
    navigation.navigate('NotificationDetailView', { item });
  };

  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => handlePress(item, index)} style={styles.card}>
      <View style={styles.iconCircle(item.isRead)}>
        <Text style={{ color: '#fff' }}>🔔</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={[styles.title, item.isRead && { fontWeight: 'normal' }]}>{item.title}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
      </View>
      {!item.isRead && <View style={styles.redDot} />}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{'<'} </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a1144',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backText: {
    color: 'white',
    fontSize: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#3d2d5c',
    borderRadius: 12,
    padding: 12,
  },
  iconCircle: (read) => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: read ? '#999' : '#9646cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  }),
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#ccc',
  },
  message: {
    fontSize: 14,
    color: '#eee',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginLeft: 8,
    marginTop: 6,
  },
});
