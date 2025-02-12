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
  const [isBeforeMeal, setIsBeforeMeal] = useState(false);
  const [isAfterMeal, setIsAfterMeal] = useState(false);
  const [time, setTime] = useState('');

  const handleMealSelection = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  const formatDate = (date) => (date ? date.toLocaleDateString() : '');

  const handleSubmit = () => {
    console.log({
      selectedMeals,
      medicineType,
      medicineName,
      dosageUnit,
      fromDate,
      toDate,
      isBeforeMeal,
      isAfterMeal,
      time,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={[styles.container, { paddingBottom: 150 }]} 
          >
            <View style={[styles.header, { backgroundColor: 'rgb(97, 142, 166)' }]}>
              <Image
                source={require('../assets/medBg.png')}
                style={styles.headerImage}
                resizeMode="contain" 
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
              <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: '2%'}]}>
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
                <View style={[styles.dropdown, { flexDirection: 'row', alignItems: 'center', paddingLeft: '3%', backgroundColor: '#e8e8e8', borderRadius: 10 }]}>
                  <FontAwesome5 name="notes-medical" size={32} color="#888" />
                  <Picker
                      selectedValue={medicineType}
                      onValueChange={(itemValue) => setMedicineType(itemValue)}
                      style={{ flex: 1, color: medicineType ? '#000' : '#888', paddingLeft:'6%' }}
                  >
                      <Picker.Item style={{ fontSize: 19 }} label="Type..." value="" enabled={true} />
                      <Picker.Item style={{ fontSize: 19 }} label="Pills" value="Pills" />
                      <Picker.Item style={{ fontSize: 19 }} label="Syrup" value="Syrup" />
                      <Picker.Item style={{ fontSize: 19 }} label="Injection" value="Injection" />
                  </Picker>
                </View>
                <View style={[styles.dropdownleft, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: '4%', paddingVertical: '-1%', backgroundColor: '#e8e8e8', borderRadius: 10 }]}>
                  <FontAwesome5 name="stethoscope" size={30} color="#888" />
                  <TextInput
                      placeholder="Dosage"
                      style={{ flex: 1, backgroundColor: '#e8e8e8', color: '#000', fontSize: 19, paddingLeft: 13 }}
                      value={dosageUnit}
                      onChangeText={setDosageUnit}
                      placeholderTextColor={'#888'}
                  />
                </View>
              </View>

              <View style={[styles.checkboxGroup, { backgroundColor: '#e8e8e8', borderRadius: 10, padding: '3%' }]}>
                <View style={styles.row}>
                  <View style={[styles.checkboxContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TouchableOpacity
                      style={[styles.checkbox, isBeforeMeal && { backgroundColor: '#003366' }]}
                      onPress={() => {
                        setIsBeforeMeal(!isBeforeMeal);
                        if (isAfterMeal) setIsAfterMeal(false);
                      }}
                    >
                      {isBeforeMeal && <Ionicons name="checkmark" size={20} color="#fff" />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>Before Meal</Text>
                  </View>
                  <View style={[styles.checkboxContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TouchableOpacity
                      style={[styles.checkbox, isAfterMeal && { backgroundColor: '#003366' }]}
                      onPress={() => {
                        setIsAfterMeal(!isAfterMeal);
                        if (isBeforeMeal) setIsBeforeMeal(false);
                      }}
                    >
                      {isAfterMeal && <Ionicons name="checkmark" size={20} color="#fff" />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>After Meal</Text>
                  </View>
                </View>
              </View>

              {(isBeforeMeal || isAfterMeal) && (
                <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: '2%' }]}>
                  <Ionicons name="time" size={30} color="#888" />
                  <TextInput
                    placeholder="Time (in minutes)"
                    style={{ flex: 1, paddingVertical: 12, paddingLeft: 11, color: '#000', fontSize: 19 }}
                    value={time}
                    onChangeText={setTime}
                    placeholderTextColor={'#888'}
                    keyboardType="numeric"
                  />
                </View>
              )}

              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => setIsFromDatePickerOpen(true)}
                  style={[styles.input, styles.dateInput, { backgroundColor: '#e8e8e8' }]}
                >
                  <Ionicons name="calendar" size={30} color="#888" paddingRight='9%'/>
                  <Text style={{ color: fromDate ? '#000' : '#888', fontSize: 19 }}>
                    {fromDate ? formatDate(fromDate) : 'From'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsToDatePickerOpen(true)}
                  style={[styles.input, styles.dateInput, { backgroundColor: '#e8e8e8' }]}
                >
                  <Ionicons name="calendar" size={30} color="#888" paddingRight='9%'/>
                  <Text style={{ color: toDate ? '#000' : '#888', fontSize: 19 }}>
                    {toDate ? formatDate(toDate) : 'To'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.floatingButtonContainer}>
            <TouchableOpacity
              style={[styles.reminderButton, { backgroundColor: '#003366' }]}
              onPress={handleSubmit}
            >
              <Text style={styles.reminderButtonText}>Set Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

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
    width: '85%',
    height: '92%',
    marginTop: '5%',
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
    fontSize: 12,
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
    marginBottom: '4%',
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
  checkboxGroup: {
    marginBottom: '4%',
    marginTop: '-3%',
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '-5%',
    marginLeft: '6%',
    marginTop: '2%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 18,
    color: '#888',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: '9%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  reminderButton: {
    width: '90%',
    paddingVertical: '4.5%',
    borderRadius: 45,
    alignSelf: 'center',
    alignItems: 'center',
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicationReminder;