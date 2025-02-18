import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLogin } from '../../context/LoginProvider';

const CodeDisplayScreen = () => {
  const navigation = useNavigation();
  const {user} = useLogin();
  const codeToShow = user.code; // Example code

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Doctor Code</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{codeToShow}</Text>
        </View>
        <Text style={styles.instructionText}>
          Use this code to connect with your Doctor
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 5,
    paddingHorizontal: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    paddingTop:48,
    left: 20,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#222',
  },
  content: {
    flex: 1,
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  codeText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#333',
  },
  instructionText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default CodeDisplayScreen;