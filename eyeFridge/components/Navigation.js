import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import App from '../App';
//import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={App}
          options={{ title: 'Home Screen' }}
        />
        {/* <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details Screen' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default Nav;
