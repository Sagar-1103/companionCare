import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const SpO2 = ({ value, unit }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryText}>SpO</Text>
        <Icon name="droplet" size={28} color="#000" />
      </View>
        <Text style={styles.smallText}>2</Text>

      <View style={styles.circleContainer}>
        <Text style={styles.valueText}>{value}%</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    borderRadius: 15,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  categoryText: {
    fontSize: 24,
    fontWeight: '300',
    color: 'black',
  },
  smallText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    top: '-8%',
    left: '-10%'
  },
  circleContainer: {
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    backgroundColor: '#eeeeee', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -2, 
  },
  valueText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000', 
    marginTop: '20%'
  },
});

export default SpO2;