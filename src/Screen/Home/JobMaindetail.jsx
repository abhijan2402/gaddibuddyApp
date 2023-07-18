import { StyleSheet, Text, View, Dimensions, PermissionsAndroid, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import Toast from '../../Components/Toast';
import { ActivityIndicator } from 'react-native-paper';
const JobMaindetail = ({ navigation, }) => {
    const route = useRoute();
    const { CarType, serviceType, ScheduledId, Address, SecondAddress, item } = route.params;
    const [Details, setDetails] = useState([])
    const [Image1, setImage1] = useState("")
    const [Image64test, setImage64test] = useState("")
    const [base64toImg, setbase64toImg] = useState("")
    const [ImageTypoe, setImageTypoe] = useState("")


    const childRef = useRef(null);
    const [toastColorState, setToastColorState] = useState('rgba(41,250,25,1)');
    const [toastTextColorState, setToastTextColorState] = useState('black');
    const [toastMessage, setToastMessage] = useState('');
    const [loader, setloader] = useState(false)

    useEffect(() => {
        console.log(ScheduledId, item, "secheduled id");
        GetImage()
    }, [])
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
            const ImageRes = result.assets[0].uri;
            setImage1(ImageRes)
            let Types = result.assets[0].type
            setImageTypoe(Types)
        }
    }
    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        const ImageRes = result.assets[0].uri;
        setImage1(ImageRes)
        let Types = result.assets[0].type
        setImageTypoe(Types)
    }
    const Image64 = async (jobStatus) => {
        console.log(ImageTypoe, "I am check");
        setloader(true)
        if (ImageTypoe == "") {
            UpdateStatus(jobStatus)
        }
        else {
            ImgToBase64.getBase64String(`${Image1}`)
                .then((base64String) => {
                    ;
                    let UVC = `data:${ImageTypoe};base64,` + base64String;
                    console.log(UVC);
                    console.log(Image64test, 'j');
                    try {

                        const response = fetch(`https://gaadibuddy.com/api/imageUpload/${ScheduledId}`, {
                            method: "POST", // or 'PUT'
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            },
                            body: JSON.stringify({
                                "imgSource": UVC
                            })
                        });
                        console.log(response, "imager uploaded");
                        UpdateStatus(jobStatus)
                    } catch (error) {
                        console.log(error, "error");
                    }
                })
                .catch((err) => {
                    console.log(err, " i am image error");
                });
        }
    }

    const GetImage = async () => {
        try {
            const response = await fetch(`https://gaadibuddy.com/api/imageUpload/${ScheduledId}`, {
                method: "GET", // or 'PUT'
            });
            const result = await response.json();
            // console.log(result.imgSource, "imager uploaded");
            setbase64toImg(result.imgSource);
            // console.log(base64toImg, "i am thre final image");
        } catch (error) {
            console.log(error, "error");
        }
    }
    const UpdateStatus = async (jobStatus) => {
        console.log(jobStatus, "i am jonb status");
        try {
            const keyVal = JSON.stringify(ScheduledId);
            console.log(keyVal, "i am key val");
            await AsyncStorage.setItem('ScheduledId', keyVal)
            const data = "Complete"
            const response = await fetch(`https://gaadibuddy.com/api/scheduledJobs/${ScheduledId}`, {
                method: "PATCH", // or 'PUT'
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serviceStatus: "Complete"
                })
            });
            const result = await response.json();
            console.log(result, "i am result");
            setloader(false)
            setToastMessage("Status Updated");
            setToastTextColorState("white")
            setToastColorState("#EE7523")
            childRef.current.showToast();
            setImage1("")
        } catch (error) {
            console.log(error, "dmekrnfrfm");
            setloader(false)
            setToastMessage("Some issue in Updating the status");
            setToastTextColorState("white")
            setToastColorState("red")
            childRef.current.showToast();
        }
    }
    return (
        <>
            <Toast
                toastColor={toastColorState}
                toastTextColor={toastTextColorState}
                toastMessage={toastMessage}
                ref={childRef}
            />
            <ScrollView style={styles.Header}>
                <Header title="MyJob" onPress={() => navigation.goBack()} />
                <View style={styles.MainCont}>
                    <Text style={{ fontSize: 18, fontWeight: "600", marginVertical: 10, color: "#EE7523" }}>Customer Details</Text>
                    <View style={styles.InfoView}>
                        <Text style={styles.InfoViewText}>Service : </Text>
                        <Text style={[styles.InfoViewText, { fontWeight: "400" }]}>{serviceType}</Text>
                    </View>
                    <View style={styles.InfoView}>
                        <Text style={styles.InfoViewText}>Car Details : </Text>
                        <Text style={[styles.InfoViewText, { fontWeight: "400", width: "70%" }]}>{item.carId.carMake} {item.carId.carType} - {item.carId.carNo}</Text>
                    </View>
                    <View style={styles.InfoView}>
                        <Text style={styles.InfoViewText}>Address : </Text>
                        <Text style={[styles.InfoViewText, { fontWeight: "400", width: "75%" }]}>{Address},{SecondAddress}</Text>
                    </View>
                </View>
                {
                    base64toImg === "" ? null :
                        <View style={styles.UploadContainer}>
                            <View style={{ marginVertical: 10, alignItems: "center" }}>
                                <Text style={{ fontSize: 18, textAlign: "center", marginVertical: 10, fontWeight: "600", color: "#EE7523", }}>Image Uploaded by Cleaner</Text>
                                <Image style={{ width: 210, height: 270, resizeMode: "contain", borderRadius: 8, marginBottom: "5%" }} source={{ uri: base64toImg }} />
                            </View>
                        </View>
                }
                <View style={styles.UploadContainer}>
                    <View style={styles.IVView}>
                        <Text style={[styles.IVText, { color: "#EE7523" }]}>Update Image</Text>
                        <TouchableOpacity style={styles.Box} onPress={openCamera}>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/1042/1042339.png" }} style={styles.CameraIcon} />
                            <Text style={styles.OpenCam}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Box} onPress={openGallery}>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2659/2659360.png" }} style={styles.CameraIcon} />
                            <Text style={styles.OpenCam}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.IVView}>
                        <TouchableOpacity style={styles.Box} onPress={openCamera}>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/685/685655.png" }} style={styles.CameraIcon} />
                            <Text style={styles.OpenCam}>Open Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Box} onPress={openGallery}>
                            <Image source={{ uri: "https://static.thenounproject.com/png/17840-200.png" }} style={styles.CameraIcon} />
                            <Text style={styles.OpenCam}>Open Gallery</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View>
                        {
                            Image1 == "" ? <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: windoHeight / 4 }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "600" }}>No Image is Selected</Text>
                            </View> :
                                <Image source={{ uri: Image1 }} style={styles.ImageSeleted} />
                        }
                    </View>
                    <TouchableOpacity style={{ marginHorizontal: 20, marginVertical: 10, backgroundColor: "#EE7523", borderRadius: 8, justifyContent: "center", paddingVertical: 13, alignItems: "center", width: "50%", alignSelf: "flex-end" }} onPress={() => { Image64("Complete") }}>
                        {
                            loader ? <ActivityIndicator size={22} color="white" /> :
                                <>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ color: "white", fontWeight: "600", marginRight: "5%" }}>Mark as Complete</Text>
                                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/189/189677.png" }} style={{ width: 20, height: 20 }} />
                                    </View>
                                </>
                        }

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
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
        // marginHorizontal: 10,
        // borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        // paddingHorizontal: 10,
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
        // justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: "5%",
        alignItems: "center"
    },
    IVText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700",
        width: "60%"
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
        // width: windoWidth / 6.5,
        // height: windoHeight / 14
        width: 30,
        height: 30
    },
    OpenCam: {
        fontSize: 13,
        color: 'black'
    },
    MainCont: {
        borderWidth: 1,
        borderColor: "#EE7523",
        marginHorizontal: 15,
        // backgroundColor: "#ffcbbf",
        elevation: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "white",
        shadowColor: "#EE7523"
    },
    UploadContainer: {
        borderWidth: 1,
        borderColor: "#EE7523",
        marginHorizontal: 15,
        borderRadius: 8,
        marginVertical: 20,
        backgroundColor: "white",
        elevation: 10,
        shadowColor: "#EE7523"
    }
})