import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const FirstAidGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Basic First Aid: The Three Cs, Caring for Common Injuries & More</Text>
      
      <Text style={styles.paragraph}>
        Basic first aid refers to the initial process of assessing and addressing the needs of someone who has been injured or is in physiological distress due to choking, a heart attack, allergic reactions, drugs, or other medical emergencies. Basic first aid allows you to quickly determine a person's physical condition and the correct course of treatment. You should always seek professional medical help as soon as you are able, but following correct first aid procedures can be the difference between life and death. Follow our entire tutorial, or find specific advice by checking out the sections listed above.
      </Text>
      
      <Text style={styles.subtitle}>Things You Should Know</Text>
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>1. </Text>
        Perform the <Text style={styles.highlight}>3 Cs of first aid</Text> before doing any care work—<Text style={styles.highlight}>check your surroundings for safety</Text>, call for help, and then care for the person.
      </Text>
      
      <Text style={styles.paragraph}>
        Check if an unconscious person is responsive or breathing. Give rescue breaths and chest compressions if they’re unresponsive but have a pulse.
      </Text>
      
      <Text style={styles.paragraph}>
        Wear gloves to protect yourself from bloodborne pathogens while treating cuts, scrapes, minor burns, or other injuries.
      </Text>
      
      <Text style={styles.subtitle}>Method 1: Performing the Three Cs</Text>
      
      {/* Image placeholder for "Check the surroundings." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/c/ca/Do-Basic-First-Aid-Step-1-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-1-Version-2.jpg' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>1. </Text>
        <Text style={styles.strong}>Check the surroundings.</Text> Evaluate the situation. Are there things that might put you at risk of harm? Are you or the victim threatened by fire, toxic smoke, gasses, an unstable building, live electrical wires, or another dangerous scenario? Do not rush into a situation where you could end up as a victim yourself. This refers to the D (Danger) in DRABC (Danger, Response, Airways, Breathing, and Circulation).
      </Text>
      
      <Text style={styles.paragraph}>
        If approaching the victim will endanger your life, seek professional help immediately; they have higher levels of training and know-how to handle these situations. First aid becomes useless if you can't safely perform it without hurting yourself.
      </Text>
      
      {/* Image placeholder for "Call for help." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/9/9a/Do-Basic-First-Aid-Step-2-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-2-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>2. </Text>
        <Text style={styles.strong}>Call for help.</Text> Call out for help 3 times before you begin assisting the casualty. If someone is with you or approaches, instruct them to call the authorities and be prepared to relay information to them so they can update the responders. It is not recommended that you leave the casualty unless required, but put them in the recovery position if you need to leave them for any reason.
      </Text>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/9/9b/Do-Basic-First-Aid-Step-3-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-3-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>3. </Text>
        <Text style={styles.strong}>Care for the person..</Text> Caring for someone who has just gone through serious trauma includes both physical treatment and emotional support. Remember to stay calm and try to be reassuring; let the person know that help is on its way and that everything will be alright. Other ways to reassure the casualty include asking for their name, if they know what has happened, and then about their interests.
      </Text>

      <Text style={styles.subtitle}>Method 2: Caring for an Unconscious Person</Text>
      
      {/* Image placeholder for "Check the surroundings." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/1/1c/Do-Basic-First-Aid-Step-4-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-4-Version-2.jpg' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>1. </Text>
        <Text style={styles.strong}>Determine responsiveness.</Text> If a person is unconscious, try to rouse them by speaking to them or by tapping on the shoulder. Do not be afraid to speak loudly or even shout. If they do not respond to activity, sound, touch, or other stimulation, determine whether they are breathing.
      </Text>
      
      
      {/* Image placeholder for "Call for help." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/a/a2/Do-Basic-First-Aid-Step-5-Version-2.jpg/728px-Do-Basic-First-Aid-Step-5-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>2. </Text>
        <Text style={styles.strong}>Check for breathing and a pulse.</Text> If unconscious and unable to be roused, check for breathing: look for a rise in the chest area; listen for the sound of air coming in and out; feel for air using the side of your face. If no signs of breathing are apparent, place two fingers under the chin and gently guide the face pointing upwards to open up their airways. If any debris such as vomit can be seen, it is appropriate to move them onto their side to allow it to get out, which is achieved with the recovery position. Check for a pulse.
      </Text>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/c/c1/Do-Basic-First-Aid-Step-6-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-6-Version-2.jpg' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>3. </Text>
        <Text style={styles.strong}>If the person remains unresponsive and has no pulse, prep for CPR.</Text> Unless you suspect a spinal injury, carefully roll them onto their back and open their airway.[3] If you suspect a spinal injury, leave the person where they are, provided they are breathing.
      </Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Keep the head and neck aligned.</Text>
        <Text style={styles.bullet}>• Carefully roll them onto their back while holding their head.</Text>
        <Text style={styles.bullet}>• Open the airway by lifting the chin.</Text>
      </View>

      <Text style={styles.paragraph}>
        <Text style={styles.step}>4. </Text>
        <Text style={styles.strong}>Give rescue breaths if the person is unresponsive and has a pulse, but isn’t breathing.</Text> Pinch the person’s nostrils and completely cover their mouth with yours. Give a deep breath that lasts 1 second and watch to see if their chest rises. If it does, give them another breath. If they don’t tilt their head and chin again before trying a breath.
      </Text>
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/f/f9/Do-Basic-First-Aid-Step-7-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-7-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>5. </Text>
        <Text style={styles.strong}>Perform 30 chest compressions and two rescue breaths as part of CPR.</Text>In the center of the chest, just below an imaginary line running between the nipples, put your two hands together and compress the chest down approximately 2 inches (5.1 cm) at a rate of 100 compressions per minute (or to the beat of "Staying Alive"). After 30 compressions, give two rescue breaths, done by opening the airways, closing the nose, and fully covering the mouth hole. Then check vitals. If the breaths are blocked, reposition the airway. Make sure the head is tilted slightly back and the tongue is not obstructing it. Continue this cycle of 30 chest compressions and two rescue breaths until someone else relieves you.
      </Text>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/f/f2/Do-Basic-First-Aid-Step-8-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-8-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>6. </Text>
        <Text style={styles.strong}>Remember your ABCs of CPR.</Text> The ABCs of CPR refers to the three critical things you need to look for.[3] Check these three things frequently as you give the person first aid CPR.
      </Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Airway. Does the person have an unobstructed airway?</Text>
        <Text style={styles.bullet}>• Breathing. Is the person breathing?</Text>
        <Text style={styles.bullet}>• Circulation. Does the person show a pulse at major pulse points (wrist, carotid artery, groin)?
        </Text>
      </View>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/f/f2/Do-Basic-First-Aid-Step-9-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-9-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>7. </Text>
        <Text style={styles.strong}>Make sure the person is warm as you wait for medical help.</Text> Drape a towel or a blanket over the person if you have one; if you don't, remove some of your own clothing (such as your coat or jacket) and use it as a cover until medical help arrives. However, if the person has a heatstroke, do not cover him or keep him warm. Instead, try to cool him by fanning him and damping him.
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
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  step: {
    fontWeight: 'bold',
  },
  highlight: {
    color: 'red',
  },
  strong: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  bullets: {
    marginTop: 10,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default FirstAidGuide;
