import {View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import colors from '../../assets/colors/colors';
import images from '../mainComponents/Images';

import IconBack from '../../assets/icons/icon_back.svg';

const SignUpInfo = (props) =>{


    const URL_SIGN_UP = "http://192.249.18.141:80/api/auth/register";

    const [ img, setImg ] = useState(0);

    const signup = () => {
        let data = props.register;
        data.profileImg = img;

        console.log(data);

        axios.post(URL_SIGN_UP, data).then((res)=>{
            console.log(res);
            props.setRegister(null);
            props.navigation.pop();
            props.navigation.pop();
        });
    };

        return(
            <View style={styles.signuppage}>

                <View style={styles.backWrapper}>
                    <TouchableOpacity style={{alignItems : 'center', justifyContent : 'center'}} onPress={()=>props.navigation.pop()}>
                        <IconBack style={{alignSelf : 'flex-start'}} fill={colors.blue} width={35} height={35} />
                    </TouchableOpacity>
                </View>


                <Text style={styles.maintitle}>Create{"\n"}New Account</Text>
                <Text style={styles.subtitle}>Please fill the all blanks</Text>


                <View style={styles.imageWrapper}>
                    <View style = {styles.Wrapper}>
                        <View style={styles.imgWrapper}>
                            <Image style={styles.img} source={images.profile[img]}/>
                        </View>
                        <Text style={styles.subtxt}>swipe and click to change</Text>
                    </View>

                    <View style={{width : '100%'}}>
                        <ScrollView horizontal={true} marginVertical={2} >
                            {images.profile.map((item,idx)=>{
                                return(
                                    <View style={styles.minimgWrapper} key={idx}>
                                        <TouchableOpacity onPress={()=>setImg(idx)}>
                                            <Image style={styles.minimg} source={item} />
                                        </TouchableOpacity>
                                    </View>
                                    );
                            })}
                        </ScrollView>
                    </View>

                </View>


                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.default} defaultValue='MadCamp' editable={false} selectionColor={colors.blue} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.default} defaultValue='Participant' editable={false} selectionColor={colors.blue} />
                    </View>

                </View>

                
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>signup()}>
                        <Text style={styles.button}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
};

export default SignUpInfo;

const styles = StyleSheet.create({
    signuppage : {
        height : '100%',
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : StatusBar.height,
        paddingHorizontal : '10%',
        backgroundColor : colors.white
    },
    inputContainer : {
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    inputWrapper : {
        width : '100%',
        flexDirection : 'column',
        alignItems : 'center',
        backgroundColor : colors.cool_white,
        margin : 10,
        height : 60,
        borderRadius : 20,
        marginHorizontal : 30,
        justifyContent : 'center'
    },
    input : {
        width : '80%',
        fontSize : 20,
        fontFamily : 'ReadexPro-Regular'
    },
    default : {
        width : '80%',
        fontSize : 20,
        fontFamily : 'ReadexPro-Regular',
        color : colors.black

    },
    button : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 20,
        color : colors.white
    },
    buttonWrapper : {
        width : '100%',
        margin : 10,
        height : 68,
        borderRadius : 20,
        backgroundColor : colors.blue,
        shadowColor : colors.blue_sh,
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 0.5,
        shadowRadius : 10,
        elevation : 10
    },
    subtitle : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 20,
        alignSelf : 'flex-start',
        color : colors.black
    },
    maintitle : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 40,
        alignSelf : 'flex-start',
        color : colors.black

    },
    backWrapper : {
        alignSelf : 'flex-start',
    },



    imageWrapper : {
        flexDirection : 'column',
        alignItems : 'center'
    },
    img : {
        backgroundColor : colors.white,
        width : 130,
        height : 130,
        borderRadius : 65,
    },
    imgWrapper : {
        width : 130,
        height : 130,
        margin : 15,
        borderRadius : 70,
        shadowColor : colors.light_gray,
        shadowOffset : {
            width : 0,
            height : 0
        },
        shadowRadius : 0,
        elevation : 10
    },
    minimg : {
        backgroundColor : colors.white,
        width : 36,
        height : 36,
        borderRadius : 18,

    },
    minimgWrapper : {
        width : 36,
        height : 36,
        backgroundColor : null,
        marginHorizontal : 4

    },

    titletxt : {
        fontSize : 20,
        fontFamily : 'ReadexPro-Bold',
        marginHorizontal : 13
    },
    subtxt : {
        fontSize : 17,
        marginTop : -8,
        fontFamily : 'ReadexPro-Regular',
        color : colors.gray,
        marginHorizontal : 13

    },
    Wrapper : {
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
    },
});

