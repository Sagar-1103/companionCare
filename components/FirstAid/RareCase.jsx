import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const RareCase = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Treating Rarer Cases in First Aid Scenarios</Text>
      
      
      
      {/* Image placeholder for "Check the surroundings." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/3/34/Do-Basic-First-Aid-Step-19-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-19-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>1. </Text>
        <Text style={styles.strong}>Help someone who is having a seizure.</Text>
      </Text>
      
      <Text style={styles.paragraph}>
      Seizures can be scary things for people who've never experienced them before. Luckily, helping people with seizures is relatively straightforward.
      </Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Clear the surroundings to protect the person from hurting themselves.</Text>
        <Text style={styles.bullet}>• Activate emergency medical services if the seizure lasts more than 5 minutes or if the person is not breathing afterward.</Text>
        <Text style={styles.bullet}>• After the episode has ended, help them to the floor and put something soft or flat under their head. Turn them onto their side to ease breathing, but do not hold the person down or try to stop their movements.</Text>
        <Text style={styles.bullet}>• Be friendly and reassuring as their consciousness returns and do not offer food or water until fully alert.</Text>
      </View>
      
      {/* Image placeholder for "Call for help." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/f/fa/Do-Basic-First-Aid-Step-20-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-20-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>2. </Text>
        <Text style={styles.strong}>
        Help someone survive a heart attack.</Text> It helps to know the symptoms of heart attack, which can include rapid heartbeat, pressure or pain in the chest, throat or even pain in the armpit, and general unease, sweating, or nausea. Rush the person to the hospital immediately while giving them an aspirin or a nitroglycerin, which the person should chew.
      </Text>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/5/50/Do-Basic-First-Aid-Step-21.jpg/v4-728px-Do-Basic-First-Aid-Step-21.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>3. </Text>
        <Text style={styles.strong}>Identify someone having a stroke.</Text> Again, knowing the symptoms of stroke is important. They include temporary inability to talk or understand what is being said; confusion; loss of balance or dizziness; unable to raise their arms and severe headache with no precursor, among others. Rush a person you suspect has had a stroke to the emergency room immediately.

      </Text>
      
      {/* Image placeholder for "Check the surroundings." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/c/cd/Do-Basic-First-Aid-Step-22.jpg/v4-728px-Do-Basic-First-Aid-Step-22.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>4. </Text>
        <Text style={styles.strong}>Treat poisoning.</Text> Poisoning can occur as a result of natural toxins (i.e. snake bite) or chemical combinations. If an animal may be responsible for poisoning, try to (safely) kill it, bag it, and bring it with you to poison control.
      </Text>
     
    <Text style={styles.endline}>
            Saksham Thakur
          </Text>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'rgb(0, 87, 158)',
      },
      subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: 'rgb(0, 87, 158)',
      },
      paragraph: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000'
      },
      step: {
        fontWeight: 'bold',
        color: 'rgb(0, 87, 158)',
      },
      highlight: {
        color: 'red',
      },
      strong: {
        fontWeight: 'bold',
        color: 'rgb(0, 87, 158)',
      },
      image: {
        width: '100%',
        height: 250,
        marginBottom: 10,
        marginTop: 20,
        borderTopWidth: 5,
        borderColor: '#000',
        paddingTop: 10
      },
      bullets: {
        marginTop: 10,
        marginBottom: 10,
      },
      bullet: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000'
      },
      endline: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff'
      }
    });

export default RareCase;
