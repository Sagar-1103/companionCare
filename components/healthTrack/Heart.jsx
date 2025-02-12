import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Heart = ({ value, unit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryText}>Heart</Text>
        <Icon name="heartbeat" size={36} color="#000" />
      </View>

      <View style={styles.circleContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.unitText}>{unit}</Text>
      </View>
    </View>
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
  circleContainer: {
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  valueText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000', 
    marginTop: '12%'
  },
  unitText: {
    fontSize: 24,
    marginTop:'-10%',
    fontWeight: '400',
    color: '#555', 
  },
});

export default Heart;