import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const SymptomsCard = ({ title, description, createdAt }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}  ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.loggerText}>{title}</Text>
        <MaterialIcons name="edit" size={20} color="#000" style={{marginBottom:'6%'}}/>
      </View>


      <Text style={styles.description} numberOfLines={5}>
        {description}
      </Text>

      <Text style={styles.timestamp}>{formatDate(createdAt)}</Text>
    </View>
  );
};

SymptomsCard.defaultProps = {
  title: "Last Symptom Title",
  description:
    "Description of Last Symptom make it such that irrespective of size it stops when the text length exceeds here and should appear like this...",
  createdAt: new Date(), 
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    padding: '6%',
    borderRadius: 20,
    // marginBottom: '6%'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  loggerText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#999",
    left:'65%'
  },
});

export default SymptomsCard;
