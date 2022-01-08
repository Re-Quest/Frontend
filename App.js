import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GuildTab from './src/navigation/guildTab';
import GuildTitle from './src/guildComponents/GuildTitle';

const App = () => {

  const navigationref = useRef();
  const [position, setPosition] = useState("");

  return (
    <View style={styles.fullscreen}>
      <GuildTitle style={styles.header} position={position} setPosition={setPosition}/>
      <View style={styles.contents}>
        <NavigationContainer ref={navigationref}>
          <GuildTab position={position}/>
        </NavigationContainer>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    flexDirection : 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop : StatusBar.currentHeight,
  },
  contents : {
    height : '90%'
  }

});

export default App;
