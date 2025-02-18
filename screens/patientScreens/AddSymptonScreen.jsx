import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLogin } from '../../context/LoginProvider';
import { BACKEND_URL } from '../../constants/Ports';

const AddSymptomScreen = ({ navigation,route }) => {
  const {setLogsData} = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {user} = useLogin();

  const handleSave = async() => {
    if(!title || !description){
      Alert.alert("Missing field required");
      return;
    }
    try {
      const url = `${BACKEND_URL}/medications/set-log`;
      const response = await axios.post(url,{patientId:user.id,title,description},{
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const res = await response.data;
      if(res.success){
        navigation.goBack();
      }
      setLogsData((prev) => [...prev, { title, description }]);
    } catch (error) {
      console.log("Error : ",error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Add Symptom</Text>

        <View style={styles.inputContainer}>
          <View style={styles.titleInputWrapper}>
            <MaterialIcons name="edit" size={26} color="#999" style={styles.editIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter title here"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.descriptionInput]}
            placeholder="Enter description here"
            placeholderTextColor="#999" 
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
            color="#333"
            selectionColor="#007AFF"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Log</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '8%',
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: '10%',
    textAlign: 'left',
    marginLeft: '2%',
    color: '#333',
  },
  inputContainer: {
    marginBottom: '2.5%',
  },
  titleInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    paddingHorizontal: '5%',
    paddingVertical: '1%',
  },
  editIcon: {
    marginRight: '3%',
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#333',
  },
   descriptionInput: {
    paddingHorizontal: 10,
    paddingVertical: 10, 
    fontSize: 18,
    color: '#333', 
    height: '62%',
    textAlignVertical: 'top' 
  },
  line: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: '5%',
  },
  button: {
    backgroundColor: '#003366',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    // top:'59%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default AddSymptomScreen;