import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const mockData = {
  '2025-02-19': { spo2: 98, restingSpo2: 95, minSpo2: 90 },
  '2025-02-18': { spo2: 97, restingSpo2: 96, minSpo2: 91 },
  '2025-02-17': { spo2: 96, restingSpo2: 94, minSpo2: 89 },
  '2025-02-16': { spo2: 99, restingSpo2: 95, minSpo2: 90 },
  '2025-02-15': { spo2: 98, restingSpo2: 96, minSpo2: 92 },
  '2025-02-14': { spo2: 97, restingSpo2: 94, minSpo2: 89 },
  '2025-02-13': { spo2: 96, restingSpo2: 93, minSpo2: 88 },
  '2025-02-12': { spo2: 98, restingSpo2: 95, minSpo2: 90 },
  '2025-02-11': { spo2: 97, restingSpo2: 94, minSpo2: 89 },
  '2025-02-10': { spo2: 99, restingSpo2: 96, minSpo2: 91 },
  '2025-02-09': { spo2: 98, restingSpo2: 95, minSpo2: 90 },
  '2025-02-08': { spo2: 97, restingSpo2: 94, minSpo2: 89 },
  '2025-02-07': { spo2: 96, restingSpo2: 93, minSpo2: 88 },
};

const spo2Facts = [
  "Normal SpO2 levels are typically between 95% and 100%.",
  "Low SpO2 levels can indicate hypoxemia, which requires medical attention.",
  "High altitude can affect your SpO2 levels.",
  "Chronic lung diseases like COPD can cause lower SpO2 levels.",
  "Regular exercise can improve your oxygen saturation levels.",
  "Smoking can significantly reduce your SpO2 levels.",
  "Deep breathing exercises can help improve oxygen saturation.",
  "Sleep apnea can cause drops in SpO2 levels during sleep.",
  "Monitoring SpO2 is crucial for patients with respiratory conditions.",
  "Maintaining good posture can help improve lung function and SpO2 levels.",
];

const SpO2TrackerScreen = () => {
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
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % spo2Facts.length);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateData = mockData[formatDate(selectedDate)] || {
    spo2: 0,
    restingSpo2: 0,
    minSpo2: 0,
  };

  const { spo2 } = selectedDateData;
  const goal = 110;
  const progress = (spo2 / goal) * 100;

//   const renderSpO2Pillars = () => {
//     return dates.map((date, index) => {
//       const dateKey = formatDate(date);
//       const spo2Data = mockData[dateKey] ? mockData[dateKey].spo2 : 0;
//       const isSelected = date.toDateString() === selectedDate.toDateString();

//       return (
//         <View key={index} style={styles.pillarContainer}>
//           <View
//             style={[
//               styles.pillar,
//               { height: spo2Data * 1.2 }, // Adjust the multiplier to fit your UI
//               isSelected && styles.selectedPillar,
//             ]}
//           />
//           <Text style={styles.pillarDateText}>{date.getDate()}</Text>
//         </View>
//       );
//     });
//   };

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

      <View style={styles.spo2Container}>
        <AnimatedCircularProgress
          size={200}
          width={22}
          fill={progress}
          duration={2000}
          tintColor="#000"
          backgroundColor="#E5E7EB"
          rotation={360}
          lineCap="round"
        >
          {() => (
            <View style={styles.spo2Content}>
              <FontAwesome5 name="lungs" size={56} color="#1A5D1A" />
              <Text style={styles.spo2Text}>{spo2.toLocaleString()}%</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillarsScrollView}
      >
        {renderSpO2Pillars()}
      </ScrollView> */}

      {/* Fact Box and Image */}
      <TouchableOpacity style={styles.factBox} onPress={handleNextFact}>
        <Text style={styles.factText}>{spo2Facts[currentFactIndex]}</Text>
      </TouchableOpacity>
      <Image
        source={require('../../assets/spo2Fact.png')} // Update the path to your image
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
    marginBottom: '-15%',
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
    backgroundColor: '#111111',
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
  spo2Container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-5%',
    top:'12%'
  },
  spo2Content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spo2Text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  pillarsScrollView: {
    paddingBottom: 16,
    top: '14%',
    marginBottom: '-3%',
  },
  pillarContainer: {
    alignItems: 'center',
    marginRight: 10,
    justifyContent: 'flex-end', // Align pillars to the bottom
  },
  pillar: {
    width: 49,
    backgroundColor: '#111111',
    borderRadius: 10,
  },
  selectedPillar: {
    backgroundColor: '#1A5D1A',
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
    paddingLeft: 100,
    // marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    top: '24.8%',
  },
  factText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  image: {
    width: 120, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
    top: '-8.1%',
    left: '-4%',
  },
});

export default SpO2TrackerScreen;