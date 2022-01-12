import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ImgTeam from '../../assets/images/img_7.png';
import {Picker} from '@react-native-picker/picker';
import colors from '../../assets/colors/colors';
import * as Font from 'expo-font';
import { color } from 'react-native-reanimated';

const GuildTitle = (props) => {

    // Font loading
    const [isReady, setIsReady] = useState(false);

    const loadFont = async() => {
        await Font.loadAsync({
            'ReadexPro-Bold' : require('../../assets/fonts/ReadexPro-Bold.ttf'),
            'ReadexPro-Regular' : require('../../assets/fonts/ReadexPro-Regular.ttf')
        })
        setIsReady(true);
    };
    useEffect(()=>{
        loadFont();
        setPosition(guildName);
    },[]);


    // Props
    const position = props.position;
    const setPosition = props.setPosition;

    // Data
    const guildName = 'react-study'
    const teamName = 'TEAM2'
    const teamList = ['TEAM1','TEAM2','TEAM3']

    const [ isExpand, setIsExpand ] = useState(false);

    const teamWrapperWidth = isExpand? 120:0;

    const expandWrapper = () => {
        if(isExpand){
            setIsExpand(false);
            setPosition(guildName);
        }else{
            setIsExpand(true);
            setPosition(teamList[0]);
        }
    };


    if(isReady){
        return(
            <View style={styles.titleWrapper}>
                <TouchableOpacity style={styles.guildWrapper} onPress={()=>expandWrapper()} activeOpacity={1}>
                    <Image style={styles.guildLogo} source={ImgTeam} />
                    <Text style={styles.guildName}>{guildName.toUpperCase()}</Text>
                </TouchableOpacity>

                <View>
                    <View style={[styles.teamWrapper, {width:teamWrapperWidth*2}]}></View>
                    <Picker
                        mode="dropdown"
                        style={[styles.picker, {width:teamWrapperWidth}]}
                        selectedValue={position}
                        onValueChange={(val, idx)=>setPosition(val)}
                        dropdownIconColor={null}
                    >
                        {teamList.map((value, index)=>{
                                return <Picker.Item label={value} value={value} key={index}/>
                            })
                        }
                    </Picker>
                </View >
            
            </View>
        );
    }else{
        return(<Text></Text>);
    }
};

const styles = StyleSheet.create({
    titleWrapper : {
        height : '10%',
        marginHorizontal : '5%',
        alignItems : 'center',
        flexDirection : 'row',

    },
    guildWrapper : {
        height : 50,
        borderRadius : 25,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        backgroundColor : colors.white
    },
    guildLogo : {
        width : 30,
        height : 30,
        borderRadius : 15,
        margin : 10,
        backgroundColor : colors.white
    },
    guildName : {
        marginRight : 25,
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20
    },
    picker : {
        position : 'absolute',
        zIndex : -1,
        backgroundColor : null
    }, 
    teamWrapper : {
        height : 50,
        borderRadius : 25,
        position : 'relative',
        left : -120,
        zIndex : -2,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        backgroundColor : '#ffffff'
    },
    teamName : {
        marginLeft : 60,
        marginRight : 25,
    }

});

export default GuildTitle;