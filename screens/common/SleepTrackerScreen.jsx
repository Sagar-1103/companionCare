import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width } = Dimensions.get('window');

const mockData = {
  '2025-02-19': { sleep: 9.5 },
  '2025-02-18': { sleep: 4.5 },
  '2025-02-17': { sleep: 7.8 },
  '2025-02-16': { sleep: 7.5 },
  '2025-02-15': { sleep: 6.8 },
  '2025-02-14': { sleep: 8.2 },
  '2025-02-13': { sleep: 8.5 },
  '2025-02-12': { sleep: 8.0 },
  '2025-02-11': { sleep: 2.0 },
  '2025-02-10': { sleep: 2.5 },
  '2025-02-09': { sleep: 2.8 },
  '2025-02-08': { sleep: 2.0 },
  '2025-02-07': { sleep: 7.3 },
};

const sleepFacts = [
  "Adults need 7-9 hours of sleep per night for optimal health.",
  "Sleep deprivation can lead to weight gain and increased appetite.",
  "Dreaming occurs during the REM (Rapid Eye Movement) stage of sleep.",
  "Lack of sleep can impair your memory and cognitive function.",
  "Snoring can be a sign of sleep apnea, a serious sleep disorder.",
  "Humans spend about 1/3 of their lives sleeping.",
  "The record for the longest period without sleep is 11 days!",
  "Sleeping on your side can help reduce snoring and improve digestion.",
  "Blue light from screens can disrupt your sleep cycle.",
  "Napping for 20-30 minutes can boost alertness and performance.",
];


  const SleepTrackerScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    const today = new Date();
    const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date;
    });

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const selectedDateData = mockData[formatDate(selectedDate)] || { sleep: 0 };
    const { sleep } = selectedDateData;

    const getAverageSleepForWeek = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday
        const endOfWeek = new Date(date);
        endOfWeek.setDate(date.getDate() + (6 - date.getDay())); // Saturday

        let totalSleep = 0;
        let daysInWeek = 0;

        for (let i = 0; i <= 6; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            const dateKey = formatDate(currentDate);
            if (mockData[dateKey]) {
                totalSleep += mockData[dateKey].sleep;
                daysInWeek++;
            }
        }

        return daysInWeek > 0 ? (totalSleep / daysInWeek).toFixed(1) : 0;
    };


    const averageSleep = getAverageSleepForWeek(selectedDate);


    const handleNextFact = () => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % sleepFacts.length);
    };


  const renderSleepPillars = () => {
    return dates.map((date, index) => {
      const dateKey = formatDate(date);
      const sleepData = mockData[dateKey] ? mockData[dateKey].sleep : 0;
      const isSelected = date.toDateString() === selectedDate.toDateString();

      return (
        <View key={index} style={styles.pillarContainer}>
          <View
            style={[
              styles.pillar,
              { height: sleepData * 18 }, // Adjust the multiplier to fit your UI
              isSelected && styles.selectedPillar,
            ]}
          />
          <Text style={styles.pillarDateText}>{date.getDate()}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topBar}>
        <TouchableOpacity style={{ marginLeft: '5%' }}>
          <MaterialIcons name="calendar-month" size={36} color="#000" />
        </TouchableOpacity>
        <View style={styles.todayContainer}>
          <Text style={styles.todayDay}>{today.toLocaleString('default', { weekday: 'long' })}</Text>
          <Text style={styles.todayDate}>{today.toLocaleString('default', { day: 'numeric', month: 'long' })}</Text>
        </View>
      </View>

      {/* Scrollable Dates */}
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

      {/* Pillar Graphs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sleepPillarsContainer}
      >
        {renderSleepPillars()}
      </ScrollView>

      {/* Circular Progress Elements */}
      <View style={styles.circularProgressContainer}>
        <View style={styles.circularProgressItem}>
          <AnimatedCircularProgress
            size={120}
            width={10}
            fill={(sleep / 11) * 100} // Assuming 10 hours is the max
            tintColor="#142D74"
            backgroundColor="#ddd"
            rotation={360}
            lineCap="round"
          >
            {() => (
              <View style={styles.innerContent}>
                <Text style={styles.circularProgressText}>{sleep} hrs</Text>
                <Text style={styles.circularProgressLabel}>Today</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.circularProgressItem}>
          <AnimatedCircularProgress
            size={120}
            width={10}
            fill={(averageSleep / 10) * 100} // Assuming 10 hours is the max
            tintColor="#142D74"
            backgroundColor="#ddd"
            rotation={360}
            lineCap="round"
          >
            {() => (
              <View style={styles.innerContent}>
                <Text style={styles.circularProgressText}>{averageSleep} hrs</Text>
                <Text style={styles.circularProgressLabel}>Avg/Week</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

        {/* Add Image here */}
      </View>

      {/* Sleep Facts Box */}
      <TouchableOpacity style={styles.factBox} onPress={handleNextFact}>
        <Text style={styles.factText}>{sleepFacts[currentFactIndex]}</Text>
      </TouchableOpacity>
      <Image
            source={require('../../assets/sleepImg.png')} // Update the path to your image
            style={styles.image}
        />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    fontSize: 40,
    fontWeight: '900',
    color: '#000',
  },
  todayDay: {
    fontSize: 24,
    color: '#555',
    marginBottom: -5,
    marginLeft: '3%',
    fontWeight: '300',
  },
  datePickerContainer: {
    paddingBottom: 0,
    marginBottom: '-2%',
  },
  dateBox: {
    width: 74,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cecece',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedDateBox: {
    backgroundColor: '#141B54',
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
  sleepPillarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    top: '3%',
    marginBottom:'5%'
  },
  pillarContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  pillar: {
    width: 58,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  selectedPillar: {
    backgroundColor: '#141B73',
    width: 80,
  },
  pillarDateText: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  circularProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    top:'3%' 
  },
  circularProgressItem: {
    alignItems: 'center',
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#141B54',
  },
  circularProgressLabel: {
    fontSize: 16,
    color: '#555',
  },
  factBox: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    paddingLeft: 50,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
    top:'-13.1%',
    left:'-5%'
  },
});

export default SleepTrackerScreen;