import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SymptomsCard from '../../components/SymptomsCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLogin } from '../../context/LoginProvider';
import { useNavigation } from '@react-navigation/native';

const LogScreen = () => {
  const navigation = useNavigation();
  const [logsData, setLogsData] = useState([
    {
      id: '1',
      title: 'Headache',
      description: 'Mild headache since morning, feels slightly better now.',
      createdAt: new Date('2024-02-12T08:30:00'),
    },
  ]);

  const handleAddLog = (newLog) => {
    setLogsData([...logsData, newLog]);
  };

  const handleEditLog = (id, updatedLog) => {
    setLogsData((prevLogs) =>
      prevLogs.map((log) => (log.id === id ? { ...log, ...updatedLog } : log))
    );
  };
  const {user} = useLogin();

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
            role={user.role}
            onEdit={() =>
              navigation.navigate('AddSymptonScreen', {
                log: item,
                onSave: (updatedLog) => handleEditLog(item.id, updatedLog),
              })
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Add Button */}
      {user?.role==="patient" && <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddSymptonScreen', {
            onSave: handleAddLog,
          })
        }
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>}
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