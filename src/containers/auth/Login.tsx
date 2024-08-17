import {
  CloseCircle,
  Eye,
  EyeSlash,
  ShieldSecurity,
  User,
} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Spacer} from '../../components';
import {colors} from '../../contants/colors';
import {navigationRef} from '../../navigations/RootNavigation';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {loginThunk} from '../../store/thunks/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(false);

  const {loading} = useAppSelector(state => state.auth.status);

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (!username || !password) {
      ToastAndroid.show('Please enter a username and password', 500);
      return;
    }

    dispatch(loginThunk({username, password}))
      .unwrap()
      .then(res => {
        ToastAndroid.show('Login successful', 500);
        navigationRef.reset({
          index: 0,
          routes: [{name: 'home'}],
        });
      })
      .catch(err => {
        ToastAndroid.show('Login failed: ' + err.message, 500);
      });
  };

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
          disabled={loading}
          style={styles.button}
          onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size={22} color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
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
