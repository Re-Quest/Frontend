import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, StatusBar} from 'react-native';


import PageHome from '../guildPages/pageHome';
import PageNew from '../guildPages/pageNew';
import PageQuest from '../guildPages/pageQuest';
import PageMy from '../guildPages/pageMy';

import IconHome from '../../assets/icons/icon_home.svg';
import IconNew from '../../assets/icons/icon_new.svg';
import IconQuest from '../../assets/icons/icon_quest.svg';
import IconMy from '../../assets/icons/icon_my.svg';


const Tab = createBottomTabNavigator();


const GuildTab = (props) => {

    return(
        <Tab.Navigator style={styles.component} screenOptions={navoptions}>
            <Tab.Screen name="Home" children={()=><PageHome position={props.position}/>} options={homeoptions}/>
            <Tab.Screen name="New" children={()=><PageNew position={props.position}/>} options={newoptions}/>
            <Tab.Screen name="Quest" children={()=><PageQuest position={props.position}/>} options={questoptions}/>
            <Tab.Screen name="My" children={()=><PageMy position={props.position}/>} options={myoptions}/>
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
    tabBarActiveTintColor : '#333333',
    tabBarInactiveTintColor : '#dddddd',
    tabBarShowLabel : false
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

