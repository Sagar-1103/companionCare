import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useLogin } from '../context/LoginProvider';
import { BACKEND_URL } from '../constants/Ports';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const { user,setUser } = useLogin();
  
  const handleRoleSelect = (role) => {
    console.log("Selected Role:", role);
    if (user.role === "caretaker") {
      navigation.navigate("ChatScreen");
    } else {
      navigation.navigate("PatientChat", { otherUserRole: role });
    }
    setRoleModalVisible(false);
  };

  const fetchUser = async()=>{
    try {
      let url;
      if(user.role==="patient"){
        url = `${BACKEND_URL}/users/current-patient/${user.id}`;
      }
      else {
        url = `${BACKEND_URL}/users/current-caretaker/${user.id}`;
      }
      const response = await axios.get(url);
      const res = await response.data;
      if(user.role==="patient"){
        setUser(res.data.patient);
        await AsyncStorage.setItem('user',JSON.stringify(res.data.patient));
      } else {
        setUser(res.data.caretaker);
        await AsyncStorage.setItem('user',JSON.stringify(res.data.caretaker));
      }
      console.log("000");
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <View style={styles.container}>
      {/* Chat Button */}
      <TouchableOpacity onPress={user.role==="patient"?() => setRoleModalVisible(true):() => handleRoleSelect('Patient')} style={styles.chatButton}>
        <AntDesign name="wechat" size={24} color="black" />
      </TouchableOpacity>

      {/* Role Selection Modal */}
      <Modal
        transparent={true}
        visible={roleModalVisible}
        animationType="fade"
        onRequestClose={() => setRoleModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setRoleModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choose a Role</Text>

              {user.roomIds?.doctorRoomId && (
                <TouchableOpacity style={styles.roleOption} onPress={() => handleRoleSelect('Doctor')}>
                    <Text style={styles.roleText}>Doctor</Text>
                </TouchableOpacity>
              )}

              {user.roomIds?.caretakerRoomId && (
                <TouchableOpacity style={styles.roleOption} onPress={() => handleRoleSelect('Caretaker')}>
                    <Text style={styles.roleText}>Caretaker</Text>
                </TouchableOpacity>
              )}

              {user.role==="caretaker" &&  user.roomId && (
                <TouchableOpacity style={styles.roleOption} onPress={() => handleRoleSelect('Patient')}>
                    <Text style={styles.roleText}>Patient</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => setRoleModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c3e50' },

  // Chat Button
  chatButton: { 
    backgroundColor: 'powderblue', 
    padding: 12, 
    borderRadius: 20, 
    position: "absolute", 
    right: 10, 
    bottom: 20 
  },

  // Modal Styles
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.6)' 
  },

  modalContent: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    width: '85%', 
    alignItems: 'center', 
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5 
  },

  modalTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: '#333' 
  },

  // Role Option Button
  roleOption: { 
    marginBottom: 10, 
    padding: 12, 
    borderRadius: 10,
    backgroundColor:"powderblue",
    alignItems: 'center', 
    width: '100%' 
  },

  gradientButton: { 
    padding: 12, 
    borderRadius: 10,
    backgroundColor:"powderblue",
    alignItems: 'center', 
    width: '100%' 
  },

  roleText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'white' 
  },

  // Close Button
  closeButton: { 
    marginTop: 10, 
    padding: 12, 
    backgroundColor: '#d9534f', 
    borderRadius: 10, 
    width: '100%', 
    alignItems: 'center' 
  },

  closeText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});

export default Home;
