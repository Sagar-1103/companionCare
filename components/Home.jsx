import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLogin } from '../context/LoginProvider';

const Home = ({ navigation }) => {
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const {user} = useLogin();
  console.log(user);
  
  const handleRoleSelect = (role) => {
    console.log("Selected Role:", role);
    if(user.role==="caretaker"){
    return navigation.navigate("ChatScreen")
    }
    setRoleModalVisible(false);
    return navigation.navigate("PatientChat",{otherUserRole:role})
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => setRoleModalVisible(true)}
        style={styles.chatButton}
      >
        <AntDesign name="wechat" size={24} color="black" />
      </TouchableOpacity>

      {/* Role Selection Modal */}
      <Modal
        transparent={true}
        visible={roleModalVisible}
        animationType="slide"
        onRequestClose={() => setRoleModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Role</Text>
            {user.roomIds.doctorRoomId && <TouchableOpacity style={styles.roleOption} onPress={() => handleRoleSelect('Doctor')}>
              <Text style={styles.roleText}>Doctor</Text>
            </TouchableOpacity>}
            {user.roomIds.caretakerRoomId && <TouchableOpacity style={styles.roleOption} onPress={() => handleRoleSelect('Caretaker')}>
              <Text style={styles.roleText}>Caretaker</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => setRoleModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c3e50' },
  chatButton: { backgroundColor: 'powderblue', padding: 12, borderRadius: 20, position: "absolute", right: 10, bottom: 20 },
  
  // Modal Styles
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  roleOption: { padding: 12, marginVertical: 5, backgroundColor: '#ddd', borderRadius: 5, width: '100%', alignItems: 'center' },
  roleText: { fontSize: 16, fontWeight: 'bold' },
  closeButton: { marginTop: 10, padding: 12, backgroundColor: 'red', borderRadius: 5, width: '100%', alignItems: 'center' },
  closeText: { color: 'white', fontWeight: 'bold' }
});

export default Home;
