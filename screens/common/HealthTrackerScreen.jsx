import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Walk from '../../components/healthTrack/Walk';
import Sleep from '../../components/healthTrack/Sleep';
import Heart from '../../components/healthTrack/Heart';
import SpO2 from '../../components/healthTrack/SpO2';
import {initialize, readRecords} from 'react-native-health-connect';
import {BACKEND_URL} from "../../constants/Ports";
import {useLogin} from "../../context/LoginProvider";
import axios from 'axios';

const HealthTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [healthDataHistory, setHealthDataHistory] = useState([]);
  const {user} = useLogin();

  const today = new Date();
  const dates = Array.from({length: 5}, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  });

  const handleDateSelect = date => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  useEffect(() => {
    const initializeHealthConnect = async () => {
      try {
        await initialize();
        console.log('Health Connect initialized');
      } catch (error) {
        console.error('Health Connect initialization error:', error);
      }
    };

    initializeHealthConnect();
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      let healthHistory = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        ).toISOString();
        const endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1,
        ).toISOString();

        const {records: stepRecords} = await readRecords('Steps', {
          timeRangeFilter: {operator: 'between', startTime, endTime},
        });
        const totalSteps = stepRecords.reduce(
          (total, record) => total + record.count,
          0,
        );

        const {records: heartRecords} = await readRecords('HeartRate', {
          timeRangeFilter: {operator: 'between', startTime, endTime},
        });
        const avgHeartRate =
          heartRecords.length > 0
            ? (
                heartRecords.reduce(
                  (total, record) => total + record.samples[0].beatsPerMinute,
                  0,
                ) / heartRecords.length
              ).toFixed(0)
            : 0;

        const {records: spo2Records} = await readRecords('OxygenSaturation', {
          timeRangeFilter: {operator: 'between', startTime, endTime},
        });
        const avgSpO2 =
          spo2Records.length > 0
            ? (
                spo2Records.reduce(
                  (total, record) => total + record.percentage,
                  0,
                ) / spo2Records.length
              ).toFixed(0)
            : 0;

        const {records: sleepRecords} = await readRecords('SleepSession', {
          timeRangeFilter: {operator: 'between', startTime, endTime},
        });
        const totalSleepMs = sleepRecords.reduce(
          (total, record) =>
            total + (new Date(record.endTime) - new Date(record.startTime)),
          0,
        );
        const totalSleepHours = Math.floor(totalSleepMs / (1000 * 60 * 60));

        healthHistory.push({
          date: date.toISOString().split('T')[0],
          totalSteps,
          avgHeartRate,
          avgSpO2,
          totalSleepHours,
        });
      }
      setHealthDataHistory(healthHistory);
      const url = `${BACKEND_URL}/health/${user?.id}`
      for (const health of healthHistory) {
        try {
          const healthData = {
            date: health.date,
            heartRate: parseInt(health.avgHeartRate, 10),
            bloodPressure: { systolic: 120, diastolic: 80 },
            bodyTemperature: 36.5,
            bloodSugar: 95.4,
            spo2: parseInt(health.avgSpO2, 10),
            sleep: parseFloat(health.totalSleepHours),
            steps: health.totalSteps,
          };
          console.log(healthData.date,parseInt(health.avgHeartRate, 10),parseInt(health.avgSpO2, 10),parseFloat(health.totalSleepHours),health.totalSteps);
          
          const response = await axios.post(url, {
            "date": health.date,
            "heartRate": parseInt(health.avgHeartRate, 10) || 70,
            "bloodPressure": {
              "systolic": 124,
              "diastolic": 80
            },
            "bodyTemperature": 36.5,
            "bloodSugar": 95.4,
            "spo2": parseInt(health.avgSpO2, 10) || 98,
            "sleep": parseFloat(health.totalSleepHours) || 7.5,
            "steps": health.totalSteps || 8500
        }, {
            headers: { 'Content-Type': 'application/json' },
          });
      
          console.log(response.data);
        } catch (error) {
          console.error('Error sending health data:', error?.message || error);
        }
      }
    } catch (error) {
      console.error('Error reading health data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{marginLeft: '5%'}}>
            <MaterialIcons name="calendar-month" size={36} color="#000" />
          </TouchableOpacity>
          <View style={styles.todayContainer}>
            <Text style={styles.todayDay}>
              {today.toLocaleString('default', {weekday: 'long'})}
            </Text>
            <Text style={styles.todayDate}>
              {today.toLocaleString('default', {day: 'numeric', month: 'long'})}
            </Text>
          </View>
        </View>

        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide">
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
          contentContainerStyle={styles.datePickerContainer}>
          {dates.map((date, index) => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleDateSelect(date)}>
                <View
                  style={[
                    styles.dateBox,
                    isSelected && styles.selectedDateBox,
                  ]}>
                  <Text
                    style={[
                      styles.dateText,
                      isSelected && styles.selectedDateText,
                    ]}>
                    {date.getDate()}
                  </Text>
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                    ]}>
                    {date.toLocaleString('default', {weekday: 'short'})}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.activityHeading}>Your Activity</Text>

        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <Walk
              value={
                healthDataHistory.find(
                  d => d.date === selectedDate.toISOString().split('T')[0],
                )?.totalSteps || 0
              }
              unit="Steps"
            />
            <Sleep
              value={
                healthDataHistory.find(
                  d => d.date === selectedDate.toISOString().split('T')[0],
                )?.totalSleepHours || 0
              }
              unit="Hrs"
            />
          </View>
          <View style={styles.row}>
            <Heart
              value={
                healthDataHistory.find(
                  d => d.date === selectedDate.toISOString().split('T')[0],
                )?.avgHeartRate || 0
              }
              unit="bpm"
            />
            <SpO2
              value={
                healthDataHistory.find(
                  d => d.date === selectedDate.toISOString().split('T')[0],
                )?.avgSpO2 || 0
              }
              unit="%"
            />
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
