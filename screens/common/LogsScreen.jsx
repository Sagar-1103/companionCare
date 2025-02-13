import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SymptomsCard from '../../components/SymptomsCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LogScreen = ({ navigation }) => {
  const [logsData, setLogsData] = useState([
    {
      id: '1',
      title: 'Headache',
      description: 'Mild headache since morning, feels slightly better now.',
      createdAt: new Date('2024-02-12T08:30:00'),
    },
    // Add more logs here...
  ]);

  const handleAddLog = (newLog) => {
    setLogsData([...logsData, newLog]);
  };

  const handleEditLog = (id, updatedLog) => {
    setLogsData((prevLogs) =>
      prevLogs.map((log) => (log.id === id ? { ...log, ...updatedLog } : log))
    );
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Logs</Text>

      {/* Logs List */}
      <FlatList
        data={logsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SymptomsCard
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
            onEdit={() =>
              navigation.navigate('AddSymptomScreen', {
                log: item,
                onSave: (updatedLog) => handleEditLog(item.id, updatedLog),
              })
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddSymptomScreen', {
            onSave: handleAddLog,
          })
        }
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'left',
  },
  listContainer: {
    gap: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#003366',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default LogScreen;