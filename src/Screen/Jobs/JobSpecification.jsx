import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { JobList } from '../../Data/JobList';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const JobSpecification = ({ item, CarId }) => {
    const [Details, setDetails] = useState([])
    useEffect(() => {
        GetCarDetails()
    }, [])

    const GetCarDetails = async () => {
        try {
            const response = await fetch(`https://gaadibuddy.com/api/cars/${CarId}`, {
                method: "GET", // or 'PUT'
            });
            const result = await response.json();
            let CarD = result.car;
            setDetails(CarD)
            console.log(Deta);
        } catch (error) {
            console.log(error, 'jj')
        }
    }
    return (
        <View style={styles.JobView}>
            <View style={[styles.CarView, { width: windoWidth / 7.5 }]}>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2736/2736918.png" }} style={styles.CarLogo} />
            </View>
            <View style={[styles.CarViewData]}>
                <Text style={[styles.DataInfo, { fontWeight: "600", color: "black", fontSize: 17 }]}>{item.serviceSurface}</Text>
                <Text style={styles.DataInfo}>Model- {Details.carNo}</Text>
                <Text style={styles.DataInfo}>Service Type - {item.serviceType}</Text>
            </View>
            <View style={[styles.CarView, { width: windoWidth / 4.5 }]}>
                <Text style={styles.timeText}>{item.serviceStatus}</Text>
            </View>
        </View>
    )
}

export default JobSpecification

const styles = StyleSheet.create({
    JobView: {
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 15,
        backgroundColor: "#E2E0E0",
        paddingVertical: 10,
        marginVertical: 15
    },
    CarView: {
        width: windoWidth / 6,
        alignItems: "center",
        // borderWidth: 1
    },
    CarViewData: {
        width: windoWidth / 6,
        justifyContent: "center",
        paddingHorizontal: 10,
        width: windoWidth / 1.8
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
    Logo: {
        width: 23,
        height: 23
    },
    CarLogo: {
        width: 30,
        height: 30
    },
})