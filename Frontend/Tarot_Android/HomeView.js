import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import QuickDivinationView from './Oracle/QuickDivinationView';
import NotificationsView from './Notifications/NotificationsView';

import HomeScreen from './HomeScreen';
import ForumScreen from './Forum/ForumView';
import TarotEnergyScreen from './TarotEnergy/TarotEnergyView';
import TarotHouseScreen from './TarotHouse/TarotHouseView';
import AccountScreen from './Account/AccountView';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ForumStack = createNativeStackNavigator();
const TarotEnergyStack = createNativeStackNavigator();
const TarotHouseStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="QuickDivination" component={QuickDivinationView} />
      <HomeStack.Screen name="Notifications" component={NotificationsView} />
    </HomeStack.Navigator>
  );
}

function ForumStackScreen() {
  return (
    <ForumStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
      <ForumStack.Screen name="Forum" component={ForumScreen} />
      <ForumStack.Screen name="Notifications" component={NotificationsView} />
    </ForumStack.Navigator>
  );
}

function TarotEnergyStackScreen() {
  return (
    <TarotEnergyStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
      <TarotEnergyStack.Screen name="TarotEnergyMain" component={TarotEnergyScreen} />
      <TarotEnergyStack.Screen name="QuickDivination" component={QuickDivinationView} />
    </TarotEnergyStack.Navigator>
  );
}

function TarotHouseStackScreen() {
  return (
    <TarotHouseStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
      <TarotHouseStack.Screen name="TarotHouse" component={TarotHouseScreen} />
    </TarotHouseStack.Navigator>
  );
}

function AccountStackScreen() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
}

export default function HomeView() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#2a1144', height: 70 },
        tabBarLabelStyle: { fontSize: 14, marginBottom: 8 },
        tabBarIconStyle: { marginTop: 8 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa'
      }}
    >
      <Tab.Screen name="主页" component={HomeStackScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} /> }} />
      <Tab.Screen name="论坛" component={ForumStackScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={26} color={color} /> }} />
      <Tab.Screen name="塔罗宮能" component={TarotEnergyStackScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="grid" size={26} color={color} /> }} />
      <Tab.Screen name="塔罗屋" component={TarotHouseStackScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="archive" size={26} color={color} /> }} />
      <Tab.Screen name="我" component={AccountStackScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={26} color={color} /> }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
