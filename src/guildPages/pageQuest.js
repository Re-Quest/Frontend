import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuestHolder from '../mainComponents/QuestHolder';
import Title from './title';

const PageQuest = (props) => {
    const guildName = props.userToken.guildInfo[0].guildId;

    return(
        <View style={styles.box}>
            <Title guildName={guildName} pageName="guild quests"/>
            <View>
                <Text>Guild Quest Page</Text>
                <ScrollView horizontal={true} overScrollMode='never'>
                    <TouchableOpacity onPress={()=>touchQuest()}>
                        <QuestHolder/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <QuestHolder/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <QuestHolder/>
                    </TouchableOpacity>
                    
                </ScrollView>
            </View>
        </View>

    );

};

export default PageQuest;

const styles = StyleSheet.create({
    box : {
        height : '100%',
        width : '100%',
        flexDirection : 'column',
        justifyContent : 'flex-start'
    },

});