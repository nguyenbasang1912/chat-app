/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import http from './src/configs/http';

const onMessageReceived = async message => {
  console.log('remote message: ', message);
  const {title, body, roomId, userId} = message.data;

  const channelId = await notifee.createChannel({
    id: 'message',
    name: 'get messaging',
    importance: AndroidImportance.HIGH,
  });

  notifee.displayNotification({
    id: roomId,
    title: `<b>${title}</b>`,
    body: `<b>to you:</b> ${body}`,
    data: {
      userId,
      roomId,
      content: body,
    },
    android: {
      channelId,
      actions: [
        {
          title: 'Reply',
          pressAction: {
            id: 'reply',
          },
          input: {
            placeholder: 'send message...',
            allowFreeFormInput: true,
          },
        },
      ],
    },
  });
};

messaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(async ({detail, type}) => {
  const {notification, pressAction, input} = detail;
  if (type === EventType.ACTION_PRESS && pressAction.id === 'reply') {
    await http.post('/api/message', {
      ...notification.data,
      content: input,
    });

    notifee
      .cancelDisplayedNotification(notification.id)
      .then(res => console.log('result: ', res))
      .catch(err => console.log('error: ', err));
  }
});

AppRegistry.registerComponent(appName, () => App);
