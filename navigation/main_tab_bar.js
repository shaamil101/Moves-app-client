import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import CreateMove from '../components/home_screens/create_move';
import JoinMove from '../components/home_screens/join_move';
import Welcome from '../components/home_screens/welcome';
import WaitingRoom from '../components/home_screens/waiting_room';
import Question from '../components/home_screens/question';
import ShareMove from '../components/home_screens/share_move';
import Results from '../components/home_screens/results';
import NameMove from '../components/home_screens/name_move';
import Profile from '../components/profile_screens/profile';
import MyMoves from '../components/profile_screens/my_moves';
import MoveInfo from '../components/profile_screens/move_info';
import Settings from '../components/profile_screens/settings';
import SignIn from '../components/auth_screens/signin';
import SignUp from '../components/auth_screens/signup';
import useStore from '../store';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <HomeStack.Screen name="Welcome" component={Welcome} />
      <HomeStack.Screen name="CreateMove" component={CreateMove}/>
      <HomeStack.Screen name="ShareMove" component={ShareMove} />
      <HomeStack.Screen name="JoinMove" component={JoinMove} />
      <HomeStack.Screen name="Question" component={Question} />
      <HomeStack.Screen name="WaitingRoom" component={WaitingRoom} />
      <HomeStack.Screen name="Results" component={Results} />
      <HomeStack.Screen name="Name Move" component={NameMove} />
    </HomeStack.Navigator>
  );
}

const AuthNav = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfilePage" component={Profile} />
      <ProfileStack.Screen name="MyMoves" component={MyMoves}/>
      <ProfileStack.Screen name="MoveInfo" component={MoveInfo}/>
      <ProfileStack.Screen name="Settings" component={Settings}/>
    </ProfileStack.Navigator>
  );
}

const MainTabBar = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [{ display: "flex" }, null],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

const MainNavigator = () => {
  const isAuthenticated = useStore(({ authSlice }) => authSlice.authenticated);
  const loadUser = useStore(({ authSlice }) => authSlice.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <NavigationContainer independent={true}>
      {isAuthenticated ? <MainTabBar /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default MainNavigator;
