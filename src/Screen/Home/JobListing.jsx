import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListJobHome from '../../Components/ListJobHome';
import { JobList } from '../../Data/JobList';
import Header from '../../Components/Header';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const JobListing = ({ navigation }) => {
    return (
        <View style={styles.Header}>
            <Header title="My Job Listing" onPress={() => navigation.navigate('Homes')} />
            <ScrollView>
                {
                    JobList.map((item, index) => (
                        <ListJobHome item={item} onPress={() => navigation.navigate('JobMaindetail')} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default JobListing

const styles = StyleSheet.create({
    Header: {
        width: windoWidth,
        height: windoHeight,
        backgroundColor: 'white'
    },
    MainHeader: {
        height: windoHeight / 13,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    MainHeaderText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700"
    }
})