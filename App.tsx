import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef, RootNavigation} from './src/navigations/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {SocketProvider} from './src/contexts/SocketContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SocketProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigation />
          </NavigationContainer>
        </SocketProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
