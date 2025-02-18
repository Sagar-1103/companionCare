import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const CommonProb = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Treating Common Problems In First Aid Scenarios</Text>
      
      
      
      {/* Image placeholder for "Check the surroundings." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/2/24/Do-Basic-First-Aid-Step-11-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-11-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>1. </Text>
        <Text style={styles.strong}>
      </Text>
      
      <Text style={styles.paragraph}>
      Protect yourself from bloodborne pathogens.</Text> Bloodborne pathogens can threaten your health and wellbeing by causing sickness and disease. If you have a first aid kit, sanitize your hands and put on sterile gloves. If sterile gloves and sanitizer are not available, protect your hands with extra gauze or cotton. Avoid direct contact with the other person's blood. If you do end up making contact, make sure to clean yourself off as soon as possible. Eliminate any remaining sources of contamination.
      </Text>
      
      {/* Image placeholder for "Call for help." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/1/13/Do-Basic-First-Aid-Step-12-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-12-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>2. </Text>
        <Text style={styles.strong}>
        Stop the bleeding first.</Text> After you have established that the victim is breathing and has a pulse, your next priority should be to control any bleeding. Control of bleeding is one of the most important things you can do to save a trauma victim. Use direct pressure on a wound before trying any other method of managing to bleed. Read the linked article for more detailed steps you can take.
      </Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Treat a bullet wound. Bullet wounds are serious and unpredictable. Read on for special considerations when treating someone who has suffered a gunshot wound.</Text>
      </View>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/b/b8/Do-Basic-First-Aid-Step-13-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-13-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>3. </Text>
        <Text style={styles.strong}>Treat shock next</Text> Shock, often caused by a loss of blood flow to the body, frequently follows physical and occasionally psychological trauma. A person in shock will frequently have cool, clammy skin, be agitated or have an altered mental status, and have pale color to the skin around the face and lips. Untreated, shock can be fatal. Anyone who has suffered a severe injury or life-threatening situation is at risk for shock.

      </Text>
      
      {/* Image placeholder for "Check the surroundings." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/2/21/Do-Basic-First-Aid-Step-14-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-14-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>4. </Text>
        <Text style={styles.strong}>Provide first aid for a broken bone.</Text> A broken bone, however common, can be treated with the following steps:
      </Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Immobilize the area. Make sure that the broken bone doesn't have to move or support any other body parts.</Text>
        <Text style={styles.bullet}>• Numb the pain. Often, this can be done with an ice pack covered by a towel.</Text>
        <Text style={styles.bullet}>• Make a splint. A bundle of newspapers and sturdy tape will do just the trick. A broken finger, for example, can also use another finger as a stabilizing splint.</Text>
        <Text style={styles.bullet}>• Make a sling, if necessary. Tie a shirt or a pillowcase around a broken arm and then around the shoulder.</Text>
      </View>
      
      
      {/* Image placeholder for "Call for help." */}
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/b/b1/Do-Basic-First-Aid-Step-15-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-15-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>5. </Text>
        <Text style={styles.strong}>Help a choking victim.</Text> Choking can cause death or permanent brain damage within minutes. Read this article for ways to help a choking victim. The article addresses helping both children and adult choking victims.
      </Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• One of the ways to help a choking victim is the Heimlich maneuver. The Heimlich maneuver is performed by straddling the victim from behind and bear-hugging them with your hands interlocked above their belly button but beneath their breastbone. Thrust upward to expel air from the lungs and repeat until you are successful in clearing the object from the windpipe.</Text>
      </View>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/f/f7/Do-Basic-First-Aid-Step-16-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-16-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>6. </Text>
        <Text style={styles.strong}>Learn how to treat a burn.</Text> Treat first- and second-degree burns by immersing or flushing with cool water for at least 10 minutes (no ice). Don't use creams, butter, or other ointments, and do not pop blisters. Third-degree burns should be covered with a damp cloth. Remove clothing and jewelry from the burn, but do not try to remove charred clothing that is stuck to burns.
      </Text>

      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/f/fb/Do-Basic-First-Aid-Step-17-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-17-Version-2.jpg.webp' }} 
        style={styles.image} 
      />

      <Text style={styles.paragraph}>
        <Text style={styles.step}>7. </Text>
        <Text style={styles.strong}>Look out for a concussion.</Text> If the victim has suffered a blow to the head, look for signs of concussion. Common symptoms include:
      </Text>
      
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Loss of consciousness following the injury</Text>
        <Text style={styles.bullet}>• Disorientation or memory impairment</Text>
        <Text style={styles.bullet}>• Vertigo</Text>
        <Text style={styles.bullet}>• Nausea</Text>
        <Text style={styles.bullet}>• Lethargy</Text>
        <Text style={styles.bullet}>• loss of memory of recent events(short terms memories)</Text>
      </View>
      <Image 
        source={{ uri: 'https://www.wikihow.com/images/thumb/0/03/Do-Basic-First-Aid-Step-18-Version-2.jpg/v4-728px-Do-Basic-First-Aid-Step-18-Version-2.jpg.webp' }} 
        style={styles.image} 
      />
      
      <Text style={styles.paragraph}>
        <Text style={styles.step}>8. </Text>
        <Text style={styles.strong}>Treat a Spinal Injury Victim.</Text>If you suspect a spinal injury, it is especially critical that you not move the victim's head, neck, or back unless they are in immediate danger. You also need to take special care when performing rescue breathing or CPR. Read this article to learn what to do.
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

export default CommonProb;
