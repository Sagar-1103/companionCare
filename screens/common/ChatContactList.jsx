import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { BACKEND_URL } from '../../constants/Ports';
import { useLogin } from '../../context/LoginProvider';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatContactsList = () => {
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();
  const {user,setUser} = useLogin();

  useEffect(()=>{
    fetchSelf();
    fetchUsers();
  },[])

  const fetchSelf = async()=>{
    try {
      if(user.role==="patient"){
        const url =`${BACKEND_URL}/users/current-patient/${user.id}`;
        const response = await axios.get(url);
        const res = await response.data;
        setUser(res.data.patient);
        await AsyncStorage.setItem('user',JSON.stringify(res.data.patient));
      }
      if(user.role==="caretaker"){
        const url =`${BACKEND_URL}/users/current-caretaker/${user.id}`;
        const response = await axios.get(url);
        const res = await response.data;
        setUser(res.data.caretaker);
        await AsyncStorage.setItem('user',JSON.stringify(res.data.caretaker));
      }
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  const fetchUsers = async()=>{
    try {
      const cont = [];
      if (user.role==="caretaker") {
        const url = `${BACKEND_URL}/users/current-patient/${user.patientId}`;
        const response = await axios.get(url);
        const res = await response.data;
        cont.push(res.data.patient);
      }
      if (user.role==="patient") {
        if(user?.roomIds){
          if(user.roomIds?.caretakerRoomId){
            const url = `${BACKEND_URL}/users/current-caretaker/${user.caretakerId}`;
            const response = await axios.get(url);
            const res = await response.data;
            cont.push(res.data.caretaker);
          }
          if(user.roomIds?.doctorRoomId){
            const url = `${BACKEND_URL}/users/current-doctor/${user.doctorId}`;
            const response = await axios.get(url);
            const res = await response.data;
            cont.push(res.data.doctor);
          }
        }
      }
      setContacts(cont);
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  // Filter contacts based on searchText
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderContact = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate("ChatScreen",{role:item.role,name:item.name})} style={styles.contactItem}>
      <Image source={{ uri: `https://picsum.photos/800` }} style={styles.avatar} />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chat</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name='search' size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Contact"
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
      </View>

      {/* Contacts List */}
      <FlatList
        data={filteredContacts}
        renderItem={renderContact}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No contacts found</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 12
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddeeee',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default ChatContactsList;
