import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const ListJobHome = ({ item, onPress, Carid }) => {
    const [Details, setDetails] = useState([])

    useEffect(() => {
        console.log(Carid, "car id");
        GetCarDetails()
    }, [])
    const GetCarDetails = async () => {
        try {
            const response = await fetch(`http://192.168.4.185:9000/api/cars/${Carid}`, {
                method: "GET", // or 'PUT'
            });
            const result = await response.json();
            let CarD = result.car;
            setDetails(CarD)
        } catch (error) {
            console.log(error, 'jj')
        }
    }

    return (
        <TouchableOpacity style={styles.MainView}>
            <Text style={styles.MainViewText}>Status -{item.serviceStatus}</Text>
            <Text style={styles.MainViewText}>service {item.service}</Text>
            <Text style={styles.MainViewText}>Model-{Details.carNo}</Text>
            <Text style={styles.MainViewText}>Address {Details.houseName} ,{Details.streetName} ,{Details.pincode}</Text>
            <Text style={styles.MainViewText}>Service Type - {item.serviceType}</Text>
            <TouchableOpacity style={styles.CarView} onPress={onPress}>
                <Text style={styles.CarText}>See Car details</Text>
            </TouchableOpacity>
        </TouchableOpacity>
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