import {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignUpInfo from './SignUpInfo';

const SignNavigator = (props) =>{

    const Stack = createStackNavigator();

    const [register, setRegister] = useState(null);

    return(
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown : false}}>
            <Stack.Screen name="SignIn" children={({navigation})=><SignIn setUserToken={props.setUserToken} navigation={navigation}/>}/>
            <Stack.Screen name="SignUp"children={({navigation})=><SignUp setRegister={setRegister} navigation={navigation}/>}/>
            <Stack.Screen name="SignUpInfo" children={({navigation})=><SignUpInfo register={register} setRegister={setRegister} navigation={navigation}/>} />
        </Stack.Navigator>
    );
};

export default SignNavigator;