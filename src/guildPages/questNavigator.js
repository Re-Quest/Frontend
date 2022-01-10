import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import NewQuest from './newQuest';
import NewQuestHolder from './newQuestHolder';
import PageNew from './pageNew';

const QuestNavigator = (props) =>{

    const Stack = createStackNavigator();

    const [holder, setHolder] = useState(null);

    return(
        <Stack.Navigator initialRouteName='PageNew' screenOptions={{headerShown : false}}>
            <Stack.Screen name="PageNew" children={({navigation})=><PageNew refresh={props.refresh} userToken={props.userToken} setHolder={setHolder} navigation={navigation}/>}/>
            <Stack.Screen name="NewQuest" children={({navigation})=><NewQuest refresh={props.refresh} setRefresh={props.setRefresh} userToken={props.userToken}  holder={holder} navigation={navigation}  />} />
            <Stack.Screen name="NewQuestHolder" children={({navigation})=><NewQuestHolder setRefresh={props.setRefresh} userToken={props.userToken} navigation={navigation} />} />
        </Stack.Navigator>
    );
};

export default QuestNavigator;