import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatScreen = () => {
  const initialMessages = [
    { id: '1', text: 'Hello!', timestamp: '00:08', isSent: false },
    { id: '2', text: 'Hi', timestamp: '00:08', isSent: true },
    { id: '3', text: "How're you doing?", timestamp: '00:08', isSent: false },
    { id: '4', text: "I'm fine, and you?", timestamp: '00:08', isSent: true },
    { id: '5', text: "I'm cool too! Let's go! Travelling tomorrow? Everybody will be there!", timestamp: '00:08', isSent: false },
    { id: '6', text: "That's would be nice!", timestamp: '00:08', isSent: true },
    { id: '7', text: "I'm in.", timestamp: '00:08', isSent: true },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messageObj = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: '00:08',
      isSent: true,
    };

    setMessages(prevMessages => [...prevMessages, messageObj]);
    setNewMessage('');
    setTimeout(scrollToBottom, 100);
  };

  const handlePlusButton = () => {
    console.log('Plus button pressed');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.isSent ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={[
        styles.messageText,
        item.isSent ? styles.sentMessageText : styles.receivedMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={[
        styles.timestamp,
        item.isSent ? styles.sentTimestamp : styles.receivedTimestamp
      ]}>
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contact Name</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You have no messages with this contact. Take an initiative and write first
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
          />
        )}
        
        <View style={styles.inputContainer}>
          
          <TextInput
            style={[
              styles.input,
              isInputFocused && styles.inputFocused
            ]}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Enter your message"
            placeholderTextColor="#666"
            multiline
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <TouchableOpacity 
            style={styles.plusButton}
            onPress={handlePlusButton}
          >
            <Icon name="add" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
  },
  headerTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 32, // Added extra padding at bottom for better scrolling
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15, // Increased padding
    borderRadius: 20,
    marginVertical: 6, // Increased margin between messages
    position: 'relative',
  },
  sentMessage: {
    backgroundColor: '#4BA5D1',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4, // Adjusted corner radius
    marginLeft: '20%', // Added to prevent long messages from touching left side
  },
  receivedMessage: {
    backgroundColor: '#1A237E',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4, // Adjusted corner radius
    marginRight: '20%', // Added to prevent long messages from touching right side
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22, // Added line height for better readability
    marginBottom: 20, // Space for timestamp
  },
  sentMessageText: {
    color: '#fff',
  },
  receivedMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 11,
    position: 'absolute',
    bottom: 8,
    right: 12,
    opacity: 0.8,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  receivedTimestamp: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingHorizontal: 16, // Added horizontal padding
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4BA5D1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 40,
    color: '#000',
  },
  inputFocused: {
    borderColor: '#4BA5D1',
    borderWidth: 2,
  },
  plusButton: {
    marginHorizontal:4,
    width: 38,
    height: 38,
    backgroundColor: '#4BA5D1',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 38,
    height: 38,
    backgroundColor: '#4BA5D1',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;