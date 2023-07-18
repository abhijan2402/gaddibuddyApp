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
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3631/3631163.png" }} style={{ width: 30, height: 30, marginRight: "2%" }} />
                <Text style={[styles.DetailStyle,]}>Service - </Text>
                <Text style={styles.DetailStyle}>{item.service}</Text>
            </View>
            <View style={styles.ContainerDetailStyle}>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3277/3277487.png" }} style={{ width: 27, height: 27, marginRight: "2%" }} />
                <Text style={[styles.DetailStyle,]}>Service Type - </Text>
                <Text style={styles.DetailStyle}>{item.serviceType}</Text>
            </View>
            <View style={styles.ContainerDetailStyle}>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3085/3085330.png" }} style={{ width: 30, height: 30, marginRight: "2%" }} />
                <Text style={[styles.DetailStyle,]}>Car Details - </Text>
                <Text style={[styles.DetailStyle, { width: "63%" }]}>{item.carId.carMake} {item.carId.carType} - {item.carId.carNo}</Text>
            </View>
            <View style={styles.ContainerDetailStyle}>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/11451/11451317.png" }} style={{ width: 24, height: 24, marginRight: "3%" }} />
                <Text style={[styles.DetailStyle,]}>Start Date - </Text>
                <Text style={styles.DetailStyle}>{item.start.slice(0, 10)}</Text>
            </View>
            <View style={[styles.MainViewText, { display: "flex", flexDirection: "row", alignItems: "center" }]}>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3593/3593591.png" }} style={{ width: 24, height: 24, marginRight: "3%" }} />
                <Text style={[styles.DetailStyle,]}>Status - </Text>
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
                <Text style={styles.CarText}>See More</Text>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/1635/1635581.png" }} style={{ width: 24, height: 24, marginRight: "3%" }} />
            </TouchableOpacity>
        </View>
    )
}

export default ListJobHome

const styles = StyleSheet.create({
    MainView: {
        borderWidth: 0.5,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderColor: "#EE7523",
        backgroundColor: "white",
        elevation: 7,
        shadowColor: "#EE7528"
    },
    MainViewText: {
        fontSize: 15,
        color: "black",
        marginVertical: 5,
        marginRight: "2%"
    },
    CarView: {
        // justifyContent: "flex-end",
        marginHorizontal: 10,
        width: windoWidth / 3.3,
        textAlign: "center",
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: "#EE7523",
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "4%"
    },
    CarText: {
        textAlign: "center",
        color: "white"
    },
    ContainerDetailStyle: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center"
    },
    DetailStyle: {
        fontSize: 15,
        color: "black",
        fontWeight: "600",
    }


})