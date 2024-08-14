import {createRef} from 'react';
import {io, Socket} from 'socket.io-client';

type SocketQuery = {
  userId: string;
};
// 192.168.248.45
// 192.168.1.21
const BASE_URL = 'http://192.168.1.21:8000/';

class SocketIO {
  static socket: Socket | null = null;

  static getInstance(query: SocketQuery) {
    if (!this.socket) {
      this.socket = io(BASE_URL, {
        query,
        reconnection: true,
        reconnectionAttempts: 500
      });
    }

    return this.socket;
  }
}

export default SocketIO;
