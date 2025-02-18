import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useLogin} from '../context/LoginProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationScreen from '../screens/caretakerScreens/LocationScreen';
import HomeScreen from '../screens/common/HomeScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import HealthTrackerScreen from '../screens/common/HealthTrackerScreen';

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
    name: 'Location',
    component: LocationScreen,
    icons: {
      inactive: 'location-outline',
      active: 'location',
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

const CaretakerTabNavigator = () => {
  const {diseases} = useLogin();
  const hasAlzheimer = diseases.some(disease => disease.diseaseName.toLowerCase().includes("alzheimer"));

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
        tabBarActiveTintColor: '#2222aa', // Active icon color
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
          return null;
        } else {
          return (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons
                    name={focused ? tab.icons.active : tab.icons.inactive}
                    size={24}
                    color={focused ? '#2222aa' : '#6c757d'}
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