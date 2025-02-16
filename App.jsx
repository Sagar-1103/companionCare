import React, { useEffect } from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import LoginProvider from './context/LoginProvider';
import AppNavigator from './AppNavigation/AppNavigator';
import PushNotification from 'react-native-push-notification';
import { Linking } from 'react-native';

const App = () => {

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'Patient-alert', 
        channelName: 'Patient-alert Channel',
        channelDescription: 'Channel for Patient Fall Detection Alert',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'Location-alert', 
        channelName: 'Location-alert Channel',
        channelDescription: 'Channel for Location Tracking Alert',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'Fall-alert', 
        channelName: 'Fall-alert Channel',
        channelDescription: 'Channel for Fall Alert',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  }, []);

  // Deep linking configuration
// const linking = {
//   prefixes: ['yourSchemeHere://'], // Define your custom scheme
//   config: {
//     screens: {
//       FallAlertScreen: 'fall-alert',
//       HomeScreen: 'home',
//     },
//   },
// };

// useEffect(() => {
//   const handleDeepLink = (event) => {
//     const url = event.url;
//     console.log("Received deep link:", url);
//   };

//   Linking.addEventListener('url', handleDeepLink);
//   return () => {
//     Linking.removeEventListener('url', handleDeepLink);
//   };
// }, []);


  return (
    <NavigationContainer >
      <LoginProvider>
        <AppNavigator/>
      </LoginProvider>
    </NavigationContainer>
  );
};

export default App;
