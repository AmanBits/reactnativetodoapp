import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Details from './components/Details';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="welcome" component={Welcome} options={{headerTitleAlign:"center"}} />
        <Stack.Screen name="home" component={Home}  options={{headerShown:false}} />
        <Stack.Screen name="taskDetails" component={Details} options={{
          headerTitleAlign:"center",
          headerTitle:"Details"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
