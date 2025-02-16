import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TwatchAIScreen = () => {
  const handleOpenCamera = () => {
    console.log('Opening camera...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.title}>TwatchAI</Text>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.heading}>
            AI Powered Skin{'\n'}Disease Detection
          </Text>

          {/* Illustration */}
          <View style={styles.illustration}>
            <Image
              source={require('../../assets/Illustration_2.png')} 
              style={{height:'95%', width:'90%', resizeMode:'contain', left:'7%' }}       
            />
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Icon name='information-circle-sharp' size={22} color="#555" style={{left:'99%', top:'-3%'}}/>
            <Text style={styles.infoText}>
              TwatchAI is an advanced AI based skin disease detection tools with 25+ diseases and capability to detect cancerous diseases
            </Text>
            <Text style={styles.disclaimer}>
              "Uploaded images are encrypted and not stored on our servers. No attempts will be made to associate images with users."
            </Text>
          </View>
        </View>

        {/* Camera Button */}
        <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddeffa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom:'21%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginLeft:'2%'
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 40,
  },
  illustration: {
    width: '100%',
    height: 200,
    position: 'relative',
    marginBottom: 40,
  },
  clipboard: {
    position: 'absolute',
    left: '20%',
    top: '30%',
  },
  magnifier: {
    position: 'absolute',
    right: '30%',
    top: '40%',
  },
  virusContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  virusSmall: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  testTubes: {
    position: 'absolute',
    left: '25%',
    bottom: '20%',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 25,
    paddingTop:8,
    width: '84%',
    marginHorizontal:'5%'
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#1a237e',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TwatchAIScreen;