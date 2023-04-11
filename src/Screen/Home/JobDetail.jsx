import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { JobList } from '../../Data/JobList';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import ModalAddress from '../../Components/ModalAddreess'
const JobDetail = () => {
    const addressModalRef = useRef(null);
    return (
        <View style={styles.MainView}>
            <View style={styles.Header}>
                <Text style={styles.HomeText}>Washing Jobs</Text>
                <View style={styles.JobDesc}>
                    <Text style={styles.JobDetailTxt}>Monthly Jobs - </Text>
                    <Text style={[styles.JobDetailTxt, { color: "#EE7523" }]}>60</Text>
                </View>
            </View>
            <ScrollView>
                {

                    JobList.map((item, index) => (
                        <View style={styles.JobView} key={index}>
                            <View style={styles.CarView}>
                                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2736/2736918.png" }} style={styles.CarLogo} />
                            </View>
                            <View style={[styles.CarViewData]}>
                                <Text style={[styles.DataInfo, { fontWeight: "600", color: "black", fontSize: 17 }]}>Car Wash</Text>
                                <Text style={styles.DataInfo}>ELITE i20 -KA MG 4602</Text>
                                <Text style={styles.DataInfo}>Address</Text>
                            </View>
                            <View style={styles.CarView}>
                                <Text style={styles.timeText}>Time</Text>
                            </View>
                        </View>

                    ))
                }
            </ScrollView>
            <TouchableOpacity style={styles.AddJobBtn} onPress={() => addressModalRef.current.showAddress()}>
                <Text style={styles.AddJobBtnText}>Add Jobs</Text>
            </TouchableOpacity>
            <ModalAddress ref={addressModalRef} />
        </View>
    )
}

export default JobDetail

const styles = StyleSheet.create({
    MainView: {
        width: windoWidth,
        height: windoHeight,
        backgroundColor: "white"
    },
    Header: {
        borderWidth: 1,
        padding: 20
    },
    HomeText: {
        fontSize: 20,
        color: "black",
        fontWeight: "600"
    },
    JobDesc: {
        display: "flex",
        flexDirection: "row"
    },
    JobDetailTxt: {
        fontSize: 22,
        color: "black",
        fontWeight: "700",
        marginTop: "5%"
    },
    JobView: {
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 15,
        backgroundColor: "white",
        paddingVertical: 10,
        borderBottomWidth: 1
        // marginVertical: 15
    },
    CarView: {
        width: windoWidth / 7,
        alignItems: "center"
    },
    CarViewData: {
        width: windoWidth / 7,
        justifyContent: "center",
        paddingHorizontal: 10,
        width: windoWidth / 1.6
    },
    DataInfo: {
        fontSize: 15,
        marginVertical: 5
    },
    timeText: {
        fontSize: 15,
        color: "black",
        fontWeight: "700"
    },
    AddJobBtn: {
        position: "absolute",
        bottom: "10%",
        backgroundColor: "#EE7523",
        left: "10%",
        right: "10%",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 5
    },
    AddJobBtnText: {
        fontSize: 20,
        color: "white"
    }
})