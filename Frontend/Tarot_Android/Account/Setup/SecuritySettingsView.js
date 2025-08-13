import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  Modal,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from './ThemesHelper';

export default function SecuritySettingsView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* 顶部栏 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.85}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>安全设置</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 生物识别 */}
          <View style={styles.card}>
            <View style={styles.rowCenter}>
              <Text style={styles.titleText}>生物识别登录</Text>
              <View style={{ flex: 1 }} />
              <Switch
                value={isBiometricEnabled}
                onValueChange={setIsBiometricEnabled}
                trackColor={{ false: colors.surfaceLine, true: colors.brandPrimary }}
                thumbColor={Platform.OS === 'android' ? colors.textInverse : undefined}
              />
            </View>
            <Text style={styles.captionText}>使用面容ID/指纹登录应用</Text>
          </View>

          {/* 修改密码 */}
          <TouchableOpacity
            onPress={() => setShowPasswordChange(true)}
            activeOpacity={0.9}
            style={styles.card}
          >
            <View style={styles.rowCenter}>
              <Text style={styles.titleText}>修改密码</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </TouchableOpacity>

          {/* 双重认证 */}
          <TouchableOpacity
            onPress={() => setShowTwoFactorSetup(true)}
            activeOpacity={0.9}
            style={styles.card}
          >
            <View style={styles.rowCenter}>
              <Text style={styles.titleText}>双重认证</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.statusDanger}>未启用</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={{ marginLeft: 6 }} />
            </View>
          </TouchableOpacity>

          {/* 登录设备管理 */}
          <View style={styles.card}>
            <Text style={styles.titleText}>登录设备管理</Text>

            <View style={[styles.deviceRow, { marginTop: 10 }]}>
              <Ionicons name="phone-portrait-outline" size={20} color={colors.stateInfo} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.deviceName}>iPhone 13 Pro</Text>
                <Text style={styles.deviceMeta}>当前设备 · 最后登录: 今天 10:30</Text>
              </View>

              <TouchableOpacity activeOpacity={0.9} style={styles.manageBtn(colors)}>
                <Text style={styles.manageLabel}>管理</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* 修改密码 - 底部弹层 */}
        <Modal
          transparent
          visible={showPasswordChange}
          animationType="slide"
          onRequestClose={() => setShowPasswordChange(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalSheet(colors)}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle(colors)}>修改密码</Text>
                <TouchableOpacity
                  onPress={() => setShowPasswordChange(false)}
                  style={styles.closeBtn(colors)}
                >
                  <Ionicons name="close" size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.modalBodyText(colors)}>修改密码视图</Text>
              </View>
            </View>
          </View>
        </Modal>

        {/* 双重认证 - 底部弹层 */}
        <Modal
          transparent
          visible={showTwoFactorSetup}
          animationType="slide"
          onRequestClose={() => setShowTwoFactorSetup(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalSheet(colors)}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle(colors)}>双重认证</Text>
                <TouchableOpacity
                  onPress={() => setShowTwoFactorSetup(false)}
                  style={styles.closeBtn(colors)}
                >
                  <Ionicons name="close" size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.modalBodyText(colors)}>双重认证设置视图</Text>
              </View>
            </View>
          </View>
        </Modal>
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

    card: {
      backgroundColor: c.surfaceCard,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      marginBottom: 12,
    },

    rowCenter: { flexDirection: 'row', alignItems: 'center' },

    titleText: { color: c.text, fontSize: 16, fontWeight: '600' },
    captionText: { color: c.subtext, fontSize: 12, marginTop: 6 },

    statusDanger: { color: c.stateError, fontSize: 12, marginRight: 6 },

    deviceRow: { flexDirection: 'row', alignItems: 'center' },
    deviceName: { color: c.text, fontSize: 15, fontWeight: '600' },
    deviceMeta: { color: c.subtext, fontSize: 12, marginTop: 2 },

    manageBtn: (c) => ({
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: c.brandPrimary,
    }),
    manageLabel: { color: c.textInverse, fontSize: 12, fontWeight: '600' },

    /* Modal */
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
    modalSheet: (c) => ({
      backgroundColor: c.surface,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      paddingBottom: 12,
      maxHeight: '65%',
    }),
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    modalTitle: (c) => ({ fontSize: 16, color: c.text, fontWeight: '700' }),
    closeBtn: (c) => ({
      marginLeft: 'auto',
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: c.surfaceGlass,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    modalBody: { paddingHorizontal: 16, paddingVertical: 16 },
    modalBodyText: (c) => ({ color: c.text, fontSize: 14 }),
  });
