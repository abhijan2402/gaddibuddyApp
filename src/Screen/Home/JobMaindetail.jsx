import { StyleSheet, Text, View, Dimensions, PermissionsAndroid, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const JobMaindetail = ({ navigation }) => {
    const route = useRoute();
    const { CarId } = route.params;
    const [Details, setDetails] = useState([])
    const [Image1, setImage1] = useState("")

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
    let options = {
        saveToPhotos: true,
        mediaType: 'photo'
    }
    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options)
            console.log(result, " ia m result ");
            setImage1(result.assets[0].uri)
        }
    }
    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        setImage1(result.assets[0].uri)
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
                {/* <Text style={styles.IVText}>Add Video</Text> */}
            </View>
            <View style={styles.IVView}>
                <TouchableOpacity style={styles.Box} onPress={openCamera}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/685/685655.png" }} style={styles.CameraIcon} />
                    <Text style={styles.OpenCam}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Box} onPress={openGallery}>
                    <Image source={{ uri: "https://static.thenounproject.com/png/17840-200.png" }} style={styles.CameraIcon} />
                    <Text style={styles.OpenCam}>Open Gallery</Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    Image1 == "" ? <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: windoHeight / 4 }}>
                        <Text style={{ fontSize: 18, color: "black", fontWeight: "600" }}>No Image is Selected</Text>
                    </View> :
                        <Image source={{ uri: Image1 }} style={styles.ImageSeleted} />
                }
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
        borderRadius: 6,
        paddingHorizontal: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ImageSeleted: {
        marginHorizontal: 20,
        height: windoHeight / 4,
        marginVertical: 20,
        borderRadius: 8
    },
    CameraIcon: {
        width: windoWidth / 6.5,
        height: windoHeight / 14
    },
    OpenCam: {
        fontSize: 13,
        color: 'black'
    }
})