import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, 
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 
import axios from 'axios';
import { useLogin } from '../../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from "../../../constants/Ports";
import ToastManager, { Toast } from "toastify-react-native";
import LottieView from 'lottie-react-native'; 

const PatientDetails = ({navigation}) => {
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const {user, setUser} = useLogin();

  const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' },
  ];

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleContinue = async () => {
    try {
      if (!patientEmail || !patientName || !gender || !dateOfBirth || !phoneNumber) {
        Toast.error('Fill all the fields');
        return;
      }

      setIsLoading(true); // Start loading

      const url = `${BACKEND_URL}/users/register-patient-by-caretaker`;
      const response = await axios.post(url, {
        name: patientName,
        email: patientEmail,
        phNo: phoneNumber,
        dob: new Date(dateOfBirth).toLocaleDateString("en-GB"),
        gender,
        role: "patient",
        caretakerId: user.id
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const res = await response.data;
      if (res.success) {
        const url = `${BACKEND_URL}/users/current-caretaker/${user.id}`;
        const response1 = await axios.get(url);
        const res1 = await response1.data;
        const tempUser = res1.data.caretaker;

        setUser(tempUser);
        await AsyncStorage.setItem('user', JSON.stringify(tempUser));
        setPatientName("");
        setPatientEmail("");
        setGender(null);
        setDateOfBirth(null);
        setPhoneNumber("");
        Toast.success('Patient registered successfully');
      }
    } catch (error) {
      console.log("Error : ", error.message);
      Toast.error(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <ToastManager 
        position="top-right" // Position it at the top-right corner
        style={{
          padding: '2%',
          marginTop: -680,
          right: '0.5%'
        }}
        textStyle={{
          fontSize: 15,
          padding: 3,
        }}
      />
      <View style={styles.container}>
        {/* Loader */}
        {isLoading && (
          <View style={styles.loaderContainer}>
            <LottieView
              source={require('../../../assets/appLoader.json')} // Path to your appLoader.json
              autoPlay
              loop
              style={styles.loader}
            />
          </View>
        )}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={30} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Patient Details</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#B0B0B0" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Patient Name"
            placeholderTextColor="#B0B0B0"
            value={patientName}
            onChangeText={setPatientName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#B0B0B0" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Patient Email"
            placeholderTextColor="#B0B0B0"
            value={patientEmail}
            autoCapitalize='none'
            onChangeText={setPatientEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="transgender" size={24} color="#B0B0B0" style={styles.icon} />
          <Dropdown
            style={styles.dropdown}
            placeholder="Select Gender"
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            data={genderData}
            labelField="label"
            valueField="value"
            value={gender}
            onChange={item => setGender(item.value)}
            renderLeftIcon={() => null}
          />
        </View>

        <View style={[styles.inputContainer, {paddingVertical: 18}]}>
          <Ionicons name="calendar-outline" size={24} color="#B0B0B0" style={styles.icon} />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.input, { color: dateOfBirth ? '#505050' : '#B0B0B0' }]}>
              {dateOfBirth ? dateOfBirth.toLocaleDateString() : "Patient's Date of Birth"}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
          />
        )}

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={24} color="#B0B0B0" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Patient Phone Number"
            placeholderTextColor="#B0B0B0"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
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
    marginBottom: 50,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#505050',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#B0B0B0',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#000000',
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#505050',
  },
  continueButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#000080',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    zIndex: 999, // Ensure it appears above other elements
  },
  loader: {
    width: 200, // Adjust the size as needed
    height: 200, // Adjust the size as needed
  },
});

export default PatientDetails;