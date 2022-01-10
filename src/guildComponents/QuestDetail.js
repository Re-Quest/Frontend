import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import QuestView from './QuestView';

import colors from '../../assets/colors/colors';
import Images from  '../mainComponents/Images';
import axios from 'axios';


const showDate = (data) => {
    const date = data.split("T")[0];
    const hour = parseInt(data.split("T")[1].split(":")[0]);
    const min = parseInt(data.split("T")[1].split(":")[1]);
    const time = (hour>=12)?"PM":"AM";

    if(hour>12){
        return date;
    }else{
        return date;
    }
}

const QuestDetail = (props) => {

    const holder = props.data;
    let genDate ;
    let dueDate ;
    let createrId ;
    let createrImg ;
    let title ;
    let detail ;
    const [quests, setQuests] = useState(null);

    useEffect(()=>{
        if(holder){
            const URL = `http://192.249.18.141:80/api/quest/questsInHolder?questHolder=${holder._id}`
            axios.get(URL).
            then((res)=>{
                setQuests(res.data);

                const genDate = showDate(holder.genDate);
                const dueDate = showDate(holder.dueDate);
                const createrId = holder.generatedBy.userId;
                const createrImg = holder.generatedBy.profileImg;
                const title = holder.title;
                const detail = holder.detail;
            });
        }
    },[holder]);


    if(quests){
        return(
            <View style={styles.detailWrapper}>
                <Text style={styles.titletxt}>DETAILS</Text>
                <View style={{flexDirection:'row',marginLeft :10}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.detail}>CREATED BY </Text>
                        <Image source={Images.profile[createrImg]}/>
                        <Text style={styles.detailHighlight}>{props.data.generatedBy.userId.toUpperCase()}</Text>
                        <Text style={styles.detail}>AT </Text>
                        <Text style={styles.detailHighlight}>{showDate(props.data.genDate)}</Text>
                    </View>
                </View>
                
                <ScrollView contentContainerStyle={{alignItems : 'center',flex:1}}>
                    {(quests.length)?<>{
                        quests.map((item,idx)=>{
                            return(<QuestView data={item} key={idx}/>);
                        })
                    }</>:(<View style={styles.emptyWrapper}>
                        <Text style={styles.empty}>No Quest</Text>
                    </View>)}
                </ScrollView>
            </View>
        );
    }else{
        return(<Text>stay</Text>);
    }

};

export default QuestDetail;

const styles = StyleSheet.create({
    detailWrapper :{
        flex : 1,
        width : '100%',
        marginHorizontal : 20,

    },
    titletxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        color : colors.black,
        marginLeft :10

    },
    detail : {
        marginTop : -3,
        fontSize : 17,
        fontFamily : 'ReadexPro-Regular',
        color : colors.light_gray,
    },
    detailHighlight : {
        marginTop : -3,
        fontSize : 17,
        fontFamily : 'ReadexPro-Medium',
        color : colors.blue,
        marginHorizontal : 5
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