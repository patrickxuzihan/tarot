// 各种库
import React from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAppTheme } from './Account/Setup/ThemesHelper';

// HomeScreen子页面
import PlayerView from './Player/PlayerView';

// ForumScreen子页面
import NotificationsView from './Notifications/NotificationsView';
import NewPostView from './Forum/NewPostView';
import PostDetailView from './Forum/PostDetailView';
import NotificationsDetailView from './Notifications/NotificationsDetailView';

// TarotEnergy子页面
import QuickDivinationView from './Oracle/QuickDivinationView';
import PrivateDivinationView from './TarotEnergy/PrivateDivinationView';
import DailyTopicsView from './TarotEnergy/DailyTopicsView';
import CardLibraryView from './TarotEnergy/CardLibraryView';
import ReadingHistoryView from './TarotEnergy/ReadingHistoryView'
import StatsInsightsView from './TarotEnergy/StatsInsightsView'
import EnergyNotesView from './TarotEnergy/EnergyNotesView'
import HoroscopeView from './TarotEnergy/HoroscopeView';
import TarotKnowledgeView from './TarotEnergy/TarotKnowledgeView';
import TarotTutorialView from './TarotEnergy/TarotTutorialView';

// TarotHouse子页面

// Account子页面
import SettingsView from './Account/SettingsView';
import ThemesSettingsView from './Account/Setup/ThemesSettingsView';
import ProfileEditorView from './Account/Setup/ProfileEditorView';
import SecuritySettingsView from './Account/Setup/SecuritySettingsView';
import EmailBindingView from './Account/Setup/EmailBindingView';
import PasswordChangeView from './Account/Setup/PasswordChangeView';
import HelpCenterView from './Account/Setup/HelpCenterView';
import AboutAppView from './Account/Setup/AboutAppView';
import PrivacyPolicyView from './Account/Setup/PrivacyPolicyView';
import TermsOfServiceView from './Account/Setup/TermOfServiceView';
import NotificationSettingsView from './Account/Setup/NotificationSettingsView';
import FollowersView from './Account/FollowersView';
import MembershipView from './Account/MembershipView';
import DailySignView from './Account/DailySignView';
import WithdrawalView from './Account/WithdrawalView';
import OutfitView from './Account/OutfitView';
import CustomizationView from './Account/CustomizationView';
import DownloadsView from './Account/DownloadsView';
import FavoritesView from './Account/FavoritesView'
import SubscriptionsView from './Account/SubscriptionsView'

// Tab管理的五个Screen
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
      <ForumStack.Screen name="NotificationsDetail" component={NotificationsDetailView} />
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
      <TarotEnergyStack.Screen name="CardLibrary" component={CardLibraryView} />
      <TarotEnergyStack.Screen name="ReadingHistory" component={ReadingHistoryView} />
      <TarotEnergyStack.Screen name="StatsInsights" component={StatsInsightsView} />
      <TarotEnergyStack.Screen name="EnergyNotes" component={EnergyNotesView} />
      <TarotEnergyStack.Screen name="Horoscope" component={HoroscopeView} />
      <TarotEnergyStack.Screen name="TarotKnowledge" component={TarotKnowledgeView} />
      <TarotEnergyStack.Screen name="TarotTutorial" component={TarotTutorialView} />
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
      <AccountStack.Screen name="ProfileEditor" component={ProfileEditorView} />
      <AccountStack.Screen name="SecuritySettings" component={SecuritySettingsView} />
      <AccountStack.Screen name="EmailBinding" component={EmailBindingView} />
      <AccountStack.Screen name="PasswordChange" component={PasswordChangeView} />
      <AccountStack.Screen name="HelpCenter" component={HelpCenterView} />
      <AccountStack.Screen name="AboutApp" component={AboutAppView} />
      <AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicyView} />
      <AccountStack.Screen name="TermsOfService" component={TermsOfServiceView} />
      <AccountStack.Screen name="NotificationSettings" component={NotificationSettingsView} />
      <AccountStack.Screen name="Followers" component={FollowersView} />
      <AccountStack.Screen name="Membership" component={MembershipView} />
      <AccountStack.Screen name="DailySign" component={DailySignView} />
      <AccountStack.Screen name="Withdrawal" component={WithdrawalView} />
      <AccountStack.Screen name="Outfit" component={OutfitView} />
      <AccountStack.Screen name="Customization" component={CustomizationView} />
      <AccountStack.Screen name="Downloads" component={DownloadsView} />
      <AccountStack.Screen name="Favorites" component={FavoritesView} />
      <AccountStack.Screen name="Subscriptions" component={SubscriptionsView} />
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
