import {View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import colors from '../../assets/colors/colors';

import * as Font from 'expo-font';
import IconBack from '../../assets/icons/icon_back.svg';

const SignUp = (props) =>{

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


    const URL_SIGN_UP = "http://192.249.18.141:80/api/auth/register";

    const [ id, setID ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassWord ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');

    const signup = () => {
        axios.post(URL_SIGN_UP, {
            "userId" : id,
            "username" : name,
            "password" : password,
            "email" : email,
            "phone" : phone,
            "profileImg" : 3
        }).then((res)=>{
            console.log(res);
            setID('');
            setName('');
            setPassWord('');
            setEmail('');
            setPhone('');
            props.navigation.pop();
        });
    };

    if(isReady){
        return(
            <View style={styles.signuppage}>

                <View style={styles.backWrapper}>
                    <TouchableOpacity style={{alignItems : 'center', justifyContent : 'center'}} onPress={()=>props.navigation.pop()}>
                        <IconBack style={{alignSelf : 'flex-start'}} fill={colors.blue} width={35} height={35} />
                    </TouchableOpacity>
                </View>


                <Text style={styles.maintitle}>Create{"\n"}New Account</Text>
                <Text style={styles.subtitle}>Please fill the all blanks</Text>


                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.input} placeholder="Username" onChangeText={(val) => setID(val)} selectionColor={colors.blue}  />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.input} placeholder="Password" onChangeText={(val) => setPassWord(val)} secureTextEntry={true} selectionColor={colors.blue} />
                    </View>                    
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.input} placeholder="Name" onChangeText={(val) => setName(val)} selectionColor={colors.blue}  />
                    </View>                    
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.input} placeholder="Email" onChangeText={(val) => setEmail(val)} selectionColor={colors.blue}  />
                    </View>                    
                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.input} placeholder="Phone" onChangeText={(val) => setPhone(val)} selectionColor={colors.blue}  />
                    </View>
                </View>

                
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center'}} onPress={()=>signup()}>
                        <Text style={styles.button}>Create</Text>
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

export default SignUp;

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
    }
});

