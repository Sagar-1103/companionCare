import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Platform 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 

const PatientDetails = () => {
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const genderData = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <AntDesign name="left" size={30} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Patient Details</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Name"
          placeholderTextColor="#B0B0B0"
          value={patientName}
          onChangeText={setPatientName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Email"
          placeholderTextColor="#B0B0B0"
          value={patientEmail}
          onChangeText={setPatientEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.GenderInputContainer}>
        <FontAwesome name="transgender" size={24} color="#B0B0B0" style={styles.icon} />
        <Dropdown
          style={styles.dropdown}
          placeholder="Select Gender"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={genderData}
          labelField="label"
          valueField="value"
          value={gender}
          onChange={item => setGender(item.value)}
          renderLeftIcon={() => null}
          dropdownStyle={styles.dropdownStyle} 
        />
      </View>

      <View style={styles.CalendarInputContainer}>
        <Ionicons name="calendar-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={[styles.input, { color: dateOfBirth ? '#808080' : '#B0B0B0' }]}>
            {dateOfBirth ? dateOfBirth.toLocaleDateString() : "Patient's Date of Birth"} {/* Show placeholder or date */}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfBirth}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="#B0B0B0" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Phone Number"
          placeholderTextColor="#B0B0B0"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
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
    marginRight: 20,
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
    paddingVertical: 4, // Increased height
    marginBottom: 25,
  },
  GenderInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 8, // Increased height
    marginBottom: 25,
  },
  CalendarInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 15, // Increased height
    marginBottom: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    color: '#808080',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent', // Lightest shade of grey
    color: '#000000',
    borderRadius: 8,
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#B0B0B0',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#B0B0B0',
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
   dropdown: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0', // Light gray background for dropdown input
    borderRadius: 8,
    paddingHorizontal: 10,  // Add some horizontal padding
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  dropdownStyle: {
    backgroundColor: '#F0F0F0', // Light gray background for dropdown list
    borderRadius: 8,
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#B0B0B0', // Placeholder color
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#808080', // Darker gray for selected text
  },
  CalendarInputContainer: {  // Keep this style
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 15, // Increased height
    marginBottom: 25,
 },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: 'transparent',
 },
});

export default PatientDetails;