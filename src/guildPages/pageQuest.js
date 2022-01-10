import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import IconSearch from '../../assets/icons/icon_search.svg'
import QuestHolder from '../mainComponents/QuestHolder';
import Title from './title';
import colors from '../../assets/colors/colors';
import axios from 'axios';
import QuestDetail from '../guildComponents/QuestDetail';

const PageQuest = (props) => {
    const guildName = props.userToken.guildInfo[0].guildId;
    const [holderList, setHolderList] = useState(null);
    const [filterList, setFilterList] = useState(null);
    const [selectHolder, setSelectHolder] = useState(null);

    useEffect(()=>{
        // to refresh the page initialize the data
        setFilterList(null);
        axios.get("http://192.249.18.141:80/api/quest/readHolders")
        .then((res)=>{
            setHolderList(res.data);
            setFilterList(res.data);
            setSelectHolder(res.data[0]);
        });
    },[props.refresh]);

    const setFilter = (val) =>{
        if(!(typeof(val)==='string') || val.length===0){
            setFilterList([...holderList]);
            return ;
        }
        let tmp = [];
        for(let i=0 ; i<holderList.length ; i++){
            let holder = holderList[i];
            if(holder.title.toLowerCase().includes(val)){
                tmp.push(holder);
            }
        }
        setFilterList(tmp);
    };

    const select=(item) => {
        setSelectHolder(item);
    };

    if(filterList){
        return(
            <View style={styles.box}>
                <Title guildName={guildName} pageName="guild quests"/>
                <View style={styles.questpage}>
                    <View style={styles.holderWrapper}>
                        <Text style={styles.titletxt}>QUEST HOLDERS</Text>
                        <View style={styles.search}>
                            <IconSearch style={{width : 20, height : 20}} fill={colors.blue} />
                            <TextInput style={styles.search} placeholder="find quest holder" onChangeText={(val) => setFilter(val.toLowerCase())} selectionColor={colors.blue}/>
                        </View>
                        <ScrollView style={styles.scroll} horizontal={true} overScrollMode='never'>
                            {filterList.map((item, idx)=>{
                                return(
                                    <TouchableOpacity key={idx} onPress={()=>select(item)}>
                                        <QuestHolder data={item} idx={idx}/>
                                    </TouchableOpacity>
                                );
                            })}            
                        </ScrollView>
                    </View>
                    <QuestDetail data={selectHolder}/>
                        
                </View>
            </View>
        );

    }else{
        return(<Text>wait</Text>);
    }


};

export default PageQuest;

const styles = StyleSheet.create({
    box : {
        width : '100%',
        height : '100%',
    },
    questpage : {
        flex : 1,
        width : '100%',
        height : '100%',
        paddingHorizontal : '5%',
        paddingTop : '5%',
        paddingBottom : '3%',
        
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'center',
        backgroundColor : colors.white
    },
    holderWrapper : {
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'center',

    },
    search : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        height : 46,
        width : '100%',
        backgroundColor : colors.cool_white,
        borderRadius : 23,
        paddingHorizontal : 20,
        fontFamily : 'ReadexPro-Regular',
        fontSize : 18,
        color : colors.black
    },
    titletxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        color : colors.black,
        alignSelf :'flex-start',
        marginLeft : 10,
        marginBottom : 5
    },
    scroll : {
        width : '100%',
        marginVertical : 10,


    },
    detail : {
        width : '100%'
    }
});