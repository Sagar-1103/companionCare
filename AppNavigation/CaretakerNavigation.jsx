import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import Home from '../components/Home';
import Logo from '../assets/Logo.png';
import MedicationReminder from '../screens/common/MedicationReminder';
import HealthTrackerScreen from '../screens/common/HealthTrackerScreen';
import {useLogin} from '../context/LoginProvider';
import LocationScreen from '../screens/caretakerScreens/LocationScreen';

const Tab = createBottomTabNavigator();

const tabData = [
  {
    name: 'Home',
    component: HealthTrackerScreen,
    icons: {
      inactive: Logo,
      active: Logo,
    },
  },
  {
    name: 'Location',
    component: LocationScreen,
    icons: {
      inactive: Logo,
      active: Logo,
    },
  },
  {
    name: 'Medication',
    component: MedicationReminder,
    icons: {
      inactive: Logo,
      active: Logo,
    },
  },
  {
    name: 'Profile',
    component: Home,
    icons: {
      inactive: Logo,
      active: Logo,
    },
  },
];

const CaretakerTabNavigator = () => {
  const {diseases} = useLogin();
  const hasAlzheimer = diseases.some(disease => disease.diseaseName.toLowerCase().includes("alzheimer"));;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff', // Clean white background
          borderTopWidth: 0, // No border line
          height: 60, // Compact size
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarActiveTintColor: '#f3765f', // Active icon color
        tabBarInactiveTintColor: '#6c757d', // Inactive icon color
        tabBarLabelStyle: {
          fontSize: 10, // Smaller labels
          fontWeight: '500', // Lighter font weight for minimalism
          marginBottom: 7,
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
          margin: 0,
        },
      }}>
      {tabData.map((tab, index) => {
        if (!hasAlzheimer && tab.name === 'Location') {
          return;
        } else {
          return (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={focused ? tab.icons.active : tab.icons.inactive}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                ),
              }}
            />
          );
        }
      })}
    </Tab.Navigator>
  );
};

export default CaretakerTabNavigator;
