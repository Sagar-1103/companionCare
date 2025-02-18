import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import Mapbox, {MapView, Camera, PointAnnotation, ShapeSource, FillLayer} from '@rnmapbox/maps';
import axios from 'axios';
import {BACKEND_URL} from "../../constants/Ports";
import {useLogin} from "../../context/LoginProvider";
import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA',
);

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const LocationScreen = ({navigation}) => {
  const [homeCoordinates, setHomeCoordinates] = useState([0,0]);
  const [userCoordinates, setUserCoordinates] = useState([0,0]);
  const [showRadiusInput, setShowRadiusInput] = useState(false);
  const [safeStatus,setSafeStatus] = useState(true);
  const [radiusValue, setRadiusValue] = useState('');
  const [radius, setRadius] = useState(1);
  const [showCenter,setShowCenter] = useState(null);
  const [services,setServices] = useState(true);
  const [patientLocated,setPatientLocated] = useState(false);
  const [loading,setLoading] = useState(true);

  const [coordinates,setCoordinates] = useState([]);
  const {user} = useLogin();

  const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
              fetchCoordinates();
              // fetchSafeStatus();
              console.log(i);
              await sleep(delay);
        }
    });
};

const options = {
  taskName: 'Geolocation',
  taskTitle: 'Geolocation tracking',
  taskDesc: 'Geolocation tracking',
  taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane',
  parameters: {
      delay: 30000,
  },
};

const showLocNotification = () => {
  PushNotification.localNotification({
    channelId: "Location-alert", 
    title: `Out of safe zone`,
    message: `Patient if outside the safe zone.`,  
    bigText: "Tap this notification to open the map screen.",  
    importance: "high",  
    playSound: true,  
    soundName: "default",  
    actions: ["Confirm"],  
    invokeApp: true,  
    // userInfo: { screen: "LocationScreen" }, 
    // onPress:navigation.navigate("LocationScreen")
  });
};

