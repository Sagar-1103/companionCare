import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SymptomsCard = ({ title, description, onEdit,role }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.loggerText}>{title}</Text>
        {role==="patient" && <TouchableOpacity onPress={onEdit}>
          <MaterialIcons name="edit" size={20} color="#000" style={{ marginBottom: '6%' }} />
        </TouchableOpacity>}
      </View>

      <Text style={styles.description} numberOfLines={5}>
        {description}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    padding: '6%',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  loggerText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    left: '62%',
  },
});

export default SymptomsCard;