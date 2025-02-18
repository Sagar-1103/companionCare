import axios from 'axios';
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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL, BACKEND_URL_LOCAL } from '../../constants/Ports';

const AiChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      text: newMessage,
      isSent: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    scrollToBottom();

    try {
      const url = `${BACKEND_URL_LOCAL}/ai`
      console.log(url);
      
      const response  = await axios.post(url,{ query: newMessage },{
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const res = await response.data;
      console.log(res);
      
      // const aiResponse = await response.text();

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: res,
        isSent: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      setMessages((prev) => [...prev, { id: 'error', text: 'Error fetching response. Try again.', isSent: false }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.isSent ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={[styles.messageText, item.isSent ? styles.sentMessageText : styles.receivedMessageText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI ChatBot</Text>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={scrollToBottom}
        />

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Enter your message..."
            placeholderTextColor="#666"
            multiline
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="#4BA5D1" style={styles.loader} />
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
  },
  headerTitle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
  chatContainer: { flex: 1 },
  messagesList: { padding: 16, paddingBottom: 32 },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 16,
    marginVertical: 6,
  },
  sentMessage: { backgroundColor: '#4BA5D1', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  receivedMessage: { backgroundColor: '#1A237E', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 16, color: '#fff' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4BA5D1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    marginLeft: 8,
    width: 38,
    height: 38,
    backgroundColor: '#4BA5D1',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: { marginLeft: 10 },
});

export default AiChatScreen;
