import React, { useEffect } from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import LoginProvider from './context/LoginProvider';
import AppNavigator from './AppNavigation/AppNavigator';
import PushNotification from 'react-native-push-notification';


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
  }, []);

  return (
    <NavigationContainer>
      <LoginProvider>
        <AppNavigator/>
      </LoginProvider>
    </NavigationContainer>
  );
};

export default App;
