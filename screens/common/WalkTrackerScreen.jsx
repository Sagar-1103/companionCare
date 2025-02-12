import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Mock data for steps (for demonstration)
const mockStepsData = {
  '2025-02-12': 8104,
  '2025-02-11': 7500,
  '2025-02-10': 6543,
  '2025-02-09': 2222,
  '2025-02-08': 7865,
  '2025-02-07': 8886,
  '2025-02-06': 7522,
  '2025-02-05': 7321,
  '2025-02-04': 6543,
  '2025-02-03': 7111,
};

const WalkTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  });

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Format date to YYYY-MM-DD for mock data lookup
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  const steps = 8788;
  const goal = 10000;
  const progress = (steps / goal) * 100; // Calculate percentage

  // Data for the three smaller circles
  const smallCirclesData = [
    {
      id: 1,
      tintColor: '#820eee', // Tomato color
      icon: 'burn', // FontAwesome icon name
      text: 'Calories',
      iconSet: 'FontAwesome5', // Specify the icon set
    },
    {
      id: 2,
      tintColor: '#EF8347', // LimeGreen color
      icon: 'location-sharp', // Ionicons icon name
      text: 'Cycling',
      iconSet: 'Ionicons', // Specify the icon set
    },
    {
      id: 3,
      tintColor: '#1F9AFF', // DodgerBlue color
      icon: 'timelapse', // MaterialIcons icon name
      text: 'Steps',
      iconSet: 'MaterialIcons', // Specify the icon set
    },
  ];

  // Function to render the appropriate icon component
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
      {/* Top Bar with Calendar Icon and Today's Date */}
      <View style={styles.topBar}>
        <TouchableOpacity style={{ marginLeft: '5%' }}>
          <MaterialIcons name="calendar-month" size={36} color="#000" />
        </TouchableOpacity>
        <View style={styles.todayContainer}>
          <Text style={styles.todayDay}>{today.toLocaleString('default', { weekday: 'long' })}</Text>
          <Text style={styles.todayDate}>{today.toLocaleString('default', { day: 'numeric', month: 'long' })}</Text>
        </View>
      </View>

      {/* Horizontal Scrolling Date Picker */}
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

      {/* Pie Chart Section */}
      <View style={styles.piechartcontainer}>
        <AnimatedCircularProgress
          size={240}
          width={25}
          fill={progress}
          duration={2000}
          tintColor="#141B54" // Dark Blue
          backgroundColor="#E5E7EB" // Light Gray
          rotation={360} // To match the style in the image
          lineCap="round"
        >
          {() => (
            <View style={styles.innerContent}>
              <Ionicons name="footsteps" size={70} color="#6B7280" />
              <Text style={styles.stepText}>{steps.toLocaleString()}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Three Smaller Circles */}
      <View style={styles.rowContainer}>
        {smallCirclesData.map((circle) => (
          <View key={circle.id} style={styles.smallCircleContainer}>
            <AnimatedCircularProgress
              size={80} // Smaller size
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
            {/* Text below the circle */}
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
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '32%',
  },
  smallCircleContainer: {
    alignItems: 'center', // Center icon and text
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
    marginTop: 8, // Space between circle and text
  },
});

export default WalkTrackerScreen;