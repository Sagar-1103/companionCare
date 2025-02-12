import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SymptomsCard from "../../components/SymptomsCard"; 

const logsData = [
  {
    id: "1",
    title: "Headache",
    description: "Mild headache since morning, feels slightly better now.",
    createdAt: new Date("2024-02-12T08:30:00"),
  },
  {
    id: "2",
    title: "Cough & Cold",
    description: "Started coughing at night, feeling congested.",
    createdAt: new Date("2024-02-11T22:15:00"),
  },
  {
    id: "3",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "4",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "5",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "6",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "7",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "8",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "9",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "10",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "11",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "12",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "13",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "14",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "15",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "16",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "17",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
];

const LogScreen = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Logs</Text>

      <FlatList
        data={logsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SymptomsCard
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
          />
        )}
        contentContainerStyle={styles.listContainer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: 'left',
  },
  listContainer: {
    gap: 20, 
  },
});

export default LogScreen;
