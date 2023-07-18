import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FakeData from '../../Data/FakeData';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react-native';
import DatePicker from 'react-native-date-picker'
import { ActivityIndicator } from 'react-native-paper';
export default function () {
    const { userID, user } = useSelector(state => state.user);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [date1, setDate1] = useState(new Date())
    const [open1, setOpen1] = useState(false)
    const [orderdate1, setOrdersDate1] = useState('');
    const [orderdate2, setOrderDate2] = useState("")
    const [SearchArray, setSearchArray] = useState([])
    const [DateWIseData, setDateWIseData] = useState([])
    const [Loading, setLoading] = useState(false)
    const [iD, setID] = useState("")
    useEffect(() => {
        console.log(userID);
        setID(userID._id)
    }, [])

    const CheckFilter = async () => {
        console.log(date, "I amdate");
        setLoading(true)
        const data = {
            start: date,
            end: date1
        }
        console.log(iD, "i am id");
        try {
            const response = await fetch(`https://gaadibuddy.com/api/scheduledJobs/ByDate/cleaner/${iD}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            let mainRes = result.scheduledJobs
            setDateWIseData(mainRes);
            console.log(DateWIseData, "i am dare");
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)

        }

    }
    const Reset = () => {
        setDateWIseData([])
    }
    return (
        <>
            <View style={[styles.MainView, { paddingBottom: 60 }]}>
                <View style={styles.HeaderView}>
                    <Text style={styles.HeaderText}>Job History</Text>
                    <TouchableOpacity onPress={Reset}>
                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/10695/10695869.png" }} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        console.log(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <DatePicker
                    modal
                    open={open1}
                    date={date1}
                    mode="date"
                    onConfirm={(date1) => {
                        setOpen1(false)
                        setDate1(date1)
                        console.log(date1)

                    }}
                    onCancel={() => {
                        setOpen1(false)
                    }}
                />
                <View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: "white" }}>
                        <TouchableOpacity onPress={() => setOpen(true)} style={styles.DatePickers}>
                            <Text style={{ marginRight: "5%", fontSize: 15, color: "black", fontWeight: "600" }}>Start Date</Text>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/1768/1768113.png" }} style={styles.ImageIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpen1(true)} style={styles.DatePickers}>
                            <Text style={{ marginRight: "5%", fontSize: 15, color: "black", fontWeight: "600" }}>End Date</Text>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/5579/5579533.png" }} style={styles.ImageIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={CheckFilter} style={{ marginHorizontal: 4, backgroundColor: "lightgrey", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 10, marginVertical: 20, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderWidth: 1, borderColor: "#EE7523", elevation: 5 }}>
                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/566/566737.png" }} style={styles.ImageIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {
                        Loading ?
                            <View style={{ height: windoHeight / 1.4, alignItems: "center", justifyContent: "center" }}>
                                <Lottie
                                    source={require('./../../assests/loader.json')} style={styles.lottieLogo} autoPlay
                                    loop />
                            </View>
                            :
                            DateWIseData.length === 0 ? <View style={{ height: windoHeight / 2, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "black" }}>Please Select the Starting & End date</Text></View> :
                                DateWIseData.map((item, index) => (
                                    <>
                                        <View style={styles.DateView} key={index}>
                                            <Text style={styles.DateTextMain}>{item.start.split("T", 1)} </Text>
                                        </View>
                                        <View style={{ marginHorizontal: 10, marginVertical: 10, borderWidth: 1, paddingVertical: 10, borderRadius: 8, borderColor: "#EE7523", backgroundColor: "white", elevation: 5 }}>
                                            <View style={styles.DataPreview}>

                                                <View style={[styles.DataText, { width: windoWidth / 1.233, alignItems: "flex-start", }]}>
                                                    <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>{item.service}</Text>
                                                    <View style={styles.ServicesDesc}>
                                                        <Text style={styles.ServiceKey}>Starting Time - </Text>
                                                        <Text style={styles.ServiceVal}>{item.start.slice(0, 10)}</Text>
                                                    </View>
                                                    <View style={styles.ServicesDesc}>
                                                        <Text style={styles.ServiceKey}>Service Surface - </Text>
                                                        <Text style={styles.ServiceVal}>{item.serviceSurface}</Text>
                                                    </View>
                                                    <View style={styles.ServicesDesc}>
                                                        <Text style={styles.ServiceKey}>Service Type - </Text>
                                                        <Text style={styles.ServiceVal}>{item.serviceType}</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.DataText, { justifyContent: "flex-start", alignItems: "flex-end" }]}>
                                                    {
                                                        item.serviceStatus == "Complete" ?
                                                            // <Text style={{ fontSize: 15, color: "black", fontWeight: "700", color: "green" }}>{item.serviceStatus}</Text>
                                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/190/190411.png" }} style={{ width: 27, height: 27 }} />
                                                            :
                                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/10755/10755684.png" }} style={{ width: 27, height: 27 }} />


                                                    }
                                                </View>
                                            </View>

                                        </View>
                                    </>
                                ))
                    }
                </ScrollView>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    MainView: {
        width: windoWidth,
        height: windoHeight,
        backgroundColor: "white",
        marginBottom: 80
    },
    HeaderView: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        height: windoHeight / 11,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    HeaderText: {
        fontSize: 20,
        color: 'black',
        fontWeight: "800"
    },
    DateView: {
        borderBottomWidth: 2,
        marginHorizontal: 10,
        borderColor: "green"
    },
    DataPreview: {
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 10,
    },
    ImageIcon: {
        width: 15,
        height: 15
    },
    DataText: {
        justifyContent: "center",
        alignItems: "center"
    },
    SelectDate: {
        fontSize: 17,
        color: "black",
        fontWeight: "600",
        marginVertical: 10
    },
    DatePickers: {
        width: windoWidth / 3,
        borderWidth: 1,
        marginHorizontal: 3,
        borderColor: "#EE7523",
        borderRadius: 5,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        elevation: 5,
    },
    DateTextMain: {
        fontSize: 15,
        color: "black"
    },
    ImageIcon: {
        width: 20,
        height: 20
    },
    ServicesDesc: {
        display: "flex",
        flexDirection: "row",
        // borderWidth: 1,
        alignItems: "center",
        marginVertical: 5,
    },
    ServiceKey: {
        color: "black",
        fontSize: 15,
        fontWeight: "600"
    },
    ServiceVal: {
        color: "#EE7523",
        fontSize: 15,
        fontWeight: "500"
    },
    lottieLogo: {
        width: 50,
        height: 50,
        // borderWidth: 1
    }
})