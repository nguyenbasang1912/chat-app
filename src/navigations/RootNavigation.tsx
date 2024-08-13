import {createStackNavigator} from '@react-navigation/stack';
import {RootParamsList} from './types';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Home from '../containers/chat/Home';
import Chat from '../containers/chat/Chat';
import {createNavigationContainerRef} from '@react-navigation/native';

const Stack = createStackNavigator<RootParamsList>();

export const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>   
  );
};

export const navigationRef = createNavigationContainerRef<RootParamsList>();
