import {Text, View, TouchableOpacity, StyleSheet, TextInput, StatusBar, useColorScheme} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import colors from '../../assets/colors/colors';

import IconId from '../../assets/icons/icon_id.svg';
import IconPw from '../../assets/icons/icon_pw.svg';
import * as Font from 'expo-font';

const SignIn = (props) => {

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
    const URL_SIGN_IN = "http://192.249.18.141:80/api/auth/login";

    const [ id, setID ] = useState('');
    const [ password, setPassWord ] = useState('');

    const signin = () => {
        axios.post(URL_SIGN_IN, {
            "userId" : id,
            "password" : password
        }).then((res)=>{
            if(res.status == 401){
                props.setUserToken(null);
            }else{
                props.setUserToken(res.data.username);
                console.log(res.data.username);
            }

        });
    };

    if(isReady){
        return(
            <View style={styles.signinpage}>

                <Text style={styles.maintitle}>Hello,{"\n"}Welcome back!</Text>
                <Text style={styles.subtitle}>Log back into your account</Text>


                <View style={styles.inputWrapper}>
                    <IconId fill={colors.blue} width={20} height={20} marginLeft={30}/>
                    <TextInput style={styles.input} onChangeText={(val) => setID(val)} selectionColor={colors.blue}  />
                </View>

                <View style={styles.inputWrapper}>
                    <IconPw fill={colors.blue} width={20} height={20} marginLeft={30}/>
                    <TextInput style={styles.input} onChangeText={(val) => setPassWord(val)} secureTextEntry={true} selectionColor={colors.blue} />
                </View>

                
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>signin()}>
                        <Text style={styles.button}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View stye={styles.signupWrapper}>
                    <TouchableOpacity style={{width : '100%', alignItems : 'center'}} onPress={()=>props.navigation.push('SignUp')}>
                        <Text style={styles.littletitle}>Don't Have a Account?</Text>
                        <Text style={styles.midtitle}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }else{
        return(
            <Text>Hi</Text>
        );
    }


};
export default SignIn;

const styles = StyleSheet.create({
    signinpage : {
        height : '100%',
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : StatusBar.height,
        paddingHorizontal : '10%',
        backgroundColor : colors.white
    },
    inputWrapper : {
        flexDirection : 'row',
        alignItems : 'center',

        backgroundColor : colors.cool_white,
        width : '100%',
        margin : 10,
        height : 68,
        borderRadius : 20
    },
    input : {
        flex : 1,
        marginHorizontal : 30,
        fontSize : 20,
        fontFamily : 'ReadexPro-Regular'
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
    maintitle : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 40,
        alignSelf : 'flex-start',
        color : colors.black

    },
    subtitle : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 20,
        alignSelf : 'flex-start',
        color : colors.black
    },
    midtitle : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 20,
        color : colors.blue,
    },
    littletitle : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 18,
        color : colors.gray
    },
    signupWrapper : {
        width : '100%',
        flexDirection : 'column',
        alignItems : 'center'
    }
});