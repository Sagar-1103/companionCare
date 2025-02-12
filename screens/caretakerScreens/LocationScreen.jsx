import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import Mapbox, {MapView, Camera, PointAnnotation, ShapeSource, FillLayer} from '@rnmapbox/maps';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA',
);

const LocationScreen = () => {
  const [coordinates, setCoordinates] = useState([75, 15]);
  const [showRadiusInput, setShowRadiusInput] = useState(false);
  const [radiusValue, setRadiusValue] = useState('');
  const [radius, setRadius] = useState(null);

  const handleMapPress = event => {
    setCoordinates(event.geometry.coordinates);
  };

  const handleSetRadius = () => {
    setShowRadiusInput(true);
  };

  const handleSetCenter = () => {
    console.log('Set Center clicked');
  };

  const handleRadiusSubmit = () => {
    if (radiusValue) {
      setRadius(parseFloat(radiusValue));
      setShowRadiusInput(false);
      setRadiusValue('');
    }
  };

  const circleGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
        properties: {
          radius: radius,
        },
      },
    ],
  };

  return (
    <View style={styles.container}>
      <MapView onPress={handleMapPress} style={styles.mapBox}>
        <Camera zoomLevel={10} centerCoordinate={coordinates} />
        <PointAnnotation id="pin" coordinate={coordinates} />

        {radius && (
          <ShapeSource id="circleSource" shape={circleGeoJSON}>
            <FillLayer
              id="circleFill"
              style={{
                fillColor: 'rgba(62, 123, 236, 0.3)',
                fillOutlineColor: 'rgb(62, 123, 236)',
              }}
            />
          </ShapeSource>
        )}
      </MapView>

      {showRadiusInput && (
        <View style={styles.radiusInputContainer}>
          <TextInput
            style={styles.radiusInput}
            placeholder="Enter radius value (in meters)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={radiusValue}
            onChangeText={setRadiusValue}
          />
        </View>
      )}

      {!showRadiusInput && (
        <View style={styles.topRightButtons}>
          <TouchableOpacity
            onPress={handleSetRadius}
            style={[styles.actionButton, {backgroundColor: 'rgb(62, 123, 236)'}]}>
            <Text style={styles.actionButtonText}>Set Radius</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSetCenter}
            style={[styles.actionButton, {backgroundColor: 'rgb(57, 197, 57)'}]}>
            <Text style={styles.actionButtonText}>Set Center</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={showRadiusInput ? handleRadiusSubmit : () => {}}
        style={styles.continueButton}>
        <Text style={styles.continueButtonText}>
          {showRadiusInput ? 'Set Radius' : 'Navigate'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapBox: {
    flex: 1,
  },
  topRightButtons: {
    position: 'absolute',
    top: '4%',
    right: '5%',
    alignItems: 'flex-end',
  },
  actionButton: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    width: 120,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    position: 'absolute',
    bottom: '10%',
    left: '8%',
    right: '8%',
    backgroundColor: '#0d133e',
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  radiusInputContainer: {
    position: 'absolute',
    top: '4%',
    left: '5%',
    right: '5%',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  radiusInput: {
    fontSize: 16,
    color: '#000',
  },
});

export default LocationScreen;