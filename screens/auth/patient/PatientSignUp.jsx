import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLogin } from '../../../context/LoginProvider';
import { BACKEND_URL } from '../../../constants/Ports';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native';
import LottieView from 'lottie-react-native';

const PatientSignUp = ({ navigation }) => {
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const { user, setUser, setAccessToken, setRefreshToken } = useLogin();

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

  const handleSignup = async () => {
    try {
      if (!patientEmail || !patientName || !gender || !dateOfBirth || !phoneNumber || !password || !confirmPassword) {
        Toast.error('Fill all the fields');
        return;
      }
      if (password !== confirmPassword) {
        Toast.error('Passwords do not match');
        setConfirmPassword('');
        return;
      }

      setIsLoading(true); // Start loading

      const url = `${BACKEND_URL}/users/register-patient`;
      const response = await axios.post(
        url,
        {
          name: patientName,
          password,
          email: patientEmail,
          phNo: phoneNumber,
          dob: new Date(dateOfBirth).toLocaleDateString('en-GB'),
          gender,
          role: 'patient',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const res = await response.data;
      if (res.success) {
        const { accessToken, refreshToken, patient } = res.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(patient);
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(patient));
        Toast.success('Patient registered successfully');
      }
    } catch (error) {
      console.log('Error : ', error.message);
      Toast.error(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <ToastManager
        position="top-right"
        style={{
          padding: '2%',
          marginTop: -680,
          right: '0.5%',
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={30} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Patient Sign Up</Text>
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
              onChange={(item) => setGender(item.value)}
              renderLeftIcon={() => null}
            />
          </View>

          <View style={[styles.inputContainer, { paddingVertical: 18 }]}>
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

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#B0B0B0" style={styles.icon} />
            <TextInput
              style={[styles.input, { color: password ? '#808080' : '#B0B0B0' }]}
              placeholder="Enter your password"
              placeholderTextColor="#B0B0B0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#B0B0B0"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#B0B0B0" style={styles.icon} />
            <TextInput
              style={[styles.input, { color: confirmPassword ? '#808080' : '#B0B0B0' }]}
              placeholder="Confirm your password"
              placeholderTextColor="#B0B0B0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#B0B0B0"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSignup} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('PatientLogin')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 18,
    color: '#1D1D1D',
  },
  signInText: {
    fontSize: 18,
    color: '#000080',
    fontWeight: 'bold',
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

export default PatientSignUp;