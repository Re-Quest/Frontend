import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, StatusBar} from 'react-native';
import colors from '../../assets/colors/colors';
import React,{useState, useEffect} from 'react';

import PageHome from '../guildPages/pageHome';
import PageQuest from '../guildPages/pageQuest';
import PageMy from '../guildPages/pageMy';

import IconHome from '../../assets/icons/icon_home.svg';
import IconNew from '../../assets/icons/icon_new.svg';
import IconQuest from '../../assets/icons/icon_quest.svg';
import IconMy from '../../assets/icons/icon_my.svg';
import QuestNavigator from '../guildPages/questNavigator';


const Tab = createBottomTabNavigator();


const GuildTab = (props) => {
    /*
    "email": "hyewon0809@kaist.ac.kr",
    "guildInfo": Array [],
    "phone": "010-9021-0167",
    "profileImg": 0,
    "teamInfo": Array [],
    "userId": "hyewon",
    "username": "HyewonLee",
    */
    const [refresh, setRefresh] = useState(false);

    return(
        <Tab.Navigator style={styles.component} screenOptions={navoptions}>
            <Tab.Screen name="Home" children={()=><PageHome refresh={refresh} userToken={props.userToken}/>} options={homeoptions}/>
            <Tab.Screen name="New" children={()=><QuestNavigator refresh={refresh} setRefresh={setRefresh} userToken={props.userToken}/>} options={newoptions}/>
            <Tab.Screen name="Quest" children={()=><PageQuest refresh={refresh} userToken={props.userToken}/>} options={questoptions}/>
            <Tab.Screen name="My" children={()=><PageMy  refresh={refresh} userToken={props.userToken}/>} options={myoptions}/>
        </Tab.Navigator>
    );
};

export default GuildTab;

const styles = StyleSheet.create({
    screen : {
        flexDirection : 'column'
    },
    title : {
        flex  :1
    },
    component : {
        paddingTop : StatusBar.currentHeight,
        flex : 8
    }
});


const navoptions = {
    headerShown : false,
    tabBarActiveTintColor : colors.blue,
    tabBarInactiveTintColor : colors.cool_white,
    tabBarShowLabel : false,
    tabBarStyle : {
        height : '9%',
        elevation : 25,
        borderTopWidth : 0
    },
    position : 'absolute'
    
};

const homeoptions = {
    tabBarLabel : '',
    tabBarIcon : ({ focused, color, size}) => (
        <IconHome fill={color} width={25} height={25}/>
    ),

};

const newoptions = {
    tabBarIcon : ({ focused, color, size}) => (
        <IconNew fill={color} width={25} height={25}/>
    )
};

const questoptions = {
    tabBarIcon : ({ focused, color, size}) => (
        <IconQuest fill={color} width={25} height={25}/>
    )
};

const myoptions = {
    tabBarIcon : ({ focused, color, size}) => (
        <IconMy fill={color} width={25} height={25}/>
    )
};

