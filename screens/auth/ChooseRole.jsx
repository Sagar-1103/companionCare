import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ChooseRole = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />

      <Text style={styles.chooseRoleText}>Choose role</Text>

      <TouchableOpacity>
        <LinearGradient
          colors={['#0047AB', '#1E9DFF']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Image source={require('../../assets/PatientProfile.png')} style={styles.buttonIcon} />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Patient</Text>

      <TouchableOpacity>
        <LinearGradient
          colors={['#32A032', '#006400']}
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Image source={require('../../assets/CaretakerProfile.png')} style={styles.buttonIcon} />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Caretaker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: '28%',
    height: '28%',
    resizeMode: 'contain',
    marginBottom: '3%',
  },
  chooseRoleText: {
    fontSize: 29,
    fontWeight: '900',
    color: '#000000',
    marginTop: '-14%',
    marginBottom: '12%',
  },
  button: {
    width: 178,
    height: 168,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1%',
  },
  buttonIcon: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
    borderRadius: 25,
    top: '5.2%',
    // left: '2%'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: '9.5%',
  },
});

export default ChooseRole;