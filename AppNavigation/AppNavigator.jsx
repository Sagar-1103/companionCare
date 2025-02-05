import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Maps from "../components/Maps";
import Home from "../components/Home";
import Camera from "../components/Camera";
import SplashScreen from '../components/SplashScreen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        storageAccess();
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[])

    const storageAccess = async()=>{
            
    }

    if (loading) {
        return (
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="SplashScreen"  >
                   <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            </Stack.Navigator>
          );
    }
    // return (
    //         <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home"  >
    //                 <Stack.Screen name="Home" component={Home}/>
    //                 <Stack.Screen name="Camera" component={Camera}/>
    //                 <Stack.Screen name="Maps" component={Maps}/>
    //         </Stack.Navigator>
    // );
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="TabNavigation"  >
                <Stack.Screen name="TabNavigation" component={TabNavigation}/>
        </Stack.Navigator>
);
        
};

export default AppNavigator;