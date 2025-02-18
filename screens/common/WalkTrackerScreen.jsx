import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const mockData = {
  '2025-02-12': { steps: 8104, calories: 850, distance: 5, duration: 120 },
  '2025-02-11': { steps: 7500, calories: 800, distance: 4.5, duration: 110 },
  '2025-02-10': { steps: 6543, calories: 700, distance: 4, duration: 100 },
  '2025-02-09': { steps: 2222, calories: 300, distance: 2, duration: 60 },
  '2025-02-08': { steps: 7865, calories: 820, distance: 5.2, duration: 125 },
  '2025-02-07': { steps: 8886, calories: 900, distance: 5.5, duration: 130 },
  '2025-02-06': { steps: 7522, calories: 780, distance: 4.8, duration: 115 },
  '2025-02-05': { steps: 7321, calories: 760, distance: 4.7, duration: 112 },
  '2025-02-04': { steps: 6543, calories: 700, distance: 4, duration: 100 },
  '2025-02-03': { steps: 7111, calories: 750, distance: 4.6, duration: 110 },
};

const WalkTrackerScreen = ({route}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  });
  const { healthDataHistory } = route.params;

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateData = mockData[formatDate(selectedDate)] || {
    steps: 0,
    calories: 0,
    distance: 0,
    duration: 0,
  };

  const { steps, calories, distance, duration } = selectedDateData;
  const goal = 10000;
  const progress = (steps / goal) * 100; 
  

  const smallCirclesData = [
    {
      id: 1,
      tintColor: '#820eee', 
      icon: 'burn',
      text: `${healthDataHistory.find(
        d => d.date === selectedDate.toISOString().split('T')[0],
      )?.totalExerciseMinutes || 0}kcal`,
      iconSet: 'FontAwesome5',
    },
    {
      id: 2,
      tintColor: '#EF8347', 
      icon: 'location-sharp', 
      text: `${distance}km`, 
      iconSet: 'Ionicons', 
    },
    {
      id: 3,
      tintColor: '#1F9AFF', 
      icon: 'timelapse',
      text: `${healthDataHistory.find(
        d => d.date === selectedDate.toISOString().split('T')[0],
      )?.totalExerciseMinutes || 0}min`, 
      iconSet: 'MaterialIcons', 
    },
  ];

  const renderIcon = (iconSet, iconName, color, size) => {
    switch (iconSet) {
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={{ marginLeft: '5%' }}>
          <MaterialIcons name="calendar-month" size={36} color="#000" />
        </TouchableOpacity>
        <View style={styles.todayContainer}>
          <Text style={styles.todayDay}>{today.toLocaleString('default', { weekday: 'long' })}</Text>
          <Text style={styles.todayDate}>{today.toLocaleString('default', { day: 'numeric', month: 'long' })}</Text>
        </View>
      </View>

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

      <View style={styles.piechartcontainer}>
        <AnimatedCircularProgress
          size={240}
          width={25}
          fill={progress}
          duration={2000}
          tintColor="#141B54" 
          backgroundColor="#E5E7EB" 
          rotation={360} 
          lineCap="round"
        >
          {() => (
            <View style={styles.innerContent}>
              <Ionicons name="footsteps" size={70} color="#6B7280" />
              <Text style={styles.stepText}>{healthDataHistory.find(
                  d => d.date === selectedDate.toISOString().split('T')[0],
                )?.totalSteps || 0}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.rowContainer}>
        {smallCirclesData.map((circle) => (
          <View key={circle.id} style={styles.smallCircleContainer}>
            <AnimatedCircularProgress
              size={80} 
              width={10}
              fill={progress}
              duration={2000}
              tintColor={circle.tintColor}
              backgroundColor="#E5E7EB"
              rotation={360}
              lineCap="round"
              style={styles.smallChart}
            >
              {() => (
                <View style={styles.innerContentSmall}>
                  {renderIcon(circle.iconSet, circle.icon, circle.tintColor, 30)}
                </View>
              )}
            </AnimatedCircularProgress>
            <Text style={[styles.smallLabelText, { color: circle.tintColor }]}>
              {circle.text}
            </Text>
          </View>
        ))}
      </View>
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
    paddingBottom: 16,
  },
  dateBox: {
    width: 74,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
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
  piechartcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%',
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '32%',
  },
  smallCircleContainer: {
    alignItems: 'center', 
  },
  smallChart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContentSmall: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallLabelText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8, 
  },
});

export default WalkTrackerScreen;