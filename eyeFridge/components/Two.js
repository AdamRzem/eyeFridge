import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ScrollView  } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Appbar, Avatar, Button, Card, Title, Paragraph, Switch } from 'react-native-paper';
import Main from './Card';
import Show from './Show';
import AppNavigator from './Navigation';


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










 const Two = ({ navigation }) => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme); 

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setCurrentTheme(isEnabled ? lightTheme : darkTheme); 
    // setCurrentTheme({ ...currentTheme, appBarTitle: newAppbarTheme }, isEnabled ? lightTheme.textColor : darkTheme.textColor);
  };
  


  const [isEnabled, setIsEnabled] = useState(false);
  

  const _handleMore = () => console.log('Shown more');

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: currentTheme.backgroundColor, textColor: currentTheme.textColor, paddingTop: 20, paddingBottom: 20}} >
      <Appbar style={{marginBottom: 10, backgroundColor: currentTheme.backgroundColor, textColor: currentTheme.textColor}} >
      <Appbar.BackAction onPress={this._goBack} />
      <Appbar.Content title="Two" style={{ color: currentTheme.appBarTitle?.color || currentTheme.textColor }}/>
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

      <Button onPress={() => navigation.navigate('App')} title="Go to App">Idź</Button>


      </ScrollView>
        
   
    </View>
    
  )
};


export default Two


