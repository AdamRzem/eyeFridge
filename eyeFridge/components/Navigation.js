import { createStackNavigator } from '@react-navigation/stack';
import App from '../App';
import Two from './Two';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
<Stack.Navigator initialRouteName="App">
          <Stack.Screen name="App" component={App} />
          <Stack.Screen name="Two" component={Two} />
        </Stack.Navigator>
  );
};

export default AppNavigator;

