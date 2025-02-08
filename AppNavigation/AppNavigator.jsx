import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/common/SplashScreen';
import TabNavigation from './TabNavigation';
import { useLogin } from '../context/LoginProvider';
import ChooseRole from '../screens/auth/common/ChooseRole';
import CareTakerChoiceScreen from '../screens/auth/patient/CareTakerChoiceScreen';
import DiseaseSelectionScreen from '../screens/auth/common/DiseaseSelectionScreen';
import GetStartedScreen from '../screens/auth/GetStartedScreen';
import PatientDetails from '../screens/auth/common/PatientDetailsScreen';
import SignInCode from '../screens/auth/patient/SignInCode';
import SignUp from '../screens/auth/caretaker/SignUp';
import PatientSignUp from '../screens/auth/patient/PatientSignUp';
import CaretakerLogin from '../screens/auth/caretaker/CaretakerLogin';
import PatientLogin from '../screens/auth/patient/PatientLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [loading,setLoading] = useState(true);
    const {user,setUser,setAccessToken,setRefreshToken} = useLogin();
    
    useEffect(()=>{
        storageAccess();
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[])

    const storageAccess = async()=>{
            const tempUser = await AsyncStorage.getItem('user');
            const tempAccessToken = await AsyncStorage.getItem('accessToken');
            const tempRefreshToken = await AsyncStorage.getItem('refreshToken');
            setUser(JSON.parse(tempUser));
            setAccessToken(tempAccessToken);
            setRefreshToken(tempRefreshToken);
    }

    if (loading) {
        return (
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="SplashScreen"  >
                   <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            </Stack.Navigator>
          );
    }

    if(!user){
        return (
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="ChooseRole"  >
            <Stack.Screen name="ChooseRole" component={ChooseRole}/>
            <Stack.Screen name="CareTakerChoiceScreen" component={CareTakerChoiceScreen}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="SignInCode" component={SignInCode}/>
            <Stack.Screen name="PatientSignUp" component={PatientSignUp}/>
            <Stack.Screen name="PatientLogin" component={PatientLogin}/>
            <Stack.Screen name="CaretakerLogin" component={CaretakerLogin}/>                                  
        </Stack.Navigator>
        );
    }
    
    if(user.role==="caretaker" && !user.patientId){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="PatientDetails"  >
                    <Stack.Screen name="PatientDetails" component={PatientDetails}/>
        </Stack.Navigator>
        );
    }

    if(user.role==="caretaker" && user.patientId){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="DiseaseSelectionScreen"  >
                    <Stack.Screen name="DiseaseSelectionScreen" component={DiseaseSelectionScreen}/>
        </Stack.Navigator>
        );
    }
        
};

export default AppNavigator;