import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import Logo from "../../assets/LogoText.png";

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(224, 239, 248)',
  },
  logo: {
    width: '56%', 
    height: '56%', 
    resizeMode: 'contain',
  },
});

export default SplashScreen;