import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const medicines = [
  {
    id: '1',
    name: 'Paracetamol',
    description: '500mg, 1 tablet daily',
    timing: '8:00 AM',
    type: 'pill',
  },
  {
    id: '2',
    name: 'Ibuprofen',
    description: '400mg, 1 tablet every 6 hours',
    timing: '2:00 PM',
    type: 'pill',
  },
  {
    id: '3',
    name: 'Cough Syrup',
    description: '10ml, 3 times a day',
    timing: '10:00 AM',
    type: 'syrup',
  },
  {
    id: '4',
    name: 'Insulin',
    description: '10 units, 1 injection daily',
    timing: '7:00 PM',
    type: 'injection',
  },
  {
    id: '5',
    name: 'Durex',
    description: '10 units, 1 injection daily',
    timing: '7:00 PM',
    type: 'others',
  },
];

const MedicineListScreen = () => {
  const renderMedicineIcon = (type) => {
    switch (type) {
      case 'pill':
        return <MaterialCommunityIcons name="pill" size={50} color="#fff" />;
      case 'syrup':
        return <FontAwesome6 name="bottle-droplet" size={50} color="#fff" />;
      case 'injection':
        return <FontAwesome5 name="syringe" size={50} color="#fff" />;
      default:
        return <Icon name="medication-liquid" size={50} color="#fff" />;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.medicineBox}>
      <View style={styles.iconContainer}>{renderMedicineIcon(item.type)}</View>
      <View style={styles.textContainer}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDescription}>{item.description}</Text>
      </View>
      <Text style={styles.timingText}>{item.timing}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#E3ECFA', '#C5DFF8']} style={styles.container}>
      {/* Image at the Top */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/medicineListImg.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Your Medications</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Stay on track with your schedule</Text>

      {/* Medicine List */}
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: '8%',
  },
  headerImage: {
    width: '85%',
    height: '60%',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginTop: '-52%',
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginBottom: '8%',
  },
  listContainer: {
    paddingBottom: 20,
  },
  medicineBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 18,
    paddingRight:12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#3E7BFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  medicineName: {
    fontSize: 21,
    fontWeight: '600',
    color: '#003366',
  },
  medicineDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
});

export default MedicineListScreen;