import React, { useContext, useState, useEffect } from 'react'
import { Switch } from 'react-native-paper';
import App from '../App';



const Theme = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme); 

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setCurrentTheme(isEnabled ? lightTheme : darkTheme); 
  };
  
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

  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
    backgroundColor="#3e3e3e"
    onValueChange={toggleSwitch}
    value={isEnabled}
  />
  );
}



export default Theme;