import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef, RootNavigation } from './src/navigations/RootNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
