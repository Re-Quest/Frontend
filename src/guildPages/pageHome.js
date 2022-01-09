import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import colors from '../../assets/colors/colors';
import CardProfile from '../mainComponents/CardProfile';
import axios from 'axios';
import Title from './title';


const pageHome = (props) => {
    const guildName = props.userToken.guildInfo[0].guildId;

    const check = () =>{
        axios.get("http://192.249.18.141:80/api/auth/check").
        then((res)=>console.log(res));
    };

    
    return(
        <View style={styles.box}>
            <Title pageName="home" guildName={guildName}/>
            <View style={styles.homepage}>
                <Text>{`This is ${props.position} main`}</Text>
                <ScrollView horizontal={true} overScrollMode='never'>
                    <CardProfile />
                    <CardProfile />
                    <CardProfile />
                    <CardProfile />
                    <CardProfile />
                    <CardProfile />
                </ScrollView>
                
                <TouchableOpacity style={{width:100,height:100,backgroundColor:colors.black}} onPress={()=>check()}></TouchableOpacity>
            </View>
        </View>

    );
};

export default pageHome;

const styles = StyleSheet.create({
    box : {
        height : '100%',
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'flex-start'
    },
    homepage : {
        height : '100%',
        width : '100%',
        alignItems : 'flex-start',
        justifyContent : 'flex-start',
        flexDirection : 'column',
        backgroundColor : colors.white,
        paddingHorizontal : 30
    }
});

