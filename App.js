import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {QuestModal} from "./src/components/QuestModal";
import {useState} from "react";
import {TouchableOpacity} from "react-native";

export default function App() {
  const [showQuest, setShowQuest] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity onPress={() => setShowQuest(!showQuest)}>
        <Text>QuestModal</Text>
      </TouchableOpacity>
      <QuestModal showQuest={showQuest} setShowQuest={setShowQuest}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
