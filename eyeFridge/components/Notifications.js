import { PermissionsAndroid } from 'react-native';


const requestPermissions = async () => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.NOTIFICATION,
    {
      title: 'eyeFridge Notification Permission',
      message: 'eyeFridge app needs notification permission to remind you about your groceries.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Notification permission granted');
  } else {
    console.log('Notification permission denied');
  }
};


export default requestPermissions;