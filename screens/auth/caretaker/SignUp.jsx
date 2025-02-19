import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native'; 
import { BACKEND_URL } from '../../../constants/Ports';
import axios from 'axios';
import { useLogin } from '../../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from "toastify-react-native";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const { setUser, setAccessToken, setRefreshToken } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async () => {
    try {
      if (!name || !email || !password || !phoneNumber) {
        // Alert.alert('Missing fields', 'Fill all the fields');
        Toast.error('Fields Missing');
        return;
      }
      if (password !== confirmPassword) {
        // Alert.alert('Password Mismatch', 'Your passwords do not match');
        Toast.error('Password Mismatch');
        setConfirmPassword('');
        return;
      }

      setIsLoading(true); // Start loading

      const url = `${BACKEND_URL}/users/register-caretaker`;
      const response = await axios.post(
        url,
        { name, email, password, phNo: phoneNumber, role: 'caretaker' },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const res = await response.data;
      if (res.success) {
        const { accessToken, refreshToken, caretaker } = res.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(caretaker);
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(caretaker));
      }

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
    } catch (error) {
      console.log('Error : ', error.message);
      if(error.message==='Request failed with status code 409') Toast.error('User email already exist');
      else Toast.error(error.message);
      // Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
    <ToastManager 
        position="top-right" // Position it at the top-right corner
        style={{
          padding:'2%',
          marginTop: -680,
          right: '0.5%'
        }}
        textStyle={{
          fontSize: 15,
          padding:3,
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
        <Text style={styles.headerText}>Caretaker SignUp</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={[styles.input, { color: isEmailFocused || email ? '#808080' : '#B0B0B0' }]}
          placeholder="Enter your name"
          placeholderTextColor="#B0B0B0"
          value={name}
          onChangeText={setName}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={[styles.input, { color: isEmailFocused || email ? '#808080' : '#B0B0B0' }]}
          placeholder="Enter your email"
          placeholderTextColor="#B0B0B0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={[styles.input, { color: isPasswordFocused || password ? '#808080' : '#B0B0B0' }]}
          placeholder="Enter your password"
          placeholderTextColor="#B0B0B0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
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
          style={[styles.input, { color: isConfirmPasswordFocused || confirmPassword ? '#808080' : '#B0B0B0' }]}
          placeholder="Confirm your password"
          placeholderTextColor="#B0B0B0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
          <Ionicons
            name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color="#B0B0B0"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={[styles.input, { color: isPhoneNumberFocused || phoneNumber ? '#808080' : '#B0B0B0' }]}
          placeholder="Enter your phone number"
          placeholderTextColor="#B0B0B0"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          onFocus={() => setIsPhoneNumberFocused(true)}
          onBlur={() => setIsPhoneNumberFocused(false)}
        />
      </View>

      <TouchableOpacity onPress={handleSignup} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CaretakerLogin')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
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
    marginRight: 20,
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
    paddingVertical: 3,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 10,
  },
  signUpButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#000080',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
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

export default SignUp;