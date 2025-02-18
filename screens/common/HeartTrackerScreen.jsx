import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const mockData = {
  '2025-02-19': { bpm: 72, restingBpm: 60, maxBpm: 180 },
  '2025-02-18': { bpm: 66, restingBpm: 60, maxBpm: 180 },
  '2025-02-17': { bpm: 68, restingBpm: 60, maxBpm: 180 },
  '2025-02-16': { bpm: 74, restingBpm: 60, maxBpm: 180 },
  '2025-02-15': { bpm: 75, restingBpm: 62, maxBpm: 182 },
  '2025-02-14': { bpm: 70, restingBpm: 58, maxBpm: 178 },
  '2025-02-13': { bpm: 68, restingBpm: 59, maxBpm: 175 },
  '2025-02-12': { bpm: 74, restingBpm: 61, maxBpm: 180 },
  '2025-02-11': { bpm: 76, restingBpm: 63, maxBpm: 183 },
  '2025-02-10': { bpm: 71, restingBpm: 60, maxBpm: 179 },
  '2025-02-09': { bpm: 69, restingBpm: 59, maxBpm: 177 },
  '2025-02-08': { bpm: 73, restingBpm: 61, maxBpm: 181 },
  '2025-02-07': { bpm: 70, restingBpm: 60, maxBpm: 178 },
};

const heartFacts = [
    "Regular exercise strengthens your heart and improves circulation.",
    "A healthy diet low in saturated fat and cholesterol supports heart health.",
    "Smoking is a major risk factor for heart disease.",
    "Maintaining a healthy weight reduces the strain on your heart.",
    "Stress can negatively impact your cardiovascular system.",
    "High blood pressure often has no symptoms but increases heart disease risk.",
    "Knowing your family history of heart disease is important for prevention.",
    "Omega-3 fatty acids, found in fish, can benefit heart health.",
    "Managing diabetes is crucial for preventing heart complications.",
    "Adequate sleep is essential for heart health and overall well-being.",  // Added sleep-related fact
];

const HeartTrackerScreen = () => {
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

  const handleNextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % heartFacts.length);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateData = mockData[formatDate(selectedDate)] || {
    bpm: 0,
    restingBpm: 0,
    maxBpm: 0,
  };

  const { bpm } = selectedDateData;
  const goal = 100;
  const progress = (bpm / goal) * 100;

  const renderHeartPillars = () => {
    return dates.map((date, index) => {
      const dateKey = formatDate(date);
      const heartData = mockData[dateKey] ? mockData[dateKey].bpm : 0;
      const isSelected = date.toDateString() === selectedDate.toDateString();

      return (
        <View key={index} style={styles.pillarContainer}>
          <View
            style={[
              styles.pillar,
              { height: heartData * 1.6 }, // Adjust the multiplier to fit your UI
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.calendarButton}>
          <MaterialIcons name="calendar-month" size={36} color="#000" />
        </TouchableOpacity>
        <View style={styles.todayInfo}>
          <Text style={styles.todayDay}>{today.toLocaleString('default', { weekday: 'long' })}</Text>
          <Text style={styles.todayDate}>{today.toLocaleString('default', { day: 'numeric', month: 'long' })}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datePicker}
      >
        {dates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity key={index} onPress={() => handleDateSelect(date)}>
              <View style={[styles.dateButton, isSelected && styles.selectedDateButton]}>
                <Text style={[styles.dateButtonText, isSelected && styles.selectedDateButtonText]}>
                  {date.getDate()}
                </Text>
                <Text style={[styles.dateButtonDay, isSelected && styles.selectedDateButtonDay]}>
                  {date.toLocaleString('default', { weekday: 'short' })}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.heartRateContainer}>
        <AnimatedCircularProgress
          size={152}
          width={18}
          fill={progress}
          duration={2000}
          tintColor="#141B54"
          backgroundColor="#E5E7EB"
          rotation={360}
          lineCap="round"
        >
          {() => (
            <View style={styles.heartRateContent}>
              <FontAwesome5 name="heartbeat" size={42} color="#141B54" />
              <Text style={styles.heartRateText}>{bpm.toLocaleString()} bpm</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillarsScrollView}
      >
        {renderHeartPillars()}
      </ScrollView>

      {/* Fact Box and Image */}
      <TouchableOpacity style={styles.factBox} onPress={handleNextFact}>
        <Text style={styles.factText}>{heartFacts[currentFactIndex]}</Text>
      </TouchableOpacity>
      <Image
        source={require('../../assets/heartFact.png')} // Update the path to your image
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarButton: {
    marginLeft: '5%',
  },
  todayInfo: {
    alignItems: 'flex-start',
  },
  todayDay: {
    fontSize: 24,
    color: '#555',
    marginBottom: -5,
    marginLeft: '3%',
    fontWeight: '300',
  },
  todayDate: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000',
  },
  datePicker: {
    paddingBottom: 16,
  },
  dateButton: {
    width: 74,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedDateButton: {
    backgroundColor: '#141B54',
  },
  dateButtonText: {
    fontSize: 34,
    fontWeight: '400',
    color: '#000',
  },
  selectedDateButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  dateButtonDay: {
    fontSize: 24,
    color: '#555',
    fontWeight: '400',
  },
  selectedDateButtonDay: {
    color: '#fff',
    fontWeight: '500',
  },
  heartRateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  heartRateContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartRateText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  pillarsScrollView: {
    paddingBottom: 16,
    top: '10%',
    // marginBottom:'-8%'
  },
  pillarContainer: {
    alignItems: 'center',
    marginRight: 10,
    justifyContent: 'flex-end', // Align pillars to the bottom
  },
  pillar: {
    width: 49,
    backgroundColor: '#141B54',
    borderRadius: 10,
  },
  selectedPillar: {
    backgroundColor: '#028eee',
  },
  pillarDateText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  factBox: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    paddingLeft: 70,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    top:'5.7%'
  },
  factText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 120, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
    top: '-10.1%',
    left: '-4%',
  },
});

export default HeartTrackerScreen;