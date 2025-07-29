import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccountView() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>我的页面占位</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a1144',
  },
  placeholder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
