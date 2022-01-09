import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyProfile from '../guildComponents/MyProfile';
import ScrollQuest from '../guildComponents/ScrollQuest';
import colors from '../../assets/colors/colors';

const pageMy = (props) => {

    return(
        <View style={styles.mypage}>
            <MyProfile userToken={props.userToken}/>
            <ScrollQuest position={props.position}/>
        </View>
    );

};

export default pageMy;

const styles = StyleSheet.create({
    mypage : {
        height : '100%',
        width : '100%',
        backgroundColor : colors.white
    },

});