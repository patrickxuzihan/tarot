import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from './ThemesHelper';

export default function NotificationSettingsView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [marketingNotifications, setMarketingNotifications] = useState(false);

  const clearNotificationHistory = () => {
    Alert.alert('清除通知记录', '确认要清除所有通知记录吗？', [
      { text: '取消', style: 'cancel' },
      { text: '确认', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* 顶部栏 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            style={styles.backBtn}
            activeOpacity={0.85}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>通知设置</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>通知类型</Text>

            <View style={styles.item}>
              <Text style={styles.itemText}>推送通知</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ true: colors.brandPrimary, false: colors.surfaceLine }}
                thumbColor={Platform.OS === 'android' ? colors.surfaceCard : undefined}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.itemText}>邮件通知</Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ true: colors.brandPrimary, false: colors.surfaceLine }}
                thumbColor={Platform.OS === 'android' ? colors.surfaceCard : undefined}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.itemText}>营销推送</Text>
              <Switch
                value={marketingNotifications}
                onValueChange={setMarketingNotifications}
                trackColor={{ true: colors.brandPrimary, false: colors.surfaceLine }}
                thumbColor={Platform.OS === 'android' ? colors.surfaceCard : undefined}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={clearNotificationHistory}
            activeOpacity={0.85}
          >
            <Text style={styles.clearBtnText}>清除通知记录</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },

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
    headerTitle: { color: c.text, fontSize: 20, fontWeight: '700' },

    section: {
      backgroundColor: c.surfaceCard,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 16,
      marginBottom: 20,
    },
    sectionHeader: {
      color: c.brandPrimary,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    itemText: { color: c.text, fontSize: 15 },

    clearBtn: {
      backgroundColor: c.brandPrimary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    clearBtnText: { color: c.buttonPrimaryText, fontSize: 16, fontWeight: '700' },
  });
