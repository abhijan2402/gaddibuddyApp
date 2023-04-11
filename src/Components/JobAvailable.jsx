import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const JobAvailable = ({ NOJ, Type, onPress }) => {
    return (
        <View style={styles.MainView}>
            <View style={styles.Header}>
                <Text style={[styles.JobText, { fontSize: 24 }]}>{NOJ}</Text>
                <Text style={styles.JobText}>{Type} Jobs Available</Text>
            </View>
            <TouchableOpacity style={styles.ViewAllBtn} onPress={onPress}>
                <Text style={styles.BtnText}>View All</Text>
            </TouchableOpacity>
        </View>
    )
}

export default JobAvailable

const styles = StyleSheet.create({
    MainView: {
        borderWidth: 2,
        borderColor: "#EE7523",
        marginHorizontal: 15,
        borderRadius: 8,
        padding: 10,
        marginVertical: 20
    },
    Header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    JobText: {
        fontSize: 20,
        color: "black",
        marginHorizontal: 5,
        fontWeight: "700"
    },
    ViewAllBtn: {
        borderWidth: 1,
        alignSelf: "flex-end",
        borderRadius: 8,
        marginVertical: 10
    },
    BtnText: {
        color: "#EE7523",
        paddingHorizontal: 15,
        paddingVertical: 5,

    }
})