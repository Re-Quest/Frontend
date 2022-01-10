import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import colors from '../../assets/colors/colors';
import CardProfile from '../mainComponents/CardProfile';
import axios from 'axios';
import Title from './title';

import IconSearch from '../../assets/icons/icon_search.svg';


const pageHome = (props) => {
    const guildName = props.userToken.guildInfo[0].guildId;
    const [userList, setUserList] = useState(null);
    const [filterList, setFilterList] = useState(null);

    useEffect(()=>{
        axios.post("http://192.249.18.141:80/api/auth/getAll")
        .then((res)=>{
            setUserList(res.data);
            setFilterList(res.data);
        });
    },[props.refresh]);

    const setFilter = (val) =>{
        if(!(typeof(val)==='string') || val.length===0){
            setFilterList([...userList]);
            return ;
        }
        let tmp = [];
        for(let i=0 ; i<userList.length ; i++){
            let user = userList[i];
            if(user.userId.toLowerCase().includes(val) || user.phone.toLowerCase().includes(val) || 
            'dummy'.toLowerCase().includes(val) || user.email.toLowerCase().includes(val)){
                tmp.push(user);
            }
        }
        setFilterList(tmp);
    };

    
    if(filterList){
        return(
            <View style={styles.box}>
                <Title pageName="home" guildName={guildName}/>
                <View style={styles.homepage}>
                    <View style={styles.search}>
                        <IconSearch style={{width : 20, height : 20}} fill={colors.blue} />
                        <TextInput style={styles.search} placeholder='find your teammates' onChangeText={(val) => setFilter(val.toLowerCase())} selectionColor={colors.blue}/>
                    </View>
          
                    <ScrollView horizontal={true} overScrollMode='never'>
                        {filterList.map((item,idx)=>{
                            return(<CardProfile data={item} key={idx} />);
                        })}
                    </ScrollView>
                    
                    <TouchableOpacity style={{width:100,height:100,backgroundColor:colors.black}} onPress={()=>check()}></TouchableOpacity>
                </View>
            </View>
    
        );
    }else{
        return(<Text>loading</Text>);
    }

};

export default pageHome;

const styles = StyleSheet.create({
    box : {
        height : '100%',
        width : '100%',
    },
    homepage : {
        flex : 1,
        width : '100%',
        height : '100%',
        paddingHorizontal : '5%',
        paddingTop : '3%',
        backgroundColor : colors.white,
        alignItems : 'center'
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
    }
});

