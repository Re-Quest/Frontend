import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Img from '../../assets/images/img_shark.png';
import colors from '../../assets/colors/colors';
import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font';



const QuestView = () => {

     // Font loading
     const [isReady, setIsReady] = useState(false);

     const loadFont = async() => {
         await Font.loadAsync({
            'ReadexPro-Bold' : require('../../assets/fonts/ReadexPro-Bold.ttf'),
            'ReadexPro-Medium' : require('../../assets/fonts/ReadexPro-Medium.ttf'),
            'ReadexPro-Regular' : require('../../assets/fonts/ReadexPro-Regular.ttf')
         })
         setIsReady(true);
     };
     useEffect(()=>{
         loadFont();
     },[]);
     //
     

     // Data

    const taskName = "[ Main Tab Icon File Please! ]";
    const lastHolder = "DESIGNER";
    const currHolder = "ME";
    const comment = "Thank you"
    const date = "01-08-FRI 5PM";
    const next = ">";
    //

    if(isReady){
        return(
            <View style={styles.questWrapper}>
                <View style={styles.mainWrapper}>
                    <Text style={styles.titletxt}>{taskName}</Text>
                    <View>
                        <TouchableOpacity>
                            <Text style={styles.buttontxt}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.midWrapper}>
                    <View style={styles.txtbox}>
                        <Text style={styles.txt}>{lastHolder}</Text>
                    </View>
                    <View>
                        <Text style={styles.midtxt}>{next}</Text>
                    </View>
                    <View style={styles.txtbox}>
                        <Text style={styles.txt}>{currHolder}</Text>
                    </View>
    
                </View>
    
                <View style={styles.subWrapper}>
                    <View style={{flex:1}}>
                        <Text style={styles.light_title}>RECENT COMMENT</Text>
                        <View style={styles.comment}>
                            <Image style={styles.comment_img} source={Img}/>
                            <Text style={styles.midtxt}>{comment}</Text>
                        </View>
                    </View>
    
                    <View style={{flex:1}}>
                        <Text style={styles.light_title}>DUE DATE</Text>
                        <View style={styles.date_box}>
                            <Text style={styles.datetxt}>{date}</Text>
                        </View>
                    </View>
    
    
                </View>
            </View>
        );

    }else{
        return(<Text>hi</Text>);
    }

};
export default QuestView;

const styles = StyleSheet.create({
    questWrapper : {
        backgroundColor : colors.white,
        width : '100%',
        height : 140,
        borderRadius : 20,
        paddingVertical : 15,
        paddingHorizontal : 20,
        marginVertical : 10,
    },
    mainWrapper : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    midWrapper : {
        flexDirection : 'row',
        justifyContent : 'flex-start'
    },
    titletxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20,
        color : colors.black

    },
    buttontxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20,
        color : colors.blue
    },
    light_title : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 14,
        color : colors.light_gray
    },
    subWrapper : {
        flexDirection : 'row',
        justifyContent : 'flex-start'
    },
    midtxt : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 18,
        color : colors.black
    },
    txt : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 15,
        color : colors.black
    },
    datetxt : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 19,
        color : colors.blue
    },
    comment_img : {
        width : 32,
        height : 32,
        backgroundColor : colors.white,
        borderRadius : 16
    },
    comment : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    txtbox : {
        height : 24,
        borderRadius : 12,
        paddingHorizontal : 10,
        backgroundColor : colors.blue,
        justifyContent : 'center'

    }
    
});