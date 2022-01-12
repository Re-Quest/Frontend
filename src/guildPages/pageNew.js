import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';

import Title from './title';
import colors from '../../assets/colors/colors';
import axios from 'axios';

import IconHolder from '../../assets/icons/icon_holder.svg';
import IconAdd from '../../assets/icons/icon_add.svg';
import Holder from '../guildComponents/Holder';


const PageNew = (props) => {

    const guildName = props.userToken.guildInfo[0].guildId;
    const [currHolder, setCurrHolder] = useState(null); //index of selected holder
    const [holderList, setHolderList] = useState(null); // all list of holders

    useEffect(()=>{
        // to refresh the page initialize the data
        setCurrHolder(null);
        setHolderList(null);
        axios.get("http://192.249.18.141:80/api/quest/readHolders")
        .then((res)=>{
            setHolderList(res.data);
        });
    },[props.refresh]);

    const nextpage = () => {
        props.setHolder(holderList[currHolder]); // to pass the current holder data
        props.navigation.push('NewQuest');
    };

    const styles = StyleSheet.create({
        box : {
            width : '100%',
            height : '100%'
        },
        newpage : {
            flex : 1,
            width : '100%',
            height : '100%',
            paddingHorizontal : '5%',
            paddingTop : '3%',
            backgroundColor : colors.white,
            alignItems : 'center'
        },
        button : {
            fontFamily : 'ReadexPro-Regular',
            fontSize : 20,
            color : colors.white
        },
        buttonWrapper : {
            width : '50%',
            height : 50,
            marginTop : 12,
            marginBottom : 18,
            borderRadius : 20,
            backgroundColor : (currHolder===null)?colors.cool_white:colors.blue,
        },
        titleWrapper : {
            width : '100%',
            flexDirection : 'row',
            justifyContent : 'flex-start',
            alignItems : 'center'
    
        },
        txtWrapper : {
            flexDirection : 'column',
            alignItems : 'flex-start',
            justifyContent : 'center',
            marginLeft : 15
        },
        maintxt : {
            fontSize : 20,
            fontFamily : 'ReadexPro-Bold',
            color : colors.blue_sh
    
        },
        subtxt : {
            fontSize : 17,
            marginTop : -6,
            fontFamily : 'ReadexPro-Regular',
            color : colors.gray
    
        },
        scroll : {
            width : '100%',
            marginTop : 10,
            flex : 1
    
        },
        newWrapper : {
            width : '100%',
            height : 110,
            borderRadius : 20,
            backgroundColor : colors.cool_white,
            marginVertical : 8
            
        },
        newtxt : {
            fontSize : 17,
            fontFamily : 'ReadexPro-Medium',
            color : colors.mid_gray
        }
    
    });

    if(holderList){
        return(
            <View style={styles.box} >
                <Title guildName={guildName} pageName="new quest"/>
                <View style={styles.newpage}>
    
                    <View style={styles.titleWrapper}>
                        <IconHolder fill={colors.blue} width={25} height={25} marginLeft={8}/>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.maintxt}>QUEST HOLDER</Text>
                            <Text style={styles.subtxt}>Select quest holder</Text>
                        </View>
                    </View>
                    <View style={styles.scroll}>
                        <ScrollView overScrollMode='never'>
                            <>
                                <View style={styles.newWrapper}>
                                    <TouchableOpacity style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>props.navigation.push('NewQuestHolder')}>
                                        <IconAdd fill={colors.mid_gray} width={25} height={25} margin={5}/>
                                        <Text style={styles.newtxt}>NEW QUEST HOLDER</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            {holderList.map((item, idx)=>{
                                return <Holder data={item} setCurrHolder={setCurrHolder} currHolder={currHolder} idx={idx} key={idx}/>;
                            })}
                        </ScrollView>
                    </View>
    
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>nextpage()} disabled={currHolder===null}>
                            <Text style={styles.button}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
    
                </View>
    
            </View>
        );

    }else{
        return(<Text></Text>);
    }


};

export default PageNew;

