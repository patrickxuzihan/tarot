import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const notifications = [
  { id: '1', title: '系统更新', message: '塔罗App 已升级到 2.1.0，新增每日签到功能。', timestamp: '5 分钟前', isRead: false },
  { id: '2', title: '新回复', message: '星辰占卜师 在 “月亮牌在感情问题中的含义” 中回复了你。', timestamp: '1 小时前', isRead: false },
  { id: '3', title: '活动提醒', message: '明天 19:00 “塔罗教学” 直播即将开始，别错过！', timestamp: '2 小时前', isRead: true },
  { id: '4', title: '系统',   message: '您的密码已成功修改。', timestamp: '1 天前', isRead: true },
];

export default function NotificationsView() {
  const navigation = useNavigation();
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [data, setData] = useState(notifications);

  const handlePress = (item, index) => {
    const updated = [...data];
    if (!updated[index].isRead) updated[index].isRead = true;
    setData(updated);
    navigation.navigate('NotificationDetailView', { item });
  };

  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => handlePress(item, index)} style={styles.card}>
      <View style={styles.iconCircle(item.isRead)}>
        <Ionicons name="notifications" size={18} color={colors.textInverse} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={[styles.title, item.isRead && styles.titleRead]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
      </View>

      {!item.isRead && <View style={styles.redDot} />}
    </Pressable>
  );

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* 顶部：返回 + 标题 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>通知</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ padding: 16, paddingTop: 0, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 6 : 12,
      paddingBottom: 12,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    headerTitle: {
      color: c.text,
      fontSize: 20,
      fontWeight: '700',
    },

    card: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: c.surfaceCard,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    },
    iconCircle: (read) => ({
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: read ? c.surfaceLine : c.brandPrimary,
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
      color: c.text,
      maxWidth: '75%',
    },
    titleRead: {
      fontWeight: 'normal',
      color: c.subtext,
    },
    timestamp: {
      fontSize: 12,
      color: c.textMuted,
      marginLeft: 8,
    },
    message: {
      fontSize: 14,
      color: c.subtext,
    },
    redDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: c.stateError,
      marginLeft: 8,
      marginTop: 6,
    },
  });
