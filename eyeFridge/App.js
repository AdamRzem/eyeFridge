import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ScrollView  } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Appbar, Avatar, Button, Card, Title, Paragraph, Switch } from 'react-native-paper';
import Nav from './components/Navigation'
import Main from './components/Card';
import Theme from './components/Theme';
import { useColorScheme } from 'nativewind';
// import { NavigationContainer } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

// const scheduleNotification = (title, message, delay) => {
//   PushNotification.localNotification({
//     // Mandatory fields
//     title, // Required
//     message, // Required

//   });
// };


// const scheduleExpiryNotification = (title, expiryDate) => {
//   const today = new Date();
//   const notificationDelay = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24)); // Calculate delay in days
//   scheduleNotification(title, 'This item is expiring soon!', notificationDelay);
// };

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

 const App = () => {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme); 

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setCurrentTheme(isEnabled ? lightTheme : darkTheme); 
  };
  
//   useEffect(() => {
//     registerForPushNotificationsAsync();
// }, []);

  const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const _handleMore = () => console.log('Shown more');

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: currentTheme.backgroundColor, textColor: currentTheme.textColor}} >
      <Appbar style={{marginBottom: 10, backgroundColor: currentTheme.backgroundColor, textColor: currentTheme.textColor}} >
      <Appbar.BackAction onPress={() => (console.log('dziala'))} />
      <Appbar.Content title="eyeFridge" />
      <Switch
        backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      
      </Appbar>
      <ScrollView>
      <Main title={'Zawartość twojej lodówki: '}/>
      <Main title={'Brakujące produkty: '} />
      <Main title={'Przeterminowane rzeczy: '} />
      

      {/* <Title>{title}</Title> */}
      {/* Display expiry information for items */}
      {/* {items.map((item) => (
        <View key={item.id}>
          <Text>{item.name} - Expires: {item.expiryDate}</Text>
          {scheduleExpiryNotification(item.name, item.expiryDate)}
        </View>
      ))} */}
 
      {/* <Nav /> */}
      </ScrollView>
        
   
    </View>
    
  )
}


export default App


// npm install --global eas-cli && npx create-expo-app eyefridge && cd eyefridge && eas init --id 3b2423e6-700e-496c-9e57-5bbd74a9f7af

// npm install --global eas-cli && eas init --id 3b2423e6-700e-496c-9e57-5bbd74a9f7af