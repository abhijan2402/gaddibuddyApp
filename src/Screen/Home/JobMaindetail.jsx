import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useNavigation, useRoute } from '@react-navigation/native';

const JobMaindetail = ({ navigation }) => {
    const route = useRoute();
    const { CarId } = route.params;
    const [Details, setDetails] = useState([])

    useEffect(() => {
        GetCarDetails();
    }, [])
    const GetCarDetails = async () => {
        try {
            const response = await fetch(`http://192.168.4.185:9000/api/cars/${CarId}`, {
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
        <View style={styles.Header}>
            <Header title="MyJob" onPress={() => navigation.navigate('Homes')} />
            <View>
                <View style={styles.InfoView}>
                    <Text style={styles.InfoViewText}>Service : </Text>
                    <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>Washing</Text>
                </View>
                <View style={styles.InfoView}>
                    <Text style={styles.InfoViewText}>Car No : </Text>
                    <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>{Details.carNo}</Text>
                </View>
                <View style={styles.InfoView}>
                    <Text style={styles.InfoViewText}>Car Type : </Text>
                    <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>{Details.carType}</Text>
                </View>
                <View style={styles.InfoView}>
                    <Text style={styles.InfoViewText}>Address : </Text>
                    <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>{Details.houseName},{Details.streetName},{Details.pincode}</Text>
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