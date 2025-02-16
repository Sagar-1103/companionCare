import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, PanResponder, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient'; // For gradient background
import { useLogin } from '../../context/LoginProvider';
import { BACKEND_URL } from '../../constants/Ports';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const FallDetectionPage = ({navigation}) => {
  const {user} = useLogin();
  // Animation for the "Fall Detected" text
  const textScale = useRef(new Animated.Value(1)).current;

  // Animation for the circles
  const circle1Scale = useRef(new Animated.Value(1)).current;
  const circle1Opacity = useRef(new Animated.Value(1)).current;
  const circle2Scale = useRef(new Animated.Value(1)).current;
  const circle2Opacity = useRef(new Animated.Value(1)).current;
  const circle3Scale = useRef(new Animated.Value(1)).current;
  const circle3Opacity = useRef(new Animated.Value(1)).current;

  // Animation for the icon
  const iconScale = useRef(new Animated.Value(1)).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;

  // Sliding button translation
  const buttonTranslateX = useRef(new Animated.Value(0)).current;
  const [isCancelled, setIsCancelled] = useState(false);

  // Text scaling animation
  useEffect(() => {
    const textAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(textScale, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(textScale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    textAnimation.start();
  }, []);

  // Circle animation
  useEffect(() => {
    const circleAnimation = (scale, opacity) => {
      return Animated.loop(
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 2,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      );
    };

    circleAnimation(circle1Scale, circle1Opacity).start();
    circleAnimation(circle2Scale, circle2Opacity).start();
    circleAnimation(circle3Scale, circle3Opacity).start();
  }, []);

  // Icon animation
  useEffect(() => {
    const iconAnimation = Animated.loop(
      Animated.parallel([
        Animated.timing(iconScale, {
          toValue: 1.5,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 0.5,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    iconAnimation.start();
  }, []);

  // Handle sliding button gesture
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx > 0 && gestureState.dx < width - 140) {
        buttonTranslateX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > width * 0.6) {
        Animated.timing(buttonTranslateX, {
          toValue: width - 100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          handleCancel();
        });
      } else {
        Animated.spring(buttonTranslateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleCancel = async()=>{
    try {
      const url = `${BACKEND_URL}/geolocation/set-fall-status/${user?.id}`;
      const response = await axios.post(url,{fallDetectionStatus:false},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      const res = await response.data;
      if(res.success){
        navigation.navigate("PatientTabNavigation");
      }
      setIsCancelled(true);
      Alert.alert('Fall detection cancelled!');
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  return (
    <LinearGradient
      colors={['#1B62F6','#1E3A8A', '#0A2463']} // Darker gradient of blue
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Title Text */}
        <Animated.Text style={[styles.title, { transform: [{ scale: textScale }] }]}>
          Fall Detected
        </Animated.Text>

        {/* Circles and Icon */}
        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.circle1,
              {
                transform: [{ scale: circle1Scale }],
                opacity: circle1Opacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.circle2,
              {
                transform: [{ scale: circle2Scale }],
                opacity: circle2Opacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.circle3,
              {
                transform: [{ scale: circle3Scale }],
                opacity: circle3Opacity,
              },
            ]}
          />
          {/* Icon in the center of the circles */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: iconScale }],
                // opacity: iconOpacity,
              },
            ]}
          >
            <Icon name="person-falling" size={70} color="#fff" />
          </Animated.View>
        </View>

        {/* Sliding Button */}
        <View style={styles.sliderContainer}>
          <Animated.View
            style={[
              styles.sliderButton,
              { transform: [{ translateX: buttonTranslateX }] },
            ]}
            {...panResponder.panHandlers}
          >
            <MaterialIcon name="cross" size={60} color="#3B82F6" />
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '900',
    color: '#fff', // Black title text
    marginBottom: -40,
    marginTop: 40,
  },
  circleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // White with opacity
  },
  circle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // White with opacity
  },
  circle3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // White with opacity
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    width: width - 36,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: height * 0.65, // Move the button lower down
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sliderButton: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 8, // Add elevation for a fancier look
  },
});

export default FallDetectionPage;