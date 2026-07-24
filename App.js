import React from 'react';
import './src/api/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import MypageScreen from './src/screens/MypageScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import AddScreen from './src/screens/AddScreen';
import ChatScreen from './src/screens/ChatScreen';
import SignupScreen from './src/screens/SignupScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}}>
        <Tab.Screen name="홈" component={MainScreen} />
        <Tab.Screen name="카테고리" component={CategoryScreen} />
        <Tab.Screen name="등록" component={AddScreen} />
        <Tab.Screen name="채팅" component={ChatScreen} />
        <Tab.Screen name="마이페이지" component={MypageScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: '로그인' }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: '회원가입' }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: '프로필 수정' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}