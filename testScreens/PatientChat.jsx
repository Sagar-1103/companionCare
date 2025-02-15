import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLogin } from "../context/LoginProvider";
import { BACKEND_URL } from "../constants/Ports";
import axios from "axios";
import ImagePicker from "react-native-image-crop-picker";
import { Picker } from "@react-native-picker/picker";

const PatientChat = ({ route }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const { user } = useLogin();
  const {otherUserRole } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRole, setSelectedRole] = useState(user.role); 
  const drops = [];

  const userId = user.id;
  const roomId = otherUserRole === "Caretaker"? user.roomIds?.caretakerRoomId : user.roomIds?.doctorRoomId;
  const handleUpload = async () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      }).then((image) => {
        handleImageUpload(image);
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleImageUpload = (image) => {
    if (image) {
      if (!ws || !authenticated) return;
      const message = {
        type: "MESSAGE",
        roomId,
        senderId: userId,
        image: `data:${image.mime};base64,${image.data}`,
        messageType: "image",
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
        const chats = res.data.chats.map((chat) => ({
          senderId: chat.senderId,
          message: chat.message,
          messageType: chat.messageType,
          timestamp: chat.createdAt,
        }));
        setMessages(chats);
      } catch (error) {
        console.error("Error fetching previous chats:", error);
      }
    };

    fetchPreviousChats();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(`ws://sagar-shirgaonkar.xyz:8080`);
    socket.onopen = () => {
      console.log("Connected to WebSocket");
      socket.send(
        JSON.stringify({
          type: "AUTH",
          userId: userId,
          roomId,
        })
      );
      setAuthenticated(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error("WebSocket Error:", data.error);
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      setAuthenticated(false);
    };

    setWs(socket);
    return () => {
      console.log("Closing previous WebSocket");
      socket.close();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!ws || !authenticated || input.trim() === "") return;

    const message = {
      type: "MESSAGE",
      roomId,
      senderId: userId,
      message: input,
      messageType: "text",
    };

    ws.send(JSON.stringify(message));
    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headTitle}>Chat</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.senderId === userId ? styles.sentBubble : styles.receivedBubble,
            ]}
          >
            {item.messageType === "image" ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(item.message);
                  setModalVisible(true);
                }}
              >
                <Image source={{ uri: item.message }} style={styles.image} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.messageText}>{item.message}</Text>
            )}
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={"black"}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleUpload} style={styles.fileButton}>
          <Ionicons name="attach" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingHorizontal: "5%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: 10,
  },
  headTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },
  picker: { width: 150, color: "black",backgroundColor:"powderblue",borderRadius:50 },
  messageBubble: { maxWidth: "80%", padding: 10, borderRadius: 18, marginVertical: 5 },
  sentBubble: { alignSelf: "flex-end", backgroundColor: "green" },
  receivedBubble: { alignSelf: "flex-start", backgroundColor: "gray" },
  messageText: { color: "white", fontSize: 16 },
  timestamp: { fontSize: 12, color: "#ccc", marginTop: 5, alignSelf: "flex-end" },
  image: { width: 150, height: 150, borderRadius: 10, marginTop: 5 },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  input: { flex: 1, fontSize: 16, padding: 10, backgroundColor: "#F0F0F0", borderRadius: 25 },
  fileButton: { padding: 10, marginHorizontal: 5 },
  sendButton: { backgroundColor: "green", padding: 10, borderRadius: 50 },
});

export default PatientChat;
