import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";

const FirstAid = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>First Aid</Text>
      </View>
      <ScrollView>
      {/* Touchable Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => console.log("Basic Steps")}>
        <Icon name="medkit" size={42} color="#000" />
        <Text style={styles.buttonText}>Basic First Aid</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Common Problems")}>
        <Icon name="bandage" size={42} color="#000" />
        <Text style={styles.buttonText}>Common First Aid Scenarios</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Rare Case")}>
        <Fontisto name="doctor" size={42} color="#000" />
        <Text style={styles.buttonText}>Rarer First Aid Cases</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Cuts")}>
        <Fontisto name="surgical-knife" size={42} color="#000" />
        <Text style={styles.buttonText}>First Aid for Cuts</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Burns")}>
      <Fontisto name="fire" size={42} color="#000" />
        <Text style={styles.buttonText}>First Aid for Burns</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Fractures")}>
      <FontAwesome6 name="bone" size={42} color="#000" />
        <Text style={styles.buttonText}>First Aid for Fractures</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Choking")}>
      <FontAwesome6 name="head-side-cough" size={42} color="#000" />
        <Text style={styles.buttonText}>First Aid for Choking</Text>
        <FontAwesome6 name="angle-right" size={32} color="#000" />
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12%',
    marginTop:'5%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingVertical: '6%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: '8%',
    flex: 1,
    color:'#000'
  },
  logoutButton: {
    padding: 20,
    backgroundColor: '#003366',
    borderRadius: 15,
    marginTop: '25%',
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default FirstAid;
