import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../Account/Setup/ThemesHelper';

const screenWidth = Dimensions.get('window').width;

export default function AdView({ route, navigation }) {
  const { image } = route.params || {};
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* 返回按钮 */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.surfaceGlass }]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color={colors.text} />
      </TouchableOpacity>

      {/* 居中内容区 */}
      <View style={styles.centerContent}>
        {/* 图片矩形容器 */}
        <View
          style={[
            styles.imageWrapper,
            { backgroundColor: colors.surfaceCard, borderColor: colors.surfaceCardBorder },
          ]}
        >
          <Image source={image} style={styles.adImage} resizeMode="cover" />
        </View>

        {/* 占位符说明 */}
        <Text style={[styles.placeholderText, { color: colors.subtext }]}>
          这是一个 AdView 占位页面
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    borderRadius: 20,
    padding: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  imageWrapper: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
