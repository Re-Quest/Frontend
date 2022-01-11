import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyProfile from '../guildComponents/MyProfile';
import SwipeQuest from '../guildComponents/SwipeQuest';
import colors from '../../assets/colors/colors';
import Title from './title';

const pageMy = (props) => {
    const guildName = props.userToken.guildInfo[0].guildId;


    /*
    "email": "hyewon0809@kaist.ac.kr",
    "guildInfo": Array [],
    "phone": "010-9021-0167",
    "profileImg": 0,
    "teamInfo": Array [],
    "userId": "hyewon",
    "username": "HyewonLee",
    */


    return(
        <View style={styles.box}>
            <Title guildName={guildName} pageName="my page" />
            <View style={styles.mypage}>
                <MyProfile userToken={props.userToken}/>
                <View style={styles.questWrapper}>
                    <View style={styles.questBack}></View>
                    <SwipeQuest style={styles.questFront} position="hi" refresh={props.refresh}/>
                </View>
            </View>
        </View>

    );

};

export default pageMy;

const styles = StyleSheet.create({
    box : {
        height : '100%',
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'flex-start'
    },
    mypage : {
        flex :1,
        height : '100%',
        width : '100%',
        backgroundColor : colors.white
    },
    questWrapper : {
        marginTop : 30,
        flex : 1
    },
    questFront : {
        position : 'absolute',
        backgroundColor : null
    },
    questBack : {
        width : '100%',
        height : '100%',
        position : 'absolute',
        backgroundColor : colors.cool_white,
        borderTopLeftRadius : 50,
        borderTopRightRadius : 50

    }

});