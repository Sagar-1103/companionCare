import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../../../assets/Logo.png";
import Check from "../../../assets/check.png";
import Cross from "../../../assets/cross.png";

const CareTakerChoiceScreen = ({navigation}) => {

  const handleNavigate = async(route)=>{
    navigation.navigate(route);
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />

      <Text style={styles.questionText}>Do you have a caretaker?</Text>
      <TouchableOpacity onPress={()=>handleNavigate("SignInCode")} >
        <LinearGradient
          colors={['#32A032', '#006400']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Image source={Check} style={styles.buttonIcon} />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Yes</Text>

      <TouchableOpacity onPress={()=>handleNavigate("PatientSignUp")}>
        <LinearGradient
          colors={['#FF4B4B', '#D32F2F']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Image source={Cross} style={styles.buttonIcon} />
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