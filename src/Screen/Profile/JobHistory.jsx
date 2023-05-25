import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FakeData from '../../Data/FakeData';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useDispatch, useSelector } from 'react-redux';

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
        try {
            const response = await fetch(`https://gaadibuddy.com/api/scheduledJobs/ByDate/cleaner/${iD}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Success:", result);
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
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={styles.SelectDate}>Select Date</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                        <TouchableOpacity onPress={() => setOpen(true)} style={styles.DatePickers}>
                            <Text>from</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpen1(true)} style={styles.DatePickers}>
                            <Text>To</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={CheckFilter} style={{ width: windoWidth / 2.2, marginHorizontal: 4, backgroundColor: "lightgrey", borderRadius: 8, paddingVertical: 10, marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "800" }}>Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Reset} style={{ width: windoWidth / 2.2, marginHorizontal: 4, backgroundColor: "lightgrey", borderRadius: 8, paddingVertical: 10, marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "800" }}>Reset</Text>
                    </TouchableOpacity>

                </View>
                <ScrollView>
                    {
                        Loading ? <ActivityIndicator style={{ height: windoHeight / 2, justifyContent: "center", alignItems: "center" }} size={"large"} color="#EE7523" /> :
                            DateWIseData.length === 0 ? <View style={{ height: windoHeight / 2, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "black" }}>Please Select the Starting & End date</Text></View> :
                                DateWIseData.map((item, index) => (
                                    <>
                                        <View style={styles.DateView} key={index}>
                                            <Text style={styles.DateTextMain}>{item.start.split("T", 1)} </Text>
                                        </View>
                                        <View style={{ marginHorizontal: 10, marginVertical: 10, borderBottomColor: "grey" }}>
                                            <View style={styles.DataPreview}>
                                                <View style={[styles.DataText, { width: windoWidth / 9, justifyContent: "flex-start", paddingVertical: 5 }]}>
                                                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1250/1250694.png" }} style={styles.ImageIcon} />
                                                </View>
                                                <View style={[styles.DataText, { width: windoWidth / 1.6, alignItems: "flex-start" }]}>
                                                    <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>{item.service}</Text>
                                                    {/* <Text>{item.StoreName}- {item.Distance}</Text> */}
                                                    <Text style={{ marginBottom: 10, color: "grey" }}>Starting Time - {item.start.slice(0, 10)}</Text>
                                                    <Text style={{ marginBottom: 10, color: "grey" }}>Service Surface - {item.serviceSurface}</Text>
                                                    <Text style={{ marginBottom: 10, color: "grey" }}>Service Type - {item.serviceType}</Text>
                                                </View>
                                                <View style={[styles.DataText, { justifyContent: "flex-start" }]}>
                                                    <Text style={{ fontSize: 15, color: "black", fontWeight: "700" }}>{item.serviceStatus}</Text>
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
        // borderWidth: 1,
        paddingHorizontal: 20,
        height: windoHeight / 11
    },
    HeaderText: {
        fontSize: 20,
        color: 'black',
        fontWeight: "500"
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
        width: windoWidth / 2.2,
        borderWidth: 1,
        marginHorizontal: 3,
        borderRadius: 5,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    DateTextMain: {
        fontSize: 15,
        color: "black"
    }
})