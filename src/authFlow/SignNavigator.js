import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { NavigationContainer } from '@react-navigation/native';

const SignNavigator = (props) =>{

    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown : false}}>
            <Stack.Screen name="SignIn" children={({navigation})=><SignIn setUserToken={props.setUserToken} navigation={navigation}/>}/>
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};

export default SignNavigator;