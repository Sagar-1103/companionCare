import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Walk from '../../components/healthTrack/Walk';
import Sleep from '../../components/healthTrack/Sleep';
import Heart from '../../components/healthTrack/Heart';
import SpO2 from '../../components/healthTrack/SpO2';
import {
  initialize,
  readRecords,
} from 'react-native-health-connect';

const HealthTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [stepsData, setStepsData] = useState(0);
  const [heartData, setHeartData] = useState(0);
  const [spo2Data, setSpO2Data] = useState(0);
  const [sleepData, setSleepData] = useState(0);
  
  const today = new Date();
  const dates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    fetchHealthData(date);
    setShowDatePicker(false); 
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const initializeHealthConnect = async () => {
      try {
        const isInitialized = await initialize();
        console.log('Health Connect initialized:', isInitialized);
      } catch (error) {
        console.error('Health Connect initialization error:', error);
      }
    };
    initializeHealthConnect();
    fetchHealthData(selectedDate);
  }, []);

  const fetchHealthData = async (date) => {
    try {
      const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
      const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString();
      
      const { records: stepRecords } = await readRecords('Steps', {
        timeRangeFilter: { operator: 'between', startTime, endTime },
      });
      const totalSteps = stepRecords.reduce((total, record) => total + record.count, 0);
      setStepsData(totalSteps);
      
      const { records: heartRecords } = await readRecords('HeartRate', {
        timeRangeFilter: { operator: 'between', startTime, endTime },
      });
      const avgHeartRate = heartRecords.length > 0 ? (heartRecords.reduce((total, record) => total + record.samples[0].beatsPerMinute, 0) / heartRecords.length).toFixed(0) : 0;
      setHeartData(avgHeartRate);
      
      const { records: spo2Records } = await readRecords('OxygenSaturation', {
        timeRangeFilter: { operator: 'between', startTime, endTime },
      });
      const avgSpO2 = spo2Records.length > 0 ? (spo2Records.reduce((total, record) => total + record.percentage, 0) / spo2Records.length).toFixed(0) : 0;
      setSpO2Data(avgSpO2);

      const { records:sleepRecords } = await readRecords('SleepSession', {
        timeRangeFilter: { operator: 'between', startTime, endTime },
      });
      const totalSleepMs = sleepRecords.reduce((total, record) => {
        const durationMs = new Date(record.endTime).getTime() - new Date(record.startTime).getTime();
        return total + durationMs;
      }, 0);
      const totalSleepHours = Math.floor(totalSleepMs / (1000 * 60 * 60));
      setSleepData(totalSleepHours);
      console.log(`Health data for ${date.toDateString()}:`, { totalSteps, avgHeartRate, avgSpO2 });
    } catch (error) {
      console.error('Error reading health data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ marginLeft: '5%' }}>
          <MaterialIcons name="calendar-month" size={36} color="#000" />
        </TouchableOpacity>
        <View style={styles.todayContainer}>
          <Text style={styles.todayDay}>{selectedDate.toLocaleString('default', { weekday: 'long' })}</Text>
          <Text style={styles.todayDate}>{selectedDate.toLocaleString('default', { day: 'numeric', month: 'long' })}</Text>
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
          <Walk value={stepsData} unit={`Steps`} />
          <Sleep value={sleepData} unit={`Hrs`} />
        </View>
        <View style={styles.row}>
          <Heart value={heartData} unit={`bpm`} />
          <SpO2 value={spo2Data} unit={`%`} />
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