import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FakeData from '../../Data/FakeData';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import DatePicker from 'react-native-date-picker'
export default function () {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [date1, setDate1] = useState(new Date())
    const [open1, setOpen1] = useState(false)
    const [orderdate1, setOrdersDate1] = useState('');
    const [orderdate2, setOrderDate2] = useState("")
    const [SearchArray, setSearchArray] = useState([])
    function FIlterDate(dates) {
        const firDate = JSON.stringify(dates)
        let dateArray1 = firDate.split("-");
        let dateString1 = `${dateArray1[2]}`;
        const DateStr1 = dateString1.split("T");
        return DateStr1[0]
    }
    const CheckFilter = () => {
        let ResultantArray = []
        const thee = FIlterDate(date)
        console.log(thee, "i m thee")
        // console.log(orderdate1);
        const thee1 = FIlterDate(date1)
        console.log(thee1, "i m thee1")
        let i = 0;
        for (i = 0; i < FakeData.length; i++) {
            const firDate3 = JSON.stringify(FakeData[i].Date)
            let dateArray3 = firDate3.split("-");
            let dateString3 = `${dateArray3[2]}`;
            const DateStr3 = dateString3.split("T");
            if (DateStr3[0] < thee || DateStr3[0] > thee1) {
                console.log(DateStr3[0], "not valid")
            }
            else {
                console.log(DateStr3[0], "valid")
                ResultantArray.push(FakeData[i])
                // console.log(ResultantArray, "i am array")
                setSearchArray(ResultantArray)
                // console.log("valid");
            }
        }
    }
    useEffect(() => {
        setSearchArray(FakeData)


    }, [])
    const Reset = () => {
        setSearchArray(FakeData)
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
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "800" }}>filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Reset} style={{ width: windoWidth / 2.2, marginHorizontal: 4, backgroundColor: "lightgrey", borderRadius: 8, paddingVertical: 10, marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "800" }}>Reset</Text>
                    </TouchableOpacity>

                </View>
                <ScrollView>
                    {
                        SearchArray.map((item) => (
                            <>
                                <View style={styles.DateView}>
                                    <Text>{item.Dates}</Text>
                                </View>
                                <View style={{ marginHorizontal: 10, marginVertical: 10, borderBottomColor: "grey" }}>
                                    <View style={styles.DataPreview}>
                                        <View style={[styles.DataText, { width: windoWidth / 9, justifyContent: "flex-start", paddingVertical: 5 }]}>
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1250/1250694.png" }} style={styles.ImageIcon} />
                                        </View>
                                        <View style={[styles.DataText, { width: windoWidth / 1.6, alignItems: "flex-start" }]}>
                                            <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>{item.service}</Text>
                                            <Text>{item.StoreName}- {item.Distance}</Text>
                                            <Text style={{ marginBottom: 10 }}>Time - {item.Time}</Text>
                                        </View>
                                        <View style={[styles.DataText, { justifyContent: "flex-start" }]}>
                                            <Text style={{ fontSize: 15, color: "black", fontWeight: "700" }}>STATUS</Text>
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
    }
})