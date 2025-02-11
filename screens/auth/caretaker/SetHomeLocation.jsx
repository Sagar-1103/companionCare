import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons from react-native-vector-icons
import debounce from 'lodash.debounce';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA',
);

const SetHomeLocation = ({ navigation }) => {
  const [tempLocation, setTempLocation] = useState('');
  const [coordinates, setCoordinates] = useState([75, 15]);
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async (text) => {
    const accessToken =
      'pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA';
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          text,
        )}.json?autocomplete=true&access_token=${accessToken}`,
      );
      const data = await response.json();
      if (data.features) {
        setRecommendations(
          data.features.map((feature) => ({
            name: feature.place_name,
            coordinates: feature.center,
          })),
        );
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleMapPress = (event) => {
    setCoordinates(event.geometry.coordinates);
  };

  const debouncedFetchRecommendations = debounce(async (text) => {
    await fetchRecommendations(text);
  }, 3000);

  const handleSelectRecommendation = (item) => {
    setTempLocation(item.name);
    setCoordinates(item.coordinates);
    setRecommendations([]);
  };

  const handleSubmit = () => {
    if (!coordinates) {
      Alert.alert('Error', 'Please select a valid location.');
      return;
    }
    navigation.navigate('SetSpeedDial');
  };

  const handleInputChange = (text) => {
    setTempLocation(text);
    if (text.trim() !== '') {
      debouncedFetchRecommendations(text);
    } else {
      setRecommendations([]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Set Home Location</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Search"
          value={tempLocation}
          onChangeText={handleInputChange}
        />
      </View>

      {recommendations.length > 0 && (
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          style={styles.recommendationList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recommendationItem}
              onPress={() => handleSelectRecommendation(item)}>
              <Text style={styles.recommendationText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.mapContainer}>
        <MapView onPress={handleMapPress} style={styles.mapBox}>
          <Camera zoomLevel={10} centerCoordinate={coordinates} />
          <PointAnnotation id="pin" coordinate={coordinates} />
        </MapView>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '12%',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    borderWidth: 1,
    backgroundColor: 'rgb(248, 250, 250)',
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 15,
    paddingVertical: '0.2%',
  },
  recommendationList: {
    position: 'absolute',
    top: '32%',
    left: '15%',
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgb(212, 209, 209)',
    borderRadius: 10,
    zIndex: 100,
    maxHeight: 150,
  },
  recommendationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(212, 209, 209)',
  },
  recommendationText: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    flex: 1,
    color: '#888',
    fontSize: 17,
  },
  inputIcon: {
    marginHorizontal: '4%',
  },
  title: {
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    top: '3.5%',
    left: '20%',
    fontWeight: 'bold',
  },
  backContainer: {
    height: '8%',
    top: '7%',
    width: '50%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-8%',
    marginBottom: '15%',
  },
  mapContainer: {
    height: '60%',
    width: '100%',
    borderRadius: 22,
  },
  mapBox: {
    height: '100%',
    width: '100%',
    zIndex: 10,
    borderRadius: 22,
  },
  signInButton: {
    backgroundColor: '#001f3f',
    padding: '6%',
    borderRadius: 32,
    marginTop: '4%',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
});

export default SetHomeLocation;