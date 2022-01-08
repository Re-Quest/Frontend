import { ScrollView, View, Text, StyleSheet } from "react-native";
import Swiper from 'react-native-swiper';
import colors from '../../assets/colors/colors'

const ScrollQuest = () => {

    const pagination = {
        top : "-100%"
    }

    return(
        <View style={styles.swiperWrapper}>
            <Swiper loop={false} index={1} paginationStyle={pagination}>
                <View>
                    <Text>Scroll1</Text>
                </View>
                <View>
                    <Text>Scroll2</Text>
                </View>
                <View>
                    <Text>Scroll3</Text>
                </View>
            </Swiper>
        </View>


    );
};

export default ScrollQuest;

const styles = StyleSheet.create({
    swiperWrapper : {
        flex : 1,
        width : "90%",
        margin : "5%",
        backgroundColor : colors.cool_white
    }
});