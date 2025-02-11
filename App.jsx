import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import LoginProvider from './context/LoginProvider';
import AppNavigator from './AppNavigation/AppNavigator';
import SetHomeLocation from './screens/auth/caretaker/SetHomeLocation';


const App = () => {
  return (
    <NavigationContainer>
      <LoginProvider>
        <AppNavigator/>
      </LoginProvider>
    </NavigationContainer>
    // <SetHomeLocation/>
  );
};

export default App;
