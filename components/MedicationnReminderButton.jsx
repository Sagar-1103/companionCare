import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const MedicationReminderButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* Icon */}
      <FontAwesome6 name="pills" size={30} color="#000" style={{left:'41%', top:'10%'}}/>

      {/* Text */}
      <Text style={styles.text}>Medication Reminder</Text>

      {/* Image */}
      <Image
        source={require("../assets/med_reminder.png")} // Replace with actual image path
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '26%',
    backgroundColor: "#eeeeee",
    borderRadius: 15,
    padding: '1%',
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "left",
    color: "#333",
    left:'-10%',
    top:'-8%',
  },
  image: {
    width: '85%',
    height: '90%',
    // left:'9%',
    bottom:'15%',
    resizeMode: "contain",
  },
});

export default MedicationReminderButton;
