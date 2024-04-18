import React from 'react';
import { withExpoSnack } from 'nativewind';

import { Text } from "react-native"
import { styled, useColorScheme } from "nativewind";
import { Button } from 'react-native-paper';

const lightTheme = {
  backgroundColor: '#f4f3f4', // Light background
  textColor: '#333', // Dark text
  // ... other styles for light theme
};

const darkTheme = {
  backgroundColor: '#3e3e3e', // Dark background
  textColor: '#fff', // Light text
  // ... other styles for dark theme
};

function Theme() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme); 

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setCurrentTheme(isEnabled ? lightTheme : darkTheme); 
  };
  


  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
    backgroundColor="#3e3e3e"
    onValueChange={toggleSwitch}
    value={isEnabled}
  />
  );
}



export default withExpoSnack(Theme);