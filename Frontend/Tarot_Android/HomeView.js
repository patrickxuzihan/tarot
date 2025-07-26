import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function PlaceholderScreen({ title }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#260D40' }}>
      <Text style={{ color: '#fff', fontSize: 24 }}>{title}</Text>
    </View>
  );
}

export default function HomeView() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#2a1144' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa'
      }}
    >
      <Tab.Screen name="主页" children={() => <PlaceholderScreen title="主页" />} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color={color} /> }} />
      <Tab.Screen name="论坛" children={() => <PlaceholderScreen title="论坛" />} options={{ tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={20} color={color} /> }} />
      <Tab.Screen name="塔罗宫能" children={() => <PlaceholderScreen title="塔罗宫能" />} options={{ tabBarIcon: ({ color }) => <Ionicons name="grid" size={20} color={color} /> }} />
      <Tab.Screen name="塔罗屋" children={() => <PlaceholderScreen title="塔罗屋" />} options={{ tabBarIcon: ({ color }) => <Ionicons name="archive" size={20} color={color} /> }} />
      <Tab.Screen name="我" children={() => <PlaceholderScreen title="我" />} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={20} color={color} /> }} />
    </Tab.Navigator>
  );
}
