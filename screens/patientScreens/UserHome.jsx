import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const UserHome = () => {
  const [serviceStatus, setServiceStatus] = useState(false);
  const navigation = useNavigation();

  // Mock user data (replace with your actual data)
  const user = {
    id: '1',
    name: 'John Doe',
    userHomeCoordinates: [77.5946, 12.9716], 
    contacts: [
      { name: 'Contact 1', phNo: '+1234567890' },
      { name: 'Contact 2', phNo: '+0987654321' },
    ],
  };

  const handleEmergency = () => {
    console.log('Emergency SOS triggered');
    // Add your emergency logic here
  };

  const handleServices = () => {
    setServiceStatus((prev) => !prev);
    console.log(`Services ${serviceStatus ? 'Stopped' : 'Started'}`);
    // Add your service logic here
  };

  return (
    <LinearGradient
      colors={['rgb(170, 170, 170)', 'rgba(255,255,255,1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.3535, 0.9548]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* First Row */}
        <View style={styles.row}>
          <LinearGradient
            colors={['#000', '#555']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity
              onLongPress={handleServices}
              delayLongPress={2000}
              style={styles.touchable}
              onPress={() => navigation.navigate('UserProfilePage')}
            >
              <Icon name="person" size={90} color="#FFF" />
              <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(48,195,242)', 'rgb(0,172,235)', 'rgb(0,149,219)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&destination=${user.userHomeCoordinates[1]},${user.userHomeCoordinates[0]}`
                )
              }
              style={styles.touchable}
            >
              <Icon name="home" size={90} color="#FFF" />
              <Text style={styles.iconText}>Home</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <LinearGradient
            colors={['rgb(208,32,31)', 'rgb(233,108,56)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('MedicineList')}
              style={styles.touchable}
            >
              <FontAwesome5 name="pills" size={90} color="#FFF" />
              <Text style={styles.iconText}>Medicine</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(100,63,153)', 'rgb(110,51,147)', 'rgb(164,62,151)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('ReportsPage')}
              style={styles.touchable}
            >
              <Icon name="health-and-safety" size={90} color="#FFF" />
              <Text style={styles.iconText}>Health</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Third Row */}
        <View style={styles.row}>
          <LinearGradient
            colors={['rgb(91,88,166)', 'rgb(45,54,144)', 'rgb(73,68,115)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${user.contacts[0].phNo}`)}
              style={styles.touchable}
            >
              <Icon name="contacts" size={90} color="#FFF" />
              <Text style={styles.iconText}>{user.contacts[0].name}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['rgb(91,88,166)', 'rgb(45,54,144)', 'rgb(73,68,115)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconBox}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${user.contacts[1].phNo}`)}
              style={styles.touchable}
            >
              <Icon name="contacts" size={90} color="#FFF" />
              <Text style={styles.iconText}>{user.contacts[1].name}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Emergency SOS Button */}
        <LinearGradient
          colors={['rgb(239,70,51)', 'rgb(243,112,97)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rectBox}
        >
          <TouchableOpacity onPress={handleEmergency} style={styles.touchable}>
            <Icon name="warning" size={90} color="#FFF" />
            <Text style={styles.sosText}>Emergency SOS</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconBox: {
    width: '45%',
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectBox: {
    width: '100%',
    height: '20%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: '100%',
    height: '100%',
  },
  iconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
    // marginTop: ,
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default UserHome;