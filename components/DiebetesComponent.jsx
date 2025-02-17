import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
const DiabetesComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("InsulinDosageScreen")} style={styles.container}>
      <FontAwesome6 name="droplet" size={22} color="#000" style={{left:'39%', top:'8%'}}/>

      <Text style={styles.text}>Diabetes{"\n"}Log</Text>

      <Image
        source={require("../assets/diabetes.png")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: '28%',
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
    fontSize: 28,
    fontWeight: "400",
    textAlign: "left",
    color: "#333",
    left:'-12%',
    top:'-5%',
  },
  image: {
    width: '60%',
    height: '85%',
    left:'9%',
    bottom:'15%',
    resizeMode: "contain",
  },
});

export default DiabetesComponent;
