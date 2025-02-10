import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useLogin } from '../../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BACKEND_URL} from "../../../constants/Ports";

const SignInCode = ({navigation}) => {
  const [code,setCode] = useState("");
  const {setAccessToken,setRefreshToken,setUser} = useLogin();

  const handleLogin = async()=>{
    try {
      if(!code){
        Alert.alert("Missing fields","Fill all the fields");
        return;
      }
      const url = `${BACKEND_URL}/users/login-code`;
      const response = await axios.post(url,{code},{headers:{
        "Content-Type":"application/json"
      }})
      const res = await response.data;
      if (res.success) {
        const { accessToken, refreshToken,patient } = res.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(patient);
        await AsyncStorage.setItem('accessToken',accessToken);
        await AsyncStorage.setItem('refreshToken',refreshToken);
        await AsyncStorage.setItem('user',JSON.stringify(patient));
      }
      setCode("");
    } catch (error) {
      console.log("Error : ",error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      <Text style={styles.instruction}>
        Ask your caretaker to provide pairing code
      </Text>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#B0B0B0" style={styles.icon} />
        <TextInput 
          placeholder="Enter your pairing code"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={code}
          onChangeText={setCode}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginRight: 30,
    flex: 1,
    textAlign: 'center',
  },
  instruction: {
    color: '#404040',
    marginBottom: 50,
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '400'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 25,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    color: '#808080',
  },
  signInButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#000080',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default SignInCode;