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
import ChatScreen from '../screens/common/ChatScreen';
import PatientChat from '../testScreens/PatientChat';
import { PermissionsAndroid, Platform } from 'react-native';
import FallDetectionPage from '../screens/common/FallDetectionPage';
import MedicineListScreen from '../screens/patientScreens/MedicineListScreen';
import TwatchAIScreen from '../screens/common/TwatchAIScreen';
import MedicationReminder from '../screens/common/MedicationReminder';
import LogScreen from '../screens/patientScreens/LogsScreen';
import SymptomsCard from '../components/SymptomsCard';
import WalkTrackerScreen from '../screens/common/WalkTrackerScreen';
import SleepTrackerScreen from '../screens/common/SleepTrackerScreen';
import HeartTrackerScreen from '../screens/common/HeartTrackerScreen';
import SpO2TrackerScreen from '../screens/common/SpO2TrackerScreen';
import AddSymptonScreen from "../screens/patientScreens/AddSymptonScreen";
import InsulinDosageScreen from '../screens/patientScreens/InsulinDosageScreen';
import InsulinDosageRecommendation from "../screens/patientScreens/InsulinDosageRecommendation";
import WaterIntakeScreen from "../screens/patientScreens/WaterIntakeScreen";
import ChatContactsList from '../screens/common/ChatContactList';
import ProfileDisplayScreen from '../screens/common/ProfileDisplayScreen';
import Selection from '../screens/auth/common/Selection';
import CodeDisplayScreen from '../screens/common/CodeDisplayScreen';
import CodeShowScreen from '../screens/common/CodeShowScreen';
import DiseaseDetectionScreen from '../screens/common/DiseaseDetectionScreen';
import DetectingScreen from '../screens/common/DetectingScreen';
import FirstAid from '../components/FirstAidList';
import FirstAidGuide from '../components/FirstAid/BasicSteps';
import CommonProb from '../components/FirstAid/CommonProblems';
import RareCase from '../components/FirstAid/RareCase';
import AiChatScreen from '../screens/common/AIChatScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [loading,setLoading] = useState(true);
    const {user,setUser,setDiseases,setAccessToken,setRefreshToken,done,setDone,setMedications} = useLogin();
    
    useEffect(()=>{
        storageAccess();
        setTimeout(()=>{
            requestNotificationPermission();
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

    const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Notification permission denied");
        }
        }
    };

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
                    <Stack.Screen name="MedicineListScreen" component={MedicineListScreen}/>
                    <Stack.Screen name="TwatchAIScreen" component={TwatchAIScreen}/>
                    <Stack.Screen name="MedicationReminder" component={MedicationReminder}/>
                    <Stack.Screen name="LogScreen" component={LogScreen}/>
                    <Stack.Screen name="SymptomsCard" component={SymptomsCard}/>
                    <Stack.Screen name="WalkTrackerScreen" component={WalkTrackerScreen}/>
                    <Stack.Screen name="SleepTrackerScreen" component={SleepTrackerScreen}/>
                    <Stack.Screen name="HeartTrackerScreen" component={HeartTrackerScreen}/>
                    <Stack.Screen name="SpO2TrackerScreen" component={SpO2TrackerScreen}/>
                    <Stack.Screen name="ChatContactsList" component={ChatContactsList}/>
                    <Stack.Screen name="ChatScreen" component={ChatScreen}/>
                    <Stack.Screen name="ProfileDisplayScreen" component={ProfileDisplayScreen}/>
                    <Stack.Screen name="Selection" component={Selection}/>
                    <Stack.Screen name="CodeShowScreen" component={CodeShowScreen}/>
                    <Stack.Screen name="WaterIntakeScreen" component={WaterIntakeScreen}/>
                    <Stack.Screen name="DetectingScreen" component={DiseaseDetectionScreen}/>
                    <Stack.Screen name="DiseaseDetectionScreen" component={DetectingScreen}/>
                    <Stack.Screen name="FirstAid" component={FirstAid}/>
                    <Stack.Screen name="FirstAidGuide" component={FirstAidGuide}/>
                    <Stack.Screen name="CommonProb" component={CommonProb}/>
                    <Stack.Screen name="RareCase" component={RareCase}/>
                    <Stack.Screen name="AiChatScreen" component={AiChatScreen}/>


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
                    <Stack.Screen name="MedicineListScreen" component={MedicineListScreen}/>
                    <Stack.Screen name="TwatchAIScreen" component={TwatchAIScreen}/>
                    <Stack.Screen name="MedicationReminder" component={MedicationReminder}/>
                    <Stack.Screen name="LogScreen" component={LogScreen}/>
                    <Stack.Screen name="SymptomsCard" component={SymptomsCard}/>
                    <Stack.Screen name="WalkTrackerScreen" component={WalkTrackerScreen}/>
                    <Stack.Screen name="SleepTrackerScreen" component={SleepTrackerScreen}/>
                    <Stack.Screen name="HeartTrackerScreen" component={HeartTrackerScreen}/>
                    <Stack.Screen name="SpO2TrackerScreen" component={SpO2TrackerScreen}/>
                    <Stack.Screen name="AddSymptonScreen" component={AddSymptonScreen}/>
                    <Stack.Screen name="InsulinDosageScreen" component={InsulinDosageScreen}/>
                    <Stack.Screen name="InsulinDosageRecommendation" component={InsulinDosageRecommendation}/>
                    <Stack.Screen name="ChatContactsList" component={ChatContactsList}/>
                    <Stack.Screen name="ChatScreen" component={ChatScreen}/>
                    <Stack.Screen name="ProfileDisplayScreen" component={ProfileDisplayScreen}/>
                    <Stack.Screen name="Selection" component={Selection}/>
                    <Stack.Screen name="CodeDisplayScreen" component={CodeDisplayScreen}/>
                    <Stack.Screen name="CodeShowScreen" component={CodeShowScreen}/>
                    <Stack.Screen name="WaterIntakeScreen" component={WaterIntakeScreen}/>
                    <Stack.Screen name="DetectingScreen" component={DetectingScreen}/>
                    <Stack.Screen name="DiseaseDetectionScreen" component={DiseaseDetectionScreen}/>
                    <Stack.Screen name="FirstAid" component={FirstAid}/>
                    <Stack.Screen name="FirstAidGuide" component={FirstAidGuide}/>
                    <Stack.Screen name="CommonProb" component={CommonProb}/>
                    <Stack.Screen name="RareCase" component={RareCase}/>
                    <Stack.Screen name="AiChatScreen" component={AiChatScreen}/>


        </Stack.Navigator>
        );
    }
    if(user.role==="patient" && user.caretakerId){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="PatientTabNavigation"  >
                    <Stack.Screen name="PatientTabNavigation" component={PatientTabNavigation}/>
                    <Stack.Screen name="PatientChat" component={PatientChat}/>
                    <Stack.Screen name="FallDetectionPage" component={FallDetectionPage}/>
                    <Stack.Screen name="MedicineListScreen" component={MedicineListScreen}/>
                    <Stack.Screen name="TwatchAIScreen" component={TwatchAIScreen}/>
                    <Stack.Screen name="MedicationReminder" component={MedicationReminder}/>
                    <Stack.Screen name="LogScreen" component={LogScreen}/>
                    <Stack.Screen name="SymptomsCard" component={SymptomsCard}/>
                    <Stack.Screen name="WalkTrackerScreen" component={WalkTrackerScreen}/>
                    <Stack.Screen name="SleepTrackerScreen" component={SleepTrackerScreen}/>
                    <Stack.Screen name="HeartTrackerScreen" component={HeartTrackerScreen}/>
                    <Stack.Screen name="SpO2TrackerScreen" component={SpO2TrackerScreen}/>
                    <Stack.Screen name="AddSymptonScreen" component={AddSymptonScreen}/>
                    <Stack.Screen name="InsulinDosageScreen" component={InsulinDosageScreen}/>
                    <Stack.Screen name="InsulinDosageRecommendation" component={InsulinDosageRecommendation}/>
                    <Stack.Screen name="ChatContactsList" component={ChatContactsList}/>
                    <Stack.Screen name="ChatScreen" component={ChatScreen}/>
                    <Stack.Screen name="ProfileDisplayScreen" component={ProfileDisplayScreen}/>
                    <Stack.Screen name="Selection" component={Selection}/>
                    <Stack.Screen name="CodeDisplayScreen" component={CodeDisplayScreen}/>
                    <Stack.Screen name="CodeShowScreen" component={CodeShowScreen}/>
                    <Stack.Screen name="WaterIntakeScreen" component={WaterIntakeScreen}/>
                    <Stack.Screen name="DetectingScreen" component={DetectingScreen}/>
                    <Stack.Screen name="DiseaseDetectionScreen" component={DiseaseDetectionScreen}/>
                    <Stack.Screen name="FirstAid" component={FirstAid}/>
                    <Stack.Screen name="FirstAidGuide" component={FirstAidGuide}/>
                    <Stack.Screen name="CommonProb" component={CommonProb}/>
                    <Stack.Screen name="RareCase" component={RareCase}/>
                    <Stack.Screen name="AiChatScreen" component={AiChatScreen}/>

        </Stack.Navigator>
        );
    }
    return null;
        
};

export default AppNavigator;