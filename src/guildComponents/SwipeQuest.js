import { ScrollView, View, Text, StyleSheet } from "react-native";
import Swiper from 'react-native-swiper';
import colors from '../../assets/colors/colors';
import React, {useState, useEffect} from 'react';
import QuestView from './QuestView';
import axios from "axios";

const ScrollQuest = (props) => {

    const [data, setData] = useState(null);

    useEffect(()=>{
        setData(null);
        axios.get("http://192.249.18.141:80/api/quest/userQuests")
        .then((res)=>setData(res.data));
    },[]);

    const [swipeTitle, setSwipeTitle] = useState('QUESTED');

    const handleSwipe = (idx) => {
        if(idx===0){
            setSwipeTitle('QUESTED');
        }else if(idx===1){
            setSwipeTitle('INVENTORY');
        }else{
            setSwipeTitle('OUTVENTORY');
        }
    };

    const pagination = {
        top : "-115%"
    };

    if(data){
        console.log(data);
        return(
            <View style={styles.swiperWrapper}>
                <Text style={styles.title} >{swipeTitle}</Text>
                <Swiper loop={false} index={1} paginationStyle={pagination} onIndexChanged={(idx)=>handleSwipe(idx)} >
                    <View style={{width : '100%', height : '100%',paddingHorizontal:'1%'}}>
                        <ScrollView contentContainerStyle={{alignItems : 'center',flex:1}} horizontal={false} overScrollMode="never">
                            {(data.generated.length)?<>{
                                data.generated.map((item,idx)=>{
                                    return(<QuestView data={item} key={idx}/>);
                                })
                            }</>:(<View style={styles.emptyWrapper}>
                                <Text style={styles.empty}>No Quest</Text>
                            </View>)}
                        </ScrollView>
                    </View>
                    <View style={{width : '100%', height : '100%',paddingHorizontal:'1%'}}>
                        <ScrollView contentContainerStyle={{alignItems : 'center',flex:1}} horizontal={false} overScrollMode="never">
                            {(data.sent.length)?<>{
                                data.sent.map((item,idx)=>{
                                    return(<QuestView data={item} key={idx}/>);
                                })
                            }</>:(<View style={styles.emptyWrapper}>
                                <Text style={styles.empty}>No Quest</Text>
                            </View>)}
                        </ScrollView>
                    </View>
                    <View style={{width : '100%', height : '100%',paddingHorizontal:'1%'}}>
                        <ScrollView contentContainerStyle={{alignItems : 'center',flex:1}} horizontal={false} overScrollMode="never">
                            {(data.received.length)?<>{
                                data.received.map((item,idx)=>{
                                    return(<QuestView data={item} key={idx}/>);
                                })
                            }</>:(<View style={styles.emptyWrapper}>
                                <Text style={styles.empty}>No Quest</Text>
                            </View>)}
                        </ScrollView>
                    </View>
                </Swiper>
            </View>
        );

    }else{
        return(<Text>stay</Text>);
    }

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
    },
    empty : {

        fontSize : 18,
        fontFamily : 'ReadexPro-Medium',
        color : colors.light_gray,

    },
    emptyWrapper : {
        height : '100%',
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
});