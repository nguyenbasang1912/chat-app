import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Chat from '../containers/chat/Chat';
import Home from '../containers/chat/Home';
import {useAppSelector} from '../store/store';
import {RootParamsList} from './types';

const Stack = createStackNavigator<RootParamsList>();

export const RootNavigation = () => {
  const {accessToken} = useAppSelector(state => state.auth.tokens);
  let init: keyof RootParamsList = 'login';

  if (accessToken) {
    init = 'home';
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={init}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef<RootParamsList>();
