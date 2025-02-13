import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SymptomsCard from "./SymptomsCard"; 

const logsData = [
  {
    id: "1",
    title: "Headache",
    description: "Mild headache since morning, feels slightly better now.  The pain is a dull throbbing sensation located primarily in the forehead region.  It's accompanied by some sensitivity to light, but no nausea or other symptoms.  I've taken some over-the-counter pain medication, and I'm hoping it will subside soon. I'll continue to monitor the situation and consult a doctor if the pain worsens or persists. I've also been drinking plenty of water and resting to try and alleviate the headache.",
    createdAt: new Date("2024-02-12T08:30:00"),
  },
  {
    id: "2",
    title: "Cough & Cold",
    description: "Started coughing at night, feeling congested.  The cough is dry and hacking, and my chest feels tight. I also have a runny nose with clear mucus.  I've been taking cough drops and drinking warm liquids to soothe my throat.  I'm concerned it might be a cold coming on, so I'll be sure to get plenty of rest and stay hydrated. I'll also monitor my temperature to ensure I don't develop a fever.  Hopefully, this will clear up quickly.",
    createdAt: new Date("2024-02-11T22:15:00"),
  },
  {
    id: "3",
    title: "Fever",
    description: "Body temperature around 101°F, feeling weak.  I have chills and body aches, especially in my muscles.  My head is also throbbing, and I feel generally unwell.  I've taken some fever-reducing medication and am resting in bed.  I'm drinking plenty of fluids to stay hydrated. I'll continue to monitor my temperature and consult a doctor if it doesn't come down within 24 hours or if I develop other concerning symptoms.  I'm also avoiding contact with others to prevent spreading any potential illness.  I'm hoping to feel better soon.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "4",
    title: "Fever",
    description: "Experiencing a persistent fever of 101°F.  This is accompanied by significant body aches and a general feeling of malaise.  I've been taking over-the-counter medication to manage the fever, but it hasn't subsided significantly. I'm also experiencing mild chills and a slight headache.  I'm concerned about the persistence of the fever and will consult a doctor if it continues or worsens. I'm focusing on rest and hydration to support my body's recovery.  I've also been monitoring for any additional symptoms that might develop.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "5",
    title: "Fever",
    description: "My fever continues today, still hovering around 101°F.  The body aches are more pronounced, and I'm feeling quite fatigued.  I've noticed a slight sore throat developing as well.  I'm continuing with the fever medication and am trying home remedies like warm salt water gargles for my throat.  I'm keeping a close eye on my symptoms and will seek medical advice if they don't improve or if new symptoms arise.  Rest remains a top priority, and I'm ensuring I'm drinking enough fluids.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
  {
    id: "6",
    title: "Fever",
    description: "Another day with a fever, although it seems to fluctuate slightly between 100°F and 101°F. The sore throat is a bit more painful, making swallowing difficult.  I'm still experiencing body aches and fatigue.  I've started using lozenges for my sore throat in addition to the gargles.  I'm becoming increasingly concerned about the duration of the fever and will definitely contact my doctor tomorrow if there's no improvement.  I'm making sure to eat light, nourishing foods and stay well-hydrated.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
    {
    id: "7",
    title: "Fever",
    description: "The fever persists, showing no signs of abating. I'm experiencing increased fatigue and a worsening sore throat.  Swallowing is now quite painful, and I'm finding it difficult to eat solid foods.  I'm relying on soft foods and liquids to ensure I get some nutrition.  I've scheduled an appointment with my doctor for tomorrow morning to get a proper diagnosis and treatment plan. I'm concerned about the possibility of a bacterial infection given the persistent fever and sore throat.  I'm continuing to monitor my symptoms closely.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
    {
    id: "8",
    title: "Fever",
    description: "The fever continues unabated, and I'm now experiencing chills along with the persistent 101°F temperature. The sore throat is excruciating, making even sipping liquids a challenge.  My body aches are severe, and I'm finding it difficult to move around.  I'm concerned about dehydration due to the difficulty in swallowing.  I'm anxiously awaiting my doctor's appointment later today.  I'm worried about the possibility of complications given the prolonged fever and severe sore throat. I'm trying to stay as comfortable as possible with rest and gentle pain relief.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
    {
    id: "9",
    title: "Fever",
    description: "The fever finally broke this morning, but I still feel weak and drained.  My sore throat persists, although the pain is slightly less intense.  I'm able to swallow liquids a bit more easily.  I'm still experiencing some body aches, but they are less severe than yesterday.  I'm continuing to rest and hydrate, focusing on recovery. I'm hopeful that I'm on the mend, but I'll continue to monitor my symptoms closely.  I'll follow up with my doctor if the sore throat doesn't improve in the next few days.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
    {
    id: "10",
    title: "Fever",
    description: "While my fever has subsided, I'm still feeling the lingering effects of the illness.  I'm quite weak and tire easily.  My sore throat is slowly improving, but it's still uncomfortable.  I'm able to eat soft foods without much difficulty now.  I'm focusing on getting plenty of sleep and eating nutritious meals to rebuild my strength.  I'm grateful that the fever has broken and I'm starting to feel a bit better. I'm looking forward to a full recovery soon.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
    {
    id: "11",
    title: "Fever",
    description: "I'm continuing to recover from the recent illness.  My energy levels are gradually increasing, and I'm able to resume some light activities.  My sore throat is almost completely gone, and I can eat normally again.  I'm still experiencing some mild body aches, but they are diminishing each day.  I'm feeling much better overall and am optimistic about returning to my normal routine soon. I'm focusing on maintaining a healthy lifestyle to prevent future illnesses.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
    {
    id: "12",
    title: "Fever",
    description: "I'm feeling significantly better today.  My energy levels are back to normal, and I'm no longer experiencing any lingering symptoms.  I'm able to resume all my regular activities without any issues.  I'm grateful for the recovery and am back to my usual routine.  I'm taking preventative measures to maintain my health and well-being.  I'm glad to be feeling healthy and strong again.",
    createdAt: new Date("2024-02-10T18:45:00"),
  },
    {
    id: "13",
    title: "Fever",
    description: "Completely recovered from the illness.  I have no remaining symptoms and feel 100%.  I'm back to my regular exercise routine and am feeling energetic and healthy.  I'm grateful for the care",
    createdAt: new Date("2024-02-10T18:45:00"),  
  } 
];

const LogScreen = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Logs</Text>

      <FlatList
        data={logsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SymptomsCard
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
          />
        )}
        contentContainerStyle={styles.listContainer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: 'left',
  },
  listContainer: {
    gap: 20, 
  },
});

export default LogScreen;
