import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const InsulinDosageScreen = () => {
  const [bodyWeight, setBodyWeight] = useState('');
  const [carbIntake, setCarbIntake] = useState('');
  const [insulinType, setInsulinType] = useState('Insulin Type');
  const [sugarLevel, setSugarLevel] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <AntDesign name="left" size={30} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Insulin Dosage</Text>
      </View>

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
            // itemStyle={{ fontSize: 55 }}
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

      <TouchableOpacity style={styles.calculateButton}>
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
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
    marginBottom: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color:'#b0b0b0'
  },
  calculateButton: {
    width: '100%',
    position: 'absolute',
    height: 60,
    backgroundColor: '#000080',
    borderRadius: 28,
    left: '12%',
    top:'90%'
  },
  calculateButtonText: {
    fontSize: 24,
    left:'34%',
    top: '20%',
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default InsulinDosageScreen;
