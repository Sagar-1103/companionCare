import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const GetStartedScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/LogoText.png')} style={styles.logo} />

      <Text style={styles.headingText}>Let's Get Started</Text>

      <Text style={styles.subText}>Login to Track and Remind</Text>

      <TouchableOpacity
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    marginBottom: '6%',
  },
  headingText: {
    fontSize: 33,
    fontWeight: '900',
    color: '#000000',
    // marginBottom: '3%',
  },
  subText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#808080',
    marginBottom: '15%',
  },
  loginButton: {
    width: '78%',
    height: '7.5%',
    backgroundColor: '#000080', 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  signUpButton: {
    width: '78%',
    height: '7.5%',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000080', 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000080', 
  },
});

export default GetStartedScreen;