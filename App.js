import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppScreen from './src/authFlow/App'; 
import Splash from './src/authFlow/Splash'; 
import SignNavigator from './src/authFlow/SignNavigator'; 

const App = () => {


  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  if(isLoading){
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
