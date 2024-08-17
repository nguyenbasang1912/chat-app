import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {colors} from '../../contants/colors';
import {Input, Row, Spacer} from '../../components';
import {ArrowLeft2, Call, Send, Video} from 'iconsax-react-native';
import {navigationRef} from '../../navigations/RootNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootParamsList} from '../../navigations/types';
import {useAppSelector} from '../../store/store';
import {SocketContext} from '../../contexts/SocketContext';
import {getListMessages} from '../../apis/message';
import {GetMessagesResponse} from '../../apis/types/message';

interface Room {
  _id: string;
  is_group: boolean;
  members: {
    _id: string;
    fullname: string;
    username: string;
    isOnline: boolean;
    fcm_token: string;
  }[];
}

interface Message {
  _id: string;
  sender: string;
  content: string;
  createdAt: Date;
  is_delete: boolean;
  room_id: string;
}

export default function Chat(props: StackScreenProps<RootParamsList, 'chat'>) {
  const [messsage, setMesssage] = useState('');
  const [listMessages, setListMessages] = useState<Message[]>([]);
  const [partner, setPartner] = useState<Room['members'][number]>();
  const {socketInstance} = useContext(SocketContext);
  const {userId, fcmToken} = useAppSelector(state => state.auth.user);
  const roomRef = useRef<Room>();
  const countMessagesInSession = useRef<number>();
  const partnerFcmToken = useRef<string>();
  const messagePageRef = useRef<GetMessagesResponse['data']['page']>();
  const members = useMemo(() => {
    return [userId, props.route.params.userId];
  }, [props.route.params.userId]);

  useEffect(() => {
    partnerFcmToken.current = props.route.params.fcmToken;

    if (socketInstance) {
      socketInstance.emit('join room', members);

      socketInstance.on('get room', (room: Room) => {
        roomRef.current = room;
        const partner = room.members.find(memb => memb._id !== userId);
        setPartner(partner);
        getListMessages({
          page: 1,
          roomId: roomRef.current?._id,
        }).then(res => {
          setListMessages(res.data.messages);
          messagePageRef.current = res.data.page;
          countMessagesInSession.current = 0;
        });
      });

      socketInstance.on('message', (message: Message) => {
        setListMessages(prev => {
          return [message, ...prev];
        });
        countMessagesInSession.current = countMessagesInSession.current
          ? countMessagesInSession.current + 1
          : 1;
      });

      socketInstance.on('partner update fcm', fcm => {
        partnerFcmToken.current = fcm;
      });
    }

    return () => {
      if (roomRef.current) {
        socketInstance?.emit('leave room', roomRef.current._id.toString());
        socketInstance?.off('get room');
        socketInstance?.off('message');
        socketInstance?.off('partner update fcm');
      }
    };
  }, [members, socketInstance]);

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('partner offline', (partnerId: string) => {
        if (!partner) {
          return;
        }

        if (partnerId !== partner._id) {
          return;
        }

        setPartner(prev => {
          if (prev) {
            return {
              ...prev,
              isOnline: false,
            };
          }
        });
      });

      socketInstance.on('partner reconnect', (partnerId: string) => {
        if (!partner) {
          return;
        }

        if (partnerId !== partner._id) {
          return;
        }

        setPartner(prev => {
          if (prev) {
            return {
              ...prev,
              isOnline: true,
            };
          }
        });
      });
    }

    return () => {
      socketInstance?.off('partner offline');
      socketInstance?.off('partner reconnect');
    };
  }, [socketInstance, partner]);

  const renderMessage = useCallback(
    ({item, index}: ListRenderItemInfo<Message>) => {
      return (
        <View
          style={[
            styles.messageContainer,
            item.sender === userId.toString() && styles.selfMessageContainer,
          ]}>
          <Text
            style={[
              styles.message,
              item.sender === userId.toString() && styles.selfMessage,
            ]}>
            {item.content}
          </Text>
        </View>
      );
    },
    [],
  );

  const sendMessage = () => {
    if (!messsage) {
      return;
    }

    if (roomRef.current?._id) {
      socketInstance?.emit(
        'send message',
        roomRef.current?._id,
        messsage,
        userId,
        partner?._id,
        partnerFcmToken.current,
        fcmToken,
      );
      setMesssage('');
    } else {
      ToastAndroid.show('Something went wrong, please try again later', 300);
    }
  };

  const handleFetchMessage = () => {
    if (messagePageRef.current && roomRef.current) {
      if (messagePageRef.current.hasNextPage) {
        getListMessages({
          page: +messagePageRef.current.currentPage + 1,
          roomId: roomRef.current?._id,
          additionalSkip: countMessagesInSession.current,
        }).then(res => {
          setListMessages(prev => [...prev, ...res.data.messages]);
          messagePageRef.current = res.data.page;
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Row style={styles.header} justify="space-between">
        <Row>
          <TouchableOpacity
            onPress={() => {
              if (navigationRef.canGoBack()) {
                navigationRef.goBack();
              }
            }}>
            <ArrowLeft2 size={22} color={colors.black} />
          </TouchableOpacity>
          <Spacer size={{width: 12}} />
          <View style={styles.avatar}>
            <Text style={styles.name} numberOfLines={1}>
              {partner?.fullname?.at(0)?.toUpperCase()}
            </Text>
          </View>
          <Spacer size={{width: 12}} />
          <View>
            <Text style={[styles.name, {color: colors.black}]}>
              {partner?.fullname}
            </Text>
            <Text style={{color: partner?.isOnline ? 'green' : 'gray'}}>
              {(partner?.isOnline && 'online') || 'offline'}
            </Text>
          </View>
        </Row>

        <Row>
          <TouchableOpacity>
            <Call size={22} color={colors.black} />
          </TouchableOpacity>
          <Spacer size={{width: 12}} />
          <TouchableOpacity>
            <Video size={22} color={colors.black} />
          </TouchableOpacity>
        </Row>
      </Row>
      <View style={{flex: 1}}>
        <FlatList
          data={listMessages}
          keyExtractor={(item, index) => item._id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={{padding: 12}}
          ItemSeparatorComponent={() => {
            return <Spacer size={{height: 12}} />;
          }}
          onEndReachedThreshold={0.5}
          onEndReached={handleFetchMessage}
          ListEmptyComponent={
            <View style={[styles.center]}>
              <Text style={[styles.name, {color: colors.black}]}>
                No message yet...
              </Text>
            </View>
          }
          inverted
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Input
        value={messsage}
        placeholder="Type a message..."
        onChangeText={setMesssage}
        rightNode={
          <TouchableOpacity onPress={sendMessage}>
            <Send size={16} color={colors.black} />
          </TouchableOpacity>
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfMessage: {
    textAlign: 'right',
  },
  message: {
    fontWeight: 'semibold',
    color: colors.white,
  },
  selfMessageContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
    alignSelf: 'flex-end',
  },
  messageContainer: {
    maxWidth: '80%',
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    backgroundColor: colors.black,
    padding: 16,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 10,
    backgroundColor: colors.white,
    shadowColor: colors.black,
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    elevation: 10,
    shadowColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'stretch',
  },
});
