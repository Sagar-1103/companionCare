import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/common/SplashScreen';
import PatientTabNavigation from './PatientTabNavigation';
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
import SetMedicineTiming from '../screens/auth/common/SetMedicineTiming';
import SetSpeedDial from '../screens/auth/caretaker/SetSpeedDial';
import SetHomeLocation from '../screens/auth/caretaker/SetHomeLocation';
import UserCodeScreen from '../screens/auth/caretaker/UserCodeScreen';
import CaretakerTabNavigator from './CaretakerNavigation';
import ChatScreen from '../testScreens/ChatScreen';
import PatientChat from '../testScreens/PatientChat';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [loading,setLoading] = useState(true);
    const {user,setUser,setDiseases,setAccessToken,setRefreshToken,done,setDone,setMedications} = useLogin();
    
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
            const tempDone = await AsyncStorage.getItem('done');
            const tempMedications = await AsyncStorage.getItem('medications');
            const tempDiseases = await AsyncStorage.getItem('diseases');
            setMedications(JSON.parse(tempMedications));
            setUser(JSON.parse(tempUser));
            setDiseases(JSON.parse(tempDiseases));
            setAccessToken(tempAccessToken);
            setRefreshToken(tempRefreshToken);
            if(tempDone==="true"){
                setDone(true);
            }
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

    if(user.role==="caretaker" && user.patientId && !done){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="DiseaseSelectionScreen"  >
                    <Stack.Screen name="DiseaseSelectionScreen" component={DiseaseSelectionScreen}/>
                    <Stack.Screen name="SetMedicineTiming" component={SetMedicineTiming}/>
                    <Stack.Screen name="SetSpeedDial" component={SetSpeedDial}/>
                    <Stack.Screen name="SetHomeLocation" component={SetHomeLocation}/>
                    <Stack.Screen name="UserCodeScreen" component={UserCodeScreen}/>
        </Stack.Navigator>
        );
    }

    if(user.role==="caretaker" && user.patientId){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="TabNavigation"  >
                    <Stack.Screen name="TabNavigation" component={CaretakerTabNavigator}/>
                    <Stack.Screen name="ChatScreen" component={ChatScreen}/>
        </Stack.Navigator>
        );
    }

    if(user.role==="patient" && !done && !user.caretakerId ){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="DiseaseSelectionScreen"  >
                    <Stack.Screen name="DiseaseSelectionScreen" component={DiseaseSelectionScreen}/>
                    <Stack.Screen name="SetMedicineTiming" component={SetMedicineTiming}/>
        </Stack.Navigator>
        );
    }
    if(user.role==="patient" && done && !user.caretakerId){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="PatientTabNavigation"  >
                    <Stack.Screen name="PatientTabNavigation" component={PatientTabNavigation}/>
                    <Stack.Screen name="PatientChat" component={PatientChat}/>
        </Stack.Navigator>
        );
    }
    if(user.role==="patient" && user.caretakerId){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="PatientTabNavigation"  >
                    <Stack.Screen name="PatientTabNavigation" component={PatientTabNavigation}/>
                    <Stack.Screen name="PatientChat" component={PatientChat}/>
        </Stack.Navigator>
        );
    }
    return null;
        
};

export default AppNavigator;