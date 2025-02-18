import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useLogin } from '../../context/LoginProvider';

const Sleep = ({ value, unit,onPress }) => {
  const {user} = useLogin();
  console.log(user);
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryText}>Sleep</Text>
        <Icon name="moon" size={28} color="#000" />
      </View>

      <View style={styles.circleContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.unitText}>{unit}</Text>
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

export default Sleep;