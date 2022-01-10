import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GuildTab from '../navigation/guildTab';
import GuildTitle from '../guildComponents/GuildTitle';

const App = (props) => {

  const navigationref = useRef();

  return (
    <View style={styles.fullscreen}>
      <View style={styles.contents}>
          <GuildTab userToken={props.userToken}/>
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
    height : '100%'
  }

});

export default App;
