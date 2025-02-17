import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const insulinLogs = [
  { id: '1', time: '08:00 AM', date: '2025-02-18', type: 'Basal', dose: 10 },
  { id: '2', time: '12:30 PM', date: '2025-02-18', type: 'Bolus', dose: 5 },
  { id: '3', time: '06:45 PM', date: '2025-02-18', type: 'Basal', dose: 18 },
  { id: '4', time: '09:15 PM', date: '2025-02-18', type: 'Bolus', dose: 9 },
];

const getInsulinLevelCategory = (insulinType, dose) => {
  if (insulinType === 'Basal') {
    if (dose < 14) return 'green';
    else if (dose >= 14 && dose < 20) return 'yellow';
    else return 'red';
  } else if (insulinType === 'Bolus') {
    if (dose < 4) return 'green';
    else if (dose >= 4 && dose < 8) return 'yellow';
    else return 'red';
  }
  return 'yellow';
};

const InsulinLogs = ({ navigation }) => {
  const getImageSource = (category) => {
    switch (category) {
      case 'green':
        return require('../../assets/greenInsulin.png');
      case 'yellow':
        return require('../../assets/yellowInsulin.png');
      case 'red':
        return require('../../assets/redInsulin.png');
      default:
        return require('../../assets/yellowInsulin.png');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={width * 0.09} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Insulin Logs</Text>
      </View>
      
      {/* Insulin Logs List */}
      <FlatList
        data={insulinLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const category = getInsulinLevelCategory(item.type, item.dose);
          return (
            <View style={styles.logItem}>
              <Image source={getImageSource(category)} style={styles.logImage} />
              <View style={styles.logTextContainer}>
                <Text>
                  <Text style={styles.logLabel}>Type: </Text>
                  <Text style={styles.logValue}>{item.type}</Text>
                </Text>
                <Text>
                  <Text style={styles.logLabel}>Dosage: </Text>
                  <Text style={styles.logValue}>{item.dose} units</Text>
                </Text>
                <Text style={styles.logTime}>{item.time}, {item.date}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.09,
    marginTop: width * 0.04,
  },
  headerText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginLeft: width * 0.2,
    color: 'black',
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.03,
    marginBottom: width * 0.045,
    paddingLeft: width * 0.095,
    marginHorizontal: width*0.025,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    elevation: 2,
  },
  logImage: {
    width: width * 0.05,
    height: width * 0.2,
    marginRight: width * 0.075,
    transform: [{ rotate: '30deg' }],
  },
   logTextContainer: {
    flex: 1,
  },
  logLabel: {
    fontSize: width * 0.048,
    fontWeight: 'bold',
    color: 'black',
  },
  logValue: {
    fontSize: width * 0.045,
    color: 'black',
  },
  logTime: {
    fontSize: width * 0.035,
    color: 'gray',
    marginTop: width * 0.01,
    marginLeft: width * 0.28,
  },
});

export default InsulinLogs;