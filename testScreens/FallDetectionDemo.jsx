import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform,TextInput, StyleSheet, PermissionsAndroid } from "react-native";
import { BACKEND_URL } from "../constants/Ports";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { map, filter } from "rxjs/operators";
import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';
import Geolocation from "@react-native-community/geolocation";
import { useLogin } from "../context/LoginProvider";

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const FallDetectionDemo = ({navigation}) => {
    const [accelSubscription, setAccelSubscription] = useState(null);
    const [gyroSubscription, setGyroSubscription] = useState(null);
    const [latestAcceleration, setLatestAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [latestGyroscope, setLatestGyroscope] = useState({ x: 0, y: 0, z: 0 });
    const {user} = useLogin();

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

    useEffect(() => {
      requestNotificationPermission();
      startServices();
    }, []);

  const startServices = async()=>{
    await Promise.all([startBackgroundService1(),startBackgroundService2()]);
  }
  
  const startBackgroundService2 = async () => {
    const veryIntensiveTask = async (taskDataArguments) => {
      const { delay } = taskDataArguments;
      setUpdateIntervalForType(SensorTypes.accelerometer, 400); 
      setUpdateIntervalForType(SensorTypes.gyroscope, 400);
      const accelSub = accelerometer
        .pipe(
          map(({ x, y, z }) => ({ x, y, z })),
          filter(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z) > 0.1)
        )
        .subscribe(
          acceleration => {
            if (detectFall(acceleration, latestGyroscope)) {
              console.log('Fall detected 1');
              showNotification();
            }
            console.log(`______`);
            setLatestAcceleration(acceleration);
          },
          error => {
            console.log("Error reading accelerometer data:", error);
          }
        );
        
      const gyroSub = gyroscope
        .pipe(
          map(({ x, y, z }) => ({ x, y, z }))
        )
        .subscribe(
          gyro => {
            console.log(`______`);
            setLatestGyroscope(gyro);
          },
          error => {
            console.log("Error reading gyroscope data:", error);
          }
        );

      setAccelSubscription(accelSub);
      setGyroSubscription(gyroSub);

      await new Promise(async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
          await sleep(delay);
        }
      });

      return () => {
        if (accelSub) {
          accelSub.unsubscribe();
          setAccelSubscription(null);
        }
        if (gyroSub) {
          gyroSub.unsubscribe();
          setGyroSubscription(null);
        }
      };
    };
    await BackgroundService.start(veryIntensiveTask, options);
  };
  const showNotification = () => {
    PushNotification.localNotification({
      channelId: "Patient-alert",
      title: `${user.name}: Accidental Fall`,
      message: 'If your phone has accidentally fallen, tap to confirm your safety.',
      bigText: "Tap this notification to open the safety confirmation screen.",
      importance: "high",
      playSound: true,
      soundName: "default",
      actions: ["Confirm"],
      invokeApp: true,
      userInfo: { screen: "FallDetectionPage" }, 
      onPress:navigation.navigate("FallDetectionPage")
    });
  };
  const detectFall = (acceleration, gyroscope) => {
    const accelerationMagnitude = Math.sqrt(
      acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
    );
    const accelerationThreshold = 30; 
    const gyroThreshold = 20;
    if (accelerationMagnitude > accelerationThreshold) {
      const gyroMagnitude = Math.sqrt(
        gyroscope.x ** 2 + gyroscope.y ** 2 + gyroscope.z ** 2
      );
  
      if (gyroMagnitude < gyroThreshold) {
        return true;
      }
    }
  
    return false;
  };

  const options = {
    taskName: 'Fall Detection',
    taskTitle: 'Fall Detection',
    taskDesc: 'Fall Detection Running',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      delay: 1000,
    },
  };

  const stopBackgroundService2 = async () => {
    await BackgroundService.stop();
    if (accelSubscription) {
      accelSubscription.unsubscribe();
      setAccelSubscription(null);
    }
    if (gyroSubscription) {
      gyroSubscription.unsubscribe();
      setGyroSubscription(null);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            error => {
                reject(error.message);
            }
        );
    });
};

const fetchSafeStatus = async()=>{
  try {
    const url = `${BACKEND_URL}/geolocation/safe-zone-status/${user.id}`;
    const response = await axios.get(url);
    const res = await response.data;
    console.log(res.data.isInsideSafeZone);
    if(!res.data.isInsideSafeZone){
      showLocNotification();
    }
  } catch (error) {
    console.log("Error : ",error);
    stopServices();
  }
}

  const veryIntensiveTask1 = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            const location = await getCurrentLocation();
            console.log(location);
            const url = `${BACKEND_URL}/geolocation/set-location/${user.id}`;
            const response = await axios.post(url,{lon:location.longitude,lat:location.latitude,type:"patient"},{
              headers:{
                "Content-Type":"application/json"
              }
            });
            const res = await response.data;
            console.log(res.message);
            fetchSafeStatus();
            await sleep(delay);
        }
    });
};


const options1 = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
      delay: 30000,
  },
};

const showLocNotification = () => {
  PushNotification.localNotification({
    channelId: "Location-alert", 
    title: `Out of bound`,
    message: `${user.name} you are out of the bound.`,  
    bigText: "Tap this notification to open the safety confirmation screen.",  
    importance: "high",  
    playSound: true,  
    soundName: "default",  
    actions: ["Confirm"],  
    invokeApp: true,  
  });
};


const startBackgroundService1 = async()=>{
  await BackgroundService.start(veryIntensiveTask1, options1);
}
const stopBackgroundService1 = async()=>{
  await BackgroundService.stop(veryIntensiveTask1, options1);
}

  return (
    <View style={styles.container}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 600}}>Home</Text>
          <TouchableOpacity
            onPress={startBackgroundService1}
            style={{
              backgroundColor: 'powderblue',
              paddingHorizontal: 30,
              paddingVertical: 12,
              borderRadius: 20,
              marginVertical: 10,
            }}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 600}}>
              Start Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stopBackgroundService1}
            style={{
              backgroundColor: 'powderblue',
              paddingHorizontal: 30,
              paddingVertical: 12,
              borderRadius: 20,
              marginVertical: 10,
            }}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 600}}>
              Stop Services
            </Text>
          </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color:"black"
  },
});


export default FallDetectionDemo;
