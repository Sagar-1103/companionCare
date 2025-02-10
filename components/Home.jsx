import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));


const Home = () => {
  const [tempName,setTempName] = useState("");
  const [tempEmail,setTempEmail] = useState("");
  const [tempPassword,setTempPassword] = useState("");
  const {user} = useLogin();
  console.log(user);
  

    const postUser = async(user)=>{
        try {
            const response = await axios.post("",user,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const res = await response.data;
            console.log(res);
            await AsyncStorage.clear();
            await stopBackgroundServices();
        } catch (error) {
            console.log("Error : ",error);
        }
    }

    const handle = async()=>{
        try {
            await NetInfo.fetch().then(async(state) => {
                if(!state.isConnected){
                    const tempUser =  {
                        name: tempName,
                        email:tempEmail,
                        password:tempPassword
                    }
                  await AsyncStorage.setItem('input',JSON.stringify(tempUser));
                  await startBackgroundServices();
                }
                else {
                  const tempUser =  {
                    name: tempName,
                    email:tempEmail,
                    password:tempPassword
                }
                    postUser(tempUser);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }


  const veryIntensiveTask = async taskDataArguments => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        await NetInfo.fetch().then(async(state) => {
            if(state.isConnected){
                const storedUser = await AsyncStorage.getItem('input');
                if (storedUser) {
                    const user = await JSON.parse(storedUser);
                    await postUser(user);
                }
            }
          });
        await sleep(delay);
      }
    });
  };

  const options = {
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
      <TextInput
          onChangeText={setTempName}
          value={tempName}
          placeholder="Enter Name"
        />
        <TextInput
          onChangeText={setTempEmail}
          value={tempEmail}
          placeholder="Enter Email"
        />
        <TextInput
          onChangeText={setTempPassword}
          value={tempPassword}
          placeholder="Enter Password"
        />
      <TouchableOpacity
        onPress={handle}
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

export default Home;
