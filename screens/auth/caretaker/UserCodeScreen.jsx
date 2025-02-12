import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLogin } from '../../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserCodeScreen = ({navigation}) => {
  const {user,setDone} = useLogin();

  const handleSubmit = async()=>{
    try {
      setDone("true");
      await AsyncStorage.setItem('done',"true");
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <Ionicons name="chevron-back" size={36} color="#001f3f" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>      
        <Text style={styles.title}>Share Code</Text>
      </View>
      <Text style={styles.InnerText}>Share the below code to pair with your user</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}> 
            {user.code}
        </Text>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%', 
    backgroundColor: '#fff',
    
  },
  title: {
    fontSize: 32, 
    color: '#000000',
    textAlign: 'center',
    
    fontWeight: 'bold',
  },
  backContainer: {
    height: '10%',
    top: '7%',
    width: '50%',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginBottom: '10%', 
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    left: '2%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-8%',
    marginBottom: '15%'
  },
  inputText: {
    color: '#000',
    fontSize: 50,
    fontWeight: '600',
  },
  backButton: {
    width: '25%',
    height: '60%',
    marginLeft: '-6%',
    marginTop: '2.5%'
  },
  passIcon: {
    width: '10%', 
    height: '50%',
  },
  signInButton: {
    backgroundColor: '#001f3f',
    padding: '6%',
    borderRadius: 32,
    marginTop: '4%', 
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  InnerText: {
    marginTop: '12%',
    marginBottom: '22%',
    fontSize: 22,
    textAlign: 'center',
    color: 'rgb(73, 70, 70)',
  },
});
export default UserCodeScreen;