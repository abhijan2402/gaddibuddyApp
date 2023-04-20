import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Header = ({ title, onPress }) => {
    return (
        <View style={styles.MainHeader}>
            <TouchableOpacity onPress={onPress}>
                <Image source={{ uri: "https://www.kindpng.com/picc/m/19-193306_back-arrow-png-arrow-back-icon-png-transparent.png" }} style={styles.BackArrow} />
            </TouchableOpacity>
            <Text style={styles.MainHeaderText}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    MainHeader: {
        height: windoHeight / 13,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center"
    },
    MainHeaderText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700"
    },
    BackArrow: {
        width: 25,
        height: 20,
        marginHorizontal: 10
    }
})