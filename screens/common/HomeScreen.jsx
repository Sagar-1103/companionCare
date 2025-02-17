import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Water from '../../components/healthTrack/Water';
import DiebetesComponent from '../../components/DiebetesComponent';
import MedicationnReminderButton from '../../components/MedicationnReminderButton';
import TwachAIButton from '../../components/TwachAIButton';
import SymptomLoggerButton from '../../components/SymptomLoggerButton';
import FallDetectionDemo from '../../testScreens/FallDetectionDemo';
import { useLogin } from '../../context/LoginProvider';

const HomeScreen = () => {
  const {user} = useLogin();
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        {user.role==="patient" && user.caretakerId && <FallDetectionDemo/>}
        <TouchableOpacity>
          <Icon name="wechat" size={40} color="#003366" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.row}>
          <View style={[styles.componentWrapper, {height:'255%', width:'95%', left:'6%'}]}>
            <Water />
          </View>
          <View style={[styles.componentWrapper, {height:'255%', width:'95%', right:'50%'}]}>
            <DiebetesComponent />
          </View>
        </View>
        <View style={[styles.componentWrapper, {height:'190%', left:'5%', bottom:'14%'}]}>
          <MedicationnReminderButton />
        </View>
        <View style={[styles.componentWrapper, {height:'190%', left:'5%', bottom:'150%'}]}>
          <TwachAIButton />
        </View>
        <View style={[styles.componentWrapper, {height:'190%', left:'5%', bottom:'286%'}]}>
          <SymptomLoggerButton />
        </View>
      </ScrollView>

      {/* Floating AI Chatbot Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <MaterialCommunityIcons name="robot-excited" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    left:'45%',
    color:'#000'
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: '150%', // Extra space for floating button
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  componentWrapper: {
    marginBottom: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default HomeScreen;
