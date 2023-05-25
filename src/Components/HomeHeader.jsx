import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeHeader = () => {
    return (
        <View style={styles.Header}>
            <Text style={styles.HomeText}>Home</Text>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    Header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // borderWidth: 1,
        padding: 20
    },
    HomeText: {
        fontSize: 20,
        color: "black",
        fontWeight: "800"
    },
})