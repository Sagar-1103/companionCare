import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Water = () => {
  const navigation = useNavigation();
  const waterLog = [3, 2, 0, 4, 1]; // Dummy data

  return (
    <TouchableOpacity onPress={()=>navigation.navigate("WaterIntakeScreen")} style={styles.container}>
      {/* Icon */}
      <FontAwesome6 name="droplet" size={22} color="#000" style={{ left: "39%", top: "9%" }} />

      {/* Text */}
      <Text style={styles.text}>Water</Text>

      {/* Water Log Graph */}
      <View style={styles.graphContainer}>
        {waterLog.map((bottles, index) => (
          <View key={index} style={styles.pillarContainer}>
            <View
              style={[
                styles.pillar,
                {
                  height: bottles > 0 ? bottles * 16 : 4,
                  backgroundColor: bottles > 0 ? "#0168db" : "#888",
                },
              ]}
            />
            {/* <Text style={styles.dayText}>{bottles > 0 ? "" : "•"}</Text> */}
          </View>
        ))}
      </View>

      {/* Current Day Consumption */}
      <Text style={styles.bottleText}>{waterLog[waterLog.length - 1]} Bottles</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: "28%",
    backgroundColor: "#eeeeee",
    borderRadius: 15,
    padding: "1%",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontSize: 30,
    fontWeight: "400",
    textAlign: "left",
    color: "#333",
    left: "-22%",
    top: "-17%",
  },
  graphContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "80%",
    height: 50,
    top:'-9%'
  },
  pillarContainer: {
    alignItems: "center",
    width: "18%",
  },
  pillar: {
    width: 10,
    borderRadius: 5,
  },
  dayText: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
  bottleText: {
    fontSize: 22,
    fontWeight: "400",
    left:'-16%',
    top:'-10%',
    color: "#555",
  },
});

export default Water;
