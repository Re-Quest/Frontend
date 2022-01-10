
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors/colors';
import images from '../mainComponents/Images';
import axios from 'axios';

const showDate = (data) => {
    const date = data.split("T")[0];
    const hour = parseInt(data.split("T")[1].split(":")[0]);
    const min = parseInt(data.split("T")[1].split(":")[1]);
    const time = (hour>=12)?"PM":"AM";

    if(hour>12){
        return date + "\n" + (hour-12) + ":" + min + time;
    }else{
        return date + "\n" + hour + ":" + min + time;
    }
}

const Holder = (props) => {

    //data
    const holderName = props.data.title;
    const holderDetail = props.data.detail;
    const holderCreater = props.data.generatedBy;
    const holderimg = props.data.img;
    const holderdue = showDate(props.data.dueDate);

    const createrimg = holderCreater.profileImg;

    const select = () => {
        if(props.currHolder === props.idx){
            props.setCurrHolder(null);
        }else{
            props.setCurrHolder(props.idx);
        }
    };


    const styles = StyleSheet.create({
        holderWrapper:{
            width : '100%',
            height : 110,
            borderRadius : 20,
            flexDirection : 'row',
            justifyContent : 'flex-start',
            alignItems : 'center',
            backgroundColor : colors.cool_white,
            marginVertical : 8
        },
        holderWrapperSelected:{
            width : '100%',
            height : 110,
            borderRadius : 20,
            flexDirection : 'row',
            justifyContent : 'flex-start',
            alignItems : 'center',
            backgroundColor : colors.blue,
            marginVertical : 8
        },
        holderimg:{
            height : 70,
            width : 70,
            borderRadius : 35,
            backgroundColor : colors.white,
            marginHorizontal : 14
    
        },
        txtWrapper:{
    
        },
        titletxt:{
            fontSize : 22,
            fontFamily : 'ReadexPro-Bold',
            color : colors.black
    
        },
        detailtxt:{
            fontSize : 20,
            marginTop : -7,
            fontFamily : 'ReadexPro-Regular',
            color : colors.black
    
        },
        subWrapper:{
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'space-between'
    
        },
        createrWrapper:{
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'flex-start'
    
        },
        subtxt:{
            fontSize : 15,
            fontFamily : 'ReadexPro-Regular',
            color : (props.idx===props.currHolder)?colors.white:colors.mid_gray
        },
        createrimg:{
            height : 32,
            width : 32,
            borderRadius : 16,
            backgroundColor : colors.white,
            marginHorizontal : 5
    
        },
        dateWrapper:{
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'flex-start',
            marginLeft : 5
    
        },
        datetxt : {
            fontSize : 15,
            fontFamily : 'ReadexPro-Bold',
            color : (props.idx===props.currHolder)?colors.white:colors.holder[holderimg],
            marginHorizontal : 5
        }
    
    });



    
    return(
        <TouchableOpacity onPress={()=>select(props.currHolder)} disabled={props.view}>
            <View style={(props.idx!==props.currHolder || props.view)?styles.holderWrapper : styles.holderWrapperSelected}>
            
                <Image style={styles.holderimg} source={images.quest[holderimg]}/>
                <View style={styles.txtWrapper}>
                    <Text style={styles.titletxt}>{holderName}</Text>
                    <Text style={styles.detailtxt}>{holderDetail}</Text>
                    <View style={styles.subWrapper}>
                        <View style={styles.createrWrapper}>
                            <Text style={styles.subtxt}>CREATER</Text>
                            <Image style={styles.createrimg} source={images.profile[createrimg]}/>
                        </View>
                        <View style={styles.dateWrapper}>
                            <Text style={styles.subtxt}>DUE DATE</Text>
                            <Text style={styles.datetxt}>{holderdue}</Text>
                        </View>

                    </View>

                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Holder;

