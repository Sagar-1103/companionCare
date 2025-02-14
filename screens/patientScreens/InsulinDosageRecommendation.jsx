import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SmallDosageImage from '../../assets/greenInsulin.png';
import MediumDosageImage from '../../assets/yellowInsulin.png';
import LargeDosageImage from '../../assets/redInsulin.png';

const InsulinDosageRecommendation = ({ route, navigation }) => {
  const { dosage, insulinType, insulinLevelCategory, bodyWeight } = route.params; // Get the category

  let dosageImage;
  switch (insulinLevelCategory) { // Use the category to select image
    case 'Small':
      dosageImage = SmallDosageImage;
      break;
    case 'Medium':
      dosageImage = MediumDosageImage;
      break;
    case 'Large':
      dosageImage = LargeDosageImage;
      break;
    default:
      dosageImage = MediumDosageImage;
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={32} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Insulin Dosage</Text>

      {/* Syringe Image */}
      <Image source={dosageImage} style={styles.image} resizeMode="contain" />

      {/* Dosage Info */}
      <Text style={styles.infoText}>Based on your details You should take</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.unit}>Units</Text>
      <Text style={styles.bolus}>of <Text style={{ fontWeight: 'bold' }}>{insulinType}</Text> Insulin</Text>

      {/* Disclaimer */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Disclaimer:</Text>
        <Text style={styles.disclaimerText}>
          It is suggested to consult your physician if dose recommended differs a lot from prescribed dosage
        </Text>
      </View>

      <TouchableOpacity style={styles.backHomeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backHomeButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: '6%',
    left: '9%',
  },
  header: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    marginTop: '12%',
    left: '2%',
    marginBottom: '-10%',
  },
  image: {
    width: '100%',
    height: '35%',
    marginBottom: '-5%',
    transform: [{ rotate: '80deg' }]
  },
  infoText: {
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  dosage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  unit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  bolus: {
    fontSize: 19,
    marginBottom: 20,
    color: '#000',
  },
  disclaimerBox: {
    backgroundColor: '#dcdcdc',
    padding: '4%',
    borderRadius: 10,
    width: '80%',
    marginBottom: '28%',
  },
  disclaimerTitle: {
    marginLeft: '2%',
    fontSize: 16,
    color: '#333',
  },
  disclaimerText: {
    marginLeft: '4%',
    fontSize: 14,
    color: '#555',
  },
  backHomeButton: {
    backgroundColor: '#191970',
    paddingVertical: '3.8%',
    paddingHorizontal: '35%',
    borderRadius: 30,
  },
  backHomeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default InsulinDosageRecommendation;