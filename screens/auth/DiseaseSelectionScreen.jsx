import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DiseaseSelectionScreen = () => {
  const diseases = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Arthritis',
    'Cancer',
    'Alzheimer’s',
    'Parkinson’s',
    'HIV/AIDS',
    'Tuberculosis',
    'Malaria',
    'Epilepsy',
    'Osteoporosis',
    'Chronic Kidney Disease',
    'Heart Disease',
    'Stroke',
  ];

  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const handleDiseasePress = (disease) => {
    if (selectedDiseases.includes(disease)) {
      setSelectedDiseases(selectedDiseases.filter((item) => item !== disease));
    } else {
      setSelectedDiseases([...selectedDiseases, disease]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <AntDesign name="left" size={30} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Disease</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        {diseases.map((disease, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.diseaseItem,
              selectedDiseases.includes(disease) && styles.diseaseItemPressed, 
            ]}
            onPress={() => handleDiseasePress(disease)} 
          >
            <Text style={styles.diseaseText}>{disease}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.continueButton}>
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

export default DiseaseSelectionScreen;