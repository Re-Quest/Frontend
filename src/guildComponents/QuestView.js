import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';

import colors from '../../assets/colors/colors';
import React, {useState, useEffect} from 'react';

import Images from '../mainComponents/Images';
import axios from 'axios';
import {QuestModal} from "../questComponents/QuestModal";

const USER_URL = "http://192.249.18.141:80/api/auth/getOne?_id=" 
const showDate = (data) => {
    const tmp = new Date(data);

    const date = tmp.getFullYear() + "-" +
                ((tmp.getMonth()+1>9)?(tmp.getMonth()+1):'0'+(tmp.getMonth()+1)) + "-" +
                ((tmp.getDate()>9)?tmp.getDate():'0'+tmp.getDate())

    const hour = tmp.getHours();
    const min = tmp.getMinutes();

    const time = (hour>=12)?"PM":"AM";
    if(hour>12){
        return date +"\n" + 
            ((hour-12>9)?hour-12:('0'+hour-12)) +":"+
            ((min>9)?min:('0'+min)) + time;
    }else{
        return date +"\n" + 
            ((hour>9)?hour:('0'+hour)) +":"+
            ((min>9)?min:('0'+min)) + time;
    }
}

    /*
    Object {
        "__v": 0,
        "_id": "61dc40896e8d366996988589",
        "comments": Array [
          Object {
            "_id": "61dc40896e8d36699698858a",
            "comment": "I wanna ",
            "date": "2022-01-10T14:19:53.548Z",
            "stateChange": "quested",
            "user": "61d9fc785c945b18faf8e568",
          },
        ],
        "dueDate": "2022-01-10T14:19:53.879Z",
        "genDate": "2022-01-10T14:19:53.548Z",
        "generatedBy": "61d9fc785c945b18faf8e568",
        "heldUser": "61d9fc785c945b18faf8e568",
        "holdingUser": "61dbce9476d20d7dd6313e10",
        "img": 0,
        "questHolder": "61dbca935338946f5fd36ec0",
        "state": "quested",
        "title": "🍇🍷🍇🍷",
      }
    */

const QuestView = (props) => {
    const [modalVisible, setModalVisible] = useState(null);

    useEffect(()=>{
        if(modalVisible===false)props.setApply(val=>!val);
    },[modalVisible])

    if(props.data){

        const dueDate = showDate(props.data.dueDate);
        const comment = props.data.comments[props.data.comments.length-1].comment;
        const title = "[" +props.data.title + "]";
        const state = props.data.state;
        const senderImg = props.data.heldUser.profileImg;
        const senderId = props.data.heldUser.userId;
        const receiverId = props.data.holdingUser.userId;

        return(
            <View style={styles.questWrapper}>
                <View style={styles.mainWrapper}>
                    <View style={{width : 250}}>
                        <ScrollView horizontal={true} pagingEnabled={true}>
                            <Text style={styles.titletxt}>{title}</Text>
                        </ScrollView>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>setModalVisible(true)}>
                            <Text style={styles.buttontxt}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.midWrapper}>
                    <View style={styles.txtbox}>
                        <Text style={styles.txt}>{senderId.toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text style={styles.midtxt}>{`>`}</Text>
                    </View>
                    <View style={styles.txtbox}>
                        <Text style={styles.txt}>{receiverId.toUpperCase()}</Text>
                    </View>

                </View>
    
                <View style={styles.subWrapper}>
                    <View style={{width : 170}} horizontal={true}>
                        <Text style={styles.light_title}>RECENT COMMENT</Text>
                        <ScrollView contentContainerStyle={styles.comment} horizontal={true} >
                            <Image style={styles.comment_img} source={Images.profile[senderImg]}/>
                            <Text style={styles.midtxt}>{comment}</Text>
                        </ScrollView>
                    </View>
    
                    <View style={{paddingRight : 10}}>
                        <Text style={styles.light_title}>DUE DATE</Text>
                        <View style={{marginTop : -6}}>
                            <Text style={styles.datetxt}>{dueDate}</Text>
                        </View>
                    </View>
    
    
                </View>
                <QuestModal modalVisible={modalVisible} setModalVisible={setModalVisible} questJson={props.data}/>
            </View>
        );

    }else{
        return(<Text></Text>);
    }




};
export default QuestView;

const styles = StyleSheet.create({
    questWrapper : {
        backgroundColor : colors.white,
        width : '90%',
        height : 140,
        borderRadius : 20,
        paddingVertical : 15,
        paddingHorizontal : 20,
        marginVertical : 15,

        shadowColor : colors.light_gray,
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 1,
        shadowRadius : 10,
        elevation : 7
    },
    mainWrapper : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    midWrapper : {
        flexDirection : 'row',
        justifyContent : 'flex-start'
    },
    titletxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20,
        color : colors.black

    },
    buttontxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 22,
        color : colors.blue,
        paddingLeft : 10
    },
    light_title : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 14,
        color : colors.light_gray,
    },
    subWrapper : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 5
    },
    midtxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 18,
        color : colors.black,
        marginHorizontal : 6
    },
    txt : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 15,
        color : colors.white
    },
    datetxt : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 17,
        color : colors.blue
    },
    comment_img : {
        width : 32,
        height : 32,
        backgroundColor : colors.white,
        borderRadius : 16
    },
    comment : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    txtbox : {
        height : 24,
        borderRadius : 12,
        paddingHorizontal : 10,
        backgroundColor : colors.blue,
        justifyContent : 'center'

    }
    
});