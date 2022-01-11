import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform, KeyboardAvoidingView} from 'react-native';
import Title from './title';
import axios from 'axios';
import DateTimePicker from "@react-native-community/datetimepicker";

import colors from '../../assets/colors/colors';
import images from '../mainComponents/Images';

import IconTitle from '../../assets/icons/icon_title.svg';
import IconComment from '../../assets/icons/icon_comment.svg';
import IconDue from '../../assets/icons/icon_due.svg';
import IconHolder from '../../assets/icons/icon_holder.svg';
import IconAssign from '../../assets/icons/icon_assign.svg';
import IconCheck from '../../assets/icons/icon_check.svg';


const NewQuest = (props) => {

    const GETALL_URL = "http://192.249.18.141:80/api/auth/getAll"
    const [userList, setUserList] = useState(null);
    const [receiver, setReceiver] = useState(null);

    useEffect(()=>{
        axios.post("http://192.249.18.141:80/api/auth/getAll")
        .then((res)=>{
            setUserList(res.data);
            console.log(userList);
        })
    },[]);


    const guildName = props.userToken.guildInfo[0].guildId;

    const [assigned, setAssigned] = useState(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [comment, setComment] = useState('');
    const [img, setImg] = useState(0);

    const [showDate, setShowDate] = useState(Platform.OS === "ios");
    const [showTime, setShowTime] = useState(Platform.OS === "ios");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === "ios");
        setShowTime(Platform.OS === "ios");
        currentDate.setSeconds(0);
        setDate(currentDate);
    }

    
    const create = () =>{
        const receiver = userList[assigned]._id;

        // quest object
        const quest = {
            title : title,
            questHolder : props.holder._id,
            comment : comment,
            receiver : receiver,
            dueDate : date

        };
        console.log(quest);

        // create new quest
        axios.post("http://192.249.18.141:80/api/quest/quest",quest)
            .then((res)=>{
                console.log("create new quest");
                props.setRefresh(val=>!val);
                props.navigation.pop();
            });
    };


    if(userList){
        return(
            <KeyboardAvoidingView style={{width: "100%"}} behavior={"padding"}>
                <View style={styles.box}>

                    <Title pageName="new quest" guildName={guildName} navigation={props.navigation}/>
                    <View style={styles.newpage} >

                        <View style={{marginVertical :4}}>
                            <View style = {styles.txtWrapper}>
                                <IconHolder fill={colors.blue} width={20} height={20}/>
                                <Text style={styles.titletxt}>QUEST HOLDER</Text>
                            </View>

                            <View style={styles.normalinput}>
                                <TextInput  defaultValue={props.holder.title} style={styles.inputdefault} onChangeText={(val) => setTitle(val)} selectionColor={colors.blue}  editable={false}/>
                            </View>
                        </View>



                        <View style={{marginVertical :4}}>
                            <View style = {styles.txtWrapper}>
                                <IconTitle fill={colors.blue} width={20} height={20}/>
                                <Text style={styles.titletxt}>TITLE</Text>
                            </View>

                            <View style={styles.normalinput}>
                                <TextInput  placeholder='max length 35' style={styles.input} onChangeText={(val) => setTitle(val)} selectionColor={colors.blue}  maxLength={35}/>
                            </View>
                        </View>

                        <View style={{marginVertical : 4}}>
                            <View style = {styles.txtWrapper}>
                                <IconDue fill={colors.blue} width={20} height={20}/>
                                <Text style={styles.titletxt}>DUE DATE</Text>
                            </View>
                            <View style={styles.horizontalHolderSpaceBetween}>
                                <>
                                    {Platform.OS !== "ios" && (
                                        <>
                                            <TouchableOpacity
                                                style={styles.date}
                                                onPress={() => setShowDate(true)}>
                                                <Text>{date.toLocaleDateString()}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.date}
                                                onPress={() => setShowTime(true)}>
                                                <Text>{date.toLocaleTimeString().substr(0,5)}</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </>

                                <>
                                    {showDate && (
                                        <DateTimePicker
                                            style={{height: 30, flex: 1}}
                                            value={date}
                                            mode='date'
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </>
                                <>
                                    {showTime && (
                                        <DateTimePicker
                                            style={{height: 30, flex: 1}}
                                            value={date}
                                            mode='time'
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </>

                            </View>
                        </View>


                        <View style={{marginVertical :4}}>
                            <View style = {styles.txtWrapper}>
                                <IconComment fill={colors.blue} width={20} height={20}/>
                                <Text style={styles.titletxt}>COMMENT</Text>
                            </View>

                            <View style={styles.commentinput}>
                                <TextInput paddingVertical={15} multiline={true} textAlignVertical='top' placeholder='max length 200' style={styles.input} onChangeText={(val) => setComment(val)} selectionColor={colors.blue}  maxLength={200}/>
                            </View>
                        </View>


                        <View style={{marginVertical : 4}}>
                            <View style = {styles.txtWrapper}>
                                <IconAssign fill={colors.blue} width={23} height={23} marginRight={-3}/>
                                <View style={{flexDirection : 'column'}}>
                                    <Text style={styles.titletxt}>ASSIGN TO</Text>
                                    <Text style={styles.subtxt} >{(assigned===null)?"select one teammate":userList[assigned].userId}</Text>
                                </View>
                            </View>

                            <ScrollView style={{width : '100%', height : 120, backgroundColor : colors.cool_white }}>
                                {userList.map((item,idx)=>{
                                    return(
                                        <View style={styles.itemWrapper} key={idx}>
                                            <TouchableOpacity onPress={()=>setAssigned(idx)} style={{width : '100%', height : '100%', flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                                                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                                    <Image style={styles.itemimg} source={images.profile[item.profileImg]}/>
                                                    <Text style={styles.itemtxt}>{item.userId}</Text>
                                                </View>

                                                <IconCheck fill={(assigned===idx)?colors.blue:colors.light_gray} style={{width : 14, height : 14, marginHorizontal : 20}} />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </ScrollView>


                        </View>
                        <View style={{flex:1, flexDirection:'column', justifyContent :'center'}}>
                            <View style={styles.buttonWrapper}>
                                <TouchableOpacity disabled={assigned===null} style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>create()}>
                                    <Text style={styles.button}>CREATE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }else{
        return(
            <Text>loading</Text>
        );
    }

};

export default NewQuest;

const styles = StyleSheet.create({

    box : {
        height : '100%',
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'flex-start'
    },
    newpage : {
        height : '100%',
        width : '100%',
        paddingTop : '3%',
        paddingHorizontal : 25,
        backgroundColor : colors.white,
        flex : 1

    },
    input : {
        width : '100%',
        height : '100%',
        borderRadius : 20,
        backgroundColor : colors.cool_white,
        fontSize : 18,
        fontFamily : 'ReadexPro-Regular',
        paddingHorizontal : 30
    },
    inputdefault : {
        width : '100%',
        height : '100%',
        borderRadius : 20,
        backgroundColor : colors.cool_white,
        fontSize : 18,
        fontFamily : 'ReadexPro-Regular',
        paddingHorizontal : 30,
        color : colors.black
    },
    inputmulti : {
        width : '100%',
        height : '100%',
        borderRadius : 20,
        backgroundColor : colors.cool_white,
        fontSize : 20,
        fontFamily : 'ReadexPro-Regular',
        padding : 20
    },
    titletxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        marginHorizontal : 13
    },
    subtxt : {
        fontSize : 17,
        marginTop : -8,
        fontFamily : 'ReadexPro-Regular',
        color : colors.gray,
        marginHorizontal : 13

    },
    txtWrapper : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        alignSelf : 'flex-start'
    },
    normalinput : {
        height : 40,
    },
    commentinput : {
        height : 120,

    },
    button : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 20,
        color : colors.white
    },
    buttonWrapper : {
        width : '100%',
        height : 50,
        marginVertical : 10,
        borderRadius : 20,
        backgroundColor : colors.blue,
        shadowColor : colors.blue_sh,
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 0.5,
        shadowRadius : 10,
        elevation : 10
    },
    imageWrapper : {
        flexDirection : 'column',
        alignItems : 'center'
    },
    img : {
        backgroundColor : colors.white,
        width : 130,
        height : 130,
        borderRadius : 65,
    },
    imgWrapper : {
        width : 140,
        height : 140,
        borderRadius : 70,
        shadowColor : colors.light_gray,
        shadowOffset : {
            width : 0,
            height : 0
        },
        shadowRadius : 0,
        elevation : 10
    },
    userWrapper : {
        width : '100%',
        height : 50
    },
    itemWrapper : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : null,
        paddingVertical : 5,


    },
    itemtxt : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 18,
        color : colors.black

    },
    itemimg: {
        width : 40,
        height : 40,
        borderRadius : 20,
        backgroundColor : colors.white,
        marginHorizontal : 10
    },
    horizontalHolderSpaceBetween: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    date: {
        flex: 1,
        width: "50%",
        height : '100%',
        borderRadius : 20,
        backgroundColor : colors.cool_white,
        fontSize : 18,
        fontFamily : 'ReadexPro-Regular',
        paddingHorizontal : 30,
        alignItems: "center",
        justifyContent: "center"
    }

});