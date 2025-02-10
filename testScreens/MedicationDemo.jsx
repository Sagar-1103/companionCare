import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform,TextInput, StyleSheet } from "react-native";
import { useLogin } from "../context/LoginProvider";
import { BACKEND_URL } from "../constants/Ports";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundService from 'react-native-background-actions';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const MedicationReminderScreen = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const {user,setMedications,medications} = useLogin(); 
  // console.log(medications);
  

  const veryIntensiveTask = async taskDataArguments => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        medications.forEach(medication => {
          // const givenDate = new Date(medication.timing);
          const givenDate = new Date(`Mon Feb 10 2025 20:17:00 GMT+0530 (India Standard Time)`);
          const now = new Date();
          const startDate = new Date("2025-02-05");
          const endDate = new Date("2025-02-30");

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
  const stopBackgroundServices = async () => {
    try {
      await BackgroundService.stop();
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  // useEffect(()=>{
  //   getMedications();
  // },[]);

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

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    setShowPicker(false);
  };

  const handleSubmit = () => {
    console.log("Selected Time:", time);
  };

  return (
    <View style={styles.container}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 600}}>Home</Text>
          <TouchableOpacity
            onPress={startBackgroundServices}
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
            onPress={stopBackgroundServices}
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
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: 'powderblue',
              paddingHorizontal: 30,
              paddingVertical: 12,
              borderRadius: 20,
              marginVertical: 10,
            }}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 600}}>
              Post User
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


export default MedicationReminderScreen;
