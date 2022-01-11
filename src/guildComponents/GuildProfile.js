import React, {useState, useEffect} from 'react';
import { Linking, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import LinkPreview from 'react-native-link-preview';
import images from '../mainComponents/Images';

import colors from '../../assets/colors/colors';

const GuildProfile = () =>{
    const teamInfo = ['hi','hello'];
    const [view, setView] = useState(null);
    const URI = 'https://github.com/Re-Quest/Frontend'

    useEffect(()=>{
        setView(null);
        LinkPreview.getPreview(URI)
        .then((res) => setView(res));
    },[]);

    if(view){
        return(
            <View style={{width : '100%'}}>
                <View style={styles.profileWrapper}>
                    
                    <View style={styles.textWrapper}>
                        <Text style={styles.maintxt}>CLASS-1</Text>
                        <Text style={styles.bluetxt}>TEAM RE:QUEST</Text>
    
                        
                        <View style={styles.subtxtWrapper}>

                            <View style={styles.teamItemWrapper}>
                                <Text style={styles.teamItemName}>Eunho Jung</Text>
                            </View>
                            <View style={styles.teamItemWrapper}>
                                <Text style={styles.teamItemName}>Hyewon Lee</Text>
                            </View>
                        </View>
    
                    </View>
                    <Text style={styles.maintxt}>WEBSITE</Text>
                    <TouchableOpacity style={{width : '100%', paddingHorizontal : '5%'}} onPress={()=>Linking.openURL(URI)}>
                        <View style={styles.webWrapper}>
                            <View style={styles.title}>
                                <Text style={styles.titletxt}>{view.title.split(":")[0]}</Text>
                                <Text style={styles.titlesub}>{":"+view.title.split(":")[1]}</Text>
                            </View>            

                            <View style={styles.webtxt}>
                                <Image resizeMode={'cover'}  style={{width: 160, height: 80, margin : 15}} source={{uri : view.images[0]}}/>
                                <Text style={styles.subtxt}>{view.description.substr(0,110) + "  ---"}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                </View>
            </View>
        );

    }else{
        return(<></>);
    }


};

const styles = StyleSheet.create({
    profileWrapper : {
        width : '100%',
        flexDirection : 'column',
        borderRadius : 20,
        backgroundColor : colors.white,
        justifyContent : 'flex-start',
        alignItems : 'center',

        paddingHorizontal : 10,


        shadowColor : colors.light_gray,
        elevation : 10
    },
    webWrapper : {
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    webtxt : {
        width :"100%",
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'flex-start'
    },
    title :{
        alignSelf : 'flex-start'
    },
    titletxt : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 17,
        color : colors.black,
    },
    titlesub : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 15,
        color : colors.black,
        marginTop : -5
    },
    subtxt : {
        flex : 1,
        fontFamily : 'ReadexPro-Regular',
        fontSize : 15,
        color : colors.gray,
        marginTop : -5

    },
    maintxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        color : colors.black,
        alignSelf :'flex-start',
        marginLeft : 10,
        marginTop : 10,
    },
    bluetxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        color : colors.blue,
        alignSelf :'flex-start',
        marginLeft : 10,
        marginTop : 10,
    },
    textWrapper : {
        width : '100%'
    },
    teamItemWrapper : {
        backgroundColor : colors.blue,
        height : 26,
        borderRadius : 13,
        alignItems : 'center',
        justifyContent : 'center',
        marginHorizontal : 5

    },
    teamItemName : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 16,
        marginHorizontal : 15,
        color : colors.white
    },
    subtxtWrapper : {
        flexDirection : 'row'
    }


});

export default GuildProfile;