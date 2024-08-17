import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef, RootNavigation} from './src/navigations/RootNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {SocketProvider} from './src/contexts/SocketContext';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import {colors} from './src/contants/colors';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage: any) => {
      console.log('Message Received: ', remoteMessage);
      Toast.show({
        type: 'success',
        text1: remoteMessage.data.title,
        text2: remoteMessage.data.body,
        text1Style: {
          color: colors.black,
          fontSize: 16,
          fontWeight: 'bold',
        },
        onPress() {
          if (navigationRef.isReady()) {
            navigationRef.navigate('chat', {
              fcmToken: remoteMessage.data.fcm,
              userId: remoteMessage.data.userId,
            });
          }
        },
      });
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SocketProvider>
            <NavigationContainer ref={navigationRef}>
              <RootNavigation />
            </NavigationContainer>
          </SocketProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </SafeAreaProvider>
  );
}
