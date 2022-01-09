import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import * as Font from 'expo-font';

const CardProfile = (props) => {
    
    // Font loading
    const [isReady, setIsReady] = useState(false);

    const loadFont = async() => {
        await Font.loadAsync({
            'ReadexPro-Bold' : require('../../assets/fonts/ReadexPro-Bold.ttf'),
            'ReadexPro-Medium' : require('../../assets/fonts/ReadexPro-Medium.ttf'),
            'ReadexPro-Regular' : require('../../assets/fonts/ReadexPro-Regular.ttf')
        })
        setIsReady(true);
    };
    useEffect(()=>{
        loadFont();
    },[]);

    //

    // data
    const username = "Hye1ee";
    const position = "Frontend";
    const phone = "010-9021-0167";
    const img = "1";
    const email = "hyewon0809@kaist.ac.kr";

    const imgurl = "../../assets/images/img_"+img+".png";
    const subtxt = phone + '\n' + email;

    return(
        <View style={styles.cardWrapper}>
            <Image style={styles.cardImg} source={require(imgurl)}/>
            <View style={styles.mainInfo}>
                <Text style={styles.maintxt}>{username}</Text>
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
        width : 190,
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
        padding : 15,
        marginVertical : 5,
        marginHorizontal : 10

    },
    cardImg : {
        backgroundColor : colors.white,
        width : 100,
        height : 100,
        borderRadius : 50

    },
    mainInfo : {
        flexDirection : 'column',
        alignItems : 'flex-start',
        alignSelf : 'flex-start',
        paddingVertical : 5

    },
    maintxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20,
        color : colors.black

    },
    midtxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 15,
        color : colors.blue,
        marginTop : -5

    },
    subInfo : {
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