import { ScrollView, View, Text, StyleSheet } from "react-native";
import Swiper from 'react-native-swiper';
import colors from '../../assets/colors/colors';
import React, {useState, useEffect} from 'react';
import QuestView from './QuestView';
import * as Font from 'expo-font';

const ScrollQuest = (props) => {

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
    },[]);
    //

    const [swipeTitle, setSwipeTitle] = useState('ON PROGRESS')

    const handleSwipe = (idx) => {
        if(idx===0){
            setSwipeTitle('QUESTED');
        }else if(idx===1){
            setSwipeTitle('ON PROGRESS');
        }else{
            setSwipeTitle('TERMINATED');
        }
    };

    const pagination = {
        top : "-115%"
    };

    return(
        <View style={styles.swiperWrapper}>
            <Text style={styles.title} >{swipeTitle}</Text>
            <Swiper loop={false} index={0} paginationStyle={pagination} onIndexChanged={(idx)=>handleSwipe(idx)} >
                <View style={{width : '90%', height : '100%',marginHorizontal:'5%', backgroundColor : colors.cool_white}}>
                    <Text>{`Scroll1 ${props.position}`}</Text>
                    <QuestView />
                </View>
                <View style={{width : '100%', height : '100%',paddingHorizontal:'1%'}}>
                    <ScrollView contentContainerStyle={{alignItems:'center'}} horizontal={false} overScrollMode="never">
                        <QuestView />
                        <QuestView />
                        <QuestView />
                        <QuestView />
                    </ScrollView>
                </View>
                <View style={{width : '90%', height : '100%',marginHorizontal:'5%', backgroundColor : colors.cool_white}}>
                    <Text>{`Scroll3 ${props.position}`}</Text>
                </View>
            </Swiper>
        </View>


    );
};

export default ScrollQuest;

const styles = StyleSheet.create({
    swiperWrapper : {
        flex : 1,
        width : "100%",
        marginTop : "5%",
        paddingTop : '3%',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center'
    },
    title : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20,
        marginVertical : '2%',
        color : colors.black
    }
});