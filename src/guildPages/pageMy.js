import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyProfile from '../guildComponents/MyProfile';
import ScrollQuest from '../guildComponents/ScrollQuest';
import colors from '../../assets/colors/colors';

const pageMy = (props) => {

    return(
        <View style={styles.mypage}>
            <MyProfile />
            <Text>{`This is ${props.position} mypage`}</Text>
            <ScrollQuest />
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