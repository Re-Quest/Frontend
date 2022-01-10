import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import Images from './Images';
import axios from 'axios';

const QuestHolder = (props) => {
    

    const [questList, setQuestList] = useState(null);

    useEffect(()=>{
        axios.get(`http://192.249.18.141:80/api/quest/questsInHolder?questHolder=${props.data._id}`)
        .then((res)=>{
            setQuestList(res.data);
        });
    },[]);

    // data
    const questname = props.data.title;
    const progress = 50;
    const img = props.data.img;

    const questtxt = ((questList)?questList.length:"0") + " Quests";
    const progtxt = progress.toString() + "%";
    const progcolor = (progress>20)?colors.white:colors.black;
    //



    const styles = StyleSheet.create({
        questWrapper : {
            width : 150,
            height : 180,
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
            width : 60,
            height : 60,
            borderRadius : 30
    
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
            fontSize : 18,
            color : colors.holder[img],
            marginTop : -5
    
        },
    
        progress : {
            height : 18,
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
        },
        progressWrapper : {
            flexDirection : 'column',
            justifyContent : 'flex-end',
            flex:1,
            width : '100%',
        }
    });


    if(questList){
        
        return(
            <View style={styles.questWrapper}>
                <Image style={styles.questImg} source={Images.quest[img]}/>
                <View style={styles.mainInfo}>
                    <Text style={styles.maintxt}>{questname}</Text>
                    <Text style={styles.midtxt}>{questtxt}</Text>
                </View>
                <View style={styles.progressWrapper}>
                    <View style={styles.progress}>
                        <View style={styles.progressbar}></View>
                        <Text style={styles.progresstxt}>{progtxt}</Text>
                    </View>
                </View>

            </View>
        );

    }else{
        return(<Text>stay..</Text>);
    }



};

export default QuestHolder;
