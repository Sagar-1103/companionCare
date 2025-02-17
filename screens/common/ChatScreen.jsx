import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLogin} from '../../context/LoginProvider';
import {BACKEND_URL} from '../../constants/Ports';
import axios from 'axios';
import ImageCropPicker from 'react-native-image-crop-picker';
import Ionicons from "react-native-vector-icons/Ionicons";


const ChatScreen = ({route}) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const flatListRef = useRef(null);
  const {user} = useLogin();
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {role,name} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const userId = user.id;
  let roomId;
  if (user.role === 'caretaker') {
    roomId = user.roomId;
  }
  if (user.role === 'patient') {
    roomId = role === 'caretaker' ? user.roomIds.caretakerRoomId : user.roomIds.doctorRoomId;
  }

  const handleUpload = async () => {
    try {
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      }).then(image => {
        handleImageUpload(image);
      });
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const handleImageUpload = image => {
    if (image) {
      if (!ws || !authenticated) return;
      const message = {
        type: 'MESSAGE',
        roomId,
        senderId: userId,
        image: `data:${image.mime};base64,${image.data}`,
        messageType: 'image',
      };
      ws.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    if (!roomId) return;

    const fetchPreviousChats = async () => {
      try {
        const url = `${BACKEND_URL}/chats/${roomId}`;
        const response = await axios.get(url);
        const res = await response.data;
        const chats = res.data.chats.map(chat => ({
          senderId: chat.senderId,
          message: chat.message,
          messageType: chat.messageType,
          timestamp: chat.createdAt,
        }));
        setMessages(chats);
      } catch (error) {
        console.error('Error fetching previous chats:', error);
      }
    };

    fetchPreviousChats();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(`ws://sagar-shirgaonkar.xyz:8080`);
    socket.onopen = () => {
      console.log('Connected to WebSocket');
      socket.send(
        JSON.stringify({
          type: 'AUTH',
          userId: userId,
          roomId,
        }),
      );
      setAuthenticated(true);
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error('WebSocket Error:', data.error);
      } else {
        setMessages(prev => [...prev, data]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
      setAuthenticated(false);
    };

    setWs(socket);
    return () => {
      console.log('Closing previous WebSocket');
      socket.close();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!ws || !authenticated || input.trim() === '') return;

    const message = {
      type: 'MESSAGE',
      roomId,
      senderId: userId,
      message: input,
      messageType: 'text',
    };

    ws.send(JSON.stringify(message));
    setInput('');
  };

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  const renderMessage = ({item}) => {
    const date = new Date(item.timestamp);
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View
        style={[
          styles.messageBubble,
          item.senderId === userId
            ? styles.sentMessage
            : styles.receivedMessage,
        ]}>
        {item.messageType !== "image" ? (
          <Text
            style={[
              styles.messageText,
              item.senderId === userId
                ? styles.sentMessageText
                : styles.receivedMessageText,
            ]}>
            {item.message}
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(item.message);
              setModalVisible(true);
            }}>
            <Image source={{uri: item.message}} style={styles.image} />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.timestamp,
            item.senderId === userId
              ? styles.sentTimestamp
              : styles.receivedTimestamp,
          ]}>
          {formattedTime}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You have no messages with this contact. Take an initiative and
              write first
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.timestamp}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
          />
        )}

              {/* Full-Screen Image Modal */}
              <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={30} color="white" />
                  </TouchableOpacity>
                  <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
                </View>
              </Modal>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isInputFocused && styles.inputFocused]}
            value={input}
            onChangeText={setInput}
            placeholder="Enter your message"
            placeholderTextColor="#666"
            multiline
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <TouchableOpacity
            style={styles.plusButton}
            onPress={handleUpload}>
            <Icon name="add" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
  image: { width: 150, height: 150, borderRadius: 10, marginTop: 5 },
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
    marginHorizontal: 4,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)', // Darker background for better focus
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreenImage: {
    width: '90%', // Adjusted width to prevent edges from touching screen
    height: '80%', // Prevents image from covering entire screen
    resizeMode: 'contain',
    borderRadius: 12, // Slight rounding for a modern look
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for better visibility
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default ChatScreen;
