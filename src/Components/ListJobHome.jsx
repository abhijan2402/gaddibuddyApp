import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const ListJobHome = ({ item, onPress }) => {
    const [Details, setDetails] = useState([])

    useEffect(() => {
        console.log(item, "car id");
        // GetCarDetails()
    }, [])
    const GetCarDetails = async () => {
        try {
            const response = await fetch(`https://gaadibuddy.com/api/cars/${Carid}`, {
                method: "GET", // or 'PUT'
            });
            const result = await response.json();
            let CarD = result.car;
            setDetails(CarD)
            console.log(Details, " I am detaimling oage");
        } catch (error) {
            console.log(error, 'jj')
        }
    }

    return (
        <View style={styles.MainView}>
            <Text style={styles.MainViewText}>service {item.service}</Text>
            {/* <Text style={styles.MainViewText}>Model-{CarNo}</Text> */}
            {/* <Text style={styles.MainViewText}>Address {Carid.houseName} ,{Carid.streetName} ,{Carid.pincode}</Text> */}
            <Text style={styles.MainViewText}>Service Type - {item.serviceType}</Text>
            <Text>{item.start}</Text>
            <View style={[styles.MainViewText, { display: "flex", flexDirection: "row" }]}>
                <Text style={styles.MainViewText}>Status - </Text>
                {
                    item.serviceStatus == "Complete" ?
                        <Text style={[styles.MainViewText, { color: "green", fontWeight: "800", fontSize: 17 }]}>{item.serviceStatus}</Text> :
                        <Text style={[styles.MainViewText]}>{item.serviceStatus}</Text>

                }
            </View>

            <TouchableOpacity style={styles.CarView} onPress={onPress}>
                <Text style={styles.CarText}>See Car details</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListJobHome

const styles = StyleSheet.create({
    MainView: {
        borderWidth: 2,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderColor: "#EE7523"
    },
    MainViewText: {
        fontSize: 15,
        color: "black",
        marginVertical: 5
    },
    CarView: {
        justifyContent: "flex-end",
        marginHorizontal: 10,
        width: windoWidth / 3,
        textAlign: "center",
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: "#EE7523",
        alignSelf: "flex-end"
    },
    CarText: {
        textAlign: "center",
        color: "white"
    }


})