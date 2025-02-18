import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../components/Home';
import Logo from "../assets/Logo.png";
import HealthTrackerScreen from '../screens/common/HealthTrackerScreen';
import MedicationReminder from '../screens/common/MedicationReminder';
import FallDetectionDemo from '../testScreens/FallDetectionDemo';
import ProfileScreen from '../screens/common/ProfileScreen';
import HomeScreen from '../screens/common/HomeScreen';



const Tab = createBottomTabNavigator();



const tabData = [
    {
        name: 'Home',
        component: HomeScreen,
        icons: {
            inactive: 'home-outline',
            active: 'home',
        },
    },
    {
        name: 'Health',
        component: HealthTrackerScreen,
        icons: {
            inactive: 'heart-outline',
            active: 'heart',
        },
    },
    {
        name: 'Profile',
        component: ProfileScreen,
        icons: {
            inactive: 'person-outline',
      active: 'person',
        },
    },
];

const PatientTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff', // Clean white background
                    borderTopWidth: 0, // No border line
                    height: 60, // Compact size
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                },
                tabBarActiveTintColor: '#2222aa', // Active icon color
                tabBarInactiveTintColor: '#6c757d', // Inactive icon color
                tabBarLabelStyle: {
                    fontSize: 10, // Smaller labels
                    fontWeight: '500', // Lighter font weight for minimalism
                    marginBottom: 7
                },
                tabBarIconStyle: {
                    width: 24,
                    height: 24,
                    margin: 0,
                },
            }}
        >
            {tabData.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                                name={focused ? tab.icons.active : tab.icons.inactive}
                                                size={24}
                                                color={focused ? '#2222aa' : '#6c757d'}
                                              />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default PatientTabNavigation;