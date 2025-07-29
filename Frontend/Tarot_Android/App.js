import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';

enableScreens();

import LoginView from './Authentication/LoginView';
import VerificationView from './Authentication/VerificationView';
import PasswordLoginView from './Authentication/PasswordLoginView';
import RegistrationView from './Authentication/RegistrationView';
import HomeView from './HomeView';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#2a1144', // 设置导航器背景为紫色
  },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');

  return (
    <NavigationContainer
      detachInactiveScreens={false}
      theme={MyTheme}
    >
      <StatusBar barStyle="light-content" />
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

        <Stack.Screen name="Home" component={HomeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
