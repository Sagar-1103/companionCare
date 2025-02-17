import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { CircularProgress } from 'react-native-circular-progress';

const { width } = Dimensions.get('window');

const WaterIntakeScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isDrinking, setIsDrinking] = useState(false);
  const [logs, setLogs] = useState([]); // State to store history logs
  const totalMl = 3000; // Update the total progress to 3000mL

  const handleDrink = () => {
    setIsDrinking(true);
    setProgress((prev) => Math.min(prev + 300, totalMl)); // Increment by 300mL

    // Add a new log entry
    const newLog = {
      id: Date.now(), // Unique ID for the log
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Time in hr:min format
      amount: '300mL', // Amount of water consumed
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]); // Add the new log to the beginning of the logs array

    setTimeout(() => setIsDrinking(false), 1000); // Simulate drinking action
  };

  const progressPercentage = (progress / totalMl) * 100;

  // Responsive sizes
  const circleSize = width * 0.4; // 40% of screen width
  const buttonWidth = width * 0.44; // 70% of screen width to make it smaller
  const fontSizeSmall = width * 0.035; // 4% of screen width
  const fontSizeMedium = width * 0.055; // 5% of screen width
  const fontSizeLarge = width * 0.075; // 6% of screen width

  return (
    <View style={styles.container}>
      {/* Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontSize: fontSizeLarge }]}>Water Intake</Text>
      </View>

      {/* Progress Circle Container */}
      <View style={styles.progressWrapper}>
        <CircularProgress
          size={circleSize}
          width={15}
          fill={progressPercentage}
          tintColor="#0088ff"
          backgroundColor="#e0e0e0"
          rotation={0}
          lineCap="round"
        >
          {(fill) => (
            <View style={styles.circleContent}>
              {/* Water Glass Image */}
              <Image
                source={require('../assets/water-drink.png')} // Replace with your image path
                style={styles.waterGlassImage}
              />
            </View>
          )}
        </CircularProgress>

        {/* Water intake count */}
        <Text style={[styles.progressText, { fontSize: fontSizeMedium }]}>
          {progress} / {totalMl} mL
        </Text>

        {/* Drink Button */}
        <TouchableOpacity
          style={[styles.drinkButton, { width: buttonWidth }, isDrinking && styles.drinkingButton]}
          onPress={handleDrink}
          disabled={isDrinking}
        >
          <Text
            style={[
              styles.drinkButtonText,
              { fontSize: fontSizeMedium },
              isDrinking && styles.drinkingButtonText,
            ]}
          >
            {isDrinking ? 'Drinking...' : 'Drink (300mL)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* History Section */}
      <View style={styles.historyWrapper}>
        <Text style={[styles.historyTitle, { fontSize: fontSizeMedium }]}>History</Text>
        <View style={{ width: width * 0.7, backgroundColor: '#ddd', height: width * 0.003 }}></View>

        {/* History Logs */}
        <ScrollView>
          {logs.map((log) => (
            <View key={log.id} style={styles.waterLogContainer}>
              <FontAwesome6 name="glass-water" size={32} color="#0077ff" />
              <View style={styles.logTextContainer}>
                <Text style={[styles.waterLogText, { fontSize: fontSizeSmall }]}>Water</Text>
                <Text style={[styles.waterLogTime, { fontSize: fontSizeSmall }]}>{log.time}</Text>
              </View>
              <Text style={[styles.waterLogAmount, { fontSize: fontSizeSmall }]}>{log.amount}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.1, // 5% of screen width
    backgroundColor: '#f7f7f7', // Lighter shade of gray for background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05, // 5% of screen width
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: width * 0.05, // 5% of screen width
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  progressWrapper: {
    backgroundColor: '#fff',
    padding: width * 0.1, // 5% of screen width
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: width * 0.07, // 7% of screen width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  circleContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterGlassImage: {
    width: width * 0.2, // 20% of screen width
    height: width * 0.2, // 20% of screen width
    resizeMode: 'contain',
    marginBottom: width * 0.02, // 2% of screen width
  },
  progressText: {
    fontWeight: 'bold',
    marginTop: width * 0.04, // Add a small gap between the circle and text
    marginBottom: width * 0.04, // Add a small gap between the circle and text
    color: '#000',
  },
  drinkButton: {
    backgroundColor: '#0088ff',
    padding: width * 0.03, // Reduced padding to make the button smaller
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  drinkingButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0088ff',
  },
  drinkingButtonText: {
    color: '#0088ff', // Blue text when drinking
  },
  drinkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  historyWrapper: {
    backgroundColor: '#fff',
    padding: width * 0.05, // 5% of screen width
    borderRadius: 15,
    marginTop: width * 0.0001, // 7% of screen width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flex: 1, // Allow the history section to take remaining space
  },
  historyTitle: {
    fontWeight: 'bold',
    marginBottom: width * 0.03, // 3% of screen width
    color: '#000',
  },
  waterLogContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.03, // 2% of screen width
    marginTop: width * 0.03, // 2% of screen width
    justifyContent: 'space-between',
  },
  logTextContainer: {
    flex: 1,
    marginLeft: width * 0.04, // 2% of screen width
  },
  waterLogText: {
    color: '#000',
    fontWeight: 'bold',
  },
  waterLogTime: {
    color: '#888',
  },
  waterLogAmount: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default WaterIntakeScreen;