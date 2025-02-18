import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { useLogin } from '../../context/LoginProvider';
import { BACKEND_URL } from '../../constants/Ports';
import axios from 'axios';

const { width } = Dimensions.get('window'); // Get the screen width

const ProfileDisplayScreen = () => {
  const { user } = useLogin();
  const userRole = user.role === "caretaker"
    ? "both"
    : user.role === "patient" && !user.caretakerId
    ? "caretaker"
    : user.role === "patient" && user.caretakerId
    ? "both"
    : "";

  const navigation = useNavigation();
  const [patient, setPatient] = useState(null);
  const [caretaker, setCaretaker] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        let url;
        if (user.role === "patient") {
          url = `${BACKEND_URL}/users/current-patient/${user.id}`;
        } else if (user.role === "caretaker") {
          url = `${BACKEND_URL}/users/current-patient/${user.patientId}`;
        }
        if (url) {
          const response = await axios.get(url);
          setPatient(response.data.data.patient);
        }
      } catch (error) {
        console.log("Error fetching patient:", error);
      }
    };

    const fetchCaretaker = async () => {
      try {
        let url;
        if (user.role === "caretaker") {
          url = `${BACKEND_URL}/users/current-caretaker/${user.id}`;
        } else if (user.role === "patient" && user.caretakerId) {
          url = `${BACKEND_URL}/users/current-caretaker/${user.caretakerId}`;
        }
        if (url) {
          const response = await axios.get(url);
          setCaretaker(response.data.data.caretaker);
        }
      } catch (error) {
        console.log("Error fetching caretaker:", error);
      }
    };

    fetchPatient();
    fetchCaretaker();
  }, []);

  const DisplayField = ({ label, value }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value || "N/A"}</Text>
      </View>
    </View>
  );

  const renderProfileSection = (data, title) => {
    if (!data) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <DisplayField label="Name" value={data.name} />
        <DisplayField label="Email Address" value={data.email} />
        {data?.gender && <DisplayField label="Gender" value={data.gender} />}
        <DisplayField label="Mobile" value={data.phNo} />
      </View>
    );
  };

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
            source={require('../../assets/insulinBG.png')} // Default image
            style={styles.profileImage}
          />
          <View style={styles.onlineIndicator} />
        </View>
      </View>

      <View style={styles.separator} />

      {userRole === 'caretaker' && renderProfileSection(caretaker, 'Caretaker Details')}
      {userRole === 'patient' && renderProfileSection(patient, 'Patient Details')}
      {userRole === 'both' && renderProfileSection(caretaker, 'Caretaker Details')}
      {userRole === 'both' && renderProfileSection(patient, 'Patient Details')}
      
      <View style={styles.separator} />
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
    fontSize: width * 0.07, // 7% of screen width
    fontWeight: '600',
    color: '#000',
    marginLeft: width * 0.12,
  },
  profileImageSection: {
    alignItems: 'center',
    padding: width * 0.06, // 6% of screen width
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: width * 0.02,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  separator: {
    width: 0.85 * width,
    backgroundColor: '#ddd',
    height: 1,
    alignSelf: 'center',
    marginVertical: width * 0.05,
  },
  section: {
    paddingHorizontal: width * 0.07,
    paddingVertical: width * 0.04,
  },
  sectionTitle: {
    fontSize: width * 0.055,
    fontWeight: '600',
    color: '#000',
    marginBottom: width * 0.04,
  },
  fieldContainer: {
    marginBottom: width * 0.04,
  },
  label: {
    fontSize: width * 0.042,
    color: '#333',
    marginBottom: width * 0.02,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.03,
  },
  value: {
    fontSize: width * 0.035,
    color: '#000',
  },
});

export default ProfileDisplayScreen;
