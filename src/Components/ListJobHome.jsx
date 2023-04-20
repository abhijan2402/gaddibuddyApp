import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ListJobHome = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.MainView} onPress={onPress}>
            <Text style={styles.MainViewText}>{item.Name}</Text>
            <Text style={styles.MainViewText}>{item.Model}</Text>
            <Text style={styles.MainViewText}>{item.Address}</Text>
            <Text style={styles.MainViewText}>{item.TOS}</Text>
        </TouchableOpacity>
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
        borderColor: "#EE7523"
    },
    MainViewText: {
        fontSize: 15,
        color: "black"
    }


})