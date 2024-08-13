import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {colors} from '../../contants/colors';
import {Input, Row, Spacer} from '../../components';
import {ArrowLeft2, Call, Send, Video} from 'iconsax-react-native';
import {navigationRef} from '../../navigations/RootNavigation';

const data = [
  {
    user: 1,
    message: 'Hello',
    time: '12:00 AM',
    isMe: true,
  },
  {
    user: 2,
    message: 'Hi',
    time: '12:01 AM',
    isMe: false,
  },
  {
    user: 1,
    message: 'How are you?',
    time: '12:02 AM',
    isMe: true,
  },
  {
    user: 2,
    message: 'I am fine, thank you!',
    time: '12:03 AM',
    isMe: false,
  },
];

export default function Chat() {
  const [messsage, setMesssage] = useState('');

  const renderMessage = useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return (
        <View
          style={[
            styles.messageContainer,
            item.isMe && styles.selfMessageContainer,
          ]}>
          <Text style={[styles.message, item.isMe && styles.selfMessage]}>
            {item.message}
          </Text>
        </View>
      );
    },
    [],
  );

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
              Sang
            </Text>
          </View>
          <Spacer size={{width: 12}} />
          <View>
            <Text style={[styles.name, {color: colors.black}]}>Sang</Text>
            <Text>online</Text>
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
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          contentContainerStyle={{padding: 12}}
          ItemSeparatorComponent={() => {
            return <Spacer size={{height: 12}} />;
          }}
          inverted
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Input
        value={messsage}
        placeholder="Type a message..."
        onChangeText={setMesssage}
        rightNode={
          <TouchableOpacity>
            <Send size={16} color={colors.black} />
          </TouchableOpacity>
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
