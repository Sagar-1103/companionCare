import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import LoginProvider from './context/LoginProvider';
import AppNavigator from './AppNavigation/AppNavigator';


const App = () => {
  return (
    <NavigationContainer>
      <LoginProvider>
        <AppNavigator/>
      </LoginProvider>
    </NavigationContainer>
  );
};

export default App;
