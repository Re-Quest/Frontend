
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors/colors';
import images from '../mainComponents/Images';

const Holder = (props) => {

    //data
    const holderName = "MT Hotel Reservation";
    const holderDetail = "Let's go 2022 winter mt!";
    const holderCreater = props.idx;
    const holderimg = props.idx;
    const holderdue = "2022-01-03";


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
            backgroundColor : (props.selected)?colors.blue:colors.cool_white,
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
            color : colors.mid_gray
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
            fontSize : 18,
            fontFamily : 'ReadexPro-Medium',
            color : colors.holder[holderimg],
            marginHorizontal : 5
    
        }
    
    });




    return(
        <TouchableOpacity onPress={()=>select()}>
            <View style={styles.holderWrapper}>
            
                <Image style={styles.holderimg} source={images.quest[holderimg]}/>
                <View style={styles.txtWrapper}>
                    <Text style={styles.titletxt}>{holderName}</Text>
                    <Text style={styles.detailtxt}>{holderDetail}</Text>
                    <View style={styles.subWrapper}>
                        <View style={styles.createrWrapper}>
                            <Text style={styles.subtxt}>CREATER</Text>
                            <Image style={styles.createrimg} source={images.profile[holderCreater]}/>
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

