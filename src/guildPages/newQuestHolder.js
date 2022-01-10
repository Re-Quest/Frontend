import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import Title from './title';
import axios from 'axios';

import colors from '../../assets/colors/colors';
import images from '../mainComponents/Images';

import IconTitle from '../../assets/icons/icon_title.svg';
import IconDue from '../../assets/icons/icon_due.svg';
import IconImg from '../../assets/icons/icon_img.svg';
import IconAssign from '../../assets/icons/icon_assign.svg';
import IconComment from '../../assets/icons/icon_comment.svg';


const NewQuestHolder = (props) => {

    const GETALL_URL = "http://192.249.18.141:80/api/auth/getAll"
    const [userList, setUserList] = useState(null);

    useEffect(()=>{
        axios.post("http://192.249.18.141:80/api/auth/getAll")
        .then((res)=>{
            setUserList(res.data);
            console.log(userList);
        })
    },[]);


    const guildName = props.userToken.guildInfo[0].guildId;

    const [assigned, setAssigned] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('2021-01-12 17:30:00');
    const [comment, setComment] = useState();
    const [img, setImg] = useState(0);
    const [join, setJoin] = useState([]);


    const create = () =>{

        const holder = {
            title : title,
            detail : comment,
            dueDate : new Date(),
            img : img
        };
        axios.post("http://192.249.18.141:80/api/quest/registerHolder",holder)
        .then((res)=>{
            console.log("create new holder");
            props.setRefresh(val=>!val);
            props.navigation.pop();
        
        });
    };


    if(userList===null){
        return(<Text>Loading</Text>);
    }else{
        return(
            <View style={styles.box}>
                <Title pageName="new quest holder" guildName={guildName} navigation={props.navigation}/>
                <View style={styles.newpage} >

                    <View style={styles.imageWrapper}>
                        <View style = {styles.txtWrapper}>
                            <IconImg fill={colors.blue} width={20} height={20}/>
                            <View style={{flexDirection : 'column'}}>
                                <Text style={styles.titletxt}>IMAGE</Text>
                                <Text style={styles.subtxt}>swipe and click to change</Text>
                            </View>
                        </View>
                        <View style={styles.imgWrapper}>
                            <Image style={styles.img} source={images.quest[img]}/>
                        </View>
                        
                        <ScrollView horizontal={true} marginVertical={2}>
                            {images.quest.map((item,idx)=>{
                                return(
                                    <View style={styles.minimgWrapper} key={idx}>
                                        <TouchableOpacity onPress={()=>setImg(idx)}>
                                            <Image style={styles.minimg} source={item} />
                                        </TouchableOpacity>
                                    </View>
                                    );
                            })}
                        </ScrollView>
                    </View>

                    <View style={{marginBottom :4, marginTop : 10}}>
                        <View style = {styles.txtWrapper}>
                            <IconTitle fill={colors.blue} width={20} height={20}/>
                            <Text style={styles.titletxt}>TITLE</Text>
                        </View>
                        
                        <View style={styles.titleinput}>
                            <TextInput  placeholder='max length 35' style={styles.input} onChangeText={(val) => setTitle(val)} selectionColor={colors.blue}  maxLength={35}/>
                        </View>
                    </View>

                    <View style={{marginVertical : 4}}>
                        <View style = {styles.txtWrapper}>
                            <IconDue fill={colors.blue} width={20} height={20}/>
                            <Text style={styles.titletxt}>DUE DATE</Text>
                        </View>
                        <View style={styles.dateinput}>
                            <TextInput defaultValue={date} style={styles.input} onChangeText={(val) => setDate(val)} selectionColor={colors.blue} />
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
                    <View style={{flex:1, flexDirection:'column', justifyContent :'center'}}>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>create()}>
                                <Text style={styles.button}>CREATE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        );
    }



};

export default NewQuestHolder;

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
    titleinput : {
        height : 40,
    },
    dateinput : {
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
        width : 130,
        height : 130,
        margin : 6,
        borderRadius : 70,
        shadowColor : colors.light_gray,
        shadowOffset : {
            width : 0,
            height : 0
        },
        shadowRadius : 0,
        elevation : 10
    },
    minimg : {
        backgroundColor : colors.white,
        width : 36,
        height : 36,
        borderRadius : 18,

    },
    minimgWrapper : {
        width : 36,
        height : 36,
        backgroundColor : null,
        marginHorizontal : 4

    },
    userWrapper : {
        width : '100%',
        height : 50
    },
    itemWrapper : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : null


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
    }

});