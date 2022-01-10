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
        return date + "\n" + (hour-12) + ":" + min + time;
    }else{
        return date + "\n" + hour + ":" + min + time;
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
                <Text>{props.data.generatedBy.userId}</Text>
                <Text>{showDate(props.data.genDate)}</Text>
                <Image source={Images.profile[createrImg]}/>
                <ScrollView contentContainerStyle={{alignItems : 'center'}}>
                    {quests.map((item,idx)=>{
                        return(<QuestView data={item} key={idx}/>);
                    })}
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
        width : '100%'

    },
    titletxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        color : colors.black,
        marginLeft : 10,
    },
    detail : {


    }

});