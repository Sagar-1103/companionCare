import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PieChart from 'react-native-pie-chart';

const Walk = ({ value, unit }) => {
  const completed = parseInt(value);
  const remaining = 10000 - completed;

  const series = [
    { value: completed, color: 'rgb(14, 14, 125)' },
    { value: 10000 - completed, color: '#eeeeee' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryText}>Walk</Text>
        <Icon name="directions-walk" size={44} color="#000" />
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={125} 
          series={series} 
          cover={0.85} 
          coverFill="#fff" 
        />
        <View style={styles.centerTextContainer}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
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
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 24,
    fontWeight: '300',
    color: 'black',
  },
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
    top: '47%',
    left: '43%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    alignItems: 'center',
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  unitText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000'
  },
});

export default Walk;