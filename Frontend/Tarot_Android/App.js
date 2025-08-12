// App.js — 接入 ThemesHelper 的动态主题
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { AudioProvider } from './Player/AudioContext';
import { ThemeProvider, useAppTheme } from './Account/Setup/ThemesHelper';

enableScreens();

import LoginView from './Authentication/LoginView';
import VerificationView from './Authentication/VerificationView';
import PasswordLoginView from './Authentication/PasswordLoginView';
import RegistrationView from './Authentication/RegistrationView';
import HomeView from './HomeView';

const Stack = createNativeStackNavigator();

function NavWrapper() {
  const { theme, colors } = useAppTheme();

  const navTheme = {
    ...(theme.dark ? DarkTheme : DefaultTheme),
    dark: theme.dark,
    colors: {
      ...(theme.dark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      card: colors.surfaceCard,
      text: colors.text,
      border: colors.border,
      notification: colors.accent,
      primary: colors.accent,
    },
  };

  const barStyle = theme.dark ? 'light-content' : 'dark-content';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');

  return (
    <NavigationContainer detachInactiveScreens={false} theme={navTheme}>
      <StatusBar barStyle={barStyle} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          detachPreviousScreen: false,
          animationTypeForReplace: 'push',
        }}
      >
        <Stack.Screen name="Login">
          {(props) => (
            <LoginView
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              setTempPhoneNumber={setTempPhoneNumber}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="VerificationView">
          {(props) => (
            <VerificationView
              {...props}
              phoneNumber={tempPhoneNumber}
              onSuccess={() => {
                setIsLoggedIn(true);
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="PasswordLoginView">
          {(props) => (
            <PasswordLoginView
              {...props}
              phoneNumber={tempPhoneNumber}
              onSuccess={() => {
                setIsLoggedIn(true);
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Registration">
          {(props) => (
            <RegistrationView
              {...props}
              phoneNumber={tempPhoneNumber}
              onSuccess={() => {
                setIsLoggedIn(true);
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <ThemeProvider>
        <NavWrapper />
      </ThemeProvider>
    </AudioProvider>
  );
}
