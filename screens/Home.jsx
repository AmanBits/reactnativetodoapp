import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Search from './Search';
import Tasks from './Tasks';

const Tab = createBottomTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          color: 'white',
        },
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveBackgroundColor: 'purple',
        tabBarInactiveTintColor: 'yellow',
      }}>
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Home;
