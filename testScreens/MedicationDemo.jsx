import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform,TextInput, StyleSheet } from "react-native";
import { useLogin } from "../context/LoginProvider";
import { BACKEND_URL } from "../constants/Ports";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundService from 'react-native-background-actions';
import PushNotification from "react-native-push-notification";

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const MedicationReminderScreen = () => {
  const {user,setMedications,medications} = useLogin(); 
  // console.log(medications);
  

  const veryIntensiveTask = async taskDataArguments => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        medications?.forEach(medication => {
          const givenDate = new Date(medication.timing);
          // const givenDate = new Date(`Mon Feb 10 2025 20:17:00 GMT+0530 (India Standard Time)`);
          const now = new Date();
          const startDate = new Date(medication.startDate);
          const endDate = new Date(medication.endDate);

          let medTime = givenDate;
          if(medication.before){
            medTime = new Date(givenDate.getTime() - parseInt(medication.before) * 60000);
          } 
          if(medication.after) {
            medTime = new Date(givenDate.getTime() + parseInt(medication.after) * 60000);
          }

          if (now >= startDate && now <= endDate) {
            if (medTime.toLocaleTimeString() === now.toLocaleTimeString()) {
              //Todo: Handle alert logic
              console.log("The dates match!");
              showMedNotification(medication.medicineName)
          } else {
            console.log(medTime.toLocaleTimeString(),now.toLocaleTimeString());
          }
        } else {
            console.log("Today's date is outside the range.");
        }
          
        });
        await sleep(delay);
      }
    });
  };

  const showMedNotification = (title) => {
    PushNotification.localNotification({
      channelId: "Medication-alert", 
      title: `${title}`,
      message: `You have to take the medicine now .`,  
      bigText: "Tap this notification for more details.",  
      importance: "high",  
      playSound: true,  
      soundName: "default",  
      actions: ["Confirm"],  
      invokeApp: true,
    });
  };

  const options = {
    taskName: 'Medication',
    taskTitle: 'Medication',
    taskDesc: 'Medication Description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  const startBackgroundServices = async () => {
    try {
      await BackgroundService.start(veryIntensiveTask, options);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  useEffect(()=>{
    getMedications();
    startBackgroundServices();
  },[]);

  const getMedications = async()=>{
    try {
      const url = `${BACKEND_URL}/medications/get-medications/${user.id}`;
      const response = await axios.get(url);
      const res = await response.data;
      setMedications(res.data.medications);
      await AsyncStorage.setItem('medications',JSON.stringify(res.data.medications));
      console.log("Fetched meds");
    } catch (error) {
      console.log("Error : ",error.message);
    }
  }
  return (
    <View>
        </View>
  );
};


export default MedicationReminderScreen;
