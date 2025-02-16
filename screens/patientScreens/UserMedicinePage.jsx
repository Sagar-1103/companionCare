import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const medicinesData = [
  { id: '1', name: 'Paracetamol', description: '500mg, 1 tablet daily', time: 'Breakfast', type: 'pill' },
  { id: '2', name: 'Ibuprofen', description: '400mg, 1 tablet every 6 hours', time: 'Lunch', type: 'pill' },
  { id: '3', name: 'Cough Syrup', description: '10ml, 3 times a day', time: 'Snack', type: 'syrup' },
  { id: '4', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Dinner', type: 'injection' },
  { id: '5', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Snack', type: 'injection' },
  { id: '6', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Dinner', type: 'injection' },
  { id: '7', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Breakfast', type: 'injection' },
  { id: '8', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Dinner', type: 'pill' },
  { id: '9', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Lunch', type: 'injection' },
  { id: '10', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Lunch', type: 'others' },
  { id: '11', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Dinner', type: 'injection' },
  { id: '12', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Snack', type: 'syrup' },
  { id: '13', name: 'Insulin', description: '10 units, 1 injection daily', time: 'Dinner', type: 'injection' },
];

const MedicineListScreen = ({ navigation }) => {
  const [medicines, setMedicines] = useState(medicinesData);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const filterMedicines = () => {
    return selectedTimes.length > 0 ? medicines.filter((med) => selectedTimes.includes(med.time)) : medicines;
  };

  const handleDelete = (id) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  const toggleTimeSelection = (time) => {
    setSelectedTimes((prevSelected) =>
      prevSelected.includes(time) ? prevSelected.filter((t) => t !== time) : [...prevSelected, time]
    );
  };

  const renderMedicineIcon = (type) => {
    switch (type) {
      case 'pill': return <MaterialCommunityIcons name="pill" size={50} color="#fff" />;
      case 'syrup': return <FontAwesome6 name="bottle-droplet" size={50} color="#fff" />;
      case 'injection': return <FontAwesome5 name="syringe" size={50} color="#fff" />;
      default: return <Icon name="medication-liquid" size={50} color="#fff" />;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.medicineBox}>
      <View style={styles.iconContainer}>{renderMedicineIcon(item.type)}</View>
      <View style={styles.textContainer}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDescription}>{item.description}</Text>
      </View>
      <View style={styles.actionIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('EditMedicineScreen', { medicine: item })}>
          <Icon name="edit" size={28} color="#007BFF" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={28} color="#007BFF" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#E3ECFA', '#C5DFF8']} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/medicineListImg.png')} style={styles.headerImage} />
      </View>

      <Text style={styles.title}>Your Medications</Text>
      <Text style={styles.subtitle}>Stay on track with your schedule</Text>

      {/* Meal Time Icons */}
      <View style={styles.timeIconsContainer}>
        {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.timeIcon, selectedTimes.includes(time) ? styles.selectedTimeIcon : null]}
            onPress={() => toggleTimeSelection(time)}
          >
            <Icon 
              name={time === 'Breakfast' ? 'free-breakfast' : time === 'Lunch' ? 'lunch-dining' : time === 'Snack' ? 'fastfood' : 'dinner-dining'}
              size={40} 
              color={selectedTimes.includes(time) ? '#fff' : '#007BFF'}
            />
            <Text style={[styles.timeText, selectedTimes.includes(time) ? styles.selectedText : null]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Medicine List */}
      <FlatList
        data={filterMedicines()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22 },
  imageContainer: { alignItems: 'center', marginTop: '8%' },
  headerImage: { width: '75%', height: '50%' },
  title: { fontSize: 44, fontWeight: 'bold', color: '#003366', textAlign: 'center', marginTop: '-52%' },
  subtitle: { fontSize: 20, color: '#555', textAlign: 'center', marginBottom: '5%' },
  
  timeIconsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  timeIcon: { alignItems: 'center', padding: 10, borderRadius: 12 },
  selectedTimeIcon: { backgroundColor: '#007BFF' },
  timeText: { marginTop: 5, fontSize: 12, color: '#007BFF' },
  selectedText: { color: '#fff' },

  listContainer: { paddingBottom: 20 },
  medicineBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: { width: 70, height: 70, borderRadius: 25, backgroundColor: '#3E7BFA', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  medicineName: { fontSize: 21, fontWeight: '600', color: '#003366' },
  medicineDescription: { fontSize: 14, color: '#666', marginTop: 4 },

  actionIcons: { flexDirection: 'row', alignItems: 'center'  },
  icon: { marginLeft: 15 },
});

export default MedicineListScreen;
