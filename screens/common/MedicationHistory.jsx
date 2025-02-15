import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/MaterialIcons';

import medImg from '../../assets/medImg.png';

const medications = [
  { id: '1', name: 'Paracetamol', description: '500mg, 1 tablet daily', type: 'pill' },
  { id: '2', name: 'Ibuprofen', description: '400mg, 1 tablet every 6 hours', type: 'pill' },
  { id: '3', name: 'Cough Syrup', description: '10ml, 3 times a day', type: 'syrup' },
  { id: '4', name: 'Insulin', description: '10 units, 1 injection daily', type: 'others' },
  { id: '5', name: 'Paracetamol', description: '500mg, 1 tablet daily', type: 'pill' },
  { id: '6', name: 'Ibuprofen', description: '400mg, 1 tablet every 6 hours', type: 'pill' },
  { id: '7', name: 'Cough Syrup', description: '10ml, 3 times a day', type: 'syrup' },
  { id: '8', name: 'Insulin', description: '10 units, 1 injection daily', type: 'others' },
  { id: '9', name: 'Paracetamol', description: '500mg, 1 tablet daily', type: 'pill' },
  { id: '10', name: 'Ibuprofen', description: '400mg, 1 tablet every 6 hours', type: 'pill' },
  { id: '11', name: 'Cough Syrup', description: '10ml, 3 times a day', type: 'syrup' },
  { id: '12', name: 'Insulin', description: '10 units, 1 injection daily', type: 'others' },
  // Add more medications with different types as needed
];

const MedicationHistoryScreen = () => {
  const scaleValue = new Animated.Value(1);

  const animateFAB = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'pill':
        return <FontAwesome5 name="pills" size={24} color="#FFF" />;
      case 'syrup':
        return <FontAwesome6 name="bottle-droplet" size={24} color="#FFF" />;
      case 'others':
        return <FontAwesome5 name="syringe" size={24} color="#FFF" />;
      default:
        return <Icon name="medication" size={24} color="#FFF" />;
    }
  };

  return (
    <LinearGradient colors={['#F4F7FC', '#E3ECFA']} style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#003366', '#0055A4']} style={styles.topView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Medication</Text>
          <Text style={styles.subtitle}>History</Text>
        </View>
        <Image 
          source={medImg}
          style={{height:93, width:280,resizeMode:'contain', right:'42%'}}
        />
      </LinearGradient>

      {/* Medication List */}
      <View style={styles.lowerView}>
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.medicationBox}>
              <View style={styles.iconBox}>
                {renderIcon(item.type)}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.medicineName}>{item.name}</Text>
                <Text style={styles.medicineDescription}>{item.description}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Floating Action Button with Animation */}
      <Animated.View style={[styles.fabContainer, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity style={styles.fab} onPress={animateFAB}>
          <Icon name="add" size={32} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 25,
    elevation: 5,
  },
  titleContainer: {
    marginLeft: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
  },
  lowerView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  medicationBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor:'#003366'
  },
  iconBox: {
    backgroundColor: '#003366',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent:'center',
    marginRight: 18,
    elevation: 4,
    height:50,
    width:48
  },
  textContainer: {
    flex: 1,
  },
  medicineName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  medicineDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 3,
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fab: {
    backgroundColor: '#0055A4',
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default MedicationHistoryScreen;