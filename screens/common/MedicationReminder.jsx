import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MedicationReminder = () => {
  const meals = [
    { name: 'Breakfast', icon: 'free-breakfast', type: MaterialIcons },
    { name: 'Lunch', icon: 'dinner-dining', type: MaterialIcons },
    { name: 'Snacks', icon: 'fast-food', type: Ionicons },
    { name: 'Dinner', icon: 'food-turkey', type: MaterialCommunityIcons },
  ];

  const [selectedMeals, setSelectedMeals] = useState([]);
  const [medicineType, setMedicineType] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [dosageUnit, setDosageUnit] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);

  const handleMealSelection = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  const formatDate = (date) => (date ? date.toLocaleDateString() : '');

  const handleSubmit = () => {
    console.log({ selectedMeals, medicineType, medicineName, dosageUnit, fromDate, toDate });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: '#fff' }]}>
          <View style={[styles.header, { backgroundColor: 'rgb(111, 162, 189)' }]}>
            <Image
              source={require('../assets/medBg.png')}
              style={styles.headerImage}
            />
          </View>

          <View style={styles.mealSelection}>
            {meals.map((meal, index) => {
              const isSelected = selectedMeals.includes(meal.name);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.mealButton}
                  onPress={() => handleMealSelection(meal.name)}
                >
                  <meal.type
                    name={meal.icon}
                    size={38}
                    color={isSelected ? '#003366' : '#AAA'}
                  />
                  <Text
                    style={[styles.mealText, isSelected && { color: '#003366' }]}
                  >
                    {meal.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.form}>
            <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 10, paddingHorizontal: '2%'}]}>
                <MaterialCommunityIcons name="medical-bag" size={35} color="#888" />
                <TextInput
                    placeholder="Medicine Name"
                    style={{ flex: 1, paddingVertical: 12, paddingLeft: 11, color: '#000' , fontSize: 19}}
                    value={medicineName}
                    onChangeText={setMedicineName}
                    placeholderTextColor={'#888'}
                />
            </View>

            <View style={styles.row}>
              <View style={[styles.dropdown, { flexDirection: 'row', alignItems: 'center', paddingLeft: '3%', backgroundColor: '#F5F5F5', borderRadius: 10 }]}>
                <FontAwesome5 name="notes-medical" size={32} color="#888" />
                <Picker
                    selectedValue={medicineType}
                    onValueChange={(itemValue) => setMedicineType(itemValue)}
                    style={{ flex: 1, color: medicineType ? '#000' : '#888', paddingLeft:'6%' }}
                >
                    <Picker.Item style={{ fontSize: 19 }} label="Type..." value="" enabled={false} />
                    <Picker.Item style={{ fontSize: 19 }} label="Pills" value="Pills" />
                    <Picker.Item style={{ fontSize: 19 }} label="Syrup" value="Syrup" />
                    <Picker.Item style={{ fontSize: 19 }} label="Injection" value="Injection" />
                </Picker>
              </View>
              <View style={[styles.dropdownleft, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: '4%', paddingVertical: '-1%', backgroundColor: '#F5F5F5', borderRadius: 10 }]}>
                <FontAwesome5 name="stethoscope" size={30} color="#888" />
                <TextInput
                    placeholder="Dosage"
                    style={{ flex: 1, backgroundColor: '#F5F5F5', color: '#000', fontSize: 19, paddingLeft: 13 }}
                    value={dosageUnit}
                    onChangeText={setDosageUnit}
                    placeholderTextColor={'#888'}
                />
              </View>
            </View>
            <View style={styles.row}>
              {/* From Date */}
              <TouchableOpacity
                onPress={() => setIsFromDatePickerOpen(true)}
                style={[styles.input, styles.dateInput, { backgroundColor: '#F5F5F5' }]}
              >
                <Ionicons name="calendar" size={30} color="#888" paddingRight='9%'/>
                <Text style={{ color: fromDate ? '#000' : '#888', fontSize: 19 }}>
                  {fromDate ? formatDate(fromDate) : 'From'}
                </Text>
              </TouchableOpacity>
              {/* To Date */}
              <TouchableOpacity
                onPress={() => setIsToDatePickerOpen(true)}
                style={[styles.input, styles.dateInput, { backgroundColor: '#F5F5F5' }]}
              >
                <Ionicons name="calendar" size={30} color="#888" paddingRight='9%'/>
                <Text style={{ color: toDate ? '#000' : '#888', fontSize: 19 }}>
                  {fromDate ? formatDate(toDate) : 'To'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.reminderButton, { backgroundColor: '#003366' }]}
            onPress={handleSubmit}
          >
            <Text style={styles.reminderButtonText}>Set Reminder</Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={isFromDatePickerOpen}
            date={fromDate || new Date()}
            mode="date"
            onConfirm={(date) => {
              setIsFromDatePickerOpen(false);
              setFromDate(date);
            }}
            onCancel={() => setIsFromDatePickerOpen(false)}
          />
          <DatePicker
            modal
            open={isToDatePickerOpen}
            date={toDate || new Date()}
            mode="date"
            onConfirm={(date) => {
              setIsToDatePickerOpen(false);
              setToDate(date);
            }}
            onCancel={() => setIsToDatePickerOpen(false)}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
  },
  header: {
    height: '35%',
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '92%',
    height: '92%',
    marginTop: '5%'
  },
  mealSelection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '6%',
    marginBottom: '-6%',
  },
  mealButton: {
    alignItems: 'center',
    width: '15%',
  },
  mealText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#AAA',
  },
  form: {
    marginTop: '12%',
    width: '100%',
    paddingHorizontal: '7%',
  },
  inputGroup: {
    marginBottom: '8%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '7%',
  },
  input: {
    flex: 1,
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    fontSize: 14,
  },
  dropdown: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  dropdownleft: {
    flex: 1,
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    fontSize: 14,
    marginLeft: '3%',
  },
  dateInput: {
  flex: 0.48,
  flexDirection: 'row', 
  alignItems: 'center',   
  paddingVertical: '4%',
  paddingHorizontal: '4%',
  borderRadius: 10,
  fontSize: 14,
},
  reminderButton: {
    width: '90%',
    paddingVertical: '4.5%',
    borderRadius: 45,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '1%',
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicationReminder;