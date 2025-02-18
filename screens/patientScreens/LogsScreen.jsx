import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SymptomsCard from '../../components/SymptomsCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLogin } from '../../context/LoginProvider';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../../constants/Ports';
import axios from 'axios';

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

  useEffect(()=>{
    getLogs();
  },[])

  const getLogs = async()=>{
    try {
      const url = `${BACKEND_URL}/medications/read-logs/${user.role==="caretaker"?user.patientId:user.id}`;
      const response = await axios.get(url);
      const res = await response.data;
      setLogsData(res.data.logs);
    } catch (error) {
      console.log("Error : ",error);
    }
  }

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
            role={user.role}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Add Button */}
      {user?.role==="patient" && <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddSymptonScreen',{setLogsData})
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