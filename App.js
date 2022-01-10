import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppScreen from './src/authFlow/App'; 
import Splash from './src/authFlow/Splash'; 
import SignNavigator from './src/authFlow/SignNavigator';
import * as Font from 'expo-font';

const App = () => {

    // Font loading
    const [isReady, setIsReady] = useState(false);

    const loadFont = async() => {
        await Font.loadAsync({
            'ReadexPro-Bold' : require('./assets/fonts/ReadexPro-Bold.ttf'),
            'ReadexPro-Medium' : require('./assets/fonts/ReadexPro-Medium.ttf'),
            'ReadexPro-Regular' : require('./assets/fonts/ReadexPro-Regular.ttf')
        })
        setIsReady(true);
    };
    useEffect(()=>{
        loadFont();
    },[]);
    //


  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  if(!isReady){
    return(<Splash />);
  }else{
      return(
    <NavigationContainer>
      {userToken===null?
        <SignNavigator setUserToken={setUserToken} />: <AppScreen userToken={userToken}/>
      }
    </NavigationContainer>);
  }

};


export default App;
