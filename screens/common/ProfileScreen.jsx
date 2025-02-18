import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useLogin} from "../../context/LoginProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const {user,setUser} = useLogin();
  const navigation = useNavigation();

  const handleLogout = async()=>{
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  return (
    <View style={styles.container}>
      {/* Back Button and Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Touchable Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileDisplayScreen")}>
        <Icon name="person" size={42} color="#000" />
        <Text style={styles.buttonText}>Personal Details</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      {!user.caretakerId && <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Selection")}>
        <Icon name="medkit" size={42} color="#000" />
        <Text style={styles.buttonText}>Disease Selection</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>}

      { user.role==="patient" && <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate("CodeDisplayScreen")}>
        <Fontisto name="doctor" size={42} color="#000" />
        <Text style={styles.buttonText}>Connect Doctor</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>}

      <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate("CodeShowScreen")} >
        <Icon name="qr-code" size={42} color="#000" />
        <Text style={styles.buttonText}>Pairing Code</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12%',
    marginTop:'5%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: '6%',
    paddingVertical: '6%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: '8%',
    flex: 1,
    color:'#000'
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#003366',
    borderRadius: 15,
    marginTop: '15%',
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default ProfileScreen;
