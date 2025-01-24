import React from 'react';
import Tasks from './components/Tasks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './components/Home';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerTitleAlign: 'center',
            title: 'Create Task !',
          }}
          name="home"
          component={Home}
        />
        <Tab.Screen
          options={{
            // headerTitle: () => <Text>Come</Text>,
            // headerRight: () => <Text>Tasks !</Text>,
            // title: 'Tasks !',
            headerStyle: {
              backgroundColor: 'pink',
            },
            headerTintColor: 'red',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 40,
            },
          }}
          name="Tasks"
          component={Tasks}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
