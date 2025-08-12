import React from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAppTheme } from './Account/Setup/ThemesHelper';

import QuickDivinationView from './Oracle/QuickDivinationView';
import NotificationsView from './Notifications/NotificationsView';
import NewPostView from './Forum/NewPostView';
import PostDetailView from './Forum/PostDetailView';
import PlayerView from './Player/PlayerView';
import PrivateDivinationView from './TarotEnergy/PrivateDivinationView';
import DailyTopicsView from './TarotEnergy/DailyTopicsView';
import SettingsView from './Account/SettingsView';
import ThemesSettingsView from './Account/Setup/ThemesSettingsView';

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
  const { colors } = useAppTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Player" component={PlayerView} />
    </HomeStack.Navigator>
  );
}

function ForumStackScreen() {
  const { colors } = useAppTheme();
  return (
    <ForumStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <ForumStack.Screen name="Forum" component={ForumScreen} />
      <ForumStack.Screen name="Notifications" component={NotificationsView} />
      <ForumStack.Screen name="NewPost" component={NewPostView} />
      <ForumStack.Screen name="PostDetail" component={PostDetailView} />
    </ForumStack.Navigator>
  );
}

function TarotEnergyStackScreen() {
  const { colors } = useAppTheme();
  return (
    <TarotEnergyStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <TarotEnergyStack.Screen name="TarotEnergyMain" component={TarotEnergyScreen} />
      <TarotEnergyStack.Screen name="QuickDivination" component={QuickDivinationView} />
      <TarotEnergyStack.Screen name="DailyTopics" component={DailyTopicsView} />
      <TarotEnergyStack.Screen name="PrivateDivination" component={PrivateDivinationView} />
    </TarotEnergyStack.Navigator>
  );
}

function TarotHouseStackScreen() {
  const { colors } = useAppTheme();
  return (
    <TarotHouseStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <TarotHouseStack.Screen name="TarotHouse" component={TarotHouseScreen} />
    </TarotHouseStack.Navigator>
  );
}

function AccountStackScreen() {
  const { colors } = useAppTheme();
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <AccountStack.Screen name="Account" component={AccountScreen} />
      <AccountStack.Screen name="Settings" component={SettingsView} />
      <AccountStack.Screen name="ThemesSettings" component={ThemesSettingsView} />
    </AccountStack.Navigator>
  );
}

export default function HomeView() {
  const { colors } = useAppTheme();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        if (typeof BackHandler.removeEventListener === 'function') {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
      };
    }, [])
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.headerBg,
          borderTopColor: colors.surfaceLine,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: 70,
        },
        tabBarLabelStyle: { fontSize: 14, marginBottom: 8 },
        tabBarIconStyle: { marginTop: 8 },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        sceneContainerStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tab.Screen
        name="主页"
        component={HomeStackScreen}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} /> }}
      />
      <Tab.Screen
        name="论坛"
        component={ForumStackScreen}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={26} color={color} /> }}
      />
      <Tab.Screen
        name="塔罗宮能"
        component={TarotEnergyStackScreen}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="grid" size={26} color={color} /> }}
      />
      <Tab.Screen
        name="塔罗屋"
        component={TarotHouseStackScreen}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="archive" size={26} color={color} /> }}
      />
      <Tab.Screen
        name="我"
        component={AccountStackScreen}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={26} color={color} /> }}
      />
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
