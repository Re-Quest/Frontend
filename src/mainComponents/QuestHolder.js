import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import * as Font from 'expo-font';
import { color } from 'react-native-reanimated';

const QuestHolder = (props) => {
    
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
    const questname = "MT Hotel Reservation";
    const questnum = 5;
    const progress = 50;
    const img = 7;

    const imgurl = "../../assets/images/quests/img_"+img+".png";
    const questtxt = questnum.toString() + " Quests";
    const progtxt = progress.toString() + "%";
    const progcolor = (progress>20)?colors.white:colors.black;
    //



    const styles = StyleSheet.create({
        questWrapper : {
            width : 170,
            height : 230,
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
        questImg : {
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
            fontSize : 22,
            color : colors.black
    
        },
        midtxt : {
            fontFamily : 'ReadexPro-Bold',
            fontSize : 17,
            color : colors.holder[img],
            marginTop : -5
    
        },
    
        progress : {
            height : 20,
            borderRadius : 9,
            width : '100%',
            backgroundColor : colors.white
        },
        progressbar : {
            height : '100%',
            width : progtxt,
            borderRadius : 9,
            backgroundColor : colors.holder[img]
    
        },
        progresstxt : {
            color : progcolor,
            fontFamily : 'ReadexPro-Bold',
            marginLeft : 7,
            position : 'absolute'
        }
    });







    return(
        <View style={styles.questWrapper}>
            <Image style={styles.questImg} source={require(imgurl)}/>
            <View style={styles.mainInfo}>
                <Text style={styles.maintxt}>{questname}</Text>
                <Text style={styles.midtxt}>{questtxt}</Text>
            </View>
            <View style={styles.progress}>
                <View style={styles.progressbar}></View>
                <Text style={styles.progresstxt}>{progtxt}</Text>
            </View>
        </View>
    );

};

export default QuestHolder;
