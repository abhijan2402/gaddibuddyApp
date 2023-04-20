import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const JobMaindetail = ({ navigation }) => {
    return (
        <View style={styles.Header}>
            <Header title="MyJob" onPress={() => navigation.navigate('JobList')} />
            <View>
                <View style={styles.InfoView}>
                    <Text style={styles.InfoViewText}>Service : </Text>
                    <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>Washing</Text>
                </View>
                <View style={styles.InfoView}>
                    <Text style={styles.InfoViewText}>Car No : </Text>
                    <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>KA 51 Z 2072</Text>
                </View>
                <View style={styles.InfoView}>
                    <Text style={styles.InfoViewText}>Address : </Text>
                    <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>Kormangala</Text>
                </View>
            </View>
            <View style={styles.IVView}>
                <Text style={styles.IVText}>Add Image</Text>
                <Text style={styles.IVText}>Add Video</Text>
            </View>
            <View style={styles.IVView}>
                <View style={styles.Box}></View>
                <View style={styles.Box}></View>
            </View>
        </View>
    )
}

export default JobMaindetail

const styles = StyleSheet.create({

    Header: {
        width: windoWidth,
        height: windoHeight,
        backgroundColor: 'white'
    },
    MainHeader: {
        height: windoHeight / 13,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    MainHeaderText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700"
    },
    InfoView: {
        marginHorizontal: 10,
        // borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 10,
        marginVertical: 10
    },
    InfoViewText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700"
    },
    IVView: {
        marginHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: "5%"
    },
    IVText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700"
    },
    Box: {
        // borderWidth: 1,
        height: 100,
        width: 100,
        backgroundColor: "lightgrey",
        borderRadius: 6,
        paddingHorizontal: 10,
    }
})