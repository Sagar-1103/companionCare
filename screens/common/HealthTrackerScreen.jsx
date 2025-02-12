import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Walk from '../../components/healthTrack/Walk';
import Sleep from '../../components/healthTrack/Sleep';
import Heart from '../../components/healthTrack/Heart';
import SpO2 from '../../components/healthTrack/SpO2';

const mockData = {
  '2025-02-12': { walk: { value: '8104', unit: 'Steps' }, sleep: { value: '6', unit: 'Hrs' }, heart: { value: '95', unit: 'bpm' }, spo2: { value: '98', unit: '%' } },
  '2025-02-11': { walk: { value: '7500', unit: 'Steps' }, sleep: { value: '7', unit: 'Hrs' }, heart: { value: '90', unit: 'bpm' }, spo2: { value: '97', unit: '%' } },
  '2025-02-10': { walk: { value: '6543', unit: 'Steps' }, sleep: { value: '6', unit: 'Hrs' }, heart: { value: '92', unit: 'bpm' }, spo2: { value: '98', unit: '%' } },
  '2025-02-09': { walk: { value: '2222', unit: 'Steps' }, sleep: { value: '8', unit: 'Hrs' }, heart: { value: '94', unit: 'bpm' }, spo2: { value: '98', unit: '%' } },
  '2025-02-08': { walk: { value: '7865', unit: 'Steps' }, sleep: { value: '7', unit: 'Hrs' }, heart: { value: '95', unit: 'bpm' }, spo2: { value: '97', unit: '%' } },
  '2025-02-07': { walk: { value: '8886', unit: 'Steps' }, sleep: { value: '7', unit: 'Hrs' }, heart: { value: '96', unit: 'bpm' }, spo2: { value: '96', unit: '%' } },
  '2025-02-06': { walk: { value: '7522', unit: 'Steps' }, sleep: { value: '8', unit: 'Hrs' }, heart: { value: '96', unit: 'bpm' }, spo2: { value: '96', unit: '%' } },
  '2025-02-05': { walk: { value: '7321', unit: 'Steps' }, sleep: { value: '8', unit: 'Hrs' }, heart: { value: '98', unit: 'bpm' }, spo2: { value: '97', unit: '%' } },
  '2025-02-04': { walk: { value: '6543', unit: 'Steps' }, sleep: { value: '6', unit: 'Hrs' }, heart: { value: '94', unit: 'bpm' }, spo2: { value: '98', unit: '%' } },
  '2025-02-03': { walk: { value: '7111', unit: 'Steps' }, sleep: { value: '6', unit: 'Hrs' }, heart: { value: '91', unit: 'bpm' }, spo2: { value: '95', unit: '%' } },
};

const HealthTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); 
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateData = mockData[formatDate(selectedDate)] || {
    walk: { value: '0', unit: 'Steps' },
    sleep: { value: '0', unit: 'Hrs' },
    heart: { value: '0', unit: 'bpm' },
    spo2: { value: '0', unit: '%' },
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ marginLeft: '5%' }}>
          <MaterialIcons name="calendar-month" size={36} color="#000" />
        </TouchableOpacity>
        <View style={styles.todayContainer}>
          <Text style={styles.todayDay}>{today.toLocaleString('default', { weekday: 'long' })}</Text>
          <Text style={styles.todayDate}>{today.toLocaleString('default', { day: 'numeric', month: 'long' })}</Text>
        </View>
      </View>

      <Modal visible={showDatePicker} transparent={true} animationType="slide">
          <View style={styles.modalContent}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                if (date) {
                  handleDateSelect(date);
                }
              }}
            />
          </View>
      </Modal>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datePickerContainer}
      >
        {dates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity key={index} onPress={() => handleDateSelect(date)}>
              <View style={[styles.dateBox, isSelected && styles.selectedDateBox]}>
                <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{date.getDate()}</Text>
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                  {date.toLocaleString('default', { weekday: 'short' })}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.activityHeading}>Your Activity</Text>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <Walk value={selectedDateData.walk.value} unit={selectedDateData.walk.unit} />
          <Sleep value={selectedDateData.sleep.value} unit={selectedDateData.sleep.unit} />
        </View>
        <View style={styles.row}>
          <Heart value={selectedDateData.heart.value} unit={selectedDateData.heart.unit} />
          <SpO2 value={selectedDateData.spo2.value} unit={selectedDateData.spo2.unit} />
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  todayContainer: {
    alignItems: 'flex-start',
  },
  todayDate: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
  },
  todayDay: {
    fontSize: 20,
    color: '#555',
    marginBottom: -5,
    marginLeft: '3%',
    fontWeight: '300',
  },
  datePickerContainer: {
    paddingBottom: 16,
  },
  dateBox: {
    width: 72,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedDateBox: {
    backgroundColor: 'rgb(14, 14, 125)',
  },
  dateText: {
    fontSize: 36,
    fontWeight: '400',
    color: '#000',
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: '500',
  },
  dayText: {
    fontSize: 24,
    color: '#555',
    fontWeight: '400',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '500',
  },
  activityHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: '4%',
    marginLeft: '5%',
  },
  gridContainer: {
    // marginBottom: '-24%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});

export default HealthTrackerScreen;