const handleCenterSubmit = async()=>{
  try {
    const url = `${BACKEND_URL}/geolocation/set-location/${user.patientId}`;
    const response = await axios.post(url,{lon:homeCoordinates[0],lat:homeCoordinates[1],type:"home"},{
      headers:{
         "Content-Type":"application/json"
      }
    });
    const res = await response.data;
    if(res.success){
      if(res.data.geo.homeLocation?.coordinates && res.data.geo.patientLocation?.coordinates && res.data.geo.radius){
        setHomeCoordinates(res.data.geo.homeLocation?.coordinates);
        setUserCoordinates(res.data.geo.patientLocation?.coordinates);
        setRadius(res.data.geo.radius);
        console.log(res.data.geo.homeLocation.coordinates,res.data.geo?.patientLocation?.coordinates,res.data.geo.radius);
      }
      else {
        stopServices();
      }
    }
  } catch (error) {
    console.log("Error : ",error);
  }
  finally {
    setShowCenter(false);
  }
}
const handleRadiusSubmit = async()=>{
  try {
    const url = `${BACKEND_URL}/geolocation/set-radius/${user.patientId}`;
    const response = await axios.post(url,{radius:parseInt(radiusValue)},{
      headers:{
         "Content-Type":"application/json"
      }
    });
    const res = await response.data;
    if(res.success){
      if(res.data.geo.homeLocation.coordinates && res.data.geo.patientLocation.coordinates && res.data.geo.radius){
        setHomeCoordinates(res.data.geo.homeLocation.coordinates);
        setUserCoordinates(res.data.geo.patientLocation.coordinates);
        setRadius(res.data.geo.radius);
        console.log(res.data.geo.homeLocation.coordinates,res.data.geo.patientLocation.coordinates,res.data.geo.radius);
      }
      else {
        stopServices();
      }
    }
  } catch (error) {
    console.log("Error : ",error);
  }
  finally {
    setShowRadiusInput(false);
  }
}

  const fetchCoordinates = async()=>{
    try {
      const url = `${BACKEND_URL}/geolocation/geo-details/${user.patientId}`;
      const response = await axios.get(url);
      const res = await response.data;
      if(res.success){
        if(res.data.geo.homeLocation.coordinates &&  res.data.geo.radius){
          setHomeCoordinates(res.data.geo.homeLocation.coordinates);
          setUserCoordinates(res.data.geo.patientLocation?.coordinates || [0,0]);
          setRadius(res.data.geo.radius);
          console.log(res.data.geo.homeLocation.coordinates,res.data.geo.patientLocation?.coordinates,res.data.geo.radius);
          if(res.data.geo.patientLocation?.coordinates){
            setPatientLocated(true);
            console.log("Fall Detection Status : ",res.data.geo.fallDetectionStatus);
            if(res.data.geo.fallDetectionStatus===true){
              showFallNotification();
              const url = `${BACKEND_URL}/geolocation/set-fall-status/${user?.patientId}`;
              const response1 = await axios.post(url,{fallDetectionStatus:false},{
                headers:{
                  "Content-Type":"application/json"
                }
                 })
                const res1 = await response1.data;
                if(res1.success){
                  console.log("Inverted");
                }
            }
            fetchSafeStatus();
          } else {
            setPatientLocated(false)
          }
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  const showFallNotification = () => {
    PushNotification.localNotification({
      channelId: "Fall-alert", 
      title: `Patient has fallen.`,
      message: `Patient has been falledn down.`,  
      bigText: "Tap this notification to open the map screen.",  
      importance: "high",  
      playSound: true,  
      soundName: "default",  
      actions: ["Confirm"],  
      invokeApp: true,  
      // userInfo: { screen: "LocationScreen" }, 
      // onPress:navigation.navigate("LocationScreen")
    });
  };

  const fetchSafeStatus = async()=>{
    try {
      const url = `${BACKEND_URL}/geolocation/safe-zone-status/${user.patientId}`;
      const response = await axios.get(url);
      const res = await response.data;
      if(res.success){
        console.log(res.data.isInsideSafeZone);
        if (!res.data.isInsideSafeZone) {
          setSafeStatus(false)
          showLocNotification();
          // stopServices();
        }
        else {
          setSafeStatus(true);
        }
      }
    } catch (error) {
      console.log("Error : ",error);
      stopServices();
    }
  }

  const startServices = async()=>{
    try {
      console.log("Started Services");
      await BackgroundService.start(veryIntensiveTask, options);
    } catch (error) {
      console.log("Error : ",error);
    }
  }
  const stopServices = async()=>{
    try {
      console.log("Stopped Services");
      await BackgroundService.stop();
      setServices(false);
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  const drawCircumference = () => {
    const numPoints = 360;
    const points = [];
  
    const radiusMeters = parseFloat(radius) * 1000;
  
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI / 180) * (i * (360 / numPoints));
      const latitude =
        homeCoordinates[1] + (radiusMeters / 111111) * Math.cos(angle);
      const longitude =
        homeCoordinates[0] +
        (radiusMeters / (111111 * Math.cos(homeCoordinates[1] * (Math.PI / 180)))) *
          Math.sin(angle);
      points.push([longitude, latitude]);
    }
    points.push(points[0]);
    setCoordinates(points);
  };
  
  useEffect(()=>{
    startServices();
  },[])

  useEffect(()=>{
    drawCircumference();
  },[radius,homeCoordinates])


  const handleMapPress = event => {
    setHomeCoordinates(event.geometry.coordinates);
  };

  const handleSetRadius = () => {
    setShowRadiusInput(true);
  };

  const handleSetCenter = () => {
    setShowCenter(true);
  };

  if(loading){
    return (
      <View style={styles.containerr}>
        <View style={styles.card}>
          <Text style={styles.title}>Loading</Text>
          <Text style={styles.message}>Loading..</Text>
        </View>
      </View>
    );
  }
  if(!patientLocated){
    return (
      <View style={styles.containerr}>
        <View style={styles.card}>
          <Text style={styles.title}>Patient Not Logged In</Text>
          <Text style={styles.message}>Please ensure the patient is logged in to continue monitoring.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
  <MapView onPress={showCenter && handleMapPress} style={styles.mapBox}>
  <Camera zoomLevel={10} centerCoordinate={homeCoordinates} />
  <PointAnnotation id="home-pin" coordinate={homeCoordinates} />
  <PointAnnotation id="user-pin" coordinate={userCoordinates} />

  {coordinates.length > 0 && (
    <ShapeSource id="circumference" shape={{ type: 'Polygon', coordinates: [coordinates] }}>
      <FillLayer
        id="circleFill"
        style={{
          fillColor: 'rgba(62, 123, 236, 0.3)',
          fillOutlineColor: 'rgb(62, 123, 236)',
        }}
      />
      <Mapbox.LineLayer
        id="circumferenceLayer"
        style={{
          lineWidth: 2,
          lineColor: '#ff0000',
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

      {!showRadiusInput && !showCenter && (
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
        onPress={showRadiusInput && !showCenter ? handleRadiusSubmit :!showRadiusInput && showCenter? handleCenterSubmit:()=>{}}
        style={styles.continueButton}>
        <Text style={styles.continueButtonText}>
          {showRadiusInput && 'Set Radius'}
          {showCenter && 'Set Center'}
          {!showCenter && !showRadiusInput && 'Navigate'}
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
  containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ff4d4f', 
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default LocationScreen;