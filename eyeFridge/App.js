import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ScrollView  } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Appbar, Avatar, Button, Card, Title, Paragraph, Switch } from 'react-native-paper';
import Nav from './components/Navigation'
import Main from './components/Card';
import Show from './components/Show';
import PushNotification from 'react-native-push-notification';

const scheduleNotification = (title, message, delay) => {
    PushNotification.localNotification({
        /* Android Properties */
        channelId: "3ac68afc-c605-48d3-a4f8-fbd91aa97f70", // Required for Android 8.0 (Oreo) and higher
        title, // (optional) (string) Title of the notification
        message, // (required) (string) Message of the notification.
        playSound: true, // (optional) (bool) Whether or not to play the default sound.
        vibrate: true, // (optional) (bool) Whether or not to vibrate the device. 
        vibration: 300, // (optional) (mixed) Vibration pattern in milliseconds (duration), or a predefined vibration string (e.g., vibration: 'long')


        // number: 10, 

        when: Date.now() + delay, // (optional) (Date) When the notification should be triggered. If missing, it will be shown immediately.

        priority: "high", // (optional) (string) The priority of the notification (default: "high").
        visibility: "public", // (optional) (string) The visibility of the notification (default: "private").
        importance: "high", // (optional) (string) [Android] Importance of the notification (default: "high").
    });
};


const lightTheme = {
  backgroundColor: '#f4f3f4', // Light background
  textColor: '#333', // Dark text
  appbarTextColor: '#333', // AppbarTextColor
  // ... other styles for light theme
};

const darkTheme = {
  backgroundColor: 'rgb(30 41 59)', // Dark background
  textColor: '#fff', // Light text
  appbarTextColor: '#fff',
  // ... other styles for dark theme
};

const notificationTitle = "Your fridge has expiring items!";
const notificationMessage = "Check and use these items before they go bad!";
const delay = 10000; // 10 seconds delay (you can adjust this)


async function triggerNotification() {
  scheduleNotification(notificationTitle, notificationMessage, delay);
  console.log('działa?');
}
triggerNotification();


 const App = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme); 

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    const newAppbarTheme = {
      color: isEnabled ? lightTheme.textColor : darkTheme.textColor, // Set text color based on switch
    };
    setCurrentTheme(isEnabled ? lightTheme : darkTheme); 
    // setCurrentTheme({ ...currentTheme, appBarTitle: newAppbarTheme }, isEnabled ? lightTheme.textColor : darkTheme.textColor);
  };
  


  const [isEnabled, setIsEnabled] = useState(false);
  

  const _handleMore = () => console.log('Shown more');

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: currentTheme.backgroundColor, textColor: currentTheme.textColor, paddingTop: 20, paddingBottom: 20}} >
      <Appbar style={{marginBottom: 10, backgroundColor: currentTheme.backgroundColor, textColor: currentTheme.textColor}} >
      <Appbar.BackAction onPress={() => (console.log('dziala'))} />
      <Appbar.Content title="eyeFridge" style={{ color: currentTheme.appBarTitle?.color || currentTheme.textColor }}/>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      
      </Appbar>
      <ScrollView>
      <Main title={'Zawartość twojej lodówki'}/>
      <Main title={'Brakujące produkty'} />
      <Main title={'Przeterminowane rzeczy'} />
      
      <Show />
      {/* <Nav /> */}
      </ScrollView>
        
   
    </View>
    
  )
}


export default App


// npm install --global eas-cli && npx create-expo-app eyefridge && cd eyefridge && eas init --id 3b2423e6-700e-496c-9e57-5bbd74a9f7af

// npm install --global eas-cli && eas init --id 3b2423e6-700e-496c-9e57-5bbd74a9f7af


/*   android/build.gradle
ext {
    googlePlayServicesVersion = "<Your play services version>" // default: "+"
    firebaseMessagingVersion = "<Your Firebase version>" // default: "21.1.0"

    // Other settings
    compileSdkVersion = <Your compile SDK version> // default: 23
    buildToolsVersion = "<Your build tools version>" // default: "23.0.1"
    targetSdkVersion = <Your target SDK version> // default: 23
    supportLibVersion = "<Your support lib version>" // default: 23.1.1
}

https://www.npmjs.com/package/react-native-push-notification
*/