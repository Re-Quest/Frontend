import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import * as Font from 'expo-font';

import colors from '../../assets/colors/colors';

const MyProfile = (props) =>{

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

    // Data
    const data = props.userToken;
    const img = 0;
    let check = "../../assets/images/img_"+img+".png";
    const url = "../../assets/images/img_0.png"

    const test = () =>{
        console.log(typeof(img));
        console.log("hi"+img+"hi");

    };
    
    

        /*
    "email": "hyewon0809@kaist.ac.kr",
    "guildInfo": Array [],
    "phone": "010-9021-0167",
    "profileImg": 0,
    "teamInfo": Array [],
    "userId": "hyewon",
    "username": "HyewonLee",
    */

    if(isReady){
        return(
            <View style={styles.profileWrapper}>
                <Image style={styles.profileImg} source={require(check)}/>
                <View style={styles.textWrapper}>

                    <View style={styles.maintxtWrapper}>
                        <View style={styles.textlineWrapper}>
                            <Text style={styles.titletxt}>{data.userId.toUpperCase()}</Text>
                            <TouchableOpacity style={styles.editWrapper} onPress={()=>test()}>
                                <Text style={styles.edittxt}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.titlemid}>{data.guildInfo[0].posInGuild.toUpperCase()}</Text>
                    </View>
                    
                    <View style={styles.subtxtWrapper}>
                        <Text style={styles.titlesub}>{data.email}</Text>
                        <Text style={styles.titlesub}>{data.phone}</Text>
                    </View>

                    <View style={styles.teamsWrapper}>
                        <ScrollView style={styles.scrollview} horizontal={true} pagingEnabled={true} >
                            {data.teamInfo.map((val, idx)=>{
                                return(
                                    <View style={styles.teamItemWrapper} key={idx}>
                                        <Text style={styles.teamItemName}>{val}</Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>

                    
                </View>
            </View>
        );
    }else{
        return(<Text>Loading...</Text>);
    }

};

const styles = StyleSheet.create({
    profileWrapper : {
        width : '90%',
        height : 150,
        flexDirection : 'row',
        borderRadius : 20,
        backgroundColor : colors.white,
        justifyContent : 'flex-start',
        alignItems : 'center',

        marginHorizontal : '5%',
        shadowColor : colors.light_gray,
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 1,
        shadowRadius : 20,
        elevation : 10
    },
    profileImg : {
        width : 100,
        height : 100,
        borderRadius : 50,
        margin : 20,
        flex : 1,
        backgroundColor : colors.white
    },
    textWrapper : {
        height : '100%',
        width : '100%',
        flex : 2,
        flexDirection : 'column',
        justifyContent : 'space-evenly',
        marginRight : 30,
    },
    textlineWrapper : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    titletxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20
    },
    titlemid : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 15,
        color : colors.blue
    },
    titlesub : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 15,
        color : colors.gray
    },
    editWrapper : {
    },  
    edittxt : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 12,
        color : colors.blue
    },
    maintxtWrapper : {

    },
    subtxtWrapper : {

    },
    teamsWrapper : {
        width : '100%',
        height : 25,
    },
    teamItemWrapper : {
        backgroundColor : colors.blue,
        height : 22,
        borderRadius : 11,
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 4,
    },
    teamItemName : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 13,
        marginHorizontal : 10,
        color : colors.white
    },
    scrollview : {
        backgroundColor : null
    }
});

export default MyProfile;