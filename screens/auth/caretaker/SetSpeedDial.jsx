import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const SetSpeedDial = ({ navigation }) => {
  const [contact1, setContact1] = useState({ name: '', phNo: '' });
  const [contact2, setContact2] = useState({ name: '', phNo: '' });

  const handleSubmit = () => {
    if (!contact1.name || !contact1.phNo || !contact2.name || !contact2.phNo) {
      alert('Please ensure all fields are filled in correctly before proceeding.');
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Set Speed Dial</Text>
        </View>

        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.circlePlusContainer}>
            <Icon name="add" size={50} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Contact 1 Name"
            value={contact1.name}
            onChangeText={(text) =>
              setContact1((prev) => ({ ...prev, name: text }))
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Contact 1 Number"
            placeholderTextColor="#888"
            value={contact1.phNo}
            keyboardType='numeric'
            onChangeText={(text) =>
              setContact1((prev) => ({ ...prev, phNo: text }))
            }
          />
        </View>

        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.circlePlusContainer}>
            <Icon name="add" size={50} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Contact 2 Name"
            value={contact2.name}
            onChangeText={(text) =>
              setContact2((prev) => ({ ...prev, name: text }))
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Contact 2 Number"
            placeholderTextColor="#888"
            value={contact2.phNo}
            keyboardType='numeric'
            onChangeText={(text) =>
              setContact2((prev) => ({ ...prev, phNo: text }))
            }
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', 
    paddingHorizontal: '10%',
    paddingVertical: '5%'
  },
  title: {
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backContainer: {
    marginBottom: '0%',
    top: '4.6%',
  },
  headerContainer: {
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  circlePlusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#888',
    fontSize: 17,
  },
  signInButton: {
    backgroundColor: '#001f3f',
    padding: 15,
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
});

export default SetSpeedDial;