import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import NewQuest from './newQuest';
import NewQuestHolder from './newQuestHolder';
import PageNew from './pageNew';

const QuestNavigator = (props) =>{

    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initialRouteName='PageNew' screenOptions={{headerShown : false}}>
            <Stack.Screen name="PageNew" children={({navigation})=><PageNew userToken={props.userToken} navigation={navigation}/>}/>
            <Stack.Screen name="NewQuest" children={({navigation})=><NewQuest userToken={props.userToken} navigation={navigation}/>} />
            <Stack.Screen name="NewQuestHolder" children={({navigation})=><NewQuestHolder userToken={props.userToken} navigation={navigation}/>} />
        </Stack.Navigator>
    );
};

export default QuestNavigator;