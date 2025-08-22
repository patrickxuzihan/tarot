import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

export default function WebViewScreen({ route, navigation }) {
  const { url } = route.params;
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* 自定义 Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* 网页内容 */}
      <WebView source={{ uri: url }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 4,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
});
