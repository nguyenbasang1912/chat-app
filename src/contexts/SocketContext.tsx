import React, {createContext, useEffect, useState} from 'react';
import {useAppSelector} from '../store/store';
import {Socket} from 'socket.io-client';
import SocketIO from '../configs/socket';

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
  useEffect(() => {
    if (userId) {
      const socketInstance = SocketIO.getInstance({userId});
      setSocket(socketInstance);
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
