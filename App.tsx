import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef, RootNavigation} from './src/navigations/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {SocketProvider} from './src/contexts/SocketContext';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

export default function App() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Message Received: ', remoteMessage);
      Toast.show({
        type: 'success',
        text1: 'New message from vn',
        text2: 'Content message',
      });
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SocketProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigation />
          </NavigationContainer>
        </SocketProvider>
      </Provider>
      <Toast />
    </SafeAreaProvider>
  );
}
