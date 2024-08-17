import React, {createContext, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {Socket} from 'socket.io-client';
import SocketIO from '../configs/socket';
import messaging from '@react-native-firebase/messaging';
import {updateFcmThunk} from '../store/thunks/auth';

type SocketProviderProps = {
  children: React.ReactNode;
};

type SocketContextValue = {
  socketInstance: Socket | undefined;
};

export const SocketContext = createContext<SocketContextValue>({
  socketInstance: undefined,
});

export const SocketProvider = (props: SocketProviderProps) => {
  const {children} = props;
  const {userId} = useAppSelector(state => state.auth.user);
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userId) {
      const socketInstance = new SocketIO({userId}).socket;
      setSocket(socketInstance);

      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => {
          return messaging().getToken();
        })
        .then(token => {
          dispatch(updateFcmThunk({fcmToken: token}));
        });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{socketInstance: socket}}>
      {children}
    </SocketContext.Provider>
  );
};
