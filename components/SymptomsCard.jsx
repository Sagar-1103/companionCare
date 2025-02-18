import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SymptomsCard = ({ title, description, createdAt, onEdit,role }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${d.getFullYear()}  ${d
      .getHours()
      .toString()
      .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

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

      <Text style={styles.timestamp}>{formatDate(createdAt)}</Text>
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