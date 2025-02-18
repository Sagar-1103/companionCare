import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLogin } from '../../../context/LoginProvider';
import {BACKEND_URL} from "../../../constants/Ports";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Selection = () => {
  const navigation = useNavigation();
  const {user,setUser,setDiseases} = useLogin();
  const patientId = user.role==="caretaker" ? user.patientId : user.id;
  const diseases = [
    {diseaseId:1,diseaseName:"Diabetes"},
    {diseaseId:2,diseaseName:"Hypertension"},
    {diseaseId:3,diseaseName:"Asthma"},
    {diseaseId:4,diseaseName:"Arthritis"},
    {diseaseId:5,diseaseName:"Cancer"},
    {diseaseId:6,diseaseName:"Alzheimer’s"},
    {diseaseId:7,diseaseName:"Parkinson’s"},
    {diseaseId:8,diseaseName:"HIV/AIDS"},
    {diseaseId:9,diseaseName:"Tuberculosis"},
    {diseaseId:10,diseaseName:"Malaria"},
    {diseaseId:11,diseaseName:"Epilepsy"},
    {diseaseId:12,diseaseName:"Osteoporosis"},
    {diseaseId:13,diseaseName:"Chronic Kidney Disease"},
    {diseaseId:14,diseaseName:"Heart Disease"},
    {diseaseId:15,diseaseName:"Stroke"},
  ];

  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const handleDiseasePress = (disease) => {
    const isSelected = selectedDiseases.some((item) => item.diseaseId === disease.diseaseId);
    
    if (isSelected) {
      setSelectedDiseases(selectedDiseases.filter((item) => item.diseaseId !== disease.diseaseId));
    } else {
      setSelectedDiseases([...selectedDiseases, disease]);
    }
  };

  const handleContinue = async()=>{
    try {
      const url = `${BACKEND_URL}/users/set-diseases/${patientId}`;
      const response = await axios.post(url,{diseaseList:selectedDiseases},{
        headers:{
          "Content-Type":"application/json"
        }
      });
      const res = await response.data;
      if (res.success) {
        if(user.role==="patient"){
          const url = `${BACKEND_URL}/users/current-patient/${user.id}`;
          const response1 = await axios.get(url);
          const res1 = await response1.data;
          const tempUser = res1.data.patient; 
          setUser(tempUser);
          await AsyncStorage.setItem('user',JSON.stringify(tempUser));
        }
        if(user.role==="caretaker"){
          setDiseases(selectedDiseases);
          await AsyncStorage.setItem('diseases',JSON.stringify(selectedDiseases));
        }
        // return navigation.navigate("CaretakerTabNavigator");
      }
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity>
          <AntDesign name="left" size={30} color="#000000" />
        </TouchableOpacity> */}
        <Text style={styles.headerText}>Select Disease</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {diseases.map((disease, index) => (
          <TouchableOpacity
          key={disease.diseaseId}
          style={[
            styles.diseaseItem,
            selectedDiseases.some((item) => item.diseaseId === disease.diseaseId) && styles.diseaseItemPressed, 
          ]}
          onPress={() => handleDiseasePress(disease)}
        >
          <Text style={styles.diseaseText}>{disease.diseaseName}</Text>
        </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginLeft: 45,
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  diseaseItem: {
    backgroundColor: '#F8F8F8', 
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  diseaseItemPressed: {
    backgroundColor: '#D0D0D0', 
  },
  diseaseText: {
    fontSize: 18,
    color: '#000000',
  },
  continueButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#000080',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Selection;