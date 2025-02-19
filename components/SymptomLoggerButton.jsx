import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome6'

const SymptomLoggerButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("LogScreen")} style={styles.container}>
      {/* Icon */}
      <FontAwesome name="clipboard-list" size={28} color="#000" style={{left:'42%', top:'5%'}}/>

      {/* Text */}
      <Text style={styles.text}>Symptoms Logger</Text>

      {/* Image */}
      <Image
        source={require("../assets/SymptomsLog.png")} // Replace with actual image path
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
    left:'-16%',
    top:'-10%',
  },
  image: {
    width: '90%',
    height: '92%',
    left:'0%',
    bottom:'13%',
    resizeMode: "contain",
  },
});

export default SymptomLoggerButton;
