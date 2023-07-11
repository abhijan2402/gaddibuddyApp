import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
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
            <View style={styles.ContainerDetailStyle}>
                <Text style={styles.DetailStyle}>Service - </Text>
                <Text style={styles.DetailStyle}>{item.service}</Text>
            </View>
            <View style={styles.ContainerDetailStyle}>
                <Text style={styles.DetailStyle}>Service Type - </Text>
                <Text style={styles.DetailStyle}>{item.serviceType}</Text>
            </View>
            <View style={styles.ContainerDetailStyle}>
                <Text style={styles.DetailStyle}>Start Date - </Text>
                <Text style={styles.DetailStyle}>{item.start.slice(0, 10)}</Text>
            </View>
            <View style={[styles.MainViewText, { display: "flex", flexDirection: "row", alignItems: "center" }]}>
                <Text style={styles.DetailStyle}>Status - </Text>
                {
                    item.serviceStatus == "Complete" ?
                        <>
                            <Text style={[styles.MainViewText, { color: "green", fontWeight: "800", fontSize: 17 }]}>{item.serviceStatus}</Text>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/190/190411.png" }} style={{ width: 20, height: 20 }} />
                        </>
                        :
                        <>
                            <Text style={[styles.MainViewText, { color: "red", fontWeight: "800", fontSize: 17, }]}>{item.serviceStatus}</Text>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/10755/10755684.png" }} style={{ width: 20, height: 20 }} />
                        </>

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
        borderColor: "#EE7523",
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "#EE7528"
    },
    MainViewText: {
        fontSize: 15,
        color: "black",
        marginVertical: 5,
        marginRight: "2%"
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
    },
    ContainerDetailStyle: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 5
    },
    DetailStyle: {
        fontSize: 15,
        color: "black",
        fontWeight: "600"
    }


})