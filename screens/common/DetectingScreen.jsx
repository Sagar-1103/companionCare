import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const DetectingScreen = () => {
  const [dots, setDots] = useState('.'); // Initial state: one dot
  const navigation = useNavigation();
  useEffect(() => {
    // Set up an interval to update the dots every second
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === '.') return '..';
        if (prevDots === '..') return '...';
        return '.'; // Reset to one dot after three dots
      });
    }, 1000); // Update every 1000ms (1 second)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("DiseaseDetectionScreen")
    },3000)
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TwatchAI</Text>

      <View style={styles.illustrationContainer}>
        {/* Lottie Animation */}
        <LottieView
          source={require('../../assets/skinDetectionLoader.json')} // Path to your Lottie JSON file
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.detectingText}>Detecting{dots}</Text>
        <Text style={styles.waitText}>Please Wait</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddffd',
    padding: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%', // Adjust the size as needed
    height: '100%', // Adjust the size as needed
  },
  bottomContainer: {
    marginTop: 10,
    marginBottom: 140,
    alignItems: 'center',
  },
  detectingText: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#1E2C8A',
    marginBottom: 8,
  },
  waitText: {
    fontSize: 28,
    color: '#6B7AC9',
  },
});

export default DetectingScreen;