import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function TarotHouseView() {
  const { colors, gradients, gradient } = useAppTheme();
  const bgGradient = (gradients && gradients.panel) || gradient;
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>塔罗屋</Text>
          <Text style={styles.placeholder}>内容开发中</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const getStyles = (c) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 20,
    },
    card: {
      width: '90%',
      borderRadius: 20,
      backgroundColor: c.surfaceCard,
      paddingVertical: 28,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: c.surfaceCardBorder,
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: c.text,
      marginBottom: 8,
    },
    placeholder: {
      fontSize: 16,
      color: c.subtext,
    },
  });
