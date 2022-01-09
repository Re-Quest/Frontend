import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Title from './title';

import colors from '../../assets/colors/colors';

import IconTitle from '../../assets/icons/icon_title.svg';
import IconDue from '../../assets/icons/icon_due.svg';
import IconComment from '../../assets/icons/icon_comment.svg';
import IconHolder from '../../assets/icons/icon_holder.svg';
import IconAdd from '../../assets/icons/icon_add.svg';



const NewQuest = (props) => {

    const guildName = props.userToken.guildInfo[0].guildId;

    const [assigned, setAssigned] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState();
    const [comment, setComment] = useState();


    const create = () =>{

    };

    return(
        <View style={styles.box}>
            <Title pageName="new quest" guildName={guildName} navigation={props.navigation}/>
            <View style={styles.newpage} >
                <View style={styles.titleWrapper}>
                    <View style = {styles.txtWrapper}>
                        <IconHolder fill={colors.blue} width={20} height={20}/>
                        <Text style={styles.titletxt}>QUEST HOLDER</Text>
                    </View>
                    <View style={styles.titleinput}>
                        <TextInput  placeholder='max length 35' style={styles.input}/>
                    </View>
                </View>

                <View style={styles.titleWrapper}>
                    <View style = {styles.txtWrapper}>
                        <IconTitle fill={colors.blue} width={20} height={20}/>
                        <Text style={styles.titletxt}>TITLE</Text>
                    </View>
                    
                    <View style={styles.titleinput}>
                        <TextInput  placeholder='max length 35' style={styles.input} onChangeText={(val) => setTitle(val)} selectionColor={colors.blue}  maxLength={35}/>
                    </View>
                </View>

                <View style={styles.dateWrapper}>
                    <View style = {styles.txtWrapper}>
                        <IconDue fill={colors.blue} width={20} height={20}/>
                        <Text style={styles.titletxt}>DUE DATE</Text>
                    </View>
                    <View style={styles.dateinput}>
                        <TextInput style={styles.input} onChangeText={(val) => setTitle(val)} selectionColor={colors.blue} />
                    </View>
                </View>
                <View style={styles.commentWrapper}>
                    <View style = {styles.txtWrapper}>
                        <IconComment fill={colors.blue} width={20} height={20}/>
                        <Text style={styles.titletxt}>COMMENT</Text>
                    </View>
                    <View style={styles.commentinput}>
                        <TextInput placeholder='max length 200' style={styles.inputmulti} onChangeText={(val) => setComment(val)} selectionColor={colors.blue} multiline={true} textAlignVertical='top' maxLength={200}/>
                    </View>

                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>create()}>
                        <Text style={styles.button}>CREATE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );

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
        backgroundColor : colors.light_gray,
        fontSize : 20,
        fontFamily : 'ReadexPro-Regular',
        paddingHorizontal : 20
    },
    inputmulti : {
        width : '100%',
        height : '100%',
        borderRadius : 20,
        backgroundColor : colors.light_gray,
        fontSize : 20,
        fontFamily : 'ReadexPro-Regular',
        padding : 20
    },
    titletxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        marginHorizontal : 20
    },
    txtWrapper : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start'
    },
    titleinput : {
        height : 45,
    },
    dateinput : {
        height : 45,

    },
    commentinput : {
        height : 200,

    },
    button : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 20,
        color : colors.white
    },
    buttonWrapper : {
        width : '100%',
        height : 50,
        marginVertical : 20,
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

});