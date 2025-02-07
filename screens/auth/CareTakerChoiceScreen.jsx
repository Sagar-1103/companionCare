import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CareTakerChoiceScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />

      <Text style={styles.questionText}>Do you have a caretaker?</Text>

      <TouchableOpacity>
        <LinearGradient
          colors={['#32A032', '#006400']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Image source={require('../assets/check.png')} style={styles.buttonIcon} />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Yes</Text>

      <TouchableOpacity>
        <LinearGradient
          colors={['#FF4B4B', '#D32F2F']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Image source={require('../assets/cross.png')} style={styles.buttonIcon} />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.buttonText}>No</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 25, 
  },
  logo: {
    width: '28%',
    height: '28%',
    resizeMode: 'contain',
    marginBottom: -25, 
  },
  questionText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 40, 
  },
  button: {
    width: 170, 
    height: 170, 
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonIcon: {
    width: '75%', 
    height: '75%', 
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 30,
  },
});

export default CareTakerChoiceScreen;