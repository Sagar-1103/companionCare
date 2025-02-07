import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('ChooseRole');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={require('../assets/LogoText.png')} style={styles.logo} />
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