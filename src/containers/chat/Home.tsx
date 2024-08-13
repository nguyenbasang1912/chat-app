import {Box, UserSearch} from 'iconsax-react-native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Row, Spacer} from '../../components';
import {colors} from '../../contants/colors';
import {navigationRef} from '../../navigations/RootNavigation';

export default function Home() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const renderUser = useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (navigationRef.isReady()) {
              navigationRef.navigate('chat');
            }
          }}>
          <Row>
            <View style={styles.avatar}>
              <Text style={styles.fullname} numberOfLines={1}>
                {index}
              </Text>
            </View>
            <Spacer size={{width: 12}} />
            <View>
              <Text style={styles.name}>{index}</Text>

              <Text
                style={[styles.message, index % 2 === 0 && styles.seenMessage]}>
                message...
              </Text>
            </View>
          </Row>
        </TouchableOpacity>
      );
    },
    [users],
  );

  return (
    <View style={styles.container}>
      <Row padding={16} justify="space-between" style={styles.header}>
        <Text>
          Hello, <Text style={styles.name}>Sang</Text>
        </Text>
        <Box size={22} color={colors.black} />
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
          data={new Array(10)}
          renderItem={renderUser}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.containerListUser}
          // style={{flex: 1}}
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
