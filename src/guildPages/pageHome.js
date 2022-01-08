import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors/colors';


const pageHome = (props) => {
    
    return(
        <View style={styles.homepage}>
            <Text>{`This is ${props.position} main`}</Text>
        </View>
    );
};

export default pageHome;

const styles = StyleSheet.create({

    homepage : {
        height : '100%',
        width : '100%',
        alignItems : 'flex-start',
        justifyContent : 'flex-start',
        flexDirection : 'column',
        backgroundColor : colors.white,
        paddingHorizontal : 30
    }
});

