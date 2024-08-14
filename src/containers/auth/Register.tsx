import {
  CloseCircle,
  Eye,
  EyeSlash,
  ShieldSecurity,
  User,
  UserEdit,
} from 'iconsax-react-native';
import React, {useState} from 'react';
import {ActivityIndicator, Text, ToastAndroid, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {register} from '../../apis/auth';
import {Input, Spacer} from '../../components';
import {colors} from '../../contants/colors';
import {navigationRef} from '../../navigations/RootNavigation';
import {styles} from './Login';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!username || !password || !fullname) {
      ToastAndroid.show('Please fill all fields', 500);
      return;
    }

    setIsLoading(true);

    register({username, password, fullname})
      .then(() => {
        setIsLoading(false);
        ToastAndroid.show('Registration successful', 500);
        navigationRef.navigate('login');
      })
      .catch(() => {
        setIsLoading(false);
        ToastAndroid.show('Registration failed', 500);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sign up</Text>
      <View>
        <Input
          value={fullname}
          placeholder="fullname"
          onChangeText={setFullname}
          leftNode={
            <>
              <UserEdit size={16} color={colors.black} />
              <Spacer size={{width: 12}} />
            </>
          }
          rightNode={
            <>
              <Spacer size={{width: 12}} />
              <TouchableOpacity onPress={() => setFullname('')}>
                <CloseCircle size={16} color={colors.black} />
              </TouchableOpacity>
            </>
          }
        />
        <Spacer size={{height: 12}} />

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
          disabled={isLoading}
          style={styles.button}
          onPress={handleRegister}>
          {isLoading ? (
            <ActivityIndicator size={22} color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </TouchableOpacity>
        <Spacer size={{height: 12}} />
        <Text style={styles.commonText}>
          You have an account,{' '}
          <Text
            style={styles.action}
            onPress={() => {
              if (navigationRef.isReady()) {
                navigationRef.navigate('login');
              }
            }}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}
