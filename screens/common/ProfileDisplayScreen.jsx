import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon

const { width } = Dimensions.get('window'); // Get the screen width

const ProfileDisplayScreen = ({
  userRole = 'caretaker'
//   userRole = 'patient'
}) => {
  const navigation = useNavigation();
  // Mock data - replace with actual data
  const userData = {
    patient: {
      profileImage: require('../../assets/insulinBG.png'),
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'Male',
      mobile: '+91 9876543210',
    },
    caretaker: {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      gender: 'Female',
      mobile: '+91 9876543211',
    },
  };

  const DisplayField = ({ label, value }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  const renderProfileSection = (data, title) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <DisplayField label="Name" value={data.name} />
      <DisplayField label="Email Address" value={data.email} />
      <DisplayField label="Gender" value={data.gender} />
      <DisplayField label="Mobile" value={data.mobile} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Details</Text>
      </View>

      <View style={styles.profileImageSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={userData.patient.profileImage}
            style={styles.profileImage}
          />
          <View style={styles.onlineIndicator} />
        </View>
      </View>

      <View style={{width:0.85*width, backgroundColor:'#ddd', height:'0.1%', alignSelf: 'center'}}></View>

      {userRole === 'caretaker' && renderProfileSection(userData.caretaker, 'Caretaker Details')}

      <View style={{width:0.85*width, backgroundColor:'#ddd', height:'0.1%', alignSelf: 'center'}}></View>

      {renderProfileSection(userData.patient, userRole === 'caretaker' ? 'Patient Details' : 'Personal Details')}

      <View style={{width:0.85*width, backgroundColor:'#ddd', height:'0.1%', alignSelf: 'center', marginTop:width*0.1}}></View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width * 0.03, // 3% of screen width
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.04, // 4% of screen width
  },
  headerTitle: {
    fontSize: width * 0.07, // 5% of screen width
    fontWeight: '600',
    color: '#000',
    marginLeft: width * 0.12, // Adds some space between the icon and the title
  },
  profileImageSection: {
    alignItems: 'center',
    padding: width * 0.06, // 5% of screen width
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: width * 0.25, // 20% of screen width
    height: width * 0.25, // 20% of screen width
    borderRadius: width * 0.1, // 50% of the width to make it circular
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: width * 0.04, // 4% of screen width
    height: width * 0.04, // 4% of screen width
    borderRadius: width * 0.02, // 50% of the width for circular shape
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  section: {
    paddingHorizontal: width * 0.07, // 7% of screen width
    paddingVertical: width * 0.04, // 2% of screen width
  },
  sectionTitle: {
    fontSize: width * 0.055, // 4.5% of screen width
    fontWeight: '600',
    color: '#000',
    marginBottom: width * 0.04, // 4% of screen width
  },
  fieldContainer: {
    marginBottom: width * 0.04, // 4% of screen width
  },
  label: {
    fontSize: width * 0.042, // 4% of screen width
    color: '#333',
    marginBottom: width * 0.02, // 2% of screen width
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: width * 0.03, // 3% of screen width
    paddingVertical: width * 0.03, // 2% of screen width
  },
  value: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#000',
  },
});

export default ProfileDisplayScreen;
