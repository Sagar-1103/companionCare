import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

// Import the image from your assets
import InsulinImage from '../../assets/insulinBG.png'; // Adjust the path as needed

const InsulinDosageScreen = () => {
  const navigation = useNavigation();
  const [bodyWeight, setBodyWeight] = useState('');
  const [carbIntake, setCarbIntake] = useState('');
  const [insulinType, setInsulinType] = useState('Insulin Type');
  const [sugarLevel, setSugarLevel] = useState('');
  const [dosage, setDosage] = useState(null);

  // Effect to trigger navigation after dosage is calculated
  useEffect(() => {
    if (dosage !== null ) {
      navigation.navigate('InsulinDosageRecommendation', { dosage, insulinType, bodyWeight });
    }
  }, [dosage, insulinType, bodyWeight, navigation]);

  const calculateDosage = () => {
    const weight = parseFloat(bodyWeight);
    const carbs = parseFloat(carbIntake);
    const sugar = parseFloat(sugarLevel);
    const targetSugar = 120; // Target blood sugar level
    const ISF = 50; // Insulin Sensitivity Factor
    const ICR = 10; // Insulin-to-Carb Ratio

    if (insulinType === 'Basal') {
      // Basal Insulin Calculation
      const basalDose = weight * 0.2; // Starting with 0.2 units/kg
      setDosage(basalDose.toFixed(1));
    } else if (insulinType === 'Bolus') {
      // Bolus Insulin Calculation
      const carbCoverage = carbs / ICR;
      const correctionDose = (sugar - targetSugar) / ISF;
      const totalBolusDose = carbCoverage + correctionDose;
      setDosage(totalBolusDose.toFixed(1));
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Insulin Dosage</Text>
      </View>

      {/* Image */}
      <Image source={InsulinImage} style={styles.image} resizeMode="contain" />

      {/* Form Inputs */}
      <View style={styles.inputContainer}>
        <Ionicons name="man" size={28} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Body Weight"
          placeholderTextColor="#B0B0B0"
          value={bodyWeight}
          onChangeText={setBodyWeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="food-apple" size={28} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Carb Intake"
          placeholderTextColor="#B0B0B0"
          value={carbIntake}
          onChangeText={setCarbIntake}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="medical-bag" size={28} color="#B0B0B0" style={styles.icon} />
        <Picker
          selectedValue={insulinType}
          style={styles.picker}
          onValueChange={(itemValue) => {
            if (itemValue !== "Insulin Type") {
              setInsulinType(itemValue);
            }
          }}
        >
          <Picker.Item label="Insulin Type" value="Insulin Type" enabled={false} color="#B0B0B0" />
          <Picker.Item label="Basal" value="Basal" />
          <Picker.Item label="Bolus" value="Bolus" />
        </Picker>
      </View>

      {insulinType === 'Bolus' && (
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="spoon-sugar" size={32} color="#B0B0B0" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Sugar Level before meal"
            placeholderTextColor="#B0B0B0"
            value={sugarLevel}
            onChangeText={setSugarLevel}
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Calculate Button */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateDosage}>
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(64, 124, 226, 0.3)'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    // marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '30%', // Adjust the height as needed
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    color:'#000'
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#B0B0B0',
  },
  calculateButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#000080',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculateButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default InsulinDosageScreen;