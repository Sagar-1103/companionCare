import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL } from '../../../constants/Ports';
import { useLogin } from '../../../context/LoginProvider';
import axios from 'axios';

const SetSpeedDial = ({navigation}) => {
  const [contact1, setContact1] = useState({name: '', phNo: ''});
  const [contact2, setContact2] = useState({name: '', phNo: ''});
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const {user} = useLogin();

  const handleSubmit = async() => {
    if (!contact1.name || !contact1.phNo || !contact2.name || !contact2.phNo || !image1 || !image2) {
      Alert.alert(
        "Missing fields","Please ensure all fields are filled in correctly before proceeding."
      );
      return;
    }
    try {
      const url = `${BACKEND_URL}/users/speed-dials/${user.patientId}`;
    const response = await axios.post(url,{name1:contact1.name,name2:contact2.name,phNo1:contact1.phNo,phNo2:contact2.phNo,imageBase64_1:image1.data,imageBase64_2:image2.data},{
      headers:{
        "Content-Type":"application/json"
      }
    });

    const res = await response.data;
    if(res.success){
      const url = `${BACKEND_URL}/users/current-patient/${user.patientId}`;
      const response1 = await axios.get(url);
      const res1 = await response1.data;
      const diseases = res1.data.patient?.diseases; 
      if(diseases.length){
        const hasAlzheimer = diseases.some(disease => disease.diseaseName.toLowerCase().includes("alzheimer"));
        if(hasAlzheimer){
          return navigation.navigate("SetHomeLocation");
        }
      }
      return navigation.navigate("UserCodeScreen");
      }
    } catch (error) {
      console.log("Error : ",error?.message || error);
    }
    
  };

  const handleUpload = async position => {
    try {
      const image = await ImagePicker.openCamera({
        width: 200,  
        height: 200,
        includeBase64: true,
        cropping: true,
        compressImageQuality: 0.5,
      });
      if (position === 'first') {
        setImage1(image);
      }
      if (position === 'second') {
        setImage2(image);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Set Speed Dial</Text>
        </View>

        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => handleUpload('first')}
            style={styles.circlePlusContainer}>
            {!image1 ? (
              <Icon name="add" size={50} color="#888" />
            ) : (
              <>
              <Image source={{uri: image1.path}} style={styles.uploadedImage} />
              <View style={{position:"absolute",top:0,right:0,backgroundColor:"#252525",borderRadius:25,padding:5}} >
                <Icon name="edit" size={20} color="#fff" />
              </View>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Contact 1 Name"
            value={contact1.name}
            onChangeText={text => setContact1(prev => ({...prev, name: text}))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Contact 1 Number"
            placeholderTextColor="#888"
            value={contact1.phNo}
            keyboardType="numeric"
            onChangeText={text => setContact1(prev => ({...prev, phNo: text}))}
          />
        </View>

        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => handleUpload('second')}
            style={styles.circlePlusContainer}>
            {!image2 ? (
              <Icon name="add" size={50} color="#888" />
            ) : (
              <>
              <Image source={{uri: image2.path}} style={styles.uploadedImage} />
              <View style={{position:"absolute",top:0,right:0,backgroundColor:"#252525",borderRadius:25,padding:5}} >
                <Icon name="edit" size={20} color="#fff" />
              </View>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Contact 2 Name"
            value={contact2.name}
            onChangeText={text => setContact2(prev => ({...prev, name: text}))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={32} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Contact 2 Number"
            placeholderTextColor="#888"
            value={contact2.phNo}
            keyboardType="numeric"
            onChangeText={text => setContact2(prev => ({...prev, phNo: text}))}
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
    paddingVertical: '5%',
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
    left: '4%'
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
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default SetSpeedDial;
