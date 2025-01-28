import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Search from './Search';
import Tasks from './Tasks';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size to fit properly
          fontWeight: '600',
          color: 'black',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          height: 70, // Adjust height as needed
          paddingBottom: 10, // Ensure there's padding for text/icons
        },
        tabBarActiveBackgroundColor: 'purple',
        tabBarInactiveTintColor: 'yellow',
      }}>
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Home;
