import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import Images from './Images';


const CardProfile = (props) => {
    

    // data
    const username = props.data.userId;
    const position = "dummy";
    const phone = props.data.phone;
    const img = props.data.profileImg;
    const email = props.data.email;

    const subtxt = phone + '\n' + email;

    return(
        <View style={styles.cardWrapper}>
            <Image style={styles.cardImg} source={Images.profile[img]}/>
            <View style={styles.mainInfo}>
                <Text style={styles.maintxt}>{username.toUpperCase()}</Text>
                <Text style={styles.midtxt}>{position.toUpperCase()}</Text>
            </View>
            <View style={styles.subInfo}>
                <Text style={styles.subtxt}>{subtxt}</Text>
            </View>
        </View>
    );

};

export default CardProfile;

const styles = StyleSheet.create({
    cardWrapper : {
        width : 180,
        height : 220,
        backgroundColor : colors.cool_white,
        borderRadius : 20,
        shadowColor : colors.gray,
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 1,
        shadowRadius : 20,
        elevation : 10,

        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'flex-start',
        paddingHorizontal : 15,
        paddingVertical : 10,
        marginVertical : 5,
        marginHorizontal : 10

    },
    cardImg : {
        backgroundColor : colors.white,
        width : 100,
        height : 100,
        borderRadius : 50,
        marginBottom : 8
    
    },
    mainInfo : {
        flex : 1,
        flexDirection : 'column',
        alignItems : 'flex-start',
        alignSelf : 'flex-start',
        paddingVertical : 5

    },
    maintxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 22,
        color : colors.black

    },
    midtxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 16,
        color : colors.blue,
        marginTop : -6

    },
    subInfo : {
        flex : 1,
        flexDirection : 'column',
        alignItems : 'flex-start',
        alignSelf : 'flex-start',
    },
    subtxt : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 15,
        color : colors.mid_gray
    }
});