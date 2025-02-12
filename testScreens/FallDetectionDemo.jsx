import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform,TextInput, StyleSheet } from "react-native";
import { useLogin } from "../context/LoginProvider";
import { BACKEND_URL } from "../constants/Ports";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { map, filter } from "rxjs/operators";
import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const FallDetectionDemo = () => {
    const [accelSubscription, setAccelSubscription] = useState(null);
    const [gyroSubscription, setGyroSubscription] = useState(null);
    const [latestAcceleration, setLatestAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [latestGyroscope, setLatestGyroscope] = useState({ x: 0, y: 0, z: 0 });
    const {user} = useLogin(); 
  
  const startBackgroundService = async () => {
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

    const showNotification = () => {
        PushNotification.localNotification({
          channelId: "Patient-alert",
          title: `${user.name} : Accidental Fall`,
          message: 'If your phone has accidently fallen then click the notification',
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

    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

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

    await BackgroundService.start(veryIntensiveTask, options);
  };

  const stopBackgroundService = async () => {
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


  return (
    <View style={styles.container}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 600}}>Home</Text>
          <TouchableOpacity
            onPress={startBackgroundService}
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
            onPress={stopBackgroundService}
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
