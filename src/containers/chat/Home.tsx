import {Logout, UserSearch} from 'iconsax-react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {logout} from '../../apis/auth';
import {Input, Row, Spacer} from '../../components';
import {colors} from '../../contants/colors';
import {navigationRef} from '../../navigations/RootNavigation';
import {logout as logoutAction} from '../../store/slices/auth';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getAllUsersThunk} from '../../store/thunks/users';
import {SocketContext} from '../../contexts/SocketContext';
import {resetListUsers} from '../../store/slices/users';

export default function Home() {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const {page, users} = useAppSelector(state => state.user);
  const {fullname} = useAppSelector(state => state.auth.user);
  const {socketInstance} = useContext(SocketContext);

  useEffect(() => {
    socketInstance?.connect();
    dispatch(getAllUsersThunk({page: 1}));
  }, []);

  const renderUser = useCallback(
    ({
      item,
      index,
    }: ListRenderItemInfo<{
      _id: string;
      username: string;
      fullname: string;
      fcm_token: string;
    }>) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (navigationRef.isReady()) {
              navigationRef.navigate('chat', {
                userId: item._id,
                fcmToken: item.fcm_token,
              });
            }
          }}>
          <Row>
            <View style={styles.avatar}>
              <Text style={styles.fullname} numberOfLines={1}>
                {`${item.fullname.at(0)?.toUpperCase()}`}
              </Text>
            </View>
            <Spacer size={{width: 12}} />
            <View>
              <Text style={styles.name}>{item.fullname}</Text>
            </View>
          </Row>
        </TouchableOpacity>
      );
    },
    [users],
  );

  const handleLoadUsers = async () => {
    if (page.hasNextPage) {
      dispatch(getAllUsersThunk({page: page.currentPage + 1}));
    }
  };

  return (
    <View style={styles.container}>
      <Row padding={16} justify="space-between" style={styles.header}>
        <Text>
          Hello, <Text style={styles.name}>{fullname}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            logout()
              .then(() => {
                dispatch(logoutAction());
                navigationRef.reset({
                  index: 0,
                  routes: [{name: 'login'}],
                });
                socketInstance?.disconnect();
                dispatch(resetListUsers());
              })
              .catch(console.log);
          }}>
          <Logout size={22} color={colors.black} />
        </TouchableOpacity>
      </Row>

      <Spacer size={{height: 12}} />

      <View style={styles.content}>
        <Input
          leftNode={
            <>
              <UserSearch size={16} color={colors.black} />
              <Spacer size={{width: 12}} />
            </>
          }
          value={search}
          placeholder="Search..."
          onChangeText={setSearch}
        />

        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.containerListUser}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadUsers}
          ItemSeparatorComponent={() => {
            return <Spacer size={{height: 12}} />;
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  seenMessage: {
    color: colors.black,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 12,
    color: colors.gray,
  },
  fullname: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  avatar: {
    width: 70,
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.black,
  },
  containerListUser: {
    paddingVertical: 12,
  },
  content: {
    padding: 16,
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    elevation: 10,
    shadowColor: colors.black,
    backgroundColor: colors.white,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
