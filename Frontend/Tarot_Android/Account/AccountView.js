import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';

export default function AccountView() {
  const navigation = useNavigation();
  const route = useRoute();

  // 从主页Header中的设置按钮进入Account页面的SettingsView
  useEffect(() => {
      if (route?.params?.openSettings) {
        navigation.navigate('Settings');
        navigation.setParams({ openSettings: undefined });
      }
  }, [route?.params?.openSettings]);

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const [user] = useState({
    name: '神秘塔罗师',
    email: 'tarotmaster@example.com',
    id: 'UID-12345',
    followers: 243,
    following: 19,
    level: 5,
    hasNewMedal: true,
  });

  const navItems = [
    { title: '收藏', icon: 'heart', count: 128, to: 'Favorites' },
    { title: '下载', icon: 'arrow-down-circle', count: 42, to: 'Downloads' },
    { title: '订阅', icon: 'notifications', count: 8, to: 'Subscriptions' },
    { title: '客制化', icon: 'color-wand', count: 3, to: 'Customization' },
  ];

  const onLogout = () => {
    Alert.alert('确认退出登录吗？', '退出登录后将无法使用会员功能', [
      { text: '取消', style: 'cancel' },
      { text: '退出', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <LinearGradient
      colors={['#1a0d33', '#241040', '#321857']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 1 }}
      style={styles.root}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 顶部设置按钮（导航到设置页，可按需修改路由名） */}
        <View style={styles.topBar}>
          <Text style={styles.title}>账号中心</Text>
          <TouchableOpacity
            style={styles.gearBtn}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.8}
          >
            <Ionicons name="settings-outline" size={20} color="#EBDDFF" />
          </TouchableOpacity>
        </View>

        {/* 个人资料卡片 */}
        <View style={styles.card}>
          {/* 顶部横幅 */}
          <LinearGradient
            colors={['#9D5CFF', '#5B2A96']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <Text style={styles.bannerText}>塔罗大师Lv.{user.level}</Text>
          </LinearGradient>

          {/* 主体内容 */}
          <View style={styles.cardBody}>
            {/* 头像 + 通知开关 */}
            <View style={styles.avatarWrap}>
              <LinearGradient
                colors={['#9E6BDA', '#6A3EA8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatar}
              >
                <Ionicons name="person" size={48} color="#fff" />
              </LinearGradient>
              <View style={styles.avatarRing} />
              <TouchableOpacity
                onPress={() => setIsNotificationEnabled((v) => !v)}
                activeOpacity={0.9}
                style={[
                  styles.bellSwitch,
                  { backgroundColor: isNotificationEnabled ? '#F6C944' : '#7a718b' },
                ]}
              >
                <Ionicons
                  name={isNotificationEnabled ? 'notifications' : 'notifications-off'}
                  size={16}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* 基本资料 + 关注 */}
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{user.name}</Text>

              <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
                <Ionicons name="share-social-outline" size={16} color="#EBDDFF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Followers')}
                style={styles.followBlock}
                activeOpacity={0.8}
              >
                <Text style={styles.followNum}>{user.following}</Text>
                <Text style={styles.followLabel}>关注</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fansRow}>
              <Text style={styles.fansText}>粉丝: {user.followers}</Text>
            </View>

            {/* 徽章 */}
            <View style={styles.badges}>
              <Badge icon="ribbon" text={`Lv.${user.level}`} color="#E57B59" />
              <Badge icon="gift" text="首开优惠¥1" color="#4ED3A1" />
              {user.hasNewMedal ? <Badge icon="medal" text="新勋章" color="#D05252" showDot /> : null}
            </View>

            {/* 快捷入口 */}
            <View style={styles.quickGrid}>
              <QuickAction
                icon="cash"
                title="提现"
                onPress={() => navigation.navigate('Withdrawal')}
              />
              <QuickAction
                icon="cash"
                title="会员"
                onPress={() => navigation.navigate('Membership')}
              />
              <QuickAction
                icon="brush"
                title="装扮"
                onPress={() => navigation.navigate('Outfit')}
              />
              <QuickAction
                icon="calendar"
                title="日签"
                onPress={() => navigation.navigate('DailySign')}
              />
            </View>

            {/* 营销横幅 */}
            {showPromoBanner && (
              <View style={styles.promoWrap}>
                <LinearGradient
                  colors={['#5B2A96', '#4A227F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.promo}
                >
                  <MaterialIcons name="card-giftcard" color="#FFD54F" size={22} />
                  <Text style={styles.promoText}>首充会员享3倍星愿值，限时优惠</Text>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity activeOpacity={0.9}>
                    <View style={styles.promoCTA}>
                      <Text style={styles.promoCTAText}>立即查看</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setShowPromoBanner(false)}
                    style={styles.promoClose}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
          </View>
        </View>

        {/* 我的内容 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>我的内容</Text>
          <View style={styles.grid2}>
            {navItems.map((it) => (
              <TouchableOpacity
                key={it.title}
                style={styles.navCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate(it.to)}
              >
                <Ionicons name={it.icon} size={20} color="#EBDDFF" style={{ width: 30 }} />
                <Text style={styles.navTitle}>{it.title}</Text>
                <View style={styles.countPill}>
                  <Text style={styles.countText}>{it.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 退出登录 */}
        <TouchableOpacity onPress={onLogout} activeOpacity={0.9} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LinearGradient>
  );
}

/* 徽章 */
function Badge({ icon, text, color, showDot }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Ionicons name={icon} size={12} color="#fff" />
      <Text style={styles.badgeText}>{text}</Text>
      {showDot ? <View style={styles.badgeDot} /> : null}
    </View>
  );
}

/* 快捷入口 */
function QuickAction({ icon, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.quickItem}>
      <View style={styles.quickIconWrap}>
        <Ionicons name={icon} size={20} color="#EBDDFF" />
      </View>
      <Text style={styles.quickTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 20, paddingTop: Platform.OS === 'ios' ? 20 : 16 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  gearBtn: {
    marginLeft: 'auto',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* 卡片 */
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    shadowColor: '#7D3CFF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    marginBottom: 20,
  },
  banner: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  cardBody: { padding: 18, backgroundColor: 'rgba(25, 10, 45, 0.35)' },

  avatarWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRing: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 3,
    borderColor: 'rgba(214,185,255,0.8)',
  },
  bellSwitch: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 8,
  },
  userName: { color: '#fff', fontSize: 20, fontWeight: '700' },
  shareBtn: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(200,180,255,0.6)',
  },
  followBlock: {
    marginLeft: 'auto',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  followNum: { color: '#fff', fontSize: 16, fontWeight: '700' },
  followLabel: { color: '#D9C8FF', fontSize: 12 },

  fansRow: { paddingHorizontal: 6, marginTop: 6, marginBottom: 4 },
  fansText: { color: '#D9C8FF', fontSize: 13 },

  badges: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    position: 'relative',
  },
  badgeText: { color: '#fff', fontSize: 12, marginLeft: 6, fontWeight: '600' },
  badgeDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },

  quickGrid: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickItem: {
    width: '23%',
    alignItems: 'center',
  },
  quickIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4B2573',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTitle: { color: '#EBDDFF', fontSize: 12, marginTop: 6 },

  promoWrap: { marginTop: 14 },
  promo: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  promoText: { color: '#fff', marginLeft: 10, fontSize: 14 },
  promoCTA: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(157,92,255,0.3)',
  },
  promoCTAText: { color: '#FFEA80', fontSize: 12, fontWeight: '700' },
  promoClose: { position: 'absolute', top: 6, right: 6 },

  /* 我的内容 */
  section: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#D9C8FF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  navCard: {
    width: '48%',
    padding: 14,
    borderRadius: 15,
    backgroundColor: 'rgba(30,18,55,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(130,90,180,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navTitle: { color: '#fff', fontSize: 16, fontWeight: '600', flex: 1 },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(118,58,168,0.85)',
  },
  countText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  /* 退出 */
  logoutBtn: {
    marginTop: 6,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(120,25,40,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(204,77,77,0.9)',
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
