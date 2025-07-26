import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import LoginView from './Authentication/LoginView';
import VerificationView from './Authentication/VerificationView';
import PasswordLoginView from './Authentication/PasswordLoginView';
import RegistrationView from './Authentication/RegistrationView';
import HomeView from './HomeView';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
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
                  onSuccess={() => setIsLoggedIn(true)}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="PasswordLoginView">
              {(props) => (
                <PasswordLoginView
                  {...props}
                  phoneNumber={tempPhoneNumber}
                  onSuccess={() => setIsLoggedIn(true)}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Registration">
              {(props) => (
                <RegistrationView
                  {...props}
                  phoneNumber={tempPhoneNumber}
                  onSuccess={() => setIsLoggedIn(true)}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeView} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
