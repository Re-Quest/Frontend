import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors/colors';
import IconBack from '../../assets/icons/icon_back.svg';


const Title = (props) => {
    
    const imgurl = "../../assets/images/img_7.png"

    return(
        <View style={styles.titleWrapper}>
            {(props.navigation)?
                <View style={styles.imgWrapper}>
                    <TouchableOpacity style={{alignItems : 'center', justifyContent : 'center'}} onPress={()=>props.navigation.pop()}>
                        <IconBack style={{alignSelf : 'flex-start'}} fill={colors.blue} width={35} height={35} />
                    </TouchableOpacity>
                </View>
                :<Image style={styles.imgWrapper} source={require(imgurl)}/>
            }
            <View style={styles.txtWrapper} >
                <Text style={styles.pagetxt} >{props.pageName.toUpperCase()}</Text>
                <Text style={styles.guildtxt} >{props.guildName.toUpperCase()}</Text>
            </View>


        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    titleWrapper : {
        width : '100%',
        height : 70,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        paddingHorizontal : 25,
        backgroundColor : colors.white,
        shadowColor : colors.light_gray,
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 0.5,
        shadowRadius : 10,
        elevation : 10
    },
    imgWrapper : {
        width : 35,
        height : 35,
        borderRadius : 15,
        marginRight : 15,
        backgroundColor : colors.white
    },
    txtWrapper : {
        flexDirection : 'column',
        alignItems : 'flex-start'

    },
    pagetxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 25,
        color : colors.black

    },
    guildtxt : {
        fontFamily : 'ReadexPro-Medium',
        fontSize : 16,
        marginTop : -10,
        color : colors.black

    }

});