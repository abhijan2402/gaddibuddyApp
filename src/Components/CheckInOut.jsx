import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CheckIn } from '../APIs/Post/CheckIn';
import { CheckOut } from '../APIs/Post/CheckOut';
const CheckInOut = () => {
    const { userID, user } = useSelector(state => state.user);
    const CHeckedIn = async () => {
        await CheckIn(userID._id)
    }
    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.BtnTO} onPress={CHeckedIn}>
                <Text style={styles.BtnText}>Check In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BtnTO} onPress={() => { CheckOut(userID._id) }}>
                <Text style={styles.BtnText}>Check Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CheckInOut

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "5%"
    },
    BtnTO: {
        borderRadius: 8,
        paddingHorizontal: "10%",
        paddingVertical: 10,
        backgroundColor: "#EE7523"
    },
    BtnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "500"
    }
})