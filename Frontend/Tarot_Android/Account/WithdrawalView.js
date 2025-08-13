import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from './Setup/ThemesHelper';

export default function WithdrawalView({ navigation }) {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient =
    (gradients && gradients.auth) || (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  const [amount, setAmount] = useState('');

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
          <Text style={styles.headerTitle}>提现</Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 12 }} />

          {/* 提示文案 */}
          <View style={styles.tipCard(colors)}>
            <Text style={styles.tipText}>提现功能开发中...</Text>
          </View>

          <View style={{ height: 16 }} />

          {/* 可提现金额 */}
          <View style={styles.balanceCard(colors)}>
            <Text style={styles.balanceLabel}>可提现金额</Text>
            <Text style={styles.balanceValue}>¥ 128.50</Text>
          </View>

          <View style={{ height: 16 }} />

          {/* 表单区域 */}
          <View style={styles.formCard(colors)}>
            {/* 提现金额 */}
            <Text style={styles.sectionLabel}>提现金额</Text>
            <View style={styles.amountRow(colors)}>
              <Text style={styles.currency}>¥</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="输入提现金额"
                placeholderTextColor={colors.inputPlaceholder}
                keyboardType="decimal-pad"
                style={styles.amountInput(colors)}
              />
            </View>

            <View style={{ height: 14 }} />

            {/* 支付方式 */}
            <Text style={styles.sectionLabel}>支付方式</Text>
            <View style={styles.payRow(colors)}>
              <Ionicons name="card" size={18} color={colors.stateInfo} />
              <Text style={styles.payText}>支付宝</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>

            {/* 确认提现 */}
            <TouchableOpacity activeOpacity={0.9} style={styles.primaryBtn(colors)}>
              <Text style={styles.primaryLabel(colors)}>确认提现</Text>
            </TouchableOpacity>
          </View>
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

    tipCard: (c) => ({
      backgroundColor: c.surfaceCard,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 12,
      alignItems: 'center',
    }),
    tipText: {
      fontSize: 16,
      color: '#AAAAAA',
    },

    balanceCard: (c) => ({
      backgroundColor: c.surfaceCard,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 16,
      alignItems: 'center',
    }),
    balanceLabel: {
      color: c.subtext,
      fontSize: 14,
      marginBottom: 6,
    },
    balanceValue: {
      color: c.text,
      fontSize: 28,
      fontWeight: '800',
    },

    formCard: (c) => ({
      backgroundColor: c.surfaceCard,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      padding: 16,
    }),
    sectionLabel: {
      color: c.subtext,
      fontSize: 14,
      marginBottom: 8,
      fontWeight: '600',
    },

    amountRow: (c) => ({
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.inputBg,
      borderWidth: 1,
      borderColor: c.inputBorder,
      borderRadius: 10,
    }),
    currency: {
      color: '#FFFFFF',
      paddingLeft: 12,
      fontSize: 16,
    },
    amountInput: (c) => ({
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 10,
      color: c.text,
      fontSize: 15,
    }),

    payRow: (c) => ({
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.surfaceCard,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 12,
    }),
    payText: {
      color: '#FFFFFF',
      marginLeft: 8,
      fontSize: 15,
    },

    primaryBtn: (c) => ({
      marginTop: 12,
      backgroundColor: c.buttonPrimaryBg,
      borderRadius: 15,
      paddingVertical: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
    }),
    primaryLabel: (c) => ({
      color: c.buttonPrimaryText,
      fontSize: 16,
      fontWeight: '700',
    }),
  });
