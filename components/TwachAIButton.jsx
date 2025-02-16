import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TwachAIButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* Icon */}
      <FontAwesome name="codepen" size={28} color="#000" style={{left:'42%', top:'5%'}}/>

      {/* Text */}
      <Text style={styles.text}>Twatch AI</Text>

      {/* Image */}
      <Image
        source={require("../../assets/Illustration_2.png")} // Replace with actual image path
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '82%',
    height: '24%',
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
    left:'-28%',
    top:'-10%',
  },
  image: {
    width: '85%',
    height: '80%',
    left:'9%',
    bottom:'13%',
    resizeMode: "contain",
  },
});

export default TwachAIButton;
