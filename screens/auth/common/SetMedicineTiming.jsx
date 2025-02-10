import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const mealTimings = [
  { name: 'Breakfast', icon: 'free-breakfast', type: MaterialIcons },
  { name: 'Lunch', icon: 'dinner-dining', type: MaterialIcons },
  { name: 'Snacks', icon: 'fast-food', type: Ionicons },
  { name: 'Dinner', icon: 'food-turkey', type: MaterialCommunityIcons },
];

const SetMedicineTiming = ({ navigation }) => {
  const [dates, setDates] = useState([null, null, null, null]);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <Ionicons name="chevron-back" size={36} color="#001f3f" />
      </TouchableOpacity>

      <Text style={styles.title}>Select Time</Text>
      <Text style={styles.InnerText}>Set up your food timings</Text>
      <Text style={styles.InnerLine}>______________________________</Text>

      <View>
        <View style={styles.mealContainer}>
          {mealTimings.map((meal, index) => {
            const IconComponent =
              meal.type === MaterialIcons
                ? MaterialIcons
                : meal.type === Ionicons
                ? Ionicons
                : MaterialCommunityIcons;

            const iconColor = dates[index] ? '#001f3f' : '#888'; 
            return (
              <View key={index} style={styles.mealRow}>
                <View style={styles.iconContainer}>
                  <IconComponent name={meal.icon} size={50} color={iconColor} />
                  <Text style={styles.mealLabel}>{meal.name}</Text>
                </View>

                <TouchableOpacity
                  style={styles.timeSelector}
                  onPress={() => setOpenIndex(index)}
                >
                  <Text style={styles.timeText}>
                    {dates[index]
                      ? dates[index].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : `Set ${meal.name} Time`}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {openIndex !== null && (
        <DatePicker
          modal
          open={true}
          date={dates[openIndex] || new Date()}
          mode="time"
          onConfirm={(selectedDate) => {
            const newDates = [...dates];
            newDates[openIndex] = selectedDate;
            setDates(newDates);
            setOpenIndex(null);
          }}
          onCancel={() => setOpenIndex(null)}
        />
      )}

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    color: '#001f3f',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '12%',
  },
  InnerText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'rgb(73, 70, 70)',
    marginTop: '15%',
  },
  InnerLine: {
    fontSize: 22,
    textAlign: 'center',
    color: '#888',
    marginBottom: '10%',
  },
  backContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  mealContainer: {
    marginBottom: '-15%',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '11%',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 0.4,
  },
  mealLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#001f3f',
  },
  timeSelector: {
    flex: 0.6,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 22,
    color: '#555',
  },
  signInButton: {
    backgroundColor: '#001f3f',
    padding: 16,
    borderRadius: 32,
    marginTop: '20%',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
});

export default SetMedicineTiming;