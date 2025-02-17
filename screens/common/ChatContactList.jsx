import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ChatContactsList = () => {
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([
    { id: '1', name: 'John Doe', avatar: 'https://picsum.photos/800' },
    { id: '2', name: 'Jane Smith', avatar: 'https://picsum.photos/800' },
    // { id: '3', name: 'Alice Brown', avatar: 'https://picsum.photos/800' },
    // { id: '4', name: 'Michael Johnson', avatar: 'https://picsum.photos/800' },
    // { id: '5', name: 'Emma Wilson', avatar: 'https://picsum.photos/800' },
    // { id: '6', name: 'David Miller', avatar: 'https://picsum.photos/800' },
    // { id: '7', name: 'Sophia Davis', avatar: 'https://picsum.photos/800' },
    // { id: '8', name: 'James Anderson', avatar: 'https://picsum.photos/800' },
  ]);

  // Filter contacts based on searchText
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderContact = ({ item }) => (
    <TouchableOpacity style={styles.contactItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
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
