import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../contants/colors';
import {Input, Spacer} from '../../components';
import {
  CloseCircle,
  Eye,
  EyeSlash,
  ShieldSecurity,
  User,
} from 'iconsax-react-native';
import {navigationRef} from '../../navigations/RootNavigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login</Text>
      <View>
        <Input
          value={username}
          placeholder="username"
          onChangeText={setUsername}
          leftNode={
            <>
              <User size={16} color={colors.black} />
              <Spacer size={{width: 12}} />
            </>
          }
          rightNode={
            <>
              <Spacer size={{width: 12}} />
              <TouchableOpacity onPress={() => setUsername('')}>
                <CloseCircle size={16} color={colors.black} />
              </TouchableOpacity>
            </>
          }
        />
        <Spacer size={{height: 12}} />
        <Input
          value={password}
          placeholder="password"
          onChangeText={setPassword}
          secureTextEntry={!isShowPass}
          leftNode={
            <>
              <ShieldSecurity size={16} color={colors.black} />
              <Spacer size={{width: 12}} />
            </>
          }
          rightNode={
            <>
              <Spacer size={{width: 12}} />
              <TouchableOpacity onPress={() => setIsShowPass(prev => !prev)}>
                {isShowPass ? (
                  <Eye size={16} color={colors.black} />
                ) : (
                  <EyeSlash size={16} color={colors.black} />
                )}
              </TouchableOpacity>
            </>
          }
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigationRef.navigate('home')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Spacer size={{height: 12}} />
        <Text style={styles.commonText}>
          Dont have an account,{' '}
          <Text
            style={styles.action}
            onPress={() => {
              if (navigationRef.isReady()) {
                navigationRef.navigate('register');
              }
            }}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  action: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
  },
  commonText: {
    color: colors.gray,
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    borderRadius: 12,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
  },
});
