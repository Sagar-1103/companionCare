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
import { useNavigation } from '@react-navigation/native';
import MedicationDemo from "../../testScreens/MedicationDemo";
import FirstAidButton from '../../components/FirstAidButton';
const HomeScreen = () => {
  const {user} = useLogin();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        {user.role==="patient" && user.caretakerId && <FallDetectionDemo/>}
        {user.role==="patient" && user.caretakerId && <MedicationDemo/>}
        <TouchableOpacity onPress={()=>navigation.navigate("ChatContactsList")} >
          <Icon name="wechat" size={40} color="#003366" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.row}>
          <View style={[styles.componentWrapper, {height:'230%', width:'95%', left:'6%'}]}>
            <Water />
          </View>
          <View style={[styles.componentWrapper, {height:'230%', width:'95%', right:'48%'}]}>
            <DiebetesComponent />
          </View>
        </View>
        <View style={[styles.componentWrapper, {height:'185%', left:'5%', bottom:'20%'}]}>
          <MedicationnReminderButton />
        </View>
        <View style={[styles.componentWrapper, {height:'185%', left:'5%', bottom:'155%'}]}>
          <TwachAIButton />
        </View>
        <View style={[styles.componentWrapper, {height:'185%', left:'5%', bottom:'290%'}]}>
          <SymptomLoggerButton />
        </View>
        <View style={[styles.componentWrapper, {height:'170%', left:'5%', bottom:'424%'}]}>
          <FirstAidButton />
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
    paddingBottom: '202%', // Extra space for floating button
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
