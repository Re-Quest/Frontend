import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import LinkPreview from 'react-native-link-preview';
import images from '../mainComponents/Images';

import colors from '../../assets/colors/colors';

const GuildProfile = () =>{
    const teamInfo = ['hi','hello'];
    const [view, setView] = useState(null);
    const URI = 'https://www.npmjs.com/package/react-native-link-preview'

    useEffect(()=>{
        setView(null);
        LinkPreview.getPreview(URI)
        .then((res) => setView(res));
    },[]);

    if(view){
        return(
            <View>
                <View style={styles.profileWrapper}>
                    
                    <View style={styles.textWrapper}>
    
                        <View style={styles.maintxtWrapper}>
                            <View style={styles.textlineWrapper}>
                                <Text style={styles.titletxt}>MADCAMP</Text>
                                <TouchableOpacity style={styles.editWrapper} onPress={()=>test()}>
                                    <Text style={styles.edittxt}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.titlemid}>student</Text>
                        </View>
                        
                        <View style={styles.subtxtWrapper}>
                            <Text style={styles.titlesub}>detail1</Text>
                            <Text style={styles.titlesub}>detail2</Text>
                        </View>
    
                        <View style={styles.teamsWrapper}>
                            <ScrollView style={styles.scrollview} horizontal={true} pagingEnabled={true} >
                                {teamInfo.map((val, idx)=>{
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
    
                <View>            
                    <Image resizeMode={'cover'}  style={{width: 50, height: 50}} source={{uri : view.images[0]}}/>
                    <Text>{view.title}</Text>
                    <Text>{view.description}</Text>
                    <Text>{view.url}</Text>
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
        height : 150,
        flexDirection : 'row',
        borderRadius : 20,
        backgroundColor : colors.white,
        justifyContent : 'flex-start',
        alignItems : 'center',

        shadowColor : colors.light_gray,
        elevation : 10
    },
    profileImg : {
        width : 100,
        height : 100,
        borderRadius : 50,
        margin : 20,
        flex : 1,
        backgroundColor : colors.white,
        resizeMode : 'contain'
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

export default GuildProfile;