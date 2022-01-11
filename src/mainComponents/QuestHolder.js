import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import Images from './Images';
import axios from 'axios';

const QuestHolder = (props) => {
    
    const [progress, setProgress] = useState(null);
    let img = 0;
    let questname ="";

    useEffect(()=>{
        setProgress(null);
        if(props.data){
            
            axios.get("http://192.249.18.141:80/api/quest/progress?questHolder="+props.data._id)
            .then((res)=>{
                setProgress(res.data);
            });
        }
    },[props.data]);

    // data

    
    const styles = StyleSheet.create({
        questWrapper : {
            width : 150,
            height : 180,
            backgroundColor : (props.data===props.selectHolder)?colors.blue:colors.cool_white,
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
        progress : {
            height : 18,
            borderRadius : 9,
            width : '100%',
            backgroundColor : colors.white
        },
        progressWrapper : {
            flexDirection : 'column',
            justifyContent : 'flex-end',
            flex:1,
            width : '100%',
        }
    });


    if(progress){
        questname = props.data.title;
        img = props.data.img;
        if(progress.progress===null){
            progress.progress = 0;
        }
        return(
            <View style={styles.questWrapper}>
                <Image style={styles.questImg} source={Images.quest[img]}/>
                <View style={styles.mainInfo}>
                    <Text style={styles.maintxt}>{questname}</Text>
                    <Text style={{
                        fontFamily : 'ReadexPro-Bold',
                        fontSize : 18,
                        color : colors.holder[img],
                        marginTop : -5
                    }}>{progress.total + " Quests"}</Text>
                </View>
                <View style={styles.progressWrapper}>
                    <View style={styles.progress}>
                        <View style={{
                            height : '100%',
                            width : progress.progress+"%",
                            borderRadius : 9,
                            backgroundColor : colors.holder[img]}}>
                        </View>
                        <Text style={{
                            color : (progress.progress>20)?colors.white:colors.black,
                            fontFamily : 'ReadexPro-Bold',
                            marginLeft : 7,
                            position : 'absolute'
                        }}>{progress.progress + "%"}</Text>
                    </View>
                </View>

            </View>
        );

    }else{
        return(<Text>stay..</Text>);
    }



};


export default QuestHolder;